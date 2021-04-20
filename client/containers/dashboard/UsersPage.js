import React, { Component } from 'react';

// Import custom components
import UsersPage from '../../components/dashboard/UsersPage';
import {connect} from "react-redux";
import * as crudActions from "../../actions/crudAction";
import {bindActionCreators} from "redux";
import {USERS} from "../../constants/entity";

class UsersPageContainer extends Component {
    constructor(props) {
        super(props);
        console.log('users', props.users);
    }

    componentDidMount() {
        this.props.actions.fetchAll(USERS);
    }

    render() {
        return <UsersPage users={this.props.users} actions={this.props.actions}/>;
    }
}

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => ({
    users: state.entities.users,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Object.assign({}, crudActions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPageContainer);
