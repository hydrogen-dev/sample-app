import axios from 'axios';
import { Buffer } from 'buffer';
import {
  cardAdminURL,
  clientId,
  clientSecret,
  env,
  isClientTokenOAuth,
  privateKey,
} from '../../constants';
import forge from 'node-forge';

export const fetchUserToken = async (user: string, pass: string) => {
  const cardURL = isClientTokenOAuth
    ? `https://${env}.hydrogenplatform.com/authorization/v1/client-token`
    : `https://${env}.hydrogenplatform.com/authorization/v1/oauth/token?grant_type=password&username=${user}&password=${pass}`;

  const authHeader =
    'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = isClientTokenOAuth
    ? await axios.post(
        cardURL,
        {},
        {
          headers: {
            Authorization: authHeader,
            'Client-Token': `Bearer ${JWTGenerator(user)}`,
          },
        }
      )
    : ((await axios.post(
        cardURL,
        {},
        { headers: { Authorization: authHeader } }
      )) as any);

  return response.data.access_token;
};

export const fetchAdminUserToken = async () => {
  const authHeader =
    'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = (await axios.post(
    cardAdminURL,
    {},
    { headers: { Authorization: authHeader } }
  )) as any;

  return response.data.access_token;
};

export const fetchToken = async (cardName, userToken) => {
  const WEBSERVICE_APP_TOKEN = `https://${env}.hydrogenplatform.com/admin/v1/app_token?app_name=${
    cardName || 'card_balance'
  }`;

  const appToken = (await axios.get(WEBSERVICE_APP_TOKEN, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })) as any;

  return appToken.data[0].app_token;
};

const removeB64Padding = (base64) =>
  base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const encodeB64 = (str) => {
  const encodedB64 = forge.util.encode64(str);
  return removeB64Padding(encodedB64);
};

const getNowPlusHours = (time, hours) => time + hours * 60 * 60 * 1000;

export const JWTGenerator = (user) => {
  const payload = {
    sub: user.toLocaleLowerCase(),
    iss: clientId,
    exp: getNowPlusHours(new Date().getTime(), 1),
    iat: new Date().getTime(),
  };

  const key = forge.pki.privateKeyFromPem(privateKey);
  const md = forge.md.sha512.create();
  const header = {
    alg: 'RS512',
    typ: 'JWT',
  };
  const strHeader = JSON.stringify(header);
  const strPayload = JSON.stringify(payload);
  const header64 = encodeB64(strHeader);
  const payload64 = encodeB64(strPayload);
  const preHash = header64 + '.' + payload64;
  md.update(preHash, 'utf8');
  const signature = key.sign(md);
  const signature64 = encodeB64(signature);

  return header64 + '.' + payload64 + '.' + signature64;
};