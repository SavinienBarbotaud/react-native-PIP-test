import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';

import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class ScreenShare_off extends React.Component {
    render() {

        return (
            <View style={{ width: '100%', height: '100%' }}>
                <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M12 20.5H16M12 20.5H8M12 20.5V16.5C8 16.5 4.5 16.6667 4 16.3333C3.5 16 3 12.6667 3 10C3 9.5 3.01758 8.99414 3.04944 8.5M3 3L21 21M9 3.56282C9.93548 3.52295 10.9505 3.5 12 3.5C16 3.5 19.5 3.83333 20 4.16667C20.5 4.5 21 7.33333 21 10C21 11.6453 20.8097 13.3541 20.5464 14.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </Svg>
            </View>
        );
    }
}