import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOW } from '../src/theme';
import { useCart, type CartItem } from '../src/context/CartContext';

export default function CartScreen() {
  const { items, totalPrice, totalItems, removeItem, updateQty } = useCart();

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={COLORS.offWhite} />
          </TouchableOpacity>
          <Text style={styles.title}>Your Cart</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add some delicious pizza!</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => router.push('/(tabs)/menu')}>
            <Text style={styles.shopBtnText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.itemImg} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price} zł / szt.</Text>
      </View>
      <View style={styles.qtyControls}>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => updateQty(item.id, item.quantity - 1)}
        >
          <Ionicons name="remove" size={16} color={COLORS.gold} />
        </TouchableOpacity>
        <Text style={styles.qty}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => updateQty(item.id, item.quantity + 1)}
        >
          <Ionicons name="add" size={16} color={COLORS.gold} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={COLORS.offWhite} />
        </TouchableOpacity>
        <Text style={styles.title}>Cart ({totalItems})</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={items}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryVal}>{totalPrice} zł</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={[styles.summaryVal, { color: COLORS.green }]}>FREE</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalVal}>{totalPrice} zł</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => router.push('/checkout')}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.bg} />
        </TouchableOpacity>
      </View>
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
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.sm },
  emptyIcon: { fontSize: 64 },
  emptyTitle: { fontSize: 22, fontWeight: '700', color: COLORS.offWhite },
  emptySubtitle: { fontSize: 14, color: COLORS.gray },
  shopBtn: {
    marginTop: SPACING.md, backgroundColor: COLORS.gold,
    borderRadius: RADIUS.full, paddingVertical: 14, paddingHorizontal: 32,
  },
  shopBtnText: { color: COLORS.bg, fontWeight: '700', fontSize: 15 },
  list: { padding: SPACING.md },
  item: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card,
    borderRadius: RADIUS.md, marginBottom: SPACING.sm, overflow: 'hidden',
    borderWidth: 1, borderColor: COLORS.border,
  },
  itemImg: { width: 80, height: 80 },
  itemInfo: { flex: 1, padding: SPACING.sm },
  itemName: { fontSize: 14, fontWeight: '600', color: COLORS.offWhite },
  itemPrice: { fontSize: 13, color: COLORS.gold, marginTop: 4 },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingRight: SPACING.sm },
  qtyBtn: {
    width: 32, height: 32, backgroundColor: COLORS.cardAlt,
    borderRadius: RADIUS.sm, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  qty: { fontSize: 16, fontWeight: '700', color: COLORS.offWhite, minWidth: 20, textAlign: 'center' },
  summary: {
    backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.border,
    padding: SPACING.md, paddingBottom: SPACING.lg,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.sm },
  summaryLabel: { fontSize: 14, color: COLORS.gray },
  summaryVal: { fontSize: 14, fontWeight: '600', color: COLORS.offWhite },
  totalRow: { borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: SPACING.sm, marginBottom: SPACING.md },
  totalLabel: { fontSize: 17, fontWeight: '700', color: COLORS.offWhite },
  totalVal: { fontSize: 20, fontWeight: '800', color: COLORS.gold },
  checkoutBtn: {
    backgroundColor: COLORS.gold, borderRadius: RADIUS.full,
    paddingVertical: 16, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8, ...SHADOW.gold,
  },
  checkoutText: { color: COLORS.bg, fontWeight: '800', fontSize: 16 },
});