
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import ReactNativeApiRTC from './src/ReactNativeApiRTC';


export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{width: '100%', height: '100%'}}>
        <ReactNativeApiRTC/>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 5,
    paddingLeft: 2,
    paddingRight: 2,
    fontSize: 20
  }
});
