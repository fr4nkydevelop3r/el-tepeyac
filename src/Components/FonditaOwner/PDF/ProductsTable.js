import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import OrderTableRow from './OrderTableRow';

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#bff0fd',
    width: '50%',
  },
});

const ProductsItemsTable = ({ products }) => (
  <View style={styles.tableContainer}>
    <OrderTableRow products={products} />
  </View>
);

export default ProductsItemsTable;
