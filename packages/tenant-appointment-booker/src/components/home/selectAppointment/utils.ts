import Holidays from "date-holidays"
import { DateTime } from "luxon"

export const isPaginationItemDisabled = (currentDate: DateTime, disabled: boolean, minDate?: DateTime, maxDate?: DateTime) => {
    if (disabled) return true

    if (minDate !== undefined && currentDate.day < minDate.day) return true
    if (maxDate !== undefined && currentDate.day > maxDate.day) return true

    if (currentDate.weekday === 7) return true

    const hd = new Holidays('FR', 'fr')
    const holidays = hd.getHolidays(currentDate.year)
    const isHoliday = holidays.some(h => h.date === currentDate.toISODate())
    if (isHoliday) return true

    return false
}

