import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, IconSets } from './IconSet';
import { colors } from '@/types/colors';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  options: Array<{ key: string; label: string; selected?: boolean }>;
  onSelect: (key: string) => void;
  multiSelect?: boolean;
}

export function FilterModal({ 
  visible, 
  onClose, 
  title, 
  options, 
  onSelect, 
  multiSelect = false 
}: FilterModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="x" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.content}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.option,
                  option.selected && styles.optionSelected
                ]}
                onPress={() => onSelect(option.key)}
              >
                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionText,
                    option.selected && styles.optionTextSelected
                  ]}>
                    {option.label}
                  </Text>
                  {option.selected && (
                    <View style={styles.checkbox}>
                      <Icon name="check-circle" size={16} color={colors.primary} />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: colors.card,
    borderRadius: 16,
    width: '80%',
    maxHeight: '70%',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: colors.gray[50],
  },
  optionSelected: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.primary,
    fontFamily: 'Inter-Bold',
  },
  checkbox: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 