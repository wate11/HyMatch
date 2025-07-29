import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, Check } from 'lucide-react-native';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  const languages = [
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'uz', name: 'O\'zbek', flag: '🇺🇿' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode as any);
    setIsVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.flag}>{currentLanguage?.flag}</Text>
        <Text style={styles.languageName}>{currentLanguage?.name}</Text>
        <ChevronDown size={16} color="#6b7280" />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.dropdown}>
            <Text style={styles.dropdownTitle}>{t('language.select')}</Text>
            <FlatList
              data={languages}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    language === item.code && styles.languageOptionActive
                  ]}
                  onPress={() => handleLanguageSelect(item.code)}
                >
                  <Text style={styles.optionFlag}>{item.flag}</Text>
                  <Text style={[
                    styles.optionName,
                    language === item.code && styles.optionNameActive
                  ]}>
                    {item.name}
                  </Text>
                  {language === item.code && (
                    <Check size={20} color="#10B981" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flag: {
    fontSize: 16,
    marginRight: 8,
  },
  languageName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginRight: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  dropdownTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  languageOptionActive: {
    backgroundColor: '#f0fdf4',
  },
  optionFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  optionName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    flex: 1,
  },
  optionNameActive: {
    color: '#10B981',
    fontFamily: 'Inter-SemiBold',
  },
});