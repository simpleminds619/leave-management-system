import {selectors} from '../../redux/reducer';
import {fetchLeaveHistoryAsync, applyLeaveAsync, fetchLeaveBankDataAsync} from '../../redux/actions/leavesPage.actions';
import {fetchLeaveCategoriesAsync} from '../../redux/actions/leaveCategoriesPage.actions';
import {fetchHolidaysListAsync} from '../../redux/actions/holidaysPage.actions';
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
        leaveBankResponse: selectors.getLeavePageData(store).leaveBank,
        holidaysList: selectors.getHolidaysData(store).holidays,
        isHolidaysListLoading: selectors.getHolidaysIsAjaxProcessing(store),
    }
}

const mapActionsToProps = dispatch => bindActionCreators({
    fetchLeaveCategoriesAsync,
    fetchLeaveHistoryAsync,
    applyLeaveAsync,
    fetchLeaveBankDataAsync,
    fetchHolidaysListAsync
}, dispatch);

export default connect(mapStoreToProps, mapActionsToProps)(LeavesPage);