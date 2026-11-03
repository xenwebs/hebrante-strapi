// src/utils/promo-usage.ts
//
// Пересчёт информационных полей промокода: used_count и is_used.
// Источник правды — оплаченные заказы (orderStatus = "paid") с таким promoCode,
// ровно как в Netlify-функциях (lib/promo.js → countPaidUses). Поэтому пересчёт
// идемпотентен: сколько раз его ни вызывай, результат один и тот же, а возврат
// или отмена заказа (статус уходит из "paid") сами уменьшают счётчик.
//
// Сами поля только отображают состояние. Блокирует повторное использование
// кода по-прежнему проверка в Netlify, которая считает заказы напрямую,
// поэтому ручная правка этих полей в админке код не «освобождает».

const ORDER_UID = 'api::order.order'
const PROMO_UID = 'api::promo-code.promo-code'

export async function syncPromoUsage(strapi: any, rawCode: unknown): Promise<void> {
  const code = String(rawCode || '').trim()
  if (!code) return

  const usedCount: number = await strapi.db.query(ORDER_UID).count({
    where: { promoCode: { $eqi: code }, orderStatus: 'paid' },
  })

  // db.query работает напрямую с таблицей, минуя draft & publish: обновятся
  // все версии записи, и не нужно отдельно «публиковать» изменение
  await strapi.db.query(PROMO_UID).updateMany({
    where: { code: { $eqi: code } },
    data: { used_count: usedCount, is_used: usedCount > 0 },
  })
}

// Пересчитать все коды, по которым есть оплаченные заказы (бэкфилл при старте)
export async function syncAllPromoUsage(strapi: any): Promise<number> {
  const paidWithPromo: Array<{ promoCode?: string | null }> = await strapi.db
    .query(ORDER_UID)
    .findMany({
      select: ['promoCode'],
      where: { orderStatus: 'paid', promoCode: { $notNull: true } },
    })

  const codes = [
    ...new Set(
      paidWithPromo
        .map((order) => String(order.promoCode || '').trim().toUpperCase())
        .filter(Boolean)
    ),
  ]

  for (const code of codes) {
    await syncPromoUsage(strapi, code)
  }
  return codes.length
}