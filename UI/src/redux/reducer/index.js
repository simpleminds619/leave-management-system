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
        },
        Locations:{
           data:{
                locations:[]
           },
           loaded:false,
           error:null
        },
        Holidays:{
            data:{
                holidays:[],
                createResponse:null,
                updateResponse:null,
                deleteResponse:null
            },
            loaded:false,
            error:null,
            isAjaxProcessing:false
        }
    }
});

export {selectors, actions};

const rootReducer = combineReducers({superReducer});

export default rootReducer;