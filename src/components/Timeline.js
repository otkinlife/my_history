import React from 'react';
import { Chrono } from 'react-chrono';
import Event from './Event';

function Timeline({ events, figures }) {
  // 转换数据格式以适应 react-chrono
  const items = events.sort((a, b) => a.year - b.year).map(event => ({
    title: event.year.toString(),
    cardTitle: event.title,
    cardSubtitle: event.desc,
    cardDetailedText: event.related_figures.join(", ")
  }));

  return <Chrono items={items} mode="VERTICAL_ALTERNATING" />;
}

export default Timeline;