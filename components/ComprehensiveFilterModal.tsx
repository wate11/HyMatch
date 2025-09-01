import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Icon } from './IconSet';
import { colors } from '@/types/colors';
import { SalaryTypeModal } from './SalaryTypeModal';
import { JobTypeModal } from './JobTypeModal';
import { WorkImportanceModal } from './WorkImportanceModal';
import EmploymentPeriodModal from './EmploymentPeriodModal';
import EmploymentTypeModal from './EmploymentTypeModal';
import { useRouter } from 'expo-router';


interface ComprehensiveFilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ComprehensiveFilterModal({ visible, onClose }: ComprehensiveFilterModalProps) {
  const router = useRouter();
  const [selectedSort, setSelectedSort] = useState<string>('salary');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedCommuteOptions, setSelectedCommuteOptions] = useState<string[]>([]);
  const [isSalaryTypeModalVisible, setIsSalaryTypeModalVisible] = useState(false);
  const [isJobTypeModalVisible, setIsJobTypeModalVisible] = useState(false);
  const [isCommuteModalVisible, setIsCommuteModalVisible] = useState(false);
  const [isWorkImportanceModalVisible, setIsWorkImportanceModalVisible] = useState(false);
  const [isEmploymentPeriodModalVisible, setIsEmploymentPeriodModalVisible] = useState(false);
  const [isEmploymentTypeModalVisible, setIsEmploymentTypeModalVisible] = useState(false);
  const [isJapaneseLevelModalVisible, setIsJapaneseLevelModalVisible] = useState(false);


  const sortOptions = [
    { key: 'salary', label: '給与', icon: 'pul', color: '#e8dcc9' },
    { key: 'commute_home', label: '通勤時間 (自宅)', icon: 'house', color: '#e8dcc9' },
    { key: 'commute_school', label: '通勤時間 (学校)', icon: 'maktab', color: '#e8dcc9' },
  ];

  const filterOptions = [
    { key: 'job_type', label: '希望職種', icon: 'task', color: '#e8dcc9' },
            { key: 'japanese_level', label: '日本語レベル', icon: 'chat1_icon', color: '#e8dcc9' },
    { key: 'commute_convenience', label: '通勤に便利なこと', icon: 'food', color: '#e8dcc9' },
              { key: 'work_importance', label: '仕事で大事な事', icon: 'star_icon', color: '#e8dcc9' },
    { key: 'employment_type', label: '雇用形態', icon: 'kelishuv', color: '#e8dcc9' },
    { key: 'employment_period', label: '雇用期間', icon: 'part', color: '#e8dcc9' },
  
  ];

  const handleSortSelect = (key: string) => {
    if (key === 'salary') {
      setIsSalaryTypeModalVisible(true);
    } else {
      setSelectedSort(key);
    }
  };

  const handleFilterToggle = (key: string) => {
    if (key === 'salary_filter') {
      setIsSalaryTypeModalVisible(true);
    } else if (key === 'job_type') {
      setIsJobTypeModalVisible(true);
    } else if (key === 'commute_convenience') {
      setIsCommuteModalVisible(true);
    } else if (key === 'work_importance') {
      setIsWorkImportanceModalVisible(true);
    } else if (key === 'employment_period') {
      setIsEmploymentPeriodModalVisible(true);
    } else if (key === 'employment_type') {
      setIsEmploymentTypeModalVisible(true);
    } else if (key === 'japanese_level') {
      setIsJapaneseLevelModalVisible(true);
    } else {
      setSelectedFilters(prev => 
        prev.includes(key) 
          ? prev.filter(item => item !== key)
          : [...prev, key]
      );
    }
  };

  const handleSalaryTypeSelect = (salaryType: string, amount: string) => {
    setSelectedSalaryType(salaryType);
    console.log('Selected salary type:', salaryType, 'Amount:', amount);
    // Bu yerda tanlangan ish haqi turini va miqdorini saqlash mumkin
  };

  const handleJobTypeSelect = (jobType: string) => {
    setSelectedJobType(jobType);
    console.log('Selected job type:', jobType);
    // Bu yerda tanlangan ish turini saqlash mumkin
  };

  const handleWorkImportanceSelect = (selectedOptions: string[]) => {
    setSelectedWorkImportance(selectedOptions);
    console.log('Selected work importance options:', selectedOptions);
    // Bu yerda tanlangan ish muhimliklarini saqlash mumkin
  };

  const handleEmploymentPeriodSelect = (selectedOption: string | null) => {
    setSelectedEmploymentPeriod(selectedOption || '');
    console.log('Selected employment period:', selectedOption);
    // Bu yerda tanlangan ish davrini saqlash mumkin
  };

  const handleEmploymentTypeSelect = (selectedOption: string | null) => {
    setSelectedEmploymentType(selectedOption || '');
    console.log('Selected employment type:', selectedOption);
    // Bu yerda tanlangan ish turini saqlash mumkin
  };

  const handleCommuteOptionToggle = (option: string) => {
    setSelectedCommuteOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const [selectedJapaneseLevel, setSelectedJapaneseLevel] = useState<string>('');
  const [selectedSalaryType, setSelectedSalaryType] = useState<string>('');
  const [selectedJobType, setSelectedJobType] = useState<string>('');
  const [selectedWorkImportance, setSelectedWorkImportance] = useState<string[]>([]);
  const [selectedEmploymentPeriod, setSelectedEmploymentPeriod] = useState<string>('');
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string>('');

  const handleJapaneseLevelSelect = (selectedLevel: string) => {
    setSelectedJapaneseLevel(selectedLevel);
    console.log('Selected Japanese level:', selectedLevel);
    // Bu yerda tanlangan yapon tili darajasini saqlash mumkin
  };



  const handleApply = () => {
    // Apply filters logic here
    console.log('Selected sort:', selectedSort);
    console.log('Selected filters:', selectedFilters);
    console.log('Selected commute options:', selectedCommuteOptions);
    console.log('Selected Japanese level:', selectedJapaneseLevel);
    console.log('Selected salary type:', selectedSalaryType);
    console.log('Selected job type:', selectedJobType);
    console.log('Selected work importance:', selectedWorkImportance);
    console.log('Selected employment period:', selectedEmploymentPeriod);
    console.log('Selected employment type:', selectedEmploymentType);
    
    // Bu yerda tanlangan ma'lumotlarni saqlash mumkin
    // Va job card sahifasiga o'tish mumkin
    
    // Job card sahifasiga o'tish
    router.push('/');
    
    onClose();
  };

  const handleReset = () => {
    setSelectedSort('salary');
    setSelectedFilters([]);
    setSelectedCommuteOptions([]);
    setSelectedJapaneseLevel('');
    setSelectedSalaryType('');
    setSelectedJobType('');
    setSelectedWorkImportance([]);
    setSelectedEmploymentPeriod('');
    setSelectedEmploymentType('');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="x" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Sort Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Icon name="sort" size={20} color={colors.primary} />
                </View>
                <Text style={styles.sectionTitle}>ソート</Text>
              </View>
              
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.option,
                    selectedSort === option.key && styles.optionSelected
                  ]}
                  onPress={() => handleSortSelect(option.key)}
                >
                  <View style={styles.optionContent}>
                    <View style={styles.optionLeft}>
                      <View style={[styles.radioButton, selectedSort === option.key && styles.radioButtonSelected]}>
                        {selectedSort === option.key && <View style={styles.radioButtonInner} />}
                      </View>
                      <View style={[styles.optionIcon, { backgroundColor: option.color }]}>
                        {option.icon === 'yen' ? (
                          <Image 
                            source={require('@/assets/images/yen.png')} 
                            style={{ width: 16, height: 16, tintColor: '#FFFFFF' }} 
                          />
                        ) : (
                          <Icon name={option.icon as any} size={16} color="#FFFFFF" />
                        )}
                      </View>
                      <Text style={styles.optionText}>{option.label}</Text>
                    </View>
                    <View style={styles.reorderIcons}>
                      <Icon name="chevron-up" size={16} color={colors.gray[400]} />
                      <Icon name="chevron-down" size={16} color={colors.gray[400]} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Filter Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Icon name="filter_icon" size={20} color={colors.primary} />
                </View>
                <Text style={styles.sectionTitle}>フィルタ</Text>
              </View>
              
              {filterOptions.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.option,
                    selectedFilters.includes(option.key) && styles.optionSelected
                  ]}
                  onPress={() => handleFilterToggle(option.key)}
                >
                  <View style={styles.optionContent}>
                    <View style={styles.optionLeft}>
                      <View style={[styles.radioButton, selectedFilters.includes(option.key) && styles.radioButtonSelected]}>
                        {selectedFilters.includes(option.key) && <View style={styles.radioButtonInner} />}
                      </View>
                      <View style={[styles.optionIcon, { backgroundColor: option.color }]}>
                        {option.icon === 'yen' ? (
                          <Image 
                            source={require('@/assets/images/yen.png')} 
                            style={{ width: 16, height: 16, tintColor: '#FFFFFF' }} 
                          />
                        ) : (
                          <Icon name={option.icon as any} size={16} color="#FFFFFF" />
                        )}
                      </View>
                      <Text style={styles.optionText}>{option.label}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>リセット</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>適用</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Salary Type Modal */}
      <SalaryTypeModal
        visible={isSalaryTypeModalVisible}
        onClose={() => setIsSalaryTypeModalVisible(false)}
        onSelect={handleSalaryTypeSelect}
      />

      {/* Job Type Modal */}
      <JobTypeModal
        visible={isJobTypeModalVisible}
        onClose={() => setIsJobTypeModalVisible(false)}
        onSelect={handleJobTypeSelect}
      />

      {/* Commute Modal */}
      <Modal
        visible={isCommuteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsCommuteModalVisible(false)}
      >
        <View style={styles.commuteOverlay}>
          <View style={styles.commuteModalContainer}>
            {/* Header with close button and foot1 icon */}
            <View style={styles.commuteHeader}>
              <View style={styles.commuteIconContainer}>
                <View style={styles.commuteIcon}>
                  <Icon name="foot1_icon" size={28} />
                </View>
                <Text style={styles.commuteTitle}>通勤に便利なこと</Text>
              </View>
              <TouchableOpacity style={styles.commuteCloseButton} onPress={() => setIsCommuteModalVisible(false)}>
                <Text style={styles.commuteCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Main content */}
            <ScrollView style={styles.commuteContent} showsVerticalScrollIndicator={false}>
              {/* Commute options */}
              <View style={styles.commuteOptionsContainer}>
                <TouchableOpacity 
                  style={styles.commuteOptionRow} 
                  onPress={() => handleCommuteOptionToggle('shuttle_bus')}
                  activeOpacity={0.7}
                >
                  <View style={styles.commuteRadioButton}>
                    {selectedCommuteOptions.includes('shuttle_bus') && (
                      <View style={styles.commuteRadioButtonInner} />
                    )}
                  </View>
                  <View style={styles.commuteOptionIcon}>
                    <Image 
                      source={require('@/assets/images/bus.png')} 
                      style={{ width: 20, height: 20 }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.commuteOptionText}>送迎バスあり</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.commuteOptionRow} 
                  onPress={() => handleCommuteOptionToggle('parking')}
                  activeOpacity={0.7}
                >
                  <View style={styles.commuteRadioButton}>
                    {selectedCommuteOptions.includes('parking') && (
                      <View style={styles.commuteRadioButtonInner} />
                    )}
                  </View>
                  <View style={styles.commuteOptionIcon}>
                    <Image 
                      source={require('@/assets/images/bicycle.png')} 
                      style={{ width: 20, height: 20 }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.commuteOptionText}>駐車場あり</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.commuteOptionRow} 
                  onPress={() => handleCommuteOptionToggle('bus_stop')}
                  activeOpacity={0.7}
                >
                  <View style={styles.commuteRadioButton}>
                    {selectedCommuteOptions.includes('bus_stop') && (
                      <View style={styles.commuteRadioButtonInner} />
                    )}
                  </View>
                  <View style={styles.commuteOptionIcon}>
                    <Icon name="map-pin" size={20} color="#EF4444" />
                  </View>
                  <Text style={styles.commuteOptionText}>バス停近く</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Work Importance Modal */}
      <WorkImportanceModal
        visible={isWorkImportanceModalVisible}
        onClose={() => setIsWorkImportanceModalVisible(false)}
        onSelect={handleWorkImportanceSelect}
      />
      <EmploymentPeriodModal
        visible={isEmploymentPeriodModalVisible}
        onClose={() => setIsEmploymentPeriodModalVisible(false)}
        onApply={handleEmploymentPeriodSelect}
      />
      <EmploymentTypeModal
        visible={isEmploymentTypeModalVisible}
        onClose={() => setIsEmploymentTypeModalVisible(false)}
        onApply={handleEmploymentTypeSelect}
      />

      {/* Inline Japanese Level Modal */}
      <Modal
        visible={isJapaneseLevelModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsJapaneseLevelModalVisible(false)}
      >
        <View style={styles.inlineModalOverlay}>
          <View style={styles.inlineModalContainer}>
            {/* Header with close button */}
            <View style={styles.inlineModalHeader}>
              <View style={styles.inlineModalHeaderLeft}>
                <View style={styles.inlineModalIconContainer}>
                  <Icon name="chat1_icon" size={28} />
                </View>
                <Text style={styles.inlineModalTitle}>日本語レベル</Text>
              </View>
              <TouchableOpacity 
                style={styles.inlineModalCloseButton} 
                onPress={() => setIsJapaneseLevelModalVisible(false)}
              >
                <View style={styles.inlineModalCloseButtonCircle}>
                  <Text style={styles.inlineModalCloseText}>×</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.inlineModalContent}>
                              {['N5', 'N4', 'N3', 'N2', 'N1'].map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={styles.inlineModalOptionRow}
                    onPress={() => handleJapaneseLevelSelect(level)}
                  >
                    <View style={styles.inlineModalRadioButton}>
                      {selectedJapaneseLevel === level && (
                        <View style={styles.inlineModalRadioButtonInner} />
                      )}
                    </View>
                    <Text style={styles.inlineModalOptionText}>{level}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </View>
      </Modal>
      
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modal: {
    backgroundColor: '#e8e7e3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '80%',
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    alignItems: 'flex-end',
    padding: 20,
    paddingBottom: 10,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  optionSelected: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioButtonSelected: {
    borderColor: '#F59E0B',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F59E0B',
  },
  optionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
    flex: 1,
  },
  reorderIcons: {
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 20,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 10,
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  commuteOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commuteModalContainer: {
    backgroundColor: '#e8d9d2',
    borderRadius: 20,
    width: '90%',
    maxHeight: '60%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
  },
  commuteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  commuteIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  commuteIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ede1d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  commuteTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#6ba6b6',
    flex: 1,
  },
  commuteCloseButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  commuteCloseText: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    fontWeight: '900',
  },
  commuteContent: {
    padding: 20,
  },
  commuteOptionsContainer: {
    marginTop: 20,
  },
  commuteOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  commuteOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5cb3c4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  commuteOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6ba6b6',
    flex: 1,
  },
  commuteRadioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6ba6b6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  commuteRadioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6ba6b6',
  },
  // Inline Japanese Level Modal styles
  inlineModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineModalContainer: {
    width: '80%',
    maxHeight: '60%',
    backgroundColor: '#e8d9d2',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inlineModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  inlineModalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inlineModalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD700', // Yellow background
    borderWidth: 2,
    borderColor: '#FFA500', // Orange border
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  inlineModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  inlineModalCloseButton: {
    padding: 4,
  },
  inlineModalCloseButtonCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inlineModalCloseText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '400',
  },
  inlineModalContent: {
    padding: 20,
  },
  inlineModalOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  inlineModalRadioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  inlineModalRadioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000000',
  },
  inlineModalOptionText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
});
