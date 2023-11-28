// import React, { useEffect } from 'react';
// import { View } from 'react-native';
// import { RtcEngine, RtcLocalView } from 'react-native-agora';
// import { AgoraUIKit } from 'react-native-agora-uikit';

import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {Text} from 'react-native';
const rtcCallbacks = {
  EndCall: () => setVideoCall(false),
};
const App = () => {
  const [videoCall, setVideoCall] = useState(true);
  const connectionData = {
      appId: '4cd002c418c044edad7fbcfb3799b1d3',
      channel: 'Test',
      token: '007eJxTYOj4dzej5HKJo/VhW0Eb1zyfGZLh/Za+C4/VnJKv8Dx2UkeBwSQ5xcDAKNnE0CLZwMQkNSUxxTwtKTktydjc0jLJMMVYfEdkakMgI8PMW3cYGRkgEMRnYQhJLS5hYAAAJMYfYw==',
  };
  return videoCall ? (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
) : (
    <Text onPress={() => setVideoCall(true)}>Start Call</Text>
);
}

export default App;