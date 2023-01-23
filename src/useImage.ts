import { useState, useEffect } from 'react';

export const useImage = (src: string) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    const loader = new Image();
    loader.onload = () => {
      setImage(loader);
    };
    loader.src = src;
  }, [src])

  return { image }
}
