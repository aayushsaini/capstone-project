import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import {
  ChakraProvider
} from "@chakra-ui/react";
import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode('#fafffd', '#fafffd')(props),
        color: mode('black', 'white')(props),
      },
    }),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);