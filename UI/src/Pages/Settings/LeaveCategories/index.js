import {selectors} from '../../../redux/reducer';
import LeaveCategoriesPage from './leavecategories.page';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchLeaveCategoriesAsync} from '../../../redux/actions/leaveCategoriesPage.actions';

const mapStoreToProps = (store) =>{
    return{
        leaveCategories: selectors.getLeaveCategoriesData(store),
        isLoading: selectors.getLeaveCategoriesLoaded(store),
        errors: selectors.getLeaveCategoriesError(store)
    }
};

const mapActionsToProps = dispatch => bindActionCreators({
    fetchLeaveCategoriesAsync 
},dispatch);

export default connect(mapStoreToProps, mapActionsToProps)(LeaveCategoriesPage);