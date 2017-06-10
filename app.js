(() => {
  'use strict';

  const RootCA = require('./lib/ca/root');
  const IntermediateCA = require('./lib/ca/intermediate');
  const CARouter = require('./lib/routers/ca');
  const Server = require('./lib/server');

  const server = new Server();

  const root = new RootCA();
  const rootRouter = new CARouter(root);
  server.use('/root', rootRouter.getRouter());

  const intermediate = new IntermediateCA();
  const intermediateRouter = new CARouter(intermediate);
  server.use('/intermediate', intermediateRouter.getRouter());

  Promise.resolve()
  .then(() => root.initialize())
  .then(() => intermediate.initialize(root))
  .then(() => server.initialize(intermediate))
  .then(() => server.listen({port: 9000}));
})();
