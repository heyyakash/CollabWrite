import { Client, Databases } from "appwrite";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";

type props = {
  color: string;
  shape: 'square' | 'circle' | null;
};

const Canvas = ({ color, shape }: props) => {
  const router = useRouter();
  const { id } = router.query;
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);
  const databases = new Databases(client);
  const queryClient = useQueryClient();
  const userData: any = queryClient.getQueryData("userData");
  const projectData: any = queryClient.getQueryData("project");

  const setProject = async (data: any) => {
    databases
      .updateDocument("6475e4e81155c46f87b6", "6475f82bb6f201570328", id as string, {
        data: data.toString(),
        edited_by: userData.email
      })
      .then(d => console.log("Done"))
      .catch(err => console.log(err));
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [currentState, setCurrentState] = useState(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) {
      canvas!.width = 1000;
      canvas!.height = 700;
      context.strokeStyle = color;
      context.lineWidth = 2;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setCurrentX(e.clientX);
      setCurrentY(e.clientY);
    };

    const handleMouseUp = () => {
      setDrawing(false);
      setCurrentState(canvas?.toDataURL());
      setProject(canvas?.toDataURL());
    };

    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [color]);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      if (projectData?.data) {
        const image = new Image();
        image.onload = () => {
          context.drawImage(image, 0, 0);
        };
        image.src = projectData.data;
      } else {
        context.clearRect(0, 0, canvas!.width, canvas!.height);
      }
    }
  }, [projectData]);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      if (currentState) {
        const image = new Image();
        image.onload = () => {
          context.drawImage(image, 0, 0);
        };
        image.src = currentState;
      }

      if (shape === "square" || shape === "circle") {
        context.strokeStyle = color;
        context.fillStyle = color;
      }
    }
  }, [shape, currentState, color]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setCurrentX(e.clientX);
    setCurrentY(e.clientY);
  };

  const drawShape = (ctx: CanvasRenderingContext2D) => {
    if (shape === "square") {
      const width = currentX - startX;
      const height = currentY - startY;
      ctx.beginPath();
      ctx.rect(startX, startY, width, height);
      ctx.stroke();
      ctx.fill();
    } else if (shape === "circle") {
      const radius = Math.sqrt(
        Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2)
      );
      ctx.beginPath();
      ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (drawing && canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(canvas, 0, 0);

      if (shape === "square" || shape === "circle") {
        drawShape(context);
      } else {
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(e.clientX, e.clientY);
        context.stroke();
      }
    }
  };

  return (
    <canvas
      className="bg-black"
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    />
  );
};

export default Canvas;