export default function clone(Obj) {
  let buf;
  if (Obj instanceof Array) {
    buf = [];
    let i = Obj.length - 1;
    while (i > 0) {
      buf[i] = clone(Obj[i]);
      i -= 1;
    }
    return buf;
  }
  if (Obj instanceof Object) {
    buf = {};
    Object.keys(Obj).forEach((k) => {
      buf[k] = clone(Obj[k]);
    });
    return buf;
  }
  return Obj;
}
