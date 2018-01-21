import { Reducer } from "redux";
import { SagaIterator } from "redux-saga";
import { call, fork, put, take } from "redux-saga/effects";
import { reducerHelper } from "shared/reducerUtils";

enum ACTIONS {
  GET_NEW_CACHE_REQUESTED = "GET_NEW_CACHE_REQUESTED",
  GET_NEW_CACHE_SUCCEEDED = "GET_NEW_CACHE_SUCCEEDED",
  GET_NEW_CACHE_FAILED = "GET_NEW_CACHE_FAILED"
}

export interface ICacheUpdateAction {
  type: ACTIONS.GET_NEW_CACHE_SUCCEEDED;
  payload: {
    coins: IExtendedCMCCoin[];
  };
}

export const updateCache = (
  payload: ICacheUpdateAction["payload"]
): ICacheUpdateAction => ({ type: ACTIONS.GET_NEW_CACHE_SUCCEEDED, payload });

export type CacheAction = ICacheUpdateAction;

export interface IState {
  coinsByName: { [coinName: string]: IExtendedCMCCoin | undefined };
  coinsByTicker: { [coinTicker: string]: IExtendedCMCCoin[] | undefined };
}

const getCoinFromCache = (
  state: IAppState,
  query: string
): IExtendedCMCCoin | null => {
  const { coins } = state;
  const normalizedQuery = query.toLowerCase();
  const coinFoundByName = coins.coinsByName[normalizedQuery];
  const coinFoundByTicker = coins.coinsByTicker[normalizedQuery];

  if (!coinFoundByName && !coinFoundByTicker) {
    return null;
  }
  if (coinFoundByName) {
    return coinFoundByName;
  }

  if (coinFoundByTicker) {
    return coinFoundByTicker[coinFoundByTicker.length - 1];
  }

  return null;
};

const handleCacheUpdate: Reducer<IState> = (
  state,
  { payload }: ICacheUpdateAction
) => {
  const coinsByName = payload.coins.reduce(
    (accu, currCoin) => ({ ...accu, [currCoin.name.toLowerCase()]: currCoin }),
    {}
  );

  const coinsByTicker = payload.coins.reduce((accu, currCoin) => {
    currCoin.symbol = currCoin.symbol.toLowerCase();

    const tickerExists = accu[currCoin.symbol];
    if (tickerExists) {
      return {
        ...accu,
        [currCoin.symbol]: [...tickerExists, currCoin]
      };
    } else {
      return { ...accu, [currCoin.symbol]: [currCoin] };
    }
  }, {} as IState["coinsByTicker"]);

  return { coinsByName, coinsByTicker };
};

const INITIAL_STATE: IState = {
  coinsByName: {},
  coinsByTicker: {}
};

const reducerObj: ReducerMapObj<CacheAction, IState> = {
  [ACTIONS.GET_NEW_CACHE_SUCCEEDED]: handleCacheUpdate
};

export const cache = reducerHelper(INITIAL_STATE, reducerObj);
