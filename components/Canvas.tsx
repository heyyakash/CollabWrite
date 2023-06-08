import getInitialClient from "@/helpers/getClient";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useQuery, useQueryClient } from "react-query";
import UpperToolBar from "./UpperToolBar";
import { shapes } from "@/types/shapes";
import pattern from '../public/pattern.png'

type props = {
    color: string
}

const Canvas = ({ color }: props) => {
    const router = useRouter()
    const { id } = router.query
    const { client, account, databases } = getInitialClient()
    const queryClient = useQueryClient()

    const projectData: any = queryClient.getQueryData("project")
    const data: any = queryClient.getQueryData("userData")

    const setProject = async (data: any) => {
        const userData: any = queryClient.getQueryData("userData")
        const { id } = router.query
        databases.updateDocument("6475e4e81155c46f87b6", "6475f82bb6f201570328", id as string, {
            data: data.toString(),
            edited_by: userData?.email
        }).then(d => console.log("Done")).catch(err => console.log(err))
    }


    // const canvasRef = useRef<HTMLCanvasElement>(null);
    // const [currentState, setCurrentState] = useState(null)


    useEffect(() => {
        setCurrentState(null)
        const unsubscribe = client.subscribe([`databases.6475e4e81155c46f87b6.collections.6475f82bb6f201570328.documents.${id}`, 'files'], (response: any) => {

            if (response.payload.edited_by !== data.email) {
                setImage(response.payload.data)
            }
        });
        return () => unsubscribe()
    }, [])




    const patternRef = useRef<HTMLImageElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [currentState, setCurrentState] = useState<string | null>(null)
    const cursorRef = useRef<HTMLDivElement>(null)
    const [isDrawing, setIsDrawing] = useState<boolean>(false)
    const [lastX, setLastX] = useState<number>(0)
    const [lastY, setLastY] = useState<number>(0)
    const [currentX, setCurrentX] = useState<number>(0)
    const [currentY, setCurrentY] = useState<number>(0)
    const [elemArr, setElemArr] = useState<elements[]>([])
    const [cursor, setCursor] = useState<boolean>(false)
    const [stack, setStack] = useState<string[]>([])
    const [top, setTop] = useState<number>(-1)
    const [shape, setShape] = useState<shapes>("free")
    type elements = {
        width?: number,
        height?: number,
        lastX: number,
        lastY: number,
        radius?: number
        currentX?: number,
        currentY?: number
    }


    useEffect(() => {
        const canvas: HTMLCanvasElement | null = canvasRef.current
        if (canvas) {
            canvas.height = window.innerHeight
            canvas.width = window.innerWidth * .75;
            const context: CanvasRenderingContext2D | null = canvas.getContext("2d")
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height)
                if (projectData?.data && projectData?.data !== "null") setImage(projectData.data)
                const data = canvas.toDataURL()
                setStack((stack) => [...stack, data])
                setTop(stack.length - 1)
            }
        }
    }, [])

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        setIsDrawing(true)
        setCursor(true)
        setLastX(e.clientX)
        setLastY(e.clientY)
        setCurrentX(e.clientX)
        setCurrentY(e.clientY)
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!isDrawing) return;
        const cursor = cursorRef.current
        if (cursor) {
            cursor.style.backgroundColor = "green"
        }
        const canvas: HTMLCanvasElement | null = canvasRef.current
        if (canvas) {

            const context: CanvasRenderingContext2D | null = canvas.getContext("2d")
            if (context) {
                context.strokeStyle = color
                if (shape === "square") {
                    setCurrentX(e.clientX)
                    setCurrentY(e.clientY)
                    const width = (currentX - lastX)
                    const height = (currentY - lastY)
                    setElemArr((elemArr) => [...elemArr, { lastX, lastY, width, height }])

                }

                else if (shape === "circle") {
                    setCurrentX(e.clientX)
                    setCurrentY(e.clientY)
                    const radius = Math.sqrt(
                        Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2)
                    );
                    setElemArr((elemArr) => [...elemArr, { lastX, lastY, radius }])
                }

                else if (shape === "arrow") {
                    setCurrentX(e.clientX)
                    setCurrentY(e.clientY)
                    setElemArr((elemArr) => [...elemArr, { lastX, lastY, currentX, currentY }])

                }

                else if (shape === "erasure") {
                    const eraserSize = 50
                    const rect = canvas.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    context.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize);
                }

                else if(shape === "line"){
                    setCurrentX(e.clientX)
                    setCurrentY(e.clientY)
                    const { clientX, clientY } = e
                    setElemArr((elemArr) => [...elemArr, { lastX, lastY, clientX, clientY }])
                    context.lineWidth = 2;
                    context.strokeStyle = color;

                }
        
                else{
                    context.moveTo(lastX, lastY);
                    context.lineTo(e.clientX, e.clientY);
                    context.stroke();
                    context.fill()
                    setLastX(e.clientX)
                    setLastY(e.clientY)
                }

            }
        }


    }


    const undo = () => {
        const canvas = canvasRef.current
        if (top !== -1) {
            if (canvas) {
                const context = canvas.getContext("2d")
                if (context) {
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    context.globalAlpha = 1
                }
            }
            setTop(top - 1)
            setImage(stack[top])

            setCurrentState(stack[top])
            setProject(stack[top])
        }
    }

    const setImage = (image: string) => {

        const canvas = canvasRef.current
        if (canvas) {

            const context = canvas.getContext("2d")
            if (context) {
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
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        if (canvas) {
            canvas.height = window.innerHeight
            canvas.width = window.innerWidth * .75;
            const context: CanvasRenderingContext2D | null = canvas.getContext("2d")
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height)
                const data = canvas.toDataURL()
                setStack((stack) => [...stack, data])
                setTop(stack.length - 1)
            }
        }
    }

    const downlaodPdf = () => {
        const canvas = canvasRef.current as HTMLCanvasElement | null;

        if (canvas) {
            const context = canvas?.getContext("2d");
            if (context) {
                const imageData = canvas.toDataURL('image/jpeg');
                window.open(imageData, '_blank')

            }
        }
    }




    const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        setCursor(false)
        setIsDrawing(false)
        const canvas: HTMLCanvasElement | null = canvasRef.current
        if (canvas) {
            const context: CanvasRenderingContext2D | null = canvas.getContext("2d")
            if (context) {
                if (elemArr.length > 0) {
                    const { lastX, lastY, width, height, radius, currentX, currentY } = elemArr[elemArr.length - 1]
                    context.lineWidth = 4
                    context.strokeStyle = color
                    context.fillStyle = color
                    context.globalAlpha = 0.3
                    context.beginPath()
                    if (shape === "square") {
                        context.rect(lastX, lastY, width ? width : 0, height ? height : 0)
                    }
                    else if (shape === "circle") {
                        context.arc(lastX, lastY, radius ? radius : 0, 0, 2 * Math.PI);
                    }
                    else if (shape === "arrow") {
                        if (currentX && currentY) {
                            const angle = Math.atan2(currentY - lastY, currentX - lastX);
                            const length = Math.sqrt((currentX - lastX) ** 2 + (currentY - lastY) ** 2);
                            context.moveTo(lastX, lastY);
                            context.lineTo(currentX, currentY);
                            context.stroke();

                            // Draw the arrowhead
                            context.save();
                            context.translate(currentX, currentY);
                            context.rotate(angle);
                            context.beginPath();
                            context.moveTo(0, 0);
                            context.lineTo(-10, -5);
                            context.lineTo(-10, 5);
                            context.closePath();
                            context.fill();
                            context.restore();
                        }
                    }
                    else if(shape==="line") {
                        context.moveTo(lastX, lastY);
                        context.lineTo(e.clientX, e.clientY);
                        context.stroke();
                    }
                    context.stroke()
                    context.fill()
                    setElemArr([])
                }
            }
            const dataUrl = canvas.toDataURL()
            setCurrentState(dataUrl)
            setStack((stack) => [...stack, dataUrl])
            setTop(stack.length - 1)
            setProject(dataUrl)

        }

    }

    return (
        <>
            <UpperToolBar undo={undo} download={downlaodPdf} clear={clearCanvas} shape={shape} setShape={setShape} />
            {/* <div style={{ top: lastY, left: lastX, width: currentX - lastX, height: currentY - lastY }} className={`absolute border-2 border-white/30  h-5 w-5 ${cursor && shape==="circle"?"block":"hidden"} top-10`}></div> */}
            <div style={{ top: lastY, left: lastX, width: (currentX - lastX), height: (currentY - lastY) }} className={`absolute border-2 border-white/30  h-5 w-5 ${cursor && shape === "square" ? "block" : "hidden"} top-10`}></div>
            <div style={{ top: lastY, left: lastX, width: (currentX - lastX), height: "5px" }} className={`absolute border-2 border-white/30 ${shape === "circle" ? "rounded-full" : ""} h-5 w-5 ${cursor && shape === "circle" ? "block" : "hidden"} top-10`}></div>
            <Link href="/dashboard" className={`absolute left-3 rounded-md bg-green-400/70 top-3 text-white p-2`}>
                <MdArrowBack />
            </Link>
            <img src="/pattern.svg" id="sbgImage" style={{ display: "none" }} ref={patternRef} alt="" />

            <canvas
                onMouseDown={(e) => startDrawing(e)}
                onMouseMove={(e) => draw(e)}
                onMouseUp={(e) => stopDrawing(e)}
                ref={canvasRef}
            />

        </>
    );
};

export default Canvas;