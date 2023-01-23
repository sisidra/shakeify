import React, { useState, useRef, useEffect } from 'react';
import { Who } from "./Shakeify";
import handDownPng from './assets/hand-down.png'
import handUpPng from './assets/hand-up.png'
import { useImage } from './useImage';

function getDescenderHeight(context: CanvasRenderingContext2D) {
  const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
  for (var y = imageData.height - 1; y >= 0; y--) {
    for (var x = imageData.width - 1; x >= 0; x--) {
      if (imageData.data[(y * imageData.width + x) * 4 + 3] !== 0) {
        return imageData.height - y;
      }
    }
  }
  return 0;
}

export const CanvasFrame = ({ who }: { who: Who }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handDownImage = useImage(handDownPng);
  const handUpImage = useImage(handUpPng);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d', { willReadFrequently: true })!;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    if (handDownImage.image !== null) {
      context.drawImage(handDownImage.image, 0, 0);
    }

    if (who.native !== undefined) {
      const whoCanvas = document.createElement("canvas");
      const whoContext = whoCanvas.getContext("2d", { willReadFrequently: true })!;
      whoCanvas.width = canvas.width;
      whoCanvas.height = canvas.height;

      const textSize = Math.floor(context.canvas.height * 0.8);
      whoContext.font = textSize + 'px EmojiMart, "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji"';
      whoContext.textBaseline = 'ideographic';
      whoContext.textAlign = "left";
      whoContext.fillText(who.native, 0, whoContext.canvas.height);

      const h = getDescenderHeight(whoContext);
      context.drawImage(whoCanvas, 4, h - 9);

    } else if (who.src !== undefined) {
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 4, context.canvas.height * 0.3 - 9, context.canvas.width * 0.7, context.canvas.height * 0.7);
      };
      img.src = who.src;
    }

  }, [who]);

  return <canvas style={{ border: "1px solid #000000" }} ref={canvasRef} width={128} height={128}></canvas>
}
