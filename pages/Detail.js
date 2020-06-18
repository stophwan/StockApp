import  React, {useEffect} from 'react';
import { SafeAreaView , StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import {createStockInfo} from "../actions";
import {createStockPrice} from "../actions";
import Chart from '../components/Chart'

export default function Detail({route}) {
    const {company} = route.params;
    const stockinfo = useSelector(state=>state.stockinfo)
    const stockprice = useSelector(state=>state.stockprice)
    const dispatch = useDispatch();

    useEffect(() => {

        if(stockinfo){
          if(company !== stockinfo.ticker){
            dispatch((createStockInfo(company)));
          }
          else{
            return;
          } 
        }
        else{
        dispatch((createStockInfo(company)));
        }
  
        if(stockprice){
          if(company !== stockprice.ticker){
            dispatch((createStockPrice(company)));
          }
          else{
            return;
          }
        }
        else{
          dispatch((createStockPrice(company)))
        }
  
      });

    return (
    <>
    {stockinfo && stockprice &&
    <ScrollView>
      <View style={styles.name_view}>
        <Text style={styles.name_text}>{company}</Text>
        <Text style={styles.stock_toptext}>{stockinfo.c}</Text>
        <View style={styles.colored}>
            {contarst_color(stockinfo.num, stockinfo.per)}
        </View>
        <View style={styles.chart}> 
            <Chart stockprice={stockprice}/>
        </View>

      </View>
      <View style={styles.stock_view}>
        <Text style={styles.stock_text}>Key statistics</Text>
        <View style={styles.row_view}>
          <View>
              <Text style={styles.key_text}>Prev close</Text>
              <Text style={styles.value_text}>{stockinfo.pc}</Text>
          </View>
          <View style={styles.o}>
              <Text style={styles.key_text}>Open</Text>
              <Text style={styles.value_text}>{stockinfo.o}</Text>
          </View>
      </View>
      <View style={styles.row_view}>
          <View>
              <Text style={styles.key_text}>Low</Text>
              <Text style={styles.value_text}>{stockinfo.l}</Text>
          </View>
          <View style={styles.h}>
              <Text style={styles.key_text}>High</Text>
              <Text style={styles.value_text}>{stockinfo.h}</Text>
          </View>
      </View>
      </View>
    </ScrollView>
    }
    </>
    );
}

function contarst_color(c,contrast_num, contrast_per){
    if(contrast_num>0){
      return(
        <View>
          <Text style={{color: '#0000FF'}}>{contrast_num} ({contrast_per}%)</Text>
        </View>
      )
    }
    else{
      return(
        <View>
            <Text style={{color: '#DC143C'}}>{contrast_num} ({contrast_per}%)</Text>
        </View>
      )
    }
  }

const styles = StyleSheet.create({
    name_view:{
        backgroundColor: 'white',
        paddingTop: 10,
        height: 500
    },
    name_text: {
        fontSize: 24,
        fontWeight: '700',
        paddingHorizontal: 20
    },
    stock_toptext: {
        fontSize: 48,
        fontWeight: '700',
        paddingHorizontal: 20
    },
    chart:{
        height: 200,
    },
    colored:{
        paddingHorizontal: 20
    },
    stock_view:{
        height: 300,
        marginTop: 20, 
        backgroundColor: 'white'
    },
    stock_text:{
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 30
    },
    row_view:{
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    key_text:{
        fontWeight: 'bold',
        fontSize: 16
    },
    value_text:{
        fontSize: 20
    },
    o:{
        paddingHorizontal: 70
    },
    h:{
        paddingHorizontal: 95
    }
  })
