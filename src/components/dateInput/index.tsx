import CustomDatePicker from './customDateInput'

interface DatePickerProps {
  title: string
  placeholderText: string
  selectedDate: Date | null
  handleDateChange: (date: Date | null) => void
}

export const DatePicker: React.FC<DatePickerProps> = ({ title, selectedDate, handleDateChange, placeholderText }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-3">{title}</label>
      <CustomDatePicker placeholderText={placeholderText} selectedDate={selectedDate} onChange={handleDateChange} />
    </div>
  );
};


