import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../src/theme';
import { PIZZAS } from '../../src/data/pizzas';
import { useCart } from '../../src/context/CartContext';

const { width } = Dimensions.get('window');

export default function PizzaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pizza = PIZZAS.find(p => p.id === id);
  const { addItem, items } = useCart();
  const [qty, setQty] = useState(1);

  if (!pizza) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: COLORS.white, textAlign: 'center', marginTop: 80 }}>
          Pizza not found
        </Text>
      </SafeAreaView>
    );
  }

  const cartItem = items.find(i => i.id === pizza.id);
  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(pizza);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: pizza.image }} style={styles.heroImg} />
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color={COLORS.offWhite} />
      </TouchableOpacity>

      <ScrollView style={styles.sheet} contentContainerStyle={styles.sheetContent}>
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{pizza.name}</Text>
            <Text style={styles.category}>{pizza.category.toUpperCase()}</Text>
          </View>
          <Text style={styles.price}>{pizza.price * qty} zł</Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <Text style={styles.metaText}>⭐ {pizza.rating}</Text>
          </View>
          <View style={styles.metaChip}>
            <Text style={styles.metaText}>🔥 {pizza.calories} kcal</Text>
          </View>
          <View style={styles.metaChip}>
            <Text style={styles.metaText}>💬 {pizza.reviews} reviews</Text>
          </View>
        </View>

        <Text style={styles.desc}>{pizza.description}</Text>

        <Text style={styles.ingrLabel}>INGREDIENTS</Text>
        <View style={styles.ingrRow}>
          {pizza.ingredients.map((ing, i) => (
            <View key={i} style={styles.ingrChip}>
              <Text style={styles.ingrText}>{ing}</Text>
            </View>
          ))}
        </View>

        {/* Quantity */}
        <View style={styles.qtyRow}>
          <Text style={styles.qtyLabel}>Quantity</Text>
          <View style={styles.qtyControls}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty(Math.max(1, qty - 1))}
            >
              <Ionicons name="remove" size={18} color={COLORS.gold} />
            </TouchableOpacity>
            <Text style={styles.qty}>{qty}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(qty + 1)}>
              <Ionicons name="add" size={18} color={COLORS.gold} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Ionicons name="bag-add-outline" size={20} color={COLORS.bg} />
          <Text style={styles.addBtnText}>Add to Cart · {pizza.price * qty} zł</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  heroImg: { width, height: 300 },
  backBtn: {
    position: 'absolute', top: 52, left: 16,
    width: 40, height: 40, backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20, alignItems: 'center', justifyContent: 'center',
  },
  sheet: {
    backgroundColor: COLORS.bg, borderTopLeftRadius: 28,
    borderTopRightRadius: 28, marginTop: -28,
  },
  sheetContent: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  topRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: SPACING.sm },
  name: { fontSize: 26, fontWeight: '800', color: COLORS.offWhite },
  category: { fontSize: 11, color: COLORS.gold, fontWeight: '700', letterSpacing: 2, marginTop: 3 },
  price: { fontSize: 26, fontWeight: '800', color: COLORS.gold },
  metaRow: { flexDirection: 'row', gap: 8, marginBottom: SPACING.md, flexWrap: 'wrap' },
  metaChip: {
    backgroundColor: COLORS.card, borderRadius: RADIUS.full,
    paddingHorizontal: 10, paddingVertical: 5,
    borderWidth: 1, borderColor: COLORS.border,
  },
  metaText: { fontSize: 12, color: COLORS.grayLight },
  desc: { fontSize: 14, color: COLORS.gray, lineHeight: 22, marginBottom: SPACING.lg },
  ingrLabel: {
    fontSize: 11, color: COLORS.gray, fontWeight: '700',
    letterSpacing: 2, marginBottom: 8,
  },
  ingrRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: SPACING.lg },
  ingrChip: {
    backgroundColor: COLORS.cardAlt, borderRadius: RADIUS.full,
    paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: COLORS.border,
  },
  ingrText: { fontSize: 13, color: COLORS.offWhite },
  qtyRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  qtyLabel: { fontSize: 16, fontWeight: '600', color: COLORS.offWhite },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  qtyBtn: {
    width: 40, height: 40, backgroundColor: COLORS.card,
    borderRadius: RADIUS.md, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  qty: { fontSize: 20, fontWeight: '800', color: COLORS.offWhite, minWidth: 24, textAlign: 'center' },
  addBtn: {
    backgroundColor: COLORS.gold, borderRadius: RADIUS.full, paddingVertical: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    ...SHADOW.gold,
  },
  addBtnText: { color: COLORS.bg, fontWeight: '800', fontSize: 16 },
});