// Based on https://twizzle.app/ by Kitze

import React from 'react';
import { View, Text, Platform, StyleSheet, Animated, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {
  useHover,
  useActive
} from 'react-native-web-hooks';
import * as SVG from 'react-native-svg';

const width = 70;
const circleWidth = 27;
const sideOffset = 5;
const transitionTime = '200ms';


export default ({ onChange, value, ...props }) => (
  <View style={{ transform: [{ scale: 5 }] }}>
    <TouchableOpacity
      accessibilityRole="button"
      tabIndex={0}
      {...props}
      activeOpacity={1.0}
      {...onEnterAndClick(onChange)}
      onPress={onChange}
      style={[styles.wrapper, props.style]}>
      <DayNightSwitch isClicked={value} />
    </TouchableOpacity>
  </View>
);

const AnimatedSvg = Animated.createAnimatedComponent(SVG.Svg);

const MoonIcon = ({ isClicked, ...props }) => {
  const value = React.useRef(new Animated.Value(isClicked ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(value.current, {
      toValue: isClicked ? 1 : 0,
      duration: 200
    }).start();
  }, [isClicked]);

  return (
    <Animated.View style={[
      styles.moonSvg,
      {
        opacity: value.current,
        transform: [{
          translateY: value.current.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0]
          })
        }]
      },
      props.style,
    ]}>
      <AnimatedSvg
        pointerEvents="none"
        {...props}
        style={[
          styles.moonSvg,

          props.style,
        ]}
        viewBox="0 0 30 32">
        <SVG.Path fill="white" d="M22.592 21.504q3.36 0 6.56-1.792-1.344 4.64-5.184 7.616t-8.8 2.976q-6.016 0-10.304-4.288t-4.288-10.336q0-4.928 2.976-8.768t7.584-5.216q-1.792 3.2-1.792 6.56 0 5.504 3.904 9.376t9.344 3.872z" />
      </AnimatedSvg>
    </Animated.View>
  );
}

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

export const DayNightSwitch = ({ isClicked }) => {
  const ref = React.useRef(null);
  const isHovered = useHover(ref);
  const isActive = useActive(ref);


  const value = React.useRef(new Animated.Value(isClicked ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(value.current, {
      toValue: isClicked ? 1 : 0,
      duration: 200
    }).start();
  }, [isClicked]);


  const backgroundColor = isHovered ? (isClicked ? '#5559cc' : '#79bfc3') : value.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['#80c7cb', '#595dde']
  });

  return (
    <Animated.View
      ref={ref}
      style={[
        styles.dayNightSwitch,
        { backgroundColor, transform: [{ scale: isActive ? 1.03 : isHovered ? 1.05 : 1 }] },
      ]}>
      <Stars isClicked={isClicked} />
      <Circle isClicked={isClicked} />
    </Animated.View>
  );
};

export const Star = ({ size = 3, x, y, index, isClicked, ...props }) => {

  const value = React.useRef(new Animated.Value(isClicked ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(value.current, {
      toValue: isClicked ? 1 : 0,
      duration: 50 * index
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
          transform: [{ translateY: value.current.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }],
        },
        props.style,
      ]}
    />
  )
}

export const Stars = ({ isClicked, ...props }) => {

  const value = React.useRef(new Animated.Value(isClicked ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(value.current, {
      toValue: isClicked ? 1 : 0,
      duration: 200
    }).start();
  }, [isClicked]);

  return (
    <Animated.View
      {...props}
      style={[
        {
          display: 'flex',
          transform: [{ translateY: circleWidth * -0.75 }],
          opacity: value.current,
        },
        props.style,
      ]}>
      {props.children}
      <Star isClicked={isClicked} index={1} size={2} x={10} y={3} />
      <Star isClicked={isClicked} index={2} size={1} x={3} y={7} />
      <Star isClicked={isClicked} index={3} size={1} x={12} y={18} />
      <Star isClicked={isClicked} index={4} size={1} x={15} y={10} />
      <Star isClicked={isClicked} index={5} size={1} x={19} y={4} />
      <Star isClicked={isClicked} index={6} size={2} x={22} y={14} />
    </Animated.View>
  );
}
const Circle = ({ isClicked, ...props }) => {
  const ref = React.useRef(null);

  const value = React.useRef(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(value.current, {
      toValue: isClicked ? 1 : 0,
      duration: 200
    }).start();
  }, [isClicked]);

  const isHovered = useHover(ref);

  // const translateX = isClicked ? width - circleWidth - sideOffset : sideOffset;
  const backgroundColor = isClicked ? `rgba(255,255,255,${isHovered ? '0.3' : '0.4'})` : (isHovered ? '#fff0bb' : '#fddf75');
  const borderColor = isClicked ? 'rgba(255,255,255,0.9)' : '#d6b05eb5';

  return (
    <Animated.View
      {...props}
      ref={ref}
      style={[styles.circle, {
        borderWidth: value.current.interpolate({
          inputRange: [0, 1],
          outputRange: [3, 2]
        }),
        borderColor,
        backgroundColor,
        transform: [{
          translateX: value.current.interpolate({ inputRange: [0, 1], outputRange: [sideOffset, width - circleWidth - sideOffset] })
        }]
      }, props.style]}>
      <MoonIcon isClicked={isClicked} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // display: 'inline-block',
    borderRadius: 17,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        willChange: 'transform',
      },
      default: {}
    }),
  },
  dayNightSwitch: {
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transitionProperty: 'all',
        transitionDuration: transitionTime,
        transitionTimingFunction: 'linear',
      },
      default: {}
    }),
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    width,
    borderRadius: 17,
  },
  star: {
    ...Platform.select({
      web: {
        borderRadius: '100%',
      },
      default: {
        borderRadius: 17,
      }
    }),
    backgroundColor: 'white',
    position: 'absolute',
  },
  circle: {
    width: circleWidth,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transitionProperty: 'all',
        transitionDuration: transitionTime,
        transitionTimingFunction: 'ease-in',
        borderRadius: '100%',
      },
      default: {
        borderRadius: 17,
      }
    }),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 27,
    overflow: 'hidden',
    borderStyle: 'solid',
  },
  moonSvg: {
    ...Platform.select({
      web: {
        transitionProperty: 'all',
        transitionDuration: transitionTime,
        transitionTimingFunction: 'ease-in',
        userSelect: 'none',
      },
      default: {}
    }),
    position: 'absolute',
    width: 13,
    height: 13,
    opacity: 1,
  },
});
