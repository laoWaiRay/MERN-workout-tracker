export function useGetWeekDates() {

  const getWeekDates = (modifier = 0)  => {
    let now = new Date()
    now.setDate(now.getDate() + modifier)

    let dayOfWeek = now.getDay()
    let numDay = now.getDate()

    let startDate = new Date(now)
    startDate.setDate(numDay - dayOfWeek)

    let endDate = new Date(now);
    endDate.setDate(numDay + (7 - dayOfWeek));
    endDate.setHours(0,0,0,0)

    return [startDate, endDate]
  }

  return getWeekDates
}
