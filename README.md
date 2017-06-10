Certificate Authority (CA)
===
A small-ish, simple-ish Node.js service that acts an intermediate certificate authority (CA).

### Background
By design, this service is not meant to be a root CA. It is designed to be an intermediate CA. The service may initialize under one of the following conditions:
1. The key and certificate for the intermediate CA are present.
2. The key and certificate for the root CA are presented (not a good idea).
3. If neither are present, a key and CSR are generated and made available to `GET`. An endpoint is also made available to upload the certificate.

### Thanks to
- [OpenSSL Certificate Authority](https://jamielinux.com/docs/openssl-certificate-authority/index.html)
- [OpenSSL Essentials: Working with SSL Certificates, Private Keys and CSRs](https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs)
- [Dexus/pem](https://github.com/Dexus/pem) (github)
