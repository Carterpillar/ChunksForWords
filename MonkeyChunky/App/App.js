import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  SafeAreaProvider,
} from 'react-native';
import db from './localdb';
import { Header } from 'react-native-elements';
import PhonicSoundButton from './components/PhonicSoundButton';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { text: '', chunks: [], phonicSounds: [] };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#E6FB04'}
          centerComponent={{
            text: 'Get Your Word Chunks',
            style: { color: '#FF6600', fontSize: 20 },
          }}
        />
        <Image
          style={{ marginLeft: 75, marginTop: 20, marginBottom: -150 }}
          source={require('./images-removebg-preview.png')}
        />
        <TextInput
          value={this.state.text}
          onChangeText={(text) => {
            this.setState({ text: text });
            
          }}
          style={styles.inputBox}
        />
        <View>
          {this.state.chunks.map((items, index) => {
            return (
              <PhonicSoundButton
                wordChunk={this.state.chunks[index]}
                soundChunk={this.state.phonicSounds[index]}
                buttonIndex={index}
              />
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            var word = this.state.text.toLowerCase();
            console.log(db[word]);

            db[word]
              ? (this.setState({ chunks: db[word].chunks }),
                this.setState({ phonicSounds: db[word].phones }))
              : Alert.alert('THIS WORD DOES NOT EXIST IN DATABASE');
          }}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6FB04' },
  inputBox: {
    marginTop: 200,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
    color: '#FF6600',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF6600',
  },
});
//const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#b8b8b8', }, inputBox: { marginTop: 50, width: '80%', alignSelf: 'center', height: 40, textAlign: 'center', borderWidth: 4, outline: 'none', }, goButton: { width: '50%', height: 55, alignSelf: 'center', padding: 10, margin: 10, }, buttonText: { textAlign: 'center', fontSize: 30, fontWeight: 'bold', }, displayText: { textAlign: 'center', fontSize: 30, color: 'white' }, imageIcon: { width: 150, height: 150, marginLeft: 95, }, chunkButton:{ width: '60%', height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10, margin: 5, backgroundColor: 'red' } });

//const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#b8b8b8', }, inputBox: { marginTop: 50, width: '80%', alignSelf: 'center', height: 40, textAlign: 'center', borderWidth: 4, outline: 'none', }, goButton: { width: '50%', height: 55, alignSelf: 'center', padding: 10, margin: 10, }, buttonText: { textAlign: 'center', fontSize: 30, fontWeight: 'bold', }, imageIcon: { width: 150, height: 150, marginLeft: 95, } });
