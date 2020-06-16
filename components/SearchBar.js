import React from 'react'

import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Animated, { Easing } from 'react-native-reanimated'
import { FlatList } from 'react-native-gesture-handler'
const { Value, timing } = Animated


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


class SearchBar extends React.Component {

  constructor(props){
    super(props)

    // state
    this.state = {
      isFocused: false,
      searchKey: '',
      data : this.props.companySymbol,
      filteredData : this.props.companySymbol}

    // animation values
    this._input_box_translate_x = new Value(width)
    this._back_button_opacity = new Value(0)
    this._content_translate_y = new Value(height)
    this._content_opacity = new Value(0)
  }

  _onFocus = () => {
    // update state
    this.setState({isFocused: true})
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }
    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease)
    }

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }
    const content_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease)
    }

    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start()
    timing(this._back_button_opacity, back_button_opacity_config).start()
    timing(this._content_translate_y, content_translate_y_config).start()
    timing(this._content_opacity, content_opacity_config).start()

    // force focus
    this.refs.input.focus()

  }
  // componentWillMount(){
  //   this.startHeaderHeight = 80
  //   if(Platform.OS == 'android'){
  //     this.startHeaderHeight = 100 + StatusBar.currentHeight
  //   }
// 

  _onBlur = () => {
    // update state
    this.setState({isFocused: false})
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: width,
      easing: Easing.inOut(Easing.ease)
    }
    const back_button_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }

    // content
    const content_translate_y_config = {
      duration: 200,
      toValue: height,
      easing: Easing.inOut(Easing.ease)
    }
    const content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }

    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start()
    timing(this._back_button_opacity, back_button_opacity_config).start()
    timing(this._content_translate_y, content_translate_y_config).start()
    timing(this._content_opacity, content_opacity_config).start()

    // force blur
    this.refs.input.blur();

  }

  handleSearch = (value) => {
      const filteredData = this.state.data.filter(item=>
        item.symbol.toLowerCase().includes(value.toLowerCase()))
    this.setState({filteredData, searchKey: value} )
  }

  render(){
    return (
      <>
        <SafeAreaView style={styles.header_safe_area}>
          <View style={styles.header}>
            <View style={styles.header_inner}>
              <View>
                {/* <Image 
                  source={require('../Assets/Facebook-Logo.png')} 
                  style={{width: 152, height: 30}}
                /> */}
              </View>
              <TouchableHighlight
                activeOpacity={1}
                underlayColor={"#ccd0d5"}
                onPress={this._onFocus}
                style={styles.search_icon_box}
              >
                <Icon name="search" size={22} color="#000000" />
              </TouchableHighlight>
              <Animated.View
                style={[ styles.input_box, {transform: [{translateX: this._input_box_translate_x}] } ]}
              >
                <Animated.View style={{opacity: this._back_button_opacity}}>
                  <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={"#ccd0d5"}
                    onPress={this._onBlur}
                    style={styles.back_icon_box}
                  >
                    <Icon name="chevron-left" size={22} color="#000000" />
                  </TouchableHighlight>
                </Animated.View>
                <KeyboardAvoidingView style={styles.keybord}
                keyboardVerticalOffset={-500} behavior="padding">
                  <TextInput 
                    ref="input"
                    placeholder="Search Symbol"
                    clearButtonMode="always"
                    value={this.state.keyword}
                    onChangeText={this.handleSearch}
                    style={styles.input}
                  />
                </KeyboardAvoidingView>
              </Animated.View>
            </View>
          </View>
        </SafeAreaView>

        <Animated.View style={[styles.content, { opacity: this._content_opacity, transform: [{translateY: this._content_translate_y }] }]}>
          <SafeAreaView style={styles.content_safe_area}>
            <View style={styles.content_inner}>
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
        </Animated.View>
      </>
    )
  }
}

export default SearchBar;

const styles = StyleSheet.create({
  header_safe_area: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header: {
    height: 50,
    paddingHorizontal: 16
  },
  header_inner: {
    flex:1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    // height: this.startHeaderHeight
  },
  search_icon_box: {
    width:40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#e4e6eb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input_box: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top:0,
    left:0,
    backgroundColor: 'white',
    width: width - 32
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  keybord:{
    width: '100%',
    margin: 5
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#e4e6eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15
  },
  content: {
    width: width,
    height: height,
    position:'absolute',
    left: 0,
    bottom: 0,
    zIndex: 999
  },
  content_safe_area: {
    flex: 1,
    backgroundColor: 'white'
  },
  content_inner: {
    flex: 1,
    paddingTop: 100
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
