import { systemStateType } from "../types"

export const CHANGE_SYSTEM_ACTION = "CHANGE_SYSTEM_ACTION"

export type SystemActionType = {
  type: string
  payload: systemStateType
}

export const ChangeSystemSetting = (setting: systemStateType) => ({
  type: CHANGE_SYSTEM_ACTION,
  payload: setting,
})

// export const SET_DATASET = 'SET_DATASET'
// export const setDataset = (dataset: systemStateType) => ({
//   type: SET_DATASET,
//   payload: dataset,
// })
// export const fetchDataset = () => (dispatch: any, getState: any) => {
//   fetch('datas/Data1.json')
//     .then((response) => response.json())
//     .then((data) => dispatch(setDataset(data)))
//     .catch((error) => console.error('Error loading dataset:', error))
// }
