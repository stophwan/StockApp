import  React from 'react';
import { SafeAreaView , StyleSheet, Text, View, Dimensions } from 'react-native';
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

export default function Chart({stockprice}){
    return(
        <View style={{ height: 300, flexDirection: 'row' }}>
            <AreaChart
            start= {stockprice.c[0]}
            style={{flex: 1 }}
            data={stockprice.c}
            contentInset={{ top: 30, bottom: 30 }}
            curve={shape.curveNatural}
            svg={{ fill: '#A5C882' }}
                >
            <Grid />
            </AreaChart>
        </View>
    )
}
