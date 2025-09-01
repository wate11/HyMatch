import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from './IconSet';

interface EmploymentPeriodModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (selectedOption: string | null) => void;
}

export default function EmploymentPeriodModal({ visible, onClose, onApply }: EmploymentPeriodModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleApply = () => {
    onApply(selectedOption);
    onClose();
  };

  const handleReset = () => {
    setSelectedOption(null);
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
              <View style={styles.headerIcon}>
                <Icon name="part" size={24} />
              </View>
              <Text style={styles.title}>雇用期間</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.optionsContainer}>
              {/* Long Term Option */}
              <TouchableOpacity 
                style={styles.optionRow} 
                onPress={() => handleOptionSelect('long_term')}
              >
                <View style={styles.radioButton}>
                  {selectedOption === 'long_term' && <View style={styles.radioButtonInner} />}
                </View>
                <View style={styles.optionIcon}>
                  <Text style={styles.optionIconText}>LONG{'\n'}TERM</Text>
                </View>
                <Text style={styles.optionText}>長期</Text>
              </TouchableOpacity>

              {/* Short Term Option */}
              <TouchableOpacity 
                style={styles.optionRow} 
                onPress={() => handleOptionSelect('short_term')}
              >
                <View style={styles.radioButton}>
                  {selectedOption === 'short_term' && <View style={styles.radioButtonInner} />}
                </View>
                <View style={styles.optionIcon}>
                  <Text style={styles.optionIconText}>SHORT{'\n'}TERM</Text>
                </View>
                <Text style={styles.optionText}>短期</Text>
              </TouchableOpacity>
            </View>
          </View>

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
    backgroundColor: '#e3dad1',
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
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3dad1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#000000',
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
    backgroundColor: '#e3dad1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionIconText: {
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: '#8B4513',
    textAlign: 'center',
    lineHeight: 10,
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
