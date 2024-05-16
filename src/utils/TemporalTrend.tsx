import React from "react"
import { Chart, ELEMENT_CLASS_NAME, COMPONENT_CLASS_NAME } from "@antv/g2"
import { find } from "lodash"
import { cateAndValue } from "../types"
import { highlightAxis, noHighlightElement } from "./HighLightElement"

interface TemporalTrendProps {
  data: cateAndValue[] // n个AAAA
  tagData: cateAndValue[] // 4个AAAA,这四个点可以形成弯折的回归线，这四个点的date必须是真实值和预测值的边界
  message: string | number | undefined
  hoverOrNot: boolean | undefined
  interactionType?: string // 专门给29 outliers之类留的，标明它需要高亮离群点
}
// AAAA={
//   date: 'Jan 10 2000',
//   value: 7,
//   category: 'predict'或者是'real',表明这是否是预测值
// },

const TemporalTrend: React.FC<TemporalTrendProps> = ({
  data,
  tagData,
  message,
  hoverOrNot,
  interactionType,
}) => {
  const containerRef = React.useRef(null)

  // console.log("SlicedBigChartData.detailSlicedBigChartData.detail", data)
  // console.log("tagDatatagDatatagDatatagData", tagData)
  const interactiveRef = React.useRef<Chart | null>(null)
  React.useEffect(() => {
    if (!containerRef.current) return

    // const plotData = data.map((value, index) => ({
    //   date: index + 1,
    //   value,
    // }))

    const chart = new Chart({
      container: containerRef.current,
      autoFit: true,
      height: 400,
      width: 600,
      axis: {
        x: { title: "Date" },
        y: { title: "Sales" },
      },
    })

    // chart.data(data).axis('y', { title: false }).scale('x', { type: 'linear', tickCount: 10 })

    const realValue = data.filter((item) => item.category === "real")
    const predictValue = data.filter((item) => item.category === "predict")
    // const realtag = tagData.filter((item) => item.category === 'value')
    // const predictTag = tagData.filter((item) => item.category === 'predict')
    // console.log("realValuerealValuerealValuerealValue", realValue)
    // console.log(new Date(realValue[0].date))
    chart
      .line()
      .data(realValue)
      .encode("x", "date")
      .encode("y", "value")
      .encode("color", "#4474cc")
      .encode("shape", "smooth")
      .style("lineWidth", 1)
    chart
      .line()
      .data(predictValue)
      .encode("x", "date")
      .encode("y", "value")
      .encode("color", "#4474cc")
      .encode("shape", "smooth")
      .style("lineWidth", 1)
      .style("opacity", 0.5)
      .style("lineDash", [3, 3])

    chart
      .line()
      .data(tagData)
      .encode("x", "date")
      // .encode("x", (d: cateAndValue) => d.date)
      .encode("y", "value")
      .encode("color", "gray")
      .style("lineDash", [3, 3])
      .axis("x", { tickFilter: (_: any, i: number) => i % 5 === 0 })
    chart.interaction("elementHighlight", true)
    interactiveRef.current = chart
    chart.render()

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
    if (interactionType === "ByValue") {
      const lineY = message
      const lineX = data.find((item) => parseFloat(item.value.toFixed(2)) === message)?.date
      if (lineX && lineY) {
        console.log("lineX && lineY", lineX, lineY)
        for (let i = interactiveRef.current.children.length - 1; i > 2; i -= 1) {
          interactiveRef.current.children[i].remove()
        }
        // interactiveRef.current.render()
        interactiveRef.current
          .line()
          .data(data)
          .encode("x", "date")
          .encode("y", lineY)
          .encode("color", "#ea5322")
        interactiveRef.current
          .line()
          .data(data)
          .encode("x", lineX)
          .encode("y", "value")
          .encode("color", "#ea5322")
        interactiveRef.current.render()
      }
    }
    if (interactionType === "x-axis" || interactionType === "y-axis") {
      highlightAxis(interactiveRef.current, interactionType)
    }
    if (interactionType === "Temporal Trend Regression") {
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

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const lines = _.filter(elements, (element) => element.markType === "line")
      for (let i = lines.length - 1; i > 2; i -= 1) {
        lines[i].remove()
      }
      // console.log("debug-clear", lines)
    }
  }, [hoverOrNot])
  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
}
TemporalTrend.defaultProps = {
  interactionType: "",
}
export default TemporalTrend
