import {actions} from '../reducer';
import appConfig from '../../AppConfig';
import axios from 'axios';

const fetchLeaveCategoriesAsync = () =>{
    let url = appConfig.LmsApiBaseEndpoint+"leavecategories.list"
    return (dispatch)=>{        
        dispatch(actions.setLeaveCategoriesLoaded(true));  
        axios.post(url).then((response)=>{
            dispatch(actions.setLeaveCategoriesData(response.data.leaveCategories));
        }).catch((error)=>{
            dispatch(actions.setLeaveCategoriesError(error));
        }).finally(()=>{
            dispatch(actions.setLeaveCategoriesLoaded(false));
        })
    }
}

const createLeaveCategoryAsyc = (leavecategory) =>{
    let url = appConfig.LmsApiBaseEndpoint+"leavecategory.create";
    return (dispatch) =>{
        dispatch(actions.setLeaveCategoriesLoaded(true));
        axios.post(url, leavecategory).then((response)=>{
            dispatch(actions.setLeaveCategoriesData(response.data.leaveCategory));
        }).catch((error)=>{
            dispatch(actions.setLeaveCategoriesError(error));
        }).finally(()=>{
            dispatch(actions.setLeaveCategoriesLoaded(false));
        })
    }
}

const updateLeaveCategoryAsyc = (leaveCategory) =>{
    let url = appConfig.LmsApiBaseEndpoint+"leavecategory.update";
    return (dispatch) =>{
        dispatch(actions.setLeaveCategoriesLoaded(true));
        axios.post(url, leaveCategory).then((response)=>{
            dispatch(actions.setLeaveCategoriesData(response.data.leaveCategory));
        }).catch((error)=>{
            dispatch(actions.setLeaveCategoriesError(error));
        }).finally(()=>{
            dispatch(actions.setLeaveCategoriesLoaded(false));
        })
    }
}

const deleteLeaveCategoryAsyc = (id) =>{
    let url = appConfig.LmsApiBaseEndpoint+"leavecategory.delete";
    return (dispatch) =>{
        dispatch(actions.setLeaveCategoriesLoaded(true));
        axios.post(url, {id}).then((response)=>{
            dispatch(actions.setLeaveCategoriesData(response.data));
        }).catch((error)=>{
            dispatch(actions.setLeaveCategoriesError(error));
        }).finally(()=>{
            dispatch(actions.setLeaveCategoriesLoaded(false));
        });
    }
}

export {fetchLeaveCategoriesAsync, createLeaveCategoryAsyc, updateLeaveCategoryAsyc, deleteLeaveCategoryAsyc};