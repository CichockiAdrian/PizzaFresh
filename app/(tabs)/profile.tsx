import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../src/theme';

const MENU_ITEMS = [
  { icon: 'location-outline', label: 'Saved Addresses', screen: '/settings' },
  { icon: 'card-outline', label: 'Payment Methods', screen: '/settings' },
  { icon: 'stats-chart-outline', label: 'Dashboard', screen: '/dashboard' },
  { icon: 'people-outline', label: 'Drivers', screen: '/drivers' },
  { icon: 'settings-outline', label: 'Settings', screen: '/settings' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Profile</Text>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JK</Text>
          </View>
          <Text style={styles.name}>Jan Kowalski</Text>
          <Text style={styles.email}>jan@example.com</Text>
          <View style={styles.statRow}>
            {[
              { val: '24', label: 'Orders' },
              { val: '4.9', label: 'Rating' },
              { val: '2 100 zł', label: 'Spent' },
            ].map((s, i) => (
              <View key={i} style={styles.statItem}>
                <Text style={styles.statVal}>{s.val}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.menuItem, i < MENU_ITEMS.length - 1 && styles.menuBorder]}
              onPress={() => router.push(item.screen as any)}
            >
              <View style={styles.menuLeft}>
                <View style={styles.iconWrap}>
                  <Ionicons name={item.icon as any} size={18} color={COLORS.gold} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={18} color={COLORS.red} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: SPACING.md },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.offWhite, marginBottom: SPACING.lg },
  avatarSection: { alignItems: 'center', marginBottom: SPACING.lg },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: COLORS.goldDim, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: COLORS.gold,
  },
  avatarText: { fontSize: 28, fontWeight: '800', color: COLORS.offWhite },
  name: { fontSize: 20, fontWeight: '700', color: COLORS.offWhite, marginTop: SPACING.sm },
  email: { fontSize: 13, color: COLORS.gray, marginTop: 2, marginBottom: SPACING.md },
  statRow: {
    flexDirection: 'row', gap: SPACING.xl, backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg, paddingVertical: SPACING.md, paddingHorizontal: SPACING.xl,
    borderWidth: 1, borderColor: COLORS.border,
  },
  statItem: { alignItems: 'center' },
  statVal: { fontSize: 17, fontWeight: '800', color: COLORS.gold },
  statLabel: { fontSize: 11, color: COLORS.gray, marginTop: 2 },
  menuCard: {
    backgroundColor: COLORS.card, borderRadius: RADIUS.lg,
    borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden', marginBottom: SPACING.md,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: SPACING.md,
  },
  menuBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  iconWrap: {
    width: 36, height: 36, backgroundColor: COLORS.cardAlt,
    borderRadius: RADIUS.sm, alignItems: 'center', justifyContent: 'center',
  },
  menuLabel: { fontSize: 15, color: COLORS.offWhite, fontWeight: '500' },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: COLORS.card, borderRadius: RADIUS.md,
    paddingVertical: SPACING.md, borderWidth: 1, borderColor: COLORS.border,
  },
  logoutText: { fontSize: 15, color: COLORS.red, fontWeight: '600' },
});