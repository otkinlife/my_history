import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function Event({ event, figures }) {
  const [show, setShow] = React.useState(false);
  const [selectedFigure, setSelectedFigure] = React.useState(null);

  const handleShow = (figure) => {
    setSelectedFigure(figure);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      {event.related_figures.map((figureName, index) => (
        <Button key={index} onClick={() => handleShow(figures[figureName])}>{figureName}</Button>
      ))}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedFigure?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedFigure?.desc}</Modal.Body>
      </Modal>
    </>
  );
}

export default Event;
