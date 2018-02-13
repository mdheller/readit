import reducer from '../../src/reducers';

describe('reducer', () => {
  it('matches the snapshot', () => {
    expect(reducer).toMatchSnapshot();
  });
});
