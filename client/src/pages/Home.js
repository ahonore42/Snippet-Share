import React from 'react';
// import Modal from '../components/forms/Modal';
// import TextInput from '../components/forms/TextInput';
import { AUTHENTICATION } from '../store/types';
import ApiClient from '../globals';

import AuthForms from '../components/forms/AuthForms';

const Home = ({state, dispatch, history}) => {
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const mode = e.target.name
  //   try {
  //     if (mode==='register') {
  //       const res = await ApiClient.post('/auth/register', state[mode])
  //       if (res.status===200) dispatch({type: MODAL, payload: 'login'});
  //     } 
  //     else if (mode==='login') {
  //       const res = await ApiClient.post('/auth/login', state[mode])
  //       if (res.status===200) {
  //         localStorage.setItem('token', res.data.token)
  //         dispatch({type: AUTHENTICATION, payload: {auth: true, user: res.data.currentUser}})
  //         history.push('/dashboard')
  //       }
  //     }
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  const registerOrLogin = async (mode, formData) => {
    try {
      if (mode==='register') {
        const res = await ApiClient.post('/auth/register', formData)
        // if (res.status===200) dispatch({type: MODAL, payload: 'login'});
        return res.status
      } else if (mode==='login') {
        const res = await ApiClient.post('/auth/login', formData)
        if (res.status===200) {
          localStorage.setItem('token', res.data.token)
          dispatch({type: AUTHENTICATION, payload: {auth: true, user: res.data.currentUser}})
          // history.push('/dashboard')
          return res.status
        }
      }
    } catch (err) {
      
    }
  }

  // const clearInputs = () => dispatch({type: CLEAR_INPUT, payload: ''});
  // const toggleModal = (e) => {
  //   clearInputs();
  //   dispatch({type: MODAL, payload: e.target.value});
  // }
  // const handleLoginInput = (e) => dispatch({type: LOGIN_INPUT, payload: {key: e.target.name, value: e.target.value}});
  // const handleRegisterInput = (e) => dispatch({type: REGISTER_INPUT, payload: {key: e.target.name, value: e.target.value}});
  const share = '{Share}';

  // const loginModal = () => (
  //   <Modal>
  //     <button value={'closed'} onClick={toggleModal} className={'modal-close'}>x</button>
  //     <h2>Sign In</h2>
  //     <form name={'login'} onSubmit={handleSubmit}>
  //       <TextInput name={'email'} type={'email'} value={state.login.email} onChange={handleLoginInput} />
  //       <TextInput name={'password'} type={'password'} value={state.login.password} onChange={handleLoginInput} />
  //       <button
  //       type={'submit'}
  //       style={{margin: '1em auto', minWidth: '10em', padding: '0.5em', fontSize: '1.2rem', boxShadow: '0 0 0.1em #5EFFF0'}} 
  //       className={'btn-hero'}
  //       >
  //         Submit
  //       </button>
  //     </form>
  //     <p style={{margin: '2em auto 0 auto'}}>Don't have an account? <button value={'register'} onClick={toggleModal} className={'link-btn'}>Create A New Account.</button></p>
  //   </Modal>
  // )

  // const registerModal = () => (
  //   <Modal>
  //     <button value={'closed'} onClick={toggleModal} className={'modal-close'}>x</button>
  //     <h2>Create An Account</h2>
  //     <form name={'register'} onSubmit={handleSubmit}>
  //       <TextInput name={'username'} type={'text'} value={state.register.username} onChange={handleRegisterInput} />
  //       <TextInput name={'email'} type={'email'} value={state.register.email} onChange={handleRegisterInput} />
  //       <TextInput name={'password'} type={'password'} value={state.register.password} onChange={handleRegisterInput} />
  //       <button 
  //       type={'submit'}
  //       style={{margin: '1em auto', minWidth: '10em', padding: '0.5em', fontSize: '1.2rem', boxShadow: '0 0 0.1em #5EFFF0'}} 
  //       className={'btn-hero'}
  //       >
  //         Submit
  //       </button>
  //     </form>
  //     <p style={{margin: '2em auto 0 auto'}}>Already have an account? <button value={'login'} onClick={toggleModal} className={'link-btn'}>Sign In.</button></p>
  //   </Modal>
  // )

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
        {/* <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
          <button value={'register'} onClick={toggleModal} className="btn-hero">Get Started</button>
          <button value={'login'} onClick={toggleModal} className="btn-hero">Sign In</button>
          {(state.modal==='login' && loginModal()) || (state.modal==='register' && registerModal())}
        </div> */}
        <AuthForms registerOrLogin={registerOrLogin} history={history} />
     </div>
    </div>
  );
}

export default Home;