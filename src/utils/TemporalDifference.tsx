import React from "react"
import { Chart } from "@antv/g2"
import { find } from "lodash"
import { cateAndValue } from "../types"
import { highlightAxis, noHighlightElement, multiHighlightElements } from "./HighLightElement"

interface DifferenceProps {
  iniData: cateAndValue[] // n个{category:,value:}画箱线图
  tagData: number[]
  message: string | number | undefined
  hoverOrNot: boolean | undefined
  interactionType?: string // 专门给29 outliers之类留的，标明它需要高亮离群点
}

const Difference: React.FC<DifferenceProps> = ({
  iniData,
  tagData,
  message,
  hoverOrNot,
  interactionType,
}) => {
  const containerRef = React.useRef(null)
  const interactiveRef = React.useRef<Chart | null>(null)
  // const data = tagData.map((year) => {
  //   const value = iniData
  //     .filter((item) => item.year === year)
  //     .reduce((acc, item) => acc + item.value, 0)
  //   return { year, value }
  // })
  React.useEffect(() => {
    if (!containerRef.current) return

    // const plotData = data.map((value, index) => ({
    //   category: index + 1,
    //   value,
    // }))
    // const data = iniData.map((item) => {
    //   const month = new Date(item.date).getMonth() + 1
    //   item.month = month
    //   return item
    // })

    const chart = new Chart({
      container: containerRef.current,
      autoFit: true,
      height: 400,
      width: 600,
      axis: {
        x: { title: "Year" },
        y: { title: "Profit" },
      },
    })
    // chart
    //   .data(data)
    //   .encode("x", "month")
    //   .encode("y", "value")
    //   .encode("color", "year")
    //   .scale("x", {
    //     range: [0, 1],
    //   })
    //   .scale("y", {
    //     nice: true,
    //   })
    //   .scale("color", {
    //     type: "ordinal",
    //     range: ["#7593ed", "#95e3b0", "#6c7893", "#e7c450", "#7460eb"],
    //   })

    // chart.line().encode("shape", "smooth")

    // chart.point().encode("shape", "point").tooltip(false)
    chart.interaction("elementHighlight", true)
    chart
      .interval()
      .data(iniData)
      .encode("x", "category")
      .encode("y", "value")
      .encode("color", "#4474cc")
      .state("active", { fill: "#4474cc" })
      .state("inactive", { opacity: 0.5 })
    // chart.axis("category", {
    //   title: {
    //     text: "Year", // 设置x轴的标题文本
    //   },
    // })
    // chart.axis("value", {
    //   title: {
    //     text: "Profit", // 设置x轴的标题文本
    //   },
    // })
    interactiveRef.current = chart
    chart.render()

    return () => {
      chart.destroy()
    }
  }, [iniData])
  React.useEffect(() => {
    if (!interactiveRef.current) {
      return
    }

    if (message === undefined) {
      return
    }
    // const highlightData = data.filter((item) => item.category === message).[0]
    // const highlightData = data?.filter((item) => item.category === message)?.[0]
    // ?.是猜疑链 data?.filter是指，如果data是null或undefined，就不调用filter，而是直接返回undefined，
    // 同理，X?.[0]是指如果X为null或undefined，就不取第一个元素，?.是一个语法糖

    // let highlightData = find(data, ["category", message])
    if (interactionType === "ByValue") {
      const isString = (value: any) => typeof value === "string" || value instanceof String

      const highlightData = find(iniData, (item: cateAndValue) => {
        if (isString(message)) {
          return item.category === message
        }

        // message是number才是比较value的
        const fixedItemValue = item.value.toFixed(2)
        const fixedMessage = (message as number).toFixed(2)
        return fixedItemValue === fixedMessage
      })
      // const highlightData = data.slice(0, 3)
      if (highlightData) {
        // data?.filter((item) => item.category === message)?.[0]
        interactiveRef.current?.emit("element:highlight", {
          data: { data: highlightData },
        })
      }
    }
    if (interactionType === "x-axis" || interactionType === "y-axis") {
      highlightAxis(interactiveRef.current, interactionType)
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
    }
  }, [hoverOrNot])
  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
}
Difference.defaultProps = {
  interactionType: "",
}
export default Difference
