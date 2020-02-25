export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const INCREMENT_PRODUCT = 'INCREMENT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const RESTART_PRODUCTS = 'RESTART_PRODUCTS';

export function receiveProducts(products) {
  return {
    type: RECEIVE_PRODUCTS,
    products,
  };
}
export function incrementProduct(idProduct) {
  return {
    type: INCREMENT_PRODUCT,
    idProduct,
  };
}

export function deleteProduct(idProduct) {
  return {
    type: DELETE_PRODUCT,
    idProduct,
  };
}

export function restartProducts() {
  return {
    type: RESTART_PRODUCTS,
  };
}
