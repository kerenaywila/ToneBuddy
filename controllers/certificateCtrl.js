const Users = require("../models/userModel");
const generateCertificate = require("../services/generateCertificate");
const sendUserCertificateEmail = require("../services/sendEmail");

const sendCertificate = async (req, res) => {
  const { fullName, email } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const certificatePath = await generateCertificate({ fullName });

    await sendUserCertificateEmail(email, { fullName }, certificatePath);

    res.status(200).json({ message: "Certificate sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendCertificate };
