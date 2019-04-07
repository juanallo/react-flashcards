import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
	background: #5352ed; 
	width: 100%;
	display: flex;
	justify-content: space-between;
	height: 60px;
`;

const DeckTitle = styled.h2`
	flex-grow: 1;
	padding: 0 20px;
	line-height: 60px;
	margin: 0;
	box-sizing: border-box;
	align-items: center;
	font-size: 1.6rem;
	font-weight: 300;
	color: white;
`;

const DeckActions = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
	justify-content: space-around;
	width: 306px;
`;

const Deckbutton = styled.button`
	border: 0;
    background: rgba(0, 0, 0, 0.2);
    height: 100%;
    min-width: 100px;
    color: #fff;
    font-size: 16px;
    box-sizing: border-box;
    
    :hover {
    	background: rgba(0, 0, 0, 0.4);
    }
    :active {
    	background: rgba(0, 0, 0, 0.6);
    }
    :focus {
    	border: 2px solid rgba(0, 0, 0, 0.6);
    	outline: none;
    }
    :disabled {
    	opacity: 0.4;
    }
    
    :disabled:hover {
    	background: rgba(0, 0, 0, 0.2);
    	opacity: 0.4;
    }
`;

export default (props) => (
	<Header>
		<Deckbutton onClick={props.onOpenSideDrawer} disabled={props.disabled}>Menu</Deckbutton>
		<DeckTitle style={{flexGrow: 1}}>{props.title}</DeckTitle>
		<DeckActions>
			<Deckbutton disabled={props.disabled} onClick={props.onPrev}>Previous</Deckbutton>
			<Deckbutton disabled={props.disabled} onClick={props.onNext}>Next</Deckbutton>
			<Deckbutton disabled={props.disabled} onClick={props.onRandom}>Random</Deckbutton>
		</DeckActions>
	</Header>
)
