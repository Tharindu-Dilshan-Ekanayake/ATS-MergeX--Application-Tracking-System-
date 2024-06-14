const User = require('../models/user');
const upload = require('../utils/uploadMulter');
const PdfDetail = require('../models/pdfDetails');


const fileUpload = (req, res) => {
  upload.single('file')(req, res, async function (err) {

    if (err) {
      return res.status(500).send({ message: 'File upload failed', error: err });
    }

    console.log("req.file ", req.file);  // Log the file information
    console.log("req.body ", req.body);
    console.log("req.user ", req.user._id);

    const title = req.body.title;
    const fileName = req.file.filename;
    res.status(200).json({ message: "File uploaded successfully" });

    // try {
    //   await PdfDetail.create({
    //     title: title,
    //     pdf: fileName,
    //     //senderId: req.user.id
    //   });
    //   res.status(200).json({ message: "File uploaded successfully"});
    // } catch (error) {
    //   res.status(500).json({ error : "Internal Server Error"});
    // }
  });
};

const getSingleUser = async (req, res) => {
  const user = res.user;
  if (!user) {
    return res.status(404).json({ error: 'No such user' });
  }
  res.status(200).json(user);
}

const editProfile = async (req, res) => {
  try {
    const user = req.user;
    console.log(req.body);
    const updatedUser = await User.findByIdAndUpdate(user.id, { ...req.body }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }

}


module.exports = {
  getSingleUser,
  editProfile,
  fileUpload
}