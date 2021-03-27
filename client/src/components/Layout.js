import React from 'react';
import Nav from './Nav'

const Layout = ({children, logout, history}) => {
  return (
    <div>
      <Nav logout={logout} history={history}/>
      <div>
        {children}
      </div>
    </div>
  );
}

export default Layout;