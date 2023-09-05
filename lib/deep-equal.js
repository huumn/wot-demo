export default function deepEqual (objA, objB) {
  if (objA === objB) return true

  if (typeof objA !== 'object' || typeof objB !== 'object' || objA === null || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!objB[key] || !deepEqual(objA[key], objB[key])) return false
  }

  return true
}
