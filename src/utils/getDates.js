export const getDates = () =>
  Array.from({ length: 30 }, (_, i) => {
    const date = new Date()

    date.setDate(date.getDate() + i)

    return date.toISOString().split('T')[0]
  })

export const getCurrentDate = () => new Date().toISOString().split('T')[0]
