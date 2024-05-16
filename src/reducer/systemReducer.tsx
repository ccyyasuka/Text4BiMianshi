import { systemStateType } from "../types"
import { SystemActionType } from "../actions/systemAction"
import { iniData } from "../utils/iniData"

const iniSystemState: systemStateType = {
  dataset: iniData,
  selectedCards: ["Card1", "Card2", "Card3", "Card4", "Card5", "Card6", "Card7", "Card8"],
  allCards: ["Card1", "Card2", "Card3", "Card4", "Card5", "Card6", "Card7", "Card8"],
  generateKey: "0",
  setShowExportButton: true,
}
export const SET_DATASET = "SET_DATASET"

const systemReducer = (state = iniSystemState, action: SystemActionType) => {
  switch (action.type) {
    case "CHANGE_SYSTEM_ACTION":
      return action.payload
    default:
      return state
  }
}

export default systemReducer
