// Import the qrcode package
const QRCode = require('qrcode');

// Get the URL from the command-line arguments
const inputUrl = process.argv[2];

// Check if the URL is provided
if (!inputUrl) {
  console.error('Please provide a URL as a command-line argument');
  process.exit(1);
}

// Ensure the URL has the correct format (add http if not present)
let formattedUrl = inputUrl;
if (!/^https?:\/\//i.test(formattedUrl)) {
  formattedUrl = 'http://' + formattedUrl;
}

// Parse the URL to extract the domain name
const parsedUrl = new URL(formattedUrl);
const hostname = parsedUrl.hostname;
const domainName = hostname.split('.').slice(-2, -1)[0];

// Generate the file name
const outputFileName = `qr-codes/${domainName}.png`;

// Generate the QR code
QRCode.toFile(outputFileName, formattedUrl, function (err) {
  if (err) throw err;
  console.log(`QR code generated for ${formattedUrl} and saved in ./qr-codes folder`);
});
