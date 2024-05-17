const express = require('express');
const User = require('../models/user.js');
const mongoose = require('mongoose');
const { 
  getSingleUser, 
  editProfile 
} = require('../controllers/candidateControllers.js.js');

const router = express.Router();
const cors = require('cors');

router.use(
  cors({
      credentials: true,
      origin: 'http://localhost:3000'
  })
);

router.get("/", (req, res) => {
  res.send('Candidate API');
})

router.get('/:id', findSingleUser, getSingleUser);
router.patch('/:id', findSingleUser , editProfile);

async function findSingleUser(req, res, next) {
  let user;
  try {
    const userId = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(userId)){
      return res.status(404).json({error: 'id of the user is Invalid'});
    }

    user = await User.findById(userId);
    if(user == null){
      return res.status(404).json({error: error.message});
    }
  } catch(error) {
    return res.status(500).json({error:'Cannot find such a workout'});
  }
  res.user = user;
  // console.log(res.user.id);
  next();
}

module.exports = router;