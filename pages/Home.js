import React, {useEffect} from 'react'
import { Text, View } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import {createSymbol} from '../actions';

import SearchBar from '../components/SearchBar';



export default function Home() {

  const companySymbol = useSelector(state => state.companySymbol)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(createSymbol());
  });

  return (
    <>
    {companySymbol&&
    <SearchBar companySymbol={companySymbol}/>
    }
    </>
  );
}
