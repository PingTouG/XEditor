import { EClasses } from './enums'

export interface Action {
  key: string
  title?: string
  icon?: string
  children?: Array<Action>
  state?: () => boolean
  exec?: () => boolean | void
}

export interface Classes {
  [EClasses.ROOT]?: string
  [EClasses.TOOLBAR]?: string
  [EClasses.BUTTON]?: string
  [EClasses.SELECT]?: string
  [EClasses.CONTENT]?: string
}

export interface Config {
  el: string
  editable?: boolean
  classes?: Classes
  actions?: Array<string | Action>
}

export interface Context {
  editor: HTMLElement
  toolbar: HTMLElement
  content: HTMLElement
}
