(() => {
  'use strict';

  const pem = require('./../utils/pem');

  class IntermediateCertificateAuthority {
    constructor() {
      this._key = null;
      this._cert = null;
      this._serial = 1000;
    }

    getKey() {
      return Promise.resolve(this._key);
    }

    getCertificate() {
      return Promise.resolve(this._cert);
    }

    initialize(rootCA) {
      return Promise.resolve()
      .then((result ) => pem.createCSR({keyBitsize: 4096, commonName: 'intermediate'}))
      .then((result) => {
        this._key = result.clientKey;
        this._csr = result.csr;
      })
      .then(() => rootCA.createCertificate({csr: this._csr}))
      .then((result) => {
        this._cert = result.certificate;
      });
    }

    createCertificate({csr}={}) {
      return Promise.resolve()
      .then(() => pem.createCertificate({
        serviceKey: this._key,
        serviceCertificate: this._cert,
        serial: this._serial++,
        csr: csr,
        days: 2 * 365 + 15
      }))
      .then((result) => {
        return {certificate: result.certificate};
      });
    }
  }

  module.exports = IntermediateCertificateAuthority;
})();
