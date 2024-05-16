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

// import React, { useEffect, useRef } from "react"
// import { Chart, ELEMENT_CLASS_NAME, COMPONENT_CLASS_NAME } from "@antv/g2"
// import _ from "lodash"

// const Container = () => {
//   const containerRef = useRef(null)
//   const chartRef = useRef<Chart | null>(null)
//   const data = [
//     { year: "1991", value: 3 },
//     { year: "1992", value: 4 },
//     { year: "1993", value: 3.5 },
//     { year: "1994", value: 5 },
//     { year: "1995", value: 4.9 },
//     { year: "1996", value: 6 },
//     { year: "1997", value: 7 },
//     { year: "1998", value: 9 },
//     { year: "1999", value: 13 },
//   ]
//   useEffect(() => {
//     if (!containerRef.current) {
//       return
//     }

//     const chart = new Chart({
//       container: containerRef.current,
//       autoFit: true,
//     })

//     chart
//       .data(data)
//       .line()
//       .encode("x", "year")
//       .encode("y", "value")
//       .scale("x", {
//         range: [0, 1],
//       })
//       .scale("y", {
//         domainMin: 0,
//         nice: true,
//       })
//     chartRef.current = chart
//     chartRef.current.data(data).line().encode("x", "year").encode("y", 3)
//     // chart.data(data).point().style("fill", "white").tooltip(false)
//     chart.render()
//   }, [])

//   const handleButtonClick = () => {
//     if (chartRef.current) {
//       // 添加辅助线
//       // chartRef.current.data(data).line().encode("x", "year").encode("y", 3)
//       // chartRef.current.render()

//       // 移除辅助线
//       const { canvas } = chartRef.current.getContext()
//       if (!canvas) return
//       const elements = canvas.document.getElementsByClassName(ELEMENT_CLASS_NAME)
//       console.log(elements)
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       const lines = _.filter(elements, (element) => element.markType === "line")
//       lines[1].remove()
//     }
//   }

//   return (
//     <div>
//       <div id="container" ref={containerRef} />
//       <button type="button" onClick={handleButtonClick}>
//         高亮
//       </button>
//     </div>
//   )
// }
// export default Container

// import React, { useEffect, useRef } from "react"
// import { Chart, ELEMENT_CLASS_NAME, COMPONENT_CLASS_NAME } from "@antv/g2"
// import _ from "lodash"

// const Container = () => {
//   const containerRef = useRef(null)
//   const chartRef = useRef<Chart | null>(null)
//   const data = [
//     { date: "2011-01-01", value: 808.563, category: "real" },
//     { date: "2011-01-02", value: 314.22, category: "real" },
//     { date: "2011-01-03", value: 4503.5372, category: "real" },
//     { date: "2011-01-04", value: 2808.87024, category: "real" },
//     { date: "2011-01-05", value: 3662.31, category: "real" },
//     { date: "2011-01-06", value: 622.5381, category: "real" },
//     { date: "2011-01-07", value: 7123.0185, category: "real" },
//     { date: "2011-01-08", value: 6293.26, category: "real" },
//     { date: "2011-01-09", value: 813.7494, category: "real" },
//     { date: "2011-01-10", value: 6794.18116, category: "real" },
//     { date: "2011-01-11", value: 6451.2517, category: "real" },
//     { date: "2011-01-12", value: 2629.71652, category: "real" },
//     { date: "2011-01-13", value: 2584.595, category: "real" },
//     { date: "2011-01-14", value: 6280.4475, category: "real" },
//     { date: "2011-01-15", value: 2279.5306, category: "real" },
//     { date: "2011-01-16", value: 149.95, category: "real" },
//     { date: "2011-01-17", value: 2309.52924, category: "real" },
//     { date: "2011-01-18", value: 932.763, category: "real" },
//     { date: "2011-01-19", value: 2054.691, category: "real" },
//     { date: "2011-01-20", value: 2289.241, category: "real" },
//     { date: "2011-01-21", value: 8485.3576, category: "real" },
//     { date: "2011-01-22", value: 3564.1245, category: "real" },
//     { date: "2011-01-23", value: 2163.43, category: "real" },
//     { date: "2011-01-24", value: 3984.3813, category: "real" },
//     { date: "2011-01-25", value: 1191.622, category: "real" },
//     { date: "2011-01-26", value: 5422.6764, category: "real" },
//     { date: "2011-01-27", value: 2165.3999, category: "real" },
//     { date: "2011-01-28", value: 1208.122, category: "real" },
//     { date: "2011-01-29", value: 909.94, category: "real" },
//     { date: "2011-01-30", value: 454.887, category: "real" },
//     { date: "2011-01-31", value: 7642.585, category: "real" },
//     { date: "2011-10-01", value: 1624.20712, category: "real" },
//     { date: "2011-10-02", value: 598.144, category: "real" },
//     { date: "2011-10-03", value: 8662.52128, category: "real" },
//     { date: "2011-10-04", value: 8180.71572, category: "real" },
//     { date: "2011-10-05", value: 2596.1845, category: "real" },
//     { date: "2011-10-06", value: 17181.1931, category: "real" },
//     { date: "2011-10-07", value: 11291.24992, category: "real" },
//     { date: "2011-10-08", value: 3840.9008, category: "real" },
//     { date: "2011-10-09", value: 249.36, category: "real" },
//     { date: "2011-10-10", value: 7857.7148, category: "real" },
//     { date: "2011-10-11", value: 2025.2895, category: "real" },
//     { date: "2011-10-12", value: 4656.312, category: "real" },
//     { date: "2011-10-13", value: 9798.95798, category: "real" },
//     { date: "2011-10-14", value: 14453.2311, category: "real" },
//     { date: "2011-10-15", value: 8231.75672, category: "real" },
//     { date: "2011-10-16", value: 1364.09648, category: "real" },
//     { date: "2011-10-17", value: 5983.01866, category: "real" },
//     { date: "2011-10-18", value: 8290.87736, category: "real" },
//     { date: "2011-10-19", value: 8883.0806, category: "real" },
//     { date: "2011-10-20", value: 7524.2985, category: "real" },
//     { date: "2011-10-21", value: 7271.4774, category: "real" },
//     { date: "2011-10-22", value: 4953.816, category: "real" },
//     { date: "2011-10-24", value: 4550.677, category: "real" },
//     { date: "2011-10-25", value: 4802.985, category: "real" },
//     { date: "2011-10-26", value: 8069.4229, category: "real" },
//     { date: "2011-10-27", value: 17289.6859, category: "real" },
//     { date: "2011-10-28", value: 5778.5817, category: "real" },
//     { date: "2011-10-29", value: 5022.808, category: "real" },
//     { date: "2011-10-30", value: 133.26, category: "real" },
//     { date: "2011-10-31", value: 7905.44, category: "real" },
//     { date: "2011-11-01", value: 18667.51056, category: "real" },
//     { date: "2011-11-02", value: 8691.009, category: "real" },
//     { date: "2011-11-03", value: 19275.0876, category: "real" },
//     { date: "2011-11-04", value: 18652.758, category: "real" },
//     { date: "2011-11-05", value: 10385.6998, category: "real" },
//     { date: "2011-11-06", value: 1555.6215, category: "real" },
//     { date: "2011-11-07", value: 13232.5699, category: "real" },
//     { date: "2011-11-08", value: 4292.2318, category: "real" },
//     { date: "2011-11-09", value: 12155.4545, category: "real" },
//     { date: "2011-11-10", value: 10174.022, category: "real" },
//     { date: "2011-11-11", value: 24402.39878, category: "real" },
//     { date: "2011-11-12", value: 4232.5592, category: "real" },
//     { date: "2011-11-13", value: 345.76, category: "real" },
//     { date: "2011-11-14", value: 12537.5958, category: "real" },
//     { date: "2011-11-15", value: 10494.6696, category: "real" },
//     { date: "2011-11-16", value: 8008.8932, category: "real" },
//     { date: "2011-11-17", value: 14062.8082, category: "real" },
//     { date: "2011-11-18", value: 13514.9344, category: "real" },
//     { date: "2011-11-19", value: 9876.244, category: "real" },
//     { date: "2011-11-20", value: 975, category: "real" },
//     { date: "2011-11-21", value: 5411.864, category: "real" },
//     { date: "2011-11-22", value: 9528.56168, category: "real" },
//     { date: "2011-11-23", value: 8510.63296, category: "real" },
//     { date: "2011-11-24", value: 10785.4121, category: "real" },
//     { date: "2011-11-25", value: 18118.76232, category: "real" },
//     { date: "2011-11-26", value: 6403.18, category: "real" },
//     { date: "2011-11-27", value: 302.75, category: "real" },
//     { date: "2011-11-28", value: 9289.64072, category: "real" },
//     { date: "2011-11-29", value: 8444.3224, category: "real" },
//     { date: "2011-11-30", value: 6168.5835, category: "real" },
//     { date: "2011-12-01", value: 14118.3252, category: "real" },
//     { date: "2011-12-02", value: 7294.181, category: "real" },
//     { date: "2011-12-03", value: 9013.2148, category: "real" },
//     { date: "2011-12-10", value: 5847.5503, category: "real" },
//     { date: "2011-12-11", value: 796.63504, category: "real" },
//     { date: "2011-12-12", value: 10224.35358, category: "real" },
//     { date: "2011-12-13", value: 14356.21064, category: "real" },
//     { date: "2011-12-14", value: 14350.1541, category: "real" },
//     { date: "2011-12-15", value: 15078.048, category: "real" },
//     { date: "2011-12-16", value: 14190.5144, category: "real" },
//     { date: "2011-12-17", value: 13732.1394, category: "real" },
//     { date: "2011-12-19", value: 10801.10436, category: "real" },
//     { date: "2011-12-20", value: 21881.9314, category: "real" },
//     { date: "2011-12-21", value: 13003.04024, category: "real" },
//     { date: "2011-12-22", value: 12810.8913, category: "real" },
//     { date: "2011-12-23", value: 10609.91348, category: "real" },
//     { date: "2011-12-24", value: 9788.526, category: "real" },
//     { date: "2011-12-25", value: 539.2235, category: "real" },
//     { date: "2011-12-26", value: 14832.9215, category: "real" },
//     { date: "2011-12-27", value: 15140.1727, category: "real" },
//     { date: "2011-12-28", value: 18801.06272, category: "real" },
//     { date: "2011-12-29", value: 10904.2029, category: "real" },
//     { date: "2011-12-30", value: 6705.187, category: "real" },
//     { date: "2011-12-31", value: 7740.663, category: "real" },
//     { date: "2011-12-31", value: 7740.663, category: "predict" },
//     { date: "2012-01-01", value: 3751.6848758680617, category: "predict" },
//     { date: "2012-01-02", value: 10752.498882954173, category: "predict" },
//     { date: "2012-01-03", value: 11080.486954908753, category: "predict" },
//     { date: "2012-01-04", value: 10472.626048050999, category: "predict" },
//     { date: "2012-01-05", value: 12882.414096822788, category: "predict" },
//     { date: "2012-01-06", value: 13420.489492864934, category: "predict" },
//     { date: "2012-01-07", value: 8656.878094475132, category: "predict" },
//     { date: "2012-01-08", value: 3890.4350758575474, category: "predict" },
//     { date: "2012-01-09", value: 10891.249082948074, category: "predict" },
//     { date: "2012-01-10", value: 11219.23715489704, category: "predict" },
//   ]
//   const tagData = [
//     { date: "2011-01-01", value: 2551.682003856071, category: "regression" },
//     { date: "2011-12-31", value: 12561.8215957961, category: "regression" },
//     { date: "2012-01-01", value: 8956.714683657205, category: "regression" },
//     { date: "2012-01-10", value: 10446.885268272297, category: "regression" },
//   ]
//   useEffect(() => {
//     if (!containerRef.current) {
//       return
//     }

//     const chart = new Chart({
//       container: containerRef.current,
//       autoFit: true,
//     })

//     const realValue = data.filter((item) => item.category === "real")
//     const predictValue = data.filter((item) => item.category === "predict")
//     chart
//       .line()
//       .data(realValue)
//       .encode("x", "date")
//       .encode("y", "value")
//       .encode("color", "#5a85c4")
//       .encode("shape", "smooth")
//       .style("lineWidth", 3)
//     chart
//       .line()
//       .data(predictValue)
//       .encode("x", "date")
//       .encode("y", "value")
//       .encode("color", "#5a85c4")
//       .encode("shape", "smooth")
//       .style("lineWidth", 3)
//       .style("opacity", 0.5)
//       .style("lineDash", [3, 3])

//     chart
//       .line()
//       .data(tagData)
//       .encode("x", "date")
//       .encode("y", "value")
//       .encode("color", "gray")
//       .style("lineDash", [3, 3])
//     chart.interaction("elementHighlight", true)
//     chartRef.current = chart
//     chart.render()
//   }, [])

//   const handleButtonClick = () => {
//     if (chartRef.current) {
//       const testDatas = [
//         {
//           lineX: "2012-01-10",
//           lineY: 11219.24,
//         },
//         {
//           lineX: "2011-01-10",
//           lineY: 1219.24,
//         },
//         {
//           lineX: "2011-01-07",
//           lineY: 11219.24,
//         },
//         {
//           lineX: "2011-11-22",
//           lineY: 11219.24,
//         },
//         {
//           lineX: "2011-11-18",
//           lineY: 11219.24,
//         },
//       ]
//       const index = Math.floor(Math.random() * 5)
//       console.log(index)
//       const { lineX } = testDatas[index]
//       const { lineY } = testDatas[index]
//       for (let i = chartRef.current.children.length - 1; i > 2; i -= 1) {
//         chartRef.current.children[i].remove()
//       }
//       chartRef.current.line().data(data).encode("x", "date").encode("y", lineY)
//       chartRef.current.line().data(data).encode("x", lineX).encode("y", "value")
//       chartRef.current.render()
//     }
//   }

//   return (
//     <div>
//       <div id="container" ref={containerRef} />
//       <button type="button" onClick={handleButtonClick}>
//         高亮
//       </button>
//     </div>
//   )
// }
// export default Container

// class TreeNode {
//   val: number

//   left: null | TreeNode

//   right: null | TreeNode

//   constructor(value: number) {
//     this.val = value
//     this.left = null
//     this.right = null
//   }
// }
// class binaryTree {
//   root: TreeNode

//   constructor(root: TreeNode) {
//     this.root = root
//   }
// }
// const n1 = new TreeNode(3)
export {}
