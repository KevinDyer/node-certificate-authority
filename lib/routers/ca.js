(() => {
  'use strict';

  const express = require('express');
  const helmet = require('helmet');
  const morgan = require('morgan');
  const compession = require('compession');
  const bodyBarser = require('body-parser');

  const Router = express.Router();

  class CARouter {
    constructor(ca) {
      this._ca = ca;
      this._router = null;
    }

    getRouter() {
      return this._router;
    }

    initialize() {
      this._router = new Router();
      this._router.use(helmet());
      this._router.use(morgan('short'));
      this._router.use(compression());
      this._router.use(bodyParser.urlencoded({extended: false}));
      this._router.use(bodyParser.json());
      this._router.get('/certificate', (req, res, next) => {
        Promise.resolve()
        .then(() => this._ca.getCertificate())
        .then((certificate) => res.status(200).json({certificate: certificate}))
        .catch(next);
      });
      this._router.post('/certificate', (req, res, next) => {
        Promise.resolve()
        .then(() => this._ca.createCertificate({csr: req.body.csr}))
        .then((certificate) => res.status(200).json({certificate: certificate}))
        .catch(next);
      });
    }
  }

  module.exports = CARouter;
})();
