import axios from 'axios';

const BASE_URL = "https://finnhub.io/api/v1";
const API_KEY = "bqgom8nrh5r8lcmqaa10"


export function createSymbol(){
    return async(dispatch) =>{
        const symbol_url = `${BASE_URL}/stock/symbol`;
        try{
            const result = await axios(symbol_url, {params: {
                exchange: 'US',
                token: API_KEY
            }})
            dispatch({type: 'CREATE_SYMBOL', payload: result.data})
        }catch(error){

        }
    }
}

function FormatDate(date){
    var year = date.getFullYear();              
    var month = (1 + date.getMonth());          
    month = month >= 10 ? month : '0' + month;  
    var day = date.getDate();                   
    day = day >= 10 ? day : '0' + day;          
    return  year + '-' + month + '-' + day;
}

export function createNews(){
    return async (dispatch) =>{
        const news_url = `${BASE_URL}/news`;
        try{
            const news = await axios(news_url, {params: {
                category: 'general',
                token: API_KEY
            }})
            dispatch({type: 'CREATE_NEWS', payload: news.data});
        }catch(error){
        }
    }
}

export function createStockInfo(company){
    return async (dispatch) => {
        const stockinfo_url = `${BASE_URL}/quote`
        try{
            const quote = await axios(stockinfo_url, {params:{
                symbol: company,
                token: API_KEY
            }})
            quote.data.ticker = company
            quote.data.num = (quote.data.c-quote.data.pc).toFixed(2)
            quote.data.per = ((quote.data.c-quote.data.pc)/quote.data.pc*100).toFixed(2)
            dispatch({type: 'CREATE_STOCKINFO',payload: quote.data})
        }catch(error){

        }
    }
}

export function createStockPrice(company){
    return async (dispatch) =>{
        const stockprice_url = `${BASE_URL}/stock/candle`;
        try{
            let minus = 30*24*60*60
            const toDate = Math.floor(Date.now() / 1000)
            const fromDate = toDate - minus
            const stock = await axios(stockprice_url, {params: {
                symbol: company,
                resolution: 'D',
                from : fromDate,
                to: toDate,
                token: API_KEY
            }})
            stock.data["ticker"] = company; 
            dispatch({type: 'CREATE_STOCKPRICE', payload: stock.data});
        }catch(error){
        }
    }
}


export function addWishList(company){
    return async (dispatch) =>{
        try{
            dispatch({type: 'ADD_WISHLIST', payload: company});
        }catch(error){
        }
    }
}
