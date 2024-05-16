import { GlobalSettingStateType } from "../types"
import { ChangeGlobalSettingAction } from "../actions/GlobalSettingAction"

const iniGlobalSettingState: GlobalSettingStateType = {
  showBigGraph: true,
  textPosition: "vertical",
  showSparkLine: true,
  fontsize: "16px",
  lineHeight: 2,
  bulletPoint: true,
  isLineBreakOn: true,
  bulletPointStyle: "•",
  interaction: true,
  linking: true,
  detailsOnDemand: true,
}

const GlobalSettingReducer = (state = iniGlobalSettingState, action: ChangeGlobalSettingAction) => {
  if (action.type === "CHANGE_GLOBAL_SETTING") return action.payload
  return state
}
export default GlobalSettingReducer
