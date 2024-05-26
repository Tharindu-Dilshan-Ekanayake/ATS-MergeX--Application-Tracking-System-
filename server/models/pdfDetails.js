const mongoose = require("mongoose");

const pdfDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
    senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "UserModel",
			required: false,
		}

  },
  {collection:'pdfDetails'},
  { timestamps: true }
);

const pdfDetail = mongoose.model("pdfDetail", pdfDetailsSchema);

module.exports = pdfDetail;