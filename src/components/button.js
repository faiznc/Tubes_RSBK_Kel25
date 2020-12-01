import styled, { css } from 'styled-components';

export default styled.button`
font-family:  'roboto';
font-size: 1.3em;
font-weight: bold;
border:4px solid;
border-color:#db6400;
border-radius:5px;
padding: 0.25em 1em;
background:#16697a; 
align-content: center;

${(props) =>
                props.background &&
                css` 
background:${(props) => props.background};
`} 
color:#f8f1f1;
`;