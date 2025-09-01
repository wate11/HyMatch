import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Globe } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LanguageSelector } from '@/components/LanguageSelector';
import React from 'react';
import { useTheme } from './_layout';

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <LinearGradient colors={['#C79E6B', '#C79E6B']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>{t('settings.title') || 'Settings'}</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Language Section */}
        <View style={[styles.sectionCard, theme === 'dark' && styles.sectionCardDark]}>
          <Text style={styles.sectionTitle}>{t('settings.preferences') || 'Language'}</Text>
          <TouchableOpacity style={styles.settingRow} onPress={() => router.push('./settings/language')}>
            <Globe size={20} color="#10B981" style={{ marginRight: 16 }} />
            <Text style={styles.settingText}>{t('language.select') || 'Language'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9efe7',
  },
  containerDark: {
    backgroundColor: '#18181b',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionCardDark: {
    backgroundColor: '#23272f',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
    padding: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
});