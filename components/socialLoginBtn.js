//import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
//import auth from '@react-native-firebase/auth';

export default function SocialLogin({navigation, title, url, height, width, signInWithGoogle, signInWithFacebook}) {
   let x = parseInt(height)
   let y = parseInt(width)

   if(title=="Sign in with Google")
   {
    return (
      < Pressable 
        style={({pressed}) => [
             {
               backgroundColor: pressed ? '#f0f0f0' : '#fff',
             },
             styles.btn,
           ]}
            onPress={() => signInWithGoogle({navigation})}
       >
       <View style={styles.socialLogoContainer}>
         <Image source={{ uri: url}}  style = {{height: x, width: y}} />
         <Text style={styles.socialLogoTxt}>
           {title}
         </Text>
       </View>
      </ Pressable>
     );
   }
   else if (title=="Sign in with Facebook")
   {
    return (
      < Pressable 
        style={({pressed}) => [
             {
               backgroundColor: pressed ? '#f0f0f0' : '#fff',
             },
             styles.btn,
           ]}
            onPress={() => signInWithFacebook({navigation})}
       >
        <View style={styles.socialLogoContainer}>
          <Image source={{ uri: url}}  style = {{height: x, width: y}} />
          <Text style={styles.socialLogoTxt}>
            {title}
          </Text>
        </View>
      </ Pressable>
     );
   }
  
}
const styles = StyleSheet.create({
  btn: {
    borderRadius: 30,
    marginBottom: 20,
    borderWidth: 1,
  },
  socialLogoContainer:
  {
    flexDirection: "row", 
    alignItems: 'center',  
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  socialLogoTxt : {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 15,
  }
});
