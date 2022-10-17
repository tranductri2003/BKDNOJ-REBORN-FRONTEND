export function getDuration(t1, t2) {
    let st1, st2;
    if (t1 instanceof Date) st1 = t1;
    else st1 = new Date(t1)
    if (t2 instanceof Date) st2 = t2;
    else st2 = new Date(t2)
    let seconds = Math.floor( (st2 - st1)/1000 );
    return secondsToHHMMSS(seconds)
}
export function secondsToHHMMSS(seconds) {
    let mm = Math.floor(seconds / 60);
    let ss = (seconds % 60);
    let hh = Math.floor(mm / 60);
    mm %= 60;
    return (hh<10?'0':'')+hh+':'+(mm<10?'0':'')+mm+':'+(ss<10?'0':'')+ss;
}