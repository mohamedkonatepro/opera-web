import Holidays from "date-holidays"
import { DateTime } from "luxon"

export const isItemDisabled = (currentDate: DateTime, minDate: DateTime, maxDate: DateTime) => {
    if (currentDate < minDate) return true
    if (currentDate > maxDate) return true

    if (currentDate.weekday === 7) return true

    const hd = new Holidays('FR', 'fr')
    const holidays = hd.getHolidays(currentDate.year)
    const isHoliday = holidays.some(h => h.date === currentDate.toISODate())
    if (isHoliday) return true

    return false
}

export const datesAreSame = (date1: DateTime, date2: DateTime) => {
    return date1.hasSame(date2, 'day') &&
        date1.hasSame(date2, 'month') &&
        date1.hasSame(date2, 'year')
}
