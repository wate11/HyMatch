import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'expo-router';
import { ChevronLeft, Check } from 'lucide-react-native';
import { useTheme } from '../_layout';

export default function LanguageSettings() {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const { theme } = useTheme();

  const languages = [
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
  ];

  const handleSelect = (code: string) => {
    setLanguage(code as any);
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' && { backgroundColor: '#18181b' }]}>
      <View style={[styles.header, theme === 'dark' && { backgroundColor: '#222' }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#10B981" />
        </TouchableOpacity>
        <Text style={[styles.title, theme === 'dark' && { color: '#10B981' }]}>{t('language.select') || 'Select Language'}</Text>
        <View style={{ width: 44 }} />
      </View>
      <View style={[styles.list, theme === 'dark' && { backgroundColor: '#18181b' }]}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.langButton,
              language === lang.code && styles.langButtonActive,
              theme === 'dark' && { backgroundColor: '#27272a', borderColor: '#10B981' }
            ]}
            onPress={() => handleSelect(lang.code)}
          >
            <Text style={styles.flag}>{lang.flag}</Text>
            <Text style={[
              styles.langName,
              language === lang.code && styles.langNameActive,
              theme === 'dark' && { color: '#a1a1aa' }
            ]}>{lang.name}</Text>
            {language === lang.code && <Check size={20} color="#10B981" />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
    flex: 1,
    textAlign: 'center',
  },
  list: {
    padding: 24,
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  langButtonActive: {
    borderColor: '#10B981',
    backgroundColor: '#f0fdf4',
  },
  flag: {
    fontSize: 22,
    marginRight: 16,
  },
  langName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    flex: 1,
  },
  langNameActive: {
    color: '#10B981',
    fontFamily: 'Inter-Bold',
  },
}); 