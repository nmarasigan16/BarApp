import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableOpacity,
} from 'react-native';
import Text from '../../general/text/TextComponent';
import NumberDisplay from '../../general/number/NumberComponent';

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
