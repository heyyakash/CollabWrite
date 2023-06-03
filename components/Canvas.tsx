import { Client, Databases } from "appwrite";
import { clear } from "console";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useQueryClient } from "react-query";

type props = {
    color: string
    shape: 'square' | 'circle' | 'erasure' | null
}

const Canvas = ({ color, shape }: props) => {
    const router = useRouter()
    const { id } = router.query
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    const databases = new Databases(client)
    const queryClient = useQueryClient()

    const projectData: any = queryClient.getQueryData("project")

    const setProject = async (data: any) => {
        const userData: any = queryClient.getQueryData("userData")
        const { id } = router.query
        databases.updateDocument("6475e4e81155c46f87b6", "6475f82bb6f201570328", id as string, {
            data: data.toString(),
            edited_by: userData?.email
        }).then(d => console.log("Done")).catch(err => console.log(err))
    }


    const canvasRef = useRef(null);
    const [currentState, setCurrentState] = useState(null)


    useEffect(() => {
        setCurrentState(null)
        const unsubscribe = client.subscribe([`databases.6475e4e81155c46f87b6.collections.6475f82bb6f201570328.documents.${id}`, 'files'], (response: any) => {
            const userData: any = queryClient.getQueryData("userData")
            if (response.payload.edited_by !== userData.email) {
                console.log("Changed")
                console.log(response.payload.data)
                setImage(response.payload.data)
            }
        });
        return () => unsubscribe()
    }, [])


    useEffect(() => {
        const canvas: any = canvasRef.current;
        const context = canvas.getContext("2d");
        if (projectData?.data && projectData?.data !== "null") setImage(projectData.data)
        if (currentState) {
            const image = new Image()
            image.onload = () => {
                context.drawImage(image, 0, 0)
            }
            image.src = currentState
        }

        canvas.height = window.innerHeight
        canvas.width = window.innerWidth * .75
        context.height
        context.strokeStyle = color;
        context.lineWidth = 2;

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        let currentX = 0;
        let currentY = 0;
        const eraserSize = 50;
        const rect = canvas.getBoundingClientRect();

        const startDrawing = (e: any) => {
            isDrawing = true;
            [lastX, lastY] = [e.clientX, e.clientY];
            [currentX, currentY] = [e.clientX, e.clientY];
        };

        const draw = (e: any) => {
            if (!isDrawing) return;



            if (shape === "square") {
                [currentX, currentY] = [e.clientX, e.clientY];
                const width = (currentX - lastX);
                const height = (currentY - lastY);
                context.beginPath();
                console.log(width, height)
                context.rect(lastX, lastY, width, height);
                context.stroke();
                context.fill()
            }
            else if (shape === "circle") {
                [currentX, currentY] = [e.clientX, e.clientY];
                const radius = Math.sqrt(
                    Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2)
                );
                context.beginPath();
                context.arc(lastX, lastY, radius, 0, 2 * Math.PI);
                context.stroke();
                context.fill();
            }

            else if (shape === "erasure") {
                // Calculate the position within the canvas
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Use the eraser to clear a portion of the canvas
                context.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize);
            }

            else {
                context.beginPath();
                context.moveTo(lastX, lastY);
                context.lineTo(e.clientX, e.clientY);
                context.stroke();
                [lastX, lastY] = [e.clientX, e.clientY];
            }

        };


        const stopDrawing = () => {
            console.log(canvas.toDataURL())
            setCurrentState(canvas.toDataURL());
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
    }, [color, shape]);

    const setImage = (image: string) => {

        const canvas: any = canvasRef.current
        if (canvas) {

            const context = canvas.getContext("2d")
            context.clearRect(0, 0, canvas.width, canvas.height)
            if (image.length > 0) {
                const img = new Image()
                img.onload = () => {
                    context.drawImage(img, 0, 0)
                }
                img.src = image
                return
            }
            context.clearRect(0, 0, canvas.width, canvas.height)
        }
    }

    const clearCanvas = () => {
        const canvas: any = canvasRef.current
        if (canvas) {
            const context = canvas.getContext("2d")
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.drawImage(canvas, 0, 0);
            setCurrentState(canvas.toDataURL())
            setProject(canvas.toDataURL())
        }
    }

    return (
        <>
            <Link href="/dashboard" className={`absolute left-3 rounded-md bg-white/20 top-2 text-white p-2`}>
                <MdArrowBack />
            </Link>
            <button onClick={() => clearCanvas()} className="absolute bg-red-500 text-white font-bold trans hover:bg-white hover:text-red-500 cursor-pointer top-2 right-2 p-2 rounded-md">Clear</button>
            <canvas className={`bg-black`} ref={canvasRef} />
        </>
    );
};

export default Canvas;