// Based on https://twizzle.app/ by Kitze

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
  <View>
    <View
      accessibilityRole="button"
      tabIndex={0}
      {...props}
      {...onEnterAndClick(onChange)}
      style={[styles.wrapper, props.style]}>
      <DayNightSwitch isClicked={value} />
    </View>
  </View>
);

const MoonIcon = ({ isClicked, ...props }) => {
  return (
    <SVG.Svg
      pointerEvents="none"
      {...props}
      style={[
        styles.moonSvg,
        !isClicked && { opacity: 0, transform: [{ translateY: 30 }] },
        props.style,
      ]}
      viewBox="0 0 30 32">
      <SVG.Path d="M22.592 21.504q3.36 0 6.56-1.792-1.344 4.64-5.184 7.616t-8.8 2.976q-6.016 0-10.304-4.288t-4.288-10.336q0-4.928 2.976-8.768t7.584-5.216q-1.792 3.2-1.792 6.56 0 5.504 3.904 9.376t9.344 3.872z" />
    </SVG.Svg>
  );
}

const onEnterAndClick = cb => {
  return {
    onClick: cb,
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
  
  return (
    <View
      ref={ref}
      style={[
        styles.dayNightSwitch,
        isClicked
          ? { backgroundColor: isHovered ? '#5559cc' : '#595dde' }
          : { backgroundColor: isHovered ? '#79bfc3' : '#80c7cb' },
        { transform: [{ scale: isActive ? 1.03 : isHovered ? 1.05 : 1 }] },
      ]}>
      <Stars isClicked={isClicked} />
      <Circle isClicked={isClicked} />
    </View>
  );
};

export const Star = React.forwardRef(
  ({ size = 3, x, y, index, isClicked, ...props }, ref) => (
    <View
      ref={ref}
      {...props}
      style={[
        styles.star,
        {
          transitionDuration: `${50 * index}ms`,
          width: size,
          height: size,
          top: 8 + y,
          left: 8 + x,
          ...(!isClicked && {
            opacity: 0,
            transform: [{ translateY: 10 }],
          }),
        },
        props.style,
      ]}
    />
  )
);

export const Stars = ({ isClicked, ...props }) => (
  <View
    {...props}
    style={[
      {
        display: 'contents',
        opacity: isClicked ? 1 : 0,
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
  </View>
);

const Circle = ({ isClicked, ...props }) => {
  const ref = React.useRef(null);
  const translateX = isClicked ? width - circleWidth - sideOffset : sideOffset;

  const isHovered = useHover(ref);

  const borderStyle = isClicked
    ? {
        transform: [{ translateX }],
        backgroundColor: `rgba(255,255,255,${isHovered ? '0.3' : '0.4'})`,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.9)',
      }
    : {
        transform: [{ translateX }],
        backgroundColor: isHovered ? '#fff0bb' : '#fddf75',
        borderWidth: 3,
        borderColor: '#d6b05eb5',
      };
  return (
    <View
      {...props}
      ref={ref}
      style={[styles.circle, borderStyle, props.style]}>
      <MoonIcon isClicked={isClicked} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // display: 'inline-block',
    borderRadius: 17,
    overflow: 'hidden',
    willChange: 'transform',
  },
  dayNightSwitch: {
    cursor: 'pointer',
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    width,
    borderRadius: 17,
    transitionProperty: 'all',
    transitionDuration: transitionTime,
    transitionTimingFunction: 'linear',
  },
  star: {
    borderRadius: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    transitionTimingFunction: 'linear',
  },
  circle: {
    width: circleWidth,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%',
    height: 27,
    overflow: 'hidden',
    transitionProperty: 'all',
    transitionDuration: transitionTime,
    transitionTimingFunction: 'ease-in',
    borderStyle: 'solid',
  },
  moonSvg: {
    userSelect: 'none',
    position: 'absolute',
    transitionProperty: 'all',
    transitionDuration: transitionTime,
    transitionTimingFunction: 'ease-in',
    width: 13,
    height: 13,
    fill: 'white',
    opacity: 1,
  },
});
