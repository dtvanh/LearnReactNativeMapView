import React, { Component } from 'react';
import { WebView } from 'react-native';

class DrawModule extends Component {
  render() {
    const mapHtml = require('./web/drawFeatures.html');
    return (
      <WebView
        source={mapHtml}
        style={{marginTop: 20}}
      />
    );
  }
}

export default DrawModule;