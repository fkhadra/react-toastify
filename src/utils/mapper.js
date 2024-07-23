export function toToastItem(toast, status) {
    return toast != null
        ? {
            content: toast.content,
            containerId: toast.props.containerId,
            id: toast.props.toastId,
            theme: toast.props.theme,
            type: toast.props.type,
            data: toast.props.data || {},
            isLoading: toast.props.isLoading,
            icon: toast.props.icon,
            status: status
        }
        : // monkey patch for now
            {};
}
//# sourceMappingURL=mapper.js.map