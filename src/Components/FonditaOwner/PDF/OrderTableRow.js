import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    fontStyle: 'bold',
    fontSize: 10,
  },
  totalOrdered: {
    width: '10%',
    textAlign: 'left',
  },
  productName: {
    width: '50%',
    textAlign: 'center',
    paddingRight: 8,
  },
  productCategory: {
    width: '30%',
    textAlign: 'center',
    paddingRight: 8,
  },
});

const OrderTableRow = ({ products }) => {
  const rows = products.map((product) => (
    <View style={styles.row} key={product.productID}>
      <Text style={styles.totalOrdered}>{product.totalOrdered}</Text>
      <Text style={styles.productName}>{product.productName}</Text>
      <Text style={styles.productCategory}>{product.productCategory}</Text>
    </View>
  ));

  return <>{rows}</>;
};

export default OrderTableRow;
