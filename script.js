// const pointCount = 5;
// const circleRadius = 160;
// const startAnimDelta = 5;
// const circumference = Math.PI * circleRadius * 2;

// var selectedItemIndex = -1;

// var circlePath = document.getElementById('mask-circle');

// /**
//  * @description On Mouse Leave event handler for points
//  */
// const onMouseLeave = () => {
// 	let index = (selectedItemIndex !== -1) ? selectedItemIndex : 0;
// 	calculateOffset(index);
// };

// /**
//  * @description On Click event handler for points
//  * @param {Number} index - Index of list item
//  */
// const onClick = (index) => {
// 	//If already selected, deselect
// 	selectedItemIndex = (selectedItemIndex === index) ? -1 : index;
// 	calculateOffset(index);

// 	//Find active item, deselect
// 	let activeListItem = document.querySelectorAll('.navigation-circle-list-item.active');
// 	if (activeListItem.length > 0) activeListItem[0].classList.remove('active');

// 	//Find new item by index, select
// 	let listItem = document.querySelectorAll('.navigation-circle-list-item:nth-of-type(' + selectedItemIndex + ')');
// 	if (listItem.length > 0) listItem[0].classList.add('active');
// };

// /**
//  * @description - Calculate offset for circle path by index of list item
//  * @param {Number} index - Index of list item
//  */
// const calculateOffset = (index = 0) => {
// 	let offset = 0;

// 	if (index !== 0) offset = (circumference / pointCount) * (pointCount - index);

// 	circlePath.style.strokeDashoffset = `${offset}px`;
// };

// // INTRO

// let buffer = 500;
// let delay = 1000 * (1 + (pointCount / startAnimDelta) - (1 / startAnimDelta)) + buffer;

// setTimeout(() => onClick(1), delay);



// FAQs section 
const items = document.querySelectorAll('.accordion button');

function toggleAccordion() {
	const itemToggle = this.getAttribute('aria-expanded');

	for (i = 0; i < items.length; i++) {
		items[i].setAttribute('aria-expanded', 'false');
	}

	if (itemToggle == 'false') {
		this.setAttribute('aria-expanded', 'true');
	}
}

items.forEach((item) => item.addEventListener('click', toggleAccordion));
// FAQs section end 


// // GPAY Integration
// const supportedInstruments = [
// 	{
// 		supportedMethods: ['https://tez.google.com/pay'],
// 		data: {
// 			pa: 'merchant-vpa@xxx',
// 			pn: 'Merchant Name',
// 			tr: '1234ABCD',  // your custom transaction reference ID
// 			url: 'http://url/of/the/order/in/your/website',
// 			mc: '1234', // your merchant category code
// 			tn: 'Purchase in Merchant',
// 			gstBrkUp: 'GST:16.90|CGST:08.45|SGST:08.45', // GST value break up
// 			invoiceNo: 'BillRef123', // your invoice number
// 			invoiceDate: '2019-06-11T13:21:50+05:30', // your invoice date and time
// 			gstIn: '29ABCDE1234F2Z5', // your GSTIN
// 		},
// 	}
// ];

// const details = {
// 	total: {
// 		label: 'Total',
// 		amount: {
// 			currency: 'INR',
// 			value: '1000.01', // sample amount
// 		},
// 	},
// 	displayItems: [{
// 		label: 'Original Amount',
// 		amount: {
// 			currency: 'INR',
// 			value: '1000.01',
// 		},
// 	}],
// };

// let request = null;
// try {
// 	request = new PaymentRequest(supportedInstruments, details);
// } catch (e) {
// 	console.log('Payment Request Error: ' + e.message);
// 	return;
// }
// if (!request) {
// 	console.log('Web payments are not supported in this browser.');
// 	return;
// }

// // Global key for canMakepayment cache.
// const canMakePaymentCache = 'canMakePaymentCache';

// /**
//  * Check whether can make payment with Google Pay or not. It will check session storage
//  * cache first and use the cache directly if it exists. Otherwise, it will call
//  * canMakePayment method from PaymentRequest object and return the result, the
//  * result will also be stored in the session storage cache for future usage.
//  *
//  * @private
//  * @param {PaymentRequest} request The payment request object.
//  * @return {Promise} a promise containing the result of whether can make payment.
//  */
// function checkCanMakePayment(request) {
// 	// Check canMakePayment cache, use cache result directly if it exists.
// 	if (sessionStorage.hasOwnProperty(canMakePaymentCache)) {
// 		return Promise.resolve(JSON.parse(sessionStorage[canMakePaymentCache]));
// 	}

// 	// If canMakePayment() isn't available, default to assume the method is
// 	// supported.
// 	var canMakePaymentPromise = Promise.resolve(true);

// 	// Feature detect canMakePayment().
// 	if (request.canMakePayment) {
// 		canMakePaymentPromise = request.canMakePayment();
// 	}

// 	return canMakePaymentPromise
// 		.then((result) => {
// 			// Store the result in cache for future usage.
// 			sessionStorage[canMakePaymentCache] = result;
// 			return result;
// 		})
// 		.catch((err) => {
// 			console.log('Error calling canMakePayment: ' + err);
// 		});
// }

// /** Launches payment request flow when user taps on buy button. */
// function onBuyClicked() {
// 	if (!window.PaymentRequest) {
// 		console.log('Web payments are not supported in this browser.');
// 		return;
// 	}

// 	// Create supported payment method.
// 	const supportedInstruments = [
// 		{
// 			supportedMethods: ['https://tez.google.com/pay'],
// 			data: {
// 				pa: 'merchant-vpa@xxx',
// 				pn: 'Merchant Name',
// 				tr: '1234ABCD',  // Your custom transaction reference ID
// 				url: 'https://url/of/the/order/in/your/website',
// 				mc: '1234', //Your merchant category code
// 				tn: 'Purchase in Merchant',
// 			},
// 		}
// 	];

// 	// Create order detail data.
// 	const details = {
// 		total: {
// 			label: 'Total',
// 			amount: {
// 				currency: 'INR',
// 				value: '1000.01', // sample amount
// 			},
// 		},
// 		displayItems: [{
// 			label: 'Original Amount',
// 			amount: {
// 				currency: 'INR',
// 				value: '1000.01',
// 			},
// 		}],
// 	};

// 	// Create payment request object.
// 	let request = null;
// 	try {
// 		request = new PaymentRequest(supportedInstruments, details);
// 	} catch (e) {
// 		console.log('Payment Request Error: ' + e.message);
// 		return;
// 	}
// 	if (!request) {
// 		console.log('Web payments are not supported in this browser.');
// 		return;
// 	}

// 	var canMakePaymentPromise = checkCanMakePayment(request);
// 	canMakePaymentPromise
// 		.then((result) => {
// 			showPaymentUI(request, result);
// 		})
// 		.catch((err) => {
// 			console.log('Error calling checkCanMakePayment: ' + err);
// 		});
// }


// /**
// * Show the payment request UI.
// *
// * @private
// * @param {PaymentRequest} request The payment request object.
// * @param {Promise} canMakePayment The promise for whether can make payment.
// */
// function showPaymentUI(request, canMakePayment) {
// 	if (!canMakePayment) {
// 		handleNotReadyToPay();
// 		return;
// 	}

// 	// Set payment timeout.
// 	let paymentTimeout = window.setTimeout(function () {
// 		window.clearTimeout(paymentTimeout);
// 		request.abort()
// 			.then(function () {
// 				console.log('Payment timed out after 20 minutes.');
// 			})
// 			.catch(function () {
// 				console.log('Unable to abort, user is in the process of paying.');
// 			});
// 	}, 20 * 60 * 1000); /* 20 minutes */

// 	request.show()
// 		.then(function (instrument) {

// 			window.clearTimeout(paymentTimeout);
// 			processResponse(instrument); // Handle response from browser.
// 		})
// 		.catch(function (err) {
// 			console.log(err);
// 		});
// }


// /**
// * Process the response from browser.
// *
// * @private
// * @param {PaymentResponse} instrument The payment instrument that was authed.
// */
// function processResponse(instrument) {
// 	var instrumentString = instrumentToJsonString(instrument);
// 	console.log(instrumentString);

// 	fetch('/buy', {
// 		method: 'POST',
// 		headers: new Headers({ 'Content-Type': 'application/json' }),
// 		body: instrumentString,
// 	})
// 		.then(function (buyResult) {
// 			if (buyResult.ok) {
// 				return buyResult.json();
// 			}
// 			console.log('Error sending instrument to server.');
// 		})
// 		.then(function (buyResultJson) {
// 			completePayment(instrument, buyResultJson.status, buyResultJson.message);

// 		})
// 		.catch(function (err) {
// 			console.log('Unable to process payment. ' + err);
// 		});
// }

// /**
// * Notify browser that the instrument authorization has completed.
// *
// * @private
// * @param {PaymentResponse} instrument The payment instrument that was authed.
// * @param {string} result Whether the auth was successful. Should be either
// * 'success' or 'fail'.
// * @param {string} msg The message to log in console.
// */
// function completePayment(instrument, result, msg) {
// 	instrument.complete(result)
// 		.then(function () {
// 			console.log('Payment succeeds.');
// 			console.log(msg);
// 		})
// 		.catch(function (err) {
// 			console.log(err);
// 		});
// }


// /** Handle Google Pay not ready to pay case. */
// function handleNotReadyToPay() {
// 	alert('Google Pay is not ready to pay.');
// }


// /* Converts the payment response into a JSON string.
//  *
//  * @private
//  * @param {PaymentResponse} paymentResponse The payment response to convert.
//  * @return {string} The string representation of the payment response.
//  */
// function paymentResponseToJsonString(paymentResponse) {
// 	// PaymentResponse is an interface, JSON.stringify works only on dictionaries.
// 	var paymentResponseDictionary = {
// 		methodName: paymentResponse.methodName,
// 		details: paymentResponse.details,
// 		shippingAddress: addressToJsonString(paymentResponse.shippingAddress),
// 		shippingOption: paymentResponse.shippingOption,
// 		payerName: paymentResponse.payerName,
// 		payerPhone: paymentResponse.payerPhone,
// 		payerEmail: paymentResponse.payerEmail,
// 	};
// 	return JSON.stringify(paymentResponseDictionary, undefined, 2);
// }

// // GOOGLE PAY
// /**
//  * Define the version of the Google Pay API referenced when creating your
//  * configuration
//  *
//  * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|apiVersion in PaymentDataRequest}
//  */
// const baseRequest = {
// 	apiVersion: 2,
// 	apiVersionMinor: 0
// };

// /**
//  * Card networks supported by your site and your gateway
//  *
//  * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
//  * @todo confirm card networks supported by your site and gateway
//  */
// const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];

// /**
//  * Card authentication methods supported by your site and your gateway
//  *
//  * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
//  * @todo confirm your processor supports Android device tokens for your
//  * supported card networks
//  */
// const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

// /**
//  * Identify your gateway and your site's gateway merchant identifier
//  *
//  * The Google Pay API response will return an encrypted payment method capable
//  * of being charged by a supported gateway after payer authorization
//  *
//  * @todo check with your gateway on the parameters to pass
//  * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway|PaymentMethodTokenizationSpecification}
//  */
// const tokenizationSpecification = {
// 	type: 'PAYMENT_GATEWAY',
// 	parameters: {
// 		'gateway': 'example',
// 		'gatewayMerchantId': 'exampleGatewayMerchantId'
// 	}
// };

// /**
//  * Describe your site's support for the CARD payment method and its required
//  * fields
//  *
//  * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
//  */
// const baseCardPaymentMethod = {
// 	type: 'CARD',
// 	parameters: {
// 		allowedAuthMethods: allowedCardAuthMethods,
// 		allowedCardNetworks: allowedCardNetworks
// 	}
// };

// /**
//  * Describe your site's support for the CARD payment method including optional
//  * fields
//  *
//  * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
//  */
// const cardPaymentMethod = Object.assign(
// 	{},
// 	baseCardPaymentMethod,
// 	{
// 		tokenizationSpecification: tokenizationSpecification
// 	}
// );

// /**
//  * An initialized google.payments.api.PaymentsClient object or null if not yet set
//  *
//  * @see {@link getGooglePaymentsClient}
//  */
// let paymentsClient = null;

// /**
//  * Configure your site's support for payment methods supported by the Google Pay
//  * API.
//  *
//  * Each member of allowedPaymentMethods should contain only the required fields,
//  * allowing reuse of this base request when determining a viewer's ability
//  * to pay and later requesting a supported payment method
//  *
//  * @returns {object} Google Pay API version, payment methods supported by the site
//  */
// function getGoogleIsReadyToPayRequest() {
// 	return Object.assign(
// 		{},
// 		baseRequest,
// 		{
// 			allowedPaymentMethods: [baseCardPaymentMethod]
// 		}
// 	);
// }

// /**
//  * Configure support for the Google Pay API
//  *
//  * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|PaymentDataRequest}
//  * @returns {object} PaymentDataRequest fields
//  */
// function getGooglePaymentDataRequest() {
// 	const paymentDataRequest = Object.assign({}, baseRequest);
// 	paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
// 	paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
// 	paymentDataRequest.merchantInfo = {
// 		// @todo a merchant ID is available for a production environment after approval by Google
// 		// See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
// 		// merchantId: '01234567890123456789',
// 		merchantName: 'Example Merchant'
// 	};
// 	return paymentDataRequest;
// }

// /**
//  * Return an active PaymentsClient or initialize
//  *
//  * @see {@link https://developers.google.com/pay/api/web/reference/client#PaymentsClient|PaymentsClient constructor}
//  * @returns {google.payments.api.PaymentsClient} Google Pay API client
//  */
// function getGooglePaymentsClient() {
// 	if (paymentsClient === null) {
// 		paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });
// 	}
// 	return paymentsClient;
// }

// /**
//  * Initialize Google PaymentsClient after Google-hosted JavaScript has loaded
//  *
//  * Display a Google Pay payment button after confirmation of the viewer's
//  * ability to pay.
//  */
// function onGooglePayLoaded() {
// 	const paymentsClient = getGooglePaymentsClient();
// 	paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
// 		.then(function (response) {
// 			if (response.result) {
// 				addGooglePayButton();
// 				// @todo prefetch payment data to improve performance after confirming site functionality
// 				// prefetchGooglePaymentData();
// 			}
// 		})
// 		.catch(function (err) {
// 			// show error in developer console for debugging
// 			console.error(err);
// 		});
// }

// /**
//  * Add a Google Pay purchase button alongside an existing checkout button
//  *
//  * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#ButtonOptions|Button options}
//  * @see {@link https://developers.google.com/pay/api/web/guides/brand-guidelines|Google Pay brand guidelines}
//  */
// function addGooglePayButton() {
// 	const paymentsClient = getGooglePaymentsClient();
// 	const button =
// 		paymentsClient.createButton({ onClick: onGooglePaymentButtonClicked });
// 	document.getElementById('container').appendChild(button);
// }

// /**
//  * Provide Google Pay API with a payment amount, currency, and amount status
//  *
//  * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#TransactionInfo|TransactionInfo}
//  * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest
//  */
// function getGoogleTransactionInfo() {
// 	return {
// 		countryCode: 'US',
// 		currencyCode: 'USD',
// 		totalPriceStatus: 'FINAL',
// 		// set to cart total
// 		totalPrice: '1.00'
// 	};
// }

// /**
//  * Prefetch payment data to improve performance
//  *
//  * @see {@link https://developers.google.com/pay/api/web/reference/client#prefetchPaymentData|prefetchPaymentData()}
//  */
// function prefetchGooglePaymentData() {
// 	const paymentDataRequest = getGooglePaymentDataRequest();
// 	// transactionInfo must be set but does not affect cache
// 	paymentDataRequest.transactionInfo = {
// 		totalPriceStatus: 'NOT_CURRENTLY_KNOWN',
// 		currencyCode: 'USD'
// 	};
// 	const paymentsClient = getGooglePaymentsClient();
// 	paymentsClient.prefetchPaymentData(paymentDataRequest);
// }

// /**
//  * Show Google Pay payment sheet when Google Pay payment button is clicked
//  */
// function onGooglePaymentButtonClicked() {
// 	const paymentDataRequest = getGooglePaymentDataRequest();
// 	paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

// 	const paymentsClient = getGooglePaymentsClient();
// 	paymentsClient.loadPaymentData(paymentDataRequest)
// 		.then(function (paymentData) {
// 			// handle the response
// 			processPayment(paymentData);
// 		})
// 		.catch(function (err) {
// 			// show error in developer console for debugging
// 			console.error(err);
// 		});
// }

// /**
//  * Process payment data returned by the Google Pay API
//  *
//  * @param {object} paymentData response from Google Pay API after user approves payment
//  * @see {@link https://developers.google.com/pay/api/web/reference/response-objects#PaymentData|PaymentData object reference}
//  */
// function processPayment(paymentData) {
// 	// show returned data in developer console for debugging
// 	console.log(paymentData);
// 	// @todo pass payment token to your gateway to process payment
// 	paymentToken = paymentData.paymentMethodData.tokenizationData.token;
// }