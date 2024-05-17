const User = require('../models/user');

const getSingleUser = async (req, res) => {
  const user = res.user;
  if (!user) {
    return res.status(404).json({ error: 'No such user' });
  }
  res.status(200).json(user);
}

const editProfile = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(res.user.id, {...req.body}, {new: true});
  res.status(200).json(updatedUser);
}

module.exports = {
  getSingleUser,
  editProfile
}