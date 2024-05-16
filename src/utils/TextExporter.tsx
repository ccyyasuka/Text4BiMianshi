import { Canvg } from "canvg"

export type ImageExtra = {
  jumpUrl?: string
}

export function getPrefixCls(suffixCls?: string) {
  return `avar-${suffixCls}`
}
export const NTV_PREFIX_CLS = getPrefixCls("ntv") // return 'avar-ntv'
const NTV_CONTAINER_CLS = `${NTV_PREFIX_CLS}-container`
/** export img alt attr */
export const NTV_IMG_ALT = NTV_PREFIX_CLS
function canvasToImageHtml(canvasElement: HTMLCanvasElement, imgExtra: ImageExtra | undefined) {
  const pngUrl = canvasElement.toDataURL()
  let { width, height } = canvasElement
  // 计算等比例缩放因子
  const scaleX = 1300 / width
  const scaleY = 400 / height
  const scaleToFit = Math.min(scaleX, scaleY)
  // 如果需要缩放，则更新宽度和高度
  if (scaleToFit < 1) {
    width *= scaleToFit
    height *= scaleToFit
  }
  const baseImageHtml = `<img alt="${NTV_IMG_ALT}" src="${pngUrl}" style="max-width:${width}px; max-height:${height}px;" />`
  const imageHtml = imgExtra?.jumpUrl
    ? `<a href="${imgExtra.jumpUrl}">${baseImageHtml}</a>`
    : baseImageHtml
  return imageHtml
}

function selectorToText(selectorElement: HTMLDivElement, imgExtra: ImageExtra | undefined) {
  // console.log("检查是否调用selectorElement", selectorElement)
  // 首先尝试提取只读 input 元素的值
  const inputElement: HTMLInputElement | null = selectorElement.querySelector("input[readonly]")
  let value = inputElement ? inputElement.value : undefined
  // console.log("检查是否有inputElement", inputElement)

  // 如果没有值，则尝试从 Ant Design Select 组件提取文本
  if (!value) {
    // 选择 Ant Design Select 组件的显示项元素
    const selectDisplayElement = selectorElement.querySelector(
      ".ant-select-selection-item, .ant-select-selection-placeholder",
    )
    // 提取文本，确保只提取文本内容，忽略任何图标或其他元素
    if (selectDisplayElement && selectDisplayElement.textContent) {
      value = selectDisplayElement.textContent.trim()
    }
    // value = selectDisplayElement ? selectDisplayElement.textContent.trim() : undefined
  }

  // 创建并返回文本 HTML，如果没有找到值，则显示 '未选择'
  const textHtml = `<span>${value || "未选择"}</span>`
  return textHtml
}

function dateToText(selectorElement: HTMLDivElement, imgExtra: ImageExtra | undefined) {
  // 首先尝试提取 input 元素的值
  const inputElement = selectorElement.querySelector("input")
  const value = inputElement ? inputElement.value : undefined
  // 如果没有找到 input 元素或者值为空，则尝试其他方法获取值（这部分在您提供的结构中不需要）
  // ...
  // 创建并返回文本 HTML，如果没有找到值，则显示 '未选择'
  const textHtml = `<span>${value || "未选择"}</span>`
  return textHtml
}

function isNegativeArrow(svgElement: SVGSVGElement) {
  return svgElement?.parentElement?.className.includes(`${NTV_PREFIX_CLS}-value-negative`)
}
function isPositiveArrow(svgElement: SVGSVGElement) {
  return svgElement.parentElement?.className.includes(`${NTV_PREFIX_CLS}-value-positive`)
}
function isEyeIcon(svgElement: SVGSVGElement) {
  return (
    svgElement.parentElement?.className.includes("anticon-eye") ||
    svgElement.parentElement?.className.includes("anticon-eye-invisible")
  )
}
async function svgToPngUrl(
  data: { width?: number; height?: number; svg: string },
  canvas: HTMLCanvasElement,
) {
  const { svg } = data
  const ctx = canvas?.getContext("2d")
  if (ctx) {
    const v = await Canvg.from(ctx, svg)
    await v.render()
  }
  // 面试复习
  const pngUrl = canvas?.toDataURL()
  return pngUrl
}
async function svgToImageHtml(
  svgElement: SVGSVGElement,
  svgHtml: string,
  canvas: HTMLCanvasElement,
) {
  // const { width, height } = svgElement.getBBox() || {}
  const { width, height } = svgElement.getBoundingClientRect() || {} // svgElement.getBoundingClientRect()会有更好的效果 zyx git zyxgit
  const imageUrl = await svgToPngUrl({ width, height, svg: svgHtml }, canvas)
  const imageHtml = `<img src="${imageUrl}" width="${width}" height="${height}"/>`
  return imageHtml
}
function transformArrowToText(svgElement: SVGSVGElement, html: string) {
  let newHtml = html
  const svgHtml = svgElement.outerHTML
  if (isNegativeArrow(svgElement)) {
    newHtml = newHtml.replace(svgHtml, "-")
  }
  if (isPositiveArrow(svgElement)) {
    newHtml = newHtml.replace(svgHtml, "+")
  }
  return newHtml
}

export async function transformHtml({
  elements = [],
  exportType,
  imageExtra,
  replaceType = "image", // containerWidth,
  // containerHeight,
}: {
  elements: HTMLCollectionOf<Element> | HTMLElement[]
  exportType: "html" | "text" | "none"
  replaceType?: "image" | "text" | "none"
  imageExtra?: ImageExtra
}) {
  let originalHtml = ""
  // debugger
  for (let i = 0; i < elements.length; i += 1) {
    const element = (elements as HTMLCollectionOf<Element>).item?.(i) || elements?.[i]
    originalHtml += element?.outerHTML || "" // 使用空字符串作为默认值 zyx
  }
  let newHtml = originalHtml
  // debugger

  const canvasForCopy = document.createElement("canvas")
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i]
    const allDivs = element.querySelectorAll("div")
    const svgElements = element.getElementsByTagName("svg")
    const canvasElements = element.getElementsByTagName("canvas")

    // 当要复制富文本的时候，对select和datepicker提取他们的文本值，其他时候作为svg/canvas处理
    if (exportType === "text") {
      // 过滤出类名以 'ant-space css-dev-only-do-not-override-2i2tap' 开头的div元素，这里是select元素
      const selectorElements = Array.from(allDivs).filter((div) =>
        // div.className.startsWith("ant-space css-dev-only-do-not-override"),
        div.className.startsWith("ant-space css-dev-only-do-not-override-w4golw"),
      )
      // 过滤出类名以 'ant-space css-dev-only-do-not-override-1xg9z9n' 开头的div元素，这里是datepicker元素
      const dateSelectorElements = Array.from(allDivs).filter((div) =>
        // div.className.startsWith("ant-space css-dev-only-do-not-override"),
        div.className.startsWith("ant-space css-dev-only-do-not-override-djtmh8"),
      )
      for (let l = 0; l < selectorElements.length; l += 1) {
        const selectorElement = selectorElements[l]
        const selectorHtml = selectorElement.outerHTML
        if (replaceType === "image") {
          const imageHtml = selectorToText(selectorElement, imageExtra)
          newHtml = newHtml.replace(selectorHtml, imageHtml)
        }
      }
      for (let l = 0; l < dateSelectorElements.length; l += 1) {
        const selectorElement = dateSelectorElements[l]
        // console.log("1检查selectorElement", selectorElement)
        const selectorHtml = selectorElement.outerHTML
        // console.log("2检查selectorHtml", selectorHtml)
        if (replaceType === "image") {
          const imageHtml = dateToText(selectorElement, imageExtra)
          newHtml = newHtml.replace(selectorHtml, imageHtml)
        }
      }
    }
    // const selectorElements
    for (let k = 0; k < canvasElements.length; k += 1) {
      const canvasElement = canvasElements[k]
      const elemHtml = canvasElement.outerHTML
      if (replaceType === "image") {
        const imageHtml = canvasToImageHtml(canvasElement, imageExtra)
        newHtml = newHtml.replace(elemHtml, imageHtml)
      }
    }
    for (let j = 0; j < svgElements.length; j += 1) {
      const svgElement = svgElements[j]
      const svgHtml = svgElement.outerHTML
      // 下面这种写法，会将svg转为图片，并且不能获得它的颜色，直接作为svg导出即可
      if (replaceType === "image") {
        if (isNegativeArrow(svgElement) || isPositiveArrow(svgElement)) {
          // 因为箭头 svg 转图片有点问题，所以先转 text
          console.log("此处检查111")
          newHtml = transformArrowToText(svgElement, newHtml)
        } else if (!isEyeIcon(svgElement)) {
          // eslint-disable-next-line no-await-in-loop
          const imageHtml = await svgToImageHtml(svgElement, svgHtml, canvasForCopy)
          newHtml = newHtml.replace(svgHtml, imageHtml)
          // console.log("此处检查222")
        }
      } else if (replaceType === "text") {
        newHtml = transformArrowToText(svgElement, newHtml)
      }
      // 下面这样子直接写，可以获得它的颜色，但是不能转为图片
      // newHtml = transformArrowToText(svgElement, newHtml)
    }
    // debugger
  }

  return newHtml
}

export async function getNarrativeHtml(
  container: HTMLElement,
  exportType: "html" | "text" | "none" = "html",
  imageExtra?: ImageExtra,
  replaceType: "image" | "text" | "none" = "image",
) {
  // 获取容器的宽度和高度
  const containerWidth = container.offsetWidth
  const containerHeight = container.offsetHeight
  // console.log("检查containerWidth", containerWidth)
  // console.log("检查containerHeight", containerHeight)
  //   debugger
  const elements = container?.getElementsByClassName(NTV_CONTAINER_CLS)
  const transformedHtml = await transformHtml({ elements, exportType, imageExtra, replaceType })
  return transformedHtml
}

export async function getNarrativeHtml4Export(
  container: HTMLElement,
  imageExtra?: ImageExtra,
  replaceType: "image" | "text" | "none" = "image",
) {
  //   debugger
  const elements = container?.getElementsByClassName(NTV_CONTAINER_CLS)
  let originalHtml = ""

  for (let i = 0; i < elements.length; i += 1) {
    const element = (elements as HTMLCollectionOf<Element>).item?.(i) || elements?.[i]
    originalHtml += element?.outerHTML || "" // 使用空字符串作为默认值 zyx
  }
  return originalHtml
}
