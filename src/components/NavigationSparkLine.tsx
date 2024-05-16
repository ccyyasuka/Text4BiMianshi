import React, { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
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
import { AppState } from "../store"
import {
  highLightMessage,
  Phrase,
  Metadata,
  Point,
  cateAndValue,
  GlobalSettingStateType,
} from "../types"

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
const renderSparkLine = (
  curMetadata: Metadata,
  curAspectRatio: string,
  curSparkLinePosition: string,
  curWordSpan: HTMLSpanElement,
  curSparkLineSpan: HTMLSpanElement | undefined,
  defaultChoice: boolean, // 是否选择函数1
  value: string | number,
  distributionTypeOn: boolean,
  rankTypeOn: boolean,
  proportionTypeOn: boolean,
  associationTypeOn: boolean,
  trendTypeOn: boolean,
  differenceTypeOn: boolean,
  anomalyTypeOn: boolean,
  seasonalityTypeOn: boolean,
) => {
  if (!curMetadata.detail) {
    throw new Error("no curMetadata")
  }
  if (curMetadata.insightType === "Distribution") {
    if (distributionTypeOn) {
      renderDistribution1(
        curMetadata.detail as cateAndValue[],
        "4:1",
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    } else if (!distributionTypeOn) {
      renderDistribution2(
        curMetadata.detail as cateAndValue[],
        "4:1",
        curSparkLinePosition,
        curWordSpan,
        curSparkLineSpan,
      )
    }
  }
  if (curMetadata.insightType === "Categorization") {
    if (rankTypeOn) {
      renderCategorization1(
        curMetadata.detail as cateAndValue[],
        curMetadata.tagData as number,
        "4:1",
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    } else if (!rankTypeOn) {
      renderCategorization2(
        curMetadata.detail as cateAndValue[],
        curMetadata.tagData as number,
        "4:1",
        curSparkLinePosition,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    }
  }
  if (curMetadata.insightType === "Proportion") {
    if (proportionTypeOn) {
      renderProportion1(
        curMetadata.detail as number[],
        "4:1",
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    } else if (!proportionTypeOn) {
      renderProportion2(
        curMetadata.detail as number[],
        "4:1",
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    }
  }
  if (curMetadata.insightType === "Association") {
    if (associationTypeOn && isPointArray(curMetadata.detail)) {
      renderAssociation1(
        curMetadata.detail as Point[],
        "4:1",
        curSparkLinePosition,
        curMetadata.tagData as Point[],
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    } else if (!associationTypeOn && isPointArray(curMetadata.detail)) {
      renderAssociation2(
        curMetadata.detail as Point[],
        "4:1",
        curSparkLinePosition,
        curMetadata.tagData as Point[],
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    }
  }
  if (curMetadata.insightType === "TemporalityTrend") {
    if (trendTypeOn) {
      const valuesFromData = curMetadata.detail.map((item) => (item as cateAndValue).value)
      let valuesFromPredictData: number[] = []

      if (curMetadata.tagData) {
        valuesFromPredictData = (curMetadata.tagData as cateAndValue[]).map((item) => item.value)
      }

      const combinedValues = [...valuesFromData, ...valuesFromPredictData]

      renderTemporalityTrend1(
        combinedValues as number[],
        "4:1",
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    } else if (!trendTypeOn) {
      const valuesFromData = curMetadata.detail.map((item) => (item as cateAndValue).value)
      let valuesFromPredictData: number[] = []

      if (curMetadata.tagData) {
        valuesFromPredictData = (curMetadata.tagData as cateAndValue[]).map((item) => item.value)
      }

      const combinedValues = [...valuesFromData, ...valuesFromPredictData]
      renderTemporalityTrend2(
        combinedValues as number[],
        "4:1",
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    }
  }
  if (curMetadata.insightType === "TemporalDifference") {
    if (differenceTypeOn) {
      renderTemporalityDifference1(
        curMetadata.detail as cateAndValue[],
        "4:1",
        curSparkLinePosition,
        curMetadata.tagData as number[],
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    } else if (!differenceTypeOn) {
      renderTemporalityDifference2(
        curMetadata.detail as cateAndValue[],
        "4:1",
        curSparkLinePosition,
        curMetadata.tagData as number[],
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    }
  }
  if (curMetadata.insightType === "TemporalityAnomaly") {
    if (anomalyTypeOn) {
      renderTemporalityAnomaly1(
        curMetadata.detail as cateAndValue[],
        "4:1",
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    } else if (!anomalyTypeOn) {
      renderTemporalityAnomaly2(
        curMetadata.detail as cateAndValue[],
        "4:1",
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    }
  }
  if (curMetadata.insightType === "TemporalitySeasonality" && curMetadata.tagData) {
    if (seasonalityTypeOn) {
      renderTemporalitySeasonality1(
        curMetadata.detail as cateAndValue[],
        curMetadata.tagData as cateAndValue[],
        "4:1",
        curSparkLinePosition,
        curMetadata,
        value,
        undefined,
        curWordSpan,
        curSparkLineSpan,
      )
    } else if (!seasonalityTypeOn) {
      renderTemporalitySeasonality2(
        curMetadata.detail as cateAndValue[],
        curMetadata.tagData as cateAndValue[],
        "4:1",
        curSparkLinePosition,
        curWordSpan,
        curSparkLineSpan,
      )
    }
  }
}
type NavigationSparkLineProp = {
  metadata: Metadata
  aspectRatio: string
  sparkLinePosition: string
  globalBoolean: boolean
  navigationClick: (cardID: number) => void
  cardIndex: number
  value: string | number
}
const NavigationSparkLine: React.FC<NavigationSparkLineProp> = ({
  metadata,
  aspectRatio,
  sparkLinePosition,
  globalBoolean,
  navigationClick,
  cardIndex,
  value,
}) => {
  // const stringID = CardID.match(/\d+/)?.[0]
  // let id = 0
  // if (stringID) {
  //   id = parseInt(stringID, 10) - 1
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
  const distributionTypeOn1 = distributionType === "a"
  const rankTypeOn1 = rankType === "a"
  const proportionTypeOn1 = proportionType === "a"
  const associationTypeOn1 = associationType === "a"
  const trendTypeOn1 = trendType === "a"
  const differenceTypeOn1 = differenceType === "a"
  const anomalyTypeOn1 = anomalyType === "a"
  const seasonalityTypeOn1 = seasonalityType === "a"
  const wordRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (wordRef.current && metadata.detail) {
      renderSparkLine(
        metadata,
        aspectRatio,
        sparkLinePosition,
        wordRef.current,
        wordRef.current,
        globalBoolean,
        value,
        distributionTypeOn1,
        rankTypeOn1,
        proportionTypeOn1,
        associationTypeOn1,
        trendTypeOn1,
        differenceTypeOn1,
        anomalyTypeOn1,
        seasonalityTypeOn1,
      )
    }
  }, [
    metadata,
    aspectRatio,
    sparkLinePosition,
    globalBoolean,
    distributionTypeOn1,
    rankTypeOn1,
    proportionTypeOn1,
    associationTypeOn1,
    trendTypeOn1,
    differenceTypeOn1,
    anomalyTypeOn1,
    seasonalityTypeOn1,
  ])
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // 检查是否按下了回车键或空格键
    if (event.key === "Enter" || event.key === " ") {
      navigationClick(cardIndex)
    }
  }

  return (
    <div
      ref={wordRef}
      onClick={() => navigationClick(cardIndex)}
      onKeyDown={handleKeyDown}
      role="button" // 添加角色
      tabIndex={0}
      aria-label="描述按钮功能的文本"
      style={{ justifyContent: "center", alignItems: "center" }}
    />
  )
}
export default NavigationSparkLine
