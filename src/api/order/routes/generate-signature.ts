export default [
  {
    method: 'POST',
    path: '/orders/generate-bold-signature',
    handler: require('../controllers/bold').default.generateSignature,  // ← ПОЛНЫЙ путь!
    config: {
      auth: false,
    },
  },
];