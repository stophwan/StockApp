import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { FontAwesome } from '@expo/vector-icons';
import {addWishList} from './actions'

import rootReducer from './reducers/index';
import HomeScreen from './pages/Home';
import News from './pages/News';
import DetailScreen from './pages/Detail'
import SearchScreen from './pages/Search';
import WishStar from './components/Wishlist';
// import Markets from './pages/Markets';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers( applyMiddleware(logger, thunk)));
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function Home({route, navigation}) {

  const dispatch = useDispatch();
  return (
      <Stack.Navigator>
        <Stack.Screen name="SSNIPER" component={HomeScreen}
        options={{
          headerTitleStyle: {color: '#A5C882'},
          headerRight: ()=>
          <Ionicons name="ios-search" size={24} color='#A5C882'
          onPress={() => navigation.navigate('Search')} />}}
          />
        <Stack.Screen name="Search" component={SearchScreen}
        options={{
          headerTitleStyle: {color: '#A5C882'}}} />
        <Stack.Screen name="Detail" component={DetailScreen} 
        options={({route}) => ({
          headerTitleStyle: {color: '#A5C882'},
          headerRight: () =>
          <WishStar company={route.params.company}></WishStar>
        })}/>
      </Stack.Navigator>
  );
}


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home';
              } else if (route.name === 'News') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'green',
            inactiveTintColor: 'gray',
          }}
              >
          <Tab.Screen name="Home" children={Home} />
          <Tab.Screen name="News" component={News} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}