export default {
  routes: [
    {
      method: 'POST',
      path: '/orders/generate-signature',
      handler: 'order.generateSignature',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};