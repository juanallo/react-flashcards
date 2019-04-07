import React, {Fragment} from 'react';
import styled from 'styled-components';
import Backdrop from "./Backdrop";

export const SideDrawerStyle = styled.div`
	  position: fixed;
	  width: 280px;
	  max-width: 70%;
	  height: 100%;
	  left: 0;
	  top: 0;
	  z-index: 200;
	  background-color: #ced6e0;
	  box-sizing: border-box;
	  transition: transform 0.3s ease-out;
	  
	  &.close {
	  	transform: translateX(-100%);
	  	
	  }
	  
	  &.open {
	  	transform: translateX(0);
	  }
`;

const SideDrawer = (props) => {
	return (
		<Fragment>
			<Backdrop show={props.show} onClick={props.onCloseDrawer}/>
			<SideDrawerStyle className={props.show ? 'open' : 'close'} >
				<nav>
					{props.children}
				</nav>
			</SideDrawerStyle>
		</Fragment>
	);
};

export default SideDrawer;