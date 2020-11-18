const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const { WATSON_VERSION, WATSON_APIKEY, WATSON_URL } = process.env;

const toneAnalyzer = initToneAnalyzer();

async function analyse(data) {
	const toneParams = {
		toneInput: { text: data },
		version: '2017-09-21',
		sentences: false,
		contentType: 'application/json',
	};

	try {
		return await toneAnalyzer.tone(toneParams);
	} catch (error) {
		console.log(error);
		return error;
	}
}

exports.watsonServices = {
	analyse,
};

// Private Function

function initToneAnalyzer() {
	return new ToneAnalyzerV3({
		version: WATSON_VERSION,
		authenticator: new IamAuthenticator({
			apikey: WATSON_APIKEY,
		}),
		serviceUrl: WATSON_URL,
		headers: {
			'X-Watson-Learning-Opt-Out': 'true',
			'Accept-Language': 'fr-FR',
			'Content-Language': 'fr-FR',
		},
	});
}
