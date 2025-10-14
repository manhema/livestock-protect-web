import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Stack } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import { type FC, type ReactNode, type RefObject, useRef, useState } from 'react';
import { downloadLabeledQRCodeWithDivider } from '../../../utils/html-to-canvas.ts';
// import { toast } from 'react-toastify';


export const ViewSiteQrCodeDialog = ({ title, url, builder }: { title: string; url: string; builder: (open: VoidFunction) => ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasHiResRef = useRef<HTMLCanvasElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {builder(handleOpen)}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle variant="h6" align="center">{title}</DialogTitle>
        <DialogContent sx={{ pt: '0.5rem' }}>
          <Divider sx={{ mb: '1rem' }} />
          <Box>
            <QRCodeCanvas
              ref={canvasRef}
              title={title}
              value={url}
              size={256}
              bgColor="#ffffff"
              marginSize={2}
            />

            {/* Hidden hi-res for export */}
            <QRCodeCanvas
              ref={canvasHiResRef}
              title={`${title} (export)`}
              value={url}
              size={1024} // <- crank this up for crisp print (1024–4096)
              bgColor="#ffffff"
              style={{ display: 'none' }}
            />
          </Box>
          <Divider sx={{ my: '1rem' }} />
          <Stack gap={2}>
            <DisplayLink url={url} />
            <DownloadQRCode canvas={canvasHiResRef} filename={title} label={title} />
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

function DisplayLink({ url }: { url: string }) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    // logEvent('access_protect_copy_to_clipboard_icon_pressed');
    // toast.success('Link copied!');
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      size="small"
      endIcon={<ContentCopyIcon />}
      onClick={handleCopy}>
      Copy Link
    </Button>
  );
}

interface DownloadQRCodeProps {
  canvas: RefObject<HTMLCanvasElement | null>;
  filename: string;
  label: string;
}

const DownloadQRCode: FC<DownloadQRCodeProps> = ({ canvas, filename, label }) => {
  const handleDownload = async () => {
    const node = canvas.current;
    if (node == null) {
      return;
    }

    await downloadLabeledQRCodeWithDivider({ canvas: node, fileName: `${filename} QR Code`, label });
  };

  return (
    <Button
      variant="contained"
      color="warning"
      size="small"
      endIcon={<DownloadOutlinedIcon />}
      onClick={handleDownload}>
      Download QR Code
    </Button>
  );
};
