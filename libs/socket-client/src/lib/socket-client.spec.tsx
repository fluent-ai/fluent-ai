import { render } from '@testing-library/react';

import SocketClient from './socket-client';

describe('SocketClient', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SocketClient />);
    expect(baseElement).toBeTruthy();
  });
});
