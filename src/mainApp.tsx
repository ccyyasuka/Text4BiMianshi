import { Layout } from "antd"
import React, { useRef, useState, useEffect } from "react"
import { Provider, useSelector, useDispatch } from "react-redux"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ExportedCardsAsPage from "./components/ExportedCardsPage" // 确保已经导入 ExportPage
import "./App.css"
// import { InsightCard } from "@antv/ava-react"
import { store, AppState } from "./store"
import ControlBar from "./ControlBar"
import InsightCards from "./components/InsightCards"
import DesignBar from "./DesignBar"
import ImportBar from "./ImportBar"
// import Container from "./Container"
import Navigation from "./Navigation"
import { iniData } from "./utils/iniData"

const { Header, Sider, Content } = Layout

function MainApp() {
  const [CardsIDs, setCardsIDs] = useState<string[]>(iniData.map((card) => card.CardName))
  // let CardsIDs: string[] = iniData.map((card) => card.CardName)
  const cardRefs = iniData.map(() => React.createRef<HTMLDivElement>())
  // console.log("cardRefs", cardRefs)
  const navigationClick = (squareNumber: number) => {
    const cardRef = cardRefs[squareNumber]

    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }
  // const cardsExchange = (newCardsIDs: string[]) => {
  //   CardsIDs = newCardsIDs
  // }
  // Use useSelector to select the parts of the state you need
  const globalSettingState = useSelector((state: AppState) => state.globalSetting)
  const typographySettingState = useSelector((state: AppState) => state.typographySetting)
  const wordScaleGraphicsSettingState = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  // 进行和后端的通信
  // Function to compile the state slices and send them to the backend
  const saveSettings = () => {
    const initialSettings = {
      globalSettingState,
      typographySettingState,
      wordScaleGraphicsSettingState,
    }
    return initialSettings
  }
  useEffect(() => {
    const initialSettings = saveSettings()
    // console.log("1检查初始Settings saved", initialSettings)
    // Use fetch to send the settings object to your backend
    fetch("http://localhost:5000/saveInitialSettings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initialSettings),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("传回初始数据Success!")
        // alert("Settings saved successfully.")
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }, []) // 将reducer中的初始状态传给后端

  const layoutStyle: React.CSSProperties = {
    height: "100%",
  }
  const leftSiderStyle: React.CSSProperties = {
    height: "100%",
    // overflow: "auto",
  }
  const rightSiderStyle: React.CSSProperties = {
    height: "100%",
    overflow: "auto",
    background: "white",
  }
  const contentMiddleStyle: React.CSSProperties = {
    height: "100%",
    display: "flex",
    overflow: "auto",
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
  return (
    <div id="APP" className="app-container">
      <Layout>
        {/* 将Header放在外层Layout中，并调整样式 */}
        <Header
          className="header"
          style={{ background: "#fff", padding: "0", lineHeight: "inherit", height: "50px" }}
        >
          {/* h1的外边距设置为0，并对齐到左边 */}
          <h1
            style={{
              margin: "0",
              color: "#035c94",
              textAlign: "left",
              paddingLeft: "14px",
              paddingTop: "10px",
            }}
          >
            Text4BI Prototype System
          </h1>
        </Header>
        <Layout className="full-height" style={layoutStyle}>
          <Sider width={400}>
            <Content style={leftSiderStyle}>
              <ControlBar />
            </Content>
          </Sider>
          <Layout>
            <Header
              style={{ background: "#fff", padding: "0", lineHeight: "inherit", height: "50px" }}
            >
              <Content>
                <ImportBar />
              </Content>
            </Header>
            <Layout>
              <Content style={contentMiddleStyle}>
                <InsightCards cardRefs={cardRefs} cardsExchange={setCardsIDs} />
              </Content>
              <Sider width={140} style={rightSiderStyle}>
                <Content>
                  <Navigation navigationClick={navigationClick} CardsIDs={CardsIDs} />
                </Content>
              </Sider>
            </Layout>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default MainApp
