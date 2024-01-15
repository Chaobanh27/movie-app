import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, FETCH_SEARCH_DATA } from '../Action/ActionTypes'

const initialState = {
  loading: false,
  data: null,
  error: null
}

const Reducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_DATA_REQUEST:
    return {
      ...state,
      loading: true,
      error: null
    }
  case FETCH_DATA_SUCCESS:
    return {
      ...state,
      loading: false,
      data: action.payload
    }
  case FETCH_DATA_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload
    }
  case FETCH_SEARCH_DATA:
    return {
      ...state,
      loading: false,
      data: action.payload
    }
  default:
    return state
  }
}


export default Reducer