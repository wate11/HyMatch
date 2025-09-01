import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, IconSets } from './IconSet';
import { colors } from '@/types/colors';
import { User } from '@/types/User';

interface ProfileFormProps {
  user: Partial<User>;
  onUpdate: (updates: Partial<User>) => void;
}

export function ProfileForm({ user, onUpdate }: ProfileFormProps) {
  const [formData, setFormData] = useState<Partial<User>>(user);

  const updateField = (field: keyof User, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const renderField = (
    iconName: string,
    label: string,
    field: keyof User,
    placeholder: string,
    required: boolean = false,
    keyboardType: 'default' | 'numeric' | 'email-address' | 'phone-pad' = 'default',
    multiline: boolean = false
  ) => (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldHeader}>
        <Icon name={iconName} size={20} color={IconSets.profile[iconName as keyof typeof IconSets.profile]?.color || colors.primary} />
        <Text style={styles.fieldLabel}>
          {label} {required && '*'}
        </Text>
      </View>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput
        ]}
        value={formData[field]?.toString() || ''}
        onChangeText={(text) => updateField(field, text)}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
    </View>
  );

  const renderDropdown = (
    iconName: string,
    label: string,
    field: keyof User,
    options: Array<{ key: string; label: string }>,
    required: boolean = false
  ) => (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldHeader}>
        <Icon name={iconName} size={20} color={IconSets.profile[iconName as keyof typeof IconSets.profile]?.color || colors.primary} />
        <Text style={styles.fieldLabel}>
          {label} {required && '*'}
        </Text>
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownText}>
          {formData[field]?.toString() || '選択してください'}
        </Text>
        <Icon name="chevron-down" size={16} color={colors.gray[400]} />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Basic Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>基本情報</Text>
        
        {/* Name */}
        {renderField('user', '名前', 'firstName', '名前', true)}
        {renderField('user', '苗字', 'lastName', '苗字', true)}
        
        {/* Age and Gender */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            {renderField('calendar', '年齢', 'age', '年齢', false, 'numeric')}
          </View>
          <View style={styles.halfField}>
            {renderDropdown('user', '性別', 'gender', [
              { key: 'male', label: '男性' },
              { key: 'female', label: '女性' },
              { key: 'other', label: 'その他' }
            ])}
          </View>
        </View>
        
        {/* Nationality */}
        {renderField('globe', '国籍', 'nationality', '国籍')}
      </View>

      {/* Contact Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>連絡先情報</Text>
        
        {renderField('phone', '電話番号', 'phone', '電話番号', true, 'phone-pad')}
        {renderField('mail', 'メール', 'email', 'メール', true, 'email-address')}
      </View>

      {/* Address Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>住所情報</Text>
        
        <View style={styles.row}>
          <View style={styles.halfField}>
            {renderField('map-pin', '郵便番号', 'postalCode', '123-4567', false, 'numeric')}
          </View>
          <View style={styles.halfField}>
            {renderDropdown('map-pin', '都道府県', 'prefecture', [
              { key: 'tokyo', label: '東京都' },
              { key: 'osaka', label: '大阪府' },
              { key: 'kyoto', label: '京都府' }
            ])}
          </View>
        </View>
        
        {renderField('map-pin', '市区町村', 'city', '渋谷区')}
        {renderField('map-pin', '住所', 'address', '1-2-3 渋谷, 東京', false, 'default', true)}
      </View>

      {/* Transportation Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>交通</Text>
        
        <View style={styles.row}>
          <View style={styles.halfField}>
            {renderField('home', '最寄駅 (自宅)', 'nearestStationHome', '渋谷駅')}
          </View>
          <View style={styles.halfField}>
            {renderField('clock', '徒歩時間 (自宅)', 'walkTimeHome', '10分', false, 'numeric')}
          </View>
        </View>
        
        <View style={styles.row}>
          <View style={styles.halfField}>
            {renderField('building', '最寄駅 (学校)', 'nearestStationSchool', '新宿駅')}
          </View>
          <View style={styles.halfField}>
            {renderField('clock', '徒歩時間 (学校)', 'walkTimeSchool', '15分', false, 'numeric')}
          </View>
        </View>
      </View>

      {/* Work Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>勤務希望</Text>
        
        {renderDropdown('message-circle', '日本語レベル', 'japaneseLevel', [
          { key: 'N1', label: 'N1' },
          { key: 'N2', label: 'N2' },
          { key: 'N3', label: 'N3' },
          { key: 'N4', label: 'N4' },
          { key: 'N5', label: 'N5' }
        ])}
        
        {renderField('file-text', 'ビザタイプ', 'visaType', '学生ビザ、就労ビザなど')}
        {renderField('file-text', '職歴', 'workExperience', '職歴を説明してください', false, 'default', true)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginLeft: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.text,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
}); 