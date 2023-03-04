import {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Constants from 'expo-constants';

// components
import MyButton from '../components/button';
import SocialLogin from "../components/socialLoginBtn";

//authentication
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';

// auth function definition
const signInWithGoogle = async ({navigation}) => {
  try {
    const userInfo = await GoogleSignin.signIn();
    console.log('User Info --> ', userInfo);
    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
    return auth().signInWithCredential(googleCredential).then(() => 
    {
      console.log("Signed in with Google");
       navigation.navigate("Home", 
       {
        userProfileUrl: userInfo.user.photo,
        userFirstName: userInfo.user.givenName,
        userLastName: userInfo.user.familyName,
        userEmail: userInfo.user.email,
       });
    });
  } 
  catch (error)
  {
    console.log(error)
  }
};

const signInWithFacebook = async ({navigation}) =>
{
   //console.log("Inside fb log in func")
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  if (result.isCancelled)
  {
    throw 'User cancelled the login process';
  }
  const data = await AccessToken.getCurrentAccessToken();
  if (!data)
  {
    throw 'Something went wrong obtaining access token';
  }
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  return auth().signInWithCredential(facebookCredential).then((res) => 
  {
    //console.log(res);
    const accessToken =  AccessToken.getCurrentAccessToken();
    if (accessToken)
    {
      const infoRequest = new GraphRequest(
        '/me/picture?type=large&redirect=false',
        null,
        (error, result) => 
          {
            if (error) 
            {
              console.log('Error fetching data: ' + error.toString());
            } 
            else 
            {
              console.log(res);
              navigation.navigate("Home", 
                {
                  userProfileUrl: result.data.url,
                  userFirstName: res.additionalUserInfo.profile.first_name,
                  userLastName: res.additionalUserInfo.profile.last_name,
                  userEmail: res.additionalUserInfo.profile.email,
                }
              );
            }
          },
      );
      new GraphRequestManager().addRequest(infoRequest).start();
    }
  });
};

// Login Screen Implementation
export default function Login({ navigation }) {
  useEffect(() =>
  {
    GoogleSignin.configure({
      webClientId: '982268943171-jvbtnf49f47649peivgrec6fn3evegth.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);
  return (
    <TouchableWithoutFeedback style={{flex: 1}}  onPress={Keyboard.dismiss}>
      <View style = {styles.container_sub}>
        <View style={styles.titleContainer}>
          <Text style = {styles.sub_title}>rio</Text>
        </View>
          <TextInput style={styles.inputEmail} placeholder="email" placeholderTextColor="grey" />
          <TextInput style={styles.inputPass} secureTextEntry={true} placeholder="password" placeholderTextColor="grey"/>
        <View style={styles.forgetTxtContainer}>
          <Text onPress={() => alert("forgot password")} style={styles.forgetTxt}>forgot password ?</Text>
        </View>
        <MyButton title="LOGIN" navigation={navigation}/>
        <View style={styles.signInPartnreTxtContainer}>
          <Text style={styles.signInPartnreTxt}>or sign in with</Text>
        </View>
        <View style={styles.signInPartnreContaier}>
          <SocialLogin navigation={navigation} signInWithGoogle={signInWithGoogle} title="Sign in with Google" url='https://img.icons8.com/color/48/null/google-logo.png' height="30" width="30" />
          <SocialLogin navigation={navigation} signInWithFacebook={signInWithFacebook} title="Sign in with Facebook" url='https://img.icons8.com/fluency/48/null/facebook-new.png' height="30" width="30"/>
          {/* <SocialLogin navigation={navigation} action={onAppleIdButtonPress} title="Sign in with Apple ID" url='https://img.icons8.com/ios-glyphs/30/null/mac-os.png' height="30" width="30"/> */}
        </View>
        <Text onPress={() => alert("Signup")} style={styles.signInPartnreTxt}>Didn't have account ? signup</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container_sub: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  titleContainer : {
     marginBottom: 30, 
  },
  sub_title:{
    textAlign: 'center',
    fontSize: 60,
    fontWeight: "bold",
    color: "#ff0066",
    lineHeight: 60,
  },
 
   inputEmail: {
    width: "80%",
    padding: 15,
    borderRadius: 5,
    color: "#495057",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ced4da",
    fontSize: 18,
    marginBottom: 20,
  },
  inputPass:{
    //display: "block",
    width: "80%",
    padding: 15,
    borderRadius: 5,
    color: "#495057",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ced4da",
    fontSize: 18,
    marginBottom: 20,
  },
  forgetTxtContainer:
  {
    alignSelf: "flex-end",
    marginRight: "10%",
    //marginVertical: "4%"
    marginBottom: 20,
  },
  forgetTxt:{
    color: "#ff0066",
    textAlign: "right",
  },
  signInPartnreTxtContainer:
  {
    marginTop: 30,
    marginBottom: 30,
  },
  signInPartnreTxt:
  {
    color: "#ff0066",
  },
  signInPartnreContaier:
  {
    
  }
});
