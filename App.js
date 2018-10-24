import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import EntryView from './Views/EntryView';
import ServiceView from './Views/ServiceView';

const App = createStackNavigator({
  Home: { screen: EntryView },
  Service: { screen: ServiceView },
},{
  initialRouteName: 'Home',
});

export default App;

