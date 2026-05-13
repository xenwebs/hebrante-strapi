/**
 * order router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::order.order');

export const routes = [
  {
    method: 'post',
    path: '/orders/generate-signature',
    handler: 'api::order.controllers.bold.generateSignature',
    config: {
      auth: false,
      policies: [],
    },
  },
];