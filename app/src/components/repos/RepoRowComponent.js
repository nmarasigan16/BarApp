import React from 'react';
import {
    Linking,
    TouchableOpacity,
    View,
} from 'react-native';
import Text from '../text/TextComponent';
import { RepoStyles as styles } from './RepoStyles';
import Divider from '../divider/DividerComponent';

const RepoRowComponent = ({name, owner, description, link}) => {

    return (
        <View>
            <TouchableOpacity onPress={()=> Linking.openURL(link)}>
                <View style={styles.row}>
                    <Text style={[styles.name, styles.text]}>
                        {name}
                    </Text>
                    <Text style={[styles.owner, styles.text]}>
                        {owner}
                    </Text>
                    <Text style={[styles.description, styles.text]}>
                        {description}
                    </Text>
                </View>
            </TouchableOpacity>
            <Divider style={styles.divider}/>
        </View>
    );
};

export default RepoRowComponent;
