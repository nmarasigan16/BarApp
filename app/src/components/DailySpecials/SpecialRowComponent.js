import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorScheme } from "../../lib/styles/ColorScheme";
import Text from '../general/text/TextComponent';
import Divider from '../general/divider/DividerComponent';

const SpecialRowComponent = ({special}) => {

    const { width, height } = Dimensions.get('window');

    return (
        <View style={{
            marginTop: width/40,
            marginRight: width/30,
            marginLeft: width/30,
        }}>
        <TouchableOpacity>
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: width/40,
                }}>
                <Text
                    style={{
                        color: colorScheme.accent,
                        fontWeight: 'bold',
                        fontSize: width/15
                    }}>
                    {special.barName}
                </Text>
                <Text
                    style={{
                        color: colorScheme.secondaryAccent,
                        fontSize: width/20
                    }}>
                    {special.description}
                </Text>
            </View>
        </TouchableOpacity>
            <Divider/>
        </View>
    )
};

SpecialRowComponent.propTypes = {
    special: PropTypes.shape({
        barName: PropTypes.string,
        description: PropTypes.string,
        barId: PropTypes.number,
    })
};

export default SpecialRowComponent;