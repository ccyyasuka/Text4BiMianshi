import { wordScaleGraphicsSettingStateType } from "../types"
import { ChangeWordScaleGraphicsSettingAction } from "../actions/wordScaleGraphicsSettingAction"
import { iniEntityIcon, iniAbsoluteIcon } from "../utils/iniNoneDataIcon"

const iniWordScaleGraphicsSettingState: wordScaleGraphicsSettingStateType = {
  showWordScaleChartsOn: true,
  aspectRatio: "4:1",
  sparkLinePosition: "right",
  distributionType: "a",
  rankType: "a",
  proportionType: "a",
  associationType: "a",
  trendType: "a",
  differenceType: "a",
  anomalyType: "a",
  seasonalityType: "a",
  showWordScaleSymbolsOn: true,
  showDataDrivenSymbols: true,
  graphicsSignificance: true,
  graphicsDirection: true,
  graphicsAnomaly: true,
  isSemanticDrivenIconsOn: true,
  semanticsAbsolutePosition: "sentenceStart",
  selectedSymbol1: "null",
  semanticBindingEntityType: "metric_value",
  selectedSymbol2: "null",
  entityIcon: iniEntityIcon,
  absoluteIcon: iniAbsoluteIcon,
}

const WordScaleGraphicsSettingReducer = (
  state = iniWordScaleGraphicsSettingState,
  action: ChangeWordScaleGraphicsSettingAction,
) => {
  if (action.type === "CHANGE_WORDSCALEGRAPHICS_SETTING") {
    return action.payload
  }
  return state
}
export default WordScaleGraphicsSettingReducer
