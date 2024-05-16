import React from "react"
import { Col, Row, Divider, Collapse } from "antd"
import ControlFont from "./components/ControlGlobalSetting/ControlFont"
import ControlLineHeight from "./components/ControlGlobalSetting/ControlLineHeight"
import ControlAspectRatio from "./components/ControlWordScaleGragphicsSetting/ControlAspectRatio"
import ControlSparkLinePos from "./components/ControlWordScaleGragphicsSetting/ControlSparkLinePos"
import NavigationCard from "./components/NavigationCard"

const { Panel } = Collapse
type navigationProps = {
  navigationClick: (cardID: number) => void
  CardsIDs: string[]
}
const Navigation: React.FC<navigationProps> = ({ navigationClick, CardsIDs }) => (
  <div id="Navigation">
    {CardsIDs.map((cardID, index) => (
      <div key={index} style={{}}>
        {/* <button type="submit" onClick={() => navigationClick(index)}>
            {cardID}
          </button> */}
        {/* <Collapse defaultActiveKey={["1"]} style={{ backgroundColor: "white" }}></Collapse> */}
        {/* <Panel
            header={<span className="panel-header">Icon</span>}
            key="1"
            style={{ backgroundColor: "#fff" }}
          > */}
        <NavigationCard navigationClick={navigationClick} CardID={cardID} cardIndex={index} />
        {/* </Panel> */}
      </div>
    ))}
  </div>
)

//   <div>
//     <button type="submit" onClick={() => navigationClick(1)}>
//       Square 1
//     </button>
//     <button type="submit" onClick={() => navigationClick(2)}>
//       Square 2
//     </button>
//     <button type="submit" onClick={() => navigationClick(3)}>
//       Square 3
//     </button>
//   </div>
// )

export default Navigation
