const STOP_POLL_STATUSES = ['D', 'IE', 'CE', 'AB']
const NO_DETAIL_STATUSES = ['IE', 'CE', 'AB', 'AC', 'SC']

function shouldStopPolling(status) {
    return STOP_POLL_STATUSES.includes(status);
}
function isNoTestcaseStatus(status) {
    return NO_DETAIL_STATUSES.includes(status);
}

export {
    STOP_POLL_STATUSES,
    NO_DETAIL_STATUSES,

    shouldStopPolling,
    isNoTestcaseStatus,
};