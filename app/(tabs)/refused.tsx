import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { JobListItem } from '@/components/JobListItem';
import { useJobs } from '@/contexts/JobContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ComprehensiveFilterModal } from '@/components/ComprehensiveFilterModal';
import { Icon } from '@/components/IconSet';
import { useTheme } from '../_layout';

export default function RefusedScreen() {
  const { getRefusedJobs, removeApplication } = useJobs();
  const { t } = useLanguage();
  const router = useRouter();
  const refusedJobs = getRefusedJobs();
  const { theme } = useTheme();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' && { backgroundColor: '#18181b' }]}>
      <LinearGradient
        colors={theme === 'dark' ? ['#222', '#111'] : ['#FFFFFF', '#FFFFFF']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleSection}>
            <TouchableOpacity
              style={styles.undoButton}
              onPress={() => router.push('/')}
              activeOpacity={0.7}
            >
              <Image 
                source={require('@/assets/images/undo.png')} 
                style={styles.undoIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={[styles.title, theme === 'dark' && { color: '#000' }]}>{t('tabs.refused')}</Text>
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setIsFilterModalVisible(true)}
          >
            <Icon name="filter_icon" size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      {refusedJobs.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={[styles.emptyIcon, theme === 'dark' && { backgroundColor: '#27272a', borderColor: '#c79d6b' }]}>
            <X size={64} color="#c79d6b" />
          </View>
          <Text style={[styles.emptyText, theme === 'dark' && { color: '#fff' }]}>{t('empty.refused')}</Text>
          <Text style={[styles.emptySubtext, theme === 'dark' && { color: '#a1a1aa' }]}>{t('empty.refusedSub')}</Text>
        </View>
      ) : (
        <FlatList
          data={refusedJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <JobListItem job={item} />
              <TouchableOpacity
                style={styles.undo}
                onPress={() => removeApplication(item.id)}
              >
                <Text style={styles.undoText}>Undo</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

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
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginLeft: 12,
  },
  undoButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  undoIcon: {
    width: 28,
    height: 28,
    tintColor: '#000000',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#EF4444',
  },
  emptyText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  undo: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 8,
    backgroundColor: '#fee2e2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  undoText: {
    color: '#DC2626',
    fontFamily: 'Inter-Bold',
  },
});