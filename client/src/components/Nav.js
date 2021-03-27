import React from 'react';

const Nav = ({logout, history}) => {
  const share = '{Share}'
  return (
    <nav className={'site-nav'}>
      <h2>Snippet<span style={{color: '#5EFFF0'}}>{share}</span></h2>
      <div className={'nav-routes'}>
        <button onClick={() => history.push("/dashboard")}>Dashboard</button>
        <button onClick={() => history.push("/editor")}>Editor</button>
        <button onClick={() => history.push("/snippets")}>Snippets</button>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Nav;