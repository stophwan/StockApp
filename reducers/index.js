import produce from 'immer'

const baseState = {
    companySymbol: null,
    wishlist: [] ,
    news: null,
    stockinfo: null,
    stockprice: null
}

const reducer = produce((state,action)=>{
    switch(action.type){
        case "CREATE_SYMBOL":
            state.companySymbol = action.payload
            break;
        case "CREATE_NEWS":
            state.news = action.payload
            break;
        case "CREATE_STOCKINFO":
            state.stockinfo = action.payload
            break;
        case "CREATE_STOCKPRICE":
            state.stockprice = action.payload
            break;
        case "ADD_WISHLIST":
            state.wishlist.push(action.payload);
    }
}, baseState)

export default reducer;