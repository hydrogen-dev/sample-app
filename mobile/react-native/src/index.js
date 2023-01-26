import React, {useState, useCallback} from 'react';
import base64 from 'react-native-base64';
import axios from 'axios';

import Auth from './Auth';
import Picker from './Picker';
import {
  client_id,
  client_secret,
  CARD_ADMIN_URL,
  BASE_URL,
  pickerItems,
  authType,
} from './constants';
import {JWTGenerator} from './helper';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authorization, setAuthorization] = useState({});
  const [selectedValue, setSelectedValue] = useState(pickerItems[0]);
  const [appToken, setAppToken] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchUserToken = useCallback(
    async (appName = 'card_balance') => {
      const cardURL = `${BASE_URL}authorization/v1/${
        authType === 'client-token'
          ? 'client-token'
          : `oauth/token?grant_type=password&username=${authorization.username}&password=${authorization.password}`
      }`;
      const WEBSERVICE_USER_TOKEN =
        appName === 'card_admin' ? CARD_ADMIN_URL : cardURL;
      const authHeader =
        'Basic ' + base64.encode(`${client_id}:${client_secret}`);
      let jwt = '';
      if (authType === 'client-token') {
        jwt = await JWTGenerator(authorization.username);
      }

      axios
        .post(
          WEBSERVICE_USER_TOKEN,
          {},
          {
            headers: {
              Authorization: authHeader,
              'client-token':
                authType === 'client-token' ? `Bearer ${jwt}` : null,
            },
          },
        )
        .then(res => {
          fetchAppToken(appName, res?.data.access_token);
          setIsValid(true);
        })
        .catch(err => {
          console.log(err);
          setIsValid(false);
        });
    },
    [authorization.password, authorization.username, fetchAppToken],
  );

  const fetchAppToken = useCallback((appName, userToken) => {
    const WEBSERVICE_APP_TOKEN = `${BASE_URL}admin/v1/app_token?app_name=${
      typeof appName !== 'string' ? 'card_balance' : appName
    }`;

    axios
      .get(WEBSERVICE_APP_TOKEN, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(res => {
        setAppToken(res?.data[0].app_token);
        setIsAuthenticated(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const changeModalVisibility = useCallback(
    isVisible => {
      setIsModalVisible(isVisible);
    },
    [setIsModalVisible],
  );

  return isAuthenticated ? (
    <Picker
      setSelectedValue={setSelectedValue}
      fetchUserToken={fetchUserToken}
      selectedValue={selectedValue}
      authorization={authorization}
      appToken={appToken}
      changeModalVisibility={changeModalVisibility}
      isModalVisible={isModalVisible}
    />
  ) : (
    <Auth
      setIsAuthenticated={setIsAuthenticated}
      setAuthorization={setAuthorization}
      fetchUserToken={fetchUserToken}
      isValid={isValid}
    />
  );
};

export default App;
