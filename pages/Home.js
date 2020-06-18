import React, {useEffect} from 'react';
import { Text, View, Button } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import {createSymbol} from '../actions';


export default function HomeScreen({ navigation }) {

    const companySymbol = useSelector(state => state.companySymbol)
    const wishlist = useSelector(state => state.wishlist)
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(createSymbol());
    });

    return (
    <>
      {companySymbol&&
      <View style={{flex:1}}>
        <Container>
        <Content padder>
          <Card>
            <CardItem header button onPress={() => alert("This is Card Header")}>
              <Text style={{fontWeight:'bold'}}>MyList</Text>
            </CardItem>
            {wishlist.map((item) => (
            <CardItem key={item}
            button onPress={() => navigation.navigate('Detail',{
                company: item
            })}>
                <Body>
                    <Text>{item}</Text>
                </Body>
            </CardItem>))}
            <CardItem footer button onPress={() => navigation.navigate('Search')}>
              <Text style={{fontWeight:'bold'}}>Add Symbol</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    </View>
    }
    </>
    );
}

const WishItem = (data) => {
    return(
        <View>

        </View>
    )
}