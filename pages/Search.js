import React from 'react'

import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native'
import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'

class Search extends React.Component {

    constructor(props){
      super(props)
  
    // state
    this.state = {
        searchKey: '',
        data : this.props.companySymbol,
        filteredData : this.props.companySymbol
    }
    
    }
    handleSearch = (value) => {
        const filteredData = this.state.data.filter(item=>
        item.symbol.toLowerCase().includes(value.toLowerCase()))
        this.setState({filteredData, searchKey: value} )
    }
  
    render(){
      return(
          <>
          <SafeAreaView style={styles.content_safe_area}>
            <View style={styles.input_inner}> 
                <TextInput 
                placeholder="Search Symbol"
                clearButtonMode="always"
                value={this.state.searchKey}
                onChangeText={this.handleSearch}
                style={styles.input}
                /> 
                <View style={styles.separator} />
                {
                    this.state.searchKey === ''
                    ?
                    <View style={styles.image_placeholder_container}>
                        <Text style={styles.image_placeholder_text}>
                        Enter a few words{"\n"}
                        to search 
                        </Text>
                    </View>
                    :
                    <View>
                        <FlatList
                        data = {this.state.filteredData}
                        renderItem={({item}) =>
                        <TouchableHighlight
                        activeOpacity={1}
                        underlayColor={"#ccd0d5"}
                        onPress = {() => {}}>
                            <View style={styles.content_list}>
                                <Text style={styles.content_text}>{item.symbol}</Text>
                            </View>
                        </TouchableHighlight> }
                        keyExtractor={item=>item.symbol}
                        />
                    </View>
                }
                </View>
          </SafeAreaView>
          </>
      )
      }
}

const styles = StyleSheet.create({
    input_inner:{
        flex:1,
        paddingTop: 20
    },
    input: {
      flex: 1,
      alignItems: 'center',
      height: 20,
      backgroundColor: 'white',
      borderRadius: 16,
      paddingHorizontal: 16,
      fontSize: 15
    },
    content_safe_area: {
      flex: 1,
      backgroundColor: 'white'
    },
    content_inner: {
      flex: 1,
      paddingTop: 20
    },
    separator: {
      marginTop: 5,
      height: 1,
      backgroundColor: '#e6e4eb'
    },
    image_placeholder_container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '-50%'
    },
    image_placeholder: {
      width: 150,
      height: 113,
      alignSelf: 'center'
    },
    image_placeholder_text: {
      textAlign: 'center',
      color: 'gray',
      marginTop: 5
    },
    search_item: {
      flexDirection: 'row',
      height: 40,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#e6e4eb',
      marginLeft: 16
    },
    item_icon: {
      marginRight: 15
    },
    content_list: {
      flexDirection: 'row',
      padding: 30,
      borderBottomColor: '#fff',
      alignItems: 'center'
    },
    content_text:{
      fontSize: 16,
      fontWeight: '400',
      paddingHorizontal: 20
    }
  })


function mapStateToProps(state){
    const {companySymbol} = state
    return {companySymbol}
}
export default connect(mapStateToProps)(Search);
  
