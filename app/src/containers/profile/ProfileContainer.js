import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ScrollView
} from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Bio from '../../components/profile/bio/BioComponent';
import Followers from '../../components/profile/followers/FollowersComponent';
import Repo from '../../components/profile/repos/RepoComponent';
import Page from '../../components/largeHeaderPage/PageComponent';
import profileActions from '../../actions/profileActions';


class ProfileContainer extends Component {
    constructor(props) {
        super(props);
        this.props.fetchProfile();
        this.state = {
            profile: props.profile,
            username: props.username
        };
    };

    static navigationOptions = {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name={'user'}
                size={30}
                color={'#24292e'}
            />
        ),
    };

    componentWillReceiveProps(nextProps) {
        if(this.state.profile.login !== nextProps.profile.login){
            this.setState((prevState, props) => {
                return Object.assign({}, prevState, {
                    profile: nextProps.profile,
                    username: nextProps.username
                });
            });
        };
    };

    getName() {
        const {
            name,
            login
        } = this.state.profile
        return (
            {
                name: name,
                username: login
            }
        );
    };



    getBio() {
        const {
            bio,
            website,
            email
        } = this.state.profile
        return (
            {
                bio: bio,
                website: website,
                email: email,
            }
        );
    };

    imageUri() {
        return this.state.profile.avatar_url;
    };

    render() {
        const {
            public_repos,
            followers,
            following
        } = this.state.profile;

        const { navigate } = this.props.navigation;

        return (
            <Page name={this.getName()} image={this.imageUri()} onLayout={this.onLayout}>
                <ScrollView style={{flexGrow:1}}>
                    <View style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between'}}>
                        <Bio props={this.getBio()}/>
                        <Repo repos={public_repos} navigate={navigate}/>
                        <Followers follow={{follows: following, followers:following}} navigate={navigate}/>
                    </View>
                </ScrollView>
            </Page>
        );
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(profileActions, dispatch);
};

function mapStateToProps(state) {
    return {
        profile: state.profile.profile,
        username: state.profile.username,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
