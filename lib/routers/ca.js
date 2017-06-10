(() => {
  'use strict';

  const express = require('express');
  const bodyParser = require('body-parser');
  const Router = express.Router;

  class CARouter {
    constructor(ca) {
      this._ca = ca;
      this._router = new Router();
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

    getRouter() {
      return this._router;
    }
  }

  module.exports = CARouter;
})();
