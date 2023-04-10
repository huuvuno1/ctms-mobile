import { useEffect, useState } from 'react';
import {
  Image,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import { SCREENS, SECURE_STORE } from '../../constants';
import styles from './styles';
import logo from '../../../assets/LogoFit.png'

const SplashScreen = ({ navigation }) => {
  setTimeout(() => {
      navigation.navigate(SCREENS.LOGIN)
  }, 3000)

  return (
    <View style = {{flex:1,flexDirection:'column', justifyContent:"center", alignItems:"center", backgroundColor:"#465bd8"}}>
        <StatusBar barStyle='light-content' hidden = {false} backgroundColor="#465bd8" />
        <Image source={logo} style= {{width:200, height:200}}></Image>
        <Text style = {{fontSize:20, color:"white", fontWeight:"bold"}}>Khoa Công Nghệ Thông Tin</Text>
    </View>
  );
};
export default SplashScreen;
