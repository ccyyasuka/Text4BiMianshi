import React, { useState, useEffect } from "react"
import { UploadOutlined } from "@ant-design/icons"
import { UploadProps, Button, message, Upload } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { AppState } from "../../store"
import { ChangeWordScaleGraphicsSetting } from "../../actions/wordScaleGraphicsSettingAction"

type ImportIconProps = {
  IconSpecies: string
  iconType: string
}
const ImportIcon: React.FC<ImportIconProps> = ({ IconSpecies, iconType }) => {
  const { entityIcon, absoluteIcon } = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  // eslint-disable-next-line quotes
  const IconN = '<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg"></svg>'
  const wordScaleGraphicsSetting = useSelector((state: AppState) => state.wordScaleGraphicsSetting)
  const { selectedSymbol1, semanticsAbsolutePosition, selectedSymbol2, semanticBindingEntityType } =
    useSelector((state: AppState) => state.wordScaleGraphicsSetting)
  const dispatch = useDispatch()
  // console.log("ImportIcon", absoluteIcon, semanticsAbsolutePosition, semanticBindingEntityType)
  const [svgContent, setSvgContent] = useState(IconN)
  useEffect(() => {
    if (iconType === "symbol1") {
      console.log("ImportIcon", absoluteIcon, semanticsAbsolutePosition, semanticBindingEntityType)
      console.log("ImportIcon", entityIcon[semanticsAbsolutePosition])
      setSvgContent(absoluteIcon[semanticsAbsolutePosition].e)
    } else {
      setSvgContent(entityIcon[semanticBindingEntityType].e)
    }
  }, [selectedSymbol1, semanticsAbsolutePosition, selectedSymbol2, semanticBindingEntityType])
  // const [svgContent, setSvgContent] = useState(null);
  const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === "done") {
        const file = info.file.originFileObj // info.file.originFileObj是File类型，组件封装原生组件只会多东西不会少东西，所以要么是extends，要么是用对象方式存储起来了
        const width = 20
        const height = 20
        if (file && file.type && file.type.includes("svg+xml")) {
          const reader = new FileReader()
          reader.onload = (e) => {
            let curSvgContent = e.target?.result as string
            // 使用正则表达式替换width和height属性
            //   curSvgContent = curSvgContent
            //     .replace(/width="\d+"/, 'width="${width}"')
            //     .replace(/height="\d+"/, 'height="${height}"')

            curSvgContent = curSvgContent
              .replace(/width="\d+"/, `width="${width}"`) // 模版字符串用反引号
              .replace(/height="\d+"/, `height="${height}"`)
            setSvgContent(curSvgContent)
            if (IconSpecies === "entity") {
              // entityIcon[semanticBindingEntityType][selectedSymbol2] = curSvgContent
              entityIcon[semanticBindingEntityType].e = curSvgContent
              dispatch(
                ChangeWordScaleGraphicsSetting({
                  ...wordScaleGraphicsSetting,
                  entityIcon: { ...entityIcon },
                  absoluteIcon: { ...absoluteIcon },
                  selectedSymbol2: "e",
                }),
              )
            }
            if (IconSpecies === "absolute") {
              // absoluteIcon[semanticsAbsolutePosition][selectedSymbol1] = curSvgContent
              absoluteIcon[semanticsAbsolutePosition].e = curSvgContent
              dispatch(
                ChangeWordScaleGraphicsSetting({
                  ...wordScaleGraphicsSetting,
                  entityIcon: { ...entityIcon },
                  absoluteIcon: { ...absoluteIcon },
                  selectedSymbol1: "e",
                }),
              )
            }
            // dispatch(
            //   ChangeWordScaleGraphicsSetting({
            //     ...wordScaleGraphicsSetting,
            //     entityIcon: { ...entityIcon },
            //     absoluteIcon: { ...absoluteIcon },
            //   }),
            // )
          }
          reader.readAsText(file)
        } else {
          alert("Please upload a valid SVG file.")
        }
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    // disabled,
  }
  return (
    <Upload {...props}>
      <Button
        icon={
          svgContent !== IconN ? (
            <span dangerouslySetInnerHTML={{ __html: svgContent }} />
          ) : (
            <UploadOutlined />
          )
        }
      />
    </Upload>
  )
}

export default ImportIcon
