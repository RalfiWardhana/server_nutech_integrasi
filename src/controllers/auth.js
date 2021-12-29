const { user } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    password: Joi.string().min(4).required(),
    email: Joi.string().email().min(6).required()
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);   

    const newusers = await user.create({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email
    });
    const token = jwt.sign({ id: newusers.id }, process.env.TOKEN_RAHASIA);
    res.status(200).send({
      status: "success",
      data: {
        name: newusers.name,
        email: newusers.email,
        token:token
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
    const schema = Joi.object({
      email: Joi.string().email().min(4).required(),
      password: Joi.string().min(4).required(),
    });
  
    const { error } = schema.validate(req.body);
    console.log(error)
    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
  
    try {
      const usersExist = await user.findOne({
        where: {
          email: req.body.email,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      
      const isValid = await bcrypt.compare(req.body.password, usersExist.password);
  
      if (!isValid) {
        return res.status(400).send({
          status: "failed",
          message: "password is invalid",
        });
      }
  
      const token = jwt.sign({ id: usersExist.id }, process.env.TOKEN_RAHASIA);
      res.status(200).send({
          status: "success",
          data: {
           token : token,
           id:usersExist.id      
          },
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Account is invalid",
      });
    }
  };

