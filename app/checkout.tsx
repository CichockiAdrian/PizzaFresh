import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, TextInput, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOW } from '../src/theme';
import { useCart } from '../src/context/CartContext';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit Card', icon: 'card' },
  { id: 'blik', label: 'BLIK', icon: 'phone-portrait' },
  { id: 'cash', label: 'Cash on delivery', icon: 'cash' },
] as const;

export default function CheckoutScreen() {
  const { totalPrice, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState<string>('card');
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter a delivery address.');
      return;
    }
    setLoading(true);
    // TODO: Save order to Supabase
    // await supabase.from('orders').insert({ ... });
    setTimeout(() => {
      setLoading(false);
      clearCart();
      router.replace('/confirmation');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.offWhite} />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Delivery Address */}
        <Text style={styles.sectionLabel}>Delivery Address</Text>
        <View style={styles.inputWrap}>
          <Ionicons name="location-outline" size={18} color={COLORS.gold} />
          <TextInput
            style={styles.input}
            placeholder="Enter full address..."
            placeholderTextColor={COLORS.gray}
            value={address}
            onChangeText={setAddress}
            multiline
          />
        </View>

        {/* Payment */}
        <Text style={styles.sectionLabel}>Payment Method</Text>
        {PAYMENT_METHODS.map(m => (
          <TouchableOpacity
            key={m.id}
            style={[styles.payOption, payment === m.id && styles.payActive]}
            onPress={() => setPayment(m.id)}
          >
            <View style={styles.payLeft}>
              <Ionicons name={m.icon as any} size={20} color={payment === m.id ? COLORS.gold : COLORS.gray} />
              <Text style={[styles.payLabel, payment === m.id && styles.payLabelActive]}>
                {m.label}
              </Text>
            </View>
            {payment === m.id && (
              <Ionicons name="checkmark-circle" size={20} color={COLORS.gold} />
            )}
          </TouchableOpacity>
        ))}

        {/* Order Summary */}
        <Text style={styles.sectionLabel}>Order Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryVal}>{totalPrice} zł</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery fee</Text>
            <Text style={[styles.summaryVal, { color: COLORS.green }]}>FREE</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalVal}>{totalPrice} zł</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.orderBtn, loading && { opacity: 0.6 }]}
          onPress={handleOrder}
          disabled={loading}
        >
          <Text style={styles.orderBtnText}>
            {loading ? 'Placing Order...' : `Place Order · ${totalPrice} zł`}
          </Text>
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
  scroll: { padding: SPACING.md },
  sectionLabel: {
    fontSize: 13, color: COLORS.gray, fontWeight: '600',
    letterSpacing: 1, textTransform: 'uppercase',
    marginTop: SPACING.md, marginBottom: SPACING.sm,
  },
  inputWrap: {
    flexDirection: 'row', gap: SPACING.sm, backgroundColor: COLORS.card,
    borderRadius: RADIUS.md, padding: SPACING.md,
    borderWidth: 1, borderColor: COLORS.border, alignItems: 'flex-start',
  },
  input: { flex: 1, color: COLORS.offWhite, fontSize: 14, lineHeight: 20 },
  payOption: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.card, borderRadius: RADIUS.md,
    padding: SPACING.md, marginBottom: SPACING.sm,
    borderWidth: 1, borderColor: COLORS.border,
  },
  payActive: { borderColor: COLORS.gold },
  payLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  payLabel: { fontSize: 15, color: COLORS.grayLight, fontWeight: '500' },
  payLabelActive: { color: COLORS.offWhite },
  summaryCard: {
    backgroundColor: COLORS.card, borderRadius: RADIUS.md,
    padding: SPACING.md, borderWidth: 1, borderColor: COLORS.border,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: COLORS.gray },
  summaryVal: { fontSize: 14, fontWeight: '600', color: COLORS.offWhite },
  totalRow: { borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 12, marginTop: 4, marginBottom: 0 },
  totalLabel: { fontSize: 17, fontWeight: '700', color: COLORS.offWhite },
  totalVal: { fontSize: 20, fontWeight: '800', color: COLORS.gold },
  footer: {
    padding: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  orderBtn: {
    backgroundColor: COLORS.gold, borderRadius: RADIUS.full,
    paddingVertical: 16, alignItems: 'center', ...SHADOW.gold,
  },
  orderBtnText: { color: COLORS.bg, fontWeight: '800', fontSize: 16 },
});