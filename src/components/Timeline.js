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
  const [loading, setLoading] = useState(true);
  const [showMedia, setShowMedia] = useState(false);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/epoch.json")
      .then(response => response.json())
      .then(data => {
        setEpochs(data);
        setEpoch(Object.keys(data)[0]);
      });
  }, []);

  useEffect(() => {
    if (epoch) {
      setLoading(true);
      Promise.all([
        fetch(process.env.PUBLIC_URL + "/data/" + epochs[epoch].events_path)
          .then(response => response.json())
          .then(data => setEvents(data)),
        fetch(process.env.PUBLIC_URL + "/data/" + epochs[epoch].figures_path)
          .then(response => response.json())
          .then(data => setFigures(data))
      ]).then(() => setLoading(false));
    }
  }, [epoch, epochs, showMedia]); // 添加showMedia到依赖数组

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
    media: showMedia ? {
      type: "IMAGE",
      source: {
        url: event.img ? `${process.env.PUBLIC_URL}/static/${event.img}` : `${process.env.PUBLIC_URL}/static/default.png`
      }
    } : undefined,
    cardDetailedText: (
      <Markdown>
        {`**描述：**\n- ${event.desc.join('\n- ')}\n`}
      </Markdown>
    ),
  }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Form.Control as="select" custom value={epoch} onChange={e => setEpoch(e.target.value)}>
          <option value="">选择一个时期</option>
          {Object.keys(epochs).map(epoch => <option key={epoch}>{epoch}</option>)}
        </Form.Control>
        <Form.Check
          style={{ minWidth: '8rem',marginLeft: '1rem'}}
          type="switch"
          id="custom-switch"
          label="显示封面"
          checked={showMedia}
          onChange={() => setShowMedia(!showMedia)}
        />
      </div>
      {!loading && epoch && <Chrono items={items} mode="VERTICAL_ALTERNATING" cardHeight={showMedia ? 400 : 300} slideShow />}
    </div>
  );
}

export default Timeline;
