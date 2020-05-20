import * as React from 'react';
import { Animated, Easing, Platform, StyleSheet } from 'react-native';
import * as SVG from 'react-native-svg';
import { useActive, useHover } from 'react-native-web-hooks';

import { TouchableOpacity } from './Elements';

const width = 70;
const circleWidth = 27;
const sideOffset = 5;
const transitionTime = 200;

export type Props = React.ComponentProps<typeof TouchableOpacity> & {
  onChange: (value: boolean) => void;
  value: boolean;
};

export default function Switch({ onChange, style, value, ...props }: Props) {
  const onValueChange = React.useCallback(() => onChange(!value), [value, onChange]);
  return (
    <TouchableOpacity
      accessibilityRole="button"
      tabIndex={0}
      activeOpacity={1.0}
      {...props}
      {...onEnterAndClick(onValueChange)}
      style={[styles.wrapper, style]}
    >
      <DayNightSwitch isClicked={value} />
    </TouchableOpacity>
  );
}

const createAnimatedValue = (isOn: boolean) =>
  React.useRef(new Animated.Value(isOn ? 1 : 0));

const MoonIcon = ({ isClicked, ...props }) => {
  const value = createAnimatedValue(isClicked);

  React.useEffect(() => {
    Animated.timing(value.current, {
      toValue: isClicked ? 1 : 0,
      duration: transitionTime,
      easing: Easing.inOut(Easing.linear),
    }).start();
  }, [isClicked]);

  return (
    <Animated.View
      style={[
        styles.moonSvg,
        {
          opacity: value.current,
          transform: [
            {
              translateY: value.current.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        },
        props.style,
      ]}
    >
      <SVG.Svg
        pointerEvents="none"
        {...props}
        style={[styles.moonSvg, props.style]}
        viewBox="0 0 30 32"
      >
        <SVG.Path
          fill="white"
          d="M22.592 21.504q3.36 0 6.56-1.792-1.344 4.64-5.184 7.616t-8.8 2.976q-6.016 0-10.304-4.288t-4.288-10.336q0-4.928 2.976-8.768t7.584-5.216q-1.792 3.2-1.792 6.56 0 5.504 3.904 9.376t9.344 3.872z"
        />
      </SVG.Svg>
    </Animated.View>
  );
};

const onEnterAndClick = cb => {
  return {
    // onClick: cb,
    onPress: cb,
    onKeyPress: e => {
      if (e.which === 13 || e.which === 32) {
        cb && cb(e);
      }
    },
  };
};

const DayNightSwitch = ({ isClicked }) => {
  const ref = React.useRef(null);
  const isHovered = useHover(ref);
  const isActive = useActive(ref);

  const value = createAnimatedValue(isClicked);
  const scaleValue = React.useRef(new Animated.Value(1));

  React.useEffect(() => {
    Animated.timing(value.current, {
      toValue: isClicked ? 1 : 0,
      duration: transitionTime,
    }).start();
  }, [isHovered, isClicked]);

  React.useEffect(() => {
    Animated.timing(scaleValue.current, {
      toValue: isActive ? 1.03 : isHovered ? 1.05 : 1,
      duration: transitionTime,
    }).start();
  }, [isActive, isHovered]);

  const backgroundColor = isHovered
    ? isClicked
      ? '#5559cc'
      : '#79bfc3'
    : value.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['#80c7cb', '#595dde'],
      });

  return (
    <Animated.View
      ref={ref}
      style={[
        styles.dayNightSwitch,
        {
          backgroundColor,
          transform: [{ scale: scaleValue.current }],
        },
      ]}
    >
      <Stars isClicked={isClicked} />
      <Circle isClicked={isClicked} />
    </Animated.View>
  );
};

const Star = ({ size = 3, x, y, index, isClicked, ...props }) => {
  const value = createAnimatedValue(isClicked);

  React.useEffect(() => {
    Animated.timing(value.current, {
      toValue: isClicked ? 1 : 0,
      duration: 50 * index,
    }).start();
  }, [isClicked]);

  return (
    <Animated.View
      {...props}
      style={[
        styles.star,
        {
          width: size,
          height: size,
          top: 8 + y,
          left: 8 + x,
          opacity: value.current,
          transform: [
            {
              translateY: value.current.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
          ],
        },
        props.style,
      ]}
    />
  );
};

const Stars = ({ isClicked, ...props }) => {
  const value = createAnimatedValue(isClicked);

  React.useEffect(() => {
    Animated.timing(value.current, {
      toValue: isClicked ? 1 : 0,
      duration: transitionTime,
    }).start();
  }, [isClicked]);

  return (
    <Animated.View
      {...props}
      style={[
        {
          transform: [{ translateY: circleWidth * -0.75 }],
          opacity: value.current,
        },
        props.style,
      ]}
    >
      {props.children}
      <Star isClicked={isClicked} index={1} size={2} x={10} y={3} />
      <Star isClicked={isClicked} index={2} size={1} x={3} y={7} />
      <Star isClicked={isClicked} index={3} size={1} x={12} y={18} />
      <Star isClicked={isClicked} index={4} size={1} x={15} y={10} />
      <Star isClicked={isClicked} index={5} size={1} x={19} y={4} />
      <Star isClicked={isClicked} index={6} size={2} x={22} y={14} />
    </Animated.View>
  );
};

const Circle = ({ isClicked, ...props }) => {
  const ref = React.useRef(null);

  const value = createAnimatedValue(isClicked);

  React.useEffect(() => {
    Animated.timing(value.current, {
      toValue: isClicked ? 1 : 0,
      duration: transitionTime,
    }).start();
  }, [isClicked]);

  const isHovered = useHover(ref);

  // const translateX = isClicked ? width - circleWidth - sideOffset : sideOffset;
  const backgroundColor = isClicked
    ? `rgba(255,255,255,${isHovered ? '0.3' : '0.4'})`
    : isHovered
    ? '#fff0bb'
    : '#fddf75';
  const borderColor = isClicked ? 'rgba(255,255,255,0.9)' : '#d6b05eb5';

  return (
    <Animated.View
      {...props}
      ref={ref}
      style={[
        styles.circle,
        {
          borderWidth: value.current.interpolate({
            inputRange: [0, 1],
            outputRange: [3, 2],
          }),
          borderColor,
          backgroundColor,
          transform: [
            {
              translateX: value.current.interpolate({
                inputRange: [0, 1],
                outputRange: [sideOffset, width - circleWidth - sideOffset],
              }),
            },
          ],
        },
        props.style,
      ]}
    >
      <MoonIcon isClicked={isClicked} />
    </Animated.View>
  );
};

function webStyle(style) {
  return Platform.select({ web: style, default: {} });
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 17,
    overflow: 'hidden',
    ...webStyle({
      willChange: 'transform',
    }),
  },
  dayNightSwitch: {
    ...webStyle({
      cursor: 'pointer',
    }),
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    width,
    borderRadius: 17,
  },
  star: {
    // @ts-ignore: borderRadius cannot be string on native
    borderRadius: Platform.select({
      web: '100%',
      default: 17,
    }),
    backgroundColor: 'white',
    position: 'absolute',
  },
  circle: {
    borderRadius: 17,
    ...webStyle({
      cursor: 'pointer',
      borderRadius: '100%',
    }),
    width: circleWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 27,
    overflow: 'hidden',
    borderStyle: 'solid',
  },
  moonSvg: {
    ...webStyle({
      userSelect: 'none',
    }),
    position: 'absolute',
    width: 13,
    height: 13,
    opacity: 1,
  },
});
