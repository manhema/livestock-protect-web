import { Chart as ChartJS, type Plugin } from 'chart.js';

// Lightweight custom plugin to draw external labels with leader lines for pie charts
export const PieExternalLabelsPlugin: Plugin<'pie'> = {
  id: 'pieExternalLabels',
  afterDatasetsDraw(chart, _args, pluginOptions: any) {
    const ctx = chart.ctx;
    const meta = chart.getDatasetMeta(0);
    if (!meta || !meta.data) return;

    const dataset = chart.data.datasets?.[0];
    const labels = chart.data.labels || [];
    const show = pluginOptions?.display !== false; // default true

    if (!show) return;

    ctx.save();
    ctx.font = (ChartJS.defaults.font?.weight || 'normal') + ' ' + (ChartJS.defaults.font?.size || 12) + 'px ' + (ChartJS.defaults.font?.family || 'Arial');
    ctx.fillStyle = '#111';
    ctx.strokeStyle = '#89CFF0';
    ctx.lineWidth = 1;

    const offset = pluginOptions?.offset ?? 24; // distance from outer radius to label text
    const bend = pluginOptions?.bend ?? 12; // length of the small bend/leader

    meta.data.forEach((arc: any, i: number) => {
      const value = (dataset?.data as any)?.[i];
      if (!value || Number(value) === 0) return;

      // Get geometry for the slice
      const { x, y, startAngle, endAngle, outerRadius } = arc.getProps(['x','y','startAngle','endAngle','outerRadius'], true);
      const angle = (startAngle + endAngle) / 2;

      const sx = x + Math.cos(angle) * outerRadius; // start at arc edge
      const sy = y + Math.sin(angle) * outerRadius;

      const mx = x + Math.cos(angle) * (outerRadius + bend); // mid point (little line out)
      const my = y + Math.sin(angle) * (outerRadius + bend);

      const isRight = Math.cos(angle) >= 0;
      const ex = x + Math.cos(angle) * (outerRadius + offset);
      const ey = y + Math.sin(angle) * (outerRadius + offset);

      // Draw leader line with a small horizontal jog for readability
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(mx, my);
      ctx.lineTo(ex + (isRight ? 8 : -8), ey);
      ctx.stroke();

      // Draw label text with clamping inside chart area
      const label = String(labels[i] ?? '');
      ctx.textAlign = isRight ? 'left' : 'right';
      ctx.textBaseline = 'middle';

      // initial target position
      let textX = ex + (isRight ? 12 : -12);
      let textY = ey;

      // measure to compute clamping boxes
      const m = ctx.measureText(label);
      const textW = Math.max(1, m.width);
      const textH = (m.actualBoundingBoxAscent ?? 8) + (m.actualBoundingBoxDescent ?? 2);
      const margin = 4;

      // clamp vertically so bottom labels are not cut off
      const halfH = textH / 2;
      if (textY - halfH < chart.chartArea.top + margin) {
        textY = chart.chartArea.top + margin + halfH;
      }
      if (textY + halfH > chart.chartArea.bottom - margin) {
        textY = chart.chartArea.bottom - margin - halfH;
      }

      // clamp horizontally
      if (isRight) {
        if (textX + textW > chart.chartArea.right - margin) {
          textX = chart.chartArea.right - margin - textW;
        }
      } else {
        if (textX < chart.chartArea.left + margin) {
          textX = chart.chartArea.left + margin;
        }
      }

      // Recompute tail end so connector meets the text nicely
      const tailEndX = isRight ? textX - 8 : textX + textW + 8;
      const tailEndY = textY;

      // redraw the final segment to the clamped point
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(tailEndX, tailEndY);
      ctx.stroke();

      // finally draw the text
      ctx.fillText(label, textX, textY);
    });

    ctx.restore();
  },
};
