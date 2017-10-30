import { combineReducers } from 'redux-immutable';
import reduce from './reduce';


const rootReducer = combineReducers({
    reduce: reduce
});

export default rootReducer;
