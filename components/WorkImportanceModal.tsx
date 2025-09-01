import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import { Icon } from './IconSet';

interface WorkImportanceModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (selectedOptions: string[]) => void;
}

export function WorkImportanceModal({ visible, onClose, onSelect }: WorkImportanceModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const workImportanceOptions = [
    { key: 'vietnamese_staff', label: 'ベトナム人勤務中', icon: 'vietnam_flag' },
    { key: 'nepalese_staff', label: 'ネパール人勤務中', icon: 'nepal_flag' },
    { key: 'chinese_staff', label: '中国人勤務中', icon: 'china_flag' },
    { key: 'korean_staff', label: '韓国人勤務中', icon: 'korea_flag' },
    { key: 'shift_adjustment', label: 'シフト調整可能', icon: 'shift_clock' },
    { key: 'no_resume', label: '履歴書不要', icon: 'document_x' },
    { key: 'no_experience', label: '未経験OK', icon: 'check_circle' },
    { key: 'no_japanese', label: '日本語レベル求めない', icon: 'question_bubble' },
    { key: 'salary_increase', label: '昇給有り', icon: 'money_bag_up' },
    { key: 'fulltime_promotion', label: '正社員登用有り', icon: 'person_circle' },
    { key: 'transport_expenses', label: '交通費支給', icon: 'train_bus' },
    { key: 'meals_provided', label: 'まかないあり', icon: 'food_bowl' },
    { key: 'salary_method_negotiable', label: '給与の支払方法相談可能', icon: 'money_bag_speech' },
    { key: 'daily_payment', label: '給与の日払い可能', icon: 'money_bag_sun' },
    { key: 'weekly_payment', label: '給与の週払い可能', icon: 'money_bag_week' },
    { key: 'monthly_payment', label: '給与の月払い可能', icon: 'money_bag_month' },
    { key: 'electronic_payment', label: '給与の電子マネー支払い可能', icon: 'money_bag_card' },
    { key: 'cash_payment', label: '給与の手渡し可能', icon: 'money_bag_hand' },
  ];

  const handleOptionToggle = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleApply = () => {
    onSelect(selectedOptions);
    onClose();
  };

  const handleReset = () => {
    setSelectedOptions([]);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Image 
                source={require('@/assets/images/star.png')} 
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
              <Text style={styles.title}>仕事で大事な事</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.optionsContainer}>
              {workImportanceOptions.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={styles.optionRow}
                  onPress={() => handleOptionToggle(option.key)}
                  activeOpacity={0.7}
                >
                  <View style={styles.radioButton}>
                    {selectedOptions.includes(option.key) && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                                      <View style={styles.optionIcon}>
                      <Icon name={option.icon} size={20} />
                    </View>
                  <Text style={styles.optionText}>{option.label}</Text>
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#e8d9d2',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginLeft: 12,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    fontWeight: '900',
  },
  content: {
    padding: 20,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000000',
  },
      optionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#e8d9d2',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#000000',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  applyButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#6ba6b6',
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
});
