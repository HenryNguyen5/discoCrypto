export const reducerHelper = <S, A extends IAction>(
  initialState: S,
  reducerObj: ReducerMapObj<A, S>
) => (state: S, action: IAction): S =>
  reducerObj[action.type]
    ? reducerObj[action.type](state, action)
    : initialState;
