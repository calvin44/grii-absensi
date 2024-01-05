import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import PageContainer from "@/components/pageContainer"
import DatePicker from "@/components/dateInput"
import TextInput from '@/components/textInput'
import { useCallback } from 'react'

export interface FormData {
  "Tanggal Datang Gereja": string
  "Nama Lengkap": string
  "No HP": string
  "Line ID": string
  "Email": string
  "Asal Daerah di Indonesia": string
  "Tanggal Lahir": string
  "Kampus": string
  "Tempat Kerja (jika sudah bekerja)": string
  "Pendidikan Saat Ini": string
  "Asal Gereja": string
  "Sudah Dibaptis": string
}

const AddJemaatBaru: React.FC = () => {
  const methods = useForm<FormData>()
  const { handleSubmit } = methods

  const onSubmit: SubmitHandler<FormData> = useCallback(async (data) => {
    const url = "/api/addProfilJemaat/"
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      alert("Something went wrong!")
    } else {
      // reset all field value
      methods.reset()
      alert("Data updated!")
    }
  }, [methods])

  return (
    <FormProvider {...methods}>
      <PageContainer>
        <div className="bg-white p-8 rounded-lg md:shadow-lg w-full sm:w-96">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Add Jemaat Baru</h2>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <DatePicker name="Tanggal Datang Gereja" title="Tanggal datang gereja" placeholderText="Pilih tanggal datang gereja" />
            <TextInput
              name="Nama Lengkap"
              labelText="Nama Lengkap"
              methods={methods}
              validationRule={{ required: "Nama lengkap is required" }}
            />
            <TextInput
              name="No HP"
              labelText="Nomor HP"
              methods={methods}
              validationRule={{
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please enter a valid 10-digit phone number.",
                }
              }}
            />
            <TextInput
              name="Line ID"
              labelText="Line ID"
              methods={methods}
              validationRule={{ required: "Line ID is required" }}
            />
            <TextInput
              name="Email"
              labelText="Email"
              methods={methods}
              validationRule={{
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                }
              }}
            />
            <TextInput
              name="Asal Daerah di Indonesia"
              labelText="Asal Daerah di Indonesia"
              methods={methods}
              validationRule={{ required: "Asal daerah is required" }}
            />
            <DatePicker name="Tanggal Lahir" title="Tanggal Lahir" placeholderText="Pilih tanggal lahir" />

            <TextInput
              name="Kampus"
              labelText="Kampus"
              methods={methods}
              validationRule={{ required: "Kampus required" }}
            />
            <TextInput
              name="Tempat Kerja (jika sudah bekerja)"
              labelText="Tempat Bekerja"
              methods={methods}
            />
            <TextInput
              name="Pendidikan Saat Ini"
              labelText="Penidikan saat ini"
              methods={methods}
            />
            <TextInput
              name="Asal Gereja"
              labelText="Asal gereja"
              methods={methods}
            />
            <TextInput
              name="Sudah Dibaptis"
              labelText="Sudah dibaptis?"
              methods={methods}
              validationRule={{
                pattern: {
                  value: /^Sudah|Belum$/,
                  message: "Sudah atau Belum?"
                }
              }}
            />
            <button
              type="submit"
              className="w-full bg-teal-500 text-white p-3 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-300"
            >
              Add Record
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">© Copyright ProjectGajelas.com.</p>
          </div>
        </div>
      </PageContainer>
    </FormProvider>
  )
}

export default AddJemaatBaru
