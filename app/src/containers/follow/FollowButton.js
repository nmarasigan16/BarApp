import React, { Component } from 'react';
import {
    Button
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import profileActions from '../../actions/profileActions';

class FollowButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            followStatus: props.followStatus,
            loggedIn: props.loggedIn
        };
        this.onFollowPress = this.onFollowPress.bind(this);
        this.onUnfollowPress = this.onUnfollowPress.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.followStatus !== nextProps.followStatus){
            this.setState({
                followStatus: nextProps.followStatus
            });
        }
        if(this.state.loggedIn !== nextProps.loggedIn) {
            this.setState({
                loggedIn: nextProps.loggedIn
            });
        }
    }

    onFollowPress() {
        this.props.profileActions.follow();
    }

    onUnfollowPress() {
        this.props.profileActions.unfollow();
    }

    render() {
        const {
            followStatus,
            loggedIn
        } = this.state;
        let pressFunc = () => {
        };
        let title = '';
        switch (followStatus) {
            case 1: {
                title = 'Unfollow';
                pressFunc = this.onUnfollowPress;
                break;
            }
            case 0: {
                title = 'Follow';
                pressFunc = this.onFollowPress;
                break;
            }
            case -1: {
                return null;
            }
            default: {
                return null;
            }
        }
        if(!loggedIn){
            return null
        }
        return (
            <Button
                title={title}
                onPress={pressFunc}/>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(profileActions, dispatch)
    }
}


function mapStateToProps(state) {
    return {
        followStatus: state.profile.followStatus,
        loggedIn: state.auth.authUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);