import { View, Text, Dimensions, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel";

export default function ProductDetails({ route, navigation }: any) {
  const { params } = route;

  const [product, setProduct] = useState();

  const width = Dimensions.get("window").width;

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((products) => {
        setProduct(products?.products);
      });
  }, []);

  const renderItem = ({ item }: any) => {
    return (
      <View>
        <Image
          source={{ uri: item }}
          style={{
            height: 320,
            width: "100%",
            objectFit: "cover",
          }}
        />
      </View>
    );
  };

  return (
    <View>
      <View style={{ paddingHorizontal: 8 }}>
        <Carousel
          data={params?.item?.images}
          renderItem={renderItem}
          sliderWidth={320}
          itemWidth={320}
          loop
          autoplay
          autoplayDelay={1000}
          autoplayInterval={2000}
        />
        <Text style={styles.fontSize}>
          <Text style={styles.text}>Brand:</Text>
          {params?.item?.brand}
        </Text>
        <Text style={styles.fontSize}>
          <Text style={styles.text}>Category:</Text>
          {params?.item?.category}
        </Text>
        <Text style={styles.fontSize}>
          <Text style={styles.text}>Name:</Text> {params?.item?.title}
        </Text>
        <Text style={[styles.text, { textDecorationLine: "line-through" }]}>
          Price: {params?.item?.price}
        </Text>
        <Text style={styles.text}>
          discount: {params?.item?.discountPercentage}%
        </Text>
        <Text style={styles.text}>
          final Price:
          {(
            params?.item?.price *
            (1 - params?.item?.discountPercentage / 100)
          ).toFixed(2)}
        </Text>
        <Text style={styles.fontSize}>
          <Text style={styles.text}>Description:</Text>
          {params?.item?.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  fontSize: {
    fontSize: 16,
  },
});
