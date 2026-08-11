import type { Schema, Struct } from '@strapi/strapi';

export interface BannerSlot extends Struct.ComponentSchema {
  collectionName: 'components_banner_slots';
  info: {
    displayName: 'slot';
    icon: 'dashboard';
  };
  attributes: {
    button_bg_color: Schema.Attribute.String;
    button_text: Schema.Attribute.String;
    button_text_color: Schema.Attribute.String;
    button_text_en: Schema.Attribute.String;
    collection: Schema.Attribute.Relation<
      'oneToOne',
      'api::collection.collection'
    >;
    eyebrow: Schema.Attribute.String;
    eyebrow_en: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    heading_en: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    image_mobile: Schema.Attribute.Media<'images' | 'files'>;
    light_text: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    subheading: Schema.Attribute.String;
    subheading_en: Schema.Attribute.String;
  };
}

export interface SizeSizeChartItem extends Struct.ComponentSchema {
  collectionName: 'components_size_size_chart_items';
  info: {
    displayName: 'size chart item';
    icon: 'alien';
  };
  attributes: {
    chest: Schema.Attribute.Integer;
    length: Schema.Attribute.Integer;
    size: Schema.Attribute.Enumeration<['XS', 'S', 'M', 'L', 'XL']>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'banner.slot': BannerSlot;
      'size.size-chart-item': SizeSizeChartItem;
    }
  }
}
