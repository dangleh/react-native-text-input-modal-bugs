This git presents the weird things when I play with React Native.

In details,

When I compose TextInput inside Modal component from 'react-native'. Then State changed throught onChangeText, keyboard not dismiss. It works fine

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

But, when I split the TextInput into Function Component for readable. The bug has come. Keyboard will dismiss when onChangeText is fired
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

  //** If I compose TextInput like these codes below, Everythings work fine  */

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

#SOLVED
After read some docs, raise some help in community. Finally I found a solution.

It's basically because TextInput is inside a function that is recreated at every render (on TextInput changes), so the TextInput gets dismounted and mounted on state change, messing your keyboard.

So what is solution?
Instead of split to Function Component, I've compose TextInput to Element

```
const TextInputElement = (
    <TextInput
      value={text}
      onChangeText={value => setText(value)}
      placeholder="Enter here..."
      placeholderTextColor={'#000'}
      style={{backgroundColor: '#eceff1', height: 50}}
    />
  );
```

Because React Element is immutable, according to [React's Docs](https://reactjs.org/docs/rendering-elements.html#updating-the-rendered-element)

So, I guess it dont get update when state changed. I hope my guess is right!!!