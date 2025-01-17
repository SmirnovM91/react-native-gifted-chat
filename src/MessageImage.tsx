import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  View,
  ImageProps,
  ViewStyle,
  StyleProp,
  ImageStyle,
} from 'react-native'
// TODO: support web
// @ts-ignore
import Lightbox from 'react-native-lightbox'
import { IMessage } from './Models'
import { StylePropType } from './utils'

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
})

export interface MessageImageProps<TMessage extends IMessage> {
  currentMessage?: TMessage
  containerStyle?: StyleProp<ViewStyle>
  imageStyle?: StyleProp<ImageStyle>
  imageProps?: Partial<ImageProps>
  lightboxProps?: object
  ImageComponent?: any
}

export default class MessageImage<
  TMessage extends IMessage = IMessage
> extends Component<MessageImageProps<TMessage>> {
  static defaultProps = {
    currentMessage: {
      image: null,
    },
    containerStyle: {},
    imageStyle: {},
    imageProps: {},
    lightboxProps: {},
  }

  static propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: StylePropType,
    imageStyle: StylePropType,
    imageProps: PropTypes.object,
    lightboxProps: PropTypes.object,
  }

  state = {
    resizeMode: 'cover',
  }

  didOpen = () => {
    this.setState({ resizeMode: 'contain' })
  }

  onClose = () => {
    this.setState({ resizeMode: 'cover' })
  }

  render() {
    const {
      containerStyle,
      lightboxProps,
      imageProps,
      imageStyle,
      currentMessage,
      ImageComponent,
    } = this.props
    if (!!currentMessage) {
      return (
        <View style={[styles.container, containerStyle]}>
          <Lightbox
            didOpen={this.didOpen}
            onClose={this.onClose}
            activeProps={{
              style: styles.imageActive,
            }}
            {...lightboxProps}
          >
            {ImageComponent ? (
              <ImageComponent
                {...imageProps}
                style={[styles.image, imageStyle]}
                source={{ uri: currentMessage.image }}
                resizeMode={this.state.resizeMode}
              />
            ) : (
              <Image
                {...imageProps}
                style={[styles.image, imageStyle]}
                source={{ uri: currentMessage.image }}
              />
            )}
          </Lightbox>
        </View>
      )
    }
    return null
  }
}
