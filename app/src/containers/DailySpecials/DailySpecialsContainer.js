import React, { Component } from 'react';
import Page from '../../components/SmallHeaderPage/SmallHeaderPage';
import { colorScheme } from "../../lib/styles/ColorScheme";
import Icon from 'react-native-vector-icons/FontAwesome';
import SpecialsLayout from '../../components/DailySpecials/SpecialLayout';

class DailySpecials extends Component {
    constructor(props) {
        super(props);
        this.navigationBarAction = this.navigationBarAction.bind(this);
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


    render() {
        const navigationBar = {
            navigate: this.navigationBarAction,
            name: 'bars'
        };
        return (
            <Page nav={navigationBar} name={'Today\'s Specials'}>
                <SpecialsLayout/>
            </Page>
        )
    }
}

export default DailySpecials;