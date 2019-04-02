import {actions} from '../reducer';
import appConfig from '../../AppConfig';
import axios from 'axios';

const fetchLeaveCategoriesAsync = () =>{
    let url = appConfig.LmsApiBaseEndpoint+"leavecategories.list"
    return (dispatch)=>{        
        dispatch(actions.setLeaveCategoriesLoaded(true));  
        dispatch(actions.setLeaveCategoriesIsAjaxProcessing(true));  
        axios.post(url).then((response)=>{
            dispatch(actions.setLeaveCategoriesData({leaveCategories:response.data.leaveCategories}));
        }).catch((error)=>{
            dispatch(actions.setLeaveCategoriesError(error));
        }).finally(()=>{
            dispatch(actions.setLeaveCategoriesLoaded(false));
            dispatch(actions.setLeaveCategoriesIsAjaxProcessing(false));  
        })
    }
}

const createLeaveCategoryAsync = (leavecategory) =>{
    let url = appConfig.LmsApiBaseEndpoint+"leavecategory.create";
    return (dispatch) =>{
        dispatch(actions.setLeaveCategoriesIsAjaxProcessing(true));
        axios.post(url, leavecategory).then((response)=>{
            dispatch(actions.setLeaveCategoriesData({newLeaveCategory: response.data.leaveCategory}));
        }).catch((error)=>{
            dispatch(actions.setLeaveCategoriesError(error));
        }).finally(()=>{
            dispatch(actions.setLeaveCategoriesIsAjaxProcessing(false));
        })
    }
}

const updateLeaveCategoryAsync = (leaveCategory) =>{
    let url = appConfig.LmsApiBaseEndpoint+"leavecategory.update";
    return (dispatch) =>{
        dispatch(actions.setLeaveCategoriesIsAjaxProcessing(true));
        axios.post(url, leaveCategory).then((response)=>{
            dispatch(actions.setLeaveCategoriesData({updatedLeaveCategory: response.data.leaveCategory}));
        }).catch((error)=>{
            dispatch(actions.setLeaveCategoriesError(error));
        }).finally(()=>{
            dispatch(actions.setLeaveCategoriesIsAjaxProcessing(false));
        })
    }
}

const deleteLeaveCategoryAsync = (id) =>{
    let url = appConfig.LmsApiBaseEndpoint+"leavecategory.delete";
    return (dispatch) =>{
        dispatch(actions.setLeaveCategoriesIsAjaxProcessing(true));
        axios.post(url, {id}).then((response)=>{
            dispatch(actions.setLeaveCategoriesData({deleteSucceded: response.data.leaveCategory}));
        }).catch((error)=>{
            dispatch(actions.setLeaveCategoriesError(error));
        }).finally(()=>{
            dispatch(actions.setLeaveCategoriesIsAjaxProcessing(false));
        });
    }
}

export {fetchLeaveCategoriesAsync, createLeaveCategoryAsync, updateLeaveCategoryAsync, deleteLeaveCategoryAsync};