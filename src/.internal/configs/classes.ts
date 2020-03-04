import { Classes } from '../types'
import { EClasses } from '../enums'

const defaultRootClassName = 'xeditor'

export const defaultClasses: Classes = {
  [EClasses.ROOT]: defaultRootClassName,
  [EClasses.TOOLBAR]: `${defaultRootClassName}__${[EClasses.TOOLBAR]}`,
  [EClasses.BUTTON]: `${defaultRootClassName}__${[EClasses.BUTTON]}`,
  [EClasses.SELECT]: `${defaultRootClassName}__${[EClasses.SELECT]}`,
  [EClasses.CONTENT]: `${defaultRootClassName}__${[EClasses.CONTENT]}`,
}
