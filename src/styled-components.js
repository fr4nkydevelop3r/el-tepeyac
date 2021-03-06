/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { colors } from './colors';

export const Button = styled.button`
  background: ${colors.green};
  width: 150px;
  height: 44px;
  color: ${colors.grayLight};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
  border: none;
  :focus {
    outline: none;
  }

  @media (min-width: 768px) {
    width: 260px;
    height: 80px;
    font-size: 26px;
  }
  @media (min-width: 992px) {
    width: 300px;
    height: 90px;
    font-size: 32px;
  }
  @media (min-width: 1200px) {
    width: 150px;
    height: 50px;
    font-size: 20px;
  }
`;

export const ErrorValidationContainer = styled.div`
  margin-top: 16px;
  color: ${colors.red};

  @media (min-width: 768px) {
    margin-top: 20px;
    font-size: 24px;
  }
  @media (min-width: 992px) {
    margin-top: 24px;
    font-size: 32px;
  }
  @media (min-width: 1200px) {
    font-size: 20px;
  }
`;

export const ErrorInput = styled.div`
  display: flex;
  justify-content: center;
  span {
    color: ${colors.red};
    text-align: center;
  }
  @media (min-width: 768px) {
    font-size: 24px;
  }
  @media (min-width: 992px) {
    font-size: 32px;
  }
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;

export const ShoppingCart = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px;
  height: 40px;
  background-color: ${colors.grayLight};
  position: sticky;
  top: 0;
  color: ${colors.green};
  cursor: pointer;

  @media (min-width: 768px) {
    padding: 24px;
  }

  @media (min-width: 1200px) {
    padding: 8px;
    margin-bottom: 32px;
  }

  i {
    font-size: 20px;
    @media (min-width: 768px) {
      font-size: 28px;
      margin-top: 12px;
      margin-right: 4px;
    }
    @media (min-width: 992px) {
      font-size: 30px;
    }
    @media (min-width: 1200px) {
      font-size: 20px;
    }
  }
  span {
    margin-top: -12px;
    margin-left: 4px;
    font-size: 1.1rem;
    @media (min-width: 768px) {
      font-size: 1.3rem;
      margin-left: 0;
      font-weight: bolder;
    }
    @media (min-width: 992px) {
      margin-left: 4px;
      font-size: 1.4rem;
    }
    @media (min-width: 1200px) {
      font-size: 18px;
      margin-left: 0;
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  margin-top: 16px;
  label {
    width: 30%;
    text-align: center;
  }

  .InputAndError {
    width: 70%;
    padding-right: 30px;
    @media (min-width: 768px) {
      padding-right: 0;
    }

    input {
      width: 100%;
      height: 30px;
      box-shadow: 0 0 0 1px #35dc74b8, 0 1px 5px 0 rgba(163, 41, 41, 0.08);
      border: 1px solid rgba(67, 41, 163, 0.2);
      border-radius: 5px;
      margin-right: 16px;
      color: ${colors.grayStrong};
      ::placeholder {
        color: ${colors.grayStrong};
        text-align: center;
      }
      :focus {
        outline: none;
      }
    }

    .Phone {
      ::placeholder {
        color: ${colors.grayMedium};
        text-align: center;
      }
    }
  }
`;

export const Menu = styled.ul`
  margin-top: 32px;
  list-style: none;
  padding-left: 0;
  display: flex;
  justify-content: space-around;
`;

export const Select = styled.select`
  font-size: 12px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 60px;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0 0 0 8px;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
`;

export const MessageEmptyDishes = styled.div`
  margin-top: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  h5 {
    color: ${colors.red};
  }
`;

export const TitleProductsCategory = styled.div`
  margin-top: 1rem;
  color: ${colors.green};
  text-align: center;
  .CategoryDescription {
    padding: 0 1rem;
    @media (min-width: 768px) {
      width: 60%;
      margin: 0 auto;
      font-size: 20px;
    }
    @media (min-width: 992px) {
      font-size: 22px;
    }
    @media (min-width: 1200px) {
      font-size: 24px;
      width: 40%;
    }
  }
  .CategoryTitle {
    @media (min-width: 768px) {
      width: 60%;
      margin: 0 auto;
      font-size: 28px;
    }
    @media (min-width: 992px) {
      font-size: 38px;
    }
    @media (min-width: 1200px) {
      font-size: 28px;
    }
  }
`;

export const BehindButtonContainer = styled.div`
  padding: 0 0 0 1.5rem;
  font-size: 1.2rem;
  .Behind {
    padding: 0.5rem;
    color: ${colors.green};
    background: none;
    border: none;
  }
  @media (min-width: 768px) {
    font-size: 32px;
    padding: 0 0 0 5rem;
  }
  @media (min-width: 992px) {
    font-size: 38px;
  }
  @media (min-width: 1200px) {
    font-size: 24px;
    padding: 0 0 0 3rem;
  }
`;

export const ViewOrder = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 300;
  .ViewOrderButton {
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
      height: 70px;
      font-size: 32px;
    }
    @media (min-width: 1200px) {
      height: 40px;
      font-size: 16px;
    }
  }
`;

export const FormUser = styled.div`
  margin-top: 32px;
  @media (min-width: 768px) {
    margin-top: 86px;
  }
  @media (min-width: 992px) {
    margin-top: 5rem;
  }
  @media (min-width: 1200px) {
    margin-top: 4px;
    box-shadow: 0 0 0 1px #35dc74b8, 0 1px 5px 0 rgba(163, 41, 41, 0.08);
    border: 1px solid rgba(67, 41, 163, 0.2);
    border-radius: 5px;
    width: 800px;
    margin: 0 auto;
    padding: 32px;
    margin-bottom: 4rem;
  }
  .Form {
    @media (min-width: 768px) {
      width: 70%;
      margin: 0 auto;
    }
    @media (min-width: 1200px) {
      width: 700px;
    }
  }
  .InputCheckout {
    label {
      @media (min-width: 768px) {
        text-align: left;
        font-size: 20px;
      }
      @media (min-width: 992px) {
        font-size: 24px;
      }
      @media (min-width: 1200px) {
        font-size: 18px;
      }
    }
    input {
      @media (min-width: 768px) {
        font-size: 20px;
        height: 40px;
      }
      @media (min-width: 992px) {
        font-size: 24px;
        height: 50px;
      }
      @media (min-width: 1200px) {
        font-size: 18px;
        height: 30px;
      }
    }
  }
`;
