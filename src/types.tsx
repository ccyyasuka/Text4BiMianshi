export type storeType = {
  color: string
  font: string
}
export type Point = {
  x: number
  y: number
}
export type cateAndValue = {
  value: number
  category: string
  // 索引签名
  [key: string]: number | string
}
export type Metadata = {
  entityType?: string
  insightType?: string
  origin?: number | string
  assessment?: string
  detail?: number[] | Point[] | cateAndValue[]
  selections?: string[]
  binary_value_positive?: string
  binary_value_negative?: string
  ratio_value?: string
  tagData?: number | number[] | Point[] | cateAndValue[] | string
  interactionType?: string // 专门给29 outliers之类留的，标明它需要高亮离群点
  paramIndex?: number // 同时有四个时间筛选按钮，用来区分按钮用的,是index
  backEndType?: string // 标识后端交互类型
}
export type Metadata4BigGraph = {
  detail?: cateAndValue[] | Point[]
  tagData?: cateAndValue[] | Point[] | number[]
}
export type Metadata4Configuration = {
  timeSelection?: string[]
  drillDownSelect?: string
  drillDownGroup?: string
  timeSegmentationCondition?: string
  topK?: string
}
export type Phrase = {
  type: string
  value: string
  metadata?: Metadata
}
export type TopicSentence = {
  type: "topic"
  phrases: Phrase[]
}
export type NormalSentence = {
  type: "normal"
  phrases: Phrase[]
}

export type BulletSentence = {
  type: "bullet"
  show?: string
  phrases: Phrase[]
}

export type PlotSentence = {
  type: "plot"
  chartType: string
  metadata: Metadata4BigGraph
}
export type ConfigurationSentence = {
  type: "configuration"
  chartType: string
  metadata: Metadata4Configuration
}

export type sentence =
  | TopicSentence
  | NormalSentence
  | BulletSentence
  | PlotSentence
  | ConfigurationSentence
export type Card = {
  CardName: string
  paragraph: sentence[]
}
// actions.js

// Action Types
// export const SET_START_DATE = "SET_START_DATE"
// export const SET_END_DATE = "SET_END_DATE"

// // Action Creators
// export const setStartDate = (date: string) => ({
//   type: SET_START_DATE,
//   payload: date,
// })

// export const setEndDate = (date: string) => ({
//   type: SET_END_DATE,
//   payload: date,
// })

export type entitiesType = {
  [key: string]: string
  null: string
  a: string
  b: string
  c: string
  d: string
  e: string
}
export type entityIconType = {
  [key: string]: entitiesType // 索引签名 zyx
  metric_value: entitiesType
  metric_names: entitiesType
  algorithm: entitiesType
  filter_time: entitiesType
  filter_cate: entitiesType
}
export type absoluteIconType = {
  [key: string]: entitiesType // 索引签名 zyx
  sentenceStart: entitiesType
  sentenceEnd: entitiesType
}

export type systemStateType = {
  dataset: Card[]
  selectedCards: string[]
  allCards: string[]
  generateKey: string
  setShowExportButton: boolean
}
export type GlobalSettingStateType = {
  showBigGraph: boolean
  textPosition: string
  showSparkLine: boolean
  fontsize: string
  lineHeight: number
  bulletPoint: boolean
  isLineBreakOn: boolean
  bulletPointStyle: string
  interaction: boolean
  linking: boolean
  detailsOnDemand: boolean
}
// 这里定义了每个实体的样式设置
export type entityStyleSettingsType = {
  boldness: boolean
  underline: boolean
  italics: boolean
  contour: boolean
  color: string
  backgroundColor: string
}
// 这里使用了索引签名，使得每个实体类型都有一个对应的样式设置
export type entityStylesType = {
  [key: string]: entityStyleSettingsType
  metric_value: entityStyleSettingsType
  metric_names: entityStyleSettingsType
  algorithm: entityStyleSettingsType
  filter_time: entityStyleSettingsType
  filter_cate: entityStyleSettingsType
}
export type typographySettingStateType = {
  selectedEntityType: string
  secondEntityType: string
  thirdEntityType: string
  entityStyles: entityStylesType
  boldness: boolean
  underline: boolean
  italics: boolean
  contour: boolean
  color: string
  backgroundColor: string
}
export type wordScaleGraphicsSettingStateType = {
  showWordScaleChartsOn: boolean
  aspectRatio: string
  sparkLinePosition: string
  distributionType: string
  rankType: string
  proportionType: string
  associationType: string
  trendType: string
  differenceType: string
  anomalyType: string
  seasonalityType: string
  showWordScaleSymbolsOn: boolean
  showDataDrivenSymbols: boolean
  graphicsSignificance: boolean
  graphicsDirection: boolean
  graphicsAnomaly: boolean
  isSemanticDrivenIconsOn: boolean
  semanticsAbsolutePosition: string
  selectedSymbol1: string
  semanticBindingEntityType: string
  selectedSymbol2: string
  entityIcon: entityIconType
  absoluteIcon: absoluteIconType
}
export type highLightMessage = {
  message: string | number
  hoverOrNot: boolean
  interactionType?: string
}
