import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { Icon } from './IconSet';

interface WorkingHoursModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export function WorkingHoursModal({ isVisible, onClose }: WorkingHoursModalProps) {
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
            <Text style={styles.title}>その店が募集する労働時間</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Working Hours Sections */}
          <View style={styles.content}>
                         {/* Section 1 - Active */}
             <View style={styles.section}>
               <Text style={[styles.sectionTitle, { color: '#5299b7' }]}>労働時間 ①</Text>
              
                             {/* Days Row */}
               <View style={styles.daysContainer}>
                 <View style={styles.calendarIconContainer}>
                   <Image 
                     source={require('@/assets/images/weekend.png')} 
                     style={styles.calendarIcon}
                     resizeMode="contain"
                   />
                 </View>
                 <View style={styles.daysRow}>
                   <View style={[styles.dayButton, styles.activeDay]}>
                     <Text style={styles.dayText}>MON</Text>
                     <Text style={styles.dayText}>月</Text>
                   </View>
                   <View style={[styles.dayButton, styles.activeDay]}>
                     <Text style={styles.dayText}>TUE</Text>
                     <Text style={styles.dayText}>火</Text>
                   </View>
                   <View style={[styles.dayButton, styles.activeDay]}>
                     <Text style={styles.dayText}>WED</Text>
                     <Text style={styles.dayText}>水</Text>
                   </View>
                   <View style={[styles.dayButton, styles.activeDay]}>
                     <Text style={styles.dayText}>THU</Text>
                     <Text style={styles.dayText}>木</Text>
                   </View>
                   <View style={[styles.dayButton, styles.activeDay]}>
                     <Text style={styles.dayText}>FRI</Text>
                     <Text style={styles.dayText}>金</Text>
                   </View>
                   <View style={[styles.dayButton, styles.activeDay]}>
                     <Text style={styles.dayText}>SAT</Text>
                     <Text style={styles.dayText}>土</Text>
                   </View>
                   <View style={[styles.dayButton, styles.inactiveDay]}>
                     <Text style={styles.dayText}>SUN</Text>
                     <Text style={styles.dayText}>日</Text>
                   </View>
                 </View>
               </View>
              
                             {/* Time */}
               <View style={styles.timeContainer}>
                 <Icon name="clock" size={16} color="#92400E" />
                 <Text style={styles.timeText}>05:00 ~ 08:00</Text>
               </View>
            </View>

            {/* Section 2 - Not Set */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>労働時間 ②</Text>
              
              {/* Days Row */}
              <View style={styles.daysContainer}>
                <View style={styles.calendarIconContainer}>
                  <Image 
                    source={require('@/assets/images/weekend.png')} 
                    style={styles.calendarIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.daysRow}>
                  <View style={[styles.dayButton, styles.inactiveDay]}>
                    <Text style={styles.dayText}>MON</Text>
                    <Text style={styles.dayText}>月</Text>
                  </View>
                  <View style={[styles.dayButton, styles.inactiveDay]}>
                    <Text style={styles.dayText}>TUE</Text>
                    <Text style={styles.dayText}>火</Text>
                  </View>
                  <View style={[styles.dayButton, styles.inactiveDay]}>
                    <Text style={styles.dayText}>WED</Text>
                    <Text style={styles.dayText}>水</Text>
                  </View>
                  <View style={[styles.dayButton, styles.inactiveDay]}>
                    <Text style={styles.dayText}>THU</Text>
                    <Text style={styles.dayText}>木</Text>
                  </View>
                  <View style={[styles.dayButton, styles.inactiveDay]}>
                    <Text style={styles.dayText}>FRI</Text>
                    <Text style={styles.dayText}>金</Text>
                  </View>
                  <View style={[styles.dayButton, styles.inactiveDay]}>
                    <Text style={styles.dayText}>SAT</Text>
                    <Text style={styles.dayText}>土</Text>
                  </View>
                  <View style={[styles.dayButton, styles.inactiveDay]}>
                    <Text style={styles.dayText}>SUN</Text>
                    <Text style={styles.dayText}>日</Text>
                  </View>
                </View>
              </View>
              
              {/* Status */}
              <View style={styles.timeContainer}>
                <Icon name="clock" size={16} color="#92400E" />
                <Text style={styles.statusText}>設定されていません</Text>
              </View>
            </View>

            {/* Section 3 - Not Set */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>労働時間 ③</Text>
              
              {/* Days Row */}
              <View style={styles.daysContainer}>
                <View style={styles.calendarIconContainer}>
                  <Image 
                    source={require('@/assets/images/weekend.png')} 
                    style={styles.calendarIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.daysRow}>
                  <View style={[styles.dayButton, styles.inactiveDay]}>
                    <Text style={styles.dayText}>MON</Text>
                    <Text style={styles.dayText}>月</Text>
                  </View>
                  <View style={[styles.dayButton, styles.inactiveDay]}>
                    <Text style={styles.dayText}>TUE</Text>
                    <Text style={styles.dayText}>火</Text>
                  </View>
                  <View style={[styles.dayButton, styles.inactiveDay]}>
                    <Text style={styles.dayText}>WED</Text>
                    <Text style={styles.dayText}>水</Text>
                  </View>
                  <View style={[styles.dayButton, styles.inactiveDay]}>
                    <Text style={styles.dayText}>THU</Text>
                    <Text style={styles.dayText}>木</Text>
                  </View>
                  <View style={[styles.dayButton, styles.inactiveDay]}>
                    <Text style={styles.dayText}>FRI</Text>
                    <Text style={styles.dayText}>金</Text>
                  </View>
                  <View style={[styles.dayButton, styles.inactiveDay]}>
                    <Text style={styles.dayText}>SAT</Text>
                    <Text style={styles.dayText}>土</Text>
                  </View>
                  <View style={[styles.dayButton, styles.inactiveDay]}>
                    <Text style={styles.dayText}>SUN</Text>
                    <Text style={styles.dayText}>日</Text>
                  </View>
                </View>
              </View>
              
              {/* Status */}
              <View style={styles.timeContainer}>
                <Icon name="clock" size={16} color="#92400E" />
                <Text style={styles.statusText}>設定されていません</Text>
              </View>
            </View>
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
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#374151',
    marginBottom: 12,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  calendarIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ede1d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  calendarIcon: {
    width: 24,
    height: 24,
  },
  daysRow: {
    flexDirection: 'row',
    gap: 4,
  },
  dayButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDay: {
    backgroundColor: '#F97316',
  },
  inactiveDay: {
    backgroundColor: '#D1D5DB',
  },
  dayText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    lineHeight: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
});
