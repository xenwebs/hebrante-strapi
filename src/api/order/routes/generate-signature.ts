export default [
  {
    method: 'POST',
    path: '/orders/generate-bold-signature',
    handler: 'order.generateSignature',
    config: {
      auth: false,
    },
  },
];