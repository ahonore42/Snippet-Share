import React from 'react';
import { AUTHENTICATION } from '../store/types';
import { _LoginUser, _RegisterUser } from '../utils/DatabaseQueries';
import AuthForms from '../components/forms/AuthForms';

const Home = ({state, dispatch, history}) => {
  const registerOrLogin = async (mode, formData) => {
    try {
      if (mode==='register') {
        const res = await _RegisterUser(formData)
        return res.status
      } else if (mode==='login') {
        const res = await _LoginUser(formData)
        if (res.status===200) {
          localStorage.setItem('token', res.data.token)
          dispatch({type: AUTHENTICATION, payload: {auth: true, user: res.data.currentUser}})
          return res.status
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const share = '{Share}';

  return (
    <div className={'home'}>
      <h1 style={{textShadow: '0 0 2em rgba(0,0,0,0.9)'}}>Snippet<span style={{color: '#5EFFF0'}}>{share}</span></h1>
      <div className={'hero'}>
        <h2 style={{lineHeight: '1.1em', fontWeight: 'bold'}}>
          Create and save your own code snippets in <span style={{color: 'hotpink'}}>any popular language</span> with our customizable, browser-based IDE. 
        </h2>
        <div className={'hero-code'}>
          <code>Get inspiration <span style={{color: 'hotpink'}}>from</span> popular snippets <span style={{color: 'cyan'}}>and</span> discuss your code <span style={{color: 'goldenrod'}}>style</span> <span style={{color: 'hotpink'}}>with</span> other developers. </code>
        </div>
        <AuthForms registerOrLogin={registerOrLogin} history={history} />
     </div>
    </div>
  );
}

export default Home;