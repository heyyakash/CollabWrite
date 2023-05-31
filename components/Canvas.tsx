import { Client, Databases } from "appwrite";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";

type props = {
  color: string
  shape: 'square' | 'circle' | null
}

const Canvas = ({ color, shape }: props) => {
  const router = useRouter()
  const { id } = router.query
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
  const databases = new Databases(client)
  const queryClient = useQueryClient()
  const userData: any = queryClient.getQueryData("userData")
  const projectData: any = queryClient.getQueryData("project")

  const setProject = async (data: any) => {
    databases.updateDocument("6475e4e81155c46f87b6", "6475f82bb6f201570328", id as string, {
      data: data.toString(),
      edited_by: userData.email
    }).then(d => console.log("Done")).catch(err => console.log(err))
  }


  const canvasRef = useRef(null);
  const [currentState, setCurrentState] = useState(null)


  useEffect(() => {
    const unsubscribe = client.subscribe(['databases.6475e4e81155c46f87b6.collections.6475f82bb6f201570328.documents.6476004ec7bb70ab3797', 'files'], (response:any) => {
      setImage(response.payload.data)
    });
    return ()=> unsubscribe()
  }, [])


  useEffect(() => {
    const canvas: any = canvasRef.current;
    const context = canvas.getContext("2d");
    if(projectData?.data) setImage(projectData.data)
    canvas.width = 1000;
    canvas.height = 700;
    if (currentState) {
      const image = new Image()
      image.onload = () => {
        context.drawImage(image, 0, 0)
      }
      image.src = currentState
    }

    context.strokeStyle = color;
    context.lineWidth = 2;

    let rect = canvas.getBoundingClientRect()

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e: any) => {
      isDrawing = true;
      [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
    };

    const draw = (e: any) => {
      if (!isDrawing) return;
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      context.stroke();
      setCurrentState(canvas.toDataURL());
      [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
    };

    const stopDrawing = () => {
      // setProject(context.getImageData(0, 0, 1000, 700))
      setProject(canvas.toDataURL())
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

  const setImage = (image:string) => {

    const canvas: any = canvasRef.current
    console.log("setimage", image)
    if (canvas) {
      const context = canvas.getContext("2d")
      if (image) {
        const img = new Image()
        img.onload = () => {
          context.drawImage(img, 0, 0)
        }
        img.src = image
      }
    }
  }

  return <canvas className={`bg-black`} ref={canvasRef} />;
};

export default Canvas;
