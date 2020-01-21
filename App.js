import React from 'react';
import Switch from './build';

export default function App() {
  const [value, setValue] = React.useState(true);
  return <Switch value={value} onChange={value => setValue(value)} />;
}
