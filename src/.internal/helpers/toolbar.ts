import { EClasses } from '../enums'
import { Action, Classes } from '../types'
import { ctx } from './editor'
import {
  addEventListener,
  appendChild,
  createElement,
  getAction,
} from './common'

// 创建按钮元素
export const createButton = (action: Action, className: string) => {
  const button = createElement('button')
  button.className = className
  button.title = action.title
  button.innerHTML = action.icon
  button.setAttribute('key', action.key)
  button.setAttribute('type', 'button')

  return button
}

// 创建下拉框元素
export const createSelect = (action: Action, className: string) => {
  const select = createElement('select') as HTMLSelectElement
  select.className = className
  select.title = action.title
  select.setAttribute('key', action.key)

  action.children.forEach(child => {
    const option = document.createElement('option') as HTMLOptionElement
    option.innerHTML = child.icon
    option.value = child.key
    option.title = child.title
    option.setAttribute('key', child.key)

    select.appendChild(option)
  })

  return select
}

// 创建工具栏
export const createToolbar = (tag: string) => {
  ctx.toolbar = createElement(tag)
  return ctx.toolbar
}

// 创建工具栏子元素
export const createToolbarItems = (
  actions: Array<Action>,
  classes: Classes
) => {
  return actions.map(action =>
    action.children
      ? createSelect(action, classes[EClasses.SELECT])
      : createButton(action, classes[EClasses.BUTTON])
  )
}

// 获取工具栏中的工具
export const getToolbarItems = () => {
  const tools = ctx.toolbar.children

  const buttons = []
  const selects = []

  for (let i = 0; i < tools.length; i++) {
    const tool = tools[i]

    tool.nodeName === 'BUTTON' && buttons.push(tool)

    tool.nodeName === 'SELECT' && selects.push(tool)
  }

  return { buttons, selects }
}

// 设置Bold按钮禁/启用
export const setBoldButtonDisabled = (
  isDiaabled: boolean,
  className: string
) => {
  if (isDiaabled) {
    const buttons = document.querySelectorAll('.xeditor__button')
    buttons.forEach(button => {
      if (button.getAttribute('title') === 'Bold') {
        button.setAttribute('disabled', 'disabled')
        button.classList.remove(`${className}--selected`)
        button.classList.add(`${className}--disabled`)
      }
    })
  } else {
    const button = document.querySelector(`.${className}--disabled`)
    if (button && button.getAttribute('title') === 'Bold') {
      button.classList.remove(`${className}--disabled`)
    }
  }
}

// 设置按钮是否选中
export const setButtonSelected = (
  button: Element,
  className: string,
  isSelected: boolean
) => {
  return button.classList[isSelected ? 'add' : 'remove'](
    `${className}--selected`
  )
}

// 设置工具栏
export const setToolbar = ({ actions, classes }: any) => {
  ctx.toolbar.className = classes[EClasses.TOOLBAR]

  // 获取操作元素
  const toolbarItems = createToolbarItems(actions, classes)

  toolbarItems.forEach((tool: HTMLElement) => {
    // 设置操作监听器
    setToolbarListener(actions, classes, tool)

    // 将工具添加到toolbar
    appendChild(ctx.toolbar, tool)
  })
}

// 设置工具栏Button元素监听器
export const setToolbarButtonListener = (
  action: Action,
  classes: Classes,
  tool: HTMLElement
) => {
  const buttonClassName = classes[EClasses.BUTTON]

  if (!action) {
    throw new Error(`未成功设置操作，请检查配置是否有误？`)
  }
  const handler = () => {
    action.exec()
    ctx.content.focus()

    setButtonSelected(tool, buttonClassName, action.state && action.state())
  }
  addEventListener(tool, 'click', handler)
}

// 设置工具栏监听器
export const setToolbarListener = (
  actions: Array<Action>,
  classes: Classes,
  tool: HTMLElement
) => {
  const toolType = tool.nodeName

  const key = tool.getAttribute('key')
  const action = getAction(actions, key)

  switch (toolType) {
    case 'BUTTON':
      setToolbarButtonListener(action, classes, tool)
      break
    case 'SELECT':
      setToolbarSelectListener(
        action.children,
        classes,
        tool as HTMLSelectElement
      )
      break
  }
}

// 设置工具栏Select元素监听器
export const setToolbarSelectListener = (
  actions: Array<Action>,
  classes: Classes,
  tool: HTMLSelectElement
) => {
  const handler = (e: Event) => {
    const target = e.target as HTMLSelectElement
    const action = getAction(actions, target.value)
    setBoldButtonDisabled(target.selectedIndex !== 0, classes[EClasses.BUTTON])
    action.exec()
    ctx.content.focus()
  }

  addEventListener(tool, 'change', handler)
}
