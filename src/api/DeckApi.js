import {cards} from './deck.json';

export default class DeckApi {


	static getCards(){
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(cards)
			}, 1000);
		});
	}
}