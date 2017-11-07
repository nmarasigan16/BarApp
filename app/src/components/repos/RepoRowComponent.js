import React from 'react';
import {
    Linking,
    TouchableOpacity,
    View,
} from 'react-native';
import Text from '../text/TextComponent';
import { RepoStyles as styles } from './RepoStyles';
import Divider from '../divider/DividerComponent';
import RepoStar from '../../containers/repos/RepoStar';

const RepoRowComponent = ({repo}) => {
    const {
        url,
        name,
        owner,
        description
    } = repo;
    return (
        <View>
            <View style={styles.row}>
                <TouchableOpacity onPress={()=> Linking.openURL(url)}>
                    <View style={styles.text}>
                        <Text style={[styles.name]}>
                            {name}
                        </Text>
                        <Text style={[styles.owner]}>
                            {owner.login}
                        </Text>
                        <Text style={[styles.description]}>
                            {description}
                        </Text>
                    </View>
                </TouchableOpacity>
                <RepoStar repo={repo}/>
            </View>
            <Divider style={styles.divider}/>
        </View>
    );
};

export default RepoRowComponent;
