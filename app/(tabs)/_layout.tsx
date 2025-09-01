import { Tabs } from 'expo-router';
import { Heart, Trash2, CheckCircle } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { colors } from '@/types/colors';

export default function TabLayout() {
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#c79d6b',
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-SemiBold',
          fontSize: 12,
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#000000',
      }}>
      <Tabs.Screen
        name="refused"
        options={{
          title: t('tabs.refused'),
          tabBarIcon: ({ size, color }) => (
            <Trash2 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.jobs'),
          tabBarIcon: ({ size, color }) => (
            <Heart size={size} color={color} />
          ),
          // Hide tab bar on Home to let the unified footer occupy the bottom
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="chosen"
        options={{
          title: t('tabs.chosen'),
          tabBarIcon: ({ size, color }) => (
            <CheckCircle size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}