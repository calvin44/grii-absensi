import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

interface CustomDatePickerProps {
  placeholderText: string
  selectedDate: string | null
  onChange: (date: string | null) => void
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ selectedDate, onChange, placeholderText }) => {
  const handleDateChange = (date: Date | null) => {
    const dateString = date ? date.toLocaleDateString() : null
    onChange(dateString)
  }

  return (
    <div className="relative w-full">
      <DatePicker
        selected={selectedDate ? new Date(selectedDate) : null}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholderText}
        wrapperClassName="w-full"
        className="w-full p-3 pr-10 rounded-md border focus:outline-none focus:border-teal-300"
      />
      <div className="absolute top-0 right-0 h-full flex items-center px-3 cursor-pointer">
        <CalendarMonthIcon className="h-6 w-6 text-gray-500" />
      </div>
    </div>
  )
}

export default CustomDatePicker
