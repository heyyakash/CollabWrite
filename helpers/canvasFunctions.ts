import { canvasRef, mouseEvent, setStateBoolean, setStateCurrentState, setStateElements, setStateNumber, setStateString, setStateStringArray } from "@/types/canvasTypes"
import { elements } from "@/types/elements"
import { shapes } from "@/types/shapes"
import React from "react"

//function to start drawing
export const startDrawing = (
    e: mouseEvent,
    setIsDrawing: setStateBoolean,
    setCursor: setStateBoolean,
    setLastX: setStateNumber,
    setLastY: setStateNumber,
    setCurrentX: setStateNumber,
    setCurrentY: setStateNumber

    ) => {
    setIsDrawing(true)
    setCursor(true)
    setLastX(e.clientX)
    setLastY(e.clientY)
    setCurrentX(e.clientX)
    setCurrentY(e.clientY)
}


//function to draw
export const draw = (
    e: mouseEvent,
    isDrawing: boolean,
    canvasRef: canvasRef,
    color: string,
    shape: string,
    setCurrentX: setStateNumber,
    setCurrentY:setStateNumber,
    currentX: number,
    currentY:number,
    setElemArr: setStateElements,
    lastX: number,
    lastY: number,
    setLastX: setStateNumber,
    setLastY: setStateNumber
    ) => {

    if (!isDrawing) return;
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

            else if (shape === "line") {
                setCurrentX(e.clientX)
                setCurrentY(e.clientY)
                const { clientX, clientY } = e
                setElemArr((elemArr) => [...elemArr, { lastX, lastY, clientX, clientY }])
                context.lineWidth = 2;
                context.strokeStyle = color;

            }

            else {
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

//function to stop drawing
export const stopDrawing = (e: mouseEvent, canvasRef: canvasRef, setCursor: setStateBoolean, setIsDrawing: setStateBoolean, elemArr: elements[], color: string, shape: shapes, setElemArr: setStateElements, stack: string[], setStack: setStateStringArray, setTop: setStateNumber, setCurrentState: setStateCurrentState, setProject: (data: any) => Promise<void>) => {
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
                else if (shape === "line") {
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


