import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

const keyExtractor = (item: any) => `${item?.id.toString()}-${item?.thumbnail}`;

export default function ProductPage({ navigation }: any) {
  const [products, setProducts] = useState([]);

  const renderItem = useCallback(
    ({ item }: any) => {
      const handlePress = (item: any) => {
        navigation.navigate("ProductDetails", { item });
      };
      return (
        <TouchableOpacity onPress={() => handlePress(item)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              paddingHorizontal: 4,
              paddingVertical: 8,
            }}
          >
            <Image
              style={{ height: 80, width: 80, borderRadius: 50 }}
              source={{ uri: item?.thumbnail }}
            />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text>
                <Text style={{ fontWeight: "bold" }}>Brand:</Text> {item?.brand}
              </Text>
              <Text>
                <Text style={{ fontWeight: "bold" }}>Category:</Text>
                {item?.category}
              </Text>
              <Text>{item?.title} </Text>
              <Text>
                <Text style={{ fontWeight: "bold" }}>Description:</Text>
                {item?.description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [products]
  );
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((products) => {
        setProducts(products?.products);
      });
  }, []);
  return (
    <View style={{ paddingHorizontal: 12, paddingVertical: 12 }}>
      {products === undefined ? (
        <>
          <ActivityIndicator
            size="large"
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          />
          <Text
            style={{
              fontSize: 40,
            }}
          >
            Loading...
          </Text>
        </>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
