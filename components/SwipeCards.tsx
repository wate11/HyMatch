import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { JobCard } from './JobCard';
import { SwipeableCard } from './SwipeableCard';
import { JobDetailModal } from './JobDetailModal';
import { useJobs } from '@/contexts/JobContext';
import { Job } from '@/types/Job';
import { useSwipeController } from '@/contexts/SwipeControllerContext';

type DetailType = 'salary' | 'japanese' | 'commute' | 'location' | 'workDays' | 'workHours' | 'highlights' | 'jobContent';

const { width } = Dimensions.get('window');

export function SwipeCards() {
  const { jobs, addApplication, applications, clearApplications } = useJobs();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { registerHandlers } = useSwipeController();
  const [programmaticDirection, setProgrammaticDirection] = useState<null | 'left' | 'right'>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDetailType, setSelectedDetailType] = useState<DetailType>('salary');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Filter out jobs that have already been swiped
  const appliedJobIds = applications.map(app => app.jobId);
  const availableJobs = jobs.filter(job => !appliedJobIds.includes(job.id));

  const handleSwipeRight = () => {
    if (currentIndex < availableJobs.length) {
      const job = availableJobs[currentIndex];
      addApplication(job.id, 'chosen');
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleSwipeLeft = () => {
    if (currentIndex < availableJobs.length) {
      const job = availableJobs[currentIndex];
      addApplication(job.id, 'refused');
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  React.useEffect(() => {
    registerHandlers({
      like: () => setProgrammaticDirection('right'),
      refuse: () => setProgrammaticDirection('left'),
    });
  }, [registerHandlers, handleSwipeLeft, handleSwipeRight]);

  const clearProgrammatic = React.useCallback(() => setProgrammaticDirection(null), []);

  const handleDetailPress = React.useCallback((job: Job, type: DetailType) => {
    setSelectedJob(job);
    setSelectedDetailType(type);
    setModalVisible(true);
  }, []);

  const visibleJobs = availableJobs.slice(currentIndex, currentIndex + 3);

  if (visibleJobs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={{ alignItems: 'center' }}>
          <JobCard 
            job={{
              id: 'empty',
              title: 'No more jobs available',
              type: 'office',
              salary: '¥0',
              japaneseLevel: 'N5',
              commuteTime: '0 minutes',
              location: 'Everywhere',
              workDays: [],
              highlights: ['Check back later for new opportunities!'],
            }}
            onDetailPress={handleDetailPress}
          />
          <View style={{ height: 12 }} />
          <TouchableOpacity
            onPress={() => {
              clearApplications();
              setCurrentIndex(0);
            }}
            style={{
              backgroundColor: '#10B981',
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: 'white', fontFamily: 'Inter-Bold' }}>Restart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        {visibleJobs.map((job, index) => (
          <SwipeableCard
            key={job.id}
            onSwipeRight={handleSwipeRight}
            onSwipeLeft={handleSwipeLeft}
            isTop={index === 0}
            zIndex={visibleJobs.length - index}
            externalSwipeDirection={index === 0 ? programmaticDirection : null}
            onExternalSwipeComplete={clearProgrammatic}
            style={[
              styles.card,
              {
                transform: [
                  { scale: 1 - index * 0.05 },
                  { translateY: index * 10 },
                ],
              },
            ]}
          >
            <JobCard job={job} onDetailPress={handleDetailPress} />
          </SwipeableCard>
        ))}
      </View>
      
      {selectedJob && (
        <JobDetailModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          type={selectedDetailType}
          job={selectedJob}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: width - 40,
    height: 500,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 40,
    height: 500,
  },
});