import React from "react"
import { Chart, ELEMENT_CLASS_NAME, COMPONENT_CLASS_NAME } from "@antv/g2"
import { find } from "lodash"
import { cateAndValue } from "../types"
import { highlightAxis, noHighlightElement, multiHighlightElements } from "./HighLightElement"

interface BarChartProps {
  data: cateAndValue[] // n个{category:,value:}画柱状图
  handleCurBigChart: (ref: Chart | null) => void
  message: string | number | undefined
  hoverOrNot: boolean | undefined
  interactionType?: string // 专门给29 outliers之类留的，标明它需要高亮离群点
  drillDownGroup: string
}

const Categorization: React.FC<BarChartProps> = ({
  data,
  handleCurBigChart,
  message,
  hoverOrNot,
  interactionType,
  drillDownGroup,
}) => {
  const containerRef = React.useRef<Chart | null>(null)
  const CategorizationRef = React.useRef(null)
  const [testState, setTestState] = React.useState(0)
  const interactiveRef = React.useRef<Chart | null>(null)
  const processedData = data.slice(0, 7)
  // console.log("CategorizationData!!!!!!!!!!!", data)
  React.useEffect(() => {
    // const plotData = data.map((value, index) => ({
    //   category: index + 1,
    //   value,
    // }))

    if (!CategorizationRef.current) {
      return
    }
    const chart = new Chart({
      container: CategorizationRef.current,
      autoFit: true,
      height: 400,
      width: 600,
      axis: {
        x: { title: "Sales" },
        y: { title: drillDownGroup || "City" },
      },
    })
    // chart.coordinate({ transform: [{ type: "transpose" }] })
    chart.data(processedData)
    // console.log('CategorizationCategorizationCategorization', data)

    chart
      .interval()

      .encode("x", "category")
      .encode("y", "value")
      .encode("color", "#4474cc")
      .state("active", { fill: "#4474cc" })
      .state("inactive", { opacity: 0.5 })
    chart.interaction("elementHighlight", true)
    // containerRef.current = chart
    // if (!containerRef.current) return
    // handleCurBigChart(containerRef.current)
    interactiveRef.current = chart
    chart.render()

    // const timer = setTimeout(() => {
    //   setTestState(4)
    // }, 5000) // 2000毫秒后更新testState

    return () => {
      chart.destroy()
      // clearTimeout(timer)
    }
  }, [data])
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
    // 同理，X?.[0]是指如果X为null或undefined，就不取第一个元素，?.是一个语法糖 zyx

    // let highlightData = find(data, ["category", message])
    if (interactionType === "multiHighlight") {
      console.log("debug-Categorization-multi", message)
      if (typeof message === "string") {
        const numericValue = parseFloat(message)
        if (!Number.isNaN(numericValue)) {
          multiHighlightElements(interactiveRef.current, interactionType, numericValue)
        }
      }
    }

    if (interactionType === "ByValue") {
      const isString = (value: any) => typeof value === "string" || value instanceof String

      const highlightData = find(processedData, (item: cateAndValue) => {
        if (isString(message)) {
          return item.category === message
        }

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
  return <div ref={CategorizationRef} style={{ height: 400, width: 600 }} />
}
Categorization.defaultProps = {
  interactionType: "",
}
export default Categorization
