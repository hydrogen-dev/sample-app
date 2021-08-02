# Angular Web Component Demo

Learn how to embed Hydrogen Card Components using Angular and Node.

## Documentation
Read our guides below to become more familiar with how our components are authenticated and embedded in this app.

[Web Component Guide](https://www.hydrogenplatform.com/docs/no-code-quickstart#web-components)

[Authentication Guide](https://www.hydrogenplatform.com/docs/atom-quickstart#authentication)

## Technical Requirements
[Node.js](https://nodejs.org/)

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

1. Navigate to the [.env file](https://github.com/hydrogen-dev/sample-app/blob/master/angular/backend-node/.env) in the `backend-node` folder
2. Update the following fields:
```shell
TENANT_NAME={YOUR OAUTH CLIENT_ID}
TENANT_PASSWORD={YOUR OAUTH CLIENT_SECRET}
PUBLIC_KEY={YOUR PUBLIC KEY}
BASE_PATH=https://api.hydrogenplatform.com/admin/v1
```
You can find your credentials on the "API Keys & Whitelists" link on the header of the account portal.

3. To test components post-login that use the `PASSWORD` OAuth grant, you will need to create a username and password in the admin user service. Please read [our docs here](https://www.hydrogenplatform.com/docs/nucleus/v1/#Create-a-client-in-admin).

## Installation

Open the command line, and following the instructions below.

1. Navigate to the `node-sdk` folder and then run the following command:

```shell
sudo npm link
```

2. Navigate out of the current folder to the `app-token-angular` folder, and run the following command:

```shell
sudo ng serve
```

If you receive an error that the command `ng` is not recognized, make sure you have Angular installed.

```shell
sudo npm i -g @angular/cli
```

Your browser should open at `http://localhost:4200/` with a Login screen displayed. The frontend Angular app is now running.

3. Finally, we will run the backend app. Open a new tab. Then navigate out of the current folder to the `backend-node` folder, and run the following commands:

```shell
sudo npm link ../node-sdk
node server.js
```

The backend Node server should now be running with a message `Server is listening on port 3005`
