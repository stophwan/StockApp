import produce from 'immer'

const baseState = {
    symbols: null,
    news: null
}

const reducer = produce((state,action)=>{
    switch(action.type){
        case "CREATE_SYMBOL":
            state.symbols = action.payload
            break;
    }
    switch(action.type){
        case "CREATE_NEWS":
            state.news = action.payload
            break;
    }
}, baseState)

export default reducer;