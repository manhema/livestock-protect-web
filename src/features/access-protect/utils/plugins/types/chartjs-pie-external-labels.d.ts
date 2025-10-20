// TypeScript module augmentation to allow using custom plugin options key 'pieExternalLabels'
// in Chart.js options for pie charts.
import type { ChartType } from 'chart.js';

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    // Options for the custom external labels plugin used in pie charts
    // Use conditional type so the generic parameter is consumed and applies only to pie charts
    pieExternalLabels?: TType extends 'pie'
      ? {
        display?: boolean;
        offset?: number;
        bend?: number;
        // Allow unknown extras to avoid friction
        [key: string]: unknown;
      }
      : never;
  }
}
