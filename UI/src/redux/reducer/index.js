import reduxCornell from 'redux-cornell';
import {combineReducers} from 'redux';

const {selectors, actions, superReducer} = reduxCornell({
    initialState : {
        HomePage:{
            data:{
                message:"Welcome message from configured store...!!!",
            },           
            loaded:false
        },
        LeaveCategories:{
            data:[],
            loaded:true,
            error:null
        }
    }
});

export {selectors, actions};

const rootReducer = combineReducers({superReducer});

export default rootReducer;