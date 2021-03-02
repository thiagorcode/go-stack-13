import React from 'react';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import ToastContainer from './components/ToastContainer';
import AppProvider from './hooks/index';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>

    <AppProvider>
      <SignIn />
    </AppProvider>

    <ToastContainer />
    <GlobalStyle />
  </>
);

export default App;
