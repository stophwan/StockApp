import React, {useEffect, useState} from 'react';
import { SafeAreaView, 
    Text,
    TextInput, 
    View,
    Dimensions,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createSymbol } from '../actions';

// export default function Search() {

//     const symbols = useSelector(state => state.symbols)
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(createSymbol());
//     });

//     const [value, setValue] = useState("")
//     return (
//       <View style={{ flexDirection: 'row', padding: 10,
//         backgroundColor:'white', marginHorizontal: 20,
//         shadowOffset: {width:0, height:0},
//         shadowColor: 'black',
//         shadowOpacity: 0.2,
//         elevation:1,
//         marginTop: Platform.OS == 'android' ? 30: null
//        }}>
//         <TextInput
//         style={{ flex: 1, fontWeight: '700',
//          backgroundColor: 'white' }}
//         underlineColorAndroid="transparent"
//         placeholder="Search Symbol"
//         placeholderTextColor="grey"/>
//       </View>
//     );
// }

class Search extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            isFocused: false,
            keyword: ''
        }
    }
    render(){
        return (
            <>
            <View>
                <TextInput
                style={{ flex: 1, fontWeight: '700',
                backgroundColor: 'white' }}
                underlineColorAndroid="transparent"
                placeholder="Search Symbol"
                placeholderTextColor="grey"
                value = {this.state.keyword}
                onChangeText={(value) => this.setState({keyword: value})}
                />
            </View>
            <View>
                {
                    this.state.keyword === ''
                    ?
                    <View>
                        <Text>Enter few world</Text>
                    </View>
                    :
                    <ScrollView>
                        <View>
                            <Text>123</Text>
                        </View>
                        <View>
                            <Text>423</Text>
                        </View>
                        <View>
                            <Text>323</Text>
                        </View>
                        <View>
                            <Text>323</Text>
                        </View>
                        <View>
                            <Text>223</Text>
                        </View>
                        
                    </ScrollView>

                }
            </View>
            </>
        )
    }
}

export default Search;