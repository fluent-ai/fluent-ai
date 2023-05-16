import { socketServer } from './socket-server';

describe('socketServer', () => {
  it('should work', () => {
    expect(socketServer()).toEqual('socket-server');
  });
});
