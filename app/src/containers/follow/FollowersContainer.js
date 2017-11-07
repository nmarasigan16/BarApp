import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Page from '../../components/largeHeaderPage/PageComponent';
import FollowRow from '../../components/follow/FollowRow';
import profileActions from "../../actions/profileActions";

class FollowersContainer extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            username: props.username,
            followers: props.followers,
        };
        this.onRowPress = this.onRowPress.bind(this);
    };

    static navigationOptions = {
        tabBarLabel: 'Followers',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name={'users'}
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
        this.setState((prevState, props) => {
            return Object.assign({}, prevState, {
                followers: nextProps.followers
            });
        });
    };

    getName() {
        return {
            name: 'Followers',
            username: this.state.username
        };
    };

    _keyExtractor = (item, index) => {
        return item.id;
    };

    _renderItem = ({item}) => {
        return(
            <FollowRow
                name={item.login}
                image={item.avatar_url}
                onClick={this.onRowPress}
            />
        )
    }

    onRowPress(name) {
        this.props.changeUser(name);
        this.props.navigation.navigate('Profile');
    };

    render() {
        const { followers } = this.state;
        return (
            <Page name={this.getName()}>
                <FlatList
                    data={followers}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
            </Page>
        );
    };

}

function mapStateToProps(state) {
    return {
        username: state.profile.profile.login,
        followers: state.profile.followers
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(profileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowersContainer)
