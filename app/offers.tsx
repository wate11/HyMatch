import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/IconSet';
import { ComprehensiveFilterModal } from '@/components/ComprehensiveFilterModal';

export default function OffersScreen() {
  const router = useRouter();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back, title, and filter */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="undo_icon" size={20} color="#374151" />
        </TouchableOpacity>
        <View style={styles.titleRow}>
          <View style={[styles.roundIcon, { backgroundColor: '#87CEEB' }]}>
            <Icon name="mail" size={16} color="#ffffff" />
          </View>
          <Text style={styles.titleText}>オファー管理画面</Text>
          <View style={[styles.roundIcon, { backgroundColor: '#D97706' }]}>
            <Icon name="alert-circle" size={16} color="#ffffff" />
          </View>
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setIsFilterModalVisible(true)}>
          <Icon name="filter_icon" size={18} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Small beige bar with info */}
      <View style={styles.infoBarWrapper}>
        <View style={styles.infoBar}>
          <Icon name="alert-circle" size={14} color="#EF4444" style={{ marginRight: 6 }} />
          <Text style={styles.infoText}>オファー進行中案件が</Text>
          <Text style={styles.infoCount}>0</Text>
          <Text style={styles.infoText}>件あります</Text>
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.emptyText}>現在仕事がありません。</Text>
      </View>

      {/* Comprehensive Filter Modal */}
      <ComprehensiveFilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    height: 80,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d5ba9d',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    marginHorizontal: 8,
    fontSize: 18,
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  infoBarWrapper: {
    backgroundColor: '#EDE0D1',
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  infoText: { fontSize: 12, color: '#374151', fontFamily: 'Inter-Medium' },
  infoCount: { fontSize: 12, color: '#2563eb', marginHorizontal: 2, fontFamily: 'Inter-Bold' },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 16, color: '#6b7280', fontFamily: 'Inter-Regular' },
});


