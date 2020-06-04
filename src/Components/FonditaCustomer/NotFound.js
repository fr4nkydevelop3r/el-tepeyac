import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../colors';
import logo from '../../img/logo2.png';

const InvalidHourContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  p {
    font-size: 19px;
    color: ${colors.grayStrong};
    @media (min-width: 768px) {
      font-size: 24px;
    }
    @media (min-width: 992px) {
      font-size: 30px;
    }
    @media (min-width: 1200px) {
      font-size: 18px;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  .Logo {
    width: 100px;
    height: 100px;
  }
  .ButtonLogo {
    border: none;
    background: none;
  }
  @media (min-width: 1200px) {
    padding: 2rem;
  }
`;

const NotFound = () => {
  let history = useHistory();

  return (
    <>
      <Header>
        <div>
          <button
            className="ButtonLogo"
            type="button"
            onClick={() => history.push('/menu')}>
            <img className="Logo" alt="logo" src={logo} />
          </button>
        </div>
      </Header>
      <InvalidHourContainer>
        <p>
          <span role="img" aria-label="hi">
            🙋‍
          </span>
          Hi there!
        </p>
        <p>
          Page not found!{' '}
          <span role="img" aria-label="neutral">
            😐
          </span>
        </p>
      </InvalidHourContainer>
    </>
  );
};

export default NotFound;
