function isDev () {
    if (process.env.NODE_ENV === "production" || process.env.REACT_APP_ENV === "STAGING") {
        return false;
    }
    return true;
}

export function log(msg) {
    if (isDev) console.log(msg);
}
export function error(msg) {
    if (isDev) console.error(msg);
}
export function warn(msg) {
    if (isDev) console.warn(msg);
}