// import React, { useEffect, useRef } from "react"
// import { Chart } from "@antv/g2"

// const Container = () => {
//   const focusContainerRef = useRef(null)
//   const contextContainerRef = useRef(null)
//   const barContainerRef = useRef(null)
//   const contextRef = useRef<Chart | null>(null)
//   useEffect(() => {
//     // 确保 DOM 元素已挂载
//     if (!focusContainerRef.current || !contextContainerRef.current || !barContainerRef.current) {
//       return
//     }

//     // 渲染 focus 视图
//     const focus = new Chart({
//       container: focusContainerRef.current,
//       height: 360,
//       paddingLeft: 50,
//     })
//     focus
//       .area()
//       .data({
//         type: "fetch",
//         value: "https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv",
//       })
//       .encode("x", "date")
//       .encode("y", "close")
//       .animate(false)
//       .axis("x", { grid: false, title: false, tickCount: 5 })
//       .axis("y", { grid: false, tickCount: 5 })
//       .interaction("tooltip", false)
//       .interaction("brushXFilter", true)

//     // focus.render()

//     focus.render()

//     // 渲染 context 视图
//     const context = new Chart({
//       container: contextContainerRef.current,
//       paddingLeft: 50,
//       paddingTop: 0,
//       paddingBottom: 0,
//       height: 60,
//     })
//     context
//       .area()
//       .data({
//         type: "fetch",
//         value: "https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv",
//       })
//       .encode("x", "date")
//       .encode("y", "close")
//       .animate(false)
//       .axis(false)
//       .interaction("tooltip", false)
//       .interaction("brushXHighlight", { series: true })

//     context.render()
//     contextRef.current = context // context是useEffect这个hook的内部变量，外部不可见，所以必须用contextRef让整个组件可见
//     // 渲染 bar 视图
//     const bar = new Chart({
//       container: barContainerRef.current,
//       paddingLeft: 50,
//       paddingTop: 0,
//       paddingBottom: 0,
//       height: 60,
//     })
//     bar
//       .interval()
//       .data([
//         { genre: "Sports", sold: 275 },
//         { genre: "Strategy", sold: 115 },
//         { genre: "Action", sold: 120 },
//         { genre: "Shooter", sold: 350 },
//         { genre: "Other", sold: 150 },
//       ])
//       .encode("x", "genre") // 编码 x 通道
//       .encode("y", "sold")
//       .animate(false)
//       .axis(false)
//       .interaction("tooltip", false)
//       .state("active", { fill: "orange" })
//       .state("inactive", { opacity: 0.5 })
//     bar.interaction("elementHighlight", true)
//     //   .interaction("brushXHighlight", { series: true })

//     bar.render()

//     // 添加事件监听器在不同图表之间交流
//     focus.on("brush:filter", (e) => {
//       const { nativeEvent } = e
//       if (!nativeEvent) return
//       const { selection } = e.data
//       const { x: scaleX } = focus.getScale()
//       const [[x1, x2]] = selection
//       const domainX = scaleX.getOptions().domain
//       console.log("brush:filter", e)
//       if (x1 === domainX[0] && x2 === domainX[1]) {
//         context.emit("brush:remove", {})
//       } else {
//         context.emit("brush:highlight", { data: { selection } })
//         bar.emit("element:highlight", {
//           data: { data: { genre: "Strategy", sold: 115 } },
//         })
//       }
//     })

//     context.on("brush:highlight", (e) => {
//       console.log(" context.on(brush:highlight", e)
//       const { nativeEvent, data } = e
//       if (!nativeEvent) return
//       const { selection } = data
//       focus.emit("brush:filter", { data: { selection } })
//     })

//     context.on("brush:remove", (e) => {
//       const { nativeEvent } = e
//       if (!nativeEvent) return
//       const { x: scaleX, y: scaleY } = context.getScale()
//       const selection = [scaleX.getOptions().domain, scaleY.getOptions().domain]
//       focus.emit("brush:filter", { data: { selection } })
//     })

//     // bar.on("element:highlight", (event) => {
//     //   const { data, nativeEvent } = event
//     //   if (nativeEvent) {
//     //     console.log("element:highlight", data)
//     //   }
//     // })
//     // const handleClick = () => {
//     //     bar.emit("element:highlight", {
//     //       data: { data: { genre: "Strategy", sold: 115 } },
//     //     })
//     //   }
//     // 清理函数
//     return () => {
//       // 在这里执行任何必要的清理
//       focus.destroy()
//       context.destroy()
//       bar.destroy()
//     }
//   }, [])
//   const handleButtonClick = () => {
//     if (contextRef.current) {
//       contextRef.current.emit("brush:remove", {})
//     }
//   }

//   return (
//     <div>
//       <div ref={focusContainerRef} />
//       <div ref={contextContainerRef} />
//       <div ref={barContainerRef} />
//       <button type="button" onClick={handleButtonClick}>
//         清除选择
//       </button>
//     </div>
//   )
// }

// export default Container

import React, { useEffect, useRef } from "react"
import { Chart, ELEMENT_CLASS_NAME, COMPONENT_CLASS_NAME } from "@antv/g2"
import _ from "lodash"

const Container = () => {
  const containerRef = useRef(null)
  const chartRef = useRef<Chart | null>(null)
  const data = [
    { month: "Jan", city: "Tokyo", temperature: 7 },
    { month: "Jan", city: "London", temperature: 3.9 },
    { month: "Feb", city: "Tokyo", temperature: 6.9 },
    { month: "Feb", city: "London", temperature: 4.2 },
    { month: "Mar", city: "Tokyo", temperature: 9.5 },
    { month: "Mar", city: "London", temperature: 5.7 },
    { month: "Apr", city: "Tokyo", temperature: 14.5 },
    { month: "Apr", city: "London", temperature: 8.5 },
    { month: "May", city: "Tokyo", temperature: 18.4 },
    { month: "May", city: "London", temperature: 11.9 },
    { month: "Jun", city: "Tokyo", temperature: 21.5 },
    { month: "Jun", city: "London", temperature: 15.2 },
    { month: "Jul", city: "Tokyo", temperature: 25.2 },
    { month: "Jul", city: "London", temperature: 17 },
    { month: "Aug", city: "Tokyo", temperature: 26.5 },
    { month: "Aug", city: "London", temperature: 16.6 },
    { month: "Sep", city: "Tokyo", temperature: 23.3 },
    { month: "Sep", city: "London", temperature: 14.2 },
    { month: "Oct", city: "Tokyo", temperature: 18.3 },
    { month: "Oct", city: "London", temperature: 10.3 },
    { month: "Nov", city: "Tokyo", temperature: 13.9 },
    { month: "Nov", city: "London", temperature: 6.6 },
    { month: "Dec", city: "Tokyo", temperature: 9.6 },
    { month: "Dec", city: "London", temperature: 4.8 },
  ]
  useEffect(() => {
    if (!containerRef.current) {
      return
    }
    // 箱线图
    // const chart = new Chart({
    //   container: containerRef.current,
    //   autoFit: true,
    //   height: 500,
    // })
    // chart
    //   .boxplot()
    //   .data([
    //     { Expt: 1, Run: 1, Speed: 20 },
    //     { Expt: 1, Run: 2, Speed: 10 },
    //     { Expt: 1, Run: 3, Speed: 900 },
    //     { Expt: 1, Run: 4, Speed: 1070 },
    //     { Expt: 1, Run: 5, Speed: 930 },
    //     { Expt: 1, Run: 6, Speed: 850 },
    //     { Expt: 1, Run: 7, Speed: 950 },
    //     { Expt: 1, Run: 8, Speed: 980 },
    //     { Expt: 1, Run: 9, Speed: 980 },
    //     { Expt: 1, Run: 10, Speed: 880 },
    //     { Expt: 1, Run: 11, Speed: 1000 },
    //     { Expt: 1, Run: 12, Speed: 980 },
    //     { Expt: 1, Run: 13, Speed: 930 },
    //     { Expt: 1, Run: 14, Speed: 650 },
    //     { Expt: 1, Run: 15, Speed: 760 },
    //     { Expt: 1, Run: 16, Speed: 810 },
    //     { Expt: 1, Run: 17, Speed: 1000 },
    //     { Expt: 1, Run: 18, Speed: 1000 },
    //     { Expt: 1, Run: 19, Speed: 960 },
    //     { Expt: 1, Run: 20, Speed: 960 },
    //   ])
    //   .encode("x", "Expt")
    //   .encode("y", "Speed")
    //   .style("opacity", 0.2)
    // // .state("active", { fill: "#4B91FF" })
    // // .state("inactive", { opacity: 0 })

    // 柱状图
    // // chart.interaction("elementHighlight", true)
    // chart.render()
    // const data = [
    //   { year: "1951 年", sales: 38 },
    //   { year: "1952 年", sales: 52 },
    //   { year: "1956 年", sales: 61 },
    //   { year: "1957 年", sales: 145 },
    //   { year: "1958 年", sales: 48 },
    //   { year: "1959 年", sales: 38 },
    //   { year: "1960 年", sales: 38 },
    //   { year: "1962 年", sales: 38 },
    // ]

    // const chart = new Chart({
    //   container: containerRef.current,
    //   autoFit: true,
    // })

    // 2. 柱状图
    //   const data = [
    //     { year: "1951 年", sales: 38 },
    //     { year: "1952 年", sales: 52 },
    //     { year: "1956 年", sales: 61 },
    //     { year: "1957 年", sales: 145 },
    //     { year: "1958 年", sales: 48 },
    //     { year: "1959 年", sales: 38 },
    //     { year: "1960 年", sales: 38 },
    //     { year: "1962 年", sales: 38 },
    //   ]

    //   const chart = new Chart({
    //     container: containerRef.current,
    //     autoFit: true,
    //   })

    //   chart
    //     .interval()
    //     .coordinate({ transform: [{ type: "transpose" }] })
    //     .data(data)
    //     .encode("x", "year")
    //     .encode("y", "sales")
    //     .style("opacity", 0.9)
    //   chart.render()
    //   chartRef.current = chart
    //   return () => {
    //     chart.destroy()
    //   }
    // }, [])

    // 3。折线图
    const chart = new Chart({
      container: containerRef.current,
      autoFit: true,
    })

    chart
      .data(data)
      .encode("x", "month")
      .encode("y", "temperature")
      .encode("color", "city")
      .scale("x", {
        range: [0, 1],
      })
      .scale("y", {
        nice: true,
      })

    chart.line().encode("shape", "smooth")

    chart.point().encode("shape", "point").tooltip(false)

    chart.render()
    // chart.render().then(() => {
    //   chart.line().encode("x", "month").encode("y", 11)
    //   chart.render()
    // })
  })

  const handleButtonClick = () => {
    if (chartRef.current) {
      // chartRef.current.style("opacity", 0.2)
      // debugger
      // const { canvas } = chartRef.current.getContext()
      // // chartRef.current.render()
      // if (!canvas) return
      // console.log(chartRef.current)
      // chartRef.current.remove()
      // chartRef.current.line().data(data).encode("x", "month").encode("y", 11)
      // chartRef.current.render()
      // 1.y轴高亮
      // COMPONENT_CLASS_NAME取坐标轴时，elements里面有两个元素，分别是x轴和y轴
      // const elements = canvas.document.getElementsByClassName(COMPONENT_CLASS_NAME)
      // console.log(elements)
      // elements.forEach((element, index) => {
      //   console.log(element)
      //   if (index === 0) return // 箭头函数中用return而不是continue来跳过
      //   element.getElementsByClassName("axis").forEach((el) => {
      //     console.log(el)
      //     el.getElementsByClassName("axis-main-group").forEach((el2) => {
      //       console.log(el2)
      //       el2.getElementsByClassName("axis-label-group").forEach((el3) => {
      //         console.log(el3)
      //         el3.getElementsByClassName("axis-label").forEach((el4) => {
      //           console.log(el4)
      //           el4.getElementsByName("").forEach((el5) => {
      //             el5.style.fill = "red"
      //           })
      //         })
      //       })
      //     })
      //   })
      // })
      // 2. 箱线图加一条线
      // 3. 箱线图的点高亮
      // const elements = canvas.document.getElementsByClassName(ELEMENT_CLASS_NAME)
      // console.log(elements)
      // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // // @ts-ignore
      // const points = _.filter(elements, (element) => element.markType === "point")
      // points.forEach((point) => {
      //   console.log(point)
      //   point.style.opacity = 0.2
      // })
    }
  }

  return (
    <div>
      <div ref={containerRef} />
      <button type="button" onClick={handleButtonClick}>
        高亮
      </button>
    </div>
  )
}
export default Container
