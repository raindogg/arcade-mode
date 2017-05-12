//
// 'use strict';
//
// import {
//   CHALLENGE_START,
//   CHALLENGE_NEXT,
//   CHALLENGE_SOLVE,
//   CODE_CHANGED
// } from '../actions/challenge';
//
// import Challenges from '../../../json/challenges.json';
// import Challenge from '../model/Challenge';
//
// // import Immutable from 'immutable';
//
// const initialState = {
//   title: '',
//   description: [],
//   code: `
//     The code to work with will show up here.
//     When you are ready, enter a time at the top and press start to begin!
//   `,
//   challengeNumber: 0,
//   currChallenge: new Challenge(Challenges.challenges[0]),
//   currChallengeStartedAt: 0,
//   nextChallenge: ''
// };
//
// export default function challenge(state = initialState, action) {
//   const nextState = Object.assign({}, state);
//
//   switch (action.type) {
//     case CHALLENGE_START: // lift to session start
//       nextState.title = state.currChallenge.getTitle();
//       nextState.description = state.currChallenge.getDescription();
//       nextState.code = state.currChallenge.getSeed().join('\n');
//       nextState.challengeNumber++;
//       nextState.nextChallenge = new Challenge(Challenges.challenges[state.challengeNumber + 1]);
//       nextState.currChallengeStartedAt = action.startTime;
//       nextState.timerMaxValueLoaded = state.timerMaxValue;
//       break;
//     case CHALLENGE_NEXT:
//       nextState.currChallenge = state.nextChallenge;
//       nextState.currChallengeStartedAt = action.startTime;
//       nextState.title = state.nextChallenge.getTitle();
//       nextState.description = state.nextChallenge.getDescription();
//       nextState.code = state.nextChallenge.getSeed().join('\n');
//       nextState.challengeNumber++;
//       nextState.userOutput = '';
//       nextState.nextChallenge = new Challenge(Challenges.challenges[state.challengeNumber + 1]);
//       break;
//     case CHALLENGE_SOLVE:
//       const solution = state.currChallenge.getSolution();
//       if (solution !== null) {
//         nextState.code = solution;
//       }
//       else nextState.code = `// No solutions found\n${state.code}`;
//       break;
//     case CODE_CHANGED:
//       nextState.code = action.code;
//       break;
//     default:
//       return state;
//   }
//
//   return nextState;
// }

/* Unit tests for file client/scripts/arcademode/reducers/challenge.js. */
import { assert } from 'chai';
import challenge from '../../../../../client/scripts/arcademode/reducers/challenge';
import { startChallenge, nextChallenge } from '../../../../../client/scripts/arcademode/actions/challenge';

const dummyAction = { type: 'DUMMY' };

describe('challenge', () => {
  it('should have clean initial state', () => {
    const state = challenge(undefined, dummyAction);
    assert.isOk(state, 'Initial state OK');
    assert(state.challengeNumber === 0, 'Challenge number 0 OK');
  });

  it('should set correct challenge start time', () => {
    const action = startChallenge(1000);
    const initialState = challenge(undefined, dummyAction);
    const nextState = challenge(initialState, action);
    assert(nextState.currChallengeStartedAt === 1000, 'Challenge started at 1000');
  });

  it('should move to next challenge with an action', () => {
    const initialState = challenge(undefined, dummyAction);
    const nextState = challenge(initialState, nextChallenge(1200));
    assert(nextState.currChallenge === initialState.currChallenge, 'Next challenge chosen correctly.');

  });
});
