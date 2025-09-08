import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Job } from '@/types/Job';
import { JobApplication } from '@/types/JobApplication';
import { mockJobs } from '@/data/mockJobs';

interface JobContextType {
  jobs: Job[];
  applications: JobApplication[];
  addApplication: (jobId: string, status: 'chosen' | 'refused') => void;
  getChosenJobs: () => Job[];
  getRefusedJobs: () => Job[];
  filters: JobFilters;
  setFilters: (filters: JobFilters) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  sortJobs: (sortKey: string, direction: 'asc' | 'desc') => void;
  filterByJapaneseLevel: (level: string) => void;
  removeApplication: (jobId: string) => void;
  clearApplications: () => void;
}

export interface JobFilters {
  jobTypes: string[];
  wageRange: [number, number];
  japaneseLevels: string[];
  workDays: string[];
}

export type SortOption = 'wage' | 'commute' | 'date';

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filters, setFilters] = useState<JobFilters>({
    jobTypes: [],
    wageRange: [0, 5000],
    japaneseLevels: [],
    workDays: [],
  });
  const [sortBy, setSortBy] = useState<SortOption>('date');

  const addApplication = (jobId: string, status: 'chosen' | 'refused') => {
    const newApplication: JobApplication = {
      id: Date.now().toString(),
      jobId,
      userId: 'current-user',
      status,
      appliedAt: new Date(),
    };
    setApplications(prev => [...prev, newApplication]);
  };

  const removeApplication = (jobId: string) => {
    setApplications(prev => prev.filter(app => app.jobId !== jobId));
  };

  const clearApplications = () => setApplications([]);

  const getChosenJobs = () => {
    const chosenJobIds = applications
      .filter(app => app.status === 'chosen')
      .map(app => app.jobId);
    return jobs.filter(job => chosenJobIds.includes(job.id));
  };

  const getRefusedJobs = () => {
    const refusedJobIds = applications
      .filter(app => app.status === 'refused')
      .map(app => app.jobId);
    return jobs.filter(job => refusedJobIds.includes(job.id));
  };

  const sortJobs = (sortKey: string, direction: 'asc' | 'desc') => {
    const sortedJobs = [...jobs].sort((a, b) => {
      if (sortKey === 'salary') {
        // Extract numeric value from salary string (e.g., "¥1,200–¥2,200" -> 2200 for max)
        const getSalaryValue = (salary: string) => {
          const numbers = salary.match(/[\d,]+/g);
          if (numbers && numbers.length > 0) {
            // Take the highest salary from the range
            const maxSalary = Math.max(...numbers.map(n => parseInt(n.replace(/,/g, ''))));
            return maxSalary;
          }
          return 0;
        };
        
        const salaryA = getSalaryValue(a.salary);
        const salaryB = getSalaryValue(b.salary);
        
        return direction === 'desc' ? salaryB - salaryA : salaryA - salaryB;
      }
      
      if (sortKey === 'japanese_level') {
        // Convert Japanese level to numeric (N1=5, N2=4, N3=3, N4=2, N5=1)
        const getLevelValue = (level: string) => {
          const levelNum = parseInt(level.replace('N', ''));
          return 6 - levelNum; // N1=5, N2=4, N3=3, N4=2, N5=1
        };
        
        const levelA = getLevelValue(a.japaneseLevel);
        const levelB = getLevelValue(b.japaneseLevel);
        
        return direction === 'desc' ? levelB - levelA : levelA - levelB;
      }
      
      // Add other sort keys here if needed
      return 0;
    });
    
    setJobs(sortedJobs);
  };

  const filterByJapaneseLevel = (level: string) => {
    // Filter jobs to show only the selected Japanese level
    const filteredJobs = mockJobs.filter(job => job.japaneseLevel === level);
    setJobs(filteredJobs);
  };

  return (
    <JobContext.Provider value={{
      jobs,
      applications,
      addApplication,
      getChosenJobs,
      getRefusedJobs,
      filters,
      setFilters,
      sortBy,
      setSortBy,
      sortJobs,
      filterByJapaneseLevel,
      removeApplication,
      clearApplications,
    }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}