import React from 'react';
import { _DeleteAccount } from '../utils/DatabaseQueries';
import { AUTHENTICATION } from '../store/types';

const Dashboard = ({currentUser, dispatch, history}) => {
  
  console.log(currentUser)
  const deleteAccount = async () => {
    try {
      const status = await _DeleteAccount()
      if (status === 204) {
        localStorage.clear()
        dispatch({type: AUTHENTICATION, payload: {auth: false, user: null}})
        history.push('/')
      }
    } catch(err){
      console.log(err)
    }
  }


  return (
    <div>
      <button onClick={deleteAccount}>Delete Account?</button>
    </div>
  );
}

export default Dashboard;