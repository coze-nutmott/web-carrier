/**
 * File을 data url로 변환합니다.
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise<string>(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      if (ev.target?.readyState === FileReader.DONE) {
        resolve(ev.target.result as string);
      }
    };
  });
}

/**
 * url의 이미지를 data url로 변환합니다.
 *
 * canvas에 이미지를 그린 후 data url로 변환하기 때문에 다른 도메인의 이미지를 사용할 수 없습니다.
 */
export async function urlImageToDataUrl(
  url: string,
  size?: { width: number; height: number },
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const image = new Image();
    image.onload = function () {
      const canvas = document.createElement('canvas');
      if (!canvas) return reject(new Error('Cannot create canvas'));
      if (size) {
        canvas.width = size.width;
        canvas.height = size.height;
      } else {
        canvas.width = image.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = image.naturalHeight; // or 'height' if you want a special/scaled size
      }

      canvas
        .getContext('2d')
        ?.drawImage(
          image,
          0,
          0,
          image.naturalWidth,
          image.naturalHeight,
          0,
          0,
          canvas.width,
          canvas.height,
        );
      resolve(canvas.toDataURL('image/png'));
    };
    image.onerror = () => {
      reject(new Error('Cannot load image'));
    };
    console.log(url);
    image.src = url;
  });
}
