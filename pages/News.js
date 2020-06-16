import React,{useEffect} from 'react';
import { Text, View } from 'react-native';
import { useSelector , useDispatch } from "react-redux";
import {createNews} from '../actions';
import { createStackNavigator } from '@react-navigation/stack';

import NewsInfo from '../components/NewsInfo';

const Stack = createStackNavigator();

function NewsScreen() {
  const news = useSelector(state => state.news)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(createNews());
  });
  return (
    <>
      {news&&
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <NewsInfo data = {news}/>
      </View>
      }
    </>
  );
}

export default function News() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="News" component={NewsScreen} />
      </Stack.Navigator>
  );
}