import type { Core } from '@strapi/strapi'
import { syncAllPromoUsage } from './utils/promo-usage'

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Бэкфилл: один раз пересчитать is_used / used_count для кодов, использованных
    // до появления этих полей. Без await, чтобы не задерживать запуск Strapi.
    // Когда убедишься, что данные верные, этот блок можно удалить.
    syncAllPromoUsage(strapi)
      .then((n) => strapi.log.info(`promo-usage: пересчитано кодов: ${n}`))
      .catch((error: Error) =>
        strapi.log.error(`promo-usage backfill: ${error.message}`)
      )
  },
}