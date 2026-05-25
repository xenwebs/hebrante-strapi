import { factories } from '@strapi/strapi';

export default {
  routes: [
    {
      method: 'GET',
      path: '/shipping-policies',
      handler: 'shipping-policy.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/shipping-policies/:id',
      handler: 'shipping-policy.findOne',
      config: {
        auth: false,
      },
    },
  ],
};