
import React from 'react';

// Suspense
import { Fragment ,  Suspense , lazy } from 'react' ;

// Theme
import { ThemeProvider , CssBaseline } from '@mui/material';
import theme from './utils/theme' ;

// Global Style
// import GlobalStyles from "./utils/globalstyles";

// Language 
import { LanguageProvider } from "./utils/Language";

// Pace
// import Pace from "./utils/Pace";

// Store
import { Provider } from 'react-redux' ;
import store from './redux';

// Router
import { BrowserRouter , Routes , Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css" ;
import "bootstrap/dist/js/bootstrap.min.js" ;

const MainComponent = lazy(() => import('./components/Main')) ;


const App = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <GlobalStyles /> */}
            {/* <Pace color={theme.palette.primary.light} /> */}
            <Suspense fallback={<Fragment />} >
              <Routes>
                  <Route path="*" element={<MainComponent />} />
              </Routes>
            </Suspense>
          </ThemeProvider>
        </Provider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
