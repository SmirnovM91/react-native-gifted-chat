import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, View, } from 'react-native';
// TODO: support web
// @ts-ignore
import Lightbox from 'react-native-lightbox';
import { StylePropType } from './utils';
const styles = StyleSheet.create({
    container: {},
    image: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3,
        resizeMode: 'cover',
    },
    imageActive: {
        flex: 1,
        resizeMode: 'contain',
    },
});
export default class MessageImage extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            resizeMode: 'cover',
        };
        this.didOpen = () => {
            this.setState({ resizeMode: 'contain' });
        };
        this.onClose = () => {
            this.setState({ resizeMode: 'cover' });
        };
    }
    render() {
        const { containerStyle, lightboxProps, imageProps, imageStyle, currentMessage, ImageComponent, } = this.props;
        if (!!currentMessage) {
            return (<View style={[styles.container, containerStyle]}>
          <Lightbox didOpen={this.didOpen} onClose={this.onClose} activeProps={{
                style: styles.imageActive,
            }} {...lightboxProps}>
            {ImageComponent ? (<ImageComponent {...imageProps} style={[styles.image, imageStyle]} source={{ uri: currentMessage.image }} resizeMode={this.state.resizeMode}/>) : (<Image {...imageProps} style={[styles.image, imageStyle]} source={{ uri: currentMessage.image }}/>)}
          </Lightbox>
        </View>);
        }
        return null;
    }
}
MessageImage.defaultProps = {
    currentMessage: {
        image: null,
    },
    containerStyle: {},
    imageStyle: {},
    imageProps: {},
    lightboxProps: {},
};
MessageImage.propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: StylePropType,
    imageStyle: StylePropType,
    imageProps: PropTypes.object,
    lightboxProps: PropTypes.object,
};
//# sourceMappingURL=MessageImage.js.map