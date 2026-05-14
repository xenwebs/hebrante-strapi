/**
 * order router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::order.order');

export const routes = [
  {
    method: 'post',
    path: '/api/orders/generate-bold-signature',
    handler: 'api::order.controllers.bold.generateSignature',
    config: {
      auth: false,
      policies: [],
    },
  },
];