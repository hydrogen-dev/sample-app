import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';

import Cards from './Cards';
import ModalPicker from './ModalPicker';

const Picker = ({
  setSelectedValue,
  selectedValue,
  authorization,
  appToken,
  fetchUserToken,
  changeModalVisibility,
  isModalVisible,
}) => (
  <>
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeModalVisibility(true)}>
        <Text style={styles.text}>{selectedValue.label}</Text>
        {isModalVisible ? (
          <Text style={styles.arrow}>&#9650;</Text>
        ) : (
          <Text style={styles.arrow}>&#9660;</Text>
        )}
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={() => changeModalVisibility(false)}>
        <ModalPicker
          changeModalVisibility={changeModalVisibility}
          setSelectedValue={setSelectedValue}
        />
      </Modal>
    </SafeAreaView>
    <Cards
      cardName={selectedValue.value}
      authorization={authorization}
      appToken={appToken}
      fetchUserToken={fetchUserToken}
    />
  </>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  text: {
    marginVertical: 15,
    fontSize: 20,
    color: 'blue',
  },
  button: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default React.memo(Picker);
