/**
 * order router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::order.order', {
  only: ['find', 'findOne', 'create', 'update', 'delete'],
  config: {
    create: {
      auth: false,
      policies: [],
    },
  },
});

// Добавь кастомный маршрут
export const customRoutes = [
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