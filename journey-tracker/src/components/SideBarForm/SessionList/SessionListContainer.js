import { connect } from 'react-redux';
import SessionList from './SessionList'
import { requestSessions } from '../../../actions';

const mapStateToProps = (state, ownProps) => ({
    mapMode: state.mapMode,
    sessionsFetched: state.sessions.sessionsFetched,
    sessions: state.sessions.sessionList,
    selectedSessions: ownProps.selectedSessions,
    editSessionList: ownProps.editSessionList,
    id:ownProps.id
});

const mapDispatchToProps = dispatch => ({
    requestSessions: () => dispatch(requestSessions())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionList);