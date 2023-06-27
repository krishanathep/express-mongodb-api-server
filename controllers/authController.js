const Users = require("../models/users");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
  try {

    //Check User
    const { name, email, password } = req.body
    var user = await Users.findOne({ email })
    if(user){
        return res.status(400).send("User Already Exists!!!")
    }

    //password validator
    if(req.body.password != req.body.password_confirmation){
      return res.status(400).send("Passwords do not match!!!")
    }
  

    //Encrypt
    const salt = await bcrypt.genSalt(10)
    user = new Users({
        name,
        email,
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
      const { email, password } = req.body
      var user = await Users.findOneAndUpdate({ email }, { new: true})
      console.log(user)
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
          return res.status(400).send("Password Invalid!!!")
        }
        //Payload
        var payload = {
          user: {
            name: user.name,
            email: user.email
          }
        }
        //Generate
        jwt.sign(payload, 'jwtsecret', { expiresIn: 60}, (err,token)=>{
            if(err) throw err;
            res.status(200).json({ token, payload })
        })
      } else {
        return res.status(400).send("User not found!!!")
      }
    } catch (err) {
      res.status(500).send("Server Error!!!")
      console.log(err);
    }
  };
