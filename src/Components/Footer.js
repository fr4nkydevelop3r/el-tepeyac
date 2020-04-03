import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';

const FooterContainer = styled.div`
  background: ${colors.grayLight};
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;

  .made-by {
    color: ${colors.red};
  }
  .fr4nky {
    color: ${colors.red};
    text-decoration: none;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <span className="made-by" role="img" aria-label="love">
        {' '}
        Made with ❤️by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="fr4nky"
          href="https://github.com/fr4nkydevelop3r">
          fr4nky
        </a>
      </span>
    </FooterContainer>
  );
};

export default Footer;
