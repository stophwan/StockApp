import React from 'react'

import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
  FlatList
} from 'react-native'
import { connect } from 'react-redux'

class Search extends React.Component {

    constructor(props){
      super(props)
  
    // state
    this.state = {
        searchKey: '',
        data : this.props.companySymbol,
        filteredData : this.props.companySymbol,
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
          <View style={styles.content_safe_area}>
            <View style={styles.input}> 
            <Image 
                  source={require('../assets/searchicon.png')} 
                  style={{width: 30, height: 30}}
            />
            <View style={styles.textinput}>
                <TextInput 
                placeholder="Search Symbol"
                clearButtonMode="always"
                value={this.state.searchKey}
                onChangeText={this.handleSearch}
                style={styles.input_none}
                /> 
            </View>
            </View>
            <View>
                <View style={styles.separator} />
                {
                    this.state.searchKey === ''
                    ?
                    <View style={styles.image_placeholder_container}>
                        <Image 
                        source={require('../assets/caticon.png')} 
                        style={{width: '50%', height: '20%'}}
                        />
                        <Text style={styles.image_placeholder_text}>
                        Enter a few words{"\n"}
                        to search 
                        </Text>
                    </View>
                    :
                    <View style={styles.list}>
                        <FlatList
                        data = {this.state.filteredData}
                        renderItem={({item}) =>
                        <>
                        <TouchableHighlight
                        activeOpacity={1}
                        underlayColor={"#ccd0d5"}
                        onPress = {() => 
                            this.props.navigation.navigate('Detail', {
                                company: item.symbol
                            })
                        }>
                            <View style={styles.content_list}>
                                <Text style={styles.content_text}>{item.symbol}</Text>
                                <Text style={styles.des_text}>{item.description}</Text>
                            </View>
                        </TouchableHighlight> 
                        </>
                        }
                        keyExtractor={item=>item.symbol}
                        />
                    </View>
                }
            </View>
          </View>
          </>
      )
      }
}

const styles = StyleSheet.create({
    content_safe_area:{
        backgroundColor: 'white'
    },
    input:{
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        height: 60,
    },
    textinput:{
        width: '80%',
        height: 40,
        marginLeft:10
    },
    // list:{
    //     backgroundColor:'white'
    // },
    image_placeholder_container:{
        alignItems:'center',
        justifyContent: 'center',
        height: '100%'
    },
    image_placeholder_text:{
        fontSize: 16
    },
    content_list: {
      flexDirection: 'column',
      padding: 20,
      borderBottomColor: '#fff',
    },
    content_text:{
      fontSize: 16,
      fontWeight: '400',
      paddingHorizontal: 20
    },
    des_text:{
      color: 'gray',
      paddingHorizontal: 20
    }
  })


function mapStateToProps(state){
    const {companySymbol} = state
    return {companySymbol}
}
export default connect(mapStateToProps)(Search);
  
