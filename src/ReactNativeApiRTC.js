
import React, { useState, useRef, createRef } from 'react';
import {
  Text,
  View,

} from 'react-native';

import {
  MediaStream,
  RTCView,
  mediaDevices,
} from 'react-native-webrtc';

const initialState = {
  camera: null,
};

export default class ReactNativeApiRTC extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        console.log(mediaStream);
        console.log(mediaStream.toURL());
        console.log(mediaStream instanceof MediaStream);
        this.setState({ camera: mediaStream });
      })
      .catch(videoError => console.error(videoError));
  }

  videoError = (err) => {
    console.error(err);
  }

  render() {

    function local_camera(ctx) {
      if (ctx.state.camera == null) {
        return null;
      }
      return (
        <RTCView
          mirror={true}
          objectFit={'cover'}
          streamURL={ctx.state.camera.toURL()}
          zOrder={0}
        />
      )

    }

    return (
      <View>
        {this.state.camera ? (
          <View>
            <RTCView
              style={{ height: 150, width: 150 }}
              streamURL={this.state.camera.toURL()}
            />
            <Text>{this.state.camera.toURL()}</Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
}