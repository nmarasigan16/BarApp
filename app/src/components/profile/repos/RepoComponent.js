import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableOpacity,
} from 'react-native';
import Text from '../../text/TextComponent';
import NumberDisplay from '../number/NumberComponent';

const RepoComponent = ({repos, navigate}) => {
    return (
        <TouchableOpacity style={{margin:10}} onPress={() => navigate('Repo')}>
            <View>
                <NumberDisplay label={'Public Repositories'} number={repos} />
            </View>
        </TouchableOpacity>
    );
};

export default RepoComponent;
