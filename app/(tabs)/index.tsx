import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../src/theme';
import { PIZZAS } from '../../src/data/pizzas';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const popularPizzas = PIZZAS.filter(p => p.isPopular);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good evening 👋</Text>
            <Text style={styles.subtitle}>What are you craving?</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/cart')} style={styles.cartBtn}>
            <Ionicons name="bag-outline" size={22} color={COLORS.gold} />
          </TouchableOpacity>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTag}>TODAY'S SPECIAL</Text>
            <Text style={styles.heroTitle}>Tartufo{''}Nero</Text>
            <Text style={styles.heroPrice}>From 89 zł</Text>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => router.push('/pizza/4')}
            >
              <Text style={styles.heroBtnText}>Order Now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' }}
            style={styles.heroImage}
          />
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          {[
            { icon: '⚡', label: '25 min', sub: 'avg delivery' },
            { icon: '⭐', label: '4.8', sub: 'rating' },
            { icon: '🍕', label: 'Fresh', sub: 'ingredients' },
          ].map((s, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={styles.statVal}>{s.label}</Text>
              <Text style={styles.statSub}>{s.sub}</Text>
            </View>
          ))}
        </View>

        {/* Popular Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Most Popular</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/menu')}>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: SPACING.md }}>
            {popularPizzas.map(pizza => (
              <TouchableOpacity
                key={pizza.id}
                style={styles.pizzaCard}
                onPress={() => router.push(`/pizza/${pizza.id}`)}
              >
                <Image source={{ uri: pizza.image }} style={styles.pizzaImg} />
                <View style={styles.pizzaInfo}>
                  <Text style={styles.pizzaName}>{pizza.name}</Text>
                  <View style={styles.pizzaMeta}>
                    <Text style={styles.pizzaRating}>⭐ {pizza.rating}</Text>
                    <Text style={styles.pizzaPrice}>{pizza.price} zł</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Dashboard Link */}
        <TouchableOpacity
          style={styles.dashCard}
          onPress={() => router.push('/dashboard')}
        >
          <Ionicons name="stats-chart" size={20} color={COLORS.gold} />
          <Text style={styles.dashText}>View Dashboard & Analytics</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
        </TouchableOpacity>

        <View style={{ height: SPACING.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.md, paddingTop: SPACING.md, paddingBottom: SPACING.sm,
  },
  greeting: { fontSize: 22, fontWeight: '700', color: COLORS.offWhite },
  subtitle: { fontSize: 14, color: COLORS.gray, marginTop: 2 },
  cartBtn: {
    width: 44, height: 44, backgroundColor: COLORS.card,
    borderRadius: RADIUS.md, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  heroBanner: {
    margin: SPACING.md, backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl, padding: SPACING.lg,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden',
    ...SHADOW.card,
  },
  heroContent: { flex: 1 },
  heroTag: {
    fontSize: 10, color: COLORS.gold, fontWeight: '700',
    letterSpacing: 2, marginBottom: 6,
  },
  heroTitle: { fontSize: 28, fontWeight: '800', color: COLORS.offWhite, lineHeight: 32 },
  heroPrice: { fontSize: 16, color: COLORS.gold, fontWeight: '600', marginTop: 6 },
  heroBtn: {
    marginTop: 14, backgroundColor: COLORS.gold, borderRadius: RADIUS.full,
    paddingVertical: 10, paddingHorizontal: 20, alignSelf: 'flex-start',
  },
  heroBtnText: { color: COLORS.bg, fontWeight: '700', fontSize: 13 },
  heroImage: { width: 130, height: 130, borderRadius: RADIUS.lg, marginLeft: 8 },
  statsRow: {
    flexDirection: 'row', paddingHorizontal: SPACING.md, gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  statCard: {
    flex: 1, backgroundColor: COLORS.card, borderRadius: RADIUS.md,
    padding: SPACING.sm, alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statVal: { fontSize: 15, fontWeight: '700', color: COLORS.offWhite },
  statSub: { fontSize: 10, color: COLORS.gray, marginTop: 1 },
  section: { marginBottom: SPACING.md },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.md, marginBottom: SPACING.sm,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.offWhite },
  seeAll: { fontSize: 13, color: COLORS.gold },
  pizzaCard: {
    width: 180, backgroundColor: COLORS.card, borderRadius: RADIUS.lg,
    marginRight: SPACING.sm, overflow: 'hidden',
    borderWidth: 1, borderColor: COLORS.border,
  },
  pizzaImg: { width: '100%', height: 130 },
  pizzaInfo: { padding: SPACING.sm },
  pizzaName: { fontSize: 14, fontWeight: '600', color: COLORS.offWhite },
  pizzaMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  pizzaRating: { fontSize: 12, color: COLORS.grayLight },
  pizzaPrice: { fontSize: 13, fontWeight: '700', color: COLORS.gold },
  dashCard: {
    margin: SPACING.md, backgroundColor: COLORS.card,
    borderRadius: RADIUS.md, padding: SPACING.md,
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    borderWidth: 1, borderColor: COLORS.border,
  },
  dashText: { flex: 1, color: COLORS.offWhite, fontSize: 14, fontWeight: '500' },
});