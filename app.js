const PORT = process.env.PORT || 8080;
const SERVER_KEY_FILEPATH = process.env.SERVER_KEY_FILEPATH || 'test.key.pem';
const SERVER_CERT_FILEPATH = process.env.SERVER_CERT_FILEPATH || 'test.cert.pem';

const fs = require('fs');
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const pem = require('pem');

// TODO: If no server key or server cert generate using pem
// TODO: Better csr verification
// TODO: Make better input for server key and server cert
// TODO: Add config/extension file?

const serverKey = fs.readFileSync(SERVER_KEY_FILEPATH);
const serverCert = fs.readFileSync(SERVER_CERT_FILEPATH);
let serial = 0;

const app = express();
app.use(helmet());
app.use(morgan('common'));
app.use(compression());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.status(200).json({healthy: true});
});
app.post('/', (req, res) => {
  const csr = req.body.csr || 'this is not a csr';
  const options = {
    serverKey: serverKey,
    serverCert: serverCert,
    serial: serial++,
    csr: csr
  };
  pem.createCertificate(options, (err, result) => {
    if (err) {
      res.status(500).json({success: false, error: 'failed to sign csr'});
    } else {
      res.status(200).json({success: true, data: {certificate: result.certificate}});
    }
  });
});

const options = {
  key: serverKey,
  cert: serverCert
};
const server = https.createServer(options, app);
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}.`);
});
