import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../src/theme';

const MOCK_ORDERS = [
  {
    id: 'ord_1042', date: 'Today, 14:32', status: 'delivering',
    items: [{ name: 'Margherita Classica', qty: 1 }], total: 42,
  },
  {
    id: 'ord_1038', date: 'Yesterday, 19:05', status: 'delivered',
    items: [{ name: 'Tartufo Nero', qty: 1 }, { name: 'Diavola', qty: 1 }], total: 141,
  },
  {
    id: 'ord_1025', date: '28 Feb, 12:10', status: 'delivered',
    items: [{ name: 'Primavera', qty: 2 }], total: 96,
  },
];

const STATUS_CONFIG: Record<string, { color: string; icon: string; label: string }> = {
  delivering: { color: COLORS.gold, icon: 'bicycle', label: 'On the way' },
  delivered: { color: COLORS.green, icon: 'checkmark-circle', label: 'Delivered' },
  cancelled: { color: COLORS.red, icon: 'close-circle', label: 'Cancelled' },
};

export default function OrdersScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
      </View>
      <FlatList
        data={MOCK_ORDERS}
        keyExtractor={o => o.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const cfg = STATUS_CONFIG[item.status];
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.orderId}>{item.id.replace('ord_', '#')}</Text>
                <View style={[styles.badge, { borderColor: cfg.color }]}>
                  <Ionicons name={cfg.icon as any} size={12} color={cfg.color} />
                  <Text style={[styles.badgeText, { color: cfg.color }]}>{cfg.label}</Text>
                </View>
              </View>
              <Text style={styles.date}>{item.date}</Text>
              {item.items.map((it, i) => (
                <Text key={i} style={styles.itemLine}>
                  {it.qty}× {it.name}
                </Text>
              ))}
              <View style={styles.footer}>
                <Text style={styles.total}>{item.total} zł</Text>
                <TouchableOpacity style={styles.reorderBtn}>
                  <Text style={styles.reorderText}>Reorder</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.offWhite },
  list: { padding: SPACING.md },
  card: {
    backgroundColor: COLORS.card, borderRadius: RADIUS.lg, padding: SPACING.md,
    marginBottom: SPACING.sm, borderWidth: 1, borderColor: COLORS.border,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderId: { fontSize: 15, fontWeight: '700', color: COLORS.gold },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderWidth: 1, borderRadius: RADIUS.full, paddingHorizontal: 8, paddingVertical: 3,
  },
  badgeText: { fontSize: 11, fontWeight: '600' },
  date: { fontSize: 12, color: COLORS.gray, marginTop: 4, marginBottom: 8 },
  itemLine: { fontSize: 14, color: COLORS.offWhite, marginBottom: 2 },
  footer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: SPACING.sm, borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: SPACING.sm,
  },
  total: { fontSize: 18, fontWeight: '800', color: COLORS.offWhite },
  reorderBtn: {
    backgroundColor: COLORS.gold, borderRadius: RADIUS.full,
    paddingVertical: 8, paddingHorizontal: 18,
  },
  reorderText: { color: COLORS.bg, fontWeight: '700', fontSize: 13 },
});