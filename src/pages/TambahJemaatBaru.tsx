import TextInput from '@/components/textInput'
import useTextInput from '@/customHooks/useTextInput'

const TambahJemaatBaru: React.FC = () => {
  const { input: namaLengkap, setTextInput: setNamaLengkap } = useTextInput()
  return (
    <div className="min-h-screen flex items-center justify-center  sm:bg-white md:bg-gray-100 lg:bg-gray-100">
      <div className="bg-white p-8 rounded-lg md:shadow-lg w-full sm:w-96">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Add Jemaat Baru</h1>
        <form>
          <TextInput
            labelText="Nama Lengkap" placeholderText="Nama Lengkap"
            input={namaLengkap}
            setInput={setNamaLengkap}
          />
          <button
            type="submit"
            className="w-full bg-teal-500 text-white p-3 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            By signing up, you agree to our <a href="#" className="text-teal-500">Terms</a>.
          </p>
        </div>
        <p className="mt-4 text-gray-600 text-sm text-center">
          Already have an account? <a href="#" className="text-teal-500 font-semibold">Log in here</a>.
        </p>
      </div>
    </div>
  )
}

export default TambahJemaatBaru