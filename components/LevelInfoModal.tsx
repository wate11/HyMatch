import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';

interface LevelInfoModalProps {
  isVisible: boolean;
  onClose: () => void;
  level: number;
}

const levelInfo = {
  1: {
    name: 'N1',
    title: '上級レベル (Advanced Level)',
    description: 'ビジネスや学術的な場面で十分に日本語を使いこなせるレベル',
    details: [
      '複雑な文章の理解',
      '抽象的な概念の表現',
      'ビジネス文書の作成',
      '学術的な議論への参加'
    ]
  },
  2: {
    name: 'N2',
    title: '中級レベル (Intermediate Level)',
    description: '日常的な場面で日本語を問題なく使えるレベル',
    details: [
      '新聞記事の理解',
      '一般的な会話の参加',
      '基本的なビジネスコミュニケーション',
      'テレビ番組の理解'
    ]
  },
  3: {
    name: 'N3',
    title: '初中級レベル (Pre-Intermediate Level)',
    description: '日常的な場面で基本的な日本語を使えるレベル',
    details: [
      '簡単な文章の理解',
      '基本的な会話の参加',
      '簡単な指示の理解',
      '日常的な話題の理解'
    ]
  },
  4: {
    name: 'N4',
    title: '初級レベル (Elementary Level)',
    description: '基本的な日本語を理解し、簡単な会話ができるレベル',
    details: [
      '基本的な文法の理解',
      '簡単な文章の作成',
      '日常的な挨拶',
      '基本的な指示の理解'
    ]
  },
  5: {
    name: 'N5',
    title: '入門レベル (Beginner Level)',
    description: '日本語の基礎を学び始めたレベル',
    details: [
      'ひらがな・カタカナの読み書き',
      '基本的な挨拶',
      '簡単な自己紹介',
      '数字と時間の表現'
    ]
  }
};

export function LevelInfoModal({ isVisible, onClose, level }: LevelInfoModalProps) {
  const currentLevel = levelInfo[level as keyof typeof levelInfo];

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{currentLevel.name}</Text>
              </View>
              <Text style={styles.headerTitle}>{currentLevel.title}</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#000000" />
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionText}>{currentLevel.description}</Text>
          </View>

          {/* Level Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.detailsTitle}>このレベルの特徴:</Text>
            <ScrollView style={styles.detailsList} showsVerticalScrollIndicator={false}>
              {currentLevel.details.map((detail, index) => (
                <View key={index} style={styles.detailItem}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.detailText}>{detail}</Text>
                </View>
              ))}
            </ScrollView>
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
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#f9efe7',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  levelBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  levelText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    flex: 1,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    lineHeight: 24,
  },
  detailsSection: {
    flex: 1,
  },
  detailsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginBottom: 12,
  },
  detailsList: {
    flex: 1,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginTop: 6,
    marginRight: 12,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    lineHeight: 20,
    flex: 1,
  },
});
