import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Image } from 'react-native';
import { Icon } from './IconSet';

interface SalaryTypeModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (salaryType: string, amount: string) => void;
}

export function SalaryTypeModal({ visible, onClose, onSelect }: SalaryTypeModalProps) {
  const [selectedSalaryType, setSelectedSalaryType] = useState<string>('');
  const [salaryAmounts, setSalaryAmounts] = useState({
    hourly: '',
    daily: '',
    weekly: '',
    monthly: ''
  });

  const salaryTypes = [
    { key: 'hourly', label: '時給' },
    { key: 'daily', label: '日給' },
    { key: 'weekly', label: '週給' },
    { key: 'monthly', label: '月給' },
  ];

  const handleSelect = (salaryType: string) => {
    setSelectedSalaryType(salaryType);
  };

  const handleApply = () => {
    if (selectedSalaryType) {
      onSelect(selectedSalaryType, salaryAmounts[selectedSalaryType as keyof typeof salaryAmounts]);
      onClose();
    }
  };

  const handleReset = () => {
    setSelectedSalaryType('');
    setSalaryAmounts({
      hourly: '',
      daily: '',
      weekly: '',
      monthly: ''
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <View style={styles.headerIcon}>
                <Icon name="pul" size={24} />
              </View>
              <Text style={styles.modalTitle}>給与</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <View style={styles.closeButtonCircle}>
                <Text style={styles.closeButtonText}>×</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {salaryTypes.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={styles.optionRow}
                onPress={() => handleSelect(option.key)}
              >
                <View style={[styles.radioButton, selectedSalaryType === option.key && styles.radioButtonSelected]}>
                  {selectedSalaryType === option.key && <View style={styles.radioButtonInner} />}
                </View>
                <View style={styles.optionIcon}>
                  <Image 
                    source={require('@/assets/images/yen.png')} 
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.optionText}>{option.label}</Text>
                
                {/* Sort icons */}
                <View style={styles.sortIcons}>
                  <Icon name="chevron-up" size={12} color="#000000" />
                  <Icon name="chevron-down" size={12} color="#000000" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>リセット</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.applyButton,
                !selectedSalaryType && styles.applyButtonDisabled
              ]}
              onPress={handleApply}
              disabled={!selectedSalaryType}
            >
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
  modal: {
    width: '80%',
    maxHeight: '70%',
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
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
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '400',
  },
  content: {
    padding: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  radioButtonSelected: {
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  sortIcons: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  optionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD700', // Yellow background
    borderWidth: 2,
    borderColor: '#FFA500', // Orange border
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    marginRight: 16,
    minWidth: 60,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
  },
  applyButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
