import React, { Component } from 'react';
import {
    Button,
    Linking,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticate, handleUrl } from "../../lib/authenticate";
import authActions from '../../actions/authActions'
import profileActions from '../../actions/profileActions';

class HomeButtonComponent extends Component {
    constructor(props){
        super(props);
        this.loggedOnPress = this.loggedOnPress.bind(this);
        this.loginPress = this.loginPress.bind(this);
        this._handleOpenURL = this._handleOpenURL.bind(this);
        const {height, width} = Dimensions.get('window');
        this.state = {
            width: width,
            height: height,
            authUser: props.authUser
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.state.authUser !== nextProps.authUser){
            this.setState((prevState) => {
                return Object.assign({}, prevState, {
                    authUser: nextProps.authUser
                });
            });
        }
    }

    loggedOnPress() {
        const {
            profileActions,
        } = this.props;
        const {
            authUser
        } = this.state;
        profileActions.changeUser(authUser);
    }

    loginPress() {
        authenticate(this.props.navigate);
    }

    componentDidMount() {
        Linking.addEventListener('url', this._handleOpenURL);
        Dimensions.addEventListener('change', this._resize);
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this._handleOpenURL);
        Dimensions.removeEventListener('change', this._resize);
    }

    _resize(event) {
    }

    _handleOpenURL(event) {
        handleUrl(event.url, this.props.authActions.getToken);
    }

    render() {
        const {
            width,
            height,
            authUser
        } = this.state;
        const pressFunc = authUser ? this.loggedOnPress : this.loginPress;
        return (
            <Button
                style={{width: width, height: height/10}}
                title={authUser ? 'My Profile' : 'Login'}
                color={'#ffffff'}
                onPress={pressFunc}
            />
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        profileActions: bindActionCreators(profileActions, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        authUser: state.auth.authUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeButtonComponent);