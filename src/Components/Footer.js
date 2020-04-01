import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  margin-top: 32px;
  z-index: 100;
  background-color: ${colors.grayLight};
  color: ${colors.red};
  width: 100%;
  height: 40px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    font-size: 28px;
    margin-bottom: 8px;
  }

  @media (min-width: 1200px) {
    font-size: 18px;
  }

  .LinkFooter {
    color: ${colors.red};
    text-decoration: none;
    padding-left: 3px;
    @media (min-width: 768px) {
      padding-left: 6px;
    }

    @media (min-width: 1200px) {
      padding-left: 4px;
    }
  }
  .Heart {
    padding-left: 3px;
    @media (min-width: 768px) {
      padding-left: 8px;
      padding-right: 8px;
    }
    @media (min-width: 1200px) {
      padding-left: 4px;
      padding-right: 0;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        Made with
        <span role="img" aria-label="heart" className="Heart">
          ❤️
        </span>
        by
        <a
          href="https://github.com/fr4nkydevelop3r"
          target="_blank"
          rel="noopener noreferrer"
          className="LinkFooter">
          fr4nky
        </a>
      </div>
    </FooterContainer>
  );
};

export default Footer;
