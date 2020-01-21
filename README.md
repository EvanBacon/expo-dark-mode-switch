# expo-dark-mode-switch

## Install

```sh
yarn add expo-dark-mode-switch

# or

npm install --save expo-dark-mode-switch
```

### Example

```tsx
import * as React from 'react';
import Switch from 'expo-dark-mode-switch';

export default function App() {
  const [value, setValue] = React.useState(true);
  return <Switch value={value} onChange={value => setValue(value)} />;
}
```

Based on a component from the home screen of [twizzle](https://twizzle.app/) by @kitze.
