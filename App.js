import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React,{Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './component/Home';
import Addnote from './component/Addnote';
import Updatenote from './component/Uptdatenote';
import RadioBtn from './component/Radio';

const StackDemo = createNativeStackNavigator();

export default function App() {
  return (
    // screenOptions={{ headerShown: false }} xoa ơ tren
    <NavigationContainer>
          <StackDemo.Navigator  initialRouteName='Home'  >
            <StackDemo.Screen name='Home' component={Home} options={ {title:'Thư mục'}} />
            <StackDemo.Screen name='Addnote' component={Addnote} options={ {title:'Ghi chu'}} />
            <StackDemo.Screen name='Updatenote' component={Updatenote} options={ {title:'Ghi chú'}} />
            <StackDemo.Screen name='RadioBtn' component={RadioBtn} options={ {title:'Radio'}} />


		{/* viết tiếp các màn hình khác vào đây */}
          </StackDemo.Navigator>
      </NavigationContainer>

  );
}

