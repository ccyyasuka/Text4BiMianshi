import { createStore, combineReducers, applyMiddleware } from "redux"
import systemReducer from "./reducer/systemReducer"
import GlobalSettingReducer from "./reducer/globalReducer"
import TypographySettingReducer from "./reducer/typographyReducer"
import WordScaleGraphicsSettingReducer from "./reducer/wordScaleGraphicsReducer"
import { loggerMiddleware } from "./middlewares/loggerMiddleware"
import { ErrorMiddleware } from "./middlewares/errorMiddleware"

const rootReducer = combineReducers({
  system: systemReducer,
  globalSetting: GlobalSettingReducer,
  typographySetting: TypographySettingReducer,
  wordScaleGraphicsSetting: WordScaleGraphicsSettingReducer,
})
export type AppState = ReturnType<typeof rootReducer>

const MiddlewareEnhancer = applyMiddleware(loggerMiddleware, ErrorMiddleware)

export const store = createStore(rootReducer, MiddlewareEnhancer)
