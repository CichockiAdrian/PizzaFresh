import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { COLORS, SPACING, RADIUS } from '../src/theme';
import { DRIVERS } from '../src/data/drivers';

const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#1a1a1a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2a2a2a' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0d1117' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
];

const activeDrivers = DRIVERS.filter(d => d.status !== 'offline');

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<'loading' | 'granted' | 'denied'>('loading');
  const locationSub = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    startTracking();
    return () => { locationSub.current?.remove(); };
  }, []);

  const startTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') { setPermissionStatus('denied'); return; }
    setPermissionStatus('granted');

    // Szybka pierwsza pozycja
    const initial = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    const coords = { latitude: initial.coords.latitude, longitude: initial.coords.longitude };
    setUserLocation(coords);
    mapRef.current?.animateToRegion({ ...coords, latitudeDelta: 0.02, longitudeDelta: 0.02 }, 600);

    // Live tracking co 5s lub 10m
    locationSub.current = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.Balanced, timeInterval: 5000, distanceInterval: 10 },
      loc => setUserLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude })
    );
  };

  const centerOnUser = () => {
    if (!userLocation || !mapRef.current) return;
    mapRef.current.animateToRegion(
      { ...userLocation, latitudeDelta: 0.02, longitudeDelta: 0.02 }, 600
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        customMapStyle={Platform.OS === 'ios' ? DARK_MAP_STYLE : []}
        initialRegion={{ latitude: 52.237049, longitude: 21.017532, latitudeDelta: 0.04, longitudeDelta: 0.04 }}
        showsCompass={false}
        showsMyLocationButton={false}
      >
        {userLocation && (
          <>
            <Circle
              center={userLocation}
              radius={80}
              fillColor="rgba(212,168,83,0.12)"
              strokeColor="rgba(212,168,83,0.4)"
              strokeWidth={1}
            />
            <Marker coordinate={userLocation} anchor={{ x: 0.5, y: 0.5 }}>
              <View style={styles.userOuter}>
                <View style={styles.userInner} />
              </View>
            </Marker>
          </>
        )}

        {activeDrivers.map(driver => (
          <Marker
            key={driver.id}
            coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}
            title={driver.name}
            description={driver.status === 'delivering' ? `ETA: ${driver.eta} min` : 'Available'}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={[styles.driverMarker, { borderColor: driver.status === 'delivering' ? COLORS.gold : COLORS.green }]}>
              <Text style={styles.markerIcon}>🛵</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Header */}
      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color={COLORS.offWhite} />
          </TouchableOpacity>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>Live Map</Text>
          </View>
          <View style={styles.badge}>
            <View style={styles.dot} />
            <Text style={styles.badgeText}>{activeDrivers.length} active</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Przycisk centrowania na mnie */}
      <TouchableOpacity
        style={[styles.locateBtn, !userLocation && { opacity: 0.4 }]}
        onPress={centerOnUser}
        disabled={!userLocation}
      >
        {permissionStatus === 'loading'
          ? <ActivityIndicator size="small" color={COLORS.gold} />
          : permissionStatus === 'denied'
          ? <Ionicons name="location-outline" size={20} color={COLORS.red} />
          : <Ionicons name="locate" size={20} color={COLORS.gold} />
        }
      </TouchableOpacity>

      {permissionStatus === 'denied' && (
        <View style={styles.banner}>
          <Ionicons name="warning-outline" size={16} color={COLORS.red} />
          <Text style={styles.bannerText}>Brak uprawnień. Włącz lokalizację w Ustawieniach.</Text>
        </View>
      )}

      {/* Bottom sheet */}
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.sheetTitle}>Active Drivers</Text>
        {activeDrivers.map(d => (
          <View key={d.id} style={styles.driverRow}>
            <View style={styles.driverLeft}>
              <View style={[styles.statusDot, { backgroundColor: d.status === 'delivering' ? COLORS.gold : COLORS.green }]} />
              <Text style={styles.driverName}>{d.name}</Text>
            </View>
            <Text style={[styles.driverEta, { color: d.status === 'delivering' ? COLORS.gold : COLORS.green }]}>
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
  userOuter: { width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(212,168,83,0.3)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: COLORS.gold },
  userInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.gold },
  driverMarker: { width: 42, height: 42, backgroundColor: COLORS.card, borderRadius: 21, alignItems: 'center', justifyContent: 'center', borderWidth: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 4, elevation: 5 },
  markerIcon: { fontSize: 20 },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.md, paddingTop: SPACING.sm },
  iconBtn: { width: 42, height: 42, backgroundColor: 'rgba(10,10,10,0.85)', borderRadius: 21, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border },
  titleWrap: { backgroundColor: 'rgba(10,10,10,0.85)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.border },
  title: { fontSize: 15, fontWeight: '700', color: COLORS.offWhite },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(10,10,10,0.85)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.border },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.green },
  badgeText: { fontSize: 12, color: COLORS.offWhite, fontWeight: '600' },
  locateBtn: { position: 'absolute', right: SPACING.md, bottom: 220, width: 48, height: 48, backgroundColor: COLORS.card, borderRadius: 24, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 6, elevation: 6 },
  banner: { position: 'absolute', top: 110, left: SPACING.md, right: SPACING.md, backgroundColor: 'rgba(224,82,82,0.15)', borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.red, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: SPACING.md, paddingVertical: 10 },
  bannerText: { fontSize: 13, color: COLORS.red, flex: 1 },
  sheet: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: COLORS.card, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl, paddingTop: SPACING.sm, borderTopWidth: 1, borderTopColor: COLORS.border },
  handle: { width: 40, height: 4, backgroundColor: COLORS.border, borderRadius: 2, alignSelf: 'center', marginBottom: SPACING.sm },
  sheetTitle: { fontSize: 15, fontWeight: '700', color: COLORS.offWhite, marginBottom: SPACING.sm },
  driverRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  driverLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  driverName: { fontSize: 14, color: COLORS.offWhite },
  driverEta: { fontSize: 13, fontWeight: '600' },
});