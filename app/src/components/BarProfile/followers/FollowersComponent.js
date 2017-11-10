import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableOpacity,
} from 'react-native';
import Text from '../../general/text/TextComponent';
import NumberDisplay from '../../general/number/NumberComponent';

const FollowersComponent = ({follow, navigate}) => {
    return (
        <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 20
        }}>
            <TouchableOpacity style={{flex: 1}} onPress={() => navigate('Followers')}>
                <View>
                    <NumberDisplay label={'Followers'} number={follow.follows} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1}} onPress={() => navigate('Following')}>
                <View style={{flex: 1}}>
                    <NumberDisplay label={'Following'} number={follow.followers} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default FollowersComponent;
