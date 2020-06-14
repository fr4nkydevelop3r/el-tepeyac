import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import OrderTableRow from './OrderTableRow';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    width: '30%',
  },
});

const ProductsItemsTable = ({ products }) => (
  <View style={styles.tableContainer}>
    <OrderTableRow products={products} />
  </View>
);

export default ProductsItemsTable;
