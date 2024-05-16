import React from "react"
import { Chart, ELEMENT_CLASS_NAME, COMPONENT_CLASS_NAME } from "@antv/g2"
import { cateAndValue } from "../types"

import { highlightAxis, noHighlightElement } from "./HighLightElement"

interface TemporalPeriodicityProps {
  data: cateAndValue[] // n个AAAA
  tagData: cateAndValue[] // 长度为n的下脚标列表，表明第几个点是周期边界点（从0开始计数）。
  message: string | number | undefined
  hoverOrNot: boolean | undefined
  interactionType?: string
}
// AAAA = {
//   category:数据类别，这n个可以一样
//   value:这个时间点的值
//   date:日期，是string，例如“Jan 1 2000”
// }
const TemporalPeriodicity: React.FC<TemporalPeriodicityProps> = ({
  data,
  tagData,
  message,
  hoverOrNot,
  interactionType,
}) => {
  const containerRef = React.useRef(null)
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
    data.forEach((dataItem) => {
      // 检查tagData数组中是否有与dataItem日期匹配的元素 zyx
      if (tagData.some((tagItem) => tagItem.date === dataItem.date)) {
        // 如果找到匹配项，将dataItem的category设置为'split'
        dataItem.category = "split"
      }
    })

    chart.data(data)
    // chart.scale({
    //   date: {
    //     min: 1,
    //     max: data.length,
    //   },
    //   value: {
    //     nice: true,
    //   },
    // })

    // chart.axis('date', {
    //   title: null,
    // })

    // chart.axis('value', {
    //   title: null,
    // })

    // chart.line().encode('x', 'category').encode('y', 'value')
    // // line.shape('smooth')
    // chart.encode('shape', 'smooth')
    chart
      .line()
      // .data(data)
      .encode("x", "date")
      .encode("y", "value")
      // .encode("color", "category")
      // .label({
      //   text: "value",
      //   transform: [{ type: "overlapDodgeY" }],
      //   fontSize: 10,
      // })
      .tooltip({ channel: "y", valueFormatter: ".1f" })
      .encode("color", "#4474cc")
      .encode("shape", "smooth")
      .axis("x", { tickFilter: (_: any, i: number) => i % 5 === 0 })
    // chart.data(tagData)

    // chart
    //   .lineX()
    //   // .transform({ type: "select", channel: "x", selector: (d) => item.category === "split" })
    //   .encode("x", "date")
    //   .style("stroke", "#F4664A")
    //   .style("strokeOpacity", 1)
    //   .style("lineWidth", 2)
    //   .style("lineDash", [4, 4])

    data.forEach((item) => {
      if (item.category === "split") {
        chart
          .line()
          .encode("x", item.date)
          .encode("y", "value")
          .style("stroke", "#F4664A")
          .style("strokeOpacity", 1)
          .style("lineWidth", 2)
      }
    })

    // tagData.forEach((item) => {
    //   chart
    //     .lineX()
    //     .encode("x", "date")
    //     .style("stroke", "#F4664A")
    //     .style("strokeOpacity", 1)
    //     .style("lineWidth", 2)
    //     .style("lineDash", [4, 4])
    // })
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
        for (let i = interactiveRef.current.children.length - 1; i > 3; i -= 1) {
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
      for (let i = lines.length - 1; i > 3; i -= 1) {
        lines[i].remove()
      }
      // console.log("debug-clear", lines)
    }
  }, [hoverOrNot])

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
}
TemporalPeriodicity.defaultProps = {
  interactionType: "",
}
export default TemporalPeriodicity
