(() => {
  'use strict';

  const https = require('https');
  const express = require('express');
  const helmet = require('helmet');
  const morgan = require('morgan');
  const compression = require('compression');

  class Server {
    constructor() {
      this._app = express();
      this._app.use(helmet());
      this._app.use(morgan('short'));
      this._app.use(compression());
      this._key = null;
      this._cert = null;
      this._server = null;
    }

    use(...data) {
      return this._app.use(...data);
    }

    initialize(ca) {
      return Promise.resolve()
      .then(() => ca.getKey())
      .then((key) => {
        this._key = key;
      })
      .then(() => ca.getCertificate())
      .then((cert) => {
        this._cert = cert;
      })
      .then(() => {
        const options = {
          key: this._key,
          cert: this._cert
        };
        this._server = https.createServer(options, this._app);
      });
    }

    listen({port=80}={}) {
      return new Promise((resolve, reject) => {
        this._server.once('error', reject);
        this._server.listen(port, resolve);
      });
    }
  }

  module.exports = Server;
})();
