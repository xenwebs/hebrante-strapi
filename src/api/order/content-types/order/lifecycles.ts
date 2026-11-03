// src/api/order/content-types/order/lifecycles.ts
//
// После любого создания / изменения / удаления заказа с промокодом пересчитываем
// used_count и is_used у этого промокода. Срабатывает и когда вебхук Bold
// ставит orderStatus = "paid", и когда заказ переводят в refunded / cancelled
// руками в админке.
//
// Ошибка пересчёта никогда не должна ломать сохранение заказа (иначе можно
// потерять подтверждение оплаты), поэтому всё в try/catch.

import { syncPromoUsage } from '../../../../utils/promo-usage'

type OrderEvent = { result?: { promoCode?: string | null } }

async function syncFromEvent(event: OrderEvent): Promise<void> {
  const code = event.result && event.result.promoCode
  if (!code) return

  // глобальный strapi есть всегда, но его тип зависит от версии — берём без привязки к типам
  const strapi = (globalThis as any).strapi

  try {
    await syncPromoUsage(strapi, code)
  } catch (error) {
    strapi.log.error(
      `promo-usage: no se pudo actualizar ${code}: ${(error as Error).message}`
    )
  }
}

export default {
  afterCreate: syncFromEvent,
  afterUpdate: syncFromEvent,
  afterDelete: syncFromEvent,
}