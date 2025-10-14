import html2canvas from 'html2canvas';

export async function saveHtmlAsBase64({ element }: { element: HTMLElement }): Promise<string | null> {
  if (!element) throw new Error('Element not found');

  const canvas = await html2canvas(element, { useCORS: true });

  // Draw WebGL canvas (if any)
  const webglCanvas = element.querySelector('canvas');
  if (webglCanvas) {
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(webglCanvas, 0, 0);
  }

  const img = canvas.toDataURL('image/png');
  return img;
}

export async function downloadCanvasAsImage({ canvas, fileName }: { canvas: HTMLCanvasElement; fileName?: string }): Promise<void> {
  const imageURL = canvas.toDataURL('image/png');
  if (!imageURL) throw new Error('image export failed');

  const a = document.createElement('a');
  a.href = imageURL;
  a.download = fileName ? `${fileName}.png` : 'export.png';
  a.click();
}

export async function downloadHtmlAsImage({ element, fileName }: { element: HTMLElement; fileName?: string }): Promise<void> {
  const imageURL = await saveHtmlAsBase64({ element });
  if (!imageURL) throw new Error('image export failed');

  const a = document.createElement('a');
  a.href = imageURL;
  a.download = fileName ? `${fileName}.png` : 'export.png';
  a.click();
}

export async function saveHtmlAsFile({ element, fileName }: { element: HTMLElement; fileName?: string }): Promise<File> {
  const imageURL = await saveHtmlAsBase64({ element });
  if (!imageURL) throw new Error('image export failed');

  return dataURLtoFile(imageURL, fileName || 'export.png');
}

function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[arr.length - 1]);

  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export async function downloadLabeledQRCodeWithDivider({
  canvas,
  fileName,
  label,
  options = {},
}: {
  canvas: HTMLCanvasElement;
  fileName: string;
  label: string;
  options?: {
    margin?: number; // in CSS px at base 256
    gapAfterQR?: number;
    dividerWidthRatio?: number;
    dividerThickness?: number; // in CSS px at base 256
    gapAfterDivider?: number;
    base?: number; // base QR size to scale from (default 256)
    fgColor?: string;
    bgColor?: string;
  };
}): Promise<void> {
  const {
    margin = 20,
    gapAfterQR = 12,
    dividerWidthRatio = 0.6,
    dividerThickness = 2,
    gapAfterDivider = 10,
    fgColor = '#000',
    bgColor = '#fff',
    base = 256,
  } = options;

  const srcQR = canvas; // hi-res QR source
  const qrPx = srcQR.width; // e.g., 1024
  const scale = qrPx / base; // scale UI spacings + font

  const outWidthCss = Math.round(qrPx + (margin * 2 * scale));
  const textHeight = Math.round(26 * scale); // single-line label height guess
  const outHeightCss
        = Math.round(margin * scale)
        + qrPx
        + Math.round(gapAfterQR * scale)
        + Math.round(dividerThickness * scale)
        + Math.round(gapAfterDivider * scale)
        + textHeight
        + Math.round(margin * scale);

  const out = document.createElement('canvas');
  out.width = outWidthCss;
  out.height = outHeightCss;

  const ctx = out.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D context from canvas');
  }
  ctx.imageSmoothingEnabled = false;

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, out.width, out.height);

  // QR centered
  const qrX = Math.round((out.width - qrPx) / 2);
  const qrY = Math.round(margin * scale);
  ctx.drawImage(srcQR, qrX, qrY, qrPx, qrPx);

  // Divider (centered, relative to QR width)
  const dividerWidth = Math.round(qrPx * dividerWidthRatio);
  const dividerX = Math.round((out.width - dividerWidth) / 2);
  const dividerY = qrY + qrPx + Math.round(gapAfterQR * scale);
  ctx.fillStyle = fgColor;
  ctx.fillRect(dividerX, dividerY, dividerWidth, Math.round(dividerThickness * scale));

  // Label (centered)
  const fontPx = Math.round(18 * scale);
  ctx.font = `600 ${fontPx}px system-ui, -apple-system, Segoe UI, Roboto, Arial`;
  ctx.fillStyle = fgColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  const labelY = dividerY + Math.round(dividerThickness * scale) + Math.round(gapAfterDivider * scale);
  ctx.fillText(label, Math.round(out.width / 2), labelY);

  // Download
  await downloadCanvasAsImage({ canvas: out, fileName });
}
