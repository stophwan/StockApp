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