import React from "react"
import { Chart } from "@antv/g2"
import { find } from "lodash"
import { cateAndValue } from "../types"
// interface PieChartData {
//   type: string
//   value: number
// }

interface PieChartProps {
  data: cateAndValue[] // n个{category:,value:}画饼图
  handleCurBigChart: (ref: Chart | null) => void
  message: string | number | undefined
  hoverOrNot: boolean | undefined
}

const Proportion: React.FC<PieChartProps> = ({ data, handleCurBigChart, message, hoverOrNot }) => {
  const containerRef = React.useRef<Chart | null>(null)
  const ProportionRef = React.useRef(null)
  // console.log("debug-Proportion", data)
  const interactiveRef = React.useRef<Chart | null>(null)
  React.useEffect(() => {
    // 把子组件中的变量通过回调函数往上传
    if (!ProportionRef.current) {
      return
    }
    const chart = new Chart({
      container: ProportionRef.current,
      autoFit: true,
      height: 400,
      width: 600,
    })
    chart.coordinate({ type: "theta" })
    chart
      .interval()
      .transform({ type: "stackY" })
      .data(data)
      // .encode("x", "category")
      .encode("y", "value")
      .encode("color", "category")
      .style("stroke", "white")
      .scale("color", {
        palette: "spectral",
        offset: (t) => t * 0.8 + 0.1,
      })
      .label({
        text: "category",
        radius: 0.8,
        fontSize: 10,
        fontWeight: "bold",
      })
      .label({
        text: (d: cateAndValue, i: number, curData: cateAndValue[]) =>
          i < data.length - 3 ? d.value : "",
        radius: 0.8,
        fontSize: 9,
        dy: 12,
      })
      .animate("enter", { type: "waveIn" })
      .legend(false)
      .state("active", { opacity: 1 })
      .state("inactive", { opacity: 0.5 })
    chart.interaction("elementHighlight", true)
    // containerRef.current = chart
    interactiveRef.current = chart
    chart.render()

    return () => {
      chart.destroy()
    }
  }, [data[0].value, data[0].category])
  // }, [data])
  // useEffect中使用setState时
  React.useEffect(() => {
    if (!interactiveRef.current) {
      return
    }

    if (message === undefined) {
      return
    }

    const highlightData = find(
      data,
      (item: cateAndValue) => item.category === message || item.value === message,
    )
    // if (!highlightData) {
    //   highlightData = find(data, (item) => {
    //     if (item.value !== undefined) {
    //       const formattedValue = item.value.toFixed(2)

    //       // 然后，将数字转换为字符串
    //       const valueStr = formattedValue.toString()

    //       // 根据message长度截取字符串
    //       const valueSubstring = valueStr.substring(0, message.length)

    //       // 检查截取后的字符串是否与message相等
    //       return valueSubstring === message
    //     }
    //     // 如果item没有value属性，则返回false
    //     return false
    //   })
    // }
    // console.log("Categorizationdatadatadatadata1", data)
    // console.log("Categorizationdatadatadatadata2", highlightData)
    if (highlightData) {
      // data?.filter((item) => item.category === message)?.[0]
      interactiveRef.current?.emit("element:highlight", {
        data: { data: highlightData },
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
      interactiveRef.current?.emit("element:unhighlight", {})
    }
  }, [hoverOrNot])
  return <div ref={ProportionRef} style={{ height: 400, width: 600 }} />
}

export default Proportion
