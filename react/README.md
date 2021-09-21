# React Web Component Demo

Learn how to embed Hydrogen Card Components using React and Node.

## Documentation
Read our guides below to become more familiar with how our components are authenticated and embedded in this app.

[Web Component Guide](https://www.hydrogenplatform.com/docs/no-code-quickstart#web-components)

[Authentication Guide](https://www.hydrogenplatform.com/docs/atom-quickstart#authentication)

## Technical Requirements
1. [Node.js](https://nodejs.org/) Compatible with <= v14.17.4
2. [IP & Domain Whitelist](https://support.hydrogenplatform.com/hc/en-us/articles/1500007613761-How-does-the-API-whitelisting-work-)

**You must run the app on a real domain that you can whitelist on the Hydrogen portal in #2 above (localhost cannot be whitelisted), otherwise you will receive CORS Access-Control errors on the components. If you do wish to run the app locally, the app will still generate tokens and embed the components, as well as allow you to login.**

## Web Components

The following [Hydrogen Web Components](https://www.hydrogenplatform.com/cards-no-code-applications) are used in the sample app.

**Pre-Login**

1. Card Issuance

Uses the `client_credentials` OAuth grant type to issue a card for a brand new client that hasn't yet been created. If you wish to issue a card for a client that has already been signed up, you can either pass in a Nucleus `client-id` to the embed code, or embed post-login using the `password` grant type below.

**Post-Login**

1. Card Balance
2. Card Transactions

Uses the `password` OAuth grant type to only pull in balance and transaction data for the authenticated cardholder.

## Setup

1. Navigate to the [.env file](https://github.com/hydrogen-dev/sample-app/blob/master/react/backend-node/.env) in the `backend-node` folder
2. Update the following fields:
```shell
TENANT_NAME={YOUR OAUTH CLIENT_ID}
TENANT_PASSWORD={YOUR OAUTH CLIENT_SECRET}
PUBLIC_KEY={YOUR PUBLIC KEY}
BASE_PATH=https://api.hydrogenplatform.com/component/v1
```
You can find your credentials on the "API Keys & Whitelists" link on the header of the account portal.

3. To test components post-login that use the `password` OAuth grant, you will need to create a username and password in the admin user service. Please read [our docs here](https://www.hydrogenplatform.com/docs/nucleus/v1/#Create-a-client-in-admin).

## Installation

Open the command line, and follow the instructions below.

1. Navigate to the `node-sdk` folder and then run the following command:

```shell
sudo npm link
```

2. Navigate out of the current folder to the `app-token-react` folder, and run the following commands:

```shell
sudo npm install
sudo npm start
```

Your browser should open at `http://localhost:4200/` with a Login screen displayed. The frontend React app is now running.

3. Finally, we will run the backend app. Open a new tab. Then navigate out of the current folder to the `backend-node` folder, and run the following commands:

```shell
sudo npm link ../node-sdk
node server.js
```

The backend Node server should now be running with a message `Server is listening on port 3005`. If you refresh the browser window now, you should see the Card Issuance component display.
