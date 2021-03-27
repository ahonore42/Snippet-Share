import React, {useReducer} from "react";
import AceEditor from "react-ace";
import EditorOption from './EditorOption';
import TextInput from '../forms/TextInput';
import {_CreateCodeSnippet} from '../../utils/DatabaseQueries';
import {reducer, initialState} from '../../store/reducers/EditorReducer';
import { CLEAR_EDITOR, CODE_SNIPPETS, EDITOR_VALUE, TEXT_INPUT } from "../../store/types";
import {languages, themes, fontSizes} from '../../styles/editor';

import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

const CodeEditor = ({currentUser, history}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {editor} = state;
 
  const submitSnippet = async () => {
    const snippet = {
      title: state.snippetTitle,
      description: state.snippetDescription,
      code: editor.value,
      mode: editor.mode,
      userId: currentUser.id
    }
    try {
      const res = await _CreateCodeSnippet(snippet)
      if (res.status===200) {
        dispatch({type: CODE_SNIPPETS, payload: [...state.allSnippets, snippet]})
        dispatch({type: CLEAR_EDITOR, payload: ''})
        history.push('/dashboard')
      }
    }
    catch(err) {
      console.log(err)
    }
  }
  
  const onChange = (newValue) => dispatch({type: EDITOR_VALUE, payload: {key: 'value', value: newValue}});
  const handleText = (e) => dispatch({type: TEXT_INPUT, payload: {key: e.target.name, value: e.target.value}});
  const setTheme = (e) => dispatch({type: EDITOR_VALUE, payload: {key: 'theme', value: e.target.value}});
  const setMode = (e) => dispatch({type: EDITOR_VALUE, payload: {key: 'mode', value: e.target.value}});
  const setFontSize = (e) => dispatch({type: EDITOR_VALUE, payload: {key: 'fontSize', value: parseInt(e.target.value)}});
  
  const onValidate = (annotations) => {
    console.log("onValidate", annotations);
  }

  return (
    <div style={{margin: '0 auto', backgroundColor: 'black', display: 'inline-block', borderRadius: '0.5em', boxShadow: ' 0 0 1em teal'}}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
        <AceEditor
        placeholder={"Your Code Snippet Here"}
        mode={editor.mode}
        theme={editor.theme}
        name="snippetGenerator"
        onChange={onChange}
        onValidate={onValidate}
        wrapEnabled={true}
        width={'60vw'}
        value={editor.value}
        fontSize={editor.fontSize}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2
        }}
        />
        <div style={{padding: '1em',}}>
          <h2 style={{marginTop: '0'}}>Options</h2>
          <EditorOption title={'Mode'} name={'mode'} selections={languages} onChange={setMode} value={editor.mode} />
          <EditorOption title={'Theme'} name={'theme'} selections={themes} onChange={setTheme} value={editor.theme} />
          <EditorOption title={'Font Size'} name={'fontSize'} selections={fontSizes} onChange={setFontSize} value={editor.fontSize} />
          <TextInput name={'snippetTitle'} type="text" value={state.snippetTitle} onChange={handleText} />
          <TextInput name={'snippetDescription'} type="text-area" value={state.snippetDescription} onChange={handleText} />
          <button onClick={submitSnippet} className={'btn btn-editor'}>Submit Snippet</button>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;