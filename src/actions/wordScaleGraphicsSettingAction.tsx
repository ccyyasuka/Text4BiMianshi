import { wordScaleGraphicsSettingStateType } from "../types"

export const CHANGE_WORDSCALEGRAPHICS_SETTING = "CHANGE_WORDSCALEGRAPHICS_SETTING"

export type ChangeWordScaleGraphicsSettingAction = {
  type: string
  payload: wordScaleGraphicsSettingStateType
}
export const ChangeWordScaleGraphicsSetting = (setting: wordScaleGraphicsSettingStateType) => ({
  type: CHANGE_WORDSCALEGRAPHICS_SETTING,
  payload: setting,
})
