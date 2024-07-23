import { useRef, useSyncExternalStore } from 'react';
import { isToastActive, registerContainer } from '../core/store';
export function useToastContainer(props) {
    var _a = useRef(registerContainer(props)).current, subscribe = _a.subscribe, getSnapshot = _a.getSnapshot, setProps = _a.setProps;
    setProps(props);
    var snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
    function getToastToRender(cb) {
        if (!snapshot)
            return [];
        var toRender = new Map();
        snapshot.forEach(function (toast) {
            var position = toast.props.position;
            toRender.has(position) || toRender.set(position, []);
            toRender.get(position).push(toast);
        });
        return Array.from(toRender, function (p) { return cb(p[0], p[1]); });
    }
    return {
        getToastToRender: getToastToRender,
        isToastActive: isToastActive,
        count: snapshot === null || snapshot === void 0 ? void 0 : snapshot.length
    };
}
//# sourceMappingURL=useToastContainer.js.map