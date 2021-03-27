import {EDITOR_VALUE, TEXT_INPUT, CODE_SNIPPETS, CLEAR_EDITOR, SNIPPET_THEME} from '../types';
import {a11yDark,atelierDuneDark, nightOwl, atomOneDark, darcula, dracula, gruvboxDark, irBlack, monokai, obsidian, solarizedDark, qtcreatorDark, tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
const options = [{name: "a11yDark", value: a11yDark },{name: "atelierDuneDark", value: atelierDuneDark} ,{name: "atomOneDark", value: atomOneDark } ,{name: "darcula", value: darcula} ,{name: "dracula", value: dracula} ,{name: "gruvboxDark", value: gruvboxDark} ,{name: "irBlack", value: irBlack} ,{name: "monokai", value: monokai} ,{name: "nightOwl", value: nightOwl} ,{name: "obsidian", value: obsidian} ,{name: "qtcreatorDark", value: qtcreatorDark} ,{name: "solarizedDark", value: solarizedDark} ,{name: "tomorrowNight", value: tomorrowNight} ]

export const initialState = {
  editor: {
    value: '',
    theme: "monokai",
    mode: "javascript",
    fontSize: 16,
  },
  snippetTitle: '',
  snippetDescription: '',
  allSnippets: [],
  snippetThemes: options,
  snippetTheme: options[7]
}

export const reducer = (state, action) => {
  switch (action.type) {
    case EDITOR_VALUE:
      return { ...state, editor: {...state.editor, [action.payload.key]: action.payload.value} }
    case TEXT_INPUT:
      return {...state, [action.payload.key]: action.payload.value}
    case CODE_SNIPPETS:
      return {...state, allSnippets: action.payload}
    case CLEAR_EDITOR:
      return {...state,  editor: {...state.editor, value: action.payload}, snippetTitle: action.payload, snippetDescription: action.payload}
    case SNIPPET_THEME:
      return {...state, snippetTheme: action.payload}
    default:
      return state
  }
}