import React from 'react';
import { View } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Text from '../../text/TextComponent';

const BioComponent = ({props}) => {
    const {bio, website, email} = props;
    return (
        <View>
            {bio ?
                <View style={{margin: 10}}>
                    <Text style={{textAlign: 'center'}}>
                        <Text style={{
                                fontWeight: 'bold',
                                fontSize: responsiveFontSize(2.5),
                        }}>
                            Bio{'\n'}
                        </Text>
                        <Text style={{fontSize: responsiveFontSize(2)}}>
                            {bio}
                        </Text>
                    </Text>
                </View> : null
            }
            {website || email ?
                <View style={{margin: 15, flexDirection: 'column'}}>
                    {website ?
                        <Text style={{flex:0, textAlign: 'center', margin: 3}}>
                            Website: {website}
                        </Text> : null
                    }
                    {email ?
                        <Text style={{flex:0, textAlign: 'center', margin: 3}}>
                            Email: {email}
                        </Text> : null
                    }
                </View> : null
            }
        </View>
    );
};

export default BioComponent;
