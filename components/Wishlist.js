import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import {addWishList} from '../actions/index';

export default function Star({ company } ) {
  const wishlist = useSelector(state => state.wishlist);

  const dispatch = useDispatch();
  const checkWishlist= () => {
    let check = false;
    wishlist.forEach((item) => {
      if(item === company) {
        check = true;
      }
    })
    return check
  }
  const [isWish, setIsWish] = React.useState(() => {
    return checkWishlist();
  });

  return (
    <View>
      {isWish? 
      <FontAwesome.Button name="star" size={24} color="#ffeb3b" backgroundColor="white"
        onPress={() =>{
          setIsWish(false);
        }}
        /> 
      : <FontAwesome.Button name="star-o" size={24} color="black" backgroundColor="white"
          onPress={() => {
            setIsWish(true);
            dispatch(addWishList(company))  
          }}
          />}
    </View>
  )
}