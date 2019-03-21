import React, {Component} from 'react';
import DeckEffect from "./DeckEffect";
import Header from "./Header";
import styled from 'styled-components';
import ReactCardFlip from 'react-card-flip';

const AppStyled = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
`;

const Container =  styled.div`  
    display: flex;
	padding: 30px;
	flex-grow: 1;
	justify-content: center;
	align-items: center;
`;

const FixedDeckEffect = styled(DeckEffect)`
	max-width: 600px;
	max-height: 400px;
	
	.react-card-flip,
	.react-card-flipper,
	.react-card-front,
	.react-card-back{
		height: 100%;
	}
`;

const CurrentCard = styled.div`
    height: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #dedede;
`;

export default class App extends Component {

	constructor(props){
		super(props);

		this.state = {
			isFlipped: false
		};

		this.handleFlip = this.handleFlip.bind(this);
	}

	handleFlip(){
		this.setState({
			isFlipped: !this.state.isFlipped
		});
	}

	render(){
		return (
			<AppStyled>
				<Header />
				<Container>
					<FixedDeckEffect>
						<ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
							<CurrentCard key="front">Test <button onClick={this.handleFlip}>Flip it!</button></CurrentCard>
							<CurrentCard key="back">Test 1 <button onClick={this.handleFlip}>Flip it!</button></CurrentCard>
						</ReactCardFlip>
					</FixedDeckEffect>
				</Container>
			</AppStyled>
		)
	}
};