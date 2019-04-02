import {selectors} from '../../../redux/reducer';
import HolidaysListPage from './holidaysList.page';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchHolidaysListAsync, createHolidayAsync, updateHolidayAsync, deleteHolidayAsync} from '../../../redux/actions/holidaysPage.actions';
import {fetchLocationsAsync} from '../../../redux/actions/locationsPage.actions';

const mapStoreToProps = (store) => {
    return{
        isLoading: selectors.getHolidaysLoaded(store),
        isAjaxProcessing: selectors.getHolidaysIsAjaxProcessing(store),
        holidays: selectors.getHolidaysData(store).holidays,
        locations: selectors.getLocationsData(store).locations,
        isLocationsListLoading: selectors.getLocationsLoaded(store),
        createHolidayResponse: selectors.getHolidaysData(store).createResponse,
        updateHolidayResponse: selectors.getHolidaysData(store).updateResponse,
        deleteHolidayResponse: selectors.getHolidaysData(store).deleteResponse,
        error: selectors.getHolidaysError(store)
    }
};

const mapActionsToProps = dispatch => bindActionCreators({
    fetchHolidaysListAsync,
    fetchLocationsAsync,
    createHolidayAsync,
    updateHolidayAsync,
    deleteHolidayAsync
},dispatch);

export default connect(mapStoreToProps, mapActionsToProps)(HolidaysListPage);