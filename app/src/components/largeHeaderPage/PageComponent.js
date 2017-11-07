import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Dimensions,
    StatusBar,
    Platform
} from 'react-native';
import Body from './body/BodyComponent';
import Header from './header/HeaderComponent';
import Avatar from './avatar/AvatarComponent';

const PageComponent = ({name, children, image}) => {

    const styles = {
        container : {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'darkslategrey',
        }
    };

    let {width, height} = Dimensions.get('window');

    return (
        <View style={styles.container}>
            <Header name={name.name} username={name.username} />
            {image ?
                <Avatar image={image} width={width} height={height}/> : null}
            <Body content={children} />
        </View>
    );
};

PageComponent.propTypes = {
};

export default PageComponent;
