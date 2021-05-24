import {connect} from 'react-redux';
import NavBar from '../components/NavBar';

export const mapStateToProps = state=>({
    currentUser: state.currentUser.username
})

export default connect(
    mapStateToProps
)(NavBar)