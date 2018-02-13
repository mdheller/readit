import {
  UPVOTE_TOPIC,
  DOWNVOTE_TOPIC,
  NEW_TOPIC,
} from '../actions/topics';
import defaultTopics from '../../stubs/topics';

// The stub topics are preloaded and presorted in descending score order
defaultTopics.sort((a, b) => b.score - a.score);

/**
 * Consists of a list of topics sorted in descending score order and the
 * maximum id of all the topics in the topic list
 */
const initialState = {
  topics: defaultTopics,
  maxId: Math.max(...defaultTopics.map(topic => topic.id)),
};

/**
 * The redux reducer for topics
 * @param {*} state   The state passed from the redux store
 * @param {*} action  The action that triggered the reducer, should follow the
 *                    flux standard action format as specified here:
 *                    https://github.com/acdlite/flux-standard-action
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPVOTE_TOPIC:
      return handleUpvote(state, action.payload);
    case DOWNVOTE_TOPIC:
      return handleDownvote(state, action.payload);
    case NEW_TOPIC:
      return handleNewTopic(state, action.payload);
    default:
      return initialState;
  }
};

/**
 * Handles the UPVOTE_TOPIC action type. Increments the score of the topic of
 * the specified id then moves the topic to its correct position in the topic
 * array (if required).
 * 
 * @param {*} state The current state from the redux store
 * @param {*} id    The id of the topic to be upvoted
 * 
 * @returns state   (A new object) The state after upvoting the topic
 */
const handleUpvote = (state, id) => {
  const topicIdx = state.topics.map(topic => topic.id).indexOf(id);
  if (topicIdx < 0) {
    return state;
  }
  const updatedTopics = [...state.topics];
  updatedTopics[topicIdx] = Object.assign({}, updatedTopics[topicIdx], {
    score: updatedTopics[topicIdx].score + 1,
  });
  let currIdx = topicIdx;
  while (currIdx > 0 && updatedTopics[currIdx - 1].score < updatedTopics[currIdx].score) {
    const temp = updatedTopics[currIdx - 1];
    updatedTopics[currIdx - 1] = updatedTopics[currIdx];
    updatedTopics[currIdx] = temp;
    currIdx -= 1;
  }
  return Object.assign({}, state, { topics: updatedTopics });
};

/**
 * Handles the DOWNVOTE_TOPIC action type. Decrements the score of the topic of
 * the specified id then moves the topic to its correct position in the topic
 * array (if required).
 * 
 * @param {*} state The current state from the redux store
 * @param {*} id    The id of the topic to be downvoted
 * 
 * @returns state   (A new object) The state after downvoting the topic
 */
const handleDownvote = (state, id) => {
  const topicIdx = state.topics.map(topic => topic.id).indexOf(id);
  if (topicIdx < 0) {
    return state;
  }
  const updatedTopics = [...state.topics];
  updatedTopics[topicIdx] = Object.assign({}, updatedTopics[topicIdx], {
    score: updatedTopics[topicIdx].score - 1,
  });
  const lastIdx = updatedTopics.length - 1;
  let currIdx = topicIdx;
  while (currIdx < lastIdx && updatedTopics[currIdx + 1].score > updatedTopics[currIdx].score) {
    const temp = updatedTopics[currIdx + 1];
    updatedTopics[currIdx + 1] = updatedTopics[currIdx];
    updatedTopics[currIdx] = temp;
    currIdx += 1;
  }
  return Object.assign({}, state, { topics: updatedTopics });
};


/**
 * Handles the NEW_TOPIC action type. Creates a new topic object and appends it
 * to the list of topics, then places it into it's appropriate position in the
 * topic list (in descending score order). Also changes the maxId to the latest
 * maximum id number.
 * 
 * @param {*} state The previous state from the redux store
 * @param {*} id    The id of the topic to be upvoted
 * 
 * @returns state   (A new object) The state after adding the topic
 */
const handleNewTopic = (state, title) => {
  const newId = state.maxId + 1;
  const updatedTopics = [
    {
      id: newId,
      title: title,
      score: 0,
    },
    ...state.topics,
  ];
  const lastIdx = updatedTopics.length - 1;
  let currIdx = 0;
  while (currIdx < lastIdx && updatedTopics[currIdx + 1].score > updatedTopics[currIdx].score) {
    const temp = updatedTopics[currIdx + 1];
    updatedTopics[currIdx + 1] = updatedTopics[currIdx];
    updatedTopics[currIdx] = temp;
    currIdx += 1;
  }
  return Object.assign({}, state, { maxId: newId, topics: updatedTopics });
};

export default reducer;
