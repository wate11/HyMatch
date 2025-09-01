import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { User } from '@/types/User';
import { X, Camera, Upload, ChevronDown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useTheme } from '../_layout';
import { DropdownModal } from '@/components/DropdownModal';

export default function EditProfileModal() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState<Partial<User>>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    age: user?.age || 20,
    gender: user?.gender || 'male',
    nationality: user?.nationality || '',
    email: user?.email || '',
    phone: user?.phone || '',
    japaneseLevel: user?.japaneseLevel || 'N5',
    preferredDays: user?.preferredDays || [],
    preferredJobTypes: user?.preferredJobTypes || [],
    profilePicture: user?.profilePicture || '',
    nearestStationHome: user?.nearestStationHome || '',
    walkTimeHome: user?.walkTimeHome || 0,
    nearestStationSchool: user?.nearestStationSchool || '',
    walkTimeSchool: user?.walkTimeSchool || 0,
    postalCode: user?.postalCode || '',
    prefecture: user?.prefecture || '',
    city: user?.city || '',
    district1: user?.district1 || '',
    district2: user?.district2 || '',
    buildingName: user?.buildingName || '',
    visaType: user?.visaType || '',
    residencePhoto: user?.residencePhoto || '',
    residenceChangePlans: user?.residenceChangePlans || '',
    certificatePhoto: user?.certificatePhoto || '',
    currentJob: user?.currentJob || '',
    desiredJob: user?.desiredJob || '',
    workExperience: user?.workExperience || '',
  });

  const [residencePhotoFile, setResidencePhotoFile] = useState<{ name: string; uri: string } | null>(null);
  const [certificatePhotoFile, setCertificatePhotoFile] = useState<{ name: string; uri: string } | null>(null);
  
  // Modal states
  const [nationalityModalVisible, setNationalityModalVisible] = useState(false);
  const [prefectureModalVisible, setPrefectureModalVisible] = useState(false);
  const [visaTypeModalVisible, setVisaTypeModalVisible] = useState(false);

  const handleSave = () => {
    // Validate required fields
    const requiredFields: (keyof User)[] = ['firstName', 'lastName', 'email', 'phone', 'age', 'nationality', 'postalCode'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      Alert.alert(
        'Profile Incomplete',
        `Please fill in the following required fields:\n${missingFields.join(', ')}`,
        [
          { text: 'OK', style: 'default' }
        ]
      );
      return;
    }

    const newUser: User = {
      ...user,
      ...formData as User,
      id: user?.id || Date.now().toString(),
      isProfileComplete: true,
    };
    setUser(newUser);
    router.back();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFormData(prev => ({ ...prev, profilePicture: result.assets[0].uri }));
    }
  };

  const pickResidencePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setResidencePhotoFile({ name: 'residence_card.jpg', uri: result.assets[0].uri });
      setFormData(prev => ({ ...prev, residencePhoto: result.assets[0].uri }));
    }
  };

  const pickCertificatePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setCertificatePhotoFile({ name: 'certificate.jpg', uri: result.assets[0].uri });
      setFormData(prev => ({ ...prev, certificatePhoto: result.assets[0].uri }));
    }
  };

  const nationalities = [
    'Japanese', 'Chinese', 'Korean', 'Vietnamese', 'Nepalese', 'Filipino', 'Thai', 'Indonesian', 'Uzbek', 'Other'
  ];

  const prefectures = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
    '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
    '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
    '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
  ];

  const visaTypes = [
    '技術・人文知識・国際業務',
    '技能',
    '企業内転勤',
    '特定技能',
    'TSSW',
    '高度専門職',
    '留学',
    '定住者',
    '文化活動',
    '短期滞在',
    '永住権'
  ];

  const genders = [
    { key: 'male', label: t('profile.male') },
    { key: 'female', label: t('profile.female') },
    { key: 'other', label: t('profile.other') },
  ];

  const japaneseLevels = ['N1', 'N2', 'N3', 'N4', 'N5'];
  const workDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      preferredDays: prev.preferredDays?.includes(day)
        ? prev.preferredDays.filter(d => d !== day)
        : [...(prev.preferredDays || []), day]
    }));
  };

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' && { backgroundColor: '#18181b' }]}>
      <LinearGradient
        colors={['#C79E6B', '#C79E6B']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>{t('profile.edit')}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={[styles.content, theme === 'dark' && { backgroundColor: '#18181b' }]} showsVerticalScrollIndicator={false}>
        
        {/* Basic Information Section */}
        <View style={[styles.section, theme === 'dark' && { backgroundColor: '#27272a' }]}>
          <Text style={[styles.sectionTitle, theme === 'dark' && { color: '#fff' }]}>{t('profile.basicInfo')}</Text>
          
          <View style={styles.photoSection}>
            <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
              {formData.profilePicture ? (
                <Image source={{ uri: formData.profilePicture }} style={styles.profileImage} />
              ) : (
                <View style={[styles.photoPlaceholder, theme === 'dark' && { backgroundColor: '#27272a', borderColor: '#C79E6B' }]}>
                  <Camera size={32} color="#C79E6B" />
                </View>
              )}
              <View style={styles.uploadBadge}>
                <Upload size={16} color="#ffffff" />
              </View>
            </TouchableOpacity>
            <Text style={[styles.photoText, theme === 'dark' && { color: '#a1a1aa' }]}>{t('profile.addPhoto')}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.lastName')} *</Text>
              <TextInput
                style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
                value={formData.lastName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
                placeholder="田中"
                placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.firstName')} *</Text>
              <TextInput
                style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
                value={formData.firstName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
                placeholder="太郎"
                placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
              />
            </View>
          </View>

          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.age')} *</Text>
          <TextInput
            style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
            value={formData.age?.toString()}
            onChangeText={(text) => setFormData(prev => ({ ...prev, age: parseInt(text) || 20 }))}
            placeholder="25"
            keyboardType="numeric"
            placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
          />
        </View>

        {/* Nationality Information Section */}
        <View style={[styles.section, theme === 'dark' && { backgroundColor: '#27272a' }]}>
          <Text style={[styles.sectionTitle, theme === 'dark' && { color: '#fff' }]}>{t('profile.nationality')}</Text>
          
          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.nationality')} *</Text>
          <TouchableOpacity 
            style={[styles.dropdownContainer, theme === 'dark' && { backgroundColor: '#27272a', borderColor: '#C79E6B' }]}
            onPress={() => setNationalityModalVisible(true)}
          >
            <Text style={[styles.dropdownText, theme === 'dark' && { color: '#fff' }]}>
              {formData.nationality || t('profile.selectNationality')}
            </Text>
            <ChevronDown size={20} color="#6b7280" />
          </TouchableOpacity>

          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.gender')} *</Text>
          <View style={[styles.segmentedControl, theme === 'dark' && { backgroundColor: '#18181b' }]}>
            {genders.map((gender) => (
              <TouchableOpacity
                key={gender.key}
                style={[
                  styles.segment,
                  theme === 'dark' && { backgroundColor: '#27272a' },
                  formData.gender === gender.key && styles.segmentActive
                ]}
                onPress={() => setFormData(prev => ({ ...prev, gender: gender.key as any }))}
              >
                <Text style={[
                  styles.segmentText,
                  theme === 'dark' && { color: '#a1a1aa' },
                  formData.gender === gender.key && styles.segmentTextActive
                ]}>
                  {gender.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nearest Station Information Section */}
        <View style={[styles.section, theme === 'dark' && { backgroundColor: '#27272a' }]}>
          <Text style={[styles.sectionTitle, theme === 'dark' && { color: '#fff' }]}>{t('profile.nearestStationInfo')}</Text>
          
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.nearestStationHome')}</Text>
              <TextInput
                style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
                value={formData.nearestStationHome}
                onChangeText={(text) => setFormData(prev => ({ ...prev, nearestStationHome: text }))}
                placeholder="渋谷駅"
                placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.walkTime')}</Text>
              <TextInput
                style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
                value={formData.walkTimeHome?.toString()}
                onChangeText={(text) => setFormData(prev => ({ ...prev, walkTimeHome: parseInt(text) || 0 }))}
                placeholder="10"
                keyboardType="numeric"
                placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.nearestStationSchool')}</Text>
              <TextInput
                style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
                value={formData.nearestStationSchool}
                onChangeText={(text) => setFormData(prev => ({ ...prev, nearestStationSchool: text }))}
                placeholder="新宿駅"
                placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.walkTime')}</Text>
              <TextInput
                style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
                value={formData.walkTimeSchool?.toString()}
                onChangeText={(text) => setFormData(prev => ({ ...prev, walkTimeSchool: parseInt(text) || 0 }))}
                placeholder="15"
                keyboardType="numeric"
                placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
              />
            </View>
          </View>
        </View>

        {/* Address Information Section */}
        <View style={[styles.section, theme === 'dark' && { backgroundColor: '#27272a' }]}>
          <Text style={[styles.sectionTitle, theme === 'dark' && { color: '#fff' }]}>{t('profile.addressInfo')}</Text>
          
          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>郵便番号（7桁） *</Text>
          <TextInput
            style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
            value={formData.postalCode}
            onChangeText={(text) => setFormData(prev => ({ ...prev, postalCode: text }))}
            placeholder="123-4567"
            keyboardType="numeric"
            maxLength={8}
            placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
          />

          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>都道府県 *</Text>
          <View style={[styles.dropdownContainer, theme === 'dark' && { backgroundColor: '#27272a', borderColor: '#C79E6B' }]}>
            <Text style={[styles.dropdownText, theme === 'dark' && { color: '#fff' }]}>
              {formData.prefecture || '都道府県を選択'}
            </Text>
            <ChevronDown size={20} color="#6b7280" />
          </View>

          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.district1')} *</Text>
          <TextInput
            style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
            value={formData.district1}
            onChangeText={(text) => setFormData(prev => ({ ...prev, district1: text }))}
            placeholder="渋谷区"
            placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
          />

          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.district2')}</Text>
          <TextInput
            style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
            value={formData.district2}
            onChangeText={(text) => setFormData(prev => ({ ...prev, district2: text }))}
            placeholder="神南"
            placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
          />

          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.buildingName')}</Text>
          <TextInput
            style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
            value={formData.buildingName}
            onChangeText={(text) => setFormData(prev => ({ ...prev, buildingName: text }))}
            placeholder="○○マンション 101号室"
            placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
          />
        </View>

        {/* Contact Information Section */}
        <View style={[styles.section, theme === 'dark' && { backgroundColor: '#27272a' }]}>
          <Text style={[styles.sectionTitle, theme === 'dark' && { color: '#fff' }]}>{t('profile.contactInfo')}</Text>
          
          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.email')} *</Text>
          <TextInput
            style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
            value={formData.email}
            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
            placeholder="example@email.com"
            keyboardType="email-address"
            placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
          />

          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.phone')} *</Text>
          <TextInput
            style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
            value={formData.phone}
            onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
            placeholder="090-1234-5678"
            keyboardType="phone-pad"
            placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
          />
        </View>

        {/* Residence Rights Section */}
        <View style={[styles.section, theme === 'dark' && { backgroundColor: '#27272a' }]}>
          <Text style={[styles.sectionTitle, theme === 'dark' && { color: '#fff' }]}>{t('profile.residenceRights')}</Text>
          
          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.visaType')} *</Text>
          <TouchableOpacity 
            style={[styles.dropdownContainer, theme === 'dark' && { backgroundColor: '#27272a', borderColor: '#C79E6B' }]}
            onPress={() => setVisaTypeModalVisible(true)}
          >
            <Text style={[styles.dropdownText, theme === 'dark' && { color: '#fff' }]}>
              {formData.visaType || t('profile.selectVisaType')}
            </Text>
            <ChevronDown size={20} color="#6b7280" />
          </TouchableOpacity>

          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.residencePhoto')}</Text>
          <TouchableOpacity
            onPress={pickResidencePhoto}
            style={[styles.uploadButton, theme === 'dark' && { backgroundColor: '#27272a', borderColor: '#C79E6B' }]}
          >
            <Upload size={20} color="#C79E6B" />
            <Text style={[styles.uploadButtonText, theme === 'dark' && { color: '#C79E6B' }]}>
              {residencePhotoFile ? residencePhotoFile.name : t('profile.uploadResidenceCard')}
            </Text>
          </TouchableOpacity>

          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.residenceChangePlans')}</Text>
          <TextInput
            style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
            value={formData.residenceChangePlans}
            onChangeText={(text) => setFormData(prev => ({ ...prev, residenceChangePlans: text }))}
            placeholder="来年就労ビザに変更予定"
            multiline
            numberOfLines={2}
            placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
          />

          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.certificatePhoto')}</Text>
          <TouchableOpacity
            onPress={pickCertificatePhoto}
            style={[styles.uploadButton, theme === 'dark' && { backgroundColor: '#27272a', borderColor: '#C79E6B' }]}
          >
            <Upload size={20} color="#C79E6B" />
            <Text style={[styles.uploadButtonText, theme === 'dark' && { color: '#C79E6B' }]}>
              {certificatePhotoFile ? certificatePhotoFile.name : t('profile.uploadCertificate')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Other Information Section */}
        <View style={[styles.section, theme === 'dark' && { backgroundColor: '#27272a' }]}>
          <Text style={[styles.sectionTitle, theme === 'dark' && { color: '#fff' }]}>{t('profile.otherInfo')}</Text>
          
          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.japaneseLevel')}</Text>
          <View style={[styles.segmentedControl, theme === 'dark' && { backgroundColor: '#18181b' }]}>
            {japaneseLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.segment,
                  theme === 'dark' && { backgroundColor: '#27272a' },
                  formData.japaneseLevel === level && styles.segmentActive
                ]}
                onPress={() => setFormData(prev => ({ ...prev, japaneseLevel: level as any }))}
              >
                <Text style={[
                  styles.segmentText,
                  theme === 'dark' && { color: '#a1a1aa' },
                  formData.japaneseLevel === level && styles.segmentTextActive
                ]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.preferredDays')}</Text>
          <View style={[styles.optionsGrid, theme === 'dark' && { backgroundColor: '#18181b' }]}>
            {workDays.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.gridOption,
                  theme === 'dark' && { backgroundColor: '#27272a', borderColor: '#C79E6B' },
                  formData.preferredDays?.includes(day) && styles.gridOptionSelected
                ]}
                onPress={() => toggleDay(day)}
              >
                <Text style={[
                  styles.gridOptionText,
                  theme === 'dark' && { color: '#a1a1aa' },
                  formData.preferredDays?.includes(day) && styles.gridOptionTextSelected
                ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.currentJob')}</Text>
          <TextInput
            style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
            value={formData.currentJob}
            onChangeText={(text) => setFormData(prev => ({ ...prev, currentJob: text }))}
            placeholder="大学生・会社員など"
            placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
          />

          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.desiredJob')}</Text>
          <TextInput
            style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
            value={formData.desiredJob}
            onChangeText={(text) => setFormData(prev => ({ ...prev, desiredJob: text }))}
            placeholder="接客・調理・配達など"
            placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
          />

          <Text style={[styles.label, theme === 'dark' && { color: '#fff' }]}>{t('profile.workExperience')}</Text>
          <TextInput
            style={[styles.input, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff', borderColor: '#C79E6B' }]}
            value={formData.workExperience}
            onChangeText={(text) => setFormData(prev => ({ ...prev, workExperience: text }))}
            placeholder="コンビニ店員、レストランでの接客経験など"
            multiline
            numberOfLines={3}
            placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
          />
        </View>
      </ScrollView>

      <View style={[styles.footer, theme === 'dark' && { backgroundColor: '#27272a' }]}>
        <TouchableOpacity style={[styles.saveButton, theme === 'dark' && { backgroundColor: '#C79E6B' }]} onPress={handleSave}>
          <Text style={[styles.saveButtonText, theme === 'dark' && { color: '#fff' }]}>{t('profile.save')}</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown Modals */}
      <DropdownModal
        visible={nationalityModalVisible}
        onClose={() => setNationalityModalVisible(false)}
        title={t('profile.nationality')}
        options={nationalities}
        selectedValue={formData.nationality || ''}
        onSelect={(value) => setFormData(prev => ({ ...prev, nationality: value }))}
      />

      <DropdownModal
        visible={prefectureModalVisible}
        onClose={() => setPrefectureModalVisible(false)}
        title={t('profile.prefecture')}
        options={prefectures}
        selectedValue={formData.prefecture || ''}
        onSelect={(value) => setFormData(prev => ({ ...prev, prefecture: value }))}
      />

      <DropdownModal
        visible={visaTypeModalVisible}
        onClose={() => setVisaTypeModalVisible(false)}
        title={t('profile.visaType')}
        options={visaTypes}
        selectedValue={formData.visaType || ''}
        onSelect={(value) => setFormData(prev => ({ ...prev, visaType: value }))}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F1E5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  closeButton: {
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
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 20,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#C79E6B',
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F9F1E5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#C79E6B',
    borderStyle: 'dashed',
  },
  uploadBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#C79E6B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  photoText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#C79E6B',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  segmentActive: {
    backgroundColor: '#C79E6B',
    shadowColor: '#C79E6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  segmentText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6b7280',
  },
  segmentTextActive: {
    color: '#ffffff',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  gridOption: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  gridOptionSelected: {
    backgroundColor: '#F9F1E5',
    borderColor: '#C79E6B',
  },
  gridOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    textTransform: 'capitalize',
  },
  gridOptionTextSelected: {
    color: '#C79E6B',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F1E5',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  uploadButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  saveButton: {
    backgroundColor: '#C79E6B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#C79E6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
});