import React, { Component } from 'react';
import Page from '../../components/LargeHeaderPage/PageComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorScheme } from "../../lib/ColorScheme";


class BarProfileContainer extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        drawerLabel: 'Legends',
        drawerIcon: () => (
            <Icon
                name={'beer'}
                color={colorScheme.secondary}
            />
        ),
    };

    render() {
        return (
            <Page
                nav={this.props.navigation}
                name={'Legends'}
                location={{
                    string_repr: '522 E Green St, Champaign, IL 61820',
                    latitude: 40.1105053,
                    longitude: -88.2311641,
                }}
                telephone={'2173557674'}
                >
            </Page>
        )
    }
}

export default BarProfileContainer;