import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from './IconSet';

interface EmploymentTypeModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (selectedOption: string | null) => void;
}

export default function EmploymentTypeModal({ visible, onClose, onApply }: EmploymentTypeModalProps) {
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
                <Icon name="kelishuv" size={24} />
              </View>
              <Text style={styles.title}>雇用形態</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.optionsContainer}>
              {/* Full-time employee */}
              <TouchableOpacity 
                style={styles.optionRow} 
                onPress={() => handleOptionSelect('full_time')}
              >
                <View style={styles.radioButton}>
                  {selectedOption === 'full_time' && <View style={styles.radioButtonInner} />}
                </View>
                <View style={styles.optionIcon}>
                  <Icon name="user" size={20} color="#3B82F6" />
                </View>
                <Text style={styles.optionText}>正社員</Text>
              </TouchableOpacity>

              {/* Contract employee */}
              <TouchableOpacity 
                style={styles.optionRow} 
                onPress={() => handleOptionSelect('contract')}
              >
                <View style={styles.radioButton}>
                  {selectedOption === 'contract' && <View style={styles.radioButtonInner} />}
                </View>
                <View style={styles.optionIcon}>
                  <Icon name="file-text" size={20} color="#10B981" />
                </View>
                <Text style={styles.optionText}>契約社員</Text>
              </TouchableOpacity>

              {/* Outsourcing */}
              <TouchableOpacity 
                style={styles.optionRow} 
                onPress={() => handleOptionSelect('outsourcing')}
              >
                <View style={styles.radioButton}>
                  {selectedOption === 'outsourcing' && <View style={styles.radioButtonInner} />}
                </View>
                <View style={styles.optionIcon}>
                  <Icon name="settings" size={20} color="#8B5CF6" />
                </View>
                <Text style={styles.optionText}>業務委託</Text>
              </TouchableOpacity>

              {/* Part-time */}
              <TouchableOpacity 
                style={styles.optionRow} 
                onPress={() => handleOptionSelect('part_time')}
              >
                <View style={styles.radioButton}>
                  {selectedOption === 'part_time' && <View style={styles.radioButtonInner} />}
                </View>
                <View style={styles.optionIcon}>
                  <Icon name="clock" size={20} color="#F59E0B" />
                </View>
                <Text style={styles.optionText}>アルバイト / パート</Text>
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
    backgroundColor: '#FFFFFF',
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
