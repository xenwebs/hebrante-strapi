export default {
  routes: [
    {
      method: 'POST',
      path: '/orders/generate-signature',
      handler: 'api::order.controllers.bold.generateSignature',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};