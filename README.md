<h1 align="center">Welcome to the Expo Dark Mode Switch 👋</h1>

<p align="center">
  <img align="center" alt="Product: demo" src="https://media.giphy.com/media/QZK2FgLG2odtMOSwkm/giphy.gif" />
</p>

<p align="center">
  <a aria-label="made with expo" href="https://github.com/expo" target="_blank">
    <img src="https://img.shields.io/badge/MADE%20WITH%20EXPO-000.svg?style=for-the-badge&logo=expo&labelColor=4630eb&logoWidth=20">
  </a>
  <a href="https://github.com/evanbacon" aria-label="Follow EvanBacon on Github" target="_blank">
    <img alt="Github: evanbacon" src="https://img.shields.io/github/followers/evanbacon.svg?label=Follow&style=for-the-badge&logo=github&logoColor=FFFFFF&labelColor=24292e&logoWidth=20&color=lightgray" target="_blank" />
  </a>
  <a href="/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" target="_blank" />
  </a>
</p>

Based on a component from the home screen of [twizzle](https://twizzle.app/) by [@thekitze](https://twitter.com/thekitze). Converted to Expo for use in iOS, Android, and Web apps.

<p>
  <a href="https://twitter.com/baconbrix" target="_blank">
    <img alt="Twitter: baconbrix" src="https://img.shields.io/twitter/follow/baconbrix.svg?style=for-the-badge&logo=TWITTER&logoColor=FFFFFF&labelColor=00aced&logoWidth=20&color=lightgray" target="_blank" />
  </a>
  <a href="https://twitter.com/thekitze" target="_blank">
    <img align="right" alt="Twitter: kitze" src="https://img.shields.io/twitter/follow/thekitze.svg?style=for-the-badge&logo=TWITTER&logoColor=FFFFFF&labelColor=00aced&logoWidth=20&color=lightgray" target="_blank" />
  </a>  
</p>

## Install

```sh
yarn add expo-dark-mode-switch && expo install react-native-svg

# or

npm install --save expo-dark-mode-switch && expo install react-native-svg
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

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/evanbacon/expo-dark-mode-switch/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 Evan Bacon.<br />
This project is [MIT](/LICENSE) licensed.
