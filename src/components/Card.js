import React from 'react';
import styled from 'styled-components';

const CurrentCard = styled.div`
    height: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #dedede;
    position: relative;
`;

const Footer = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 40px;
	display: flex;
	justify-content: flex-end;
	flex-direction: column;
`;

const Button = styled.button`
	height: 40px;
    border: none;
    font-size: 14px;
`;

export default ({children, onFlip}) => (
	<CurrentCard>
		{children}
		<Footer>
			<Button onClick={onFlip}>Flip it!</Button>
		</Footer>
	</CurrentCard>
);