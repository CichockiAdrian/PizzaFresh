import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { COLORS, SPACING, RADIUS } from '../src/theme';
import { DRIVERS } from '../src/data/drivers';

// Dark map style (works on iOS natively, Android needs Google Maps API key in production)
const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#1a1a1a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a1a1a' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2a2a2a' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#303030' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0d1117' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
];

const activeDrivers = DRIVERS.filter(d => d.status !== 'offline');

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        // ⚠️ Do NOT use PROVIDER_GOOGLE in Expo Go — causes crash with New Architecture
        // Use PROVIDER_GOOGLE only in development/production builds with proper setup
        style={StyleSheet.absoluteFillObject}
        customMapStyle={Platform.OS === 'ios' ? DARK_MAP_STYLE : []}
        initialRegion={{
          latitude: 52.237049,
          longitude: 21.017532,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {activeDrivers.map(driver => (
          <Marker
            key={driver.id}
            coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}
            title={driver.name}
            description={
              driver.status === 'delivering'
                ? `ETA: ${driver.eta} min`
                : 'Available'
            }
          >
            <View style={[
              styles.marker,
              { borderColor: driver.status === 'delivering' ? COLORS.gold : COLORS.green },
            ]}>
              <Text style={styles.markerIcon}>🛵</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Header overlay */}
      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color={COLORS.offWhite} />
          </TouchableOpacity>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>Live Map</Text>
          </View>
          <View style={styles.onlineBadge}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>{activeDrivers.length} active</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Bottom sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.handle} />
        <Text style={styles.sheetTitle}>Active Drivers</Text>
        {activeDrivers.map(d => (
          <View key={d.id} style={styles.driverRow}>
            <View style={styles.driverLeft}>
              <View style={[
                styles.statusDot,
                { backgroundColor: d.status === 'delivering' ? COLORS.gold : COLORS.green },
              ]} />
              <Text style={styles.driverName}>{d.name}</Text>
            </View>
            <Text style={[
              styles.driverStatus,
              { color: d.status === 'delivering' ? COLORS.gold : COLORS.green },
            ]}>
              {d.status === 'delivering' ? `🕐 ${d.eta} min` : '✓ Available'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  // Marker
  marker: {
    width: 42, height: 42, backgroundColor: COLORS.card,
    borderRadius: 21, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, shadowRadius: 4, elevation: 5,
  },
  markerIcon: { fontSize: 20 },

  // Overlay header
  overlay: { position: 'absolute', top: 0, left: 0, right: 0 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.md, paddingTop: SPACING.sm,
  },
  backBtn: {
    width: 42, height: 42, backgroundColor: 'rgba(10,10,10,0.85)',
    borderRadius: 21, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  titleWrap: {
    backgroundColor: 'rgba(10,10,10,0.85)', paddingHorizontal: 16,
    paddingVertical: 8, borderRadius: RADIUS.full,
    borderWidth: 1, borderColor: COLORS.border,
  },
  title: { fontSize: 15, fontWeight: '700', color: COLORS.offWhite },
  onlineBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(10,10,10,0.85)', paddingHorizontal: 12,
    paddingVertical: 8, borderRadius: RADIUS.full,
    borderWidth: 1, borderColor: COLORS.border,
  },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.green },
  onlineText: { fontSize: 12, color: COLORS.offWhite, fontWeight: '600' },

  // Bottom sheet
  bottomSheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl, paddingTop: SPACING.sm,
    borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  handle: {
    width: 40, height: 4, backgroundColor: COLORS.border,
    borderRadius: 2, alignSelf: 'center', marginBottom: SPACING.sm,
  },
  sheetTitle: {
    fontSize: 15, fontWeight: '700', color: COLORS.offWhite,
    marginBottom: SPACING.sm,
  },
  driverRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  driverLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  driverName: { fontSize: 14, color: COLORS.offWhite },
  driverStatus: { fontSize: 13, fontWeight: '600' },
});