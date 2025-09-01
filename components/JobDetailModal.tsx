import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Dimensions } from 'react-native';
import { Job } from '@/types/Job';
import { Icon, IconSets } from './IconSet';
import { colors } from '@/types/colors';
import { WorkDayBadge } from './WorkDayBadge';
import { useLanguage } from '@/contexts/LanguageContext';

type DetailType = 'salary' | 'japanese' | 'commute' | 'location' | 'workDays' | 'workHours' | 'highlights' | 'jobContent';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface JobDetailModalProps {
  visible: boolean;
  onClose: () => void;
  type: DetailType;
  job: Job;
}

export function JobDetailModal({ visible, onClose, type, job }: JobDetailModalProps) {
  const { t } = useLanguage();
  
  const getModalContent = () => {
    switch (type) {
      case 'salary':
        return {
          title: t('modal.salary.title'),
          icon: 'dollar-sign',
          content: (
            <View style={styles.contentContainer}>
              <Text style={styles.sectionTitle}>{t('modal.salary.basic')}</Text>
              <Text style={styles.salaryAmount}>¥{Math.floor(Math.random() * 500 + 1000).toLocaleString()}/時間</Text>
              <Text style={styles.description}>
                {t('modal.salary.description')}
              </Text>
              
              <Text style={styles.sectionTitle}>{t('modal.salary.payment')}</Text>
              <View style={styles.benefitsContainer}>
                <Text style={styles.bulletPoint}>• {t('modal.salary.monthlyPayment')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.salary.bankTransfer')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.salary.transportAllowance')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.salary.raiseSystem')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.salary.overtimePay')}</Text>
              </View>
            </View>
          )
        };

      case 'japanese':
        return {
          title: t('modal.japanese.title'),
          icon: 'message-circle',
          content: (
            <View style={styles.contentContainer}>
              <Text style={styles.sectionTitle}>{t('modal.japanese.recommended')}</Text>
              <Text style={styles.levelText}>{job.japaneseLevel}</Text>
              <Text style={styles.description}>
                {t('modal.japanese.description')}
              </Text>
              
              <Text style={styles.sectionTitle}>{t('modal.japanese.skills')}</Text>
              <View style={styles.benefitsContainer}>
                <Text style={styles.bulletPoint}>• {t('modal.japanese.dailyConversation')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.japanese.workInstructions')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.japanese.reporting')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.japanese.keigo')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.japanese.numbers')}</Text>
              </View>
            </View>
          )
        };

      case 'commute':
        return {
          title: t('modal.commute.title'),
          icon: 'home',
          content: (
            <View style={styles.contentContainer}>
              <Text style={styles.sectionTitle}>{t('modal.commute.title')}</Text>
              <Text style={styles.commuteTime}>{job.commuteTime}</Text>
              <Text style={styles.description}>
                {t('modal.commute.description')}
              </Text>
              
              <Text style={styles.sectionTitle}>{t('modal.commute.options')}</Text>
              <View style={styles.benefitsContainer}>
                <Text style={styles.bulletPoint}>• {t('modal.commute.shuttleBus')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.commute.bikePark')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.commute.busNearby')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.commute.trainAccess')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.commute.parking')}</Text>
              </View>
            </View>
          )
        };

      case 'location':
        return {
          title: t('modal.location.title'),
          icon: 'train',
          content: (
            <View style={styles.contentContainer}>
              <Text style={styles.sectionTitle}>{t('modal.location.details')}</Text>
              <Text style={styles.locationText}>{job.location}</Text>
              
              <Text style={styles.sectionTitle}>{t('modal.location.access')}</Text>
              <View style={styles.benefitsContainer}>
                <Text style={styles.bulletPoint}>• {t('modal.location.walkFromStation')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.location.parkingAvailable')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.location.mainRoad')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.location.busStop')}</Text>
              </View>
              
              <Text style={styles.sectionTitle}>{t('modal.location.surroundings')}</Text>
              <View style={styles.benefitsContainer}>
                <Text style={styles.bulletPoint}>• {t('modal.location.convenience')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.location.restaurants')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.location.atm')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.location.hospital')}</Text>
              </View>
            </View>
          )
        };

      case 'workDays':
        return {
          title: t('modal.workDays.title'),
          icon: 'calendar',
          content: (
            <View style={styles.contentContainer}>
              <Text style={styles.sectionTitle}>{t('modal.workDays.schedule')}</Text>
              <Text style={styles.subTitle}>{t('modal.workDays.shift1')}</Text>
              <Text style={styles.workDaysTitle}>{t('modal.workDays.weekdays')}</Text>
              
              <View style={styles.workDaysDisplay}>
                {job.workDays.map((day, index) => (
                  <WorkDayBadge key={index} day={day} />
                ))}
              </View>
              
              <Text style={styles.description}>
                {t('modal.workDays.description')}
              </Text>
            </View>
          )
        };

      case 'workHours':
        return {
          title: t('modal.workHours.title'),
          icon: 'clock',
          content: (
            <View style={styles.contentContainer}>
              <Text style={styles.sectionTitle}>{t('modal.workHours.schedule')}</Text>
              <Text style={styles.subTitle}>{t('modal.workHours.shift1')}</Text>
              <Text style={styles.workDaysTitle}>{t('modal.workHours.weekdays')}</Text>
              <Text style={styles.workTimeText}>{t('modal.workHours.time')}</Text>
              
              <Text style={styles.description}>
                {t('modal.workHours.description')}
              </Text>
              
              <Text style={styles.sectionTitle}>{t('modal.workHours.break')}</Text>
              <View style={styles.benefitsContainer}>
                <Text style={styles.bulletPoint}>• {t('modal.workHours.break30')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.workHours.breakRoom')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.workHours.freeDrink')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.workHours.wifi')}</Text>
              </View>
            </View>
          )
        };

      case 'highlights':
        return {
          title: t('modal.highlights.title'),
          icon: 'star',
          content: (
            <View style={styles.contentContainer}>
              <Text style={styles.sectionTitle}>{t('modal.highlights.appeal')}</Text>
              <Text style={styles.description}>
                {t('modal.highlights.description')}
              </Text>
              
              <Text style={styles.highlightItem}>{t('modal.highlights.noExperience')}</Text>
              
              {job.highlights && job.highlights.map((highlight, index) => (
                <Text key={index} style={styles.bulletPoint}>• {highlight}</Text>
              ))}
              
              <Text style={styles.sectionTitle}>{t('modal.highlights.other')}</Text>
              <View style={styles.benefitsContainer}>
                <Text style={styles.bulletPoint}>• {t('modal.highlights.insurance')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.highlights.raise')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.highlights.uniform')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.highlights.training')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.highlights.discount')}</Text>
              </View>
            </View>
          )
        };

      case 'jobContent':
        return {
          title: t('modal.jobContent.title'),
          icon: 'package',
          content: (
            <View style={styles.contentContainer}>
              <Text style={styles.sectionTitle}>{t('modal.jobContent.title')}</Text>
              <Text style={styles.description}>
                {t('modal.jobContent.description')}
              </Text>
              
              <Text style={styles.sectionTitle}>{t('modal.jobContent.mainTasks')}</Text>
              <View style={styles.benefitsContainer}>
                <Text style={styles.bulletPoint}>• {job.title}に関する業務全般</Text>
                <Text style={styles.bulletPoint}>• {t('modal.jobContent.teamwork')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.jobContent.safety')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.jobContent.quality')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.jobContent.reporting')}</Text>
              </View>
              
              <Text style={styles.sectionTitle}>{t('modal.jobContent.requirements')}</Text>
              <View style={styles.benefitsContainer}>
                <Text style={styles.bulletPoint}>• {t('modal.jobContent.motivated')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.jobContent.teamPlayer')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.jobContent.responsible')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.jobContent.learner')}</Text>
                <Text style={styles.bulletPoint}>• {t('modal.jobContent.longTerm')}</Text>
              </View>
            </View>
          )
        };

      default:
        return {
          title: 'Ma\'lumot',
          icon: 'info',
          content: <Text>Ma'lumot topilmadi</Text>
        };
    }
  };

  const modalContent = getModalContent();

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity 
        style={styles.backdrop} 
        activeOpacity={1}
        onPress={onClose}
      />
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="x" size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Icon name={modalContent.icon as any} size={20} color="#C79E6B" />
            <Text style={styles.modalTitle}>{modalContent.title}</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {modalContent.content}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    ...Platform.select({
      ios: {
        paddingTop: 60,
        paddingBottom: 40,
      },
      android: {
        paddingTop: 40,
        paddingBottom: 30,
      },
    }),
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#F9F1E5',
    borderRadius: 12,
    maxHeight: screenHeight * 0.75,
    width: Math.min(screenWidth * 0.92, 380),
    minHeight: 180,
    zIndex: 1001,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
    ...Platform.select({
      android: {
        elevation: 8,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#C79E6B',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  closeButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: 'white',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 8,
    textAlignVertical: 'center',
  },
  placeholder: {
    width: 40,
  },
  modalContent: {
    flexGrow: 1,
    padding: 12,
    paddingTop: 16,
  },
  contentContainer: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 6,
    paddingBottom: 4,
    borderBottomWidth: 1.5,
    borderBottomColor: '#C79E6B',
  },
  subTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#C79E6B',
    marginBottom: 3,
  },
  description: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    lineHeight: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#C79E6B',
  },
  bulletPoint: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: colors.text,
    lineHeight: 18,
    paddingVertical: 2,
    paddingLeft: 4,
  },
  salaryAmount: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#C79E6B',
    textAlign: 'center',
    marginVertical: 8,
    backgroundColor: 'rgba(199, 158, 107, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#C79E6B',
  },
  levelText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#C79E6B',
    textAlign: 'center',
    marginVertical: 8,
    backgroundColor: 'rgba(199, 158, 107, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#C79E6B',
  },
  commuteTime: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#C79E6B',
    textAlign: 'center',
    marginVertical: 8,
    backgroundColor: 'rgba(199, 158, 107, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#C79E6B',
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#C79E6B',
    textAlign: 'center',
    marginVertical: 8,
    backgroundColor: 'rgba(199, 158, 107, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#C79E6B',
  },
  workDaysTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    textAlign: 'center',
    marginVertical: 6,
  },
  workDaysDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginVertical: 6,
    flexWrap: 'wrap',
  },
  workTimeText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#C79E6B',
    textAlign: 'center',
    marginVertical: 8,
    backgroundColor: 'rgba(199, 158, 107, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#C79E6B',
  },
  highlightItem: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#C79E6B',
    textAlign: 'center',
    marginVertical: 8,
    backgroundColor: 'rgba(199, 158, 107, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#C79E6B',
  },
  benefitsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#C79E6B',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
