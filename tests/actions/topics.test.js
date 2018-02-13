import {
  UPVOTE_TOPIC,
  DOWNVOTE_TOPIC,
  NEW_TOPIC,
  upvoteTopic,
  downvoteTopic,
  createNewTopic,
} from '../../src/actions/topics';

describe('Constants', () => {
  it('matches snapshot values', () => {
    expect(UPVOTE_TOPIC).toMatchSnapshot();
    expect(DOWNVOTE_TOPIC).toMatchSnapshot();
    expect(NEW_TOPIC).toMatchSnapshot();
  });
});

describe('upvoteTopic', () => {
  it('returns the action in flux standard action format', () => {
    expect(upvoteTopic(1)).toMatchObject({
      type: UPVOTE_TOPIC,
      payload: 1,
    });
  });
  
  it('works with any type of id', () => {
    expect(upvoteTopic('1')).toMatchObject({
      type: UPVOTE_TOPIC,
      payload: '1',
    });

    expect(upvoteTopic(-1)).toMatchObject({
      type: UPVOTE_TOPIC,
      payload: -1,
    });

    expect(upvoteTopic()).toMatchObject({
      type: UPVOTE_TOPIC,
      payload: undefined,
    });
  });
});

describe('downvoteTopic', () => {
  it('returns the action in flux standard action format', () => {
    expect(downvoteTopic(1)).toMatchObject({
      type: DOWNVOTE_TOPIC,
      payload: 1,
    });
  });
  
  it('works with any type of id', () => {
    expect(downvoteTopic('1')).toMatchObject({
      type: DOWNVOTE_TOPIC,
      payload: '1',
    });

    expect(downvoteTopic(-1)).toMatchObject({
      type: DOWNVOTE_TOPIC,
      payload: -1,
    });

    expect(downvoteTopic()).toMatchObject({
      type: DOWNVOTE_TOPIC,
      payload: undefined,
    });
  });
});

describe('createNewTopic', () => {
  it('returns the action in flux standard action format', () => {
    expect(createNewTopic('test title')).toMatchObject({
      type: NEW_TOPIC,
      payload: 'test title',
    });
  });
  
  it('works with any type of title', () => {
    expect(createNewTopic('1')).toMatchObject({
      type: NEW_TOPIC,
      payload: '1',
    });

    expect(createNewTopic(-1)).toMatchObject({
      type: NEW_TOPIC,
      payload: -1,
    });

    expect(createNewTopic()).toMatchObject({
      type: NEW_TOPIC,
      payload: undefined,
    });
  });
});