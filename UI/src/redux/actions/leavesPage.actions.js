import { actions } from '../reducer';
import axios from 'axios';
import appConfig from '../../AppConfig';


const fetchLeaveHistoryAsync = (userId) =>{
    var url = appConfig.LmsApiBaseEndpoint + "leaves.list"
    return dispatch =>{
        dispatch(actions.setLeavePageLoaded(false));
        axios.post(url, {userId})
            .then(response=>{
                dispatch(actions.setLeavePageData({leaves:response.data.leaves}));
            })
            .catch(error=>{
                dispatch(actions.setLeavePageError(error));
            })
            .finally(()=>{
                dispatch(actions.setLeavePageLoaded(true));
            })
    }
}

const applyLeaveAsync = (leave) =>{
    var url = appConfig.LmsApiBaseEndpoint + "leave.apply"
    return dispatch =>{
        dispatch(actions.setLeavePageIsAjaxProcessing(true));
        axios.post(url,leave)
            .then(response=>{
                dispatch(actions.setLeavePageData({applyLeaveResponse:response.data.leave}));            })
            .catch(error=>{
                dispatch(actions.setLeavePageError(error));
                console.log(error);
            })
            .finally(()=>{
                dispatch(actions.setLeavePageIsAjaxProcessing(false));
            })
    }
}

const fetchLeaveBankDataAsync = userId => {
    var url = appConfig.LmsApiBaseEndpoint + "leaves.userLeaveBank"
    return dispatch => {
        dispatch(actions.setLeavePageIsLeaveBankLoading(true));
        axios.post(url,{userId})
            .then(response=>{
                dispatch(actions.setLeavePageData({leaveBank:response.data.leaveBank}));
            })
            .catch(error=>{
                dispatch(actions.setLeavePageError(error));
                console.log(error);
            })
            .finally(()=>{
                dispatch(actions.setLeavePageIsLeaveBankLoading(false));
            })
    }
}

export {fetchLeaveHistoryAsync, applyLeaveAsync, fetchLeaveBankDataAsync}