export default {
  async getRates(ctx) {
    const { address, items } = ctx.request.body;

    const payload = {
      address_from: {
        country_code: 'CO',
        postal_code: '110111',
      },
      address_to: {
        country_code: 'CO',
        postal_code: address.postal_code,
      },
      parcels: items.map((item) => ({
        weight: item.weight || 1,
        height: 10,
        width: 10,
        length: 10,
      })),
    };

    const rates = await strapi
      .service('api::shipping.shipping')
      .getRates(payload);

    ctx.body = rates;
  },
};
