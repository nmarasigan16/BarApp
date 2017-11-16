import React, { Component } from 'react';
import Page from '../../components/SmallHeaderPage/SmallHeaderPage';
import { colorScheme } from "../../lib/styles/ColorScheme";
import Icon from 'react-native-vector-icons/FontAwesome';

class DailySpecials extends Component {
    constructor(props) {
        super(props);
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

    render() {
        return (
            <Page nav={this.props.navigation} name={'Today\'s Specials'} />
        )
    }
}

export default DailySpecials;