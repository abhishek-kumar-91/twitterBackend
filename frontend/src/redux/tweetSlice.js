import {createSlice} from "@reduxjs/toolkit";

const tweetSlice = createSlice ({
    name: "tweet",
    initialState: {
        tweets:null,
        refresh:false,
        isActive: true
    },

    reducers:{
        //actions

        getAllTweets:(state, action) => {
            state.tweets = action.payload
        },
        getReferesh: (state) => {
            state.refresh = !state.refresh
        },
        getIsActive: (state, action) => {
            state.isActive = action.payload
        }
       
    }
})


export const {getAllTweets, getReferesh, getIsActive} = tweetSlice.actions;
export default tweetSlice.reducer;