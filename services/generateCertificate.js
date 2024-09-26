const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateCertificate = async ({ fullName }) => {
  try {
    const certificateFolderPath = path.join(__dirname, 'certificates');

    const certificatePath = path.join(certificateFolderPath, `${fullName}_certificate.pdf`);

    const LANDSCAPE_A4_WIDTH = 842;
    const LANDSCAPE_A4_HEIGHT = 595;

    const doc = new PDFDocument({
      size: [LANDSCAPE_A4_WIDTH, LANDSCAPE_A4_HEIGHT],
    });

    doc.pipe(fs.createWriteStream(certificatePath));

    const backgroundImagePath = path.join(__dirname, "images/background.jpeg");
    doc.image(backgroundImagePath, 0, 0, {
      width: LANDSCAPE_A4_WIDTH,
      height: LANDSCAPE_A4_HEIGHT,
    });

    const logo1Path = path.join(__dirname, "images/youthrive-logo-png.png");
    const logo2Path = path.join(__dirname, "images/careerex-logo-png.png");

    const logoWidth = 100;
    const logoHeight = 70;

    const totalLogoWidth = 2 * logoWidth + 20;
    const xStart = (LANDSCAPE_A4_WIDTH - totalLogoWidth) / 2;
    const logoYPosition = 50;

    doc.image(logo1Path, xStart, logoYPosition, {
      width: logoWidth,
      height: logoHeight,
    });
    doc.image(logo2Path, xStart + logoWidth + 20, logoYPosition, {
      width: logoWidth,
      height: logoHeight,
    });

    doc.moveDown(7);
    doc
      .fontSize(50)
      .fillColor("black")
      .text("CERTIFICATE", { align: "center", bold: true });
    doc.moveDown(0);

    doc.moveDown(0);
    doc
      .fontSize(25)
      .fillColor("black")
      .text("OF COMPLETION", { align: "center", bold: true });
    doc.moveDown(0);

    doc.moveDown(1);
    doc
      .fontSize(20)
      .fillColor("black")
      .text("This is to certify that", { align: "center" });
    doc.moveDown(0);

    doc.moveDown(0.5);
    doc
      .fontSize(27)
      .fillColor("black")
      .text(`${fullName}`, { align: "center", bold: true });
    doc.moveDown(0);

    doc.moveDown(1);
    doc
      .fontSize(18)
      .fillColor("black")
      .text(
        "Became one of the finalists to have completed the Youthrive 3 Months Intensive Tech Program in the Specialization of Backend.",
        { align: "center" }
      );
    doc.moveDown(0);

    const dateText = `Date: ${new Date().toLocaleDateString()}`;
    doc.moveDown(2);
    doc
      .fontSize(16)
      .fillColor("black")
      .text(dateText, { align: "center", bold: true });

    const signatureImagePath = path.join(__dirname, "images/signature-png.png");
    const signatureWidth = 120;
    const signatureHeight = 60;
    const signatureXPosition = (LANDSCAPE_A4_WIDTH - signatureWidth) / 2;
    const signatureYPosition = LANDSCAPE_A4_HEIGHT - signatureHeight - 30;

    doc.image(signatureImagePath, signatureXPosition, signatureYPosition, {
      width: signatureWidth,
      height: signatureHeight,
    });

    doc.end();
    return certificatePath;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = generateCertificate;
