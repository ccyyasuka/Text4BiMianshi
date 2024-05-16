import React, { useState } from "react"
import { Button, Col, Row } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeWordScaleGraphicsSetting } from "../../actions/wordScaleGraphicsSettingAction"
import { AppState } from "../../store"
import { wordScaleGraphicsSettingStateType } from "../../types"

import AnomalyA from "../../utils/icons/Anomaly_A.svg"
import AnomalyB from "../../utils/icons/Anomaly_B.svg"
import AssociationA from "../../utils/icons/Association_A.svg"
import AssociationB from "../../utils/icons/Association_B.svg"
import DifferenceA from "../../utils/icons/Difference_A.svg"
import DifferenceB from "../../utils/icons/Difference_B.svg"
import DistributionA from "../../utils/icons/Distribution_A.svg"
import DistributionB from "../../utils/icons/Distribution_B.svg"
import ProportionA from "../../utils/icons/Proportion_A.svg"
import ProportionB from "../../utils/icons/Proportion_B.svg"
import RankA from "../../utils/icons/Rank_A.svg"
import RankB from "../../utils/icons/Rank_B.svg"
import SeasonalityA from "../../utils/icons/Seasonality_A.svg"
import SeasonalityB from "../../utils/icons/Seasonality_B.svg"
import TrendA from "../../utils/icons/Trend_A.svg"
import TrendB from "../../utils/icons/Trend_B.svg"

// 导入icon-substitute中的所有SVG
import SubAnomalyA from "../../utils/icon-substitute/Anomaly_A.svg"
import SubAnomalyB from "../../utils/icon-substitute/Anomaly_B.svg"
import SubAssociationA from "../../utils/icon-substitute/Association_A.svg"
import SubAssociationB from "../../utils/icon-substitute/Association_B.svg"
import SubDifferenceA from "../../utils/icon-substitute/Difference_A.svg"
import SubDifferenceB from "../../utils/icon-substitute/Difference_B.svg"
import SubDistributionA from "../../utils/icon-substitute/Distribution_A.svg"
import SubDistributionB from "../../utils/icon-substitute/Distribution_B.svg"
import SubProportionA from "../../utils/icon-substitute/Proportion_A.svg"
import SubProportionB from "../../utils/icon-substitute/Proportion_B.svg"
import SubRankA from "../../utils/icon-substitute/Rank_A.svg"
import SubRankB from "../../utils/icon-substitute/Rank_B.svg"
import SubSeasonalityA from "../../utils/icon-substitute/Seasonality_A.svg"
import SubSeasonalityB from "../../utils/icon-substitute/Seasonality_B.svg"
import SubTrendA from "../../utils/icon-substitute/Trend_A.svg"
import SubTrendB from "../../utils/icon-substitute/Trend_B.svg"

// 定义一个接口来描述SVG图标对象的结构
interface SVGIcons {
  distributionType: { "a": typeof DistributionA; "b": typeof DistributionB }
  rankType: { "a": typeof RankA; "b": typeof RankB }
  proportionType: { "a": typeof ProportionA; "b": typeof ProportionB }
  associationType: { "a": typeof AssociationA; "b": typeof AssociationB }
  trendType: { "a": typeof TrendA; "b": typeof TrendB }
  differenceType: { "a": typeof DifferenceA; "b": typeof DifferenceB }
  anomalyType: { "a": typeof AnomalyA; "b": typeof AnomalyB }
  seasonalityType: { "a": typeof SeasonalityA; "b": typeof SeasonalityB }
}
type svgIconProps = {
  svgContent: string
}
export const SvgIcon: React.FC<svgIconProps> = ({ svgContent }) => (
  <span dangerouslySetInnerHTML={{ __html: svgContent }} />
)

const types = [
  { key: "distributionType", label: "Distribution" },
  { key: "rankType", label: "Rank" },
  { key: "proportionType", label: "Proportion" },
  { key: "associationType", label: "Association" },
  { key: "trendType", label: "Trend" },
  { key: "differenceType", label: "Difference" },
  { key: "anomalyType", label: "Anomaly" },
  { key: "seasonalityType", label: "Seasonality" },
]
const ControlTypeSwitch: React.FC = () => {
  const dispatch = useDispatch()
  const wordScaleGraphicsSetting: wordScaleGraphicsSettingStateType = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )

  const [isdistributionTypeOn, setIsdistributionTypeOn] = useState<"a" | "b">("a")
  const [isrankTypeOn, setIsrankTypeOn] = useState<"a" | "b">("a")
  const [isproportionTypeOn, setIsproportionTypeOn] = useState<"a" | "b">("a")
  const [isassociationTypeOn, setIsassociationTypeOn] = useState<"a" | "b">("a")
  const [istrendTypeOn, IstrendTypeOn] = useState<"a" | "b">("a")
  const [isdifferenceTypeOn, setIsdifferenceTypeOn] = useState<"a" | "b">("a")
  const [isanomalyTypeOn, setIsanomalyTypeOn] = useState<"a" | "b">("a")
  const [isseasonalityTypeOn, setIsseasonalityTypeOn] = useState<"a" | "b">("a")

  const handleTypeChange = (typeKey: string, newValue: "a" | "b") => {
    switch (typeKey) {
      case "distributionType":
        setIsdistributionTypeOn(newValue)
        break
      case "rankType":
        setIsrankTypeOn(newValue)
        break
      case "proportionType":
        setIsproportionTypeOn(newValue)
        break
      case "associationType":
        setIsassociationTypeOn(newValue)
        break
      case "trendType":
        IstrendTypeOn(newValue)
        break
      case "differenceType":
        setIsdifferenceTypeOn(newValue)
        break
      case "anomalyType":
        setIsanomalyTypeOn(newValue)
        break
      case "seasonalityType":
        setIsseasonalityTypeOn(newValue)
        break
      default:
        break
    }
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        [typeKey]: newValue,
      }),
    )
  }

  // 定义svg对象映射
  const svgs: SVGIcons = {
    distributionType: { a: DistributionA, b: DistributionB },
    rankType: { a: RankA, b: RankB },
    proportionType: { a: ProportionA, b: ProportionB },
    associationType: { a: AssociationA, b: AssociationB },
    trendType: { a: TrendA, b: TrendB },
    differenceType: { a: DifferenceA, b: DifferenceB },
    anomalyType: { a: AnomalyA, b: AnomalyB },
    seasonalityType: { a: SeasonalityA, b: SeasonalityB },
  }

  const substituteSVGs: SVGIcons = {
    distributionType: { a: SubDistributionA, b: SubDistributionB },
    rankType: { a: SubRankA, b: SubRankB },
    proportionType: { a: SubProportionA, b: SubProportionB },
    associationType: { a: SubAssociationA, b: SubAssociationB },
    trendType: { a: SubTrendA, b: SubTrendB },
    differenceType: { a: SubDifferenceA, b: SubDifferenceB },
    anomalyType: { a: SubAnomalyA, b: SubAnomalyB },
    seasonalityType: { a: SubSeasonalityA, b: SubSeasonalityB },
  }
  // // 根据typeKey和value决定使用哪个SVG图标
  // const getSVG = (typeKey: keyof SVGIcons, value: "a" | "b"): React.ReactElement => {
  //   const SVGComponent = svgs[typeKey][value]
  //   // console.log("检查debug SVGComponent", SVGComponent)
  //   // 使用React.createElement来创建带有特定属性的SVG元素
  //   return React.createElement(SVGComponent)
  // }

  // 修改renderButtonGroup函数来包含SVG图标
  const renderButtonGroup = (typeKey: keyof SVGIcons, label: string, value: "a" | "b") => {
    // 根据typeKey获取对应的SVG内容字符串
    const SVGUrlA = value === "a" ? substituteSVGs[typeKey].a : svgs[typeKey].a
    const SVGUrlB = value === "b" ? substituteSVGs[typeKey].b : svgs[typeKey].b
    return (
      <Row style={{ paddingTop: 6 }}>
        <Col span={10}>
          <div className="control-label-layer2">{label}</div>
        </Col>
        <Col span={14}>
          <Button.Group style={{ width: "80%" }}>
            <Button
              type={value === "a" ? "primary" : "default"}
              onClick={() => handleTypeChange(typeKey, "a")}
              style={{ width: "70%", paddingTop: "0", paddingBottom: "0" }}
              // icon={<SVGComponentA width="70" height="30" />} // 使用组件而非 createElement
            >
              <img src={SVGUrlA} alt={`${label} type A`} style={{ width: "70px", height: "30px" }} />
            </Button>
            <Button
              type={value === "b" ? "primary" : "default"}
              onClick={() => handleTypeChange(typeKey, "b")}
              style={{ width: "70%", paddingTop: "0", paddingBottom: "0" }}
              // icon={<SVGComponentB width="70" height="30" />} // 使用组件而非 createElement
            >
              <img src={SVGUrlB} alt={`${label} type B`} style={{ width: "70px", height: "30px" }} />
            </Button>
          </Button.Group>
        </Col>
      </Row>
    )
  }

  return (
    <div className="control-panel">
      {renderButtonGroup("differenceType", "Difference", isdifferenceTypeOn)}
      {renderButtonGroup("rankType", "Rank", isrankTypeOn)}
      {renderButtonGroup("proportionType", "Proportion", isproportionTypeOn)}
      {renderButtonGroup("trendType", "Trend", istrendTypeOn)}
      {renderButtonGroup("anomalyType", "Anomaly", isanomalyTypeOn)}
      {renderButtonGroup("seasonalityType", "Seasonality", isseasonalityTypeOn)}
      {renderButtonGroup("associationType", "Association", isassociationTypeOn)}
      {renderButtonGroup("distributionType", "Distribution", isdistributionTypeOn)}
    </div>
  )
}

export default ControlTypeSwitch
