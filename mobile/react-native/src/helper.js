import {useRef, useEffect} from 'react';
import forge from 'node-forge';

import {client_id, privateKey} from './constants';

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const removeB64Padding = base64 =>
  base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

function encodeB64(str) {
  const encodedB64 = forge.util.encode64(str);
  return removeB64Padding(encodedB64);
}

const getNowPlusHours = (time, hours) => {
  return time + hours * 60 * 60 * 1000;
};

export const JWTGenerator = sub => {
  const payload = {
    sub,
    iss: client_id,
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
  const JWTKey = header64 + '.' + payload64 + '.' + signature64;

  return JWTKey;
};
