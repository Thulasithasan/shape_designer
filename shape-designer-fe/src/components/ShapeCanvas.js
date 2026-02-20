import React, { useRef, useEffect } from "react";

const ShapeCanvas = ({ shape, dimensions, canvasWidth = 300, canvasHeight = 300 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // set canvas size dynamically
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.beginPath();

    if (shape === "RECTANGLE") {
      ctx.rect(canvasWidth / 2 - (dimensions.width || 200) / 2, canvasHeight / 2 - (dimensions.height || 100) / 2, dimensions.width || 200, dimensions.height || 100);
    }

    if (shape === "CIRCLE") {
      ctx.arc(canvasWidth / 2, canvasHeight / 2, dimensions.radius || 50, 0, Math.PI * 2);
    }

    if (shape === "TRIANGLE") {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const w = dimensions.width || 100;  // fallback width
  const h = dimensions.height || 100; // fallback height

  // Top vertex
  ctx.moveTo(centerX, centerY - h / 2);
  // Bottom left
  ctx.lineTo(centerX - w / 2, centerY + h / 2);
  // Bottom right
  ctx.lineTo(centerX + w / 2, centerY + h / 2);
  ctx.closePath();
}


    ctx.stroke();
  }, [shape, dimensions, canvasWidth, canvasHeight]);

  return (
    <div className="border rounded-lg shadow p-4 bg-white text-center">
      <canvas ref={canvasRef}/>
    </div>
  );
};

export default ShapeCanvas;
