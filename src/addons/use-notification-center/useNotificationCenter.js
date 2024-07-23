import { __spreadArray } from 'tslib';
import { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { toast } from 'react-toastify';
export function useNotificationCenter(params) {
  if (params === void 0) {
    params = {};
  }
  var sortFn = useRef(params.sort || defaultSort);
  var filterFn = useRef(params.filter || null);
  var _a = useState(function () {
      if (params.data) {
        return filterFn.current
          ? params.data.filter(filterFn.current).sort(sortFn.current)
          : __spreadArray([], params.data, true).sort(sortFn.current);
      }
      return [];
    }),
    notifications = _a[0],
    setNotifications = _a[1];
  useEffect(function () {
    return toast.onChange(function (item) {
      if (item.status === 'added' || item.status === 'updated') {
        var newItem_1 = decorate(item);
        if (filterFn.current && !filterFn.current(newItem_1)) return;
        setNotifications(function (prev) {
          var nextState = [];
          var updateIdx = prev.findIndex(function (v) {
            return v.id === newItem_1.id;
          });
          if (updateIdx !== -1) {
            nextState = prev.slice();
            Object.assign(nextState[updateIdx], newItem_1, {
              createdAt: Date.now()
            });
          } else if (prev.length === 0) {
            nextState = [newItem_1];
          } else {
            nextState = __spreadArray([newItem_1], prev, true);
          }
          return nextState.sort(sortFn.current);
        });
      }
    });
  }, []);
  var remove = function (id) {
    setNotifications(function (prev) {
      return prev.filter(
        Array.isArray(id)
          ? function (v) {
              return !id.includes(v.id);
            }
          : function (v) {
              return v.id !== id;
            }
      );
    });
  };
  var clear = function () {
    setNotifications([]);
  };
  var markAllAsRead = function (read) {
    if (read === void 0) {
      read = true;
    }
    setNotifications(function (prev) {
      return prev.map(function (v) {
        v.read = read;
        return v;
      });
    });
  };
  var markAsRead = function (id, read) {
    if (read === void 0) {
      read = true;
    }
    var map = function (v) {
      if (v.id === id) v.read = read;
      return v;
    };
    if (Array.isArray(id)) {
      map = function (v) {
        if (id.includes(v.id)) v.read = read;
        return v;
      };
    }
    setNotifications(function (prev) {
      return prev.map(map);
    });
  };
  var find = function (id) {
    return Array.isArray(id)
      ? notifications.filter(function (v) {
          return id.includes(v.id);
        })
      : notifications.find(function (v) {
          return v.id === id;
        });
  };
  var add = function (item) {
    if (
      notifications.find(function (v) {
        return v.id === item.id;
      })
    )
      return null;
    var newItem = decorate(item);
    setNotifications(function (prev) {
      return __spreadArray(
        __spreadArray([], prev, true),
        [newItem],
        false
      ).sort(sortFn.current);
    });
    return newItem.id;
  };
  var update = function (id, item) {
    var index = notifications.findIndex(function (v) {
      return v.id === id;
    });
    if (index !== -1) {
      setNotifications(function (prev) {
        var nextState = __spreadArray([], prev, true);
        Object.assign(nextState[index], item, {
          createdAt: item.createdAt || Date.now()
        });
        return nextState.sort(sortFn.current);
      });
      return item.id;
    }
    return null;
  };
  var sort = function (compareFn) {
    sortFn.current = compareFn;
    setNotifications(function (prev) {
      return prev.slice().sort(compareFn);
    });
  };
  return {
    notifications: notifications,
    clear: clear,
    markAllAsRead: markAllAsRead,
    markAsRead: markAsRead,
    add: add,
    update: update,
    remove: remove,
    // @ts-ignore fixme: overloading issue
    find: find,
    sort: sort,
    get unreadCount() {
      return notifications.reduce(function (prev, cur) {
        return !cur.read ? prev + 1 : prev;
      }, 0);
    }
  };
}
export function decorate(item) {
  if (item.id == null) item.id = Date.now().toString(36).substring(2, 9);
  if (!item.createdAt) item.createdAt = Date.now();
  if (item.read == null) item.read = false;
  return item;
}
// newest to oldest
function defaultSort(l, r) {
  return r.createdAt - l.createdAt;
}
//# sourceMappingURL=useNotificationCenter.js.map
