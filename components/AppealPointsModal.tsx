import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';

interface AppealPointsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export function AppealPointsModal({ isVisible, onClose }: AppealPointsModalProps) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header with close button and title */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <View style={styles.starIconContainer}>
                <Image 
                  source={require('@/assets/images/star.png')} 
                  style={styles.starIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.title}>アピールしたい職場の魅力</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>企業からのアピールポイントのアイコン説明です</Text>
          </View>

                     {/* Content Item */}
           <View style={styles.contentItem}>
             <View style={styles.contentIconContainer}>
               <View style={styles.bargIconContainer}>
                 <Image 
                   source={require('@/assets/images/barg.png')} 
                   style={styles.bargIcon}
                   resizeMode="contain"
                 />
               </View>
             </View>
             <Text style={styles.contentText}>未経験OK</Text>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  starIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ede1d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  starIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#5cb3c4',
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
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#5cb3c4',
    lineHeight: 22,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  contentIconContainer: {
    marginRight: 16,
  },
  bargIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ede1d3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bargIcon: {
    width: 28,
    height: 28,
  },
  contentText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#5cb3c4',
    flex: 1,
  },
});
