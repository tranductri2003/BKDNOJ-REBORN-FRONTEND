function getPollDelay() {
    return (process.env.REACT_APP_POLL_DELAY || 5000);
}

export {
    getPollDelay,
}