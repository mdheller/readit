// Action types

export const UPVOTE_TOPIC = 'UPVOTE_TOPIC';
export const DOWNVOTE_TOPIC = 'DOWNVOTE_TOPIC';
export const NEW_TOPIC = 'NEW_TOPIC';

// Action creators

export const upvoteTopic = id => {
  return {
    type: UPVOTE_TOPIC,
    payload: id,
  };
};

export const downvoteTopic = id => {
  return {
    type: DOWNVOTE_TOPIC,
    payload: id,
  };
};

export const createNewTopic = title => {
  return {
    type: NEW_TOPIC,
    payload: title,
  };
};
