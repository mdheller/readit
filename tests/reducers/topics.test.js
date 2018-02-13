import {
  UPVOTE_TOPIC,
  DOWNVOTE_TOPIC,
  NEW_TOPIC,
} from '../../src/actions/topics';
import reducer from '../../src/reducers/topics';

const stateWith2Topics = {
  topics: [{
    id: 1,
    title: 'test1',
    score: 1,
  },{
    id: 2,
    title: 'test2',
    score: -1,
  }],
  maxId: 2,
};

const stateWith2TopicsSameScore = {
  topics: [{
    id: 1,
    title: 'test1',
    score: 2,
  },{
    id: 2,
    title: 'test2',
    score: 2,
  }],
  maxId: 2,
};

const stateWithNoTopics = {
  topics: [],
  maxId: 0,
};

describe('topic reducer', () => {
  describe('UPVOTE_TOPIC', () => {
    it('increments the score of the topic with same id', () => {
      expect(reducer(stateWith2Topics, {
        type: UPVOTE_TOPIC,
        payload: 1,
      })).toMatchObject({
        topics: [{
          id: 1,
          title: 'test1',
          score: 2,
        },{
          id: 2,
          title: 'test2',
          score: -1,
        }],
        maxId: 2,
      });

      expect(reducer(stateWith2Topics, {
        type: UPVOTE_TOPIC,
        payload: 2,
      })).toMatchObject({
        topics: [{
          id: 1,
          title: 'test1',
          score: 1,
        },{
          id: 2,
          title: 'test2',
          score: 0,
        }],
        maxId: 2,
      });
    });

    it('does not return the same object', () => {
      expect(reducer(stateWith2Topics, {
        type: UPVOTE_TOPIC,
        payload: 1,
      })).not.toBe(stateWith2Topics);

      expect(reducer(stateWith2TopicsSameScore, {
        type: UPVOTE_TOPIC,
        payload: 2,
      })).not.toBe(stateWith2TopicsSameScore);
    });

    it('leaves state unchanged when id does not exist', () => {
      expect(reducer(stateWith2Topics, {
        type: UPVOTE_TOPIC,
        payload: 3,
      })).toMatchObject(stateWith2Topics);

      expect(reducer(stateWithNoTopics, {
        type: UPVOTE_TOPIC,
        payload: 2,
      })).toMatchObject(stateWithNoTopics);
    });

    it('reorders topics when ties are broken', () => {
      expect(reducer(stateWith2TopicsSameScore, {
        type: UPVOTE_TOPIC,
        payload: 2,
      })).toMatchObject({
        topics: [{
          id: 2,
          title: 'test2',
          score: 3,
        },{
          id: 1,
          title: 'test1',
          score: 2,
        }],
        maxId: 2,
      });
    });
  });

  describe('DOWNVOTE_TOPIC', () => {
    it('decrements the score of the topic with same id', () => {
      expect(reducer(stateWith2Topics, {
        type: DOWNVOTE_TOPIC,
        payload: 1,
      })).toMatchObject({
        topics: [{
          id: 1,
          title: 'test1',
          score: 0,
        },{
          id: 2,
          title: 'test2',
          score: -1,
        }],
        maxId: 2,
      });

      expect(reducer(stateWith2Topics, {
        type: DOWNVOTE_TOPIC,
        payload: 2,
      })).toMatchObject({
        topics: [{
          id: 1,
          title: 'test1',
          score: 1,
        },{
          id: 2,
          title: 'test2',
          score: -2,
        }],
        maxId: 2,
      });
    });

    it('leaves state unchanged when id does not exist', () => {
      expect(reducer(stateWith2Topics, {
        type: DOWNVOTE_TOPIC,
        payload: 3,
      })).toMatchObject(stateWith2Topics);

      expect(reducer(stateWithNoTopics, {
        type: DOWNVOTE_TOPIC,
        payload: 2,
      })).toMatchObject(stateWithNoTopics);
    });

    it('reorders topics when ties are broken', () => {
      expect(reducer(stateWith2TopicsSameScore, {
        type: DOWNVOTE_TOPIC,
        payload: 1,
      })).toMatchObject({
        topics: [{
          id: 2,
          title: 'test2',
          score: 2,
        },{
          id: 1,
          title: 'test1',
          score: 1,
        }],
        maxId: 2,
      });
    });

    it('does not return the same object', () => {
      expect(reducer(stateWith2Topics, {
        type: DOWNVOTE_TOPIC,
        payload: 1,
      })).not.toBe(stateWith2Topics);

      expect(reducer(stateWith2TopicsSameScore, {
        type: DOWNVOTE_TOPIC,
        payload: 2,
      })).not.toBe(stateWith2TopicsSameScore);
    });
  });

  describe('NEW_TOPIC', () => {
    it('adds a new topic with the title corresponding to the title and increments maxId', () => {
      expect(reducer(stateWith2Topics, {
        type: NEW_TOPIC,
        payload: 'test3',
      })).toMatchObject({
        topics: [{
          id: 1,
          title: 'test1',
          score: 1,
        },{
          id: 3,
          title: 'test3',
          score: 0,
        },{
          id: 2,
          title: 'test2',
          score: -1,
        }],
        maxId: 3,
      });

      expect(reducer(stateWithNoTopics, {
        type: NEW_TOPIC,
        payload: 'test',
      })).toMatchObject({
        topics: [{
          id: 1,
          title: 'test',
          score: 0,
        }],
        maxId: 1,
      });
    });

    it('does not return the same object', () => {
      expect(reducer(stateWith2Topics, {
        type: NEW_TOPIC,
        payload: 'test',
      })).not.toBe(stateWith2Topics);

      expect(reducer(stateWith2TopicsSameScore, {
        type: NEW_TOPIC,
        payload: 'test',
      })).not.toBe(stateWith2TopicsSameScore);
    });
  });
});