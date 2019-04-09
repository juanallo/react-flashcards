import config from "../config";

export default class GoogleSheetsApi {

	async setup() {
		return new Promise((resolve) => {
			window.gapi.load("client", this._initClient.bind(this, resolve));
		});
	}

	_initClient(resolve){
		window.gapi.client
			.init({
				apiKey: config.apiKey,
				discoveryDocs: config.discoveryDocs
			})
			.then(() => {
				resolve();
			});
	}

	async getCards(id) {
		return new Promise((resolve) => {
			window.gapi.client.load("sheets", "v4", () => {
				window.gapi.client.sheets.spreadsheets.values
					.get({
						spreadsheetId: config.spreadsheetId,
						range: id ? `'${id}'!${config.range}` : config.range
					})
					.then(
						response => {
							const cards = response.result.values.map((row) => {
								return  {
									"id": row[0],
									"question": row[1],
									"answer": row[2]
								}
							});

							const title = response.result.range.split('!')[0].replace(/'/g, '');

							resolve({ cards, title});
						},
						response => {
							resolve(false, response.result.error);
						}
					);
			});
		})
	}

	async getDecks() {
		return new Promise((resolve) => {
			window.gapi.client.load("sheets", "v4", () => {
				window.gapi.client.sheets.spreadsheets
					.get({
						spreadsheetId: config.spreadsheetId
					})
					.then(
						response => {
							const decks = response.result.sheets.map(s => ({
								id: s.properties.sheetId,
								label: s.properties.title
							}));
							resolve({ decks });
						},
						response => {
							resolve(false, response.result.error);
						}
					);
			});
		})
	}
}