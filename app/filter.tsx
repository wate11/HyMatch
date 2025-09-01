import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useJobs, JobFilters, SortOption } from '@/contexts/JobContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Icon, IconSets } from '@/components/IconSet';
import { colors } from '@/types/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './_layout';
import { FilterModal } from '@/components/FilterModal';
import { RangeModal } from '@/components/RangeModal';

export default function FilterScreen() {
  const router = useRouter();
  const { filters, setFilters, sortBy, setSortBy } = useJobs();
  const { t } = useLanguage();
  const [localFilters, setLocalFilters] = useState<JobFilters>(filters);
  const [localSortBy, setLocalSortBy] = useState<SortOption>(sortBy);
  const { theme } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  // Extra local UI-only states for demo preferences
  const [commutePrefs, setCommutePrefs] = useState<string[]>([]);
  const [workPrefs, setWorkPrefs] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  const jobTypes = ['cooking', 'delivery', 'cleaning', 'retail', 'restaurant', 'office', 'construction'];
  const japaneseLevels = ['N1', 'N2', 'N3', 'N4', 'N5'];
  const workDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const sortOptions: { key: SortOption; label: string }[] = [
    { key: 'wage', label: t('sort.wage') },
    { key: 'commute', label: t('sort.commute') },
    { key: 'date', label: t('sort.date') },
  ];
  
  const filterOptions = [
    { key: 'jobType', label: t('filter.jobType'), icon: 'package', color: colors.success },
    { key: 'japanese', label: t('filter.japanese'), icon: 'message-circle', color: colors.secondary },
    { key: 'wage', label: t('filter.wage'), icon: 'dollar-sign', color: colors.warning },
    { key: 'commute', label: t('filter.commute'), icon: 'train', color: colors.error },
    { key: 'work', label: t('filter.workPriority'), icon: 'star', color: colors.warning },
  ];

  // Modal data builders
  const japaneseOptions = japaneseLevels.map(level => ({ key: level, label: level, selected: localFilters.japaneseLevels.includes(level) }));
  const jobTypeOptions = jobTypes.map(type => ({ key: type, label: type, selected: localFilters.jobTypes.includes(type) }));
  const wageBuckets = [
    { key: '0-1200', label: '〜¥1,200', range: [0, 1200] as [number, number] },
    { key: '1200-1500', label: '¥1,200〜¥1,500', range: [1200, 1500] as [number, number] },
    { key: '1500-2000', label: '¥1,500〜¥2,000', range: [1500, 2000] as [number, number] },
    { key: '2000-9999', label: '¥2,000+', range: [2000, 9999] as [number, number] },
  ];
  const wageOptions = wageBuckets.map(b => ({ key: b.key, label: b.label, selected: localFilters.wageRange[0] === b.range[0] && localFilters.wageRange[1] === b.range[1] }));
  const commuteOptions = [
    { key: 'under-15', label: '15分以内', selected: commutePrefs.includes('under-15') },
    { key: 'under-30', label: '30分以内', selected: commutePrefs.includes('under-30') },
    { key: 'under-45', label: '45分以内', selected: commutePrefs.includes('under-45') },
  ];
  const workPriorityOptions = [
    { key: 'high-wage', label: '高時給', selected: workPrefs.includes('high-wage') },
    { key: 'flex-time', label: '柔軟なシフト', selected: workPrefs.includes('flex-time') },
    { key: 'near-station', label: '駅近', selected: workPrefs.includes('near-station') },
  ];

  const handleSelectFromModal = (key: string) => (value: string) => {
    switch (key) {
      case 'japanese':
        toggleJapaneseLevel(value);
        break;
      case 'jobType':
        toggleJobType(value);
        break;
      case 'wage': {
        const bucket = wageBuckets.find(b => b.key === value);
        if (bucket) setLocalFilters(prev => ({ ...prev, wageRange: bucket.range }));
        setSelectedFilter(null);
        break;
      }
      case 'commute': {
        setCommutePrefs(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
        break;
      }
      case 'work': {
        setWorkPrefs(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
        break;
      }
    }
  };

  const handleApply = () => {
    setFilters(localFilters);
    setSortBy(localSortBy);
    router.back();
  };

  const handleReset = () => {
    const resetFilters: JobFilters = {
      jobTypes: [],
      wageRange: [0, 5000],
      japaneseLevels: [],
      workDays: [],
    };
    setLocalFilters(resetFilters);
    setLocalSortBy('date');
  };

  const toggleJobType = (type: string) => {
    setLocalFilters(prev => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter(t => t !== type)
        : [...prev.jobTypes, type]
    }));
  };

  const toggleJapaneseLevel = (level: string) => {
    setLocalFilters(prev => ({
      ...prev,
      japaneseLevels: prev.japaneseLevels.includes(level)
        ? prev.japaneseLevels.filter(l => l !== level)
        : [...prev.japaneseLevels, level]
    }));
  };

  const toggleWorkDay = (day: string) => {
    setLocalFilters(prev => ({
      ...prev,
      workDays: prev.workDays.includes(day)
        ? prev.workDays.filter(d => d !== day)
        : [...prev.workDays, day]
    }));
  };

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' && { backgroundColor: colors.backgroundDark }]}>
      <LinearGradient colors={['#C79E6B', '#C79E6B']} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={[styles.title, theme === 'dark' && { color: colors.textDark }]}>{t('sort.title')}</Text>
          <TouchableOpacity
            style={[styles.closeButton, theme === 'dark' && { backgroundColor: colors.cardDark }]}
            onPress={() => router.back()}
          >
            <Icon name="x" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={[styles.content, { backgroundColor: '#F9F1E5' }]} showsVerticalScrollIndicator={false}>
        {/* Sort Section */}
        <View style={[styles.section, theme === 'dark' && { backgroundColor: colors.cardDark }]}>
          <Text style={[styles.sectionTitle, theme === 'dark' && { color: colors.textDark }]}>{t('sort.title')}</Text>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.sortOption,
                localSortBy === option.key && styles.sortOptionSelected,
                theme === 'dark' && { backgroundColor: colors.cardDark, borderColor: colors.primary }
              ]}
              onPress={() => {
                setLocalSortBy(option.key);
                setSelectedSort(option.key);
              }}
            >
              <View style={styles.sortOptionContent}>
                <View style={styles.sortOptionLeft}>
                  <Icon 
                    name={option.key === 'wage' ? 'dollar-sign' : 'clock'} 
                    size={16} 
                    color={option.key === 'wage' ? colors.warning : colors.secondary} 
                  />
                  <Text style={[
                    styles.sortOptionText,
                    localSortBy === option.key && styles.sortOptionTextSelected,
                    theme === 'dark' && { color: colors.textDark }
                  ]}>
                    {option.label}
                  </Text>
                </View>
                <View style={styles.sortOptionRight}>
                  <Icon name="chevron-up" size={16} color={colors.gray[400]} />
                  <Icon name="chevron-down" size={16} color={colors.gray[400]} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filter Section */}
        <View style={[styles.section, theme === 'dark' && { backgroundColor: colors.cardDark }]}>
          <View style={styles.filterHeader}>
            <Icon name="filter" size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, theme === 'dark' && { color: colors.textDark }]}>{t('language.select') /* header label; can change to a dedicated key if needed */}</Text>
          </View>
          
          {filterOptions.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterOption,
                theme === 'dark' && { backgroundColor: colors.cardDark, borderColor: colors.primary }
              ]}
              onPress={() => setSelectedFilter(filter.key)}
            >
              <View style={styles.filterOptionContent}>
                <View style={styles.filterOptionLeft}>
                  <Icon name={filter.icon} size={16} color={filter.color} />
                  <Text style={[
                    styles.filterOptionText,
                    theme === 'dark' && { color: colors.textDark }
                  ]}>
                    {filter.label}
                  </Text>
                </View>
                <View style={styles.filterOptionRight}>
                  <Icon name="chevron-down" size={16} color={colors.gray[400]} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* 勤務時間 section removed */}

        {/* Inline lists removed; handled via section modals above */}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>リセット</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>フィルターを適用</Text>
        </TouchableOpacity>
      </View>
      
      {/* Filter Modals */}
      <FilterModal
        visible={selectedFilter === 'japanese'}
        onClose={() => setSelectedFilter(null)}
        title={t('filter.japanese')}
        options={japaneseOptions}
        onSelect={handleSelectFromModal('japanese')}
        multiSelect={true}
      />
      <FilterModal
        visible={selectedFilter === 'jobType'}
        onClose={() => setSelectedFilter(null)}
        title={t('filter.jobType')}
        options={jobTypeOptions}
        onSelect={handleSelectFromModal('jobType')}
        multiSelect={true}
      />
      {/* 時給 as range */}
      <RangeModal
        visible={selectedFilter === 'wage'}
        onClose={() => setSelectedFilter(null)}
        title={t('filter.wage')}
        min={0}
        max={5000}
        step={50}
        value={localFilters.wageRange}
        onChange={(range) => setLocalFilters(prev => ({ ...prev, wageRange: range }))}
        format={(n) => `¥${n}`}
      />
      {/* 通勤時間 as range (minutes) */}
      <RangeModal
        visible={selectedFilter === 'commute'}
        onClose={() => setSelectedFilter(null)}
        title={t('filter.commute')}
        min={0}
        max={60}
        step={5}
        value={[0, 45]}
        onChange={() => {}}
        format={(n) => `${n} 分`}
      />
      <FilterModal
        visible={selectedFilter === 'work'}
        onClose={() => setSelectedFilter(null)}
        title="仕事で大事な事"
        options={workPriorityOptions}
        onSelect={handleSelectFromModal('work')}
        multiSelect={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.white,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 16,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sortOption: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: colors.border,
  },
  sortOptionSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  sortOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sortOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sortOptionRight: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  sortOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginLeft: 12,
  },
  sortOptionTextSelected: {
    color: colors.primary,
  },
  filterOption: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: colors.border,
  },
  filterOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  filterOptionRight: {
    alignItems: 'center',
  },
  filterOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginLeft: 12,
  },
  timeRangeContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.border,
  },
  timeRangeText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 12,
  },
  resetButton: {
    flex: 1,
    backgroundColor: colors.gray[100],
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.textSecondary,
  },
  applyButton: {
    flex: 2,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.white,
  },
});