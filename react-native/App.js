import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {CardImage} from 'card-modules';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <CardImage publicKey="" appToken="" />
    </SafeAreaView>
  );
};

export default App;
