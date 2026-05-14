export default [
  {
    method: 'POST',
    path: '/orders/generate-bold-signature',
    handler: 'api::order.controllers.bold.generateSignature',  // ← ПОЛНЫЙ путь!
    config: {
      auth: false,
    },
  },
];