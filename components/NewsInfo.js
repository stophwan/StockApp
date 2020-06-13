import React from 'react';
import { SafeAreaView, View,  Text } from 'react-native';
import styled from "styled-components/native";

const FlatList = styled.FlatList`
    background-color: #fff;
    width: 100%;
`;

function NewsItem({item}){
    return(
        <View>
            <Text>{item.headline}</Text>
        </View>
    )
}

function NewsList({data}){
    return(
        <FlatList
        data = {data}
        renderItem={({item}) => <NewsItem item={item}/>}
        keyExtractor={item=>item.id}
        />
        
    )
}

export default NewsList;