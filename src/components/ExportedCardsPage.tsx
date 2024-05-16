import React, { useRef, useEffect, CSSProperties, useState } from "react"
import { Layout, Tooltip, Modal, Button, message } from "antd"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import html2canvas from "html2canvas"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { copyToClipboard } from "@antv/ava-react"
import { CopyOutlined, ExportOutlined } from "@ant-design/icons"
import { InsightCard } from "./InsightCard"
import { ChangeGlobalSetting } from "../actions/GlobalSettingAction"
import { ChangeTypographySetting } from "../actions/typographySettingAction"
import { ChangeWordScaleGraphicsSetting } from "../actions/wordScaleGraphicsSettingAction"
import { AppState, store } from "../store"
import {
  Card,
  GlobalSettingStateType,
  typographySettingStateType,
  wordScaleGraphicsSettingStateType,
  entityIconType,
  absoluteIconType,
} from "../types"
import { getNarrativeHtml, getNarrativeHtml4Export } from "../utils/TextExporter"
import { iniData } from "../utils/iniData"
// import { fetchDataset } from "../actions/systemAction"

const { Header, Footer, Sider, Content } = Layout
// interface InsightCardsProps {
//   cardRefs?: React.RefObject<HTMLDivElement>[]
//   cardsExchange?: (newCardsIDs: string[]) => void
// }
interface InsightCardProps extends Card {
  id: string
  onDrop: (id: string, targetId: string) => void
}

interface GlobalSettingState {
  showBigGraph: boolean
  textPosition: string
  showSparkLine: boolean
  fontsize: string
  lineHeight: number
  bulletPoint: boolean
  isLineBreakOn: boolean
  bulletPointStyle: string
  interaction: boolean
  linking: boolean
  detailsOnDemand: boolean
}

interface TypographySettingState {
  selectedEntityType: string
  boldness: boolean
  underline: boolean
  italics: boolean
  contour: boolean
  color: string
  backgroundColor: string
}

interface WordScaleGraphicsSettingState {
  sparkLinePosition: string
  showWordScaleChartsOn: boolean
  aspectRatio: string
  distributionType: string
  rankType: string
  proportionType: string
  associationType: string
  trendType: string
  differenceType: string
  anomalyType: string
  seasonalityType: string
  graphicsSignificance: boolean
  graphicsDirection: boolean
  graphicsAnomaly: boolean
  isSemanticDrivenIconsOn: boolean
  semanticsAbsolutePosition: string
  selectedSymbol1: string
  semanticBindingEntityType: string
  selectedSymbol2: string
  entityIcon: entityIconType
  absoluteIcon: absoluteIconType
}

interface Settings {
  globalSettingState: GlobalSettingState
  typographySettingState: TypographySettingState
  wordScaleGraphicsSettingState: WordScaleGraphicsSettingState
}

const ExportedCardsAsPage: React.FC = () => {
  const dispatch = useDispatch()

  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )
  const wordScaleGraphicsSetting: wordScaleGraphicsSettingStateType = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  const typographySetting: typographySettingStateType = useSelector(
    (state: AppState) => state.typographySetting,
  )
  const cardRefs = iniData.map(() => useRef<HTMLDivElement>(null))
  const { dataset, selectedCards, allCards } = useSelector((state: AppState) => state.system)
  const { selectedEntityType, entityStyles } = useSelector(
    (state: AppState) => state.typographySetting,
  )
  console.log(
    "检查样式值",
    selectedEntityType,
    entityStyles[selectedEntityType].boldness,
    entityStyles[selectedEntityType].underline,
    entityStyles[selectedEntityType].italics,
  )
  // 解析查询参数以获取key值
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const generatedKey = queryParams.get("key")

  let selectedCardIDs: string[] = []
  if (generatedKey) {
    // 检查key是否为null
    const decodedKey = atob(generatedKey) // 现在可以安全地调用atob()
    selectedCardIDs = decodedKey.split("-") // 解码出来结果，得到卡片顺序
  } else {
    // 处理key为null的情况，例如设置默认值或显示错误信息
    console.log("Key is null or not provided")
  }
  // console.log("Selected Card IDs:", selectedCardIDs)

  useEffect(() => {
    let isMounted = true // 添加一个标志，检查组件是否挂载
    fetch("http://localhost:5000/getChangedSettings", {
      method: "GET", // 指定请求方法为GET
      headers: {
        "Content-Type": "application/json", // 设置请求头，表明发送的是JSON格式的数据
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json() // 如果响应状态码为200-299，则解析响应体为JSON
        }
        throw new Error("Network response was not ok.") // 如果响应状态码不在200-299范围内，抛出错误
      })
      .then((data) => {
        if (isMounted) {
          console.log("返回setting比较数据", data) // 在控制台打印获取到的数据
          Object.entries(data).forEach(([stateKey, settings]) => {
            switch (stateKey) {
              case "globalSettingState":
                Object.entries(settings as GlobalSettingState).forEach(([key, value]) => {
                  dispatch(
                    ChangeGlobalSetting({
                      ...globalSetting,
                      [key]: value,
                    }),
                  )
                })
                break
              case "typographySettingState":
                Object.entries(settings as TypographySettingState).forEach(([key, value]) => {
                  dispatch(
                    ChangeTypographySetting({
                      ...typographySetting,
                      [key]: value,
                    }),
                  )
                })
                break
              case "wordScaleGraphicsSettingState":
                Object.entries(settings as WordScaleGraphicsSettingState).forEach(
                  ([key, value]) => {
                    dispatch(
                      ChangeWordScaleGraphicsSetting({
                        ...wordScaleGraphicsSetting,
                        [key]: value,
                      }),
                    )
                  },
                )
                break
              default:
                console.log(`No action defined for ${stateKey}`)
            }
          })
          setIsDataLoaded(true) // 移动到这里，确保所有设置处理后再更新状态
          console.log()
        } // 如果组件已经卸载，就不再更新状态
      })
      .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error)
      })
    return () => {
      isMounted = false // 当组件卸载时，修改标志
    }
  }, [generatedKey])

  const cardNumbers = selectedCards.map((card) => {
    const match = card.match(/\d+/) // 正则表达式匹配数字
    return match ? parseInt(match[0], 10) : null // 如果匹配到数字，就转换为整数
  })
  // const cardNumbers = [1,2]
  // console.log("检查cardNumbers", cardNumbers)

  const { showBigGraph, showSparkLine } = useSelector((state: AppState) => state.globalSetting)
  // console.log("datasetttttttttttttt", selectedCards)
  const CardNum: number = dataset.length
  const CardsId: string[] = dataset.map((card) => card.CardName)
  // cards是卡片id的列表，是[Card1,Card2]
  const [cards, setCards] = useState(CardsId)
  const [showButtons, setShowExportButton] = useState(true)

  const swapCards = (dragIndex: string, hoverIndex: string) => {
    const dragCard = cards.find((card) => card === dragIndex)!
    const hoverCard = cards.find((card) => card === hoverIndex)!
    const newCards = cards.map((card) => {
      if (card === dragCard) return hoverCard
      if (card === hoverCard) return dragCard
      return card
    })
    setCards(newCards)
    // cardsExchange(newCards)
  }
  // console.log("检查cards", selectedCardIDs)
  const Cards = selectedCardIDs
    .map((cardId) => {
      const card = dataset.find((d) => d.CardName === cardId)
      return {
        ...card,
        id: cardId,
      }
    })
    .filter((card) => allCards.includes(card.id))

  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  if (!isDataLoaded) {
    return <div>Loading settings...</div>
  }
  return (
    <div className="panel3">
      <div style={{ height: 800, overflow: "auto" }}>
        <DndProvider backend={HTML5Backend}>
          <div className="card-container">
            {Cards.map((curDataset, index) => (
              <Content id={curDataset.CardName} key={curDataset.CardName}>
                <InsightCard
                  {...(curDataset as InsightCardProps)}
                  onDrop={swapCards}
                  cardRef={cardRefs[index]}
                />
              </Content>
            ))}
          </div>
        </DndProvider>
      </div>
    </div>
  )
}

export default ExportedCardsAsPage
