import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Edit3, User, Calendar, Globe, Users, Home, Building, MapPin, Phone, Mail, Upload, ChevronDown, Star, FileText, MessageCircle, Briefcase, Yen } from 'lucide-react-native';
import { Icon } from '@/components/IconSet';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './_layout';
import { DropdownModal } from '@/components/DropdownModal';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { t } = useLanguage();
  const { theme } = useTheme();

  // Modal states
  const [ageModalVisible, setAgeModalVisible] = useState(false);
  const [nationalityModalVisible, setNationalityModalVisible] = useState(false);
  const [prefectureModalVisible, setPrefectureModalVisible] = useState(false);
  const [visaTypeModalVisible, setVisaTypeModalVisible] = useState(false);
  const [japaneseLevelModalVisible, setJapaneseLevelModalVisible] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [starModalVisible, setStarModalVisible] = useState(false);
  const [documentModalVisible, setDocumentModalVisible] = useState(false);
  const [validityPeriodModalVisible, setValidityPeriodModalVisible] = useState(false);
  const [qualificationDateModalVisible, setQualificationDateModalVisible] = useState(false);
  const [homeStationModalVisible, setHomeStationModalVisible] = useState(false);
  const [schoolStationModalVisible, setSchoolStationModalVisible] = useState(false);
  const [district1ModalVisible, setDistrict1ModalVisible] = useState(false);
  const [district2ModalVisible, setDistrict2ModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    age: user?.age?.toString() || '18',
    nationality: user?.nationality || 'Japan',
    gender: user?.gender || 'other',
    nearestStationHome: user?.nearestStationHome || '',
    walkTimeHome: user?.walkTimeHome?.toString() || '5',
    nearestStationSchool: user?.nearestStationSchool || '',
    walkTimeSchool: user?.walkTimeSchool?.toString() || '',
    postalCode: user?.postalCode || '0000000',
    prefecture: user?.prefecture || '',
    district1: user?.district1 || '',
    district2: user?.district2 || '',
    address: user?.address || '',
    phone: user?.phone || '',
    email: user?.email || '',
    visaType: user?.visaType || '',
    japaneseLevel: user?.japaneseLevel || 'N5',
    preferredDays: user?.preferredDays || [],
    currentJob: user?.currentJob || '',
    desiredJob: user?.desiredJob || '',
    workExperience: user?.workExperience || '',
    messagePreference: user?.messagePreference || '',
    starRating: user?.starRating || '',
    documentType1: user?.documentType1 || '',
    documentType2: user?.documentType2 || '',
    startTime: user?.startTime || '',
    endTime: user?.endTime || '',
    validityPeriod: user?.validityPeriod || '',
    qualificationDate: user?.qualificationDate || '',
    description: user?.description || '',
  });

  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null);

  // Data arrays
  const ages = Array.from({ length: 83 }, (_, i) => (i + 18).toString());
  const nationalities = [
    'Japan', 'China', 'Korea', 'Vietnam', 'Nepal', 'Philippines', 'Thailand', 
    'Indonesia', 'Uzbekistan', 'India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 
    'Myanmar', 'Cambodia', 'Laos', 'Mongolia', 'Other'
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
    '技術・人文知識・国際業務', '技能', '企業内転勤', '特定技能', 'TSSW',
    '高度専門職', '留学', '定住者', '文化活動', '短期滞在', '永住権'
  ];
  const japaneseLevels = ['N1', 'N2', 'N3', 'N4', 'N5'];
  const messagePreferences = [
    'メール', 'SMS', 'LINE', 'WhatsApp', '電話', 'その他'
  ];
  const starRatings = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];
  const documentTypes = [
    '履歴書', '職務経歴書', '在留カード', 'パスポート', '資格証明書', 'その他'
  ];
  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
    '20:00', '21:00', '22:00', '23:00', '00:00'
  ];
  const validityPeriods = [
    '1年', '2年', '3年', '4年', '5年', '10年', '永住'
  ];
  const qualificationDates = [
    '2024年3月', '2024年6月', '2024年9月', '2024年12月',
    '2025年3月', '2025年6月', '2025年9月', '2025年12月',
    '未定', '既に取得済み'
  ];

  // Station data arrays
  const homeStations = [
    '東京駅', '新宿駅', '渋谷駅', '池袋駅', '品川駅', '上野駅', '秋葉原駅', '銀座駅',
    '原宿駅', '表参道駅', '六本木駅', '恵比寿駅', '目黒駅', '五反田駅', '大崎駅',
    '田町駅', '浜松町駅', '新橋駅', '有楽町駅', '霞ヶ関駅', '国会議事堂前駅', '赤坂見附駅',
    '永田町駅', '四谷駅', '新宿御苑前駅', '明治神宮前駅', '代々木駅', '代々木公園駅',
    '千駄ヶ谷駅', '北参道駅', '参宮橋駅', '代々木上原駅', '東北沢駅', '下北沢駅',
    '梅ヶ丘駅', '豪徳寺駅', '経堂駅', '千歳船橋駅', '祖師ヶ谷大蔵駅', '成城学園前駅',
    '喜多見駅', '和泉多摩川駅', '登戸駅', '向ヶ丘遊園駅', '生田駅', '読売ランド前駅',
    '鶴川駅', '玉川学園前駅', '町田駅', '淵野辺駅', '中央大学駅', '東八王子駅',
    '八王子駅', '北八王子駅', '京王八王子駅', '高尾駅', '高尾山口駅', '高尾山駅'
  ];

  const schoolStations = [
    '早稲田駅', '高田馬場駅', '西早稲田駅', '東新宿駅', '新宿三丁目駅', '新宿御苑前駅',
    '国立競技場駅', '外苑前駅', '青山一丁目駅', '表参道駅', '明治神宮前駅', '原宿駅',
    '代々木駅', '代々木公園駅', '千駄ヶ谷駅', '北参道駅', '参宮橋駅', '代々木上原駅',
    '東北沢駅', '下北沢駅', '梅ヶ丘駅', '豪徳寺駅', '経堂駅', '千歳船橋駅',
    '祖師ヶ谷大蔵駅', '成城学園前駅', '喜多見駅', '和泉多摩川駅', '登戸駅', '向ヶ丘遊園駅',
    '生田駅', '読売ランド前駅', '鶴川駅', '玉川学園前駅', '町田駅', '淵野辺駅',
    '中央大学駅', '東八王子駅', '八王子駅', '北八王子駅', '京王八王子駅', '高尾駅',
    '高尾山口駅', '高尾山駅', '立川駅', '国分寺駅', '国立駅', '西国分寺駅',
    '東小金井駅', '武蔵小金井駅', '西武新宿駅', '高田馬場駅', '新宿駅', '西新宿駅',
    '中野駅', '東中野駅', '大久保駅', '新大久保駅', '新宿西口駅', '新宿南口駅'
  ];

  // District data arrays
  const district1Options = [
    '新宿区', '渋谷区', '港区', '中央区', '千代田区', '文京区', '台東区', '墨田区',
    '江東区', '品川区', '目黒区', '大田区', '世田谷区', '杉並区', '中野区', '豊島区',
    '北区', '荒川区', '板橋区', '練馬区', '足立区', '葛飾区', '江戸川区', '八王子市',
    '立川市', '武蔵野市', '三鷹市', '青梅市', '府中市', '昭島市', '調布市', '町田市',
    '小金井市', '小平市', '日野市', '東村山市', '国分寺市', '国立市', '福生市', '狛江市',
    '東大和市', '清瀬市', '東久留米市', '武蔵村山市', '多摩市', '稲城市', '羽村市',
    'あきる野市', '西東京市', '瑞穂町', '日の出町', '檜原村', '奥多摩町', '大島町',
    '利島村', '新島村', '神津島村', '三宅村', '御蔵島村', '八丈町', '青ヶ島村', '小笠原村'
  ];

  const district2Options = [
    '新宿', '西新宿', '東新宿', '新宿三丁目', '新宿御苑前', '新宿西口', '新宿南口',
    '渋谷', '原宿', '表参道', '明治神宮前', '代々木', '代々木公園', '千駄ヶ谷', '北参道',
    '参宮橋', '代々木上原', '東北沢', '下北沢', '梅ヶ丘', '豪徳寺', '経堂', '千歳船橋',
    '祖師ヶ谷大蔵', '成城学園前', '喜多見', '和泉多摩川', '登戸', '向ヶ丘遊園', '生田',
    '読売ランド前', '鶴川', '玉川学園前', '町田', '淵野辺', '中央大学', '東八王子',
    '八王子', '北八王子', '京王八王子', '高尾', '高尾山口', '高尾山', '立川', '国分寺',
    '国立', '西国分寺', '東小金井', '武蔵小金井', '西武新宿', '高田馬場', '中野', '東中野',
    '大久保', '新大久保', '池袋', '目白', '高田馬場', '新大久保', '新宿', '新宿三丁目',
    '新宿御苑前', '新宿西口', '新宿南口', '西新宿', '東新宿', '新宿御苑前', '新宿三丁目',
    // Additional districts and neighborhoods
    '銀座', '日本橋', '有楽町', '霞ヶ関', '国会議事堂前', '赤坂見附', '永田町', '四谷',
    '新宿御苑前', '明治神宮前', '原宿', '代々木', '代々木公園', '千駄ヶ谷', '北参道',
    '参宮橋', '代々木上原', '東北沢', '下北沢', '梅ヶ丘', '豪徳寺', '経堂', '千歳船橋',
    '祖師ヶ谷大蔵', '成城学園前', '喜多見', '和泉多摩川', '登戸', '向ヶ丘遊園', '生田',
    '読売ランド前', '鶴川', '玉川学園前', '町田', '淵野辺', '中央大学', '東八王子',
    '八王子', '北八王子', '京王八王子', '高尾', '高尾山口', '高尾山', '立川', '国分寺',
    '国立', '西国分寺', '東小金井', '武蔵小金井', '西武新宿', '高田馬場', '中野', '東中野',
    '大久保', '新大久保', '池袋', '目白', '高田馬場', '新大久保', '新宿', '新宿三丁目',
    '新宿御苑前', '新宿西口', '新宿南口', '西新宿', '東新宿', '新宿御苑前', '新宿三丁目',
    // More specific areas and neighborhoods
    '青山', '六本木', '恵比寿', '目黒', '五反田', '大崎', '田町', '浜松町', '新橋',
    '有楽町', '霞ヶ関', '国会議事堂前', '赤坂見附', '永田町', '四谷', '新宿御苑前',
    '明治神宮前', '原宿', '代々木', '代々木公園', '千駄ヶ谷', '北参道', '参宮橋',
    '代々木上原', '東北沢', '下北沢', '梅ヶ丘', '豪徳寺', '経堂', '千歳船橋',
    '祖師ヶ谷大蔵', '成城学園前', '喜多見', '和泉多摩川', '登戸', '向ヶ丘遊園', '生田',
    '読売ランド前', '鶴川', '玉川学園前', '町田', '淵野辺', '中央大学', '東八王子',
    '八王子', '北八王子', '京王八王子', '高尾', '高尾山口', '高尾山', '立川', '国分寺',
    '国立', '西国分寺', '東小金井', '武蔵小金井', '西武新宿', '高田馬場', '中野', '東中野',
    '大久保', '新大久保', '池袋', '目白', '高田馬場', '新大久保', '新宿', '新宿三丁目',
    '新宿御苑前', '新宿西口', '新宿南口', '西新宿', '東新宿', '新宿御苑前', '新宿三丁目',
    // Additional popular areas
    '浅草', '上野', '秋葉原', '御徒町', '鶯谷', '日暮里', '西日暮里', '田端', '駒込',
    '巣鴨', '大塚', '池袋', '目白', '高田馬場', '新大久保', '新宿', '新宿三丁目',
    '新宿御苑前', '新宿西口', '新宿南口', '西新宿', '東新宿', '新宿御苑前', '新宿三丁目',
    '渋谷', '原宿', '表参道', '明治神宮前', '代々木', '代々木公園', '千駄ヶ谷', '北参道',
    '参宮橋', '代々木上原', '東北沢', '下北沢', '梅ヶ丘', '豪徳寺', '経堂', '千歳船橋',
    '祖師ヶ谷大蔵', '成城学園前', '喜多見', '和泉多摩川', '登戸', '向ヶ丘遊園', '生田',
    '読売ランド前', '鶴川', '玉川学園前', '町田', '淵野辺', '中央大学', '東八王子',
    '八王子', '北八王子', '京王八王子', '高尾', '高尾山口', '高尾山', '立川', '国分寺',
    '国立', '西国分寺', '東小金井', '武蔵小金井', '西武新宿', '高田馬場', '中野', '東中野',
    '大久保', '新大久保', '池袋', '目白', '高田馬場', '新大久保', '新宿', '新宿三丁目',
    '新宿御苑前', '新宿西口', '新宿南口', '西新宿', '東新宿', '新宿御苑前', '新宿三丁目'
  ];

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      preferredDays: prev.preferredDays.includes(day)
        ? prev.preferredDays.filter(d => d !== day)
        : [...prev.preferredDays, day]
    }));
  };

  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          '権限が必要です',
          'ギャラリーにアクセスする権限が必要です。',
          [{ text: 'OK', style: 'default' }]
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
        
        // Update user data with profile image
        if (user) {
          const updatedUser = {
            ...user,
            profileImage: result.assets[0].uri,
          };
          setUser(updatedUser);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert(
        'エラーが発生しました',
        '画像の選択中にエラーが発生しました。',
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  const handleSave = () => {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      Alert.alert(
        '必須項目が未入力です',
        `以下の項目を入力してください：\n${missingFields.join(', ')}`,
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    // Log form data to console
    console.log('Form Data:', formData);
    console.log('Profile Image:', profileImage);

    // Update user data
    if (user) {
      const updatedUser = {
        ...user,
        ...formData,
        profileImage: profileImage,
        age: parseInt(formData.age),
        walkTimeHome: parseInt(formData.walkTimeHome),
        walkTimeSchool: parseInt(formData.walkTimeSchool),
        isProfileComplete: true,
      };
      setUser(updatedUser);
    }

    // Navigate to profile summary screen with all the data
    const profileDataString = JSON.stringify({ ...formData, profileImage });
    console.log('Profile Data String:', profileDataString);
    console.log('Navigating to profile-summary with data length:', profileDataString.length);
    
    router.push({
      pathname: '/profile-summary',
      params: { profileData: profileDataString }
    });
  };

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' && { backgroundColor: '#18181b' }]}>
      <LinearGradient
        colors={['#ffffff', '#ffffff']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
                     <TouchableOpacity
             style={styles.editButton}
           >
             <Image source={require('@/assets/images/about.png')} style={styles.aboutIcon} />
           </TouchableOpacity>
          <Text style={styles.title}>登録者プロフィール</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <X size={32} color="#6b7280" strokeWidth={3} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={[styles.content, theme === 'dark' && { backgroundColor: '#18181b' }]} showsVerticalScrollIndicator={false}>
        {/* Profile Picture Button Row */}
        <View style={styles.profileButtonRow}>
          <TouchableOpacity style={styles.profilePictureButton} onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profilePictureIcon}>
                <View style={styles.profilePictureHead} />
                <View style={styles.profilePictureBody} />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Name Fields */}
        <View style={styles.inputRow}>
          <View style={styles.iconContainer}>
            <Image source={require('@/assets/images/card.png')} style={styles.cardIcon} />
          </View>
          <View style={styles.nameInputsContainer}>
            <TextInput
              style={[styles.nameInput, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff' }]}
              value={formData.lastName}
              onChangeText={(text) => {
                setFormData(prev => ({
                  ...prev,
                  lastName: text
                }));
              }}
              placeholder="姓 (苗字)"
              placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
            />
            <View style={styles.nameSpacer} />
            <TextInput
              style={[styles.nameInput, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff' }]}
              value={formData.firstName}
              onChangeText={(text) => {
                setFormData(prev => ({
                  ...prev,
                  firstName: text
                }));
              }}
              placeholder="名 (名前)"
              placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
            />
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.smallButton}>
              <Image source={require('@/assets/images/man.png')} style={styles.manIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallButton}>
              <Image source={require('@/assets/images/upload.png')} style={styles.uploadIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Age Field */}
        <View style={styles.inputRow}>
          <View style={styles.iconContainer}>
            <Image source={require('@/assets/images/cake.png')} style={styles.cakeIcon} />
          </View>
          <TouchableOpacity 
            style={[styles.dropdownInput, theme === 'dark' && { backgroundColor: '#27272a' }, { maxWidth: 120 }]}
            onPress={() => setAgeModalVisible(true)}
          >
            <Text style={[styles.dropdownText, theme === 'dark' && { color: '#fff' }]}>{formData.age}</Text>
            <ChevronDown size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Nationality Field */}
        <View style={styles.inputRow}>
          <View style={styles.iconContainer}>
            <Image source={require('@/assets/images/yer.png')} style={styles.yerIcon} />
          </View>
          <TouchableOpacity 
            style={[styles.dropdownInput, theme === 'dark' && { backgroundColor: '#27272a' }, { maxWidth: 170 }]}
            onPress={() => setNationalityModalVisible(true)}
          >
            <View style={styles.nationalityContent}>
              <View style={styles.flagPlaceholder} />
              <Text style={[styles.dropdownText, theme === 'dark' && { color: '#fff' }]}>{formData.nationality}</Text>
            </View>
            <ChevronDown size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Gender Field */}
        <View style={styles.inputRow}>
          <View style={styles.iconContainer}>
            <Image source={require('@/assets/images/gender.png')} style={styles.genderIcon} />
          </View>
          <View style={styles.genderContainer}>
                         <TouchableOpacity
               style={[
                 styles.genderOption,
                 formData.gender === 'male' && styles.genderOptionSelected
               ]}
               onPress={() => setFormData(prev => ({ ...prev, gender: 'male' }))}
             >
               <Text style={styles.genderSymbol}>♂</Text>
               <View style={[
                 styles.genderCircle,
                 formData.gender === 'male' && styles.genderCircleSelected
               ]}>
                 {formData.gender === 'male' && (
                   <Text style={styles.genderCheckmark}>✓</Text>
                 )}
               </View>
             </TouchableOpacity>
            
                         <TouchableOpacity
               style={[
                 styles.genderOption,
                 formData.gender === 'female' && styles.genderOptionSelected
               ]}
               onPress={() => setFormData(prev => ({ ...prev, gender: 'female' }))}
             >
               <Text style={[styles.genderSymbol, { color: '#e25b76' }]}>♀</Text>
               <View style={[
                 styles.genderCircle,
                 formData.gender === 'female' && styles.genderCircleSelected
               ]}>
                 {formData.gender === 'female' && (
                   <Text style={styles.genderCheckmark}>✓</Text>
                 )}
               </View>
             </TouchableOpacity>
            
                         <TouchableOpacity
               style={[
                 styles.genderOption,
                 formData.gender === 'other' && styles.genderOptionSelected
               ]}
               onPress={() => setFormData(prev => ({ ...prev, gender: 'other' }))}
             >
               <Text style={styles.genderText}>その他</Text>
               <View style={[
                 styles.genderCircle,
                 formData.gender === 'other' && styles.genderCircleSelected
               ]}>
                 {formData.gender === 'other' && (
                   <Text style={styles.genderCheckmark}>✓</Text>
                 )}
               </View>
             </TouchableOpacity>
          </View>
        </View>

        {/* Home Station Field */}
        <View style={styles.inputRow}>
          <View style={styles.iconContainer}>
            <Image source={require('@/assets/images/house1.png')} style={styles.house1Icon} />
            <Image source={require('@/assets/images/poyezd.png')} style={styles.poyezdIcon} />
          </View>
          <TouchableOpacity 
            style={[styles.dropdownInput, theme === 'dark' && { backgroundColor: '#27272a' }]}
            onPress={() => setHomeStationModalVisible(true)}
          >
            <Text style={[styles.dropdownText, theme === 'dark' && { color: '#fff' }]}>
              {formData.nearestStationHome || '選択してください'}
            </Text>
            <ChevronDown size={20} color="#6b7280" />
          </TouchableOpacity>
          <View style={styles.walkTimeContainer}>
            <View style={styles.walkIcon}>
              <Text style={styles.walkSymbol}>👣</Text>
            </View>
            <TextInput
              style={[styles.walkTimeInput, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff' }]}
              value={formData.walkTimeHome}
              onChangeText={(text) => setFormData(prev => ({ ...prev, walkTimeHome: text }))}
              placeholder="5"
              placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
              keyboardType="numeric"
            />
            <Text style={styles.walkTimeUnit}>分</Text>
          </View>
        </View>

                 {/* School Station Field */}
         <View style={styles.inputRow}>
           <View style={styles.iconContainer}>
             <Image source={require('@/assets/images/maktab.png')} style={styles.maktabIcon} />
             <Image source={require('@/assets/images/poyezd.png')} style={styles.poyezdIcon2} />
           </View>
          <TouchableOpacity 
            style={[styles.dropdownInput, theme === 'dark' && { backgroundColor: '#27272a' }]}
            onPress={() => setSchoolStationModalVisible(true)}
          >
            <Text style={[styles.dropdownText, theme === 'dark' && { color: '#fff' }]}>
              {formData.nearestStationSchool || '選択してください'}
            </Text>
            <ChevronDown size={20} color="#6b7280" />
          </TouchableOpacity>
          <View style={styles.walkTimeContainer}>
            <View style={styles.walkIcon}>
              <Text style={styles.walkSymbol}>👣</Text>
            </View>
            <TextInput
              style={[styles.walkTimeInput, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff' }]}
              value={formData.walkTimeSchool}
              onChangeText={(text) => setFormData(prev => ({ ...prev, walkTimeSchool: text }))}
              placeholder="10"
              placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
              keyboardType="numeric"
            />
            <Text style={styles.walkTimeUnit}>分</Text>
          </View>
        </View>

                 {/* Postal Code Field */}
         <View style={styles.inputRow}>
           <View style={styles.iconContainer}>
             <Image source={require('@/assets/images/pochta.png')} style={styles.pochtaIcon} />
           </View>
          <TextInput
            style={[styles.textInput, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff' }]}
            value={formData.postalCode}
            onChangeText={(text) => setFormData(prev => ({ ...prev, postalCode: text }))}
            placeholder="0000000"
            placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
            maxLength={7}
            keyboardType="numeric"
          />
                     <TouchableOpacity style={styles.autoAddressButton}>
             <Edit3 size={18} color="#FFD700" />
             <Text style={styles.autoAddressText}>住所自動入力</Text>
           </TouchableOpacity>
        </View>

                 {/* Prefecture Field */}
         <View style={styles.inputRow}>
           <View style={[styles.iconContainer, { backgroundColor: '#efdecc' }]}>
             <Image source={require('@/assets/images/japan.png')} style={styles.japanIcon} />
           </View>
           <TouchableOpacity 
             style={[styles.dropdownInput, theme === 'dark' && { backgroundColor: '#27272a' }]}
             onPress={() => setPrefectureModalVisible(true)}
           >
             <Text style={[styles.dropdownText, theme === 'dark' && { color: '#fff' }]}>
               {formData.prefecture || '選択してください'}
             </Text>
             <ChevronDown size={20} color="#6b7280" />
           </TouchableOpacity>
         </View>

         {/* District1 Field */}
         <View style={styles.inputRow}>
           <View style={[styles.iconContainer, { backgroundColor: '#efdecc' }]}>
             <Image source={require('@/assets/images/map.png')} style={styles.mapIcon} />
           </View>
           <TouchableOpacity 
             style={[styles.dropdownInput, theme === 'dark' && { backgroundColor: '#27272a' }]}
             onPress={() => setDistrict1ModalVisible(true)}
           >
             <Text style={[styles.dropdownText, theme === 'dark' && { color: '#fff' }]}>
               {formData.district1 || '選択してください'}
             </Text>
             <ChevronDown size={20} color="#6b7280" />
           </TouchableOpacity>
         </View>

         {/* District2 Field */}
         <View style={styles.inputRow}>
           <View style={[styles.iconContainer, { backgroundColor: '#efdecc' }]}>
             <Image source={require('@/assets/images/map1.png')} style={styles.map1Icon} />
           </View>
           <TouchableOpacity 
             style={[styles.dropdownInput, theme === 'dark' && { backgroundColor: '#27272a' }]}
             onPress={() => setDistrict2ModalVisible(true)}
           >
             <Text style={[styles.dropdownText, theme === 'dark' && { color: '#fff' }]}>
               {formData.district2 || '選択してください'}
             </Text>
             <ChevronDown size={20} color="#6b7280" />
           </TouchableOpacity>
         </View>

                 {/* Full Address Field */}
         <View style={styles.inputRow}>
           <View style={styles.iconContainer}>
             <Image source={require('@/assets/images/kv.png')} style={styles.kvIcon} />
           </View>
          <TextInput
            style={[styles.textInput, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff' }]}
            value={formData.address}
            onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
            placeholder="住所"
            placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
          />
        </View>

                 {/* Phone Field */}
         <View style={styles.inputRow}>
           <View style={styles.iconContainer}>
             <Image source={require('@/assets/images/tel.png')} style={styles.telIcon} />
           </View>
          <TextInput
            style={[styles.textInput, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff' }]}
            value={formData.phone}
            onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
            placeholder="電話番号"
            placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
            keyboardType="phone-pad"
          />
        </View>

                 {/* Email Field */}
         <View style={styles.inputRow}>
           <View style={styles.iconContainer}>
             <Image source={require('@/assets/images/sms.png')} style={[styles.smsIcon, { tintColor: '#ffc300' }]} />
           </View>
          <TextInput
            style={[styles.textInput, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff' }]}
            value={formData.email}
            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
            placeholder="メールアドレス"
            placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
            keyboardType="email-address"
          />
        </View>

                 {/* Validity Period Field */}
         <View style={styles.inputRow}>
           <View style={styles.iconContainer}>
             <Image source={require('@/assets/images/cv1.png')} style={styles.cvIcon} />
           </View>
          <TouchableOpacity 
            style={[styles.dropdownInput, theme === 'dark' && { backgroundColor: '#27272a' }]}
            onPress={() => setValidityPeriodModalVisible(true)}
          >
            <Text style={[styles.dropdownText, theme === 'dark' && { color: '#fff' }]}>
              {formData.validityPeriod || '選択してください'}
            </Text>
            <ChevronDown size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

                 {/* Qualification Date Field */}
         <View style={styles.inputRow}>
           <View style={styles.iconContainer}>
             <Image source={require('@/assets/images/id.png')} style={styles.idIcon} />
             <Image source={require('@/assets/images/refresh.png')} style={styles.refreshIcon} />
           </View>
          <TouchableOpacity 
            style={[styles.dropdownInput, theme === 'dark' && { backgroundColor: '#27272a' }]}
            onPress={() => setQualificationDateModalVisible(true)}
          >
            <Text style={[styles.dropdownText, theme === 'dark' && { color: '#fff' }]}>
              {formData.qualificationDate || '選択してください'}
            </Text>
            <ChevronDown size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

                 {/* Days Selection */}
         <View style={styles.inputRow}>
           <View style={styles.iconContainer}>
             <Image source={require('@/assets/images/calendar.png')} style={styles.calendarIcon} />
           </View>
          <View style={styles.daysContainer}>
                         {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, index) => (
               <TouchableOpacity
                 key={index}
                 style={[
                   styles.dayButton,
                   formData.preferredDays.includes(day) && styles.dayButtonSelected
                 ]}
                 onPress={() => toggleDay(day)}
               >
                 <View style={styles.dayTextContainer}>
                   <Text style={[
                     styles.dayButtonText,
                     formData.preferredDays.includes(day) && styles.dayButtonTextSelected
                   ]}>
                     {day}
                   </Text>
                   <Text style={[
                     styles.dayButtonText,
                     formData.preferredDays.includes(day) && styles.dayButtonTextSelected
                   ]}>
                     {['月', '火', '水', '木', '金', '土', '日'][index]}
                   </Text>
                 </View>
               </TouchableOpacity>
             ))}
          </View>
        </View>

                 {/* Time Fields */}
         <View style={styles.inputRow}>
           <View style={styles.iconContainer}>
             <Icon name="clock" size={40} color="#000000" />
           </View>
          <View style={styles.timeContainer}>
            <TouchableOpacity 
              style={[styles.timeInput, theme === 'dark' && { backgroundColor: '#27272a' }]}
              onPress={() => {
                // Time picker logic here
                Alert.alert('開始時間', '開始時間を選択してください');
              }}
            >
              <Text style={[styles.dropdownText, theme === 'dark' && { color: '#fff' }]}>
                {formData.startTime || '時間'}
              </Text>
              <ChevronDown size={20} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.timeInput, theme === 'dark' && { backgroundColor: '#27272a' }]}
              onPress={() => {
                // Time picker logic here
                Alert.alert('終了時間', '終了時間を選択してください');
              }}
            >
              <Text style={[styles.dropdownText, theme === 'dark' && { color: '#fff' }]}>
                {formData.endTime || '時間'}
              </Text>
              <ChevronDown size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Description Field */}
                  <View style={styles.inputRow}>
            <View style={styles.iconContainer}>
              <Image source={require('@/assets/images/paper.png')} style={{ width: 32, height: 32 }} resizeMode="contain" />
            </View>
          <TextInput
            style={[styles.textArea, theme === 'dark' && { backgroundColor: '#27272a', color: '#fff' }]}
            value={formData.description}
            onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
            placeholder="説明・備考"
            placeholderTextColor={theme === 'dark' ? '#6b7280' : '#9ca3af'}
            multiline
            numberOfLines={4}
          />
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={[styles.footer, theme === 'dark' && { backgroundColor: '#27272a' }]}>
        <View style={styles.buttonRow}>
                     <TouchableOpacity style={styles.confirmButton}>
             <View style={styles.confirmButtonContent}>
               <Image source={require('@/assets/images/findings.png')} style={styles.findingsIcon} />
               <View style={styles.buttonTextContainer}>
                 <Text style={styles.confirmButtonText}>確認</Text>
                 <Text style={styles.confirmButtonSubText}>& DL</Text>
               </View>
             </View>
           </TouchableOpacity>
                     <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
             <View style={styles.saveButtonContent}>
               <Image source={require('@/assets/images/down.png')} style={styles.downIcon} />
               <Text style={styles.saveButtonText}>保存</Text>
             </View>
           </TouchableOpacity>
           
           {/* Test button for debugging */}
           <TouchableOpacity 
             style={[styles.saveButton, { backgroundColor: '#ff6b6b', marginTop: 10 }]} 
             onPress={() => {
               console.log('Test navigation button pressed');
               router.push('/profile-summary');
             }}
           >
             <View style={styles.saveButtonContent}>
               <Text style={styles.saveButtonText}>テスト</Text>
             </View>
           </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Modals */}
      <DropdownModal
        visible={ageModalVisible}
        onClose={() => setAgeModalVisible(false)}
        title="年齢"
        options={ages}
        selectedValue={formData.age || ''}
        onSelect={(value) => setFormData(prev => ({ ...prev, age: value }))}
      />

      <DropdownModal
        visible={nationalityModalVisible}
        onClose={() => setNationalityModalVisible(false)}
        title="国籍"
        options={nationalities}
        selectedValue={formData.nationality || ''}
        onSelect={(value) => setFormData(prev => ({ ...prev, nationality: value }))}
      />

      <DropdownModal
        visible={prefectureModalVisible}
        onClose={() => setPrefectureModalVisible(false)}
        title="都道府県"
        options={prefectures}
        selectedValue={formData.prefecture || ''}
        onSelect={(value) => setFormData(prev => ({ ...prev, prefecture: value }))}
      />

      <DropdownModal
        visible={validityPeriodModalVisible}
        onClose={() => setValidityPeriodModalVisible(false)}
        title="有効期間"
        options={validityPeriods}
        selectedValue={formData.validityPeriod || ''}
        onSelect={(value) => setFormData(prev => ({ ...prev, validityPeriod: value }))}
      />

      <DropdownModal
        visible={qualificationDateModalVisible}
        onClose={() => setQualificationDateModalVisible(false)}
        title="資格取得予定日"
        options={qualificationDates}
        selectedValue={formData.qualificationDate || ''}
        onSelect={(value) => setFormData(prev => ({ ...prev, qualificationDate: value }))}
      />

      {/* Home Station Modal */}
      <DropdownModal
        visible={homeStationModalVisible}
        onClose={() => setHomeStationModalVisible(false)}
        title="自宅最寄り駅"
        options={homeStations}
        selectedValue={formData.nearestStationHome || ''}
        onSelect={(value) => setFormData(prev => ({ ...prev, nearestStationHome: value }))}
      />

      {/* School Station Modal */}
      <DropdownModal
        visible={schoolStationModalVisible}
        onClose={() => setSchoolStationModalVisible(false)}
        title="学校最寄り駅"
        options={schoolStations}
        selectedValue={formData.nearestStationSchool || ''}
        onSelect={(value) => setFormData(prev => ({ ...prev, nearestStationSchool: value }))}
      />

      {/* District1 Modal */}
      <DropdownModal
        visible={district1ModalVisible}
        onClose={() => setDistrict1ModalVisible(false)}
        title="市区町村"
        options={district1Options}
        selectedValue={formData.district1 || ''}
        onSelect={(value) => setFormData(prev => ({ ...prev, district1: value }))}
      />

      {/* District2 Modal */}
      <DropdownModal
        visible={district2ModalVisible}
        onClose={() => setDistrict2ModalVisible(false)}
        title="町名・番地・地区"
        options={district2Options}
        selectedValue={formData.district2 || ''}
        onSelect={(value) => setFormData(prev => ({ ...prev, district2: value }))}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffee7',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  editButton: {
    padding: 8,
  },
  aboutIcon: {
    width: 32,
    height: 32,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fffee7',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eaddca',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    position: 'relative',
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  nameInputsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  nameSpacer: {
    width: 12,
  },
  textArea: {
    flex: 1,
    minHeight: 80,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
    textAlignVertical: 'top',
  },
  dropdownInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: '#1f2937',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 12,
  },
  smallButton: {
    width: 32,
    height: 32,
    backgroundColor: '#bf9a71',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nationalityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flagPlaceholder: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ef4444',
  },
  genderContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
  },
  genderOption: {
    alignItems: 'center',
    gap: 4,
  },
  genderSymbol: {
    fontSize: 20,
    color: '#6aacf1',
  },
  genderText: {
    fontSize: 14,
    color: '#6b7280',
  },
  genderCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
  },
  genderCircleSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  genderCheckmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  walkTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  walkIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButtonRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePictureButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profilePictureIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#d1d5db',
  },
  profilePictureHead: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D08752',
  },
  profilePictureBody: {
    width: 40,
    height: 20,
    backgroundColor: '#D08752',
    borderRadius: 20,
    marginTop: 4,
  },
  iconOverlayText: {
    position: 'absolute',
    top: -25,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  walkSymbol: {
    fontSize: 16,
  },
  walkTimeInput: {
    width: 40,
    height: 32,
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 14,
    color: '#1f2937',
  },
  walkTimeUnit: {
    fontSize: 14,
    color: '#6b7280',
  },
  autoAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#D2691E',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  autoAddressText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  idCardIcon: {
    position: 'relative',
  },
  idCardBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  qualificationIcon: {
    position: 'relative',
  },
  gearIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearSymbol: {
    fontSize: 8,
  },
     calendarIcon: {
     width: 28,
     height: 28,
   },
  calendarHighlight: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
     daysContainer: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     gap: 2,
     backgroundColor: '#f3f4f6',
     borderRadius: 12,
     padding: 8,
   },
     dayButton: {
     width: 40,
     height: 40,
     backgroundColor: '#ffffff',
     borderRadius: 20,
     alignItems: 'center',
     justifyContent: 'center',
     marginHorizontal: 1,
   },
  dayButtonSelected: {
    backgroundColor: '#3b82f6',
  },
     dayButtonText: {
     fontSize: 9,
     color: '#6b7280',
     fontWeight: '600',
     textAlign: 'center',
     lineHeight: 11,
     flexDirection: 'row',
     alignItems: 'center',
     gap: 2,
   },
     dayButtonTextSelected: {
     color: '#ffffff',
   },
   dayTextContainer: {
     alignItems: 'center',
     justifyContent: 'center',
   },
   clockIcon: {
     width: 28,
     height: 28,
   },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  timeInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#909090',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
     buttonTextContainer: {
     alignItems: 'center',
   },
   confirmButtonContent: {
     flexDirection: 'row',
     alignItems: 'center',
     gap: 12,
   },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  confirmButtonSubText: {
    color: '#ffffff',
    fontSize: 14,
  },
     saveButton: {
     flex: 1,
     backgroundColor: '#d08752',
     borderRadius: 12,
     paddingVertical: 16,
     paddingHorizontal: 20,
     alignItems: 'center',
     justifyContent: 'center',
   },
     saveButtonText: {
     color: '#ffffff',
     fontSize: 22,
     fontWeight: 'bold',
   },
   saveButtonContent: {
     flexDirection: 'row',
     alignItems: 'center',
     gap: 12,
   },
   saveIconContainer: {
     alignItems: 'center',
     justifyContent: 'center',
   },
   saveIconCircle: {
     width: 24,
     height: 24,
     backgroundColor: '#ffffff',
     borderRadius: 12,
     alignItems: 'center',
     justifyContent: 'center',
   },
   saveArrow: {
     width: 0,
     height: 0,
     borderLeftWidth: 6,
     borderRightWidth: 6,
     borderTopWidth: 8,
     borderLeftColor: 'transparent',
     borderRightColor: 'transparent',
     borderTopColor: '#10b981',
   },
   downIcon: {
     width: 28,
     height: 28,
   },
   findingsIcon: {
     width: 28,
     height: 28,
   },
  cardIcon: {
    width: 32,
    height: 32,
  },
  smallIcon: {
    width: 24,
    height: 24,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
    justifyContent: 'flex-end',
  },
  manIcon: {
    width: 32,
    height: 32,
  },
  uploadIcon: {
    width: 32,
    height: 32,
  },
  cakeIcon: {
    width: 32,
    height: 32,
  },
  yerIcon: {
    width: 30,
    height: 30,
  },
  genderIcon: {
    width: 32,
    height: 32,
  },
  house1Icon: {
    width: 24,
    height: 24,
  },
     poyezdIcon: {
     position: 'absolute',
     bottom: 2,
     right: 2,
     width: 16,
     height: 16,
   },
   maktabIcon: {
     width: 24,
     height: 24,
   },
   poyezdIcon2: {
     position: 'absolute',
     bottom: 2,
     right: 2,
     width: 16,
     height: 16,
   },
     pochtaIcon: {
    width: 20,
    height: 20,
  },
     japanIcon: {
     width: 28,
     height: 28,
   },
   mapIcon: {
     width: 28,
     height: 28,
   },
   map1Icon: {
     width: 28,
     height: 28,
   },
   kvIcon: {
     width: 24,
     height: 24,
   },
   telIcon: {
     width: 28,
     height: 28,
   },
   smsIcon: {
     width: 28,
     height: 28,
   },
   cvIcon: {
     width: 28,
     height: 28,
   },
   idIcon: {
     width: 28,
     height: 28,
   },
   refreshIcon: {
     position: 'absolute',
     top: 2,
     right: 8,
     width: 16,
     height: 16,
   },
 });
