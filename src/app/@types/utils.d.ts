import { Observable } from 'rxjs';

declare module '@douglas-serena/utils' {
  function handleTry<T = unknown>(
    promise: Promise<T> | Observable<T>
  ): Promise<[T, any]>;
}
