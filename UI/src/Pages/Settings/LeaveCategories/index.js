import {selectors} from '../../../redux/reducer';
import LeaveCategoriesPage from './leavecategories.page';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchLeaveCategoriesAsync, createLeaveCategoryAsync, updateLeaveCategoryAsync, deleteLeaveCategoryAsync} from '../../../redux/actions/leaveCategoriesPage.actions';

const mapStoreToProps = (store) =>{
    return{
        leaveCategories: selectors.getLeaveCategoriesData(store).leaveCategories,
        isLoading: selectors.getLeaveCategoriesLoaded(store),
        errors: selectors.getLeaveCategoriesError(store),
        isAjaxProcessing: selectors.getLeaveCategoriesIsAjaxProcessing(store),
        newLeaveCategory: selectors.getLeaveCategoriesData(store).newLeaveCategory,
        updatedLeaveCategory: selectors.getLeaveCategoriesData(store).updatedLeaveCategory,
        deleteSucceded: selectors.getLeaveCategoriesData(store).deleteSucceded
    }
};

const mapActionsToProps = dispatch => bindActionCreators({
    fetchLeaveCategoriesAsync,
    createLeaveCategoryAsync,
    updateLeaveCategoryAsync,
    deleteLeaveCategoryAsync 
},dispatch);

export default connect(mapStoreToProps, mapActionsToProps)(LeaveCategoriesPage);