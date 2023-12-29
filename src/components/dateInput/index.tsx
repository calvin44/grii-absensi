import CustomDatePicker from './customDateInput'
import { useFormContext, useController } from 'react-hook-form'

interface DatePickerProps {
  name: string
  title: string
  placeholderText: string
}

const DatePicker: React.FC<DatePickerProps> = ({ name, title, placeholderText }) => {
  const { control } = useFormContext()
  const { field, fieldState } = useController({ name, control })

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-3">{title}</label>
      <CustomDatePicker
        placeholderText={placeholderText}
        selectedDate={field.value}
        onChange={(date) => field.onChange(date)}
      />
      {fieldState.error && (
        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
      )}
    </div>
  )
}

export default DatePicker
