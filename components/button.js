import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from 'react';

export default function MyButton({navigation,title, logout}) {

  return (
    <Pressable 
      style={({pressed}) => [
          {
            backgroundColor: pressed ? '#cc0052' : '#ff0066',
          },
          styles.btn,
        ]}
      onPress={() => 
      {
          if(logout)
        {
            try 
          {
            logout({navigation});
          } 
            catch (error)
          {
            console.log("button comp: "+error);
          }
        }
          else
        {
          alert("implement sign in with email and password here");
        }
      }}>
      <Text style = {styles.text} >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 15,
    width: "80%",
    borderRadius: 5,
    alignSelf: "center",
  },
  text : {
    color: 'white',
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  }
});
