import { ctx } from './editor'
import {
  addEventListener,
  createElement,
  setBoldButtonDisabled,
  exec,
  queryCommandValue,
  getToolbarItems,
  setButtonSelected,
  setColorPickerButtonStyle,
} from './index'
import { ENodeType, EClasses } from '../enums'
import { Action, Classes } from '../types'

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

  // 回显按钮高亮
  buttons.forEach(button => {
    const key = button.getAttribute('key')

    if (key === 'backColor' || key === 'foreColor') {
      setColorPickerButtonStyle(key, '#000000', queryCommandValue(key))
    }

    setButtonSelected(
      button,
      classes[EClasses.BUTTON],
      queryCommandValue(key) === 'true'
    )
  })

  // 回显heading选项
  selects.forEach(select => {
    const key = select.getAttribute('key')
    const tool = select as HTMLSelectElement
    // 选中option下标
    let selectedIndex = 0

    switch (key) {
      case 'heading':
        for (let i = 0; i < tool.options.length; i++) {
          const option = tool.options[i]

          if (queryCommandValue(formatBlock) === option.value) {
            selectedIndex = i
            break
          }
        }

        setBoldButtonDisabled(selectedIndex !== 0, classes[EClasses.BUTTON])
        tool.selectedIndex = selectedIndex
        break
      case 'text-align':
        for (let i = 0; i < tool.options.length; i++) {
          const optionKey = tool.options[i].getAttribute('key')

          if (queryCommandValue(optionKey) === 'true') {
            tool.selectedIndex = i
            break
          }
        }
        break
    }
  })
}

// 输入事件
const onInput = (e: InputEvent) => {
  const { firstChild } = e.target as HTMLElement

  // 无内容直接输入时插入的为文本节点,将其封装到div中
  if (firstChild && (firstChild as HTMLElement).nodeType === ENodeType.TEXT) {
    exec(formatBlock, `<div>`)
  } else if (
    ctx.content.innerHTML === '<div><br></div>' ||
    ctx.content.innerHTML === '<br>'
  ) {
    // 无内容回车时会插入两个<div><br></div>以实现换行,
    // 当工作区域仅为一个<div><br></div>时则表示没有任何内容,需要手动清理
    // 当删除所有内容时，还会出现一个<br>，需要手动清理
    ctx.content.innerHTML = ''
  }

  // settings.onChange(content.innerHTML)
}

const onKeyup = (e: KeyboardEvent, classes: Classes) => {
  if (e.key === 'Enter') {
    const { selects } = getToolbarItems()

    const select = selects.filter(
      item => item.getAttribute('key') === 'heading'
    )
    if (select.length) {
      const heading = select[0] as HTMLSelectElement
      heading.options[0].selected = true
      setBoldButtonDisabled(false, classes[EClasses.BUTTON])
    }
  }
}

// 设置工作区监听器
export const setContentListener = (classes: Classes) => {
  addEventListener(ctx.content, 'mouseup', e => onMouseup(e, classes))
  addEventListener(ctx.content, 'input', onInput)
  addEventListener(ctx.content, 'keyup', e =>
    onKeyup(e as KeyboardEvent, classes)
  )
}
