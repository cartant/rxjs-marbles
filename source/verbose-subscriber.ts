import { Subscriber } from "rxjs";

export class VerboseSubscriber<T> extends Subscriber<T> {
  constructor(private onError: (error: any) => void, onComplete: () => void) {
    super(undefined, onError, onComplete);
  }

  unsubscribe(): void {
    try {
      super.unsubscribe();
    } catch (error) {
      this.onError(error);
    }
  }
}
