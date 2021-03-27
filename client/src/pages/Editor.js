import React, {useReducer} from 'react'
import CodeEditor from '../components/editor/CodeEditor';
import {reducer, initialState} from '../store/reducers/EditorReducer'

const Editor = ({currentUser, history}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="editor">
      <div>
        <h1>Text Editor</h1>
        <CodeEditor currentUser={currentUser} history={history} state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default Editor;