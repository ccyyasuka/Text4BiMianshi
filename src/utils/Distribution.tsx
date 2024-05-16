// import React from "react"
// import { Chart, ELEMENT_CLASS_NAME, COMPONENT_CLASS_NAME } from "@antv/g2"
// import { cateAndValue } from "../types"

// interface DistributionProps {
//   data: cateAndValue[] // n个{category:,value:}画箱线图
//   message: string | number | undefined
//   hoverOrNot: boolean | undefined
//   interactionType?: string
// }

// const Distribution: React.FC<DistributionProps> = ({
//   data,
//   message,
//   hoverOrNot,
//   interactionType,
// }) => {
//   const containerRef = React.useRef(null)
//   const interactiveRef = React.useRef<Chart | null>(null)
//   React.useEffect(() => {
//     if (!containerRef.current) return

//     // const plotData = data.map((value, index) => ({
//     //   category: index + 1,
//     //   value,
//     // }))

//     const chart = new Chart({
//       container: containerRef.current,
//       autoFit: true,
//       height: 400,
//       width: 600,
//     })
//     chart.coordinate({ transform: [{ type: "transpose" }] })
//     chart
//       .boxplot()
//       .data(data)
//       .encode("x", "category")
//       .encode("y", "value")
//       .encode("color", "category")
//       .encode("series", "category")
//     interactiveRef.current = chart
//     chart.render()

//     return () => {
//       chart.destroy()
//     }
//   }, [data])
//   React.useEffect(() => {
//     if (!interactiveRef.current) {
//       return
//     }
//     if (!message === undefined || !interactionType) return
//     if (interactionType === "distribution outliers") {
//       const { canvas } = interactiveRef.current.getContext()
//       if (!canvas) return
//       const elements = canvas.document.getElementsByClassName(ELEMENT_CLASS_NAME)
//       console.log(elements)
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       const points = _.filter(elements, (element) => element.markType === "point")
//       points.forEach((point) => {
//         console.log(point)
//         point.style.opacity = 0.2
//       })
//     }
//   }, [message])
//   React.useEffect(() => {
//     if (!interactiveRef.current) {
//       return
//     }
//     if (hoverOrNot === undefined) {
//       return
//     }
//     if (!hoverOrNot) {
//       interactiveRef.current?.emit("element:unhighlight", {})
//     }
//   }, [hoverOrNot])

//   return <div ref={containerRef} style={{ height: 400, width: 600 }} />
// }
// Distribution.defaultProps = {
//   interactionType: "defaultType", // 为 interactionType 设置默认值
// }
// export default Distribution

import React from "react"
import { Chart, ELEMENT_CLASS_NAME, COMPONENT_CLASS_NAME } from "@antv/g2"
import * as d3 from "d3"
import { cateAndValue } from "../types"

interface DistributionProps {
  data: cateAndValue[] // n个{category:,value:}画箱线图
  message: string | number | undefined
  hoverOrNot: boolean | undefined
  interactionType?: string
}

const Distribution: React.FC<DistributionProps> = ({
  data,
  message,
  hoverOrNot,
  interactionType,
}) => {
  const containerRef = React.useRef(null)
  const interactiveRef = React.useRef<Chart | null>(null)
  React.useEffect(() => {
    if (!containerRef.current) return

    const processedData = data
      .map((item) => item.value)
      .filter((value): value is number => value !== undefined && typeof value === "number")
    // const filteredData = processedData.filter((item) => item !== undefined)

    d3.select(containerRef.current).selectAll("*").remove()
    processedData.sort(d3.ascending)
    const q1 = d3.quantile(processedData, 0.25)
    const median = d3.quantile(processedData, 0.5)
    const q3 = d3.quantile(processedData, 0.75)
    if (processedData.length === 0 || !q1 || !median || !q3) return
    const iqr = q3 - q1
    const min = d3.min(processedData.filter((d) => d >= q1 - 1.5 * iqr))
    const max = d3.max(processedData.filter((d) => d <= q3 + 1.5 * iqr))
    const outliers = processedData.filter((d) => d < q1 - 1.5 * iqr || d > q3 + 1.5 * iqr)
    if (!iqr || !min || !max || !outliers) return

    const svg = d3
      .select(containerRef.current)
      .append("svg")
      .attr("width", "600px")
      .attr("height", "400px")
    const margin = { top: 20, right: 30, bottom: 20, left: 30 }
    const width = +svg.attr("width").slice(0, -2) - margin.left - margin.right
    const height = +svg.attr("height").slice(0, -2) - margin.top - margin.bottom
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)
    const minValue = d3.min(processedData) as number // 使用 as number 断言非undefined
    const maxValue = d3.max(processedData) as number
    const x = d3.scaleLinear().domain([minValue, maxValue]).range([0, width])

    // Box
    g.append("rect")
      .attr("x", x(q1))
      .attr("y", 100)
      .attr("width", x(q3) - x(q1))
      .attr("height", 200)
      .style("fill", "#4474cc")
      .classed("boxplot-element", true) // Class added for selection

    // Median Line
    const medianLine = g
      .append("line")
      .attr("x1", x(median))
      .attr("y1", 100)
      .attr("x2", x(median))
      .attr("y2", 300)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .classed("median-line", true)
      .classed("boxplot-element", true)

    g.append("line")
      .attr("x1", x(q1))
      .attr("y1", 100)
      .attr("x2", x(q1))
      .attr("y2", 300)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .classed("q1-line", true)
      .classed("boxplot-element", true)
    g.append("line")
      .attr("x1", x(q3))
      .attr("y1", 100)
      .attr("x2", x(q3))
      .attr("y2", 300)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .classed("q3-line", true)
      .classed("boxplot-element", true)

    g.append("line")
      .attr("x1", x(min))
      .attr("y1", 100)
      .attr("x2", x(min))
      .attr("y2", 300)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .classed("min-line", true)
      .classed("boxplot-element", true)
    g.append("line")
      .attr("x1", x(max))
      .attr("y1", 100)
      .attr("x2", x(max))
      .attr("y2", 300)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .classed("max-line", true)
      .classed("boxplot-element", true)
    // Whiskers
    // g.selectAll(".whisker") // Class added for selection
    //   .data([min, max])
    //   .enter()
    //   .append("line")
    //   .attr("x1", (d) => x(d))
    //   .attr("x2", (d) => x(d))
    //   .attr("y1", 100)
    //   .attr("y2", 300)
    //   .style("stroke", "black")
    //   .style("stroke-width", 2)
    //   .classed("boxplot-element", true)

    g.append("line")
      .attr("x1", x(min))
      .attr("x2", x(max))
      .attr("y1", 200)
      .attr("y2", 200)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .classed("boxplot-element", true)
    g.append("line")
      .attr("x1", x(q1))
      .attr("x2", x(q3))
      .attr("y1", 100)
      .attr("y2", 100)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .classed("boxplot-element", true)
    g.append("line")
      .attr("x1", x(q1))
      .attr("x2", x(q3))
      .attr("y1", 300)
      .attr("y2", 300)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .classed("boxplot-element", true)

    // Outliers
    outliers.forEach((d) => {
      g.append("circle")
        .attr("cx", x(d))
        .attr("cy", 200)
        .attr("r", 3)
        .style("fill", "red")
        .attr("data-value", d.toFixed(2)) // 添加 data-value 属性
        .classed("outliers", true)
        .classed("boxplot-element", true)
    })
  }, [data])
  React.useEffect(() => {
    if (!message === undefined || !interactionType) return
    if (interactionType === "distribution Median") {
      d3.selectAll(".boxplot-element").style("opacity", 0.3) // Dim all other elements
      d3.select(".median-line").style("opacity", 1)
    }
    if (interactionType === "distribution Min") {
      d3.selectAll(".boxplot-element").style("opacity", 0.3) // Dim all other elements
      d3.select(".min-line").style("opacity", 1)
    }
    if (interactionType === "distribution Max") {
      d3.selectAll(".boxplot-element").style("opacity", 0.3) // Dim all other elements
      d3.select(".max-line").style("opacity", 1)
    }
    if (interactionType === "distribution Outliers") {
      d3.selectAll(".boxplot-element").style("opacity", 0.3) // Dim all other elements
      d3.select(".outliers").style("opacity", 1)
    }
    if (interactionType === "distribution Q1") {
      d3.selectAll(".boxplot-element").style("opacity", 0.3) // Dim all other elements
      d3.select(".q1-line").style("opacity", 1)
    }
    if (interactionType === "distribution Q3") {
      d3.selectAll(".boxplot-element").style("opacity", 0.3) // Dim all other elements
      d3.select(".q3-line").style("opacity", 1)
    }
    if (interactionType === "ByValue") {
      d3.selectAll(".outliers").style("opacity", 0.3)

      // 然后找到与message相等的点，将其透明度设置为1
      d3.selectAll(".outliers")
        .filter(function () {
          return +d3.select(this).attr("data-value") === message
        })
        .style("opacity", 1)
    }
  }, [message])
  React.useEffect(() => {
    if (hoverOrNot === undefined) {
      return
    }
    if (!hoverOrNot) {
      d3.selectAll(".boxplot-element").style("opacity", 1)
    }
  }, [hoverOrNot])

  return <div ref={containerRef} style={{ height: 400, width: 600 }} />
}
Distribution.defaultProps = {
  interactionType: "defaultType", // 为 interactionType 设置默认值
}
export default Distribution
