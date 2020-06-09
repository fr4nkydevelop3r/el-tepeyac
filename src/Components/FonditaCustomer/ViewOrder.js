/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faTrashAlt,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { restartProduct } from '../../actions/products';
import setInstructions from '../../actions/specialInstructions';
import useTotalOrder from './useTotalOrder';
import { colors } from '../../colors';
import { BehindButtonContainer } from '../../styled-components';
import { getTotalProductsNoTaxes } from '../../utilities';
import Header from './Header';
import Tip from './Tip';

const ViewOrderContainer = styled.div`
  margin-bottom: 4rem;
  @media (min-width: 768px) {
    margin-bottom: 6rem;
  }
  @media (min-width: 992px) {
    margin-bottom: 8rem;
  }
`;

const TitleViewOrderContainer = styled.div`
  margin: 1rem 0 3rem 0;
  @media (min-width: 768px) {
    margin: 1rem 0 5rem 0;
  }
  @media (min-width: 992px) {
    margin: 1rem 0 7rem 0;
  }
  @media (min-width: 1200px) {
  }
  h3 {
    text-align: center;
    color: ${colors.green};
  }
  .Icon {
    font-size: 20px;
  }
`;

const ProductDetail = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-top: 1rem;

  @media (min-width: 768px) {
    font-size: 20px;
    width: 60%;
  }
  @media (min-width: 992px) {
    width: 50%;
    font-size: 26px;
  }
  @media (min-width: 1200px) {
    width: 600px;
    font-size: 18px;
  }

  .ProductName {
    width: 50%;
    text-align: center;
  }
  .ProductTotalOrdered {
    text-align: center;
  }
  .ProductAmmount {
    text-align: center;
  }
  .DeleteIcon {
    color: ${colors.red};
    text-align: center;
    .DeleteButton {
      padding: 0.2rem;
      cursor: pointer;
      background: none;
      border: none;
      color: ${colors.green};
    }
  }
`;

const TotalOrder = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 auto;
  margin-top: 1rem;
  color: ${colors.green};
  @media (min-width: 768px) {
    width: 60%;
    font-size: 20px;
  }
  @media (min-width: 992px) {
    width: 50%;
    font-size: 26px;
  }
  @media (min-width: 1200px) {
    width: 600px;
    font-size: 18px;
  }
  .TotalOrder {
    font-size: 16px;
    font-weight: bold;
    @media (min-width: 768px) {
      font-size: 20px;
    }
    @media (min-width: 992px) {
      font-size: 26px;
    }
    @media (min-width: 1200px) {
      font-size: 20px;
    }
  }
`;

const OrderEmpty = styled.div`
  margin-top: 124px;
  font-size: 20px;
  color: ${colors.red};
  display: flex;
  justify-content: center;
  @media (min-width: 768px) {
    font-size: 32px;
  }
  @media (min-width: 992px) {
    font-size: 36px;
  }
  @media (min-width: 1200px) {
    font-size: 22px;
  }
`;

const PlaceOrder = styled.div`
  width: 100%;
  margin-top: 32px;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  button {
    width: 100%;
    height: 40px;
    background-color: ${colors.red};
    color: ${colors.grayLight};
    border: none;
    @media (min-width: 768px) {
      font-size: 24px;
      height: 60px;
    }
    @media (min-width: 992px) {
      font-size: 28px;
      height: 70px;
    }
    @media (min-width: 1200px) {
      height: 40px;
      font-size: 18px;
    }
  }
`;

const InstructionsContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (min-width: 768px) {
    width: 60%;
    justify-content: flex-end;
  }

  @media (min-width: 992px) {
    width: 50%;
  }

  @media (min-width: 1200px) {
    width: 600px;
  }
  .Instructions {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    @media (min-width: 768px) {
      justify-content: space-between;
    }

    @media (min-width: 1200px) {
      display: flex;
      justify-content: flex-end;
    }
  }
  .InstructionsLabel {
    width: 30%;
    color: ${colors.grayStrong};
    text-align: center;
    @media (min-width: 768px) {
      font-size: 20px;
    }
    @media (min-width: 992px) {
      font-size: 24px;
    }
    @media (min-width: 1200px) {
      font-size: 16px;
    }
  }
  .InstructionsText {
    width: 170px;
    height: 100px;
    box-shadow: 0 0 0 1px #35dc74b8, 0 1px 5px 0 rgba(163, 41, 41, 0.08);
    border: 1px solid rgba(67, 41, 163, 0.2);
    border-radius: 5px;
    color: ${colors.grayStrong};
    text-align: center;
    ::placeholder {
      font-size: 16px;
      padding-top: 1.1rem;
    }
  }
`;

const ViewOrder = () => {
  const dispatch = useDispatch();

  let products = useSelector((state) => state.products);
  let tip = useSelector((state) => state.deliveryTip);
  let instructions = useSelector((state) => state.specialInstructions);

  const [totalOrder] = useTotalOrder();

  let productsOrdered = [];
  let history = useHistory();

  if (!isEmpty(products)) {
    products = Object.values(products);
    productsOrdered = Object.values(products).filter(
      (dish) => dish.totalOrdered >= 1,
    );
  }

  // console.log(productsOrdered);
  // console.log(totalOrder);

  const getTaxes = (total) => ((total * 8.875) / 100).toFixed(2);

  const handleInstructions = (e) => {
    const instructions = e.target.value;
    dispatch(setInstructions(instructions));
  };

  return (
    <>
      <Header />
      <BehindButtonContainer>
        <button
          type="button"
          className="Behind"
          onClick={() => history.push('/menu')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </BehindButtonContainer>

      <ViewOrderContainer>
        {productsOrdered && productsOrdered.length > 0 ? (
          <>
            <TitleViewOrderContainer>
              <h3>
                Order details{' '}
                <span role="img" aria-label="hungry" className="Icon">
                  😋
                </span>{' '}
              </h3>
            </TitleViewOrderContainer>
            {productsOrdered
              .sort(
                (a, b) =>
                  // eslint-disable-next-line implicit-arrow-linebreak
                  a.productCategory.localeCompare(b.productCategory),
                // eslint-disable-next-line function-paren-newline
              )
              .map((productOrdered) => (
                <ProductDetail key={productOrdered.productName}>
                  <div className="ProductName">
                    {productOrdered.productName}
                  </div>
                  <div className="ProductTotalOrdered">
                    {productOrdered.totalOrdered}
                  </div>
                  <div className="ProductAmmount">
                    <span>
                      $
                      {(
                        productOrdered.totalOrdered *
                        productOrdered.productPrice
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="DeleteIcon">
                    {' '}
                    <button
                      type="button"
                      className="DeleteButton"
                      onClick={
                        () =>
                          // eslint-disable-next-line implicit-arrow-linebreak
                          dispatch(restartProduct(productOrdered.productID))
                        // eslint-disable-next-line react/jsx-curly-newline
                      }>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </ProductDetail>
              ))}
            <Tip />
            <TotalOrder>
              <span>Order {getTotalProductsNoTaxes(products).toFixed(2)}</span>
              <span>
                Taxes ${getTaxes(getTotalProductsNoTaxes(products).toFixed(2))}
              </span>
              {tip > 0 && <span>Delivery Tip ${tip}</span>}
              <span className="TotalOrder">
                {tip >= 0 ? (
                  <span>
                    Total Order ${(totalOrder + parseInt(tip)).toFixed(2)}
                  </span>
                ) : (
                  <span>Total Order ${totalOrder}</span>
                )}
              </span>
            </TotalOrder>
            <InstructionsContainer>
              <div className="Instructions">
                <label htmlFor="instructions" className="InstructionsLabel">
                  Special Instructions
                </label>
                <div className="InputAndError">
                  <textarea
                    name="instructions"
                    value={instructions}
                    onChange={handleInstructions}
                    className="InstructionsText"
                    placeholder="Your order or delivery instructions here"
                  />
                </div>
              </div>
            </InstructionsContainer>
            <PlaceOrder>
              <button
                type="button"
                onClick={() =>
                  history.push('/checkout', { service: 'delivery' })
                }>
                Place Order
              </button>
            </PlaceOrder>
          </>
        ) : (
          <OrderEmpty>
            <span>
              Your shoping cart is empty{' '}
              <FontAwesomeIcon icon={faShoppingCart} />
            </span>
          </OrderEmpty>
        )}
      </ViewOrderContainer>
    </>
  );
};

export default ViewOrder;
