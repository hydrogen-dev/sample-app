const container = document.getElementById('container');
const script = document.getElementById('script');

window.addEventListener('flutterInAppWebViewPlatformReady', function (event) {
	window.flutter_inappwebview.callHandler('webViewData').then(function (data) {
		webWidget(data.publicKey, data.cardName, data.appToken, data.cardId, data.clientId);

		script.src = `http://cards.${data.env}.hydrogenplatform.com/bundle-web-components.js`;
	});
});

const webWidget = (publicKey, cardName, appToken, cardId, clientId) => {
	const elem = document.createElement('div');
	container.innerHTML = '';
	elem.innerHTML = `
    			<${cardName}
				public-key=${publicKey}
				app-token=${appToken}
				card-id='${cardId}'
				client-id=${clientId}
				app-scheme='webview'
			></${cardName}>
    `;
	container.appendChild(elem);
};
