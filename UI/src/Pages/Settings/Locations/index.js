import {selectors} from '../../../redux/reducer';
import LocationsPage from './Locations.page';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchLocationsAsync} from '../../../redux/actions/locationsPage.actions';

const mapStoreToProps = (store) => {
    return{
        isLoading: selectors.getLocationsLoaded(store),
        locations: selectors.getLocationsData(store).locations,
        error: selectors.getLocationsError(store)
    };
}

const mapActionsToProps = dispatch => bindActionCreators({
    fetchLocationsAsync
},dispatch);

export default connect(mapStoreToProps,mapActionsToProps)(LocationsPage);