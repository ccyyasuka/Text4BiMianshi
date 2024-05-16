import { Chart, ELEMENT_CLASS_NAME, COMPONENT_CLASS_NAME } from "@antv/g2"

export const highlightAxis = (chart: Chart, interactionType: string) => {
  if (interactionType === "x-axis") {
    const { canvas } = chart.getContext()
    if (!canvas) return
    const components = canvas.document.getElementsByClassName(COMPONENT_CLASS_NAME)
    components.forEach((element, index) => {
      if (index === 0) return // 箭头函数中用return而不是continue来跳过
      element.getElementsByClassName("axis").forEach((el) => {
        el.getElementsByClassName("axis-main-group").forEach((el2) => {
          el2.getElementsByClassName("axis-label-group").forEach((el3) => {
            el3.getElementsByClassName("axis-label").forEach((el4) => {
              el4.getElementsByName("").forEach((el5) => {
                el5.style.opacity = 0.2
              })
            })
          })
        })
      })
    })

    const elements = canvas.document.getElementsByClassName(ELEMENT_CLASS_NAME)
    elements.forEach((element) => {
      element.style.opacity = 0.2
    })
  }
  /// //////
  if (interactionType === "y-axis") {
    const { canvas } = chart.getContext()
    if (!canvas) return
    const components = canvas.document.getElementsByClassName(COMPONENT_CLASS_NAME)
    components.forEach((element, index) => {
      if (index === 1) return // 箭头函数中用return而不是continue来跳过
      element.getElementsByClassName("axis").forEach((el) => {
        el.getElementsByClassName("axis-main-group").forEach((el2) => {
          el2.getElementsByClassName("axis-label-group").forEach((el3) => {
            el3.getElementsByClassName("axis-label").forEach((el4) => {
              el4.getElementsByName("").forEach((el5) => {
                el5.style.opacity = 0.2
              })
            })
          })
        })
      })
    })

    const elements = canvas.document.getElementsByClassName(ELEMENT_CLASS_NAME)
    elements.forEach((element) => {
      element.style.opacity = 0.2
    })
  }
  // //////
}
export const multiHighlightElements = (chart: Chart, interactionType: string, nums: number) => {
  const { canvas } = chart.getContext()
  if (!canvas) return
  const elements = canvas.document.getElementsByClassName(ELEMENT_CLASS_NAME)
  if (nums > 0) {
    for (let i = nums; i < elements.length; i += 1) {
      elements[i].style.opacity = 0.2
    }
  }

  // elements.forEach((element) => {
  //   element.style.opacity = 0.2
  // })
  // if (interactionType === "multiHighlight") {
  //   const { canvas } = chart.getContext()
  //   if (!canvas) return
  //   const components = canvas.document.getElementsByClassName(COMPONENT_CLASS_NAME)
  //   components.forEach((element, index) => {
  //     if (index === 0) return // 箭头函数中用return而不是continue来跳过
  //     element.getElementsByClassName("axis").forEach((el) => {
  //       el.getElementsByClassName("axis-main-group").forEach((el2) => {
  //         el2.getElementsByClassName("axis-label-group").forEach((el3) => {
  //           el3.getElementsByClassName("axis-label").forEach((el4) => {
  //             el4.getElementsByName("").forEach((el5) => {
  //               el5.style.opacity = 0.2
  //             })
  //           })
  //         })
  //       })
  //     })
  //   })

  //   const elements = canvas.document.getElementsByClassName(ELEMENT_CLASS_NAME)

  //   elements.forEach((element) => {
  //     element.style.opacity = 0.2
  //   })
  // }
}
export const noHighlightElement = (chart: Chart) => {
  chart?.emit("element:unhighlight", {})
  const { canvas } = chart.getContext()
  if (!canvas) return
  const components = canvas.document.getElementsByClassName(COMPONENT_CLASS_NAME)
  components.forEach((element, index) => {
    element.getElementsByClassName("axis").forEach((el) => {
      el.getElementsByClassName("axis-main-group").forEach((el2) => {
        el2.getElementsByClassName("axis-label-group").forEach((el3) => {
          el3.getElementsByClassName("axis-label").forEach((el4) => {
            el4.getElementsByName("").forEach((el5) => {
              el5.style.opacity = 1
            })
          })
        })
      })
    })
  })

  const elements = canvas.document.getElementsByClassName(ELEMENT_CLASS_NAME)
  elements.forEach((element) => {
    element.style.opacity = 1
  })
  // //////
}
