import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Image, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../src/theme';
import { PIZZAS, CATEGORIES, type Pizza } from '../../src/data/pizzas';
import { useCart } from '../../src/context/CartContext';

export default function MenuScreen() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { addItem, items } = useCart();

  const filtered = useMemo(() => {
    return PIZZAS.filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  const cartQty = (id: string) =>
    items.find(i => i.id === id)?.quantity ?? 0;

  const renderPizza = ({ item }: { item: Pizza }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/pizza/${item.id}`)}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.image }} style={styles.img} />
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{item.name}</Text>
          {item.isPopular && (
            <View style={styles.badge}><Text style={styles.badgeText}>HOT</Text></View>
          )}
        </View>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.price}>{item.price} zł</Text>
            <Text style={styles.rating}>⭐ {item.rating} ({item.reviews})</Text>
          </View>
          <TouchableOpacity
            style={[styles.addBtn, cartQty(item.id) > 0 && styles.addBtnActive]}
            onPress={() => addItem(item)}
          >
            {cartQty(item.id) > 0
              ? <Text style={styles.addBtnText}>{cartQty(item.id)} ✓</Text>
              : <Ionicons name="add" size={20} color={COLORS.bg} />
            }
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Our Menu</Text>
        <TouchableOpacity onPress={() => router.push('/cart')} style={styles.cartBtn}>
          <Ionicons name="bag-outline" size={22} color={COLORS.gold} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={16} color={COLORS.gray} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search pizza..."
          placeholderTextColor={COLORS.gray}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Categories */}
      <FlatList
        horizontal
        data={CATEGORIES as unknown as string[]}
        keyExtractor={i => i}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.catChip, activeCategory === item && styles.catActive]}
            onPress={() => setActiveCategory(item)}
          >
            <Text style={[styles.catText, activeCategory === item && styles.catTextActive]}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Pizza List */}
      <FlatList
        data={filtered}
        keyExtractor={p => p.id}
        renderItem={renderPizza}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No pizzas found 🍕</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
  },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.offWhite },
  cartBtn: {
    width: 44, height: 44, backgroundColor: COLORS.card,
    borderRadius: RADIUS.md, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    marginHorizontal: SPACING.md, marginBottom: SPACING.sm,
    backgroundColor: COLORS.card, borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md, paddingVertical: 12,
    borderWidth: 1, borderColor: COLORS.border,
  },
  searchInput: { flex: 1, color: COLORS.offWhite, fontSize: 14 },
  catList: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.sm, gap: SPACING.sm },
  catChip: {
    paddingHorizontal: SPACING.md, paddingVertical: 8,
    borderRadius: RADIUS.full, backgroundColor: COLORS.card,
    borderWidth: 1, borderColor: COLORS.border,
  },
  catActive: { backgroundColor: COLORS.gold, borderColor: COLORS.gold },
  catText: { fontSize: 13, fontWeight: '600', color: COLORS.gray },
  catTextActive: { color: COLORS.bg },
  list: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl },
  card: {
    backgroundColor: COLORS.card, borderRadius: RADIUS.lg,
    marginBottom: SPACING.sm, flexDirection: 'row', overflow: 'hidden',
    borderWidth: 1, borderColor: COLORS.border,
  },
  img: { width: 110, height: 110 },
  info: { flex: 1, padding: SPACING.sm },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name: { fontSize: 15, fontWeight: '700', color: COLORS.offWhite, flex: 1 },
  badge: {
    backgroundColor: COLORS.red, borderRadius: 4, paddingHorizontal: 5, paddingVertical: 2,
  },
  badgeText: { fontSize: 9, color: '#fff', fontWeight: '800' },
  desc: { fontSize: 12, color: COLORS.gray, marginTop: 3, lineHeight: 17 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 },
  price: { fontSize: 16, fontWeight: '800', color: COLORS.gold },
  rating: { fontSize: 11, color: COLORS.grayLight, marginTop: 2 },
  addBtn: {
    width: 36, height: 36, backgroundColor: COLORS.gold,
    borderRadius: RADIUS.full, alignItems: 'center', justifyContent: 'center',
  },
  addBtnActive: { backgroundColor: COLORS.green },
  addBtnText: { color: COLORS.bg, fontSize: 11, fontWeight: '800' },
  empty: { alignItems: 'center', paddingTop: SPACING.xxl },
  emptyText: { color: COLORS.gray, fontSize: 16 },
});