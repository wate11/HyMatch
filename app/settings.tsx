import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Bell, Shield, CircleHelp as HelpCircle, Info, LogOut, Globe, User, Moon } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useUser } from '@/contexts/UserContext';
import React from 'react';
import { useTheme } from './_layout';

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { user, setUser } = useUser();
  const [notifications, setNotifications] = React.useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const darkMode = theme === 'dark';
  const setDarkMode = (val: boolean) => setTheme(val ? 'dark' : 'light');

  // Dummy notification switch logic
  const handleNotificationSwitch = () => setNotifications((prev) => !prev);

  const handleDeleteAccount = () => {
    setDeleteModalVisible(false);
    Alert.alert('Account Deleted', 'Your account has been deleted (dummy action).');
    // setUser(null); // Real logic would go here
  };

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <LinearGradient
        colors={['#10B981', '#059669']}
        style={styles.header}
      >
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
        {/* Account Section */}
        <View style={[styles.sectionCard, theme === 'dark' && styles.sectionCardDark]}>
          <Text style={styles.sectionTitle}>{t('settings.account') || 'Account'}</Text>
          <TouchableOpacity style={styles.settingRow} onPress={() => {/* TODO: Add account logic or navigation */}}>
            <User size={20} color="#10B981" style={{ marginRight: 16 }} />
            <Text style={styles.settingText}>{t('settings.addAccount') || 'Add Account'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow} onPress={() => setDeleteModalVisible(true)}>
            <Shield size={20} color="#EF4444" style={{ marginRight: 16 }} />
            <Text style={[styles.settingText, { color: '#EF4444' }]}>{t('settings.deleteAccount') || 'Delete Account'}</Text>
          </TouchableOpacity>
        </View>
        {/* Preferences Section */}
        <View style={[styles.sectionCard, theme === 'dark' && styles.sectionCardDark]}>
          <Text style={styles.sectionTitle}>{t('settings.preferences') || 'Preferences'}</Text>
          <TouchableOpacity style={styles.settingRow} onPress={() => router.push('./settings/language')}>
            <Globe size={20} color="#10B981" style={{ marginRight: 16 }} />
            <Text style={styles.settingText}>{t('language.select') || 'Language'}</Text>
          </TouchableOpacity>
          <View style={styles.settingRow}>
            <Moon size={20} color="#10B981" style={{ marginRight: 16 }} />
            <Text style={[styles.settingText, theme === 'dark' && { color: '#fff' }]}>{t('settings.darkMode') || 'Dark Mode'}</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#e5e7eb', true: '#2563eb' }}
                thumbColor={darkMode ? '#2563eb' : '#f4f3f4'}
              />
            </View>
          </View>
          <View style={styles.settingRow}>
            <Bell size={20} color="#10B981" style={{ marginRight: 16 }} />
            <Text style={styles.settingText}>{t('settings.notifications') || 'Notifications'}</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#e5e7eb', true: '#2563eb' }}
                thumbColor={notifications ? '#2563eb' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>
        {/* Support Section */}
        <View style={[styles.sectionCard, theme === 'dark' && styles.sectionCardDark]}>
          <Text style={styles.sectionTitle}>{t('settings.support') || 'Support'}</Text>
          <TouchableOpacity style={styles.settingRow} onPress={() => router.push('/contact')}>
            <HelpCircle size={20} color="#10B981" style={{ marginRight: 16 }} />
            <Text style={styles.settingText}>{t('settings.contact') || 'Contact Us'}</Text>
          </TouchableOpacity>
          <View style={styles.settingRow}>
            <Info size={20} color="#10B981" style={{ marginRight: 16 }} />
            <Text style={styles.settingText}>{t('settings.about') || 'About'}</Text>
          </View>
        </View>
        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>{t('settings.signOut') || 'Sign Out'}</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.copyrightText}>© 2025 HyMatch. All rights reserved.</Text>
        </View>
        {/* Delete Account Modal */}
        {deleteModalVisible && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>{t('settings.deleteAccount') || 'Delete Account'}</Text>
              <Text style={styles.modalText}>{t('settings.deleteAccountConfirm') || 'Are you sure you want to delete your account? This action cannot be undone.'}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24 }}>
                <TouchableOpacity onPress={() => setDeleteModalVisible(false)} style={{ marginRight: 16 }}>
                  <Text style={{ color: '#374151', fontWeight: 'bold' }}>{t('settings.cancel') || 'Cancel'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteAccount}>
                  <Text style={{ color: '#EF4444', fontWeight: 'bold' }}>{t('settings.delete') || 'Delete'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 20,
  },
});