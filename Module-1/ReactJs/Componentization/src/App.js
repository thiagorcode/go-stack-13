import React from 'react';

import Header from './components/Header'

function App() {
  return (
    <>
      <Header title="ReactJS" >
        <ul>
          <li>Homepage</li>
          <li>Projects</li>
        </ul>
      </Header>
      <Header title="Prop Title">
        <ul>
          <li>Homepage</li>
          <li>Projects</li>
          <li>Login</li>
        </ul>
      </Header>
    </>
  )
}

export default App;