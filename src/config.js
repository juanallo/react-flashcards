const config = {
	apiKey: process.env.REACT_APP_SHEET_API,
	discoveryDocs:
		["https://sheets.googleapis.com/$discovery/rest?version=v4"],
	spreadsheetId: process.env.REACT_APP_SPREADSHEET,
	range: process.env.REACT_APP_RANGE
};
export default config;