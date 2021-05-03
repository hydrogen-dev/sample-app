# Angular Web Component Demo

Learn how to embed Hydrogen Card Components using Angular and Node.

## Requirements
[Node.js](https://nodejs.org/)

## Components

Pre-Login
1. Card Issuance

Post-Login
1. Card Balance
2. Card Transactions

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
