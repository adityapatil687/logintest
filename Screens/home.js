import { Text, View, StyleSheet, Button, Image } from 'react-native';
import Constants from 'expo-constants';
import MyButton from '../components/button';
import auth from '@react-native-firebase/auth';

//authentication 
const logout = async ({navigation}) => {
  try 
  {
    auth().signOut().then(() => 
    {
      console.log('User signed out!');
      navigation.navigate("Login");
    });
  } 
  catch (error)
  {
    console.log("Home: "+error);
  }
};

// Home Screen Implementation
export default function Home({ route, navigation })
{
  const { userProfileUrl } = route.params;
  const { userFirstName } = route.params;
  const { userLastName } = route.params;
  const { userEmail } = route.params;
  return (
    <View style = {styles.container}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: userProfileUrl}}  style = {styles.profImg} />
        <View style={styles.labelContainer}>
          <Text style={styles.txtStyle}>{userFirstName} {userLastName}</Text>
          <Text style={styles.txtStyleSub}>{userEmail}</Text>
        </View>
        <MyButton navigation={navigation} title="Logout" logout={logout}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  cardContainer:
  {
    borderColor: "#787c80",
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 15,
  },
  
  labelContainer:
  {
    padding: 15,
    marginTop: 0,
    marginBottom: 10,
  },
  txtStyle:{
    fontWeight: "bold",
    fontSize: 30,
    textAlign: 'center'
  },
  txtStyleSub:{
    fontSize: 13,
    textAlign: 'center'
  },
  profImg:
  {
    alignSelf: "center",
    borderRadius: 100,
    height: 150,
    width: 150
  }
});
