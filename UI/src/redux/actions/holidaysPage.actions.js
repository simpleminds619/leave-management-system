import {actions} from '../reducer';
import appConfig from '../../AppConfig';
import axios from 'axios';

const fetchHolidaysListAsync = () =>{
    let url = appConfig.LmsApiBaseEndpoint+"holidays.list"
    return (dispatch)=>{        
        dispatch(actions.setHolidaysLoaded(true));
        dispatch(actions.setHolidaysIsAjaxProcessing(true))
        axios.post(url).then((response)=>{
            dispatch(actions.setHolidaysData({holidays:response.data.holidays}));
        }).catch((error)=>{
            dispatch(actions.setHolidaysError(error));
        }).finally(()=>{
            dispatch(actions.setHolidaysLoaded(false));
            dispatch(actions.setHolidaysIsAjaxProcessing(false))
        })
    }
}

const createHolidayAsync = (holiday) =>{
    let url = appConfig.LmsApiBaseEndpoint+"holiday.create"
    console.log(url);
    return (dispatch)=>{        
        dispatch(actions.setHolidaysLoaded(true));
        dispatch(actions.setHolidaysIsAjaxProcessing(true))
        axios.post(url, holiday).then((response)=>{
            console.log(response);
            dispatch(actions.setHolidaysData({createResponse:response.data.holiday}));
        }).catch((error)=>{
            console.log(error);
            dispatch(actions.setHolidaysError(error));
        }).finally(()=>{
            dispatch(actions.setHolidaysLoaded(false));
            dispatch(actions.setHolidaysIsAjaxProcessing(false))
        })
    }
}

const updateHolidayAsync = (holiday) =>{
    let url = appConfig.LmsApiBaseEndpoint+"holiday.update"
    return (dispatch)=>{        
        dispatch(actions.setHolidaysLoaded(true));
        dispatch(actions.setHolidaysIsAjaxProcessing(true))
        axios.post(url, holiday).then((response)=>{
            dispatch(actions.setHolidaysData({updateResponse:response.data.holiday}));
        }).catch((error)=>{
            dispatch(actions.setHolidaysError(error));
        }).finally(()=>{
            dispatch(actions.setHolidaysLoaded(false));
            dispatch(actions.setHolidaysIsAjaxProcessing(false))
        })
    }
}

const deleteHolidayAsync = (holidayId) =>{
    let url = appConfig.LmsApiBaseEndpoint+"holiday.delete"
    return (dispatch)=>{        
        dispatch(actions.setHolidaysLoaded(true));
        dispatch(actions.setHolidaysIsAjaxProcessing(true))
        axios.post(url, {holidayId}).then((response)=>{
            dispatch(actions.setHolidaysData({deleteResponse:response.data.holiday}));
        }).catch((error)=>{
            dispatch(actions.setHolidaysError(error));
        }).finally(()=>{
            dispatch(actions.setHolidaysLoaded(false));
            dispatch(actions.setHolidaysIsAjaxProcessing(false))
        })
    }
}

export {fetchHolidaysListAsync, createHolidayAsync, updateHolidayAsync, deleteHolidayAsync};