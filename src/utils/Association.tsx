import React, { useImperativeHandle, forwardRef, useRef, useEffect } from "react"
import { Chart, ELEMENT_CLASS_NAME, COMPONENT_CLASS_NAME } from "@antv/g2"
import { find } from "lodash"
import { Point } from "../types"
import { highlightAxis, noHighlightElement, multiHighlightElements } from "./HighLightElement"

interface AssociationProps {
  data: Point[] // n个point画散点图
  tagData: Point[] // 2个point画回归线
  message: string | number | undefined
  hoverOrNot: boolean | undefined
  interactionType?: string
}

// const Association: React.FC<AssociationProps> = ({ data, tagData }) => {
const Association = forwardRef(
  ({ data, tagData, message, hoverOrNot, interactionType }: AssociationProps, ref) => {
    const containerRef = React.useRef(null)
    const chartRef = useRef<Chart | null>(null)
    const interactiveRef = React.useRef<Chart | null>(null)
    // 使用 useImperativeHandle 将 chart 实例暴露给父组件
    useImperativeHandle(ref, () => ({
      getChart: () => chartRef.current,
    }))

    const k = (tagData[1].y - tagData[0].y) / (tagData[1].x - tagData[0].x)
    const b = tagData[1].y - k * tagData[1].x
    React.useEffect(() => {
      // Create a new chart instance
      if (!containerRef.current) return
      const chart = new Chart({
        container: containerRef.current,
        autoFit: true,
        height: 500,
        tooltip: false,
        axis: {
          x: { title: "Sales" },
          y: { title: "Profit" },
        },
      })
      // console.log('散点图datadatadatadata', data)

      // Load the data
      // chart

      // Create a scatter plot
      chart
        .data(data)
        .point()
        .encode("x", "x")
        .encode("y", "y")
        .state("active", { fill: "#4474cc" })
        .state("inactive", { opacity: 0.5 })
      // Generate data for the line y = x
      // const maxAbsX = data.reduce((max, current) => Math.max(max, Math.abs(current.x)), 0)
      // const lineData = [
      //   { x: -maxAbsX, y: -maxAbsX * k + b },
      //   { x: maxAbsX, y: maxAbsX * k + b },
      // ]

      // Add the line to the chart
      chart
        .line()
        .encode("x", "x")
        .encode("y", "y")
        .encode("color", "blue")
        .data(tagData)
        .state("active", { opacity: 1 })
        .state("inactive", { opacity: 0.5 })
      chart.interaction("elementHighlight", true)
      chart.interaction("tooltip", false)
      // chart.options({ tooltip: false })
      interactiveRef.current = chart
      // Render the chart
      chart.render()
      // console.log('chartchartchartchartchartchart', chart)
      chartRef.current = chart
      return () => {
        chart.destroy()
      }
    }, [data])
    React.useEffect(() => {
      if (!interactiveRef.current) {
        return
      }
      if (message === undefined) {
        return
      }
      if (interactionType === "ByValue" && typeof message === "number") {
        const lineX = message
        const lineY = k * message + b
        if (lineX && lineY) {
          for (let i = interactiveRef.current.children.length - 1; i > 1; i -= 1) {
            interactiveRef.current.children[i].remove()
          }
          // interactiveRef.current.render()
          interactiveRef.current
            .line()
            .data(data)
            .encode("x", "x")
            .encode("y", lineY)
            .encode("color", "#ea5322")
          interactiveRef.current
            .line()
            .data(data)
            .encode("x", lineX)
            .encode("y", "y")
            .encode("color", "#ea5322")
          interactiveRef.current.render()
        }
      }
      if (interactionType === "x-axis" || interactionType === "y-axis") {
        highlightAxis(interactiveRef.current, interactionType)
      }
      if (interactionType === "Association Regression") {
        interactiveRef.current?.emit("element:highlight", {
          data: { data: tagData[0] },
        })
      }
    }, [message])
    React.useEffect(() => {
      if (!interactiveRef.current) {
        return
      }
      if (hoverOrNot === undefined) {
        return
      }
      if (!hoverOrNot) {
        noHighlightElement(interactiveRef.current)
        const { canvas } = interactiveRef.current.getContext()
        if (!canvas) return
        const elements = canvas.document.getElementsByClassName(ELEMENT_CLASS_NAME)
        // console.log("lineX && lineY", elements)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const lines = _.filter(elements, (element) => element.markType === "line")
        for (let i = lines.length - 1; i > 0; i -= 1) {
          lines[i].remove()
        }
      }
    }, [hoverOrNot])

    return <div ref={containerRef} style={{ height: 400, width: 600 }} />
  },
)
Association.defaultProps = {
  interactionType: "",
}
export default Association
