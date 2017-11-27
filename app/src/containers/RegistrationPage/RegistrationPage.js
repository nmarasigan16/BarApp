import React, { Component } from 'react';
import Page from '../../components/SmallHeaderPage/SmallHeaderPage';
import { colorScheme } from "../../lib/styles/ColorScheme";
import Icon from 'react-native-vector-icons/FontAwesome';
import RegistrationForm from '../Forms/RegistrationForm';

class RegistrationPage extends Component {
    constructor(props) {
        super(props);

    }

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <Page
                name={'Register'}>
                <RegistrationForm nav={this.props.navigation}/>
            </Page>
        );
    }
}

export default RegistrationPage;