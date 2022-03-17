This git present the weird things when I play with React Native.

In details,

When I compose TextInput inside <Modal> component from 'react-native'. Then State changed throught onChangeText, keyboard not dismiss. It works fine

```
const RenderModal = ({visible}: ModalProps) => {
  const [text, setText] = useState<string>('');
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.modal}>
         <TextInput
            value={text}
            onChangeText={value => setText(value)}
            placeholder="Enter here..."
            placeholderTextColor={'#000'}
            style={{backgroundColor: '#eceff1', height: 50}}
          />
        </View>
      </View>
    </Modal>
  );
};
```

But, when I split the <TextInput> into Function Component for readable. The bug has come. Keyboard will dismiss when onChangeText is fired
```
const RenderModal = ({visible}: ModalProps) => {
  const [text, setText] = useState<string>('');
      
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

  //** If I compose TextInput like these codes bellow, Everythings work fine  */

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <RenderTextInput />
        </View>
      </View>
    </Modal>
  );
};

```
I've demo two cases as video below:<br/>
Bug https://imgur.com/a/UnWykMG<br/> 
Normal https://imgur.com/a/TxjRAiQ
        
Hope I have explained the problem well and maybe you guys help me out! Thanks
