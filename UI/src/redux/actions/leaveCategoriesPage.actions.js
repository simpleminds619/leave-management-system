import leaveCategories from '../../data/leaveCategories';
import {actions} from '../reducer';

const fetchLeaveCategoriesAsync = () =>{
    return (dispatch)=>{
        dispatch(actions.setLeaveCategoriesLoaded(true));        
        dispatch(actions.setLeaveCategoriesData(leaveCategories));
        dispatch(actions.setLeaveCategoriesLoaded(false));
    }
}

export {fetchLeaveCategoriesAsync};