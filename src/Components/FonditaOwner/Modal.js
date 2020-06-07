import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { PDFViewer } from '@react-pdf/renderer';
import PDFOrder from './PDF/PDFOrder';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'none',
    border: 'none',
  },
};

const ButtonModal = styled.button`
  background: #28a745;
  color: #fff;
  border: none;
  padding: 0.5rem;
  border-radius: 5px;
`;

Modal.setAppElement('#root');

const ModalPDF = ({ order, products }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleClose() {
    setUpdateData(!updateData);
  }

  function handleOpen() {
    setUpdateData(!updateData);
  }

  return (
    <div>
      <ButtonModal onClick={openModal}>Print Order</ButtonModal>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          onAfterClose={handleClose}
          onHandleClose={handleOpen}>
          <PDFViewer width="600" height="600">
            <PDFOrder order={order} products={products} />
          </PDFViewer>
        </Modal>
      )}
    </div>
  );
};

export default ModalPDF;
