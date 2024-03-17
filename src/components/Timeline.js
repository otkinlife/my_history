import React from 'react';
import { Chrono } from 'react-chrono';
import Markdown from 'react-markdown';
import Event from './Event';


function Timeline({ events, figures }) {
  // 转换数据格式以适应 react-chrono
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
  return <Chrono items={items} mode="VERTICAL_ALTERNATING" cardHeight={400} slideShow />;
}

export default Timeline;