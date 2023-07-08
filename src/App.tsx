import {
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Text,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Svg, Path} from 'react-native-svg';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const dogEars = width * 0.75;
const dogEarVerticalOffset = -dogEars * 0.55;
const dogEarHorizontalOffset = -dogEars * 0.7;

const dogEyePosition = height * 0.18;
const dogEyes = width * 0.1;
const dogInnerEyes = dogEyes * 0.3;

function DogEyes() {
  return (
    <View style={styles.dogEyes}>
      <View style={styles.dogInnerEyes} />
    </View>
  );
}

const dogNosePosition = height * 0.33;
const actualNoseWidth = 38.161;
const actualNoseHeight = 22.03;
const dogInnerEars = width * 0.04;

function DogNose() {
  return (
    <View style={styles.container}>
      <Svg
        width={actualNoseWidth}
        height={actualNoseHeight}
        fill={colors.Secondary}
        strokeWidth={1}
        style={styles.dogNose}
        viewBox={`0 0 ${actualNoseWidth} ${actualNoseHeight}`}>
        <Path
          d={
            'M2.017 10.987Q-.563 7.513.157 4.754C.877 1.994 2.976.135 6.164.093 16.4-.04 22.293-.022 32.048.093c3.501.042 5.48 2.081 6.02 4.661q.54 2.579-2.051 6.233-8.612 10.979-16.664 11.043-8.053.063-17.336-11.043z'
          }
        />
      </Svg>
      <View style={styles.dogInnerNose} />
    </View>
  );
}

const dogMouthPosition = height * 0.41;
const actualMouthWidth = 84;
const actualMouthHeight = 23;
const actualSmileWidth = 60;
const actualSmileHeight = 30;
const actualToungeWidth = 60;
const actualToungeHeight = 60;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

function DogMouth() {
  const value = 0.5;
  const tounge = useSharedValue(1);
  const toungeStyle = useAnimatedStyle(() => {
    const inputRange = [0, 0.5, 1];
    return {
      transform: [
        {scaleX: 0.75},
        {scaleY: interpolate(tounge.value, inputRange, [1, value, 1])},
        {
          translateY: interpolate(tounge.value, inputRange, [
            0,
            -actualToungeHeight / 2 + 12,
            0,
          ]),
        },
      ],
    };
  });
  useEffect(() => {
    tounge.value = withDelay(
      500,
      withRepeat(
        withTiming(0, {
          duration: 400,
        }),
        -1,
      ),
    );
  }, []);

  return (
    <View style={styles.mouthContainer}>
      <Svg
        width={actualSmileWidth}
        height={actualSmileHeight}
        fill="transparent"
        strokeWidth={3}
        stroke={colors.Secondary}
        style={styles.dogSmile}
        viewBox={`0 0 ${actualSmileWidth} ${actualSmileHeight}`}>
        <Path d={'M 2 2 C 10 30 50 30 58 2'} />
      </Svg>
      <Svg
        width={actualMouthWidth}
        height={actualMouthHeight}
        fill={colors.Secondary}
        strokeWidth={3}
        strokeLinecap="square"
        strokeMiterlimit={3}
        style={styles.dogMouth}
        viewBox={`-2 -2 ${actualMouthWidth} ${actualMouthHeight}`}>
        <Path
          d={
            'M0 0c3.76 9.279 9.69 18.98 26.712 19.238 17.022.258 10.72.258 28 0S75.959 9.182 79.987.161'
          }
        />
      </Svg>
      <AnimatedSvg
        width={actualToungeWidth}
        height={actualToungeHeight}
        style={toungeStyle}
        viewBox={`0 0 ${actualToungeWidth} ${actualToungeHeight}`}>
        <Path
          d={'M 10 10 L 10 30 C 10 60 50 60 50 30 L 50 10'}
          strokeWidth={0}
          fill="#ffd6dd"
        />
        <Path
          d={
            'M 10 10 L 10 16 L 27 16 L 27 40 L 33 40 L 33 16 L 50 16 L 50 10 Z'
          }
          strokeWidth={0}
          fill="#fcb7bf"
        />
      </AnimatedSvg>
    </View>
  );
}

const usernamePosition = height * 0.6;
const showWidth = 84;

function InputComp({isPassword, positionChangeCallback, onFocussed}) {
  const [text, onChangeText] = useState('');
  const [isShown, setIsShown] = React.useState(false);

  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        onSelectionChange={event => {
          if (!isPassword) {
            positionChangeCallback(event.nativeEvent.selection.end);
          }
        }}
        onFocus={() => onFocussed(isShown)}
        style={[
          styles.inputContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {paddingEnd: isPassword ? showWidth + 18 : 18},
        ]}
        secureTextEntry={isPassword && !isShown}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.showContainer}
          onPress={() => {
            setIsShown(prev => {
              onFocussed(!prev);
              return !prev;
            });
          }}>
          <Text style={styles.showText}>{isShown ? 'HIDE' : 'SHOW'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function scale(number, inMin, inMax, outMin, outMax) {
  if (number >= inMax) return outMax;
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

const dogHandsPosition = usernamePosition;
const actualHandsWidth = 110;
const actualHandsHeight = 60;

function DogHands({style}) {
  return (
    <Animated.View style={style}>
      <Svg
        width={actualHandsWidth}
        height={actualHandsHeight}
        fill="#fac554"
        stroke="#000"
        strokeWidth={3}
        style={styles.dogNose}
        viewBox={`0 0 ${actualHandsWidth} ${actualHandsHeight}`}>
        <Path
          d={
            'M 10 15 L 10 25 C 10 50 60 45 40 25 L 40 15 M 100 15 L 100 25 C 100 50 50 45 70 25 L 70 15'
          }
        />
        <Path d={'M 40 10 L 40 35 C 40 55 70 55 70 35 L 70 10'} />
      </Svg>
    </Animated.View>
  );
}

const FREE = 0;
const PASS = 4;
const PASS_SHOW = 1;

const DOG_ANGLE_MIN = 8;
const DOG_ANGLE_MAX = -DOG_ANGLE_MIN;

export default function App() {
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  const [dogRotation, setDogRotation] = useState(0);
  const [dogState, setDogState] = useState(FREE);

  const hands = useSharedValue(FREE);
  const handsStyle = useAnimatedStyle(() => {
    const inputRange = [FREE, PASS_SHOW, PASS];
    return {
      transform: [
        {translateY: interpolate(hands.value, inputRange, [0, -368, -290])},
        {rotate: interpolate(hands.value, inputRange, [0, 150, 150]) + 'deg'},
      ],
    };
  });

  useEffect(() => {
    hands.value = withTiming(dogState, {
      duration: 750,
    });
  }, [dogState]);

  return (
    <SafeAreaView>
      <StatusBar hidden />
      <LinearGradient
        colors={[colors.Primary1, colors.Primary2]}
        style={styles.absolute}
      />

      <View
        style={[
          styles.earContainer,
          {top: dogEarVerticalOffset, left: dogEarHorizontalOffset},
        ]}
      />
      <View
        style={[
          styles.earContainer,
          {top: dogEarVerticalOffset, right: dogEarHorizontalOffset},
        ]}
      />

      <View style={{transform: [{rotate: `${dogRotation}deg`}]}}>
        <View style={styles.eyesContainer}>
          <DogEyes />
          <DogEyes />
        </View>

        <View style={styles.noseContainer}>
          <DogNose />
        </View>

        <View style={styles.absolute}>
          <DogMouth />
        </View>
      </View>

      <View style={[styles.absolute, {top: usernamePosition}]}>
        <InputComp
          isPassword={false}
          positionChangeCallback={val => {
            setDogRotation(scale(val, 0, 30, DOG_ANGLE_MIN, DOG_ANGLE_MAX));
          }}
          onFocussed={e => {
            setDogRotation(DOG_ANGLE_MIN);
            setDogState(FREE);
          }}
        />
        <View style={{height: 12}} />
        <InputComp
          isPassword={true}
          positionChangeCallback={null}
          onFocussed={isShown => {
            setDogState(isShown ? PASS : PASS_SHOW);
            setDogRotation(0);
          }}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          top: dogHandsPosition - 34,
          flexDirection: 'row',
          width,
          justifyContent: 'space-between',
          transform: [{scaleY: 0.7}, {scaleX: 0.52}],
        }}>
        <DogHands style={[handsStyle, {left: -10}]} />
        <DogHands style={[handsStyle, {right: -10}]} />
      </View>
    </SafeAreaView>
  );
}

const colors = {
  Secondary: '#253846',
  Secondary2: '#476375',
  Primary1: '#F9D25A',
  Primary2: '#F8A844',
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    width,
    height,
  },
  background: {
    position: 'absolute',
    width,
    height,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  earContainer: {
    borderRadius: dogEars,
    width: dogEars,
    height: dogEars,
    position: 'absolute',
    backgroundColor: colors.Secondary,
  },

  eyesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top: dogEyePosition,
    width: width,
  },
  dogEyes: {
    borderRadius: dogEyes,
    width: dogEyes,
    height: dogEyes,
    marginHorizontal: width * 0.15,
    backgroundColor: colors.Secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dogInnerEyes: {
    borderRadius: dogInnerEyes,
    width: dogInnerEyes * 0.8,
    height: dogInnerEyes * 0.8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    top: dogEyes * -0.22,
    right: dogEyes * -0.18,
    transform: [{rotate: '35deg'}, {scaleX: 2}],
  },

  noseContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: dogNosePosition,
    width: width,
  },
  dogNose: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{scale: 1.5}],
  },
  dogInnerNose: {
    borderRadius: dogInnerEars,
    width: dogInnerEars * 0.8,
    height: dogInnerEars * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Secondary2,
    top: -dogInnerEars * 1.4,
    transform: [{scaleX: 2}],
  },

  mouthContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    top: dogMouthPosition,
    width: width,
    transform: [{scaleX: 1.3}],
  },
  dogMouth: {
    transform: [{scaleX: 0.7}, {scaleY: 0.8}],
    position: 'absolute',
  },
  dogSmile: {
    transform: [{scale: 1.6}],
    top: -18,
    position: 'absolute',
  },

  inputContainer: {
    borderRadius: 24,
    backgroundColor: '#fff',
    marginHorizontal: 32,
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  showContainer: {
    position: 'absolute',
    top: 7,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.Secondary,
    right: 39,
    width: showWidth,
    borderRadius: 18,
    alignItems: 'center',
  },
  showText: {fontSize: 18, color: 'white', borderRadius: 16},
});
