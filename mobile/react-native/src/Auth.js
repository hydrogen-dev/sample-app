import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Text,
} from 'react-native';

const Auth = ({setAuthorization, fetchUserToken, isValid}) => (
  <View style={styles.container}>
    {isValid || <Text style={styles.error}>Wrong credentials</Text>}
    <TextInput
      style={styles.input}
      onChangeText={login =>
        setAuthorization(prevState => ({...prevState, username: login}))
      }
      placeholder="username"
      autoCapitalize="none"
      keyboardType="email-address"
    />
    <TextInput
      style={styles.input}
      onChangeText={password =>
        setAuthorization(prevState => ({...prevState, password: password}))
      }
      placeholder="password"
      keyboardType="default"
    />

    <TouchableOpacity onPress={fetchUserToken} style={styles.button}>
      <Text style={styles.buttonText}>Sign in</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 10,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
    height: 40,
    textAlign: 'center',
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#99e5ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
  error: {
    color: 'red',
  },
});

export default React.memo(Auth);
