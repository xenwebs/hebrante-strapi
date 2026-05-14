export default [
  {
    method: 'post',
    path: '/orders/generate-bold-signature',
    handler: 'order.generateSignature',
    config: {
      auth: false,
    },
  },
];