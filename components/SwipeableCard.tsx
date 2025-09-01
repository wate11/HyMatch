import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { SwipeIndicator } from './SwipeIndicator';
import { useSwipeController } from '@/contexts/SwipeControllerContext';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  isTop: boolean;
  zIndex: number;
  style?: ViewStyle;
  externalSwipeDirection?: 'left' | 'right' | null;
  onExternalSwipeComplete?: () => void;
}

const SWIPE_THRESHOLD = 100; // commit threshold
const INDICATOR_VIS_THRESHOLD = 40; // show indicator earlier
const CARD_WIDTH = 300;

export function SwipeableCard({
  children,
  onSwipeRight,
  onSwipeLeft,
  isTop,
  zIndex,
  style,
  externalSwipeDirection = null,
  onExternalSwipeComplete,
}: SwipeableCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const { updateProgressX } = useSwipeController();

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      scale.value = withSpring(0.95);
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      runOnJS(updateProgressX)(event.translationX);
      rotation.value = interpolate(
        event.translationX,
        [-CARD_WIDTH, 0, CARD_WIDTH],
        [-15, 0, 15]
      );
    },
    onEnd: (event) => {
      const shouldSwipeRight = event.translationX > SWIPE_THRESHOLD;
      const shouldSwipeLeft = event.translationX < -SWIPE_THRESHOLD;

      if (shouldSwipeRight) {
        translateX.value = withSpring(CARD_WIDTH * 2);
        translateY.value = withSpring(event.translationY);
        runOnJS(onSwipeRight)();
        // optionally navigate after swipe via parent logic; no nav here
      } else if (shouldSwipeLeft) {
        translateX.value = withSpring(-CARD_WIDTH * 2);
        translateY.value = withSpring(event.translationY);
        runOnJS(onSwipeLeft)();
        // optionally navigate after swipe via parent logic; no nav here
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotation.value = withSpring(0);
      }
      scale.value = withSpring(1);
      runOnJS(updateProgressX)(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  // Trigger programmatic swipe when footer buttons are pressed
  React.useEffect(() => {
    if (!isTop || !externalSwipeDirection) return;
    const direction = externalSwipeDirection;
    if (direction === 'right') {
      translateX.value = withSpring(CARD_WIDTH * 2, {}, (finished) => {
        if (finished) {
          runOnJS(onSwipeRight)();
          if (onExternalSwipeComplete) {
            runOnJS(onExternalSwipeComplete)();
          }
          translateX.value = 0;
          translateY.value = 0;
          rotation.value = 0;
        }
      });
    } else if (direction === 'left') {
      translateX.value = withSpring(-CARD_WIDTH * 2, {}, (finished) => {
        if (finished) {
          runOnJS(onSwipeLeft)();
          if (onExternalSwipeComplete) {
            runOnJS(onExternalSwipeComplete)();
          }
          translateX.value = 0;
          translateY.value = 0;
          rotation.value = 0;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalSwipeDirection, isTop]);

  const rightIndicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, INDICATOR_VIS_THRESHOLD],
      [0, 1],
      'clamp'
    );
    const scale = interpolate(
      translateX.value,
      [0, INDICATOR_VIS_THRESHOLD],
      [0.7, 1],
      'clamp'
    );
    return { opacity, transform: [{ scale }] };
  });

  const leftIndicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-INDICATOR_VIS_THRESHOLD, 0],
      [1, 0],
      'clamp'
    );
    const scale = interpolate(
      translateX.value,
      [-INDICATOR_VIS_THRESHOLD, 0],
      [1, 0.7],
      'clamp'
    );
    return { opacity, transform: [{ scale }] };
  });

  return (
    <PanGestureHandler 
      onGestureEvent={gestureHandler} 
      enabled={isTop}
      activeOffsetX={[-30, 30]}
      activeOffsetY={[-1000, 1000]}
      simultaneousHandlers={[]}
    >
      <Animated.View style={[styles.container, style, animatedStyle, { zIndex }]}>
        <View style={styles.content}>
          {children}
        </View>
        <SwipeIndicator
          type="right"
          style={[styles.rightIndicator, rightIndicatorStyle]}
        />
        <SwipeIndicator
          type="left"
          style={[styles.leftIndicator, leftIndicatorStyle]}
        />
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  rightIndicator: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  leftIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});