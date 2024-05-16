import React, { useRef, useEffect, useState } from "react"
import { RiseOutlined } from "@ant-design/icons"
import { Tooltip } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { Chart } from "@antv/g2"
import SelectorInText from "./LineHeightComponents/SelectorInText"
import SelectorTime from "./LineHeightComponents/SelectionTime"
import Icon from "../utils/Icon"
import { ChangeGlobalSetting } from "../actions/GlobalSettingAction"
import { AppState } from "../store"
import { NoneDataIcon } from "../utils/NoneDataIcon"
import {
  highLightMessage,
  Phrase,
  Metadata,
  Point,
  cateAndValue,
  GlobalSettingStateType,
  entityIconType,
  Metadata4Configuration,
} from "../types"
import {
  renderAssociation1,
  renderAssociation2,
  renderCategorization1,
  renderCategorization2,
  renderDistribution1,
  renderDistribution2,
  renderProportion1,
  renderProportion2,
  renderTemporalityAnomaly1,
  renderTemporalityAnomaly2,
  renderTemporalityDifference1,
  renderTemporalityDifference2,
  renderTemporalitySeasonality1,
  renderTemporalitySeasonality2,
  renderTemporalityTrend1,
  renderTemporalityTrend2,
} from "../utils/SparkLineFuncs"

const globalBoolean = false
// let colorindex = 0
const COLOR_PALETTE = [
  "#fbb4ae",
  "#b3cde3",
  "#ccebc5",
  "#decbe4",
  "#fed9a6",
  "#ffffcc",
  "#e5d8bd",
  "#fddaec",
] // Pastel1 色板
// interface Phrase {
//   type: string
//   value: string
//   metadata?: any
// }
function isPointArray(value: any): value is Point[] {
  if (!Array.isArray(value)) {
    return false
  }

  return value.every(
    (point) =>
      typeof point === "object" &&
      point !== null &&
      "x" in point &&
      "y" in point &&
      typeof point.x === "number" &&
      typeof point.y === "number",
  )
}
type param4FilterType = {
  startTime: string
  endTime: string
}
type setParamFunc4FilterType = {
  setTimeSelection: (timeSelection: string[]) => void
  setDrillDownSelect: (drillDownSelect: string) => void
  setDrillDownGroup: (drillDownGroup: string) => void
  setTimeSegmentationCondition: (timeSegmentationCondition: string) => void
  setTopK: (topK: string) => void
}
interface PhraseComponentProps extends Phrase {
  color: string
  backgroundColor: string
  fontsize: string
  boldness: boolean
  italics: boolean
  contour: boolean
  underline: boolean
  lineHeight: number
  aspectRatio: string
  sparkLinePosition: string
  onTopkChange: (newData: number) => void // 往子组件传递回调函数
  outChart: Chart | null
  setHighlightMessage: (message: highLightMessage) => void
  chartType: string
  params4BackEnd: Metadata4Configuration
  paramsFuncs4BackEnd: setParamFunc4FilterType
  // param4Filter: param4FilterType
  // setParamFuncs: setParamFunc4FilterType
  // React.MutableRefObject<Chart | null> ref
}
interface Style {
  color?: string
  backgroundColor?: string
  fontSize?: string
  fontWeight?: string
  fontStyle?: string
  border?: string
  textDecoration?: string
}
const PhraseComponent: React.FC<PhraseComponentProps> = ({
  type,
  value,
  metadata = {},
  fontsize,
  color,
  backgroundColor,
  boldness,
  italics,
  contour,
  underline,
  lineHeight,
  aspectRatio,
  sparkLinePosition,
  onTopkChange,
  outChart,
  setHighlightMessage,
  chartType,
  params4BackEnd,
  paramsFuncs4BackEnd,
}) => {
  const { showSparkLine } = useSelector((state: AppState) => state.globalSetting)
  const { selectedEntityType } = useSelector((state: AppState) => state.typographySetting)
  const { entityIcon, absoluteIcon } = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  const { selectedSymbol2 } = useSelector((state: AppState) => state.wordScaleGraphicsSetting)
  // if (type === "entity") {
  //   console.log("debug phrase", metadata, entityIcon)
  // }
  // 在父组件的状态中添加一个新的状态来管理日期值
  const [dateValues, setDateValues] = useState({})
  // // 更新日期选择的回调函数
  // const handleDateChange = (id, dates) => {
  //   setDateValues(prevDates => ({
  //     ...prevDates,
  //     [id]: dates // 使用元数据的id作为键存储日期
  //   }))
  // }
  const {
    showWordScaleChartsOn,
    distributionType,
    rankType,
    proportionType,
    associationType,
    trendType,
    differenceType,
    anomalyType,
    seasonalityType,
    graphicsSignificance,
    graphicsDirection,
    graphicsAnomaly,
    isSemanticDrivenIconsOn,
  } = useSelector((state: AppState) => state.wordScaleGraphicsSetting)
  const shouldShowSparkLine = showSparkLine && showWordScaleChartsOn
  // console.log("检查shouldShowSparkLine", shouldShowSparkLine)
  const distributionTypeOn1 = distributionType === "a"
  // console.log("检查distributionTypeOn", distributionTypeOn1)
  const rankTypeOn1 = rankType === "a"
  const proportionTypeOn1 = proportionType === "a"
  const associationTypeOn1 = associationType === "a"
  const trendTypeOn1 = trendType === "a"
  const differenceTypeOn1 = differenceType === "a"
  const anomalyTypeOn1 = anomalyType === "a"
  const seasonalityTypeOn1 = seasonalityType === "a"
  // console.log("确认entitytype值的改变", selectedEntityType)
  // 初始时为特定entityType设置的自定义样式
  // 现在 currentStyles 有了明确的索引签名
  // 初始样式对象
  const initialStyles: { [key: string]: Style } = {
    metric_value: { color: "#4B91FF", fontWeight: "bold" },
    // delta_value: { color: "#13A8A8", fontWeight: "bold" },
    // delta_value_ratio: { color: "#13A8A8", fontWeight: "bold" },
    // insight_desc: {
    //   fontWeight: "bold",
    //   color:
    //     metadata.assessment === "positive" ||
    //     metadata.assessment === "increase" ||
    //     metadata.assessment === "significant" ||
    //     metadata.assessment === "left-skewed"
    //       ? "#13A8A8"
    //       : "#FA541C",
    // },
    binary_value_positive: {
      fontWeight: "bold",
      color: "#13A8A8",
    },
    binary_value_negative: {
      fontWeight: "bold",
      color: "#FA541C",
    },
    metric_names: { fontWeight: "bold" },
    // dim_cate: { fontWeight: "bold" },
    algorithm: { textDecoration: "underline dashed" },
    // ... 其他实体类型
  }
  // const [currentTopK, setCurrentTopK] = useState("-1")
  const [currentStyles, setCurrentStyles] = useState(initialStyles)
  // const [entityTypeStyles, setCustomStyles] = useState(initialEntityStyles)
  const [showSparkLineGraphic, setShowSparkLineGraphic] = useState(showSparkLine)

  // const [hoverState, setHoverState] = useState({ message: "", hoverOrNot: false })
  // Mapping of terms to their corresponding index in COLOR_PALETTE
  const valueToColorIndex: { [key: string]: number } = {
    Distribution: 0,
    Difference: 1,
    Categorization: 2,
    Proportion: 3,
    Association: 4,
    "Temporal Trend": 5,
    "Temporal Anomaly": 6,
    "Temporal Periodicity": 7,
  }
  const sparkLineRef = useRef<HTMLSpanElement | null>(null)
  // const noneDataIconRef = useRef<HTMLSpanElement | null>(null)
  // useEffect(() => {
  //   // 当 showBigGraph 为 true 时，ref 保持不变。
  //   // 当 showBigGraph 为 false 时，将 ref.current 设置为 null。
  //   if (!showSparkLine) {
  //     sparkLineRef.current = null
  //   }
  // }, [showSparkLine])
  // 接收一个词，生成一个这个词的可视化效果和行内小图
  // const italicsValue = italics ? "italic" : "normal"
  // const contourValue = contour ? "1px solid black" : "none"
  const wordRef = useRef<HTMLSpanElement | null>(null)
  // console.log("测试输出color", wordColor)
  // const svgRef = useRef<SVGSVGElement | null>(null)
  // const tooltipRef = useRef<HTMLDivElement | null>(null)

  // useEffect(() => {
  //   if (
  //     type === "entity" &&
  //     metadata?.entityType === "trend_desc" &&
  //     svgRef.current &&
  //     tooltipRef.current
  //   ) {
  //     renderLineChart(svgRef.current, metadata.detail, tooltipRef.current, aspectRatio)
  //   }
  // }, [type, metadata, aspectRatio])
  // useEffect(() => {
  //   // 创建新的样式对象
  //   const newStyle = { ...currentStyles[selectedEntityType] } // 复制当前选中实体类型的既有样式
  //   // 根据需要更新样式
  //   if (newStyle.color !== color) newStyle.color = color
  //   if (newStyle.backgroundColor !== backgroundColor) newStyle.backgroundColor = backgroundColor
  //   if (newStyle.fontSize !== fontsize) newStyle.fontSize = fontsize
  //   if ((newStyle.fontWeight === "bold") !== boldness) newStyle.fontWeight = boldness ? "bold" : "normal"
  //   if ((newStyle.fontStyle === "italic") !== italics) newStyle.fontStyle = italics ? "italic" : "normal"
  //   if ((newStyle.border === "1px solid black") !== contour) newStyle.border = contour ? "1px solid black" : "none"
  //   if ((newStyle.textDecoration === "underline") !== underline) newStyle.textDecoration = underline ? "underline" : "none"
  //   // 更新状态
  //   setCurrentStyles((prevStyles) => ({
  //     ...prevStyles,
  //     [selectedEntityType]: newStyle,
  //   }))
  // }, [color, backgroundColor, fontsize, boldness, italics, contour, underline])

  const getInitialColor = () => {
    const savedColor = localStorage.getItem(`cardTitleBackgroundColor_${value}`)
    if (savedColor) {
      return savedColor
    }
    const randomColor = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)]
    localStorage.setItem(`cardTitleBackgroundColor_${value}`, randomColor)
    return randomColor
  }

  const [cardTitleBackgroundColor, setBackgroundColor] = useState(getInitialColor)

  useEffect(() => {
    if (!localStorage.getItem(`cardTitleBackgroundColor_${value}`)) {
      const randomColor = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)]
      setBackgroundColor(randomColor)
      localStorage.setItem(`cardTitleBackgroundColor_${value}`, randomColor)
    }
  }, [value])

  // 针对 boldness 的 useEffect
  useEffect(() => {
    const newFontWeight = boldness ? "bold" : "normal"
    if (currentStyles[selectedEntityType]?.fontWeight !== newFontWeight) {
      setCurrentStyles((prevStyles) => ({
        ...prevStyles,
        [selectedEntityType]: {
          ...prevStyles[selectedEntityType],
          fontWeight: newFontWeight,
        },
      }))
    }
  }, [boldness])

  // 针对 underline 的 useEffect
  useEffect(() => {
    const newTextDecoration = underline ? "underline" : "none"
    if (currentStyles[selectedEntityType]?.textDecoration !== newTextDecoration) {
      setCurrentStyles((prevStyles) => ({
        ...prevStyles,
        [selectedEntityType]: {
          ...prevStyles[selectedEntityType],
          textDecoration: newTextDecoration,
        },
      }))
    }
  }, [underline])

  // 针对 italics 的 useEffect
  useEffect(() => {
    const newFontStyle = italics ? "italic" : "normal"
    if (currentStyles[selectedEntityType]?.fontStyle !== newFontStyle) {
      setCurrentStyles((prevStyles) => ({
        ...prevStyles,
        [selectedEntityType]: {
          ...prevStyles[selectedEntityType],
          fontStyle: newFontStyle,
        },
      }))
    }
  }, [italics])

  // 针对 contour 的 useEffect
  useEffect(() => {
    const newBorder = contour ? "1px solid black" : "none"
    if (currentStyles[selectedEntityType]?.border !== newBorder) {
      setCurrentStyles((prevStyles) => ({
        ...prevStyles,
        [selectedEntityType]: {
          ...prevStyles[selectedEntityType],
          border: newBorder,
        },
      }))
    }
  }, [contour])

  // 针对 color 的 useEffect
  useEffect(() => {
    if (currentStyles[selectedEntityType]?.color !== color) {
      setCurrentStyles((prevStyles) => ({
        ...prevStyles,
        [selectedEntityType]: {
          ...prevStyles[selectedEntityType],
          color,
        },
      }))
    }
  }, [color])

  // 针对 backgroundColor 的 useEffect
  useEffect(() => {
    if (currentStyles[selectedEntityType]?.backgroundColor !== backgroundColor) {
      setCurrentStyles((prevStyles) => ({
        ...prevStyles,
        [selectedEntityType]: {
          ...prevStyles[selectedEntityType],
          backgroundColor,
        },
      }))
    }
  }, [backgroundColor])

  const renderWord = (curMetadata: Metadata) => {
    // 确保 entityType 不是 undefined
    const handleHover = () => {
      const highlightMessage: highLightMessage = { hoverOrNot: true, message: "" }
      if (curMetadata.origin) {
        highlightMessage.message = curMetadata.origin
        // setHighlightMessage({ message: curMetadata.origin, hoverOrNot: true })
      } else {
        highlightMessage.message = value
      }
      if (curMetadata.interactionType) {
        highlightMessage.interactionType = curMetadata.interactionType
      }
      setHighlightMessage(highlightMessage)

      // 使用setHighlightMessage(hoverState)是不对的，因为setHoverState({ message: curValue, hoverOrNot: true })是异步的，执行setHighlightMessage时，hoverState还没被修改 zyx
      // outChart.emit("brush:remove", {})
    }
    const handleLeave = () => {
      // 这里可以添加你希望在鼠标离开时执行的代码
      // 例如，可以取消高亮显示
      setHighlightMessage({ message: "", hoverOrNot: false })
    }
    const entityType = curMetadata.entityType || "default" // "default" 是一个占位值

    // 现在可以安全地使用 entityType 作为索引
    const style = currentStyles[entityType] || {}

    return (
      // <Tooltip title={curMetadata.origin}></Tooltip>
      <span
        ref={wordRef}
        style={{
          fontWeight: style.fontWeight || "normal",
          textDecoration: style.textDecoration || "none",
          fontStyle: style.fontStyle || "normal",
          border: style.border || "none",
          color: style.color || "#000000",
          backgroundColor: style.backgroundColor || "#FFFFFF",
          fontSize: fontsize,
          lineHeight,
          position: "relative",
        }}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className={curMetadata.entityType}
      >
        {value}
      </span>
    )
  }

  const renderNoneDataIcon4UpDown = (
    curMetadata: Metadata,
    curNoneDataIconSpan: HTMLSpanElement | undefined,
    curSparkLinePosition: string,
  ) => {
    if (!curMetadata.entityType || !curNoneDataIconSpan) return
    if (!entityIcon[curMetadata.entityType]) return
    if (entityIcon[curMetadata.entityType][selectedSymbol2] === "") return
    // <span dangerouslySetInnerHTML={{ __html: svgContent }} />
    // 直接设置innerHTML
    const rect = curNoneDataIconSpan.getBoundingClientRect()
    const svgContent = entityIcon[curMetadata.entityType][selectedSymbol2]
    const newSpan = document.createElement("span") // 创建新的span元素
    newSpan.setAttribute("data-highlight-color-name", "red")
    newSpan.classList.add("sparklines")
    newSpan.style.position = "absolute"
    if (curSparkLinePosition === "up") {
      newSpan.style.top = "-20px"
      newSpan.style.left = "0px"
    } else {
      newSpan.style.top = "20px"
      newSpan.style.left = "0px"
    }
    newSpan.style.width = `${rect.width}px`
    newSpan.style.height = `${rect.height + 20}px`
    newSpan.innerHTML = svgContent
    curNoneDataIconSpan.appendChild(newSpan)
  }

  const renderSparkLine = (
    curMetadata: Metadata,
    curAspectRatio: string,
    curSparkLinePosition: string,
    curWordSpan: HTMLSpanElement,
    curSparkLineSpan: HTMLSpanElement | undefined,
    // defaultChoice: boolean, // 是否选择函数1
    distributionTypeOn: boolean,
    rankTypeOn: boolean,
    proportionTypeOn: boolean,
    associationTypeOn: boolean,
    trendTypeOn: boolean,
    differenceTypeOn: boolean,
    anomalyTypeOn: boolean,
    seasonalityTypeOn: boolean,
    curShouldShowSparkLine: boolean,
  ) => {
    // const handleHover = () => {
    //   const highlightMessage: highLightMessage = { hoverOrNot: true, message: "" }
    //   if (curMetadata.origin) {
    //     highlightMessage.message = curMetadata.origin
    //   } else {
    //     highlightMessage.message = value
    //   }
    //   if (curMetadata.interactionType) {
    //     highlightMessage.interactionType = curMetadata.interactionType
    //   }
    //   setHighlightMessage(highlightMessage)
    // }
    // const handleLeave = () => {
    //   setHighlightMessage({ message: "", hoverOrNot: false })
    // }
    // curWordSpan.addEventListener("mouseenter", handleHover)
    // curWordSpan.addEventListener("mouseleave", handleLeave)
    // if (curSparkLineSpan) {
    //   curSparkLineSpan.addEventListener("mouseenter", handleHover)
    //   curSparkLineSpan.addEventListener("mouseleave", handleLeave)
    // }
    if (!curMetadata.detail) {
      throw new Error("no curMetadata")
    }
    // console.log("检查dis", distributionTypeOn)
    if (curMetadata.insightType === "Distribution") {
      if (
        distributionTypeOn
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        renderDistribution1(
          curMetadata.detail as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata,
          value,
          setHighlightMessage,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        distributionTypeOn === false
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        renderDistribution2(
          curMetadata.detail as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === "Categorization") {
      if (
        rankTypeOn
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        renderCategorization1(
          curMetadata.detail as cateAndValue[],
          curMetadata.tagData as number,
          curAspectRatio,
          curSparkLinePosition,
          curMetadata,
          value,
          setHighlightMessage,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !rankTypeOn
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        renderCategorization2(
          curMetadata.detail as cateAndValue[],
          curMetadata.tagData as number,
          curAspectRatio,
          curSparkLinePosition,
          setHighlightMessage,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === "Proportion") {
      if (
        proportionTypeOn
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        // console.log("wordRef.current&&metadata", curWordSpan, curSparkLineSpan)
        renderProportion1(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata,
          value,
          setHighlightMessage,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !proportionTypeOn
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        renderProportion2(
          curMetadata.detail as number[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata,
          value,
          setHighlightMessage,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === "Association") {
      if (associationTypeOn && isPointArray(curMetadata.detail)) {
        renderAssociation1(
          curMetadata.detail as Point[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata.tagData as Point[],
          curMetadata,
          value,
          setHighlightMessage,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (!associationTypeOn && isPointArray(curMetadata.detail)) {
        renderAssociation2(
          curMetadata.detail as Point[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata.tagData as Point[],
          curMetadata,
          value,
          setHighlightMessage,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === "TemporalityTrend") {
      if (
        trendTypeOn
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        const valuesFromData = curMetadata.detail.map((item) => (item as cateAndValue).value)
        let valuesFromPredictData: number[] = []

        if (curMetadata.tagData) {
          // Now valuesFromPredictData is accessible within this block
          valuesFromPredictData = (curMetadata.tagData as cateAndValue[]).map((item) => item.value)
        }

        const combinedValues = [...valuesFromData, ...valuesFromPredictData]

        renderTemporalityTrend1(
          combinedValues as number[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata,
          value,
          setHighlightMessage,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !trendTypeOn
        //  &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        const valuesFromData = curMetadata.detail.map((item) => (item as cateAndValue).value)
        let valuesFromPredictData: number[] = []

        if (curMetadata.tagData) {
          // Now valuesFromPredictData is accessible within this block
          valuesFromPredictData = (curMetadata.tagData as cateAndValue[]).map((item) => item.value)
        }

        const combinedValues = [...valuesFromData, ...valuesFromPredictData]
        renderTemporalityTrend2(
          combinedValues as number[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata,
          value,
          setHighlightMessage,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === "TemporalDifference") {
      if (
        differenceTypeOn
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        renderTemporalityDifference1(
          curMetadata.detail as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata.tagData as number[],
          curMetadata,
          value,
          setHighlightMessage,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !differenceTypeOn
        //  &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        renderTemporalityDifference2(
          curMetadata.detail as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata.tagData as number[],
          curMetadata,
          value,
          setHighlightMessage,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === "TemporalityAnomaly") {
      if (
        anomalyTypeOn
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        renderTemporalityAnomaly1(
          curMetadata.detail as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata,
          value,
          setHighlightMessage,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !anomalyTypeOn
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        renderTemporalityAnomaly2(
          curMetadata.detail as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata,
          value,
          setHighlightMessage,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    if (curMetadata.insightType === "TemporalitySeasonality" && curMetadata.tagData) {
      if (
        seasonalityTypeOn
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        renderTemporalitySeasonality1(
          curMetadata.detail as cateAndValue[],
          curMetadata.tagData as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          curMetadata,
          value,
          setHighlightMessage,
          curWordSpan,
          curSparkLineSpan,
        )
      } else if (
        !seasonalityTypeOn
        // &&
        // Array.isArray(curMetadata.detail) &&
        // curMetadata.detail.every((element) => typeof element === "number")
      ) {
        renderTemporalitySeasonality2(
          curMetadata.detail as cateAndValue[],
          curMetadata.tagData as cateAndValue[],
          curAspectRatio,
          curSparkLinePosition,
          curWordSpan,
          curSparkLineSpan,
        )
      }
    }
    // return () => {
    //   curWordSpan.removeEventListener("mouseenter", handleHover)
    //   curWordSpan.removeEventListener("mouseleave", handleLeave)
    //   curSparkLineSpan?.removeEventListener("mouseenter", handleHover)
    //   curSparkLineSpan?.removeEventListener("mouseleave", handleLeave)
    // }
  }
  //
  // 这是绘制sparkline的useeffect 把给sparkline留的span对应的ref送到rendersparkline中，在rendersparkline函数中操纵画小图，每次依赖项发生变化时，就重绘sparkline
  //
  useEffect(() => {
    // console.log(
    //   `检查: showSparkLine=${showSparkLine}, showWordScaleChartsOn=${showWordScaleChartsOn}, showDataDrivenCharts=${showDataDrivenCharts}, shouldShowSparkLine=${shouldShowSparkLine}, sparkLineRef=${sparkLineRef.current}`,
    // )
    // 如果不需要显示 SparkLine，立即隐藏
    // if (!showSparkLine || !showWordScaleChartsOn || !showDataDrivenCharts) {
    //   if (sparkLineRef.current) {
    //     sparkLineRef.current.style.display = "none"
    //   }
    //   // 提早退出，避免执行后续的显示逻辑
    //   return
    // }
    // showSparkLine 为 true 时，重新显示或创建小图
    // 如果之前隐藏了小图，现在重新显示它
    if (shouldShowSparkLine) {
      if (sparkLineRef.current) {
        sparkLineRef.current.style.display = "" // 或者 "block", 取决于你的布局需求
      }

      // 以下是原有的逻辑，用于创建小图
      if (
        wordRef.current &&
        metadata.detail &&
        (sparkLinePosition === "up" || sparkLinePosition === "down")
      ) {
        renderSparkLine(
          metadata,
          aspectRatio,
          sparkLinePosition,
          wordRef.current,
          undefined,
          distributionTypeOn1,
          rankTypeOn1,
          proportionTypeOn1,
          associationTypeOn1,
          trendTypeOn1,
          differenceTypeOn1,
          anomalyTypeOn1,
          seasonalityTypeOn1,
          shouldShowSparkLine,
        )
      }
      if (
        wordRef.current &&
        sparkLineRef.current &&
        metadata.detail &&
        (sparkLinePosition === "left" || sparkLinePosition === "right")
      ) {
        renderSparkLine(
          metadata,
          aspectRatio,
          sparkLinePosition,
          wordRef.current,
          sparkLineRef.current,
          distributionTypeOn1,
          rankTypeOn1,
          proportionTypeOn1,
          associationTypeOn1,
          trendTypeOn1,
          differenceTypeOn1,
          anomalyTypeOn1,
          seasonalityTypeOn1,
          shouldShowSparkLine,
        )
      }
    } else if (wordRef.current && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
      const sparklines = wordRef.current.getElementsByClassName("sparklines")
      Array.from(sparklines).forEach((sparkline) => sparkline.remove())
      // console.log("sparkLineRef.current 为空")
    } else if (sparkLineRef.current) {
      // showSparkLine 为 false 时，隐藏或移除小图
      sparkLineRef.current.style.display = "none"
      // 或者移除内容：sparkLineRef.current.innerHTML = ""
    }
  }, [
    type,
    metadata,
    aspectRatio,
    sparkLinePosition,
    showSparkLine,
    showWordScaleChartsOn,
    // showDataDrivenCharts,
    distributionTypeOn1,
    rankTypeOn1,
    proportionTypeOn1,
    associationTypeOn1,
    trendTypeOn1,
    differenceTypeOn1,
    anomalyTypeOn1,
    seasonalityTypeOn1,
  ]) // 确保 showSparkLine 在依赖项中
  //
  // 这是绘制nonedataIcon的useeffect 把给nonedataIcon留的span对应的ref送到rendernonedataIcon中，在rendernonedataIcon函数中操纵画icon，每次依赖项发生变化时，就重绘icon
  //

  // 画上下NoneDataIcon
  // useEffect(() => {
  //   // showSparkLine 为 true 时，重新显示或创建小图
  //   if (!wordRef.current) return

  //   if (showSparkLine && metadata.entityType !== "insight" && !metadata.insightType) {
  //     const lastChild = wordRef.current.lastElementChild
  //     if (lastChild && lastChild.nodeName === "SPAN") {
  //       wordRef.current.removeChild(lastChild)
  //     }
  //     if (wordRef.current) {
  //       wordRef.current.style.display = ""
  //     }
  //     if (wordRef.current && (sparkLinePosition === "up" || sparkLinePosition === "down")) {
  //       console.log("useEffect进入了！！！！！！")
  //       renderNoneDataIcon4UpDown(metadata, wordRef.current, sparkLinePosition)
  //     }
  //   }
  // }, [type, metadata, entityIcon, sparkLinePosition, showSparkLine])

  // entityIcon是一个对象，useEffect监听的是对象的地址，所以在外部修改entityIcon["aaa"]是无效修改，需要用浅拷贝的方式才可以改变地址
  // entityIcon[selectedEntityType].a = curSvgContent entityIcon: { ...entityIcon },
  // useEffect(()=>{},[])
  // if (metadata?.selections?.[0]) {
  //   setCurrentTopK(metadata?.selections?.[0])
  // }
  // useEffect(() => {
  //   if (metadata?.selections?.[0]) {
  //     setCurrentTopK(metadata?.selections?.[0])
  //   }
  // }, [metadata])

  if (type === "IconPadding") {
    // 专门为开头结尾的icon留的位置
    return (
      <span style={{ position: "relative" }}>
        <NoneDataIcon
          entityIcon={entityIcon}
          absoluteIcon={absoluteIcon}
          curMetadata={metadata}
          type={type}
        />
      </span>
    )
  }
  if (type === "entity") {
    if (metadata.entityType === "filter_cate" && metadata.selections && metadata.backEndType) {
      // const handleHover = () => {
      //   const highlightMessage: highLightMessage = { hoverOrNot: true, message: "" }
      //   if (params4BackEnd.topK) {
      //     highlightMessage.message = params4BackEnd.topK
      //   }

      //   if (metadata.interactionType) {
      //     highlightMessage.interactionType = metadata.interactionType
      //   }
      //   setHighlightMessage(highlightMessage)
      // }
      // const handleLeave = () => {
      //   setHighlightMessage({ message: "", hoverOrNot: false })
      // }
      // const handleTopKChange = (curTopK: string) => {
      //   setCurrentTopK(curTopK)
      // }
      // console.log("PhraseComponent", params4BackEnd)
      return (
        // <span onMouseEnter={handleHover} onMouseLeave={handleLeave}>

        <SelectorInText
          selections={metadata.selections}
          defaultSelection={metadata.selections[0]}
          metadata={metadata}
          setHighlightMessage={setHighlightMessage}
          chartType={chartType}
          backEndType={metadata.backEndType}
          params4BackEnd={params4BackEnd}
          paramsFuncs4BackEnd={paramsFuncs4BackEnd}
        />
        // </span>
      )
    }
    if (
      metadata.entityType === "filter_time" &&
      metadata.selections &&
      metadata.paramIndex !== undefined
    ) {
      return (
        <SelectorTime
          defaultSelection={metadata.selections[0]}
          metadata={metadata}
          chartType={chartType}
          paramIndex={metadata.paramIndex}
          params4BackEnd={params4BackEnd}
          paramsFuncs4BackEnd={paramsFuncs4BackEnd}
        />
      )
    }
    // // 下面是对颜色进行设置
    // // 确保 entityType 不是 undefined
    // const entityType = metadata.entityType || "default" // "default" 是一个占位值
    // const newStyle = { ...currentStyles[entityType] }
    // // 判断和设置特定的样式
    // if (entityType === "binary_value_positive" || entityType === "binary_value_positive" || entityType === "binary_value_positive") {
    //   // 确保 assessment 不是 undefined
    //   const assessment = metadata.assessment || ""
    //   if (["positive", "increase", "significant", "left-skewed"].includes(assessment)) {
    //     newStyle.color = "#13A8A8"
    //   } else {
    //     newStyle.color = "#FA541C"
    //   }
    // }
    // // 更新 currentStyles 状态
    // setCurrentStyles((prevStyles) => ({
    //   ...prevStyles,
    //   [entityType]: newStyle,
    // }))
    // if (metadata.entityType === "dim_value") {
    //   contourValue = "1px solid black"
    // }
    // const getSvgWidth = (curAspectRatio: string) => {
    //   if (curAspectRatio === "tiny") {
    //     return "20"
    //   }
    //   if (curAspectRatio === "medium") {
    //     return "27"
    //   }
    //   if (curAspectRatio === "big") {
    //     return "100"
    //   }
    //   return "100"
    // }

    return (
      <span style={{ position: "relative" }}>
        {" "}
        {/* 确保父元素具有相对定位 */}
        {
          (metadata?.entityType === "insight" || metadata?.insightType) &&
          sparkLinePosition === "left" ? (
            <span id="sparkLineElement" ref={sparkLineRef} className="sparkLineSpan">
              {/* <svg ref={svgRef} width={getSvgWidth(aspectRatio)} height="20" /> */}
              {/* 在此处把变量svgRef和真实的dom元素绑定起来，当组件被渲染后，svgRef.current将会指向这个SVG元素 */}
              {/* <div ref={tooltipRef} className="tooltip" /> */}
            </span>
          ) : null // 这是一个三目运算符 ？：
        }
        {metadata.entityType !== "insight" && sparkLinePosition === "left" ? (
          <NoneDataIcon
            entityIcon={entityIcon}
            absoluteIcon={absoluteIcon}
            curMetadata={metadata}
            type={type}
          />
        ) : null}
        {/* {metadata?.entityType === "binary_value_positive" &&
          showSparkLine &&
          showWordScaleChartsOn &&
          sparkLinePosition === "left" && (
            <span style={{ marginRight: "0px" }}>
              <Icon assessment={metadata.assessment as string} />
            </span>
          )} */}
        {/* {
          // icon的思路和sparkline的思路一致，都是在文字前后留好位置，挂上ref，如果该放icon了，就触发useeffect，然后操纵ref，然后画icon
          metadata?.entityType !== "insight" && sparkLinePosition === "left" ? (
            <span id="noneDataIconElement" ref={noneDataIconRef} className="noneDataIconSpan" />
          ) : null // 这是一个三目运算符 ？：
        } */}
        {renderWord(metadata)}
        {(metadata?.entityType === "binary_value_positive" || metadata?.entityType === "binary_value_negative" || metadata.assessment) &&
          showSparkLine &&
          showWordScaleChartsOn &&
          sparkLinePosition !== "left" && (
            <span style={{ marginLeft: "-1px" }}>
              {" "}
              {/* 添加外边距以避免重叠 */}
              <Icon assessment={metadata.assessment as string} />
            </span>
          )}
        {metadata.entityType !== "insight" && sparkLinePosition !== "left" ? (
          <NoneDataIcon
            entityIcon={entityIcon}
            absoluteIcon={absoluteIcon}
            curMetadata={metadata}
            type={type}
          />
        ) : null}
        {/* {
          // icon的思路和sparkline的思路一致，都是在文字前后留好位置，挂上ref，如果该放icon了，就触发useeffect，然后操纵ref，然后画icon
          metadata?.entityType !== "insight" && sparkLinePosition === "right" ? (
            <span id="noneDataIconElement" ref={noneDataIconRef} className="noneDataIconSpan" />
          ) : null // 这是一个三目运算符 ？：
        } */}
        {
          (metadata?.entityType === "insight" || metadata?.insightType) &&
          sparkLinePosition === "right" ? (
            <span id="sparkLineElement" ref={sparkLineRef} className="sparkLineSpan" />
          ) : null // 这是一个三目运算符 ？：
        }
        {/* {
          // 如果 sparkLinePosition 是 "up"，则在文本上方渲染 Icon
          metadata?.entityType === "binary_value_positive" &&
            showSparkLine &&
            showWordScaleChartsOn &&
            sparkLinePosition === "up" && (
              <Icon
                assessment={metadata.assessment as string}
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
            )
        }
        {
          // 如果 sparkLinePosition 是 "down"，则在文本下方渲染 Icon
          metadata?.entityType === "binary_value_positive" &&
            showSparkLine &&
            showWordScaleChartsOn &&
            sparkLinePosition === "down" && (
              <Icon
                assessment={metadata.assessment as string}
                style={{
                  position: "absolute",
                  bottom: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
            )
        }
        {metadata.entityType !== "insight" && sparkLinePosition === "up" ? (
          <span
            style={{
              position: "absolute",
              bottom: "15px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <NoneDataIcon
              entityIcon={entityIcon}
              absoluteIcon={absoluteIcon}
              curMetadata={metadata}
              type={type}
            />
          </span>
        ) : null}
        {metadata.entityType !== "insight" && sparkLinePosition === "down" ? (
          <span
            style={{
              position: "absolute",
              bottom: "-20px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <NoneDataIcon
              entityIcon={entityIcon}
              absoluteIcon={absoluteIcon}
              curMetadata={metadata}
              type={type}
            />
          </span>
        ) : null} */}
      </span>
    )
  }
  if (type === "CardTitle") {
    const bgColor = COLOR_PALETTE[valueToColorIndex[value]] || "defaultBackgroundColor"
    // 生成随机颜色
    return (
      <span
        style={{
          fontSize: fontsize,
          lineHeight,
          position: "relative",
          fontWeight: "bold",
          backgroundColor: bgColor, // 使用存储的颜色
          padding: "5px",
          borderRadius: "5px",
        }}
        className="CardTitle"
      >
        {value}
      </span>
    )
  }
  return <span style={{ fontSize: fontsize, lineHeight }}>{value}</span>
}
// PhraseComponent.defaultProps={
//   onDataChange
// } 默认props zyx
export default PhraseComponent
