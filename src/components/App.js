import React, {Component} from 'react';
import DeckEffect from "./DeckEffect";
import Header from "./Header";
import styled from 'styled-components';
import ReactCardFlip from 'react-card-flip';
import Card from './Card';
import DeckApi from '../api/DeckApi';

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

const Loading = styled.h4`
	color: white;
`;

export default class App extends Component {

	constructor(props){
		super(props);

		this.state = {
			isFlipped: false,
			isLoading: true,
			cards:[],
			selectedCardIndex: 0
		};

		this.handleFlip = this.handleFlip.bind(this);
		this.handleNextCard = this.handleNextCard.bind(this);
		this.handlePreviousCard = this.handlePreviousCard.bind(this);
		this.handleRandomCard = this.handleRandomCard.bind(this);
	}

	componentDidMount(){
		DeckApi.getCards().then((cards) =>{
			this.setState({
				isLoading: false,
				cards: [...cards]
			})
		});
	}

	handleFlip(){
		this.setState({
			isFlipped: !this.state.isFlipped
		});
	}

	handleNextCard(){
		const index = this.state.selectedCardIndex + 1 >= this.state.cards.length ? 0 : this.state.selectedCardIndex + 1;
		this._unFlipAndChangeIndex(index);
	}

	handlePreviousCard(){
		const index = this.state.selectedCardIndex - 1 < 0 ? this.state.cards.length - 1 : this.state.selectedCardIndex - 1;
		this._unFlipAndChangeIndex(index);
	}

	handleRandomCard(){
		const max = this.state.cards.length - 1;
		const index = Math.floor(Math.random() * (max));
		this._unFlipAndChangeIndex(index);
	}

	_unFlipAndChangeIndex(index){
		this.setState({
			isFlipped: false,
			selectedCardIndex: index
		});
	};

	render(){
		return (
			<AppStyled>
				<Header onNext={this.handleNextCard}
				        onPrev={this.handlePreviousCard}
				        onRandom={this.handleRandomCard}
				/>
				<Container>
					{this.state.isLoading ? this.renderLoading() : this.renderCard()}
				</Container>
			</AppStyled>
		)
	}

	renderCard() {
		const card = this.state.cards[this.state.selectedCardIndex];
		return (
			<FixedDeckEffect>
				<ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
					<Card key="front" onFlip={this.handleFlip}>{card.question}</Card>
					<Card key="back" onFlip={this.handleFlip}>{card.answer}</Card>
				</ReactCardFlip>
			</FixedDeckEffect>
		)
	}

	renderLoading() {
		return (
			<Loading>Loading...</Loading>
		);
	}
};