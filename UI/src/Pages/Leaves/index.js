import {selectors} from '../../redux/reducer';
import {fetchLeaveHistoryAsync, applyLeaveAsync, fetchLeaveBankDataAsync} from '../../redux/actions/leavesPage.actions';
import {fetchLeaveCategoriesAsync} from '../../redux/actions/leaveCategoriesPage.actions';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import LeavesPage from './leaves.page';

const mapStoreToProps = (store) => {
    return {
        isLoading: !selectors.getLeavePageLoaded(store) || selectors.getLeavePageIsAjaxProcessing(store),
        isLeaveBankDataLoading: selectors.getLeavePageIsLeaveBankLoading(store),
        leaves: selectors.getLeavePageData(store).leaves,
        error: selectors.getLeavePageError(store),
        leaveCategories: selectors.getLeaveCategoriesData(store).leaveCategories,
        applyLeaveResponse: selectors.getLeavePageData(store).applyLeaveResponse,
        leaveBankResponse: selectors.getLeavePageData(store).leaveBank
    }
}

const mapActionsToProps = dispatch => bindActionCreators({
    fetchLeaveCategoriesAsync,
    fetchLeaveHistoryAsync,
    applyLeaveAsync,
    fetchLeaveBankDataAsync
}, dispatch);

export default connect(mapStoreToProps, mapActionsToProps)(LeavesPage);