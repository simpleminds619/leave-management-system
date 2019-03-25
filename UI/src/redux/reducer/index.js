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
            data:{ 
                    leaveCategories:[], 
                    newLeaveCategory:null,
                    updatedLeaveCategory:null,
                    deleteSucceded:false
                },
            loaded:false,
            error:null,
            isAjaxProcessing: false
        }
    }
});

export {selectors, actions};

const rootReducer = combineReducers({superReducer});

export default rootReducer;