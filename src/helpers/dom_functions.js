export function addClass(comp, newClass) {
    let classes = comp.className.split(/\s+/);
    classes.push(newClass)
    comp.className = classes.join(' ')
}
export function removeClass(comp, remClass) {
    let classes = comp.className.split(/\s+/);
    classes = classes.filter((cls) => cls !== remClass)
    comp.className = classes.join(' ')
}