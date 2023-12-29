import { useCallback, useEffect, useState } from 'react'

export const useDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateChange = useCallback((date: Date | null) => {
    setSelectedDate(date)
  }, [])

  useEffect(() => {
    if (!selectedDate) {
      const today = new Date();
      handleDateChange(today);
    }
  }, [handleDateChange, selectedDate])
  return {
    selectedDate,
    handleDateChange
  }
}

export default useDatePicker
