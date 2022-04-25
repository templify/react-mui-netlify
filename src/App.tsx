import { useContext } from 'react';
import { GlobalContext, Provider } from './contexts/GlobalContext';
import { createGlobalStyle } from 'styled-components'
import Router from './Router';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0 !important;
  }
`

function App() {

  return (
    <Provider>
      <>
        <GlobalStyle />
        <Router />
      </>
    </Provider>
  );
}

export default App;
