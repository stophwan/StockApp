import React, {useEffect} from 'react';
import { Text, View, Button } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import {createSymbol} from '../actions';

import Search from './Search'

export default function HomeScreen({ navigation }) {

    const companySymbol = useSelector(state => state.companySymbol)
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(createSymbol());
    });

    return (
    <>
      {companySymbol&&
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to Search"
          onPress={() => navigation.navigate('Search')}
        />
      </View>
    }
    </>
    );
}