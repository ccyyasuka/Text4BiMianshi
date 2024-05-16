import React from "react"
import { Chart } from "@antv/g2"
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CaretUpFilled,
  CaretDownFilled,
  PlusCircleOutlined,
  MinusCircleOutlined,
  WarningFilled,
} from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { cateAndValue } from "../types"
import { AppState } from "../store"

interface IconProps {
  assessment: string
  style?: React.CSSProperties // 添加这行代码来定义 style 属性
}
const Icon: React.FC<IconProps> = ({ assessment, style }) => {
  // console.log("ICON", assessment)
  const { graphicsSignificance, graphicsDirection, graphicsAnomaly } = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  // 添加条件来检查是否渲染特定的图标
  if (
    (graphicsSignificance === false &&
      (assessment === "significant" || assessment === "insignificant")) ||
    (graphicsDirection === false &&
      (assessment === "increase" ||
        assessment === "decrease" ||
        assessment === "positive" ||
        assessment === "negative")) ||
    (graphicsAnomaly === false && (assessment === "anomaly" || assessment === "outlier"))
  ) {
    return null // 不渲染图标
  }

  // 根据 assessment 返回相应的图标
  switch (assessment) {
    case "positive":
      return <PlusCircleOutlined style={{ ...style, fontSize: "14px", color: "#13A8A8" }} />
    case "negative":
      return <MinusCircleOutlined style={{ ...style, fontSize: "14px", color: "#FA5413" }} />
    case "significant":
      return <CheckCircleOutlined style={{ ...style, fontSize: "16px", color: "#13A8A8" }} />
    case "insignificant":
      return <CloseCircleOutlined style={{ ...style, fontSize: "16px", color: "#FA5413" }} />
    case "increase":
      return <CaretUpFilled style={{ ...style, fontSize: "16px", color: "#13A8A8" }} />
    case "decrease":
      return <CaretDownFilled style={{ ...style, fontSize: "16px", color: "#FA5413" }} />
    case "outlier":
      return <WarningFilled style={{ ...style, fontSize: "16px", color: "#FA5413" }} />
    case "anomaly":
      return <WarningFilled style={{ ...style, fontSize: "16px", color: "#FA5413" }} />
    default:
      return null
  }
}

Icon.defaultProps = {
  style: {}, // 提供一个空对象作为默认的 style 值
}

export default Icon
