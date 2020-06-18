import React from 'react';
import { TouchableHighlight, SafeAreaView, View,  Text, Image,  StyleSheet } from 'react-native';
import styled from "styled-components/native";
import * as Linking from 'expo-linking';

const FlatList = styled.FlatList`
    background-color: #fff;
    width: 100%;
`;

function timetoDate(timestamp){
    var date = new Date(timestamp)
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var daydate = year+'-'+month+'-'+day
    return daydate
  }

function NewsItem({item}){
    return(
        <TouchableHighlight
        onPress={() => {Linking.openURL(item.url)}}>
        <View style={styles.news_content}> 
            <Text style={styles.text_headline}>{item.headline}</Text>
            <Text style={styles.text_datetime}>{timetoDate(item.datetime*1000)}</Text>
            <Image style={styles.img}
            source={{uri: item.image !=="" ? item.image : null}}/>
        </View>
        </TouchableHighlight>
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

const styles = StyleSheet.create({
    news_content:{
        flex: 1,
        padding: 25,
        borderBottomColor: '#fff',
        alignItems: "center"
    },
    text_headline:{
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 20
    },
    text_datetime:{
        color: '#808080',
        fontSize: 14
    },
    img:{
        width: '100%',
        height: 300,
        marginTop: 20,
    }
}

)