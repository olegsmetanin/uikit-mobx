export function rest(obj, delete_keys) {
  var target = {}
  for (var key in obj) {
    if (delete_keys.indexOf(obj[key]) >= 0) continue
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue
    target[key] = obj[key]
  }
  return target
}

