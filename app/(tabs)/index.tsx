import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { SwipeCards } from '@/components/SwipeCards';
import { Menu } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/IconSet';
import { useLanguage } from '@/contexts/LanguageContext';
import { CustomFooter } from '@/components/CustomFooter';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { ComprehensiveFilterModal } from '@/components/ComprehensiveFilterModal';
import { useTheme } from '../_layout';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' && { backgroundColor: '#18181b' }]}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <HamburgerMenu />
          
          <View style={styles.titleContainer}>
            <Text style={[styles.title, theme === 'dark' && { color: '#fff' }]}>{t('app.title')}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsFilterModalVisible(true)}
          >
            <Icon name="filter1_icon" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.content}>
        <SwipeCards />
      </View>
      
      <CustomFooter />

      {/* Comprehensive Filter Modal */}
      <ComprehensiveFilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9efe7',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: '#ffffff',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#c29c79',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});