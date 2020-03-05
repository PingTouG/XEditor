import { Action } from '../types'
import {
  queryCommandState,
  exec,
  queryElement,
  reverseColor,
  setColorPicker,
} from '../helpers/index'

const formatBlock = 'formatBlock'
const backColor = 'backColor'
const foreColor = 'foreColor'

export const defaultActions: {
  [prop: string]: Action
} = {
  bold: {
    key: 'bold',
    title: 'Bold',
    icon: '<b>B</b>',
    state: () => queryCommandState('bold'),
    exec: () => exec('bold'),
  },
  italic: {
    key: 'italic',
    title: 'Italic',
    icon: '<b><i>I</i><b>',
    state: () => queryCommandState('italic'),
    exec: () => exec('italic'),
  },
  underline: {
    key: 'underline',
    title: 'Underline',
    icon: '<b><u>U</u><b>',
    state: () => queryCommandState('underline'),
    exec: () => exec('underline'),
  },
  strikethrough: {
    key: 'strikethrough',
    title: 'Strike-through',
    icon: '<b><strike>S</strike><b>',
    state: () => queryCommandState('strikeThrough'),
    exec: () => exec('strikeThrough'),
  },
  backColor: {
    key: backColor,
    title: backColor,
    icon: `<b id="xeditor__${backColor}-label">BG</b><input id="xeditor__${backColor}"  type="color" hidden/>`,
    state: () => false,
    exec: () => {
      setColorPicker(backColor)
      return true
    },
  },
  fontColor: {
    key: foreColor,
    title: foreColor,
    icon: `<b id="xeditor__${foreColor}-label">FC</b><input id="xeditor__${foreColor}"  type="color" hidden/>`,
    state: () => false,
    exec: () => {
      setColorPicker(foreColor)
      return true
    },
  },
  heading: {
    key: 'heading',
    children: [
      {
        key: 'p',
        icon: '<b>P</b>',
        title: 'paragraph',
        exec: () => exec(formatBlock, '<p>'),
      },
      {
        key: 'h1',
        icon: '<h1>H<sub>1</sub></h1>',
        title: 'heading 1',
        exec: () => exec(formatBlock, '<h1>'),
      },
      {
        key: 'h2',
        icon: '<h2>H<sub>2</sub></h2>',
        title: 'heading 2',
        exec: () => exec(formatBlock, '<h2>'),
      },
      {
        key: 'h3',
        icon: '<h3>H<sub>3</sub></h3>',
        title: 'heading 3',
        exec: () => exec(formatBlock, '<h3>'),
      },
      {
        key: 'h4',
        icon: '<h4>H<sub>4</sub></h4>',
        title: 'heading 4',
        exec: () => exec(formatBlock, '<h4>'),
      },
      {
        key: 'h5',
        icon: '<h5>H<sub>5</sub></h5>',
        title: 'heading 5',
        exec: () => exec(formatBlock, '<h5>'),
      },
      {
        key: 'h6',
        icon: '<h6>H<sub>6</sub></h6>',
        title: 'heading 6',
        exec: () => exec(formatBlock, '<h6>'),
      },
    ],
  },
}
