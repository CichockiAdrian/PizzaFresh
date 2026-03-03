import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../src/theme';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [darkMode] = useState(true);

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );

  const RowToggle = ({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) => (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value} onValueChange={onChange}
        trackColor={{ false: COLORS.border, true: COLORS.goldDim }}
        thumbColor={value ? COLORS.gold : COLORS.gray}
      />
    </View>
  );

  const RowLink = ({ label, onPress }: { label: string; onPress?: () => void }) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.offWhite} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Section title="NOTIFICATIONS">
          <RowToggle label="Order updates" value={notifications} onChange={setNotifications} />
          <View style={styles.divider} />
          <RowToggle label="Promotions" value={false} onChange={() => {}} />
        </Section>

        <Section title="PRIVACY">
          <RowToggle label="Share location" value={locationSharing} onChange={setLocationSharing} />
          <View style={styles.divider} />
          <RowLink label="Privacy Policy" />
        </Section>

        <Section title="APPEARANCE">
          <RowToggle label="Dark Mode" value={darkMode} onChange={() => {}} />
        </Section>

        <Section title="ACCOUNT">
          <RowLink label="Change Password" />
          <View style={styles.divider} />
          <RowLink label="Delete Account" />
        </Section>

        <Section title="ABOUT">
          <RowLink label="Version 1.0.0" />
          <View style={styles.divider} />
          <RowLink label="Terms of Service" />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  title: { fontSize: 18, fontWeight: '700', color: COLORS.offWhite },
  scroll: { padding: SPACING.md },
  section: { marginBottom: SPACING.md },
  sectionLabel: {
    fontSize: 11, color: COLORS.gray, fontWeight: '700',
    letterSpacing: 2, marginBottom: 8,
  },
  card: {
    backgroundColor: COLORS.card, borderRadius: RADIUS.lg,
    borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden',
  },
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.md, paddingVertical: 14,
  },
  rowLabel: { fontSize: 15, color: COLORS.offWhite },
  divider: { height: 1, backgroundColor: COLORS.border },
});