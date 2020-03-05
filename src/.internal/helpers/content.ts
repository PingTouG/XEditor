import { ctx } from './editor'
import {
  addEventListener,
  createElement,
  setBoldButtonDisabled,
  exec,
  queryCommandValue,
  getToolbarItems,
  setButtonSelected,
} from './index'
import { ENodeType, EClasses } from '../enums'
import { Action, Classes } from '../types'
import { getAction } from './common'

const formatBlock = 'formatBlock'

// 创建工作区
export const createContent = (tag: string) => {
  ctx.content = createElement(tag)
  return ctx.content
}

// 设置工作区
export const setContent = ({ classes, editable }: any) => {
  ctx.content.className = classes[EClasses.CONTENT]
  ctx.content.contentEditable = editable

  setContentListener(classes)
}

// 鼠标抬起事件
const onMouseup = (e: Event, classes: Classes) => {
  const { buttons, selects } = getToolbarItems()
  const target = e.target as HTMLElement

  // 鼠标当前所在内容的元素name
  const nodeName = target.nodeName.toLowerCase()

  // 回显按钮高亮
  buttons.forEach(button => {
    const key = button.getAttribute('key')

    setButtonSelected(
      button,
      classes[EClasses.BUTTON],
      queryCommandValue(key) === 'true'
    )
  })

  // 设置bold按钮禁/启用
  selects.forEach(select => {
    const key = select.getAttribute('key')
    if (key === 'heading') {
      const tool = select as HTMLSelectElement

      for (let i = 0; i < tool.options.length; i++) {
        const option = tool.options[i]

        if (nodeName === option.value) {
          option.selected = true
          setBoldButtonDisabled(true, classes[EClasses.BUTTON])
          break
        } else {
          setBoldButtonDisabled(false, classes[EClasses.BUTTON])
        }
      }
    }
  })
}

// 输入事件
const onInput = (e: Event) => {
  const { firstChild } = e.target as HTMLElement

  // 无内容直接输入时插入的为文本节点,将其封装到div中
  if (firstChild && (firstChild as HTMLElement).nodeType === ENodeType.TEXT) {
    exec(formatBlock, `<div>`)
  } else if (ctx.content.innerHTML === '<div><br></div>') {
    // 无内容回车时会插入两个<div><br></div>以实现换行,
    // 当工作区域仅为一个<div><br></div>时则表示没有任何内容,需要手动清理
    ctx.content.innerHTML = ''
  }

  // settings.onChange(content.innerHTML)
}

// 设置工作区监听器
export const setContentListener = (classes: Classes) => {
  addEventListener(ctx.content, 'mouseup', e => onMouseup(e, classes))
  addEventListener(ctx.content, 'input', onInput)
}
