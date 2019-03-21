import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
	background: white; 
	width: 100%;
	display: flex;
	justify-content: space-between;
	height: 60px;
`;

const DeckTitle = styled.h1`
	flex-grow: 1;
	padding: 0 20px;
	line-height: 60px;
	margin: 0;
	box-sizing: border-box;
	align-items: middle;
`;

const DeckActions = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
	padding: 0 20px;
	justify-content: space-around;
`;

const Deckbutton = styled.button`
	margin-left: 10px;
`;

export default () => (
	<Header>
		<DeckTitle style={{flexGrow: 1}}>Current Deck</DeckTitle>
		<DeckActions>
			<Deckbutton>Previous</Deckbutton>
			<Deckbutton>Next</Deckbutton>
			<Deckbutton>Random</Deckbutton>
		</DeckActions>
	</Header>
)
