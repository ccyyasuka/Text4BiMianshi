import React, { useRef, useEffect, CSSProperties, useState } from "react"
import { Layout, Tooltip, Modal, Button, message } from "antd"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import html2canvas from "html2canvas"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { copyToClipboard } from "@antv/ava-react"
import { CopyOutlined, ExportOutlined } from "@ant-design/icons"
import { InsightCard } from "./InsightCard"
import { AppState, store } from "../store"
import { ChangeSystemSetting } from "../actions/systemAction"
import { systemStateType, Card } from "../types"
import { getNarrativeHtml, getNarrativeHtml4Export } from "../utils/TextExporter"
// import { fetchDataset } from "../actions/systemAction"
import { ReactComponent as ShareSvg } from "../utils/icons/share.svg"

const { Header, Footer, Sider, Content } = Layout
interface InsightCardsProps {
  cardRefs: React.RefObject<HTMLDivElement>[]
  cardsExchange: (newCardsIDs: string[]) => void
}
interface InsightCardProps extends Card {
  id: string
  onDrop: (id: string, targetId: string) => void
}

const InsightCards: React.FC<InsightCardsProps> = ({ cardRefs, cardsExchange }) => {
  const { dataset, selectedCards, allCards } = useSelector((state: AppState) => state.system)
  const systemSetting: systemStateType = useSelector((state: AppState) => state.system)
  const [trigger, setTrigger] = useState(false)
  // console.log("1检查trigger", trigger)
  const [settings, setSettings] = useState({})
  const dispatch = useDispatch()

  const navigate = useNavigate() // Initialize useHistory hook
  // const exportSelectedCardsAsHtml = async () => {
  //   navigate("/export", { state: { selectedCardIDs: selectedCards } })
  // }

  const generateKey = (selectedCardIDs: string[]) => {
    // 将卡片ID数组转换为字符串
    const key = selectedCardIDs.join("-")
    // 对字符串进行Base64编码
    const hash = btoa(key)
    return hash
  }

  // Use useSelector to select the parts of the state you need
  const systemState = useSelector((state: AppState) => state.system)
  const globalSettingState = useSelector((state: AppState) => state.globalSetting)
  const typographySettingState = useSelector((state: AppState) => state.typographySetting)
  const wordScaleGraphicsSettingState = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )

  // 进行和后端的通信
  // Function to compile the state slices and send them to the backend
  const saveSettings = () => {
    const nowSettings = {
      // systemState,
      globalSettingState,
      typographySettingState,
      wordScaleGraphicsSettingState,
    }
    return nowSettings
  }

  // useEffect(() => {
  //   if (selectedCards.length > 0) {
  //     const key = generateKey(selectedCards)
  //     dispatch(
  //       ChangeSystemSetting({
  //         ...systemSetting,
  //         generateKey: key,
  //       }),
  //     )
  //     const newUrl = `https://siriuscccc.github.io/bi4an/${key}`
  //     window.open(newUrl, "_blank")
  //     console.log("检查newUrl", newUrl)
  //   }
  // }, [trigger]) // 现在 useEffect 依赖于 trigger 变量

  // console.log("检查cardids", selectedCards)
  // 使用map()函数和正则表达式提取数字
  const cardNumbers = selectedCards.map((card) => {
    const match = card.match(/\d+/) // 正则表达式匹配数字
    return match ? parseInt(match[0], 10) : null // 如果匹配到数字，就转换为整数
  })
  // const cardNumbers = [1,2]
  // console.log("检查cardNumbers", cardNumbers)

  const { showBigGraph, showSparkLine } = useSelector((state: AppState) => state.globalSetting)
  // console.log("debug-InsightCards", dataset)
  const CardNum: number = dataset.length
  const CardsId: string[] = dataset.map((card) => card.CardName)
  // cards是卡片id的列表，是[Card1,Card2]
  const [cards, setCards] = useState(CardsId)
  const [showButtons, setShowExportButton] = useState(true)
  useEffect(() => {
    setCards(selectedCards)
  }, [selectedCards])
  useEffect(() => {
    // console.log("2检查trigger", trigger)
    const nowSettings = saveSettings()
    setSettings(nowSettings)
    // console.log("2检查修改后的Settings saved", nowSettings)
    // Use fetch to send the settings object to your backend
    fetch("http://localhost:5000/saveModifiedSettings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nowSettings),
    })
      .then((response) => response.json())
      .then((data) => {
        if (trigger) {
          const key = generateKey(cards) // 生成 key
          // console.log("1检查key", key)
          // navigate("/export", { state: { key } }) // 将 key 作为路由状态传递
          // 创建新URL，将 key 作为查询参数或路径的一部分
          const url = `${window.location.origin}/export?key=${encodeURIComponent(key)}`
          // 使用 window.open 在新标签页中打开URL
          window.open(url, "_blank")
        }

        // console.log("返回setting修改数据", data)
        // alert("Settings saved successfully.")
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }, [trigger]) // 现在 useEffect 依赖于 trigger 变量
  // 新的点击事件处理函数
  const handleButtonClick = () => {
    // const key = generateKey(cards) // 生成 key
    // // console.log("1检查key", key)
    // // navigate("/export", { state: { key } }) // 将 key 作为路由状态传递
    // // 创建新URL，将 key 作为查询参数或路径的一部分
    // const url = `${window.location.origin}/export?key=${encodeURIComponent(key)}`
    // // 使用 window.open 在新标签页中打开URL
    // window.open(url, "_blank")
    // exportSelectedCardsAsHtml() // 假设这是你的导出函数
    setTrigger((prev) => !prev) // 切换 trigger 的值
  }
  // console.log("111", cards)
  const swapCards = React.useCallback((dragIndex: string, hoverIndex: string) => {
    const dragCard = cards.find((card) => card === dragIndex)!
    const hoverCard = cards.find((card) => card === hoverIndex)!
    const newCards = cards.map((card) => {
      if (card === dragCard) return hoverCard
      if (card === hoverCard) return dragCard
      return card
    })
    setCards(newCards)
    cardsExchange(newCards)
    // console.log("debug-Cards", newCards)
  }, [])
  const Cards = cards
    .map((cardId) => {
      const card = dataset.find((d) => d.CardName === cardId)
      return {
        ...card,
        id: cardId,
      }
    })
    .filter((card) => allCards.includes(card.id))
  // console.log("debug-selectedCards", selectedCards)
  // console.log("Cards", Cards)
  // 这个函数返回当前应用的状态
  const getAppState = () => {
    // 从store获取当前状态
    const currentState = store.getState()
    // 序列化状态为JSON字符串
    const serializedState = JSON.stringify(currentState)
    // 返回序列化后的状态
    return serializedState
  }

  const getStylesForExport = async () => {
    let styles = ""
    const styleSheets = Array.from(document.styleSheets)

    const fetchStylesPromises = styleSheets.map(async (sheet) => {
      try {
        if (sheet.cssRules) {
          const cssRules = Array.from(sheet.cssRules)
          cssRules.forEach((rule) => {
            styles += `${rule.cssText}\n`
          })
        } else if (sheet.href) {
          // 为了避免CORS问题，这里假设你有权限访问这些资源或者它们不受CORS限制
          const response = await fetch(sheet.href)
          styles += `${await response.text()}\n`
        }
      } catch (e) {
        console.warn("无法加载某些样式:", e)
      }
    })

    await Promise.all(fetchStylesPromises)

    return styles
  }

  function getJavascriptForExport() {
    // 初始化一个字符串来收集所有的脚本
    let scripts = ""

    // 收集所有的内联脚本
    const inlineScripts = Array.from(document.querySelectorAll("script:not([src])"))
    inlineScripts.forEach((script) => {
      scripts += `${script.innerHTML}\n`
    })
    // 收集所有的外部脚本链接
    const externalScripts = Array.from(document.querySelectorAll("script[src]"))
    externalScripts.forEach((script) => {
      // 你可能需要记录外部脚本的URL来在导出后重新加载
      // 这里简单地将其作为注释添加到脚本内容中
      scripts += `/* 外部脚本链接: ${script.getAttribute("src")} */\n`
    })
    // 注意：对于通过JavaScript动态绑定的事件处理器，
    // 你需要更复杂的逻辑来获取并正确地导出它们。
    return scripts
  }
  // const exportSelectedCardsAsHtml = () => {
  //   let htmlContent =
  //     "<!DOCTYPE html><html lang="en"><head><title>Exported Cards</title></head><body>"
  //   selectedCards.forEach((cardId) => {
  //     const cardElement = document.getElementById(cardId)
  //     // console.log("cardElement", cardId)
  //     if (cardElement) {
  //       htmlContent += cardElement.outerHTML
  //     }
  //   })
  //   htmlContent += "</body></html>"
  //   const newWindow = window.open("", "_blank")
  //   if (newWindow) {
  //     newWindow.document.write(htmlContent)
  //     newWindow.document.close()
  //   } else {
  //     console.error("Unable to open a new window. Perhaps it has been blocked by a popup blocker.")
  //   }
  // }

  // const exportSelectedCardsAsHtml = async () => {
  //   let htmlContent = "<!DOCTYPE html><html lang="en"><head><title>Exported Cards</title>"
  //   const css = await getStylesForExport() // 获取CSS样式
  //   const js = await getJavascriptForExport() // 获取JavaScript代码
  //   htmlContent += `<style>${css}</style></head><body>`
  //   const state = JSON.stringify(getAppState()) // 序列化应用状态

  //   // 使用 Promise.all 来等待所有卡片的 HTML 被获取
  //   const cardHtmls = await Promise.all(selectedCards.map(async (cardId) => {
  //     const index = Cards.findIndex((card) => card.id === cardId)
  //     console.log("检查index", index)
  //     if (index !== -1 && cardRefs[index].current) {
  //       const cardElement = cardRefs[index].current as HTMLElement
  //       return getNarrativeHtml(cardElement) // getNarrativeHtml 需要接收一个真实的 DOM 元素
  //     }
  //     return ""
  //   }))
  //   // 拼接所有卡片的 HTML 字符串
  //   cardHtmls.forEach((cardHtml) => {
  //     if (cardHtml) {
  //       htmlContent += cardHtml
  //     }
  //   })

  //   htmlContent += `<script>${state}</script><script>${js}</script></body></html>`

  //   const newWindow = window.open("", "_blank")
  //   if (newWindow) {
  //     newWindow.document.write(htmlContent)
  //     newWindow.document.close()
  //     newWindow.document.title = "Exported Content"
  //   } else {
  //     console.error("Unable to open a new window. Perhaps it has been blocked by a popup blocker.")
  //   }
  // }

  const onCopySuccess = () => {
    console.log("多张卡片的富文本内容已复制到剪贴板。")
  }
  const copySelectedCardsAsRichText = async () => {
    // 创建一个空的数组来保存所有卡片的 HTML Promise
    const htmlPromises: Promise<string>[] = []

    // 遍历所有选中的卡片 ID
    selectedCards.forEach((cardId) => {
      // 获取卡片元素的引用
      const cardElement = document.getElementById(cardId)
      if (cardElement) {
        // 将获取卡片富文本内容的 Promise 加入数组
        htmlPromises.push(getNarrativeHtml(cardElement, "text"))
      }
    })

    // 使用 Promise.all 等待所有卡片的 HTML Promise 完成
    Promise.all(htmlPromises)
      .then((htmls) => {
        // 使用 join 将所有 HTML 拼接成一个字符串
        const htmlContent = htmls.join("")
        const plainText = htmlContent.replace(/<[^>]+>/g, "") // 将 HTML 标签去除，得到纯文本

        // 使用 copyToClipboard 函数复制到剪贴板
        copyToClipboard(htmlContent, plainText, onCopySuccess)
      })
      .catch((err) => {
        console.error("复制富文本内容失败: ", err)
      })
  }

  const exportSelectedCardsAsImage = async () => {
    // 隐藏导出按钮
    setShowExportButton(false)
    dispatch(
      ChangeSystemSetting({
        ...systemSetting,
        setShowExportButton: false,
      }),
    )
    // 稍微延迟以确保按钮的显示状态更新
    setTimeout(async () => {
      // 你的截图逻辑...
      // 创建卡片元素数组
      const cardElements = selectedCards
        .map((cardId) => document.getElementById(cardId))
        .filter(Boolean) as HTMLElement[]

      // 并行获取每个卡片的高度，并计算总高度
      const heights = await Promise.all(
        cardElements.map((cardElement) => html2canvas(cardElement).then((canvas) => canvas.height)),
      )
      const totalHeight = heights.reduce((sum, height) => sum + height, 0)

      // 并行获取每个卡片的宽度，并计算最大宽度
      const widths = await Promise.all(
        cardElements.map((cardElement) => html2canvas(cardElement).then((canvas) => canvas.width)),
      )
      const maxWidth = Math.max(...widths)

      // 创建单个画布元素
      const combinedCanvas = document.createElement("canvas")
      combinedCanvas.width = maxWidth
      combinedCanvas.height = totalHeight
      const context = combinedCanvas.getContext("2d")

      if (context) {
        // 首先，创建一个 promise 数组来并行处理所有 html2canvas 调用
        const canvasPromises = cardElements.map((cardElement) => html2canvas(cardElement))

        // 使用 Promise.all 等待所有 canvas 准备就绪
        const canvases = await Promise.all(canvasPromises)

        // 初始化 yOffset 用于累计每个 canvas 的高度
        let yOffset = 0

        // 现在可以不在循环中使用 await 了
        canvases.forEach((canvas) => {
          context.drawImage(canvas, 0, yOffset)
          yOffset += canvas.height
        })

        // 将画布转换为数据URL
        const image = combinedCanvas.toDataURL("image/png", 1.0)

        // 创建链接并设置图片URL为href属性
        const link = document.createElement("a")
        link.href = image
        link.download = "exported-cards.png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
      // 确保按钮在截图之后显示
      setShowExportButton(true)
      dispatch(
        ChangeSystemSetting({
          ...systemSetting,
          setShowExportButton: true,
        }),
      )
    }, 100)
  }

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
  return (
    <div className="panel3">
      <div className="header">
        <Tooltip title="Copy Rich Text">
          <div
            style={{
              position: "absolute",
              top: 65,
              right: 200,
              display: showButtons ? "block" : "none",
            }}
          >
            <CopyOutlined
              onClick={copySelectedCardsAsRichText}
              style={{ cursor: "pointer", fontSize: "20px" }} // 调整图标的大小
            />
          </div>
        </Tooltip>
        <Tooltip title="Export This Card">
          <div style={{ position: "absolute", top: 64, right: 170 }}>
            <ShareSvg
              onClick={showModal}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                display: showButtons ? "block" : "none",
              }}
            />
            <Modal
              title="Export Options"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              mask={false}
              maskClosable
              style={{ position: "absolute", top: 65, right: 180 }} // Adjust the position of the modal here
              getContainer={false} // This makes the modal render inline without a portal
            >
              <p>
                <Button onClick={handleButtonClick}>Download HTML</Button>
              </p>
              <p>
                <Button onClick={exportSelectedCardsAsImage}>Download Image</Button>{" "}
                {/* Corrected function name */}
              </p>
            </Modal>
          </div>
        </Tooltip>
      </div>
      <div style={{ height: "100%", overflow: "auto" }}>
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

export default InsightCards
