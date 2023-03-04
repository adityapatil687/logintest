import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: '982268943171-bbag5etr6p7srjklun4nb4kqt4f6r9h6.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
//   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
// });

async function onGoogleButtonPress()
{
  try
  {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo)
    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
    auth().signInWithCredential(googleCredential);
  }
  catch (error)
  {
    console.log(error);
  }
}

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '982268943171-jvbtnf49f47649peivgrec6fn3evegth.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton onPress={signIn} />
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
});
