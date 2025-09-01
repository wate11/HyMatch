import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { X } from 'lucide-react-native';

interface JobCategoriesModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const jobCategories = [
  { id: 1, name: '調理', icon: '🍳', description: 'Cooking' },
  { id: 2, name: '接客', icon: '👔', description: 'Customer Service' },
  { id: 3, name: '販売', icon: '🛍️', description: 'Sales' },
  { id: 4, name: '清掃', icon: '🧹', description: 'Cleaning' },
  { id: 5, name: '工場', icon: '🏭', description: 'Factory' },
  { id: 6, name: '倉庫', icon: '📦', description: 'Warehouse' },
  { id: 7, name: '軽作業', icon: '👷', description: 'Light Work' },
  { id: 8, name: '宅配・デリバリー', icon: '🚚', description: 'Delivery' },
  { id: 9, name: '建築・土木', icon: '🔨', description: 'Construction' },
  { id: 10, name: '医療・介護', icon: '🏥', description: 'Medical/Care' },
  { id: 11, name: '教育', icon: '📚', description: 'Education' },
  { id: 12, name: '通訳', icon: '💬', description: 'Interpretation' },
  { id: 13, name: '営業・事務', icon: '💼', description: 'Sales/Office' },
  { id: 14, name: 'クリエイティブ', icon: '🎨', description: 'Creative' },
  { id: 15, name: 'ホテル', icon: '🏨', description: 'Hotel' },
  { id: 16, name: 'ドライバー', icon: '🚗', description: 'Driver' },
];

export function JobCategoriesModal({ isVisible, onClose }: JobCategoriesModalProps) {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>職種</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#000000" />
            </TouchableOpacity>
          </View>

          {/* Job Categories List */}
          <ScrollView style={styles.categoriesList} showsVerticalScrollIndicator={false}>
            {jobCategories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryItem} activeOpacity={0.7}>
                <View style={styles.categoryIcon}>
                  <Text style={styles.iconText}>{category.icon}</Text>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    maxHeight: '70%',
    backgroundColor: '#f9efe7',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#000000',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesList: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconText: {
    fontSize: 18,
  },
  categoryName: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    color: '#000000',
    flex: 1,
  },
});
