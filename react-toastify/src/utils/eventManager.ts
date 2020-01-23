import { InternalToastOptions, ToastId, ToastContent } from '../types';

export type Event = 'show' | 'clear' | 'didMount' | 'willUnmount' | 'change';

type OnShowCallback = (content: ToastContent , options: InternalToastOptions) => void;
type OnClearCallback = (id?: ToastId) => void;
type OnDidMountCallback = (containerInstance: object) => void;
type OnWillUnmountCallback = OnDidMountCallback;
type OnChangeCallback = (toast: number, containerId?: number | string) => void;
type Callback =
  | OnShowCallback
  | OnClearCallback
  | OnDidMountCallback
  | OnWillUnmountCallback
  | OnChangeCallback;
type TimeoutId = ReturnType<typeof window.setTimeout>;

export interface EventManager {
  list: Map<Event, Callback[]>;
  emitQueue: Map<Event, TimeoutId[]>;
  on(event: 'show', callback: OnShowCallback): EventManager;
  on(event: 'clear', callback: OnClearCallback): EventManager;
  on(event: 'didMount', callback: OnDidMountCallback): EventManager;
  on(event: 'willUnmount', callback: OnWillUnmountCallback): EventManager;
  on(event: 'change', callback: OnChangeCallback): EventManager;
  off(event: Event): EventManager;
  cancelEmit(event: Event): EventManager;
  emit(event: 'show', content: React.ReactNode, options: InternalToastOptions): void;
  emit(event: 'clear', id?: string | number): void;
  emit(event: 'didMount', containerInstance: object): void;
  emit(event: 'willUnmount', containerInstance: object): void;
  emit(event: 'change', toast: number, containerId?: number | string): void;
}

export const eventManager: EventManager = {
  list: new Map(),
  emitQueue: new Map(),

  on(event: Event, callback: Callback) {
    this.list.has(event) || this.list.set(event, []);
    this.list.get(event)!.push(callback);
    return this;
  },

  off(event) {
    this.list.delete(event);
    return this;
  },

  cancelEmit(event) {
    const timers = this.emitQueue.get(event);
    if (timers) {
      timers.forEach((timer: TimeoutId) => clearTimeout(timer));
      this.emitQueue.delete(event);
    }

    return this;
  },

  /**
   * Enqueue the event at the end of the call stack
   * Doing so let the user call toast as follow:
   * toast('1')
   * toast('2')
   * toast('3')
   * Without setTimemout the code above will not work
   */
  emit(event: Event, ...args: any[]) {
    this.list.has(event) &&
      this.list.get(event)!.forEach((callback: Callback) => {
        const timer = setTimeout(() => {
          // @ts-ignore
          callback(...args);
        }, 0);

        this.emitQueue.has(event) || this.emitQueue.set(event, []);
        this.emitQueue.get(event)!.push(timer);
      });
  }
};
