const nodemailer = require("nodemailer");
const path = require("path");

const sendUserCertificateEmail = async (
  userEmail,
  { fullName },
  certificatePath
) => {
  try {
    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const detailsToSend = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Your Certificate of Completion",
      html: `<div>
                <h1>Hello, ${fullName}</h1>
                <p>Congratulations! Attached is your certificate of completion.</p>
                <h1>Thanks</h1>
                </div>`,
      attachments: [
        {
          filename: `${fullName}_certificate.pdf`,
          path: certificatePath,
        },
      ],
    };

    const result = await mailTransporter.sendMail(detailsToSend);
    console.log("Successful", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendUserCertificateEmail;
