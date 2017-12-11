import React, { Component } from 'react';
import Page from '../../components/SmallHeaderPage/SmallHeaderPage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import barActions from '../../actions/barActions';
import { colorScheme } from "../../lib/styles/ColorScheme";
import Icon from 'react-native-vector-icons/FontAwesome';
import SpecialsLayout from '../../components/DailySpecials/SpecialLayout';

class DailySpecials extends Component {
    constructor(props) {
        super(props);
        this.navigationBarAction = this.navigationBarAction.bind(this);
        this.onPress = this.onPress.bind(this);
    }

    static navigationOptions = {
        drawerLabel: 'Today\'s Specials',
        drawerIcon: () => (
            <Icon
                name={'glass'}
                color={colorScheme.secondary}
            />
        ),
    };

    navigationBarAction() {
        const { navigation } = this.props;
        navigation.navigate('DrawerOpen')
    }

    onPress() {
        this.props.navigation.navigate('Bar');
    }

    render() {
        const navigationBar = {
            navigate: this.navigationBarAction,
            name: 'bars'
        };
        return (
            <Page nav={navigationBar} name={'Today\'s Specials'}>
                <SpecialsLayout specials={this.props.specials} onPress={this.onPress}/>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        barActions: bindActionCreators(barActions, dispatch),
    };
}

function mapStateToProps(state) {
    return {
        specials: state.specials.allSpecials,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailySpecials);
