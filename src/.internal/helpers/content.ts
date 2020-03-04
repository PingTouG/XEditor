import { ctx } from './editor'
import { createElement } from './index'

// 创建工作区
export const createContent = (tag: string) => {
  ctx.content = createElement(tag)
  return ctx.content
}

// 设置工作区
export const setContent = ({ className, editable }: any) => {
  ctx.content.className = className
  ctx.content.contentEditable = editable
}
