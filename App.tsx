import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const App = () => {
  const [isShowModal, setShowModal] = useState<boolean>(false);
  return (
    <View style={styles.view}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowModal(true)}>
        <Text>ShowModal</Text>
      </TouchableOpacity>
      <RenderModal visible={isShowModal} />
    </View>
  );
};

interface ModalProps {
  visible: boolean;
}

const RenderModal = ({visible}: ModalProps) => {
  const [text, setText] = useState<string>('');

  //* If I split TextInput to component like below */
  //* The keyboard will dismiss when text change */
  const RenderTextInput = () => {
    return (
      <TextInput
        value={text}
        onChangeText={value => setText(value)}
        placeholder="Enter here..."
        placeholderTextColor={'#000'}
        style={{backgroundColor: '#eceff1', height: 50}}
      />
    );
  };

  const TextInputElement = (
    <TextInput
      value={text}
      onChangeText={value => setText(value)}
      placeholder="Enter here..."
      placeholderTextColor={'#000'}
      style={{backgroundColor: '#eceff1', height: 50}}
    />
  );

  //** If I compose TextInput like these codes bellow, Everythings work fine  */

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          {TextInputElement}
          {/* <RenderTextInput /> */}
          {/* <TextInput
            value={text}
            onChangeText={value => setText(value)}
            placeholder="Enter here..."
            placeholderTextColor={'#000'}
            style={{backgroundColor: '#eceff1', height: 50}}
          /> */}
        </View>
      </View>
    </Modal>
  );
};

export default App;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'cyan',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    height: 500,
    width: 400,
    backgroundColor: '#FFF',
  },
});
