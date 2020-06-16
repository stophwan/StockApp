import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { StyleSheet, Text, View,  Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import rootReducer from './reducers/index';
import HomeScreen from './pages/Home';
import News from './pages/News';
import Search from './pages/Search';
// import Markets from './pages/Markets';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers( applyMiddleware(logger, thunk)));
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function Home() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="SSNIPER" component={HomeScreen}
         />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
  );
}


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="News" component={News} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}