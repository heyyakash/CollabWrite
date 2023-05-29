import React, { useEffect, useRef, useState } from "react";

type props = {
  color: string
}

const Canvas = ({color}:props) => {

  const canvasRef = useRef(null);
  const [currentState,setCurrentState] = useState(null)

  useEffect(() => {
    const canvas:any = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    canvas.width = 500;
    canvas.height = 500;
    // console.log(typeof data)
    if(currentState) context.putImageData(currentState , 0,0)

    // Set initial drawing styles
    context.strokeStyle = color;
    context.lineWidth = 2;

    let rect = canvas.getBoundingClientRect()

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e:any) => {
      isDrawing = true;
      [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
    };

    const draw = (e:any) => {
      if (!isDrawing) return;
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      context.stroke();
      // console.log(context.getImageData(0,0,500,500))
      setCurrentState(context.getImageData(0,0,500,500));
      // console.log(canvas.toDataURL());
      [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
    };

    const stopDrawing = () => {
      isDrawing = false;
    };

    // Add event listeners to track mouse movement
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      // Cleanup: remove event listeners when the component unmounts
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [color]);

  return <canvas className={`bg-[white]`} ref={canvasRef} />;
};

export default Canvas;
