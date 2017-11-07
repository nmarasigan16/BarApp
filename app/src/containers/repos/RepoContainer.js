import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Page from '../../components/largeHeaderPage/PageComponent';
import RepoRow from '../../components/repos/RepoRowComponent';
import profileActions from '../../actions/profileActions';

class RepoContainer extends Component {
    constructor(props) {
        super(props);
        props.fetchRepos();
        this.state = {
            username: props.login,
            repo: props.repos
        };
    };

    static navigationOptions = {
        tabBarLabel: 'Repositories',
        tabBarIcon: ({tintColor }) => (
            <Icon
                name={'list'}
                size={30}
                color={'#24292e'}
            />
        ),
    };

    componentWillReceiveProps(nextProps) {
        if(this.state.username !== nextProps.username){
            this.setState((prevState, props) => {
                return Object.assign({}, prevState, {
                    username: props.login
                });
            });
        };
        this.setState((prevState, props) => {
            return Object.assign({}, prevState, {
                repos: props.repos
            });
        });
    };

    getName() {
        return ({
            name: 'Public Repositories',
            username: this.state.username
        });
    }

    _keyExtractor = (item, index) => {
        return item.id;
    }

    render() {
        const { repos } = this.state;
        return (
            <Page name={this.getName()}>
                <FlatList
                    data={repos}
                    renderItem={
                        ({item}) => {
                            console.log(item);
                            return(
                                <RepoRow
                                    name={item.name}
                                    owner={item.owner.login}
                                    description={item.description}
                                    link={item.html_url}
                                />);
                        }
                    }
                    keyExtractor={this._keyExtractor}
                />
            </Page>
        );
    }

};


function mapDispatchToProps(dispatch) {
    return bindActionCreators(profileActions, dispatch);
};

function mapStateToProps(state) {
    return {
        login: state.profile.profile.login,
        repos: state.profile.repos
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoContainer);
