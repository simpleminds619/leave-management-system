import {actions} from '../reducer';
import appConfig from '../../AppConfig';
import axios from 'axios';

const fetchLocationsAsync = () =>{
    let url = appConfig.LmsApiBaseEndpoint+"locations.list"
    return (dispatch)=>{        
        dispatch(actions.setLocationsLoaded(true))
        axios.post(url).then((response)=>{
            dispatch(actions.setLocationsData({locations:response.data.locations}));
        }).catch((error)=>{
            dispatch(actions.setLocationsError(error));
        }).finally(()=>{
            dispatch(actions.setLocationsLoaded(false))
        })
    }
}

export {fetchLocationsAsync};