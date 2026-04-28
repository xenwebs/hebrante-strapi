export default {
  routes: [
    {
      method: 'POST',
      path: '/shipping/rates',
      handler: 'shipping.getRates',
    },
  ],
};
