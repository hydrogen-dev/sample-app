import React, {useEffect} from 'react';

import {CardNameMap} from './constants';
import {usePrevious} from './helper';

const Cards = ({cardName, fetchUserToken, appToken}) => {
  const prevAppToken = usePrevious(appToken);
  const isAppTokenDifferent =
    Boolean(prevAppToken) && prevAppToken !== appToken;

  useEffect(() => {
    fetchUserToken(cardName);
  }, [cardName, fetchUserToken]);

  return cardName && isAppTokenDifferent
    ? CardNameMap[cardName](appToken)
    : null;
};

export default React.memo(Cards);
