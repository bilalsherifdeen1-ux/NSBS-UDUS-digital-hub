export const fileToOptimizedDataUrl = (
  file: File,
  options: { maxWidth?: number; maxHeight?: number; quality?: number; maxBytes?: number } = {}
): Promise<string> => {
  const { maxWidth = 640, maxHeight = 640, quality = 0.82, maxBytes = 700_000 } = options;
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Choose an image file (PNG, JPG, WebP, or another browser-supported format).'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('The selected image could not be read.'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('The selected image could not be decoded.'));
      image.onload = () => {
        const scale = Math.min(1, maxWidth / image.width, maxHeight / image.height);
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext('2d');
        if (!context) {
          reject(new Error('Image processing is not available in this browser.'));
          return;
        }
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        let output = canvas.toDataURL('image/jpeg', quality);
        if (Math.ceil((output.length * 3) / 4) > maxBytes) {
          output = canvas.toDataURL('image/jpeg', Math.max(0.5, quality - 0.2));
        }
        if (Math.ceil((output.length * 3) / 4) > maxBytes) {
          reject(new Error('This image is still too large after optimization. Please choose a smaller image.'));
          return;
        }
        resolve(output);
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
};

export const certificateImageFormat = (dataUrl?: string): 'PNG' | 'JPEG' | null => {
  if (!dataUrl) return null;
  if (dataUrl.startsWith('data:image/png')) return 'PNG';
  if (dataUrl.startsWith('data:image/jpeg') || dataUrl.startsWith('data:image/jpg')) return 'JPEG';
  return null;
};
