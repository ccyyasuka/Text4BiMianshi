import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react"
import { Chart } from "@antv/g2"
import _ from "lodash"
import Categorization from "../utils/Categorization"
import Proportion from "../utils/Proportion"
import Association from "../utils/Association"
import Difference from "../utils/TemporalDifference"
import Distribution from "../utils/Distribution"
import TemporalAnomaly from "../utils/TemporalAnomaly"
import TemporalPeriodicity from "../utils/TemporalPeriodicity"
import TemporalTrend from "../utils/TemporalTrend"
import { Metadata4BigGraph, Point, cateAndValue, highLightMessage } from "../types"

type ChartRef = {
  getChart: () => Chart | null
}
export interface IPopupRef {
  open: () => void
}
type BigChartProps = {
  ChartType: string
  BigChartData: Metadata4BigGraph
  // topk: number
  handleCurBigChart: (ref: Chart | null) => void // 父组件传到子组件的回调函数的定义方法 zyx
  highlightMessage: highLightMessage | null
  drillDownGroup: string
}
const BigChart: React.FC<BigChartProps> = ({
  ChartType,
  BigChartData,
  // topk,
  handleCurBigChart,
  highlightMessage,
  drillDownGroup,
}) => {
  // console.log("debug-bigchart-data", ChartType, BigChartData)
  // (ChartType,BigChartData)会报错
  // 用usememo创建SlicedBigChartData，只监听BigChartData和topk的变化 未解决
  const SlicedBigChartData = _.cloneDeep(BigChartData) // 深拷贝

  // SlicedBigChartData.detail =
  //   topk !== -1 ? SlicedBigChartData.detail?.slice(0, topk) : SlicedBigChartData.detail
  const BigChartDataRef = useRef(SlicedBigChartData)

  // // 使用useEffect来更新BigChartDataRef.current，以便它总是反映最新的BigChartData
  // useEffect(() => {
  //   BigChartDataRef.current = _.cloneDeep(SlicedBigChartData)
  // }, [BigChartData]) // 依赖项是BigChartData和topk，任何一个变化都会触发更新
  // console.log("BigChartDataRefBigChartDataRefBigChartDataRefBigChartDataRef", BigChartDataRef)
  // if (ChartType === "Categorization") {
  //   console.log("BigChart中的SlicedBigChartData和topk", BigChartData)
  //   console.log("BigChart中的SlicedBigChartData和topk", topk)
  //   console.log("BigChart中的SlicedBigChartData和topk", SlicedBigChartData)
  //   console.log("BigChart中的SlicedBigChartData和topk", BigChartDataRef)
  // }

  const chartInstanceRef = useRef<Chart | null>(null)
  // // 使用useImperativeHandle暴露getSvg方法
  // useImperativeHandle(ref, () => ({
  //   getSvg: () => {
  //     // 确保chartInstanceRef.current是有效的，并且提供了导出SVG的方法
  //     if (chartInstanceRef.current) {
  //       const chart = chartInstanceRef.current
  //       // 这里替换为你的图表库的获取SVG的方法
  //       return chart.get('canvas').get('el').innerHTML
  //     }
  //     return ''
  //   },
  // }))
  // 这可以通过可选链（?.）操作符来实现，它允许你安全地访问嵌套对象属性，即使其中一些属性可能是未定义的。
  // 在这个版本中，如果 BigChartData.detail 是未定义的，?. 会阻止进一步的调用或访问，并返回 undefined。然后，整个表达式的结果就会根据 topk 的值来决定是一
  // 个截断的数组或原始的 BigChartData.detail。如果 BigChartData.detail 本身就是 undefined，
  // 那么不管 topk 的值是什么，结果都会是 undefined。zyx

  // BigChartData.detail = BigChartData.detail
  const chartRef = useRef<ChartRef>(null) // 创建引用
  // const getChartInstance = () => {
  //   if (chartRef.current) {
  //     const chart = chartRef.current.getChart()
  //     console.log(chart) // 现在可以访问 Chart 实例
  //     if()
  //     chart.interaction('brushHighlight', true)
  //   }
  // }
  // const chartRef = useRef(null)

  // const setChartRef = (newRef:HTMLDivElement) => {
  //   chartRef.current = newRef
  // }

  // useEffect(() => {
  //   if (chartRef.current) {
  //     const chartInstance = chartRef.current.getChart()
  //     // 在这里可以使用 chart 实例
  //     console.log(
  //       "chartInstancechartInstancechartInstancechartInstancechartInstance",
  //       chartRef.current.getChart(),
  //     ) // 仅示例，实际使用时您可能需要其他逻辑
  //     if (chartInstance) {
  //       chartInstance.interaction("brushHighlight", true)
  //     }
  //   }
  // }, [chartRef.current]) // 没有解决！！！！！！！！！！！！！

  switch (ChartType) {
    case "Categorization": {
      return (
        <Categorization
          // data={_.cloneDeep( BigChartDataRef.current.detail) as cateAndValue[]} 这句代码会导致死循环zyx 待解决
          data={BigChartData.detail as cateAndValue[]}
          handleCurBigChart={handleCurBigChart}
          message={highlightMessage?.message}
          hoverOrNot={highlightMessage?.hoverOrNot}
          interactionType={highlightMessage?.interactionType}
          drillDownGroup={drillDownGroup}
        />
      )
    }

    case "Proportion":
      return (
        <Proportion
          // data={SlicedBigChartData.detail as cateAndValue[]}
          data={BigChartData.detail as cateAndValue[]}
          handleCurBigChart={handleCurBigChart}
          message={highlightMessage?.message}
          hoverOrNot={highlightMessage?.hoverOrNot}
        />
      )
    case "Association":
      return (
        <Association
          data={BigChartData.detail as Point[]}
          tagData={BigChartData.tagData as Point[]}
          ref={chartRef}
          message={highlightMessage?.message}
          hoverOrNot={highlightMessage?.hoverOrNot}
          interactionType={highlightMessage?.interactionType}
        />
      )
    case "Distribution":
      return (
        <Distribution
          data={BigChartData.detail as cateAndValue[]}
          message={highlightMessage?.message}
          hoverOrNot={highlightMessage?.hoverOrNot}
          interactionType={highlightMessage?.interactionType}
        />
      )
    case "TemporalDifference":
      return (
        <Difference
          iniData={BigChartData.detail as cateAndValue[]}
          tagData={BigChartData.tagData as number[]}
          message={highlightMessage?.message}
          hoverOrNot={highlightMessage?.hoverOrNot}
          interactionType={highlightMessage?.interactionType}
        />
      )
    case "TemporalPeriodicity": {
      return (
        <TemporalPeriodicity
          data={BigChartData.detail as cateAndValue[]}
          tagData={BigChartData.tagData as cateAndValue[]}
          message={highlightMessage?.message}
          hoverOrNot={highlightMessage?.hoverOrNot}
          interactionType={highlightMessage?.interactionType}
        />
      )
    }

    case "TemporalAnomaly":
      return (
        <TemporalAnomaly
          data={BigChartData.detail as cateAndValue[]}
          tagData={BigChartData.tagData as number[]}
          message={highlightMessage?.message}
          hoverOrNot={highlightMessage?.hoverOrNot}
          interactionType={highlightMessage?.interactionType}
        />
      )
    case "TemporalTrend":
      return (
        <TemporalTrend
          data={BigChartData.detail as cateAndValue[]}
          tagData={BigChartData.tagData as cateAndValue[]}
          // tagData={BigChartDataRef.current.tagData as cateAndValue[]}
          message={highlightMessage?.message}
          hoverOrNot={highlightMessage?.hoverOrNot}
          interactionType={highlightMessage?.interactionType}
        />
      )
    default:
      return <div />
  }
}
export default BigChart
