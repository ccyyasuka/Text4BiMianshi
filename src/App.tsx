import { Layout } from "antd"
import React, { useRef, useState, useEffect, Suspense, lazy } from "react"
import { Provider, useSelector, useDispatch } from "react-redux"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ExportedCardsAsPage from "./components/ExportedCardsPage" // 确保已经导入 ExportPage
import "./App.css"
// import { InsightCard } from "@antv/ava-react"
import { store, AppState } from "./store"
import MainApp from "./mainApp"
import ControlBar from "./ControlBar"
import InsightCards from "./components/InsightCards"
import DesignBar from "./DesignBar"
import ImportBar from "./ImportBar"
// import Container from "./Container"
import Navigation from "./Navigation"
import { iniData } from "./utils/iniData"

const { Sider, Content } = Layout

function App() {
  const layoutStyle: React.CSSProperties = {
    height: "100%",
  }
  const leftSiderStyle: React.CSSProperties = {
    height: "100%",
    overflow: "auto",
  }
  const rightSiderStyle: React.CSSProperties = {
    height: "100%",
    overflow: "auto",
  }
  const contentMiddleStyle: React.CSSProperties = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  }
  const contentMiddleHeaderStyle: React.CSSProperties = {
    height: "54px",
    background: "#badde8",
  }
  const contentMiddleContentStyle: React.CSSProperties = {
    flexGrow: 1,
    overflow: "auto",
    background: "#fff",
    height: 0,
  }
  // const { dataset, selectedCards } = useSelector((state: AppState) => state.system)
  const [CardsIDs, setCardsIDs] = useState<string[]>(iniData.map((card) => card.CardName))
  // let CardsIDs: string[] = iniData.map((card) => card.CardName)
  const cardRefs = iniData.map(() => useRef<HTMLDivElement>(null))

  return (
    <Provider store={store}>
      <Router basename="">
        {" "}
        {/* 使用 BrowserRouter */}
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/export" element={<ExportedCardsAsPage />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
