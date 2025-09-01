import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import { Icon } from './IconSet';

interface CommuteModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export function CommuteModal({ isVisible, onClose }: CommuteModalProps) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header with close button and house icon */}
          <View style={styles.header}>
            <View style={styles.houseIconContainer}>
            <View style={styles.houseIcon}>
              <Image 
                source={require('@/assets/images/house.png')} 
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
              <View style={styles.infoBadge}>
                <Image 
                  source={require('@/assets/images/info.png')} 
                  style={{ width: 16, height: 16 }}
                  resizeMode="contain"
                />
              </View>
            </View>
            <Text style={styles.title}>通勤時間と通勤オプション</Text>
          </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Main content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Description */}
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionText}>
                プロフィールから通勤時間と通勤オプションを設定できます。オプションです。
              </Text>
            </View>
            
                         {/* Commute options */}
             <View style={styles.optionsContainer}>
               <TouchableOpacity 
                 style={styles.optionRow} 
                 activeOpacity={0.7}
               >
                 <View style={styles.optionIcon}>
                   <Image 
                     source={require('@/assets/images/bus.png')} 
                     style={{ width: 20, height: 20 }}
                     resizeMode="contain"
                   />
                 </View>
                 <Text style={styles.optionText}>送迎バスあり</Text>
               </TouchableOpacity>

               <TouchableOpacity 
                 style={styles.optionRow} 
                 activeOpacity={0.7}
               >
                 <View style={styles.optionIcon}>
                   <Image 
                     source={require('@/assets/images/bicycle.png')} 
                     style={{ width: 20, height: 20 }}
                     resizeMode="contain"
                   />
                 </View>
                 <Text style={styles.optionText}>駐車場あり</Text>
               </TouchableOpacity>

               <TouchableOpacity 
                 style={styles.optionRow} 
                 activeOpacity={0.7}
               >
                 <View style={styles.optionIcon}>
                   <Icon name="map-pin" size={20} color="#EF4444" />
                 </View>
                 <Text style={styles.optionText}>バス停近く</Text>
               </TouchableOpacity>
            </View>
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
    backgroundColor: '#f9efe7',
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
  houseIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  houseIcon: {
    position: 'relative',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ede1d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#6ba6b6',
    flex: 1,
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
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6ba6b6',
    lineHeight: 24,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6ba6b6',
    lineHeight: 24,
    marginBottom: 16,
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5cb3c4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6ba6b6',
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6ba6b6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6ba6b6',
  },
});
