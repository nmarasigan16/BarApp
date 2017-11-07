import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Page from '../../components/largeHeaderPage/PageComponent';

class FollowingContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: props.username
        };
    };

    static navigationOptions = {
        tabBarLabel: 'Following',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name={'user-plus'}
                size={30}
                color={'#24292e'}
            />
        ),
    };

    componentWillReceiveProps(nextProps) {
        if(this.state.username !== nextProps.username){
            this.setState((prevState, props) => {
                return Object.assign({}, prevState, {
                    username: props.username
                });
            });
        };
    };

    getName() {
        return {
            name: 'Following',
            username: this.state.username
        };
    };

    render() {
        return (
            <Page name={this.getName()}>

            </Page>
        );
    };

};

function mapStateToProps(state) {
    return {
        username: state.profile.profile.login
    };
};

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowingContainer)
