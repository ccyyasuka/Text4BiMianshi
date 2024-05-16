import { GlobalSettingStateType } from "../types"

export const CHANGE_GLOBAL_SETTING = "CHANGE_GLOBAL_SETTING"

export type ChangeGlobalSettingAction = {
  type: string
  payload: GlobalSettingStateType
}
export const ChangeGlobalSetting = (setting: GlobalSettingStateType) => ({
  type: CHANGE_GLOBAL_SETTING,
  payload: setting,
})
