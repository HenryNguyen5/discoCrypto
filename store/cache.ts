import { Reducer } from "redux";
import { delay, SagaIterator } from "redux-saga";
import { call, fork, put, take, takeEvery } from "redux-saga/effects";
import * as request from "request-promise-native";
import { reducerHelper } from "../shared/reducerUtils";

const BASE_URL = "https://api.coinmarketcap.com/v1";
const MINUTE = 1000 * 60;
const FIVE_MINUTES = 5 * MINUTE; // cmc updates endpoints every 5 minutes

const reqBase = request.defaults({
  baseUrl: BASE_URL,
  json: true
});

async function requestGlobalData() {
  return reqBase.get("/global");
}

async function requestCoinData(): Promise<ICMCCoin[]> {
  return reqBase.get("/ticker?limit=0");
}

async function requestCoinByID(id: string) {
  return reqBase.get(`/ticker/${id}`);
}

enum ACTION_TYPES {
  GET_NEW_CACHE_REQUESTED = "GET_NEW_CACHE_REQUESTED",
  GET_NEW_CACHE_SUCCEEDED = "GET_NEW_CACHE_SUCCEEDED",
  GET_NEW_CACHE_FAILED = "GET_NEW_CACHE_FAILED"
}

function* cachePoll(): SagaIterator {
  while (true) {
    yield put(requestUpdate());
    yield call(delay, FIVE_MINUTES);
  }
}

function* handleRequestUpdate(): SagaIterator {
  try {
    const coins: ICMCCoin[] = yield call(requestCoinData);
    const eth: ICMCCoin | undefined = coins.find(e => e.id === "ethereum");

    if (!eth) {
      return yield put(requestFailed());
    }

    const eCoins: IExtendedCMCCoin[] = coins.map(c => ({
      ...c,
      price_eth: `${(parseFloat(c.price_btc) /
        parseFloat(eth.price_btc)).toFixed(8)}`
    }));

    yield put(updateCache({ coins: eCoins }));
  } catch (e) {
    yield put(requestFailed());
  }
}

export const cacheSagas = [
  takeEvery(ACTION_TYPES.GET_NEW_CACHE_REQUESTED, handleRequestUpdate),
  fork(cachePoll)
];

interface ICacheFailedAction {
  type: ACTION_TYPES.GET_NEW_CACHE_FAILED;
}

const requestFailed = (): ICacheFailedAction => ({
  type: ACTION_TYPES.GET_NEW_CACHE_FAILED
});

interface ICacheRequestedAction {
  type: ACTION_TYPES.GET_NEW_CACHE_REQUESTED;
}

const requestUpdate = (): ICacheRequestedAction => ({
  type: ACTION_TYPES.GET_NEW_CACHE_REQUESTED
});

export interface ICacheUpdateAction {
  type: ACTION_TYPES.GET_NEW_CACHE_SUCCEEDED;
  payload: {
    coins: IExtendedCMCCoin[];
  };
}

// Action Creator
export const updateCache = (
  payload: ICacheUpdateAction["payload"]
): ICacheUpdateAction => ({
  type: ACTION_TYPES.GET_NEW_CACHE_SUCCEEDED,
  payload
});

export type CacheAction = ICacheUpdateAction;

export interface IState {
  coinsByName: { [coinName: string]: IExtendedCMCCoin | undefined };
  coinsByTicker: { [coinTicker: string]: IExtendedCMCCoin[] | undefined };
}

export const getCoinFromCache = (
  state: IAppState,
  query: string
): IExtendedCMCCoin | null => {
  const { cache } = state;
  const normalizedQuery = query.toLowerCase();
  const coinFoundByName = cache.coinsByName[normalizedQuery];
  const coinFoundByTicker = cache.coinsByTicker[normalizedQuery];

  if (!coinFoundByName && !coinFoundByTicker) {
    return null;
  }
  if (coinFoundByName) {
    return coinFoundByName;
  }

  if (coinFoundByTicker) {
    const coin = coinFoundByTicker;

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
  [ACTION_TYPES.GET_NEW_CACHE_SUCCEEDED]: handleCacheUpdate
};

export const cache = reducerHelper(INITIAL_STATE, reducerObj);
