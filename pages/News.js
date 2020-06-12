import React,{useEffect} from 'react';
import { Text, View } from 'react-native';
import { useSelector , useDispatch } from "react-redux";
import {createNews} from '../actions';

import NewsInfo from '../components/NewsInfo';

export default function News() {
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