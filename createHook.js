import * as React from 'react';
import { Platform } from 'react-native';

import { findDOMNode } from 'react-dom';

function getNativeNode(ref) {
  try {
    let node = ref && (ref.current || ref);

    if (node && node.getNode && node.getNode()) node = node.getNode();

    if (node && node._touchableNode) node = node._touchableNode;

    if (node && node._node) node = node._node;

    return node;
  } catch (error) {
    console.error('Failed to find node', error, { ref });
    return null;
  }
}

function getNode(ref) {
  try {
    let node = getNativeNode(ref);
    if (node) node = findDOMNode(node);
    return node;
  } catch (error) {
    console.error(`Couldn't find node`, error, { ref });
    return null;
  }
}

export default function createPseudoHook({ events }: { events: string[] }) {
  return function(ref) {
    if (
      // Pseudo classes only work in the browser
      Platform.OS !== 'web'
    ) {
      return false;
    }
  
    const [isActive, setActive] = React.useState(false);

    React.useEffect(() => {
      const [eventIn, eventOut] = events;

      const node = getNode(ref);
      if (!node) {
        return;
      }
      console.log('node', node);
      const resolve = value => {
        setActive(value);
      };

      // @ts-ignore
      const onStart = resolve.bind(this, true);
      // @ts-ignore
      const onEnd = resolve.bind(this, false);

      // node.addEventListener(eventIn, onStart);
      // node.addEventListener(eventOut, onEnd);

      // Special case for useActive to respond when the user drags out of the view and releases.
      if (eventOut === 'mouseup') {
        global.document.addEventListener(eventOut, onEnd, false);
      }
      return () => {
        global.document.removeEventListener(eventOut, onEnd, false);
        node.removeEventListener(eventIn, onStart);
        node.removeEventListener(eventOut, onEnd);
      };
    }, [ref && ref.current]);

    return isActive
  };
}
