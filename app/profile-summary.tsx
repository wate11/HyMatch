import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './_layout';

export default function ProfileSummaryScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const params = useLocalSearchParams();
  
  // Parse the profile data from params with error handling
  let profileData = {};
  try {
    if (params.profileData) {
      profileData = JSON.parse(params.profileData as string);
    }
  } catch (error) {
    console.error('Error parsing profile data:', error);
    profileData = {};
  }
  
  // Debug log
  console.log('Profile Summary - Received params:', params);
  console.log('Profile Summary - Parsed data:', profileData);

  const handleBackToHome = () => {
    router.replace('/(tabs)');
  };

  // Show fallback if no data
  if (!profileData || Object.keys(profileData).length === 0) {
    return (
      <SafeAreaView style={[styles.container, theme === 'dark' && styles.containerDark]}>
        <LinearGradient colors={['#C79E6B', '#C79E6B']} style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>プロフィール確認</Text>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackToHome}
            >
              <X size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        
        <View style={styles.content}>
          <View style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>データが見つかりません</Text>
            <Text style={styles.infoValue}>プロフィールデータが正しく渡されていません。</Text>
            <TouchableOpacity style={styles.confirmButton} onPress={handleBackToHome}>
              <Text style={styles.confirmButtonText}>ホームに戻る</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <LinearGradient colors={['#C79E6B', '#C79E6B']} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>プロフィール確認</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToHome}
          >
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Summary Card */}
        <View style={[styles.summaryCard, theme === 'dark' && styles.summaryCardDark]}>
          {/* Profile Image */}
          {profileData.profileImage && (
            <View style={styles.profileImageContainer}>
              <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
            </View>
          )}
          
          <Text style={styles.sectionTitle}>基本情報</Text>
          
          {/* Last Name */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>姓 (苗字):</Text>
            <Text style={styles.infoValue}>
              {profileData.lastName || '未設定'}
            </Text>
          </View>

          {/* First Name */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>名 (名前):</Text>
            <Text style={styles.infoValue}>
              {profileData.firstName || '未設定'}
            </Text>
          </View>

          {/* Age */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>年齢:</Text>
            <Text style={styles.infoValue}>{profileData.age}歳</Text>
          </View>

          {/* Gender */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>性別:</Text>
            <Text style={styles.infoValue}>
              {profileData.gender === 'male' ? '男性' : 
               profileData.gender === 'female' ? '女性' : 'その他'}
            </Text>
          </View>

          {/* Nationality */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>国籍:</Text>
            <Text style={styles.infoValue}>{profileData.nationality}</Text>
          </View>

          {/* Email */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>メール:</Text>
            <Text style={styles.infoValue}>{profileData.email}</Text>
          </View>

          {/* Phone */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>電話:</Text>
            <Text style={styles.infoValue}>{profileData.phone}</Text>
          </View>

          {/* Japanese Level */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>日本語レベル:</Text>
            <Text style={styles.infoValue}>{profileData.japaneseLevel}</Text>
          </View>

          {/* Prefecture */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>都道府県:</Text>
            <Text style={styles.infoValue}>{profileData.prefecture}</Text>
          </View>

          {/* Address */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>住所:</Text>
            <Text style={styles.infoValue}>
              〒{profileData.postalCode} {profileData.district1} {profileData.district2}
            </Text>
          </View>

          {/* Nearest Station Home */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>自宅最寄り駅:</Text>
            <Text style={styles.infoValue}>
              {profileData.nearestStationHome} (徒歩{profileData.walkTimeHome}分)
            </Text>
          </View>

          {/* Nearest Station School */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>学校最寄り駅:</Text>
            <Text style={styles.infoValue}>
              {profileData.nearestStationSchool} (徒歩{profileData.walkTimeSchool}分)
            </Text>
          </View>

          {/* Visa Type */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ビザの種類:</Text>
            <Text style={styles.infoValue}>{profileData.visaType}</Text>
          </View>

          {/* Work Preferences */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>希望勤務日:</Text>
            <Text style={styles.infoValue}>
              {profileData.preferredDays?.join(', ') || '未設定'}
            </Text>
          </View>

          {/* Current Job */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>現在の職業:</Text>
            <Text style={styles.infoValue}>{profileData.currentJob || '未設定'}</Text>
          </View>

          {/* Desired Job */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>希望する職種:</Text>
            <Text style={styles.infoValue}>{profileData.desiredJob || '未設定'}</Text>
          </View>

          {/* Work Experience */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>仕事経験:</Text>
            <Text style={styles.infoValue}>{profileData.workExperience || '未設定'}</Text>
          </View>

          {/* Message Preference */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>連絡方法:</Text>
            <Text style={styles.infoValue}>{profileData.messagePreference || '未設定'}</Text>
          </View>

          {/* Star Rating */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>評価:</Text>
            <Text style={styles.infoValue}>{profileData.starRating || '未設定'}</Text>
          </View>

          {/* Start Time */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>開始時間:</Text>
            <Text style={styles.infoValue}>{profileData.startTime || '未設定'}</Text>
          </View>

          {/* End Time */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>終了時間:</Text>
            <Text style={styles.infoValue}>{profileData.endTime || '未設定'}</Text>
          </View>

          {/* Validity Period */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>有効期間:</Text>
            <Text style={styles.infoValue}>{profileData.validityPeriod || '未設定'}</Text>
          </View>

          {/* Qualification Date */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>資格取得予定日:</Text>
            <Text style={styles.infoValue}>{profileData.qualificationDate || '未設定'}</Text>
          </View>

          {/* Description */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>説明・備考:</Text>
            <Text style={styles.infoValue}>{profileData.description || '未設定'}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton} onPress={() => router.back()}>
            <Text style={styles.editButtonText}>編集</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.confirmButton} onPress={handleBackToHome}>
            <Text style={styles.confirmButtonText}>完了</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9efe7',
  },
  containerDark: {
    backgroundColor: '#18181b',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  summaryCardDark: {
    backgroundColor: '#23272f',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#d1d5db',
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  infoLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    width: 120,
    flexShrink: 0,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    flex: 1,
    marginLeft: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 40,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#6b7280',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
});
