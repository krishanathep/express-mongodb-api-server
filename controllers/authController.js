const Users = require("../models/users");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
  try {

    //Check User
    const { name, password } = req.body
    var user = await Users.findOne({ name })
    if(user){
        return res.status(400).send("User Already Exists!!!")
    }

    //Encrypt
    const salt = await bcrypt.genSalt(10)
    user = new Users({
        name,
        password
    })
    user.password = await bcrypt.hash(password, salt)

    //Save
    await user.save()
    res.status(200).send("User Register Success!!!")
  } catch (err) {
    res.status(500).send("Server Error!!!")
    console.log(err);
  }
};

exports.login = async (req, res) => {
    try {
      //Check User
      const { name, password } = req.body
      var user = await Users.findOneAndUpdate({ name }, { new: true})
      console.log(user)
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
          return res.status(400).send("Password Invalid!!!")
        }
        //Payload
        var payload = {
          user: {
            name: user.name
          }
        }
        //Generate
        jwt.sign(payload, 'jwtsecret', { expiresIn: 60}, (err,token)=>{
            if(err) throw err;
            res.json({ token, payload })
        })
      } else {
        return res.status(400).send("User not found!!!")
      }
    } catch (err) {
      res.status(500).send("Server Error!!!")
      console.log(err);
    }
  };
