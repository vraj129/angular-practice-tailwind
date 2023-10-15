export enum State {
  loading,
  completed,
  error,
}

export class ComponentUiState {
  private _state?: State;

  constructor() {}

  loading(): State {
    this._state = State.loading;
    return this._state;
  }
  completed(): State {
    this._state = State.completed;
    return this._state;
  }

  error(): State {
    this._state = State.error;
    return this._state;
  }

  // Returns true if the current state is State.Loading
  isLoading(): boolean {
    return this._state === State.loading;
  }

  // Returns true if the current state is State.Completed
  isCompleted(): boolean {
    return this._state === State.completed;
  }

  // Returns true if the current state is State.Error
  isError(): boolean {
    return this._state === State.error || this._state === undefined;
  }
}
