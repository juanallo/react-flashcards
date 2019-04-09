import React, {Component} from 'react';
import DeckEffect from "./DeckEffect";
import Header from "./Header";
import styled, { keyframes, css } from 'styled-components';
import ReactCardFlip from 'react-card-flip';
import Card from './Card';
import DeckApi from '../api/DeckApi';

import * as animations from 'react-animations';
import SideDrawer from "./SideDrawer";
import Navigation from "./Navigation";

const BouncyDiv = styled.div`
  ${({animation}) => {
  	if(animation){
	    const anim = keyframes`${animations[animation]}`;
	    return css`animation: 1s ${anim};`
    }}};
  height: 100%;
`;

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

		this._api = props.api;

		this.state = {
			isFlipped: false,
			isLoading: true,
			showSideDrawer: false,
			animation: '',
			cards:[],
			selectedCardIndex: 0,
			title: '',
			decks: []
		};

		this.handleFlip = this.handleFlip.bind(this);
		this.handleNextCard = this.handleNextCard.bind(this);
		this.handlePreviousCard = this.handlePreviousCard.bind(this);
		this.handleRandomCard = this.handleRandomCard.bind(this);
		this.handleCloseSideDrawer = this.handleCloseSideDrawer.bind(this);
		this.handleOpenSideDrawer = this.handleOpenSideDrawer.bind(this);
		this.handleNavigationSelection = this.handleNavigationSelection.bind(this);
	}

	async componentDidMount(){
		await this._api.setup();

		this._api.getDecks().then(({decks: deckList}) => {
			const decks = deckList.map((d, i) => ({
				...d,
				selected: i === 0
			}));

			this.setState({
				decks: decks
			});
		});

		this._api.getCards().then(({cards, title}) => {
			this.setState({
				isLoading: false,
				cards: [...cards],
				title
			})
		});
	}

	handleFlip(){
		this.setState({
			isFlipped: !this.state.isFlipped
		});
	}

	handleNextCard(){
		const {selectedCardIndex, cards} = this.state;
		const index = selectedCardIndex + 1 >= cards.length ? 0 : selectedCardIndex + 1;
		this._unFlipAndChangeIndex(index, 'bounceOutRight');
	}

	handlePreviousCard(){
		const {selectedCardIndex, cards} = this.state;
		const index = selectedCardIndex - 1 < 0 ? cards.length - 1 : selectedCardIndex - 1;
		this._unFlipAndChangeIndex(index, 'bounceOutLeft');
	}

	handleRandomCard(){
		const max = this.state.cards.length - 1;
		const index = Math.floor(Math.random() * (max));
		this._unFlipAndChangeIndex(index, 'hinge');
	}

	handleCloseSideDrawer(){
		this.setState({
			showSideDrawer: false
		})
	}

	handleOpenSideDrawer(){
		this.setState({
			showSideDrawer: true
		})
	}

	handleNavigationSelection(e, {label}){
		e.preventDefault();
		e.target.blur();
		this.setState({
			isLoading: true,
			showSideDrawer: false
		},() => {
			this.changeDeck(label);
		});
	}

	changeDeck(label){
		this._api.getCards(label).then(({cards, title}) => {
			console.log(cards);
			const decks = this.state.decks.map(d => ({
				...d,
				selected: d.label === title
			}));

			this.setState({
				isLoading: false,
				cards: [...cards],
				decks,
				title
			})
		});
	}

	_unFlipAndChangeIndex(index, animation){
		this.setState({
			animation: animation,
			isFlipped: false
		}, () => {
			setTimeout(() => {
				this.setState({
					animation: '',
					selectedCardIndex: index
				});
			}, 1000);
		});
	};

	render(){
		return (
			<AppStyled>
				<SideDrawer show={this.state.showSideDrawer} onCloseDrawer={this.handleCloseSideDrawer}>
					<Navigation show={this.state.showSideDrawer}
					            onSelection={this.handleNavigationSelection}
					            items={this.state.decks}/>
				</SideDrawer>
				<Header disabled={this.state.isLoading}
						title={this.state.title}
						onNext={this.handleNextCard}
				        onPrev={this.handlePreviousCard}
				        onRandom={this.handleRandomCard}
				        onOpenSideDrawer={this.handleOpenSideDrawer}
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
				<BouncyDiv animation={this.state.animation}>
					<ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
						<Card key="front" onFlip={this.handleFlip} title="Question">{card.question}</Card>
						<Card key="back" onFlip={this.handleFlip} title="Answer">{card.answer}</Card>
					</ReactCardFlip>
				</BouncyDiv>
			</FixedDeckEffect>
		)
	}

	renderLoading() {
		return (
			<Loading>Loading...</Loading>
		);
	}
};

App.defaultProps = {
	api: DeckApi
};