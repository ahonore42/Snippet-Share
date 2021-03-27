import React, {useReducer} from 'react';
import Modal from './Modal';
import TextInput from './TextInput';
import {formState, formReducer} from '../../store/reducers/AuthFormReducer';
import { FORM_ERROR, INPUT_STATE, MODAL } from '../../store/types';
import validateField from '../../utils/AuthFormValidation';

const AuthForms = ({history, registerOrLogin}) => {
  const [state, dispatch] = useReducer(formReducer, formState)

  const toggleModal = (e) => dispatch({type: MODAL, payload: e.target.value});
  const handleLoginInput = (e) => dispatch({type: INPUT_STATE, payload: {key: e.target.name, value: e.target.value}});
  const handleRegisterInput = (e) => dispatch({type: INPUT_STATE, payload: {key: e.target.name, value: e.target.value}});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mode = e.target.name;
    const emailErrors = validateField('email', state.email);
    const passwordErrors = validateField('password', state.password);

    if (emailErrors.length > 0 || passwordErrors.length > 0) {
      dispatch({type: FORM_ERROR, payload: [emailErrors, passwordErrors]})
    } 
    else {
      try {
        if (mode==='register') {
          const formPayload = {email: state.email, password: state.password, username: state.username}
          const status = await registerOrLogin(mode, formPayload);
          if (status===200) dispatch({type: MODAL, payload: 'login'});
        } 
        else if (mode==='login') {
          const formPayload = {email: state.email,password: state.password}
          const status = await registerOrLogin(mode, formPayload)
          if (status===200) {
            dispatch({type: MODAL, payload: 'closed'})
            history.push('/dashboard')
          }
        }
      } catch (err) {console.log(err)}
    }
  }

  const errors = state.errors.length ? (
    <div className={'error-wrapper'}>
      {state.errors.map((error, i) => {
        return <p key={`error${i}`} className={'form-error'}>{error}</p>
      })} 
    </div> 
  ) : null;

  const loginModal = () => (
    <Modal>
      <button value={'closed'} onClick={toggleModal} className={'modal-close'}>x</button>
      <h2>Sign In</h2>
      {errors}
      <form name={'login'} onSubmit={handleSubmit}>
        <TextInput name={'email'} type={'email'} value={state.email} onChange={handleLoginInput} />
        <TextInput name={'password'} type={'password'} value={state.password} onChange={handleLoginInput} />
        <button type={'submit'} className={'btn btn-modal'}>Submit</button>
      </form>
      <p style={{margin: '2em auto 0 auto'}}>
        Don't have an account? 
        <button value={'register'} onClick={toggleModal} className={'link-btn'}>Create A New Account.</button>
      </p>
    </Modal>
  );

  const registerModal = () => (
    <Modal>
      <button value={'closed'} onClick={toggleModal} className={'modal-close'}>x</button>
      <h2>Create An Account</h2>
      {errors}
      <form name={'register'} onSubmit={handleSubmit}>
        <TextInput name={'username'} type={'text'} value={state.username} onChange={handleRegisterInput} />
        <TextInput name={'email'} type={'email'} value={state.email} onChange={handleRegisterInput} />
        <TextInput name={'password'} type={'password'} value={state.password} onChange={handleRegisterInput} />
        <button type={'submit'} className={'btn btn-modal'}>Submit</button>
      </form>
      <p style={{margin: '2em auto 0 auto'}}>
        Already have an account? 
        <button value={'login'} onClick={toggleModal} className={'link-btn'}>Sign In.</button>
      </p>
    </Modal>
  );

  return (
    <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
      <button value={'register'} onClick={toggleModal} className={'btn btn-modal'}>Get Started</button>
      <button value={'login'} onClick={toggleModal} className={'btn btn-modal'}>Sign In</button>
      {(state.modal==='login' && loginModal()) || (state.modal==='register' && registerModal())}
    </div>
  );
}

export default AuthForms;