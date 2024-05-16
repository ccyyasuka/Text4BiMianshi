import { entityStylesType } from "../types"

// 这里提供了每个实体类型样式设置的初始值
export const iniEntityStyles: entityStylesType = {
    metric_value: {
      boldness: true,
      underline: false,
      italics: false,
      contour: false,
      color: "#4B91FF",
      backgroundColor: "white",
    },
    // 为其他实体类型定义样式设置...
    binary_value_positive: {
      boldness: true,
      underline: false,
      italics: false,
      contour: false,
      color: "#13A8A8",
      backgroundColor: "white",
    },
    binary_value_negative: {
      boldness: true,
      underline: false,
      italics: false,
      contour: false,
      color: "#FA541C",
      backgroundColor: "white",
    },
    metric_names: {
      boldness: true,
      underline: false,
      italics: false,
      contour: false,
      color: "#000000",
      backgroundColor: "white",
    },
    algorithm: {
      boldness: false,
      underline: false,
      italics: false,
      contour: false,
      color: "#000000",
      backgroundColor: "white",
    },
    filter_time: {
      boldness: true,
      underline: false,
      italics: false,
      contour: false,
      color: "#000000",
      backgroundColor: "white",
    },
    filter_cate: {
      boldness: true,
      underline: false,
      italics: false,
      contour: false,
      color: "#000000",
      backgroundColor: "white",
    },
}
