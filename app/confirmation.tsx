import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { COLORS, SPACING, RADIUS, SHADOW } from '../src/theme';

export default function ConfirmationScreen() {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1, tension: 60, friction: 8, useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.iconWrap, { transform: [{ scale }] }]}>
          <Text style={styles.icon}>✅</Text>
        </Animated.View>
        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.subtitle}>
          Your pizza is being prepared.{''}
          Estimated delivery: <Text style={styles.highlight}>25–35 min</Text>
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>ORDER NUMBER</Text>
          <Text style={styles.orderNum}>#1043</Text>
          <View style={styles.divider} />
          <Text style={styles.cardLabel}>STATUS</Text>
          <Text style={[styles.status, { color: COLORS.gold }]}>🍕 Preparing your order</Text>
        </View>

        <TouchableOpacity
          style={styles.trackBtn}
          onPress={() => router.push('/map')}
        >
          <Text style={styles.trackText}>Track on Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.homeText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.lg },
  iconWrap: { marginBottom: SPACING.lg },
  icon: { fontSize: 80 },
  title: { fontSize: 32, fontWeight: '800', color: COLORS.offWhite, marginBottom: SPACING.sm },
  subtitle: { fontSize: 16, color: COLORS.gray, textAlign: 'center', lineHeight: 24, marginBottom: SPACING.xl },
  highlight: { color: COLORS.gold, fontWeight: '700' },
  card: {
    backgroundColor: COLORS.card, borderRadius: RADIUS.lg, padding: SPACING.lg,
    borderWidth: 1, borderColor: COLORS.border, width: '100%', marginBottom: SPACING.xl,
  },
  cardLabel: { fontSize: 11, color: COLORS.gray, letterSpacing: 2, fontWeight: '700' },
  orderNum: { fontSize: 28, fontWeight: '800', color: COLORS.gold, marginTop: 4, marginBottom: SPACING.md },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: SPACING.md },
  status: { fontSize: 15, fontWeight: '600', marginTop: 4 },
  trackBtn: {
    backgroundColor: COLORS.gold, borderRadius: RADIUS.full,
    paddingVertical: 16, paddingHorizontal: 40, marginBottom: SPACING.sm, ...SHADOW.gold,
  },
  trackText: { color: COLORS.bg, fontWeight: '800', fontSize: 16 },
  homeBtn: {
    paddingVertical: 14, paddingHorizontal: 40,
    borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.full,
  },
  homeText: { color: COLORS.grayLight, fontWeight: '600', fontSize: 15 },
});