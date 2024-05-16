import { typographySettingStateType } from "../types"

export const CHANGE_TYPOGRAPHY_SETTING = "CHANGE_TYPOGRAPHY_SETTING"

export type ChangeTypographySettingAction = {
  type: string
  payload: typographySettingStateType
}
export const ChangeTypographySetting = (setting: typographySettingStateType) => ({
  type: CHANGE_TYPOGRAPHY_SETTING,
  payload: setting,
})
