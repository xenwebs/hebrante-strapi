// src/api/banner/content-types/banner/lifecycles.js
// Запрещает одновременное заполнение collection и products у баннера

async function validateCollectionOrProducts(event) {
  const { data } = event.params

  const hasCollection = Boolean(data.collection)
  const hasProducts = Array.isArray(data.products) && data.products.length > 0

  if (hasCollection && hasProducts) {
    throw new Error(
      "Баннер не может быть привязан одновременно и к коллекции, и к продуктам. Выберите что-то одно."
    )
  }
}

module.exports = {
  async beforeCreate(event) {
    await validateCollectionOrProducts(event)
  },
  async beforeUpdate(event) {
    await validateCollectionOrProducts(event)
  },
}