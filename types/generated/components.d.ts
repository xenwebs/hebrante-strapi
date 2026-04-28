import type { Schema, Struct } from '@strapi/strapi';

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
      'size.size-chart-item': SizeSizeChartItem;
    }
  }
}
