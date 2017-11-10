import React from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity,
    Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const FacebookLogin = (props) => {
    const {width, height} = Dimensions.get('window');
    return (
            <View style={{padding: height/80}}>
                <TouchableOpacity>
                    <View style={{backgroundColor: '#3B5998',flexDirection: 'row', height: height/20, alignContent: 'center', borderRadius: 3}}>
                        <View style={{margin: 4, alignSelf: 'center'}}>
                        <Icon
                            name={'facebook-official'}
                            color={'white'}
                            size={height/30}
                            />
                        </View>
                        <View style={{margin: 4, alignSelf: 'center'}}>
                            <Text
                                style={{color:'white'}}>
                                Login With Facebook
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

    );
};

export default FacebookLogin;