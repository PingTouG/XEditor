import { defaultClasses, defaultActions } from './.internal/configs/index'
import { EClasses } from './.internal/enums'
import { Config } from './.internal/types'
import {
  createContent,
  createToolbar,
  exec,
  getEditor,
  mergeAction,
  setContent,
  setEditor,
  setToolbar,
} from './.internal/helpers/index'

export const create = ({
  actions: configActions,
  classes: configClasses,
  el,
  editable = true,
}: Config) => {
  const elType = typeof el

  if (elType !== 'string') {
    throw new Error(`期望属性el的类型是string，但得到的类型是${elType}`)
  }

  // 合并classes
  const classes = { ...defaultClasses, ...configClasses }
  // 合并actions
  const actions = mergeAction(defaultActions, configActions)

  // 获取编辑器元素，此操作会将编辑器元素设置为上下文的editor属性
  const editor = getEditor(el)
  // 创建工具栏，此操作会将工具栏元素设置为上下文的toolbar属性
  const toolbar = createToolbar('div')
  // 创建工作区，此操作会将工作区元素设置为上下文的content属性
  const content = createContent('div')

  // 设置工具栏
  setToolbar({
    actions,
    classes,
  })
  // 设置工作区
  setContent({
    className: classes[EClasses.CONTENT],
    editable: editable.toString(),
  })
  // 设置编辑器
  setEditor({ className: classes[EClasses.ROOT], content, toolbar })
}

export default {
  create,
  exec,
}
