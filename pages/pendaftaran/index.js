import TextInput from '../../components/register-page/TextInput';
import RadioInput from '../../components/register-page/RadioInput';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { HiChevronLeft, HiCheck, HiX } from 'react-icons/hi';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import useSWR from 'swr';

export default function Pendaftaran() {
  const router = useRouter();
  const { data: eventsData } = useSWR('/api/events');

  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [failMessage, setFailMessage] = useState('');

  const schema = Yup.object({
    nama: Yup.string().required('Nama wajib diisi'),
    email: Yup.string()
      .email('Alamat email tidak valid')
      .required('Alamat email wajib diisi'),
    whatsapp: Yup.number()
      .typeError('Nomor whatsapp tidak valid')
      .positive('Nomor whatsapp tidak valid')
      .required('Nomor whatsapp wajib diisi'),
    asal: Yup.string().required('Asal instansi wajib diisi'),
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
          onSubmit={async (values) => {
            const latestEventsId =
              eventsData?.data[eventsData?.data.length - 1].id;

            alert(JSON.stringify({ ...values, id_event: latestEventsId }));

            const fetchData = await fetch('/api/users', {
              method: 'POST',
              body: JSON.stringify({ ...values, id_event: latestEventsId }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            }).then((response) => response.json());
            console.log(fetchData);
            if (fetchData.success) {
              setIsSuccess(true);
            } else {
              setFailMessage(fetchData.message);
              setIsFailed(true);
            }
          }}
        >
          {({ setFieldValue }) => (
            <div className="bg-white rounded-md py-4 px-4 sm:px-10 m-4 flex-1 max-w-3xl">
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
                <div className="flex justify-end pt-6">
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

      {/* If register failed */}
      <Transition show={isFailed} as={Fragment}>
        <Dialog
          onClose={() => setIsFailed(false)}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen mx-8">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 cursor-pointer" />
            <Transition.Child
              as={Fragment}
              enter="transition duration-300 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-200 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <div className="bg-white rounded w-full max-w-md mx-auto z-20 p-6 flex flex-col items-center">
                <HiX className="h-24 w-24 text-red-700 rounded-full border-4 border-red-700 p-3" />
                <Dialog.Title className="font-semibold text-md text-center mt-4 mb-2">
                  Pendaftaran gagal!
                </Dialog.Title>
                <Dialog.Description className="mx-2 text-sm text-red-700">
                  {failMessage}.
                </Dialog.Description>
                <button
                  onClick={() => setIsFailed(false)}
                  className="h-0 w-0"
                ></button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* If register success */}
      <Transition show={isSuccess} as={Fragment}>
        <Dialog
          onClose={() => setIsSuccess(false)}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen mx-8">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 cursor-pointer" />
            <Transition.Child
              as={Fragment}
              enter="transition duration-300 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-200 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <div className="bg-white rounded w-full max-w-md mx-auto z-20 p-6 flex flex-col items-center">
                <HiCheck className="h-24 w-24 text-green-700 rounded-full border-4 border-green-700 p-3" />
                <Dialog.Title className="font-semibold text-md text-center mt-4 mb-2">
                  Pendaftaran berhasil!
                </Dialog.Title>
                <Dialog.Description className="mx-2 text-sm text-green-700">
                  Pendaftaran telah berhasil. Periksa e-mail atau Whatsapp
                  secara berkala untuk informasi lebih lanjut.
                </Dialog.Description>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="h-0 w-0"
                ></button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
