import { Action } from '../types'
import { queryCommandState, exec, setColorPicker } from '../helpers/index'

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
    exec: () => setColorPicker(backColor),
  },
  fontColor: {
    key: foreColor,
    title: foreColor,
    icon: `<b id="xeditor__${foreColor}-label">FC</b><input id="xeditor__${foreColor}"  type="color" hidden/>`,
    state: () => false,
    exec: () => setColorPicker(foreColor),
  },
  superscript: {
    key: 'superscript',
    title: 'superscript',
    icon: '<b>X<sup>z</sup><b>',
    state: () => queryCommandState('superscript'),
    exec: () => exec('superscript'),
  },
  subscript: {
    key: 'subscript',
    title: 'subscript',
    icon: '<b>X<sub>z</sub><b>',
    state: () => queryCommandState('subscript'),
    exec: () => exec('subscript'),
  },
  insertUnorderedList: {
    key: 'insertUnorderedList',
    title: 'insertUnorderedList',
    icon: '<b>LI</b>',
    state: () => queryCommandState('insertUnorderedList'),
    exec: () => exec('insertUnorderedList'),
  },
  insertOrderedList: {
    key: 'insertOrderedList',
    title: 'insertOrderedList',
    icon: '<b>OL</b>',
    state: () => queryCommandState('insertOrderedList'),
    exec: () => exec('insertOrderedList'),
  },
  insertImage: {
    key: 'insertImage',
    title: 'insertImage',
    icon: '&#128247;',
    exec: () => {
      const url = window.prompt('Enter the image URL')
      if (url) exec('insertImage', url)
    },
  },
  code: {
    key: 'code',
    title: 'code',
    icon: '&lt;/&gt;',
    exec: () => exec(formatBlock, '<pre>'),
  },
  heading: {
    key: 'heading',
    children: [
      {
        key: 'p',
        icon: '<b>P</b>',
        title: 'paragraph',
        exec: () => exec(formatBlock, '<div>'),
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
