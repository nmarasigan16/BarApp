import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Button,
    Animated,
    Linking,
} from 'react-native';
import { colorScheme } from "../../lib/styles/ColorScheme";
import { LogoStyle } from "../../lib/styles/LogoStyle";
import Text from '../../components/general/text/TextComponent';
import LoginLayout from '../../components/LoginPage/LoginLayout';
import { parseUrl } from "../../lib/url/urlTools";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
            fadeAnim: new Animated.Value(0)
        };
        this.updateShowLogin = this.updateShowLogin.bind(this);
    }

    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        Linking.addEventListener('url', this._handleOpenUrl);
    }


    componentWillUnmount() {
        Linking.removeEventListener('url', this._handleOpenUrl);
    }

    _handleOpenUrl(event) {
        const parsedUrl = parseUrl(event.url);
        console.log(parsedUrl);
    }

    updateShowLogin(event) {
        this.setState((prevState) => {
            return Object.assign({}, prevState, {showLogin: true})
        });
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 1000,
            }
        ).start();
    }

    render() {
        const { showLogin, fadeAnim } = this.state;
        const { navigation } = this.props;
        const { width, height } = Dimensions.get('window');
        const viewStyle = {
            flex: 1,
            backgroundColor: colorScheme.secondary,
            flexDirection: 'column',
            justifyContent: 'center'
        };
        return (
            <View style={viewStyle}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <Text
                        style={[{
                            fontSize: width/6,
                           textAlign: 'center',
                        }, LogoStyle.logo]}>
                        BarCode
                    </Text>
                </View>
                <View style={{flex: 2}}>
                    {!showLogin ?
                        <Button
                            title={'login to go out'}
                            color={colorScheme.accent}
                            onPress={this.updateShowLogin}
                        /> : null}
                    {showLogin ?
                        <Animated.View style={{
                            opacity: fadeAnim
                        }}>
                            <LoginLayout nav={navigation}/>
                        </Animated.View> : null}
                </View>
            </View>
        )
    }
}

export default LoginPage;
