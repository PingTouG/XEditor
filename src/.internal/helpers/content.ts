import { ctx } from './editor'
import {
  addEventListener,
  createElement,
  setBoldButtonDisabled,
  exec,
  queryCommandValue,
  getToolbarItems,
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
export const setContent = ({ actions, classes, editable }: any) => {
  ctx.content.className = classes[EClasses.CONTENT]
  ctx.content.contentEditable = editable

  setContentListener(actions, classes)
}

// 键盘按下事件
const onKeydown = (e: any) => {
  if (e.key === 'Enter' && queryCommandValue(formatBlock) === 'blockquote') {
    setTimeout(() => exec(formatBlock, `<div>`), 0)
  }
}

// 键盘弹起事件
const onKeyup = (e: Event, actions: Array<Action>, classes: Classes) => {
  const { buttons } = getToolbarItems()

  buttons.forEach(button => {
    const key = button.getAttribute('key')
    const action = getAction(actions, key)
    button.classList[action.state() ? 'add' : 'remove'](
      `${classes[EClasses.CONTENT]}--selected`
    )
  })
}

// 鼠标抬起事件
const onMouseup = (e: Event, actions: Array<Action>, classes: Classes) => {
  const { buttons, selects } = getToolbarItems()
  const target = e.target as HTMLElement

  // 鼠标当前所在内容的元素name
  const nodeName = target.nodeName.toLowerCase()

  // 回显按钮高亮
  buttons.forEach(button => {
    const key = button.getAttribute('key')

    button.classList[queryCommandValue(key) === 'true' ? 'add' : 'remove'](
      `${classes[EClasses.BUTTON]}--selected`
    )
  })

  // 回显下拉框选中值
  selects.forEach(select => {
    const key = select.getAttribute('key')
    if (key === 'heading') {
      const tool = select as HTMLSelectElement

      for (let i = 0; i < tool.options.length; i++) {
        const option = tool.options[i]

        if (nodeName === option.value) {
          option.selected = true
          setBoldButtonDisabled(true)
          break
        } else {
          setBoldButtonDisabled(false)
        }
      }
    }
  })
}

// 输入事件
const onInput = ({ target: firstChild }: Event) => {
  if (firstChild && (firstChild as HTMLElement).nodeType === ENodeType.TEXT) {
    exec(formatBlock, `<div>`)
  } else if (ctx.content.innerHTML === '<br>') {
    ctx.content.innerHTML = ''
  }

  // settings.onChange(content.innerHTML)
}

// 设置工作区监听器
export const setContentListener = (
  actions: Array<Action>,
  classes: Classes
) => {
  addEventListener(ctx.content, 'keydown', onKeydown)
  addEventListener(ctx.content, 'keyup', e => onKeyup(e, actions, classes))
  addEventListener(ctx.content, 'mouseup', e => onMouseup(e, actions, classes))
  addEventListener(ctx.content, 'input', onInput)
}
