import { Action } from '../types'

// 添加监听事件
export const addEventListener = (
  parent: Element,
  type: string,
  listener: EventListener
) => {
  parent.addEventListener(type, listener)
}

// 添加元素
export const appendChild = (parent: Element, child: Element) => {
  return parent.appendChild(child)
}

// 创建元素
export const createElement = (tag: string) => {
  return document.createElement(tag)
}

// 执行指令
export const exec = (command: string, value: any = null) => {
  return document.execCommand(command, false, value)
}

// 获取action
export const getAction = (actions: Array<Action>, key: string) => {
  const actionList = actions.filter(action => action.key === key)
  return actionList.length > 0 ? actionList[0] : null
}

// 合并action
export const mergeAction = (
  defaultActions: {
    [prop: string]: Action
  },
  configActions: Array<string | Action> | undefined
) => {
  let actions = Object.keys(defaultActions).map(
    action => defaultActions[action]
  )

  if (configActions) {
    actions = configActions.map((action: string | Action) => {
      if (typeof action === 'string') {
        return defaultActions[action]
      } else if (defaultActions[action.key]) {
        return { ...defaultActions[action.key], ...action }
      }

      return action
    })
  }

  return actions
}

// 查询指令状态码：1表示已执行；0表示未执行，处于可执行状态；-1表示不可用状态
export const queryCommandState = (command: string) => {
  return document.queryCommandState(command)
}

// 查找元素
export const queryElement = (selector: string) => {
  return document.querySelector(selector) as HTMLElement
}
