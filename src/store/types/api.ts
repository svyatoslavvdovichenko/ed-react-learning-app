import { AxiosInstance } from 'axios'

export interface apiState {
  apiInstance: AxiosInstance
};

export enum apiActionTypes {
  SET_API = "SET_API"
};

export interface apiSetAction {
  type: apiActionTypes.SET_API
  payload: {
    token: string | undefined
  }
}

export type apiActions = apiSetAction
