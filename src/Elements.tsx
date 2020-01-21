import * as React from 'react';
import { TouchableOpacity as NativeTouchableOpacity } from 'react-native';

type NativeTouchableOpacityProps = React.ComponentProps<
  typeof NativeTouchableOpacity
>;

type WebTouchableOpacityProps = NativeTouchableOpacityProps & {
  tabIndex?: number;
};

export const TouchableOpacity = NativeTouchableOpacity as React.ComponentType<
  WebTouchableOpacityProps
>;
