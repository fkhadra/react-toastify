import { ToastItem, Id } from 'react-toastify';
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export interface NotificationCenterItem<Data = {}> extends Optional<ToastItem<Data>, 'content' | 'data' | 'status'> {
    read: boolean;
    createdAt: number;
}
export type SortFn<Data> = (l: NotificationCenterItem<Data>, r: NotificationCenterItem<Data>) => number;
export type FilterFn<Data = {}> = (item: NotificationCenterItem<Data>) => boolean;
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
export declare function useNotificationCenter<Data = {}>(params?: UseNotificationCenterParams<Data>): UseNotificationCenter<Data>;
export declare function decorate<Data>(item: NotificationCenterItem<Data> | Partial<NotificationCenterItem<Data>>): NotificationCenterItem<Data>;
export {};
