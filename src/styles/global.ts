import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;

}

html {
  height: 100%;
}

body {
  background: #EEEEEE;
  -webkit-font-smoothing: antialiased;

}

body,#root {
  height: 100%;
}

body, input, button {
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 500;
}

button {
  cursor: pointer;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}

`;
