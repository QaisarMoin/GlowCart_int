import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Dimensions } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Star, ArrowLeft, Share2 } from "lucide-react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={18}
          color={i < fullStars ? "#C97B6A" : "#E0E0E0"}
          fill={i < fullStars ? "#C97B6A" : "none"}
          style={{ marginRight: 2 }}
        />
      ))}
    </View>
  );
}

function getAvatar(email: string) {
  // Use a placeholder avatar service based on email hash
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}&backgroundColor=F5E3DF&fontWeight=bold`;
}

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#C97B6A" />
      </View>
    );
  }
  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  // Highlights
  const highlights = [
    { label: "Width", value: product.dimensions?.width },
    { label: "Height", value: product.dimensions?.height },
    { label: "Warranty", value: product.warrantyInformation },
    { label: "Shipping", value: product.shippingInformation },
  ];

  return (
    <ScrollView style={styles.bg} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.imageSection}>
        <View style={styles.imageShadowWrap}>
          <Image source={{ uri: product.images?.[0] }} style={styles.image} resizeMode="cover" />
        </View>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#C97B6A" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn}>
          <Share2 size={20} color="#C97B6A" />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <TouchableOpacity style={styles.similarBtn}>
          <Text style={styles.similarBtnText}>View Similar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.desc}>{product.description}</Text>
        <View style={styles.ratingRow}>
          <RatingStars rating={product.rating} />
          <Text style={styles.ratingText}>{product.rating}/5</Text>
        </View>
        <Text style={styles.soldBy}>Sold by : <Text style={{ fontWeight: "bold" }}>{product.brand}</Text></Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.oldPrice}>${(product.price + product.discountPercentage).toFixed(2)}</Text>
          <TouchableOpacity style={styles.addToBagBtn}>
            <Text style={styles.addToBagText}>Add to Bag</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Highlights</Text>
        <View style={styles.highlightsGrid}>
          <View style={styles.highlightsCol}>
            <View style={styles.highlightItem}>
              <Text style={styles.highlightLabel}>Width</Text>
              <Text style={styles.highlightValue}>{product.dimensions?.width}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.highlightItem}>
              <Text style={styles.highlightLabel}>Warranty</Text>
              <Text style={styles.highlightValue}>{product.warrantyInformation}</Text>
            </View>
          </View>
          <View style={styles.vertDivider} />
          <View style={styles.highlightsCol}>
            <View style={styles.highlightItem}>
              <Text style={styles.highlightLabel}>Height</Text>
              <Text style={styles.highlightValue}>{product.dimensions?.height}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.highlightItem}>
              <Text style={styles.highlightLabel}>Shipping</Text>
              <Text style={styles.highlightValue}>{product.shippingInformation}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
        <FlatList
          data={product.reviews}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: getAvatar(item.reviewerEmail) }} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewerName}>{item.reviewerName}</Text>
                  <Text style={styles.reviewerEmail}>{item.reviewerEmail}</Text>
                </View>
                <RatingStars rating={item.rating} />
              </View>
              <Text style={styles.reviewComment}>{item.comment}</Text>
            </View>
          )}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#F5E3DF',
  },
  imageSection: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F5E3DF',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 0,
    minHeight: SCREEN_WIDTH * 0.6
    
  },
  imageShadowWrap: {
    marginBottom: 8,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    backgroundColor: '#F5E3DF',
    marginTop : 50
  },
  image: {
    width: SCREEN_WIDTH - 48,
    height: SCREEN_WIDTH * 0.5,
    borderRadius: 24,
    marginTop:50
  },
  backBtn: {
    position: 'absolute',
    top: 32,
    left: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  shareBtn: {
    position: 'absolute',
    top: 32,
    right: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  card: {
    backgroundColor: '#FFF8F6',
    borderRadius: 28,
    marginHorizontal: 16,
    marginTop: 24, // Add positive margin to separate from image
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  similarBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5E3DF',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 10,
  },
  similarBtnText: {
    color: '#C97B6A',
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3d2320',
    marginBottom: 6,
  },
  desc: {
    color: '#6d4c41',
    fontSize: 15,
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 8,
    color: '#6d4c41',
    fontSize: 15,
  },
  soldBy: {
    color: '#6d4c41',
    fontSize: 15,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3d2320',
    marginRight: 10,
  },
  oldPrice: {
    fontSize: 17,
    color: '#bdbdbd',
    textDecorationLine: 'line-through',
    marginRight: 18,
  },
  addToBagBtn: {
    backgroundColor: '#C97B6A',
    borderRadius: 12,
    paddingHorizontal: 38,
    paddingVertical: 14,
    marginLeft: 'auto',
  },
  addToBagText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#3d2320',
    marginTop: 22,
    marginBottom: 10,
  },
  highlightsGrid: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#F5E3DF',
    overflow: 'hidden',
  },
  highlightsCol: {
    flex: 1,
    justifyContent: 'space-between',
  },
  highlightItem: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    backgroundColor: '#F5E3DF',
    alignItems: 'flex-start',
  },
  highlightLabel: {
    color: '#a97c6c',
    fontSize: 13,
    marginBottom: 2,
  },
  highlightValue: {
    color: '#3d2320',
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#FFF8F6',
    width: '100%',
  },
  vertDivider: {
    width: 1,
    backgroundColor: '#FFF8F6',
    marginVertical: 0,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    backgroundColor: '#F5E3DF',
  },
  reviewerName: {
    fontWeight: 'bold',
    color: '#3d2320',
    fontSize: 15,
  },
  reviewerEmail: {
    color: '#a97c6c',
    fontSize: 12,
    marginBottom: 2,
  },
  reviewComment: {
    color: '#3d2320',
    fontSize: 15,
    marginTop: 2,
  },
});
