import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toast from 'react-native-simple-toast';
import authActions from '../../actions/authActions';
import apiActions from '../../actions/apiActions';
import { colorScheme } from "../../lib/styles/ColorScheme";
import ValidatedTextInput from "../../components/general/ValidatedTextInput/ValidatedTextInput";
import { validators } from "../../lib/validators";
import TextComponent from '../../components/general/text/TextComponent';
import Form from '../../components/general/ValidatedTextInput/ValidatedForm';


class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: props.error,
        };
        this.onLogin = this.onLogin.bind(this);
    }

    static navigationOptions = {
        title: 'Login'
    };

    componentWillReceiveProps(newProps) {
        if(newProps.error) {
            Toast.show(newProps.error);
        }
        if(newProps.token) {
            Toast.show('Logged in successfully!');
            this.props.nav.navigate('Home');
        }
    }

    onLogin() {
        const data = this.form.getData();
        if(data.valid){
            this.props.authActions.login(data.username.value, data.password.value);
        }
    }

    render() {
        const { width, height } = Dimensions.get('window');

        return (
            <View>
                <Form ref={(form) => {this.form = form;}}>
                    <ValidatedTextInput
                        name={'username'}
                        color={colorScheme.accent}
                        label={'Email'}
                        labelColor={colorScheme.accent}
                        autoCapitalize = {'none'}
                        validators={[validators.email]}
                    />
                    <ValidatedTextInput
                        color={colorScheme.accent}
                        name={'password'}
                        label={'Password'}
                        labelColor={colorScheme.accent}
                        secureTextEntry
                        validators={[validators.isRequired]}
                    />
                </Form>
                <TouchableOpacity onPress={this.onLogin}>
                    <TextComponent
                        style={{
                            textAlign: 'center',
                            color: colorScheme.accent,
                            fontSize: width / 20,
                            marginTop: height / 30
                        }}>
                        login
                    </TextComponent>
                </TouchableOpacity>
            </View>
        );
    }
}

LoginForm.propTypes = {
    nav: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        apiActions: bindActionCreators(apiActions, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        error: state.api.error,
        token: state.auth.token
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
