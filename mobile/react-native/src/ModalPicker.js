import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

import {pickerItems} from './constants';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ModalPicker = ({changeModalVisibility, setSelectedValue}) => {
  const onPressItem = value => {
    changeModalVisibility(false);
    setSelectedValue(value);
  };

  const option = pickerItems.map(item => {
    return (
      <TouchableOpacity
        key={item.value}
        onPress={() => onPressItem(item)}
        style={styles.option}>
        <Text style={styles.text}>{item.label}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <TouchableOpacity
      onPress={() => changeModalVisibility(false)}
      style={styles.container}>
      <View style={styles.modal}>
        <ScrollView>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    width: WIDTH - 20,
    height: HEIGHT / 1.35,
  },
  option: {
    alignItems: 'flex-start',
  },
  text: {
    margin: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default React.memo(ModalPicker);
