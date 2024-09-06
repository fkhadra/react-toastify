import { useState, useEffect, useRef } from 'react';
import { toast, ToastItem, Id } from 'react-toastify';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export interface NotificationCenterItem<Data = {}>
  extends Optional<ToastItem<Data>, 'content' | 'data' | 'status'> {
  read: boolean;
  createdAt: number;
}

export type SortFn<Data> = (
  l: NotificationCenterItem<Data>,
  r: NotificationCenterItem<Data>
) => number;

export type FilterFn<Data = {}> = (
  item: NotificationCenterItem<Data>
) => boolean;

export interface UseNotificationCenterParams<Data = {}> {
  /**
   * initial data to rehydrate the notification center
   */
  data?: NotificationCenterItem<Data>[];

  /**
   * By default, the notifications are sorted from the newest to the oldest using
   * the `createdAt` field. Use this to provide your own sort function
   *
   * Usage:
   * ```
   * // old notifications first
   * useNotificationCenter({
   *   sort: ((l, r) => l.createdAt - r.createdAt)
   * })
   * ```
   */
  sort?: SortFn<Data>;

  /**
   * Keep the toast that meets the condition specified in the callback function.
   *
   * Usage:
   * ```
   * // keep only the toasts when hidden is set to false
   * useNotificationCenter({
   *   filter: item => item.data.hidden === false
   * })
   * ```
   */
  filter?: FilterFn<Data>;
}

export interface UseNotificationCenter<Data> {
  /**
   * Contains all the notifications
   */
  notifications: NotificationCenterItem<Data>[];

  /**
   * Clear all notifications
   */
  clear(): void;

  /**
   * Mark all notification as read
   */
  markAllAsRead(): void;

  /**
   * Mark all notification as read or not.
   *
   * Usage:
   * ```
   * markAllAsRead(false) // mark all notification as not read
   *
   * markAllAsRead(true) // same as calling markAllAsRead()
   * ```
   */
  markAllAsRead(read?: boolean): void;

  /**
   * Mark one or more notifications as read.
   *
   * Usage:
   * ```
   * markAsRead("anId")
   * markAsRead(["a","list", "of", "id"])
   * ```
   */
  markAsRead(id: Id | Id[]): void;

  /**
   * Mark one or more notifications as read.The second parameter let you mark the notification as read or not.
   *
   * Usage:
   * ```
   * markAsRead("anId", false)
   * markAsRead(["a","list", "of", "id"], false)
   *
   * markAsRead("anId", true) // same as markAsRead("anId")
   * ```
   */
  markAsRead(id: Id | Id[], read?: boolean): void;

  /**
   * Remove one or more notifications
   *
   * Usage:
   * ```
   * remove("anId")
   * remove(["a","list", "of", "id"])
   * ```
   */
  remove(id: Id | Id[]): void;

  /**
   * Push a notification to the notification center.
   * Returns null when an item with the given id already exists
   *
   * Usage:
   * ```
   * const id = add({id: "id", content: "test", data: { foo: "hello" } })
   *
   * // Return the id of the notification, generate one if none provided
   * const id = add({ data: {title: "a title", text: "some text"} })
   * ```
   */
  add(item: Partial<NotificationCenterItem<Data>>): Id | null;

  /**
   * Update the notification that match the id
   * Returns null when no matching notification found
   *
   * Usage:
   * ```
   * const id = update("anId",  {content: "test", data: { foo: "hello" } })
   *
   * // It's also possible to update the id
   * const id = update("anId"m { id:"anotherOne", data: {title: "a title", text: "some text"} })
   * ```
   */
  update(id: Id, item: Partial<NotificationCenterItem<Data>>): Id | null;

  /**
   * Retrieve one or more notifications
   *
   * Usage:
   * ```
   * find("anId")
   * find(["a","list", "of", "id"])
   * ```
   */
  find(id: Id): NotificationCenterItem<Data> | undefined;

  /**
   * Retrieve one or more notifications
   *
   * Usage:
   * ```
   * find("anId")
   * find(["a","list", "of", "id"])
   * ```
   */
  find(id: Id[]): NotificationCenterItem<Data>[] | undefined;

  /**
   * Retrieve the count for unread notifications
   */
  unreadCount: number;

  /**
   * Sort notifications using the newly provided function
   *
   * Usage:
   * ```
   * // old notifications first
   * sort((l, r) => l.createdAt - r.createdAt)
   * ```
   */
  sort(sort: SortFn<Data>): void;
}

export function useNotificationCenter<Data = {}>(
  params: UseNotificationCenterParams<Data> = {}
): UseNotificationCenter<Data> {
  const sortFn = useRef(params.sort || defaultSort);
  const filterFn = useRef(params.filter || null);
  const [notifications, setNotifications] = useState<
    NotificationCenterItem<Data>[]
  >(() => {
    if (params.data) {
      return filterFn.current
        ? params.data.filter(filterFn.current).sort(sortFn.current)
        : [...params.data].sort(sortFn.current);
    }
    return [];
  });

  useEffect(() => {
    return toast.onChange(item => {
      if (item.status === 'added' || item.status === 'updated') {
        const newItem = decorate(item as NotificationCenterItem<Data>);
        if (filterFn.current && !filterFn.current(newItem)) return;

        setNotifications(prev => {
          let nextState: NotificationCenterItem<Data>[] = [];
          const updateIdx = prev.findIndex(v => v.id === newItem.id);

          if (updateIdx !== -1) {
            nextState = prev.slice();
            Object.assign(nextState[updateIdx], newItem, {
              createdAt: Date.now()
            });
          } else if (prev.length === 0) {
            nextState = [newItem];
          } else {
            nextState = [newItem, ...prev];
          }
          return nextState.sort(sortFn.current);
        });
      }
    });
  }, []);

  const remove = (id: Id | Id[]) => {
    setNotifications(prev =>
      prev.filter(
        Array.isArray(id) ? v => !id.includes(v.id) : v => v.id !== id
      )
    );
  };

  const clear = () => {
    setNotifications([]);
  };

  const markAllAsRead = (read = true) => {
    setNotifications(prev =>
      prev.map(v => {
        v.read = read;
        return v;
      })
    );
  };

  const markAsRead = (id: Id | Id[], read = true) => {
    let map = (v: NotificationCenterItem<Data>) => {
      if (v.id === id) v.read = read;
      return v;
    };

    if (Array.isArray(id)) {
      map = v => {
        if (id.includes(v.id)) v.read = read;
        return v;
      };
    }

    setNotifications(prev => prev.map(map));
  };

  const find = (id: Id | Id[]) => {
    return Array.isArray(id)
      ? notifications.filter(v => id.includes(v.id))
      : notifications.find(v => v.id === id);
  };

  const add = (item: Partial<NotificationCenterItem<Data>>) => {
    if (notifications.find(v => v.id === item.id)) return null;

    const newItem = decorate(item);

    setNotifications(prev => [...prev, newItem].sort(sortFn.current));

    return newItem.id;
  };

  const update = (id: Id, item: Partial<NotificationCenterItem<Data>>) => {
    const index = notifications.findIndex(v => v.id === id);

    if (index !== -1) {
      setNotifications(prev => {
        const nextState = [...prev];
        Object.assign(nextState[index], item, {
          createdAt: item.createdAt || Date.now()
        });

        return nextState.sort(sortFn.current);
      });

      return item.id as Id;
    }

    return null;
  };

  const sort = (compareFn: SortFn<Data>) => {
    sortFn.current = compareFn;
    setNotifications(prev => prev.slice().sort(compareFn));
  };

  return {
    notifications,
    clear,
    markAllAsRead,
    markAsRead,
    add,
    update,
    remove,
    // @ts-ignore fixme: overloading issue
    find,
    sort,
    get unreadCount() {
      return notifications.reduce(
        (prev, cur) => (!cur.read ? prev + 1 : prev),
        0
      );
    }
  };
}

export function decorate<Data>(
  item: NotificationCenterItem<Data> | Partial<NotificationCenterItem<Data>>
) {
  if (item.id == null) item.id = Date.now().toString(36).substring(2, 9);
  if (!item.createdAt) item.createdAt = Date.now();
  if (item.read == null) item.read = false;
  return item as NotificationCenterItem<Data>;
}

// newest to oldest
function defaultSort<Data>(
  l: NotificationCenterItem<Data>,
  r: NotificationCenterItem<Data>
) {
  return r.createdAt - l.createdAt;
}
