(() => {
  'use strict';

  const RootCA = require('./lib/ca/root');
  const IntermediateCA = require('./lib/ca/intermediate');

  const root = new RootCA();
  const intermediate = new IntermediateCA();

  Promise.resolve()
  .then(() => root.initialize())
  .then(() => intermediate.initialize(root));
})();
