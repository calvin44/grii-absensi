import { DatePicker } from '@/components/dateInput'
import PageContainer from '@/components/pageContainer'
import TextInput from '@/components/textInput'
import useDatePicker from '@/customHooks/useDatePicker'
import useTextInput from '@/customHooks/useTextInput'

const TambahJemaatBaru: React.FC = () => {
  const { input: namaLengkap, setTextInput: setNamaLengkap } = useTextInput()
  const { selectedDate, handleDateChange } = useDatePicker()
  return (
    <PageContainer>
      <div className="bg-white p-8 rounded-lg md:shadow-lg w-full sm:w-96">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Add Jemaat Baru</h2>
        <form className="flex flex-col gap-6">
          <DatePicker
            title="Tanggal datang gereja"
            placeholderText="Pilih tanggal datang gereja"
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
          <TextInput
            labelText="Nama Lengkap" placeholderText="Nama Lengkap"
            input={namaLengkap}
            setInput={setNamaLengkap}
          />
          <button
            type="submit"
            className="w-full bg-teal-500 text-white p-3 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-300"
          >
            Add Record
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            © Copyright ProjectGajelas.com.
          </p>
        </div>
      </div>
    </PageContainer>
  )
}

export default TambahJemaatBaru