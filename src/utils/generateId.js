export const generateId = () => {
  const pool = 'abcdefghijklmonpqrstuvwxyz0123456789'

  let result = ''
  for (let i = 1; i < 10; i++) {
    result += pool[Math.round(Math.random() * (pool.length - 1))]
  }
  return result
}
