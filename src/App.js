import React from 'react';
import Timeline from './components/Timeline';
import events from './data/events.json'; 
import figures from "./data/figures.json";

function App() {
  return <Timeline events={events} figures={figures} />;
}

export default App;