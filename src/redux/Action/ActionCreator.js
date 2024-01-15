import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from './ActionTypes'

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST
})

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data
})

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error
})

export const fetchSearchData = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data
})