import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
	  width: 100%;
	  height: 100%;
	  z-index: 100;
	  position: fixed;
	  top: 0;
	  left: 0;
	  background: rgba(0, 0, 0, 0.5);
`;


const Backdrop = (props) => {

	return (
		props.show ? <Div onClick={props.onClick}></Div> : null
	);
};

export default Backdrop;