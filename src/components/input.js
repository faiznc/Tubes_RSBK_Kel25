import styled, { css } from 'styled-components';

export default styled.input`
font-family:  'roboto';
font-size: 1.3em;
font-weight: bold;
border:2px solid;
border-color:#db6400;
background:#f8f1f1; 
align-content: center;
align-text : center;

${(props) =>
                props.background &&
                css` 
background:${(props) => props.background};
`} 
color:#000000;
`;