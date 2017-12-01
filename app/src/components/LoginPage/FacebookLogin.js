import React, { Component } from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    Linking,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { makeUrl } from "../../lib/url/urlTools";

const CLIENT_ID = '1977845439150436';

class FacebookLogin extends Component {
    constructor(props) {
        super(props);
    }

    openFacebook() {
        let uri = 'https://www.facebook.com/v2.11/dialog/oauth';
        const params = {
            client_id: CLIENT_ID,
            redirect_uri: 'fb1977845439150436://authorize'
        };
        uri = makeUrl(uri, params);
        Linking.openURL(uri);
    }

    render() {
        const {width, height} = Dimensions.get('window');
        return (
            <View style={{padding: height / 80}}>
                <TouchableOpacity onPress={this.openFacebook}>
                    <View style={{
                        backgroundColor: '#3B5998',
                        flexDirection: 'row',
                        height: height / 20,
                        alignContent: 'center',
                        borderRadius: 3
                    }}>
                        <View style={{margin: 4, alignSelf: 'center'}}>
                            <Icon
                                name={'facebook-official'}
                                color={'white'}
                                size={height / 30}
                            />
                        </View>
                        <View style={{margin: 4, alignSelf: 'center'}}>
                            <Text
                                style={{color: 'white'}}>
                                Login With Facebook
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
};

export default FacebookLogin;