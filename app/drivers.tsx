import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../src/theme';
import { DRIVERS, type Driver } from '../src/data/drivers';

const statusColor = (s: Driver['status']) => ({
  available: COLORS.green,
  delivering: COLORS.gold,
  offline: COLORS.gray,
}[s]);

export default function DriversScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.offWhite} />
        </TouchableOpacity>
        <Text style={styles.title}>Drivers</Text>
        <TouchableOpacity onPress={() => router.push('/map')}>
          <Ionicons name="map-outline" size={24} color={COLORS.gold} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={DRIVERS}
        keyExtractor={d => d.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={[styles.dot, { backgroundColor: statusColor(item.status) }]} />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.vehicle}>{item.vehicle}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.meta}>⭐ {item.rating}</Text>
                <Text style={styles.meta}>📦 {item.deliveries}</Text>
                {item.eta && <Text style={[styles.meta, { color: COLORS.gold }]}>🕐 {item.eta} min</Text>}
              </View>
            </View>
            <View style={styles.right}>
              <View style={[styles.statusBadge, { borderColor: statusColor(item.status) }]}>
                <Text style={[styles.statusText, { color: statusColor(item.status) }]}>
                  {item.status}
                </Text>
              </View>
              <TouchableOpacity style={styles.callBtn}>
                <Ionicons name="call-outline" size={16} color={COLORS.gold} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
  list: { padding: SPACING.md },
  card: {
    flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: RADIUS.lg,
    padding: SPACING.md, marginBottom: SPACING.sm, alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border, gap: SPACING.sm,
  },
  avatarWrap: { position: 'relative' },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  dot: {
    position: 'absolute', bottom: 0, right: 0,
    width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: COLORS.card,
  },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: COLORS.offWhite },
  vehicle: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
  metaRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  meta: { fontSize: 12, color: COLORS.grayLight },
  right: { alignItems: 'flex-end', gap: 8 },
  statusBadge: {
    borderWidth: 1, borderRadius: RADIUS.full, paddingHorizontal: 8, paddingVertical: 3,
  },
  statusText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  callBtn: {
    width: 32, height: 32, backgroundColor: COLORS.cardAlt,
    borderRadius: RADIUS.full, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
});