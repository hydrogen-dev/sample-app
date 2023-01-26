import React from 'react';

import {
  CardActivation,
  CardBalance,
  CardAdmin,
  CardImage,
  CardIssuance,
  CardFunding,
  CardControls,
  CardSpending,
  CardStatements,
  CardTransactions,
} from 'card-modules';

import CardBudget from 'card-modules/src/modules/CardBudget';
import CardCashFlow from 'card-modules/src/modules/CardCashFlow';

export const ENV = 'sandbox'; //api, sandbox
export const client_id = '';
export const client_secret = '';
export const publicKey = '';
export const authType = ''; // set "client-token" for authorization with "client-token";
export const privateKey = ``;

export const BASE_URL = `https://${ENV}.hydrogenplatform.com/`;

export const CARD_ADMIN_URL = `${BASE_URL}authorization/v1/oauth/token?grant_type=client_credentials`;

export const pickerItems = [
  {label: 'Balance', value: 'card_balance'},
  {label: 'Activation', value: 'card_activation'},
  {label: 'Admin', value: 'card_admin'},
  {label: 'Image', value: 'card_image'},
  {label: 'Issuance', value: 'card_issuance'},
  {label: 'Funding', value: 'card_funding'},
  {label: 'Controls', value: 'card_controls'},
  {label: 'Spending', value: 'card_spending'},
  {label: 'Statements', value: 'card_statements'},
  {label: 'Transactions', value: 'card_transactions'},
  {label: 'Budget', value: 'card_budget'},
  {label: 'Cash Flow', value: 'card_cash_flow'},
];

export const CardNameMap = {
  card_activation: appToken => (
    <CardActivation appToken={appToken} publicKey={publicKey} env={ENV} />
  ),
  card_balance: appToken => (
    <CardBalance appToken={appToken} publicKey={publicKey} env={ENV} />
  ),
  card_admin: appToken => (
    <CardAdmin appToken={appToken} publicKey={publicKey} env={ENV} />
  ),
  card_image: appToken => (
    <CardImage appToken={appToken} publicKey={publicKey} env={ENV} />
  ),
  card_issuance: appToken => (
    <CardIssuance appToken={appToken} publicKey={publicKey} env={ENV} />
  ),
  card_funding: appToken => (
    <CardFunding appToken={appToken} publicKey={publicKey} env={ENV} />
  ),
  card_controls: appToken => (
    <CardControls appToken={appToken} publicKey={publicKey} env={ENV} />
  ),
  card_spending: appToken => (
    <CardSpending appToken={appToken} publicKey={publicKey} env={ENV} />
  ),
  card_statements: appToken => (
    <CardStatements appToken={appToken} publicKey={publicKey} env={ENV} />
  ),
  card_transactions: appToken => (
    <CardTransactions appToken={appToken} publicKey={publicKey} env={ENV} />
  ),
  card_budget: appToken => (
    <CardBudget appToken={appToken} publicKey={publicKey} env={ENV} />
  ),
  card_cash_flow: appToken => (
    <CardCashFlow appToken={appToken} publicKey={publicKey} env={ENV} />
  ),
};
