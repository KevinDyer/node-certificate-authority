(() => {
  'use strict';

  const util = require('util');
  const pem = require('pem');

  class UtilPem {
    static createPrivateKey(...data) {
      return util.promisify(pem.createPrivateKey)(...data);
    }

    static createDhparam(...data) {
      return util.promisify(pem.createDhparam)(...data);
    }

    static createCSR(...data) {
      return util.promisify(pem.createCSR)(...data);
    }

    static createCertificate(...data) {
      return util.promisify(pem.createCertificate)(...data);
    }

    static readCertificateInfo(...data) {
      return util.promisify(pem.readCertificateInfo)(...data);
    }

    static getPublicKey(...data) {
      return util.promisify(pem.getPublicKey)(...data);
    }

    static getFingerprint(...data) {
      return util.promisify(pem.getFingerprint)(...data);
    }

    static getModulus(...data) {
      return util.promisify(pem.getModulus)(...data);
    }

    static getDhparamInfo(...data) {
      return util.promisify(pem.getDhparamInfo)(...data);
    }

    static createPkcs12(...data) {
      return util.promisify(pem.createPkcs12)(...data);
    }

    static readPkcs12(...data) {
      return util.promisify(pem.readPkcs12)(...data);
    }

    static verifySigningChain(...data) {
      return util.promisify(pem.verifySigningChain)(...data);
    }

    static config(...data) {
      return util.promisify(pem.config)(...data);
    }
  }

  module.exports = UtilPem;
})();
