import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Job } from '@/types/Job';
import { WorkDayBadge } from './WorkDayBadge';
import { Icon, IconSets } from './IconSet';
import { colors } from '@/types/colors';
import { JobCategoriesModal } from './JobCategoriesModal';
import { JapaneseLevelModal } from './JapaneseLevelModal';
import { LevelInfoModal } from './LevelInfoModal';
import { CommuteModal } from './CommuteModal';
import { WorkingHoursModal } from './WorkingHoursModal';
import { AppealPointsModal } from './AppealPointsModal';

interface JobCardProps {
  job: Job;
  onDetailPress?: (job: Job, type: DetailType) => void;
}

type DetailType = 'salary' | 'japanese' | 'commute' | 'location' | 'workDays' | 'workHours' | 'highlights' | 'jobContent';

export function JobCard({ job, onDetailPress }: JobCardProps) {
  const [isJobCategoriesVisible, setIsJobCategoriesVisible] = useState(false);
  const [isJapaneseLevelVisible, setIsJapaneseLevelVisible] = useState(false);
  const [isLevelInfoVisible, setIsLevelInfoVisible] = useState(false);
  const [isCommuteVisible, setIsCommuteVisible] = useState(false);
  const [isWorkingHoursVisible, setIsWorkingHoursVisible] = useState(false);
  const [isAppealPointsVisible, setIsAppealPointsVisible] = useState(false);

  const handleDetailPress = (type: DetailType) => {
    if (onDetailPress) {
      onDetailPress(job, type);
    }
  };

  const handleHeaderPress = () => {
    if (onDetailPress) {
      onDetailPress(job, 'jobContent');
    }
  };

  const handleBussinesPress = () => {
    setIsJobCategoriesVisible(true);
  };

  const handleCommentPress = () => {
    setIsJapaneseLevelVisible(true);
  };

  const handleLevelPress = () => {
    setIsLevelInfoVisible(true);
  };

  const handleHousePress = () => {
    setIsCommuteVisible(true);
  };

  const handleWeekendPress = () => {
    setIsWorkingHoursVisible(true);
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {/* Header with company and job type */}
        <View style={styles.header}>
          <View style={styles.companySection}>
            <View style={styles.companyIcon}>
              <Image 
                source={require('@/assets/images/store.png')} 
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.companyName}>日本マニュファクチャリング</Text>
          </View>

          {/* Horizontal separator line after store */}
          <View style={styles.separatorLine} />
          
          <TouchableOpacity style={styles.jobTypeSection} onPress={handleHeaderPress} activeOpacity={0.7}>
            <View style={styles.jobTypeIcon}>
              <Image 
                source={require('@/assets/images/task.png')} 
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
              <View style={styles.infoBadge}>
                <Image 
                  source={require('@/assets/images/info.png')} 
                  style={{ width: 18, height: 18 }}
                  resizeMode="contain"
                />
              </View>
            </View>
            <Text style={styles.jobType}>仕分け</Text>
            <TouchableOpacity style={styles.bussinesIcon} onPress={handleBussinesPress} activeOpacity={0.7}>
              <Image 
                source={require('@/assets/images/bussines.png')} 
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
              <View style={styles.infoBadge}>
                <Image 
                  source={require('@/assets/images/info.png')} 
                  style={{ width: 18, height: 18 }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Horizontal separator line */}
        <View style={styles.separatorLine} />

        {/* Job details with icons */}
        <View style={styles.detailsContainer}>
          {/* Salary */}
          <TouchableOpacity style={styles.detailRow} onPress={() => handleDetailPress('salary')} activeOpacity={0.7}>
            <View style={styles.yenIcon}>
              <Image 
                source={require('@/assets/images/yen.png')} 
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
              <View style={styles.infoBadge}>
                <Image 
                  source={require('@/assets/images/info.png')} 
                  style={{ width: 18, height: 18 }}
                  resizeMode="contain"
                />
              </View>
            </View>
            <Text style={styles.detailValue}>{job.salary}</Text>
            <TouchableOpacity style={styles.commentIcon} onPress={handleCommentPress} activeOpacity={0.7}>
              <Image 
                source={require('@/assets/images/comment.png')} 
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
              <View style={styles.infoBadge}>
                <Image 
                  source={require('@/assets/images/info.png')} 
                  style={{ width: 18, height: 18 }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.levelIcon} onPress={handleLevelPress} activeOpacity={0.7}>
              <Text style={styles.levelText}>N4</Text>
              <View style={styles.levelDots}>
                {[1, 2, 3, 4, 5].map((level) => (
                  <View 
                    key={level} 
                    style={[
                      styles.levelDot, 
                      level === 4 ? styles.levelDotActive : null
                    ]} 
                  />
                ))}
              </View>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Horizontal separator line after yen */}
          <View style={styles.separatorLine} />

          {/* Commute Time */}
          <TouchableOpacity style={styles.detailRow} onPress={handleHousePress} activeOpacity={0.7}>
            <View style={styles.houseIcon}>
              <Image 
                source={require('@/assets/images/house.png')} 
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
              <View style={styles.infoBadge}>
                <Image 
                  source={require('@/assets/images/info.png')} 
                  style={{ width: 18, height: 18 }}
                  resizeMode="contain"
                />
              </View>
            </View>
            <Text style={styles.detailValue}>?分</Text>
            <View style={styles.trainIcon}>
              <View style={styles.stationBadge}>
                <Text style={styles.stationText}>JA 18</Text>
              </View>
              <Image 
                source={require('@/assets/images/train.png')} 
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
              <View style={styles.infoBadge}>
                <Image 
                  source={require('@/assets/images/info.png')} 
                  style={{ width: 18, height: 18 }}
                  resizeMode="contain"
                />
              </View>
            </View>
            <Text style={styles.locationText}>最寄り駅</Text>
            <View style={styles.foodIcon}>
              <Image 
                source={require('@/assets/images/food.png')} 
                style={{ width: 18, height: 18 }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* Horizontal separator line after food */}
          <View style={styles.separatorLine} />

          {/* Work Days */}
          <TouchableOpacity style={styles.detailRow} onPress={handleWeekendPress} activeOpacity={0.7}>
            <View style={styles.weekendIcon}>
              <Image 
                source={require('@/assets/images/weekend.png')} 
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
              <View style={styles.infoBadge}>
                <Image 
                  source={require('@/assets/images/info.png')} 
                  style={{ width: 18, height: 18 }}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.workDaysContainer}>
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                <View key={day} style={[
                  styles.dayBadge,
                  ['MON', 'TUE', 'WED', 'THU', 'FRI'].includes(day) ? styles.weekdayBadge : styles.weekendBadge
                ]}>
                  <Text style={[
                    styles.dayText,
                    ['MON', 'TUE', 'WED', 'THU', 'FRI'].includes(day) ? styles.weekdayText : styles.weekendText
                  ]}>{day}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>

          {/* Work Hours */}
          <TouchableOpacity style={styles.detailRow} onPress={() => handleDetailPress('workHours')} activeOpacity={0.7}>
            <View style={styles.clockIcon}>
              <Icon name="clock" size={16} color="#92400E" />
            </View>
            <Text style={styles.timeText}>09:00~18:00</Text>
          </TouchableOpacity>

          {/* Horizontal separator line after clock */}
          <View style={styles.separatorLine} />

          {/* Star Rating */}
          <View style={styles.detailRow}>
            <TouchableOpacity style={styles.starIcon} onPress={() => setIsAppealPointsVisible(true)} activeOpacity={0.7}>
              <Image 
                source={require('@/assets/images/star.png')} 
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
              <View style={styles.infoBadge}>
                <Image 
                  source={require('@/assets/images/info.png')} 
                  style={{ width: 18, height: 18 }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.starText}>評価: 4.5</Text>
            <View style={styles.bargIcon}>
              <Image 
                source={require('@/assets/images/barg.png')} 
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
      
      {/* Job Categories Modal */}
      <JobCategoriesModal 
        isVisible={isJobCategoriesVisible}
        onClose={() => setIsJobCategoriesVisible(false)}
      />
      
      {/* Japanese Level Modal */}
      <JapaneseLevelModal 
        isVisible={isJapaneseLevelVisible}
        onClose={() => setIsJapaneseLevelVisible(false)}
      />
      
      {/* Level Info Modal */}
      <LevelInfoModal 
        isVisible={isLevelInfoVisible}
        onClose={() => setIsLevelInfoVisible(false)}
        level={4}
      />

      {/* Commute Modal */}
      <CommuteModal 
        isVisible={isCommuteVisible}
        onClose={() => setIsCommuteVisible(false)}
      />

      {/* Working Hours Modal */}
      <WorkingHoursModal 
        isVisible={isWorkingHoursVisible}
        onClose={() => setIsWorkingHoursVisible(false)}
      />

      {/* Appeal Points Modal */}
      <AppealPointsModal 
        isVisible={isAppealPointsVisible}
        onClose={() => setIsAppealPointsVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginHorizontal: 8,
    marginVertical: -45,
    width: '95%',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  companySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  companyIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ede1d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  companyName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    flex: 1,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
    width: '100%',
  },
  userSection: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  userIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobTypeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobTypeIcon: {
    position: 'relative',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ede1d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  jobType: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#000000',
  },
  bussinesIcon: {
    position: 'relative',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ede1d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 90,
    marginRight: 20,
  },
  yenIcon: {
    position: 'relative',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ede1d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  commentIcon: {
    position: 'relative',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ede1d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  levelIcon: {
    alignItems: 'center',
    marginLeft: 12,
  },
  levelText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginBottom: 4,
  },
  levelDots: {
    flexDirection: 'row',
    gap: 3,
  },
  levelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  levelDotActive: {
    backgroundColor: '#10B981',
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
  trainIcon: {
    position: 'relative',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ede1d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  foodIcon: {
    position: 'absolute',
    top: 38,
    left: 30,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stationBadge: {
    position: 'absolute',
    top: -15,
    left: 70,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  stationText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    lineHeight: 10,
  },
  weekendIcon: {
    position: 'relative',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ede1d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  clockIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ede1d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 70,
    marginTop: -15,
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
  detailsContainer: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  iconContainer: {
    position: 'relative',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  detailValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    flex: 1,
  },
  locationText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginLeft: 8,
    marginTop: 24,
  },
  ratingDots: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  workDaysContainer: {
    flexDirection: 'row',
    gap: 6,
    flex: 1,
    alignItems: 'center',
  },
  dayBadge: {
    position: 'relative',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weekdayBadge: {
    backgroundColor: '#F97316',
  },
  weekendBadge: {
    backgroundColor: '#D1D5DB',
  },
  dayText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  weekdayText: {
    color: '#FFFFFF',
  },
  weekendText: {
    color: '#374151',
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginLeft: 8,
    marginTop: -15,
  },
  starIcon: {
    position: 'relative',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ede1d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  starText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#000000',
  },
  bargIcon: {
    position: 'relative',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ede1d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 25,
  },
});