import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { starRepo, unstarRepo, removeFromRepos } from "../../actions/profileActions";
import ProfileContainer from "../profile/ProfileContainer";

class RepoStar extends Component {
    constructor(props){
        super(props);
        this.state = {
            starred: props.starredRepos,
        };
        this.handleRepoStar = this.handleRepoStar.bind(this);
        this.handleRepoUnstar = this.handleRepoUnstar.bind(this);
        this.inStarredRepos = this.inStarredRepos.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            starred: nextProps.starredRepos
        });
    }

    handleRepoStar() {
        const {
            repo,
            star
        } = this.props;
        star(repo);
        let newRepos = this.state.starred.slice(0);
        newRepos.push(repo);
        this.setState({
            starred: newRepos
        });
    }

    handleRepoUnstar() {
        const {
            repo,
            unstar
        } = this.props;
        unstar(repo);
        newRepos = removeFromRepos(this.state.starred, repo);
        this.setState({
            starred: newRepos
        });
    }

    inStarredRepos() {
        const { starred } = this.state;
        const { id } = this.props.repo;
        return starred.some((element) =>
            element.id === id
        );
    }

    render() {
        const {
            authUser
        } = this.props;

        if(!authUser){
            return null;
        }

        return(
            <View style={{alignSelf: 'center', flex: 1}}>
                <Icon.Button
                    name={this.inStarredRepos() ? 'star' : 'star-o'}
                    backgroundColor={'#ffffff'}
                    color={'gold'}
                    size={30}
                    onPress={this.inStarredRepos() ? this.handleRepoUnstar : this.handleRepoStar}
                    />
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        star: bindActionCreators(starRepo, dispatch),
        unstar: bindActionCreators(unstarRepo, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        authUser: state.auth.authUser,
        starredRepos: state.profile.starredRepos,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoStar);