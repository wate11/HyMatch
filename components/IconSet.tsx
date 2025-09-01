import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { 
  User, 
  Calendar, 
  Globe, 
  Home, 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Star, 
  MessageCircle,
  Package,
  DollarSign,
  Train,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Settings,
  Filter,
  Heart,
  X,
  Trash2
} from 'lucide-react-native';
import { colors } from '@/types/colors';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

export function Icon({ name, size = 24, color = colors.primary, style }: IconProps) {
  const iconProps = { size, color, style };

  switch (name) {
    // Profile icons
    case 'user':
      return <User {...iconProps} />;
    case 'calendar':
      return <Calendar {...iconProps} />;
    case 'globe':
      return <Globe {...iconProps} />;
    case 'home':
      return <Home {...iconProps} />;
    case 'building':
      return <Building {...iconProps} />;
    case 'map-pin':
      return <MapPin {...iconProps} />;
    case 'phone':
      return <Phone {...iconProps} />;
    case 'mail':
      return <Mail {...iconProps} />;
    case 'file-text':
      return <FileText {...iconProps} />;
    case 'star':
      return <Star {...iconProps} />;
    case 'clock':
      return (
        <View style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: '#f3f4f6',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: '#d1d5db'
        }}>
          <View style={{
            width: size * 0.6,
            height: size * 0.6,
            borderRadius: size * 0.3,
            backgroundColor: '#ffffff',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#9ca3af'
          }}>
            <View style={{
              width: size * 0.1,
              height: size * 0.25,
              backgroundColor: '#6b7280',
              borderRadius: 2,
              position: 'absolute',
              top: size * 0.15,
              left: size * 0.25
            }} />
            <View style={{
              width: size * 0.1,
              height: size * 0.15,
              backgroundColor: '#6b7280',
              borderRadius: 2,
              position: 'absolute',
              top: size * 0.25,
              left: size * 0.25,
              transform: [{ rotate: '45deg' }]
            }} />
          </View>
        </View>
      );
    case 'message-circle':
      return <MessageCircle {...iconProps} />;
    case 'package':
      return <Package {...iconProps} />;
    case 'dollar-sign':
      return <DollarSign {...iconProps} />;
    case 'train':
      return <Train {...iconProps} />;
    case 'alert-circle':
      return <AlertCircle {...iconProps} />;
    case 'check-circle':
      return <CheckCircle {...iconProps} />;
    case 'x-circle':
      return <XCircle {...iconProps} />;
    case 'chevron-down':
      return <ChevronDown {...iconProps} />;
    case 'chevron-up':
      return <ChevronUp {...iconProps} />;
    case 'settings':
      return <Settings {...iconProps} />;
    case 'filter':
      return <Filter {...iconProps} />;
    case 'heart':
      return <Heart {...iconProps} fill="#ff63b0" />;
    case 'x':
      return <X {...iconProps} />;
    case 'trash-2':
      return <Trash2 {...iconProps} />;
    case 'yen':
      return <Image source={require('@/assets/images/yen.png')} style={{ width: size, height: size, tintColor: color }} />;
    case 'pul':
      return <Image source={require('@/assets/images/pul.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'house':
      return <Image source={require('@/assets/images/house.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'maktab':
      return <Image source={require('@/assets/images/maktab.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'sort':
      return <Image source={require('@/assets/images/sort.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'filter_icon':
      return <Image source={require('@/assets/images/filter.png')} style={{ width: size * 1.5, height: size * 1.5, tintColor: '#000000' }} resizeMode="contain" />;
    case 'filter1_icon':
      return <Image source={require('@/assets/images/filter1.png')} style={{ width: size * 1.5, height: size * 1.5, tintColor: '#FFFFFF' }} resizeMode="contain" />;
    case 'foot1_icon':
      return <Image source={require('@/assets/images/foot1.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'task':
      return <Image source={require('@/assets/images/task.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'comment':
      return <Image source={require('@/assets/images/comment.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'food':
      return <Image source={require('@/assets/images/food.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'star_icon':
      return <Image source={require('@/assets/images/star.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    // Work importance modal icons - using existing icons temporarily
    case 'vietnam_flag':
      return <Image source={require('@/assets/images/vietnam.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'nepal_flag':
      return <Image source={require('@/assets/images/nepal.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'china_flag':
      return <Image source={require('@/assets/images/china.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'korea_flag':
      return <Image source={require('@/assets/images/korea.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'shift_clock':
      return <Image source={require('@/assets/images/clock.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'document_x':
      return <Image source={require('@/assets/images/cv.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'check_circle':
      return <Image source={require('@/assets/images/star.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'question_bubble':
      return <Image source={require('@/assets/images/comment.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'money_bag_up':
      return <Image source={require('@/assets/images/pul.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'person_circle':
      return <Image source={require('@/assets/images/man.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'train_bus':
      return <Image source={require('@/assets/images/train.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'food_bowl':
      return <Image source={require('@/assets/images/food.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'money_bag_speech':
      return <Image source={require('@/assets/images/pul.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'money_bag_sun':
      return <Image source={require('@/assets/images/pul.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'money_bag_week':
      return <Image source={require('@/assets/images/pul.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'money_bag_month':
      return <Image source={require('@/assets/images/pul.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'money_bag_card':
      return <Image source={require('@/assets/images/card.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'money_bag_hand':
      return <Image source={require('@/assets/images/pul.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'kelishuv':
      return <Image source={require('@/assets/images/kelishuv.png')} style={{ width: size * 2, height: size * 2 }} resizeMode="contain" />;
    case 'part':
      return <Image source={require('@/assets/images/part.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'undo_icon':
      return <Image source={require('@/assets/images/undo.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'chat1_icon':
      return <Image source={require('@/assets/images/chat1.png')} style={{ width: size * 1.5, height: size * 1.5 }} resizeMode="contain" />;
    case 'user':
      return <Image source={require('@/assets/images/user.png')} style={{ width: size, height: size, tintColor: color }} resizeMode="contain" />;
    default:
      return <View style={[styles.placeholder, { width: size, height: size }]} />;
  }
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: colors.gray[200],
    borderRadius: 4,
  },
});

// Predefined icon sets for different contexts
export const IconSets = {
  profile: {
    user: { name: 'user', color: colors.primary },
    calendar: { name: 'calendar', color: colors.warning },
    globe: { name: 'globe', color: colors.secondary },
    home: { name: 'home', color: colors.success },
    building: { name: 'building', color: colors.error },
    mapPin: { name: 'map-pin', color: colors.success },
    phone: { name: 'phone', color: colors.secondary },
    mail: { name: 'mail', color: colors.warning },
    fileText: { name: 'file-text', color: colors.primary },
    star: { name: 'star', color: colors.warning },
    clock: { name: 'clock', color: colors.secondary },
  },
  job: {
    package: { name: 'package', color: colors.primary },
    dollarSign: { name: 'dollar-sign', color: colors.warning },
    train: { name: 'train', color: colors.success },
    clock: { name: 'clock', color: colors.secondary },
    calendar: { name: 'calendar', color: colors.primary },
    star: { name: 'star', color: colors.warning },
  },
  actions: {
    check: { name: 'check-circle', color: colors.success },
    x: { name: 'x-circle', color: colors.error },
    heart: { name: 'heart', color: colors.error },
    filter: { name: 'filter', color: colors.primary },
    settings: { name: 'settings', color: colors.secondary },
  },
}; 