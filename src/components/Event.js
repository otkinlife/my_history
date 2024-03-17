import React from 'react';
import { Button, Modal, Image, ListGroup } from 'react-bootstrap';
import Markdown from 'react-markdown';

function Event({ figureName, figures }) {
  const [show, setShow] = React.useState(false);
  const [selectedFigure, setSelectedFigure] = React.useState(null);

  const handleShow = () => {
    const figure = figures[figureName];
    setSelectedFigure(figure);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <Button 
        size="sm" 
        style={{ 
          marginLeft:'0.5rem', 
          fontSize: '0.75rem', 
          backgroundColor: 'white', 
          color: '#007FFF', 
          border: '1px solid #007FFF' 
        }} 
        onClick={handleShow}
      >
        {figureName}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedFigure ? selectedFigure.name : "未知"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ margin: '20px' }}>
          <div style={{ display: 'flex', marginBottom: '15px' }}>
            <Image 
              src={selectedFigure && selectedFigure.avatar ? selectedFigure.avatar : process.env.PUBLIC_URL+"/static/default_avatar.png"} 
              rounded 
              style={{ width: '100px', height: '100px' }}
            />
            <div style={{ marginLeft: '15px' }}>
              <Markdown>{`**\`生年：\`** ${selectedFigure ? selectedFigure.live_date : "未知"}`}</Markdown>
              <Markdown>{`**\`别名：\`** ${selectedFigure && selectedFigure.alias ? selectedFigure.alias.join(', ') : "无"}`}</Markdown>
            </div>
          </div>
          {selectedFigure && selectedFigure.desc ? selectedFigure.desc.map((item, index) => 
            <ListGroup.Item key={index}><Markdown>{item}</Markdown></ListGroup.Item>
          ) : <p>没有配置此人物的信息</p>}
          {selectedFigure && selectedFigure.detail_url && 
            <a href={selectedFigure.detail_url} target="_blank" rel="noreferrer">查看更多信息</a>
          }
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Event;
