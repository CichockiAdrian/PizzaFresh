import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../src/theme';

const STATS = [
  { label: 'Orders Today', value: '47', change: '+12%', up: true, icon: '📦' },
  { label: 'Revenue', value: '3 240 zł', change: '+8%', up: true, icon: '💰' },
  { label: 'Avg. Delivery', value: '22 min', change: '-3 min', up: true, icon: '⚡' },
  { label: 'Active Drivers', value: '3/4', change: '75%', up: null, icon: '🚗' },
];

const RECENT_ORDERS = [
  { id: '#1042', pizza: 'Margherita Classica', time: '5 min ago', status: 'delivering', amount: 42 },
  { id: '#1041', pizza: 'Tartufo Nero', time: '18 min ago', status: 'delivered', amount: 89 },
  { id: '#1040', pizza: 'Diavola x2', time: '31 min ago', status: 'delivered', amount: 104 },
  { id: '#1039', pizza: 'Primavera', time: '45 min ago', status: 'delivered', amount: 48 },
];

const statusColor = (s: string) =>
  s === 'delivering' ? COLORS.gold : COLORS.green;

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.offWhite} />
        </TouchableOpacity>
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity onPress={() => router.push('/drivers')}>
          <Ionicons name="people-outline" size={24} color={COLORS.gold} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.dateLabel}>Tuesday, 3 March 2026</Text>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {STATS.map((s, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={styles.statVal}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={[styles.statChange, { color: s.up ? COLORS.green : COLORS.gold }]}>
                {s.change}
              </Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/map')}>
            <Ionicons name="map" size={20} color={COLORS.bg} />
            <Text style={styles.actionText}>Live Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnOutline]} onPress={() => router.push('/drivers')}>
            <Ionicons name="people" size={20} color={COLORS.gold} />
            <Text style={[styles.actionText, { color: COLORS.gold }]}>Drivers</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Orders */}
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        {RECENT_ORDERS.map(order => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderLeft}>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={styles.orderPizza}>{order.pizza}</Text>
              <Text style={styles.orderTime}>{order.time}</Text>
            </View>
            <View style={styles.orderRight}>
              <Text style={styles.orderAmount}>{order.amount} zł</Text>
              <View style={[styles.statusBadge, { borderColor: statusColor(order.status) }]}>
                <Text style={[styles.statusText, { color: statusColor(order.status) }]}>
                  {order.status}
                </Text>
              </View>
            </View>
          </View>
        ))}
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
  dateLabel: { fontSize: 13, color: COLORS.gray, marginBottom: SPACING.md },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.md,
  },
  statCard: {
    backgroundColor: COLORS.card, borderRadius: RADIUS.lg,
    padding: SPACING.md, borderWidth: 1, borderColor: COLORS.border,
    width: '48%',
  },
  statIcon: { fontSize: 24, marginBottom: 8 },
  statVal: { fontSize: 20, fontWeight: '800', color: COLORS.offWhite },
  statLabel: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
  statChange: { fontSize: 13, fontWeight: '600', marginTop: 4 },
  actions: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.lg },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: COLORS.gold, borderRadius: RADIUS.md, paddingVertical: 14,
  },
  actionBtnOutline: {
    backgroundColor: 'transparent', borderWidth: 1, borderColor: COLORS.gold,
  },
  actionText: { fontWeight: '700', fontSize: 14, color: COLORS.bg },
  sectionTitle: {
    fontSize: 16, fontWeight: '700', color: COLORS.offWhite,
    marginBottom: SPACING.sm,
  },
  orderCard: {
    backgroundColor: COLORS.card, borderRadius: RADIUS.md, padding: SPACING.md,
    flexDirection: 'row', justifyContent: 'space-between',
    borderWidth: 1, borderColor: COLORS.border, marginBottom: SPACING.sm,
  },
  orderLeft: { gap: 3 },
  orderId: { fontSize: 14, fontWeight: '700', color: COLORS.gold },
  orderPizza: { fontSize: 13, color: COLORS.offWhite },
  orderTime: { fontSize: 12, color: COLORS.gray },
  orderRight: { alignItems: 'flex-end', gap: 6 },
  orderAmount: { fontSize: 15, fontWeight: '700', color: COLORS.offWhite },
  statusBadge: {
    borderWidth: 1, borderRadius: RADIUS.full, paddingHorizontal: 8, paddingVertical: 3,
  },
  statusText: { fontSize: 11, fontWeight: '600' },
});