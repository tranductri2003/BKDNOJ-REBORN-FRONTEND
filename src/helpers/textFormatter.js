function parseTime(time) {
    if (isNaN(time)) return "--";
    if (!time) return "--";
    return `${time.toFixed(1)}s`
}
function parseMem(mem) {
    if (isNaN(mem)) return "--";
    if (!mem) return "--";
    if (mem < 16*1024)
        return `${mem} KB`;
    return `${Math.round(mem/1024)}MB`;
}

export {
    parseTime, parseMem,
}
