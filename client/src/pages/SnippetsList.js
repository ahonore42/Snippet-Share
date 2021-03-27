import React, {useReducer} from 'react';
import Snippets from '../components/snippets/Snippets';
import {reducer, initialState} from '../store/reducers/EditorReducer';
// import SnippetOptions from '../components/snippets/SnippetOptions';
// import { SNIPPET_THEME } from '../store/types';


const SnippetsList = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // const handleTheme = (e) => {
  //   console.log(e.target.value)
  //   dispatch({type: SNIPPET_THEME, payload: e.target.value})
  // }
  // console.log(state.snippetTheme)
  return (
    <div>
      <div>
        <h1>Snippets</h1>
        {/* <SnippetOptions title={'Snippet Theme'} name={'snippetTheme'} selections={state.snippetThemes} onChange={handleTheme} value={state.snippetTheme} /> */}
      </div>
      <Snippets dispatch={dispatch} theme={state.snippetTheme.value} snippets={state.allSnippets} />
    </div>
  );
}

export default SnippetsList;