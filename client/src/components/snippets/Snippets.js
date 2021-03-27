import React, { useEffect } from 'react';
import ApiClient from '../../globals'
import { CODE_SNIPPETS } from '../../store/types';

import SyntaxHighlighter from 'react-syntax-highlighter';


const Snippets = ({snippets, dispatch, theme}) => {
  
  const getSnippets = async () => {
    try {
      const res = await ApiClient.get('/snippets')
      if (!snippets.length) {
        dispatch({type: CODE_SNIPPETS, payload: res.data});
      }
      else if (snippets.length > 0 && snippets.length !== res.data.length) {
        dispatch({type: CODE_SNIPPETS, payload: res.data});
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getSnippets()
    // eslint-disable-next-line
  },[snippets])

  const codeSnippets = snippets.length ? snippets.map(snippet => {
    return  <div key={snippet.title} style={{width: '40em', margin: '1em auto', textAlign: 'left'}}>
              <div><h3 style={{margin: '0', fontSize: '1.6em', backgroundColor: 'rgb(15, 23, 23)', display: 'inline-block', padding: "0.5em 0.5em 0 0.5em", borderRadius: '0.25em 0.25em 0 0'}}>{snippet.title}</h3></div>
              <div style={{backgroundColor: 'rgb(15, 23, 23)', padding: '0.1em 1em 1em 1em', borderRadius: '0 0.25em 0.25em 0.25em', textAlign: 'left'}}>
                
                {/* <pre style={{textAlign: 'left', margin: '0 auto', backgroundColor: 'rgb(20,20,20)', borderRadius: '0.25em', padding: '0.5em'}}>
                  <code>{snippet.code}</code>
                </pre> */}
                <SyntaxHighlighter 
                  customStyle={{textAlign: 'left',borderRadius: '0.25em', padding: '0.5em'}} 
                  wrapLines={true}
                  language={snippet.mode} 
                  style={theme}
                >
                  {snippet.code}
                </SyntaxHighlighter>
                <p style={{fontSize: '1.2em'}}>{snippet.description}</p>
              </div>
            </div>
  }) : null;

  return (
    <div>
       {codeSnippets}
    </div>
  );
}

export default Snippets;