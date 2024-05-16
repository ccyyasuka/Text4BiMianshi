import { Checkbox, Col, Row } from "antd"
import type { CheckboxValueType } from "antd/es/checkbox/Group"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { systemStateType } from "../../types"
import { AppState } from "../../store"
import { ChangeSystemSetting } from "../../actions/systemAction"

const ControlSelectedCards: React.FC = () => {
  const dispatch = useDispatch()
  const [curSelectedCards, setSelectedCards] = useState([
    "Card1",
    "Card2",
    "Card3",
    "Card4",
    "Card5",
    "Card6",
    "Card7",
    "Card8",
  ])
  const systemSetting: systemStateType = useSelector((state: AppState) => state.system)

  const { allCards } = useSelector((state: AppState) => state.system)
  const { showBigGraph, showSparkLine } = useSelector((state: AppState) => state.globalSetting)

  const handleChangeCards = (newSelectedCards: CheckboxValueType[]) => {
    const stringSelectedCards = newSelectedCards.map((item) => String(item))
    setSelectedCards(stringSelectedCards)
    dispatch(
      ChangeSystemSetting({
        ...systemSetting,
        selectedCards: stringSelectedCards,
      }),
    )
  }

  return (
    <Checkbox.Group
      style={{ width: "100%" }}
      defaultValue={["Card1", "Card2", "Card3", "Card4", "Card5"]}
      onChange={handleChangeCards}
    >
      <Row>
        {allCards.map((card) => (
          <Col key={card} span={8}>
            <Checkbox value={card}>{card}</Checkbox>
          </Col>
        ))}
      </Row>
    </Checkbox.Group>
  )
}

export default ControlSelectedCards
