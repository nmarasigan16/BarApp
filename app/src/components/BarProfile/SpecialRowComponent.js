import React from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorScheme } from "../../lib/styles/ColorScheme";
import Text from '../general/text/TextComponent';

const SpecialRowComponent = ({special}) => {
    return (
        <View style={{
            flexDirection: 'column',
            margin: 10,
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
               <Icon
                   name={'square'}
                   />
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginLeft: 20,
                }}>
                    <Text
                        style={{
                            color: colorScheme.accent
                        }}>
                        {special.description}
                    </Text>

                </View>
            </View>
            {special.hasOwnProperty('object') ?
                <View style={{
                    alignSelf: 'center'
                }}>
                    <TouchableOpacity>
                        <Text
                            style={{
                                color: colorScheme.secondaryAccent
                            }}>
                            View {special.object.name}
                        </Text>
                    </TouchableOpacity>
                </View>: null}
        </View>
    )
};

export default SpecialRowComponent;
