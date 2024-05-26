const express = require('express');
const protectRoute = require('../middleware/protectRoute.js');
const User = require('../models/user.js');
const router = express.Router();
const mongoose = require('mongoose');
const { 
  getSingleUser, 
  editProfile,
  fileUpload 
} = require('../controllers/candidateControllers.js.js');




router.get("/", (req, res) => {res.send('Candidate API');})

router.get('/:id', findSingleUser, getSingleUser);
router.patch('/:id', findSingleUser , editProfile);
router.post('/upload/',protectRoute, fileUpload);



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