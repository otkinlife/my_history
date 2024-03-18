import React, { useState, useEffect } from 'react';
import { Chrono } from 'react-chrono';
import { Form } from 'react-bootstrap';
import Markdown from 'react-markdown';
import Event from './Event';

function Timeline() {
  const [epoch, setEpoch] = useState(null);
  const [epochs, setEpochs] = useState({});
  const [events, setEvents] = useState([]);
  const [figures, setFigures] = useState({});
  const [loading, setLoading] = useState(true); // 添加一个新的状态变量

  // 设置 epochs 并选择第一个时期
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/epoch.json")
      .then(response => response.json())
      .then(data => {
        setEpochs(data);
        setEpoch(Object.keys(data)[0]);
      });
  }, []);

  // 当 epoch 改变时，重新加载事件和人物
  useEffect(() => {
    if (epoch) {
      setLoading(true); // 开始加载数据
      Promise.all([
        fetch(process.env.PUBLIC_URL + "/data/" + epochs[epoch].events_path)
          .then(response => response.json())
          .then(data => setEvents(data)),
        fetch(process.env.PUBLIC_URL + "/data/" + epochs[epoch].figures_path)
          .then(response => response.json())
          .then(data => setFigures(data))
      ]).then(() => setLoading(false)); // 数据加载完毕
    }
  }, [epoch, epochs]);

  const items = events.sort((a, b) => a.year - b.year).map(event => ({
    title: event.year.toString(),
    cardTitle: event.title,
    cardSubtitle: (
      <div style={{ marginLeft: '0.7rem' }}>
        <Markdown>
          {`**相关人物：**`}
        </Markdown>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {event.related_figures.map(figure =>
            <Event key={figure} figureName={figure} figures={figures} />
          )}
        </div>
      </div>
    ),
    url: event.url,
    media: {
      type: "IMAGE",
      source: {
        url: event.img ? `${process.env.PUBLIC_URL}/static/${event.img}` : `${process.env.PUBLIC_URL}/static/default.png`
      }
    },
    cardDetailedText: (
      <Markdown>
        {`**描述：**\n- ${event.desc.join('\n- ')}\n`}
      </Markdown>
    ),
  }));

  return (
    <div>
      <Form.Control as="select" custom value={epoch} onChange={e => setEpoch(e.target.value)}>
        <option value="">选择一个时期</option>
        {Object.keys(epochs).map(epoch => <option key={epoch}>{epoch}</option>)}
      </Form.Control>
      {!loading && epoch && <Chrono items={items} mode="VERTICAL_ALTERNATING" cardHeight={400} slideShow />}
    </div>
  );
}

export default Timeline;
