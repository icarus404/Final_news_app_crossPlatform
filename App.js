import 'react-native-gesture-handler';
import React, {Component} from 'react';
//import { Text, View } from 'react-native';
import TabScreen from './source/screen/TabScreen';
import Notes from './source/screen/Notes';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const NoteStack = createStackNavigator();
const HomeStackScreen = ({navigation}) => (
  //tabscreen component
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#233B9C',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
      },
    }}>
    <HomeStack.Screen
      name="Lite News"
      component={TabScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#364FB5"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);

//note screen component
const NoteStackScreen = ({navigation}) => (
  <NoteStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#233B9C',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
      },
    }}>
    <NoteStack.Screen
      name="Your Notes"
      component={Notes}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#364FB5"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </NoteStack.Navigator>
);

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeStackScreen} />
          <Drawer.Screen name="Your Notes" component={NoteStackScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    ); //<TabScreen />;
  }
}
