import { Context } from '../types'
import { appendChild, queryElement } from './common'

// 编辑器上下文
export const ctx: Context = {
  editor: null,
  toolbar: null,
  content: null,
}

// 获取编辑器元素
export const getEditor = (tag: string) => {
  ctx.editor = queryElement(tag)
  return ctx.editor
}

// 设置编辑器
export const setEditor = ({ className, toolbar, content }: any) => {
  ctx.editor.className = className

  // 添加toolbar
  appendChild(ctx.editor, toolbar)
  // 添加工作区
  appendChild(ctx.editor, content)
}
