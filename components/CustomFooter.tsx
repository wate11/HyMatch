import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Dimensions, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, interpolateColor } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Icon } from './IconSet';
import { colors } from '@/types/colors';
import { useSwipeController } from '@/contexts/SwipeControllerContext';

const { width } = Dimensions.get('window');

export function CustomFooter() {
  const { like, refuse, progressX, subscribe } = useSwipeController();
  const router = useRouter();
  
  // Animation values
  const heartScale = useSharedValue(1);
  const trashScale = useSharedValue(1);
  const rightActivation = useSharedValue(0);
  const leftActivation = useSharedValue(0);
  const trashBackgroundOpacity = useSharedValue(0);
  const trashBackgroundScale = useSharedValue(0.8);
  const heartBackgroundOpacity = useSharedValue(0);
  const heartBackgroundScale = useSharedValue(0.8);
  
  // React to swipe progress via subscription (works without rerenders)
  useEffect(() => {
    const unsubscribe = subscribe(() => {
      const x = progressX;
      if (x > 0) {
        const t = Math.min(1, x / 120);
        rightActivation.value = t;
        leftActivation.value = 0;
        heartScale.value = withSpring(1 + 0.2 * t);
        trashScale.value = withSpring(1);
      } else if (x < 0) {
        const t = Math.min(1, Math.abs(x) / 120);
        leftActivation.value = t;
        rightActivation.value = 0;
        trashScale.value = withSpring(1 + 0.2 * t);
        heartScale.value = withSpring(1);
      } else {
        rightActivation.value = 0;
        leftActivation.value = 0;
        heartScale.value = withSpring(1);
        trashScale.value = withSpring(1);
      }
    });
    return unsubscribe;
  }, [subscribe, progressX]);
  
  // Animated styles
  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
    backgroundColor: interpolateColor(
      rightActivation.value,
      [0, 1],
      ['rgba(199,157,107,0.5)', 'rgba(199,157,107,0.85)'] // softer brown gradient
    ),
  }));
  
  const trashAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: trashScale.value }],
    backgroundColor: interpolateColor(
      leftActivation.value,
      [0, 1],
      ['rgba(239,68,68,0.5)', 'rgba(239,68,68,0.85)'] // softer red gradient
    ),
  }));

  const trashBackgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: trashBackgroundOpacity.value,
    transform: [{ scale: trashBackgroundScale.value }],
  }));

  const heartBackgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: heartBackgroundOpacity.value,
    transform: [{ scale: heartBackgroundScale.value }],
  }));

  // Contact actions
  const handleCall = () => {
    Linking.openURL('tel:+81-3-1234-5678');
  };
  const handleSMS = () => {
    Linking.openURL('sms:+81-3-1234-5678');
  };
  // Swipe actions
  const handleLike = () => {
    // Heart background animation
    heartBackgroundOpacity.value = withSpring(1);
    heartBackgroundScale.value = withSpring(1);
    
    // Reset animation after delay
    setTimeout(() => {
      heartBackgroundOpacity.value = withSpring(0);
      heartBackgroundScale.value = withSpring(0.8);
    }, 300);
    
    router.push('/chosen');
  };
  
  const handleRefuse = () => {
    // Trash background animation
    trashBackgroundOpacity.value = withSpring(1);
    trashBackgroundScale.value = withSpring(1);
    
    // Reset animation after delay
    setTimeout(() => {
      trashBackgroundOpacity.value = withSpring(0);
      trashBackgroundScale.value = withSpring(0.8);
    }, 300);
    
    router.push('/refused');
  };

  return (
    <View style={styles.footerWrapper}>
      {/* Floating Half-Circle Buttons above footer */}
      <View style={styles.floatingLeftButton}>
        <TouchableOpacity
          style={styles.halfCircleButton}
          onPress={handleRefuse}
          activeOpacity={0.7}
          accessibilityLabel="Refuse job"
        >
          <Animated.View style={[styles.iconBackground, trashBackgroundAnimatedStyle]} />
          <View style={styles.trashIconContainer}>
            <Icon name="trash-2" size={32} color="#374151" />
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.floatingRightButton}>
        <TouchableOpacity
          style={styles.halfCircleButton}
          onPress={handleLike}
          activeOpacity={0.7}
          accessibilityLabel="Like job"
        >
          <Animated.View style={[styles.iconBackground, heartBackgroundAnimatedStyle]} />
          <View style={styles.heartIconContainer}>
            <Icon name="heart" size={32} color="#cf94b1" />
          </View>
        </TouchableOpacity>
        
        {/* Undo button on top right of heart */}
        <TouchableOpacity
          style={styles.undoButton}
          onPress={() => router.push('/offers')}
          activeOpacity={0.7}
          accessibilityLabel="Undo action"
        >
          <Image 
            source={require('@/assets/images/undo.png')} 
            style={styles.undoIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Floating Swipe Icons (above footer, closer to card) */}
      <Animated.View style={[styles.leftHalfCircle, trashAnimatedStyle]}>
        <TouchableOpacity
          style={styles.fullTouchable}
          onPress={handleRefuse}
          activeOpacity={0.7}
          accessibilityLabel="Swipe left to refuse"
        >
          <View style={styles.halfCircleContentLeft}>
            <Icon name="trash-2" size={40} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.rightHalfCircle, heartAnimatedStyle]}>
        <TouchableOpacity
          style={styles.fullTouchable}
          onPress={handleLike}
          activeOpacity={0.7}
          accessibilityLabel="Swipe right to like"
        >
          <View style={styles.halfCircleContentRight}>
            <Icon name="heart" size={40} color="#ff63b0" />
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Footer Base */}
      <View style={styles.footerBase} pointerEvents="box-none">
        {/* Single Row (to match image) */}
        <View style={styles.iconStrip}>
          {/* Left small round (interactive) */}
          <TouchableOpacity style={styles.smallRound} onPress={() => router.push('/offers')} activeOpacity={0.8}>
            <View style={styles.iconContainer}>
              <Image 
                source={require('@/assets/images/chat.png')} 
                style={styles.chatBackground}
                resizeMode="contain"
              />
              <Image 
                source={require('@/assets/images/rating.png')} 
                style={styles.ratingIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* Center contact tile with phone + mail */}
          <View style={styles.contactTile}>
            <TouchableOpacity style={styles.tileHalf} onPress={handleCall} activeOpacity={0.8}>
              <Image 
                source={require('@/assets/images/phone.png')} 
                style={styles.phoneIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.tileDivider} />
            <TouchableOpacity style={styles.tileHalf} onPress={handleSMS} activeOpacity={0.8}>
              <Image 
                source={require('@/assets/images/sms.png')} 
                style={styles.smsIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Right small list -> navigate to applications */}
          <TouchableOpacity style={styles.docWithHeart} onPress={() => router.push('/applications')} activeOpacity={0.8}>
            <Image 
              source={require('@/assets/images/list.png')} 
              style={styles.listIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const HALF_CIRCLE_SIZE = 82; // +10% size increase
const FOOTER_HEIGHT = 88;

const styles = StyleSheet.create({
  footerWrapper: {
    position: 'relative',
    width: '100%',
    height: FOOTER_HEIGHT,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footerBase: {
    width: '100%',
    height: FOOTER_HEIGHT,
    backgroundColor: '#C79E6B', // to approximate the image's brownish footer
    borderTopWidth: 0,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 15,
  },
  // New Floating Half-Circle Buttons
  floatingLeftButton: {
    position: 'absolute',
    left: -96,
    bottom: 0,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  floatingRightButton: {
    position: 'absolute',
    right: -96,
    bottom: 0,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  halfCircleButton: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trashIconContainer: {
    position: 'absolute',
    right: 35,
    top: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIconContainer: {
    position: 'absolute',
    left: 35,
    top: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  undoButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  undoIcon: {
    width: 20,
    height: 20,
  },
  iconBackground: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f2e7e4',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transform: [{ scale: 0.8 }],
  },
  // Floating half-circles
  leftHalfCircle: {
    position: 'absolute',
    left: -HALF_CIRCLE_SIZE / 2 + 4,
    bottom: FOOTER_HEIGHT + 2, // previous higher position
    width: HALF_CIRCLE_SIZE * 0.97,
    height: HALF_CIRCLE_SIZE * 0.97,
    borderTopRightRadius: HALF_CIRCLE_SIZE,
    borderBottomRightRadius: HALF_CIRCLE_SIZE,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 1,
    borderWidth: 0,
    borderColor: 'transparent',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  rightHalfCircle: {
    position: 'absolute',
    right: -HALF_CIRCLE_SIZE / 2 + 4,
    bottom: FOOTER_HEIGHT + 2,
    width: HALF_CIRCLE_SIZE * 0.97,
    height: HALF_CIRCLE_SIZE * 0.97,
    borderTopLeftRadius: HALF_CIRCLE_SIZE,
    borderBottomLeftRadius: HALF_CIRCLE_SIZE,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  halfCircleContentLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 58,
  },
  halfCircleContentRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 58,
  },
  // Action row
  // New single row strip
  iconStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width - 40,
  },
  smallRound: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#a0d0e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // removed badge layers
  contactTile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#385a7d',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 48,
    width: 120,
  },
  tileHalf: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tileDivider: {
    width: 2,
    height: '70%',
    backgroundColor: '#6FA1C7',
    borderRadius: 1,
  },
  docWithHeart: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // removed heart badge style
  fullTouchable: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatBackground: {
    width: 44,
    height: 44,
    position: 'absolute',
    tintColor: '#a0d0e1',
  },
  ratingIcon: {
    width: 28,
    height: 28,
    zIndex: 1,
  },
  listIcon: {
    width: 44,
    height: 44,
  },
  phoneIcon: {
    width: 26,
    height: 26,
    tintColor: '#4294ff',
  },
  smsIcon: {
    width: 30,
    height: 30,
    tintColor: '#f5d049',
  },
}); 