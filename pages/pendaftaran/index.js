import TextInput from '../../components/register-page/TextInput';
import RadioInput from '../../components/register-page/RadioInput';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { HiChevronLeft } from 'react-icons/hi';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

export default function Pendaftaran() {
  const router = useRouter();

  const schema = Yup.object({
    nama: Yup.string().required('Nama wajib diisi'),
    email: Yup.string()
      .email('Alamat email tidak valid')
      .required('Alamat email wajib diisi'),
    whatsapp: Yup.number()
      .typeError('Nomor whatsapp tidak valid')
      .positive('Nomor whatsapp tidak valid')
      .required('Nomor whatsapp wajib diisi'),
    asal: Yup.string().required('Asal kota/kabupaten wajib diisi'),
    info: Yup.string().required('Wajib pilih salah satu dari opsi dibawah'),
  });

  return (
    <>
      <Head>
        <title>POSTGRE 2021 | Pendaftaran Event</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-[#939CE8] to-[#004BA7] flex justify-center items-center">
        <Formik
          initialValues={{
            nama: '',
            email: '',
            whatsapp: '',
            asal: '',
            info: '',
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            alert(JSON.stringify(values) + '\n Back to home....');
            router.push('/');
          }}
        >
          {({ setFieldValue }) => (
            <div className="bg-white rounded-sm py-4 px-4 sm:px-10 m-4 flex-1 max-w-3xl">
              <div
                className="absolute cursor-pointer hover:scale-110 active:scale-100 transition-transform"
                onClick={() => router.push('/')}
              >
                <HiChevronLeft className="h-12 w-12 text-[#004BA7] hover:text-blue-500 transition-colors" />
              </div>
              <img
                src="/assets/logo.svg"
                className="h-12 object-contain mx-auto"
              />
              <h1 className="font-medium text-xl text-center my-4">
                Pendaftaran Event
              </h1>
              <Form className="my-4 px-4 sm:px-10 space-y-4">
                <TextInput />
                <RadioInput setFieldValue={setFieldValue} />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-white bg-[#004BA7] px-2 py-1 rounded-md hover:scale-105 active:scale-100 transition-transform"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}
