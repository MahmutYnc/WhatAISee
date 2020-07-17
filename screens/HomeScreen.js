import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../images/backgrounds/Chitty.jpg')}
      style={{width: '100%', height: '100%'}}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.sectionWelcomeMessage}>
            Welcome Back <Text style={styles.highlight}>USER</Text>
          </Text>
          <Text style={styles.sectionStatusReport}>
            <Text style={styles.highlight}>%75</Text> of the tasks are done!
          </Text>
        </View>
        <Image
          style={styles.image}
          source={{
            uri: 'http://www.reactnativeexpress.com/static/logo.png',
          }}
        />
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.captureImage}
            onPress={() => navigation.push('Cam')}>
            <Text style={{color: '#FFFFFF'}}>Capture</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.selectImage}
            onPress={() => Alert.alert('Right button pressed')}>
            <Text style={{color: '#FFFFFF'}}>Select Image</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    flex: 1,
  },
  welcome: {
    // backgroundColor: Colors.lighter,
    width: 284,
    height: 28,
    left: 20,
    top: 47,
  },
  sectionWelcomeMessage: {
    // position: absolute;
    width: 284,
    height: 28,
    //color: Colors.dark,
    fontStyle: 'normal',
    //fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 28,
    textAlign: 'center',
  },
  highlight: {
    fontWeight: '700',
  },
  sectionStatusReport: {
    width: 190,
    height: 16,
    top: 70,

    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'center',
  },
  image: {
    flexDirection: 'row',
    position: 'absolute',
    top: 177,
    //width: Dimensions.get('window').width - 70,
    height: 370,
    left: 20,
    right: 20,
    borderRadius: 15,
    backgroundColor: '#FF0',
  },

  buttons: {
    position: 'absolute',
    paddingRight: 30,
    paddingLeft: 0,
    width: 351,
    height: 30,
    marginLeft: 30,
    marginRight: 30,
    top: 650,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  captureImage: {
    //position: 'absolute',
    width: 135,
    height: 30,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CA6060',
    borderRadius: 15,
  },
  selectImage: {
    //position: 'absolute',
    width: 135,
    height: 30,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CA6060',
    borderRadius: 15,
  },
});

export default HomeScreen;
