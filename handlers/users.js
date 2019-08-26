const db = require("../models");

// POST - /api/exercise/new-user
exports.createUser = async (req, res, next) => {
  try {
    const {username} = req.body
    const user = await db.Users.create({username});
    
    return res.json({
      username: user.username,
      _id: user._id
    })
     
  } catch (err) {
    if(err.code == 11000) {
      // if username already exist
      return next({status: 400, message: 'username already taken'})
    } 
    return next(err)
  }
};

// GET - /api/exercise/users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await db.Users.find();
    return res.json(users);
  } catch (error) {
    return next(error);
  }
};