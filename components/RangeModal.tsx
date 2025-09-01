import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { colors } from '@/types/colors';

interface RangeModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
  format?: (n: number) => string;
}

export function RangeModal({
  visible,
  onClose,
  title,
  min,
  max,
  step = 1,
  value,
  onChange,
  format = (n) => `${n}`,
}: RangeModalProps) {
  const [from, setFrom] = React.useState<number>(value[0]);
  const [to, setTo] = React.useState<number>(value[1]);

  React.useEffect(() => {
    if (visible) {
      setFrom(value[0]);
      setTo(value[1]);
    }
  }, [visible, value]);

  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const inc = (which: 'from' | 'to') => {
    if (which === 'from') setFrom((v) => clamp(Math.min(v + step, to)));
    else setTo((v) => clamp(Math.max(v + step, from)));
  };
  const dec = (which: 'from' | 'to') => {
    if (which === 'from') setFrom((v) => clamp(Math.min(Math.max(v - step, min), to)));
    else setTo((v) => clamp(Math.max(v - step, from)));
  };

  const apply = () => {
    onChange([from, to]);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.close} onPress={onClose}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Min</Text>
            <View style={styles.stepper}>
              <TouchableOpacity style={styles.step} onPress={() => dec('from')}>
                <Text style={styles.stepText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.value}>{format(from)}</Text>
              <TouchableOpacity style={styles.step} onPress={() => inc('from')}>
                <Text style={styles.stepText}>＋</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Max</Text>
            <View style={styles.stepper}>
              <TouchableOpacity style={styles.step} onPress={() => dec('to')}>
                <Text style={styles.stepText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.value}>{format(to)}</Text>
              <TouchableOpacity style={styles.step} onPress={() => inc('to')}>
                <Text style={styles.stepText}>＋</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.apply} onPress={apply}>
            <Text style={styles.applyText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  close: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray[100],
  },
  closeText: {
    fontSize: 18,
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textSecondary,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12 as unknown as number,
  },
  step: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray[100],
  },
  stepText: {
    fontSize: 20,
    color: colors.text,
  },
  value: {
    minWidth: 80,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  apply: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyText: {
    color: colors.white,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
});


