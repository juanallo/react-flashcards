import config from "../config";

export default class GoogleSheetsApi {
	async getCards(){
		await this.setup();
		return this.load();
	}

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

	async load() {
		return new Promise((resolve) => {
			window.gapi.client.load("sheets", "v4", () => {
				console.log(window.gapi.client);
				window.gapi.client.sheets.spreadsheets.values
					.get({
						spreadsheetId: config.spreadsheetId,
						range: config.range
					})
					.then(
						response => {
							const data = response.result.values.map((row) => {
								return  {
									"id": row[0],
									"question": row[1],
									"answer": row[2]
								}
							});
							resolve(data);
						},
						response => {
							resolve(false, response.result.error);
						}
					);
			});
		})
	}
}