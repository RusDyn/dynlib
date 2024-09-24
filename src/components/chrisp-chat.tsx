'use client';

import { Crisp } from 'crisp-sdk-web';
import { Component } from 'react';

class CrispChat extends Component {
  componentDidMount() {
    const id = process.env.NEXT_PUBLIC_CRISP_CHAT_ID;
    if (!id) {
      return;
    }
    Crisp.configure(id);
  }

  render() {
    return null;
  }
}

function CrispButton({ label }: { label?: string }) {
  const onClick = () => {
    Crisp.chat.show();
    Crisp.chat.open();
  };
  return <div onClick={onClick}>{label || 'Support'}</div>;
}
export { CrispButton, CrispChat };
