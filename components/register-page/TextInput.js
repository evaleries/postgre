import { useField, ErrorMessage } from 'formik';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineAcademicCap,
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

function InputField({ label, Icon, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="space-y-1">
      <label htmlFor={field.name} className="font-medium">
        {label}
      </label>
      <div
        className={`flex items-center ring-1 rounded-sm overflow-hidden ${
          meta.touched && meta.error ? 'ring-red-400' : 'ring-gray-300'
        }`}
      >
        <div className="p-2 text-gray-600 bg-gray-100">
          <Icon className="h-5 w-5" />
        </div>
        <input
          id={field.name}
          {...field}
          {...props}
          type="text"
          autoComplete="off"
          className="flex-1 p-1 outline-none text-sm sm:text-base"
        />
      </div>
      <ErrorMessage
        component="div"
        name={field.name}
        className="text-red-500 text-sm"
      />
    </div>
  );
}

export default function TextInput() {
  return (
    <>
      <InputField
        name="nama"
        label="Nama"
        placeholder="Masukkan nama lengkap"
        Icon={HiOutlineUser}
      />
      <InputField
        name="email"
        label="E-mail"
        placeholder="Masukkan alamat e-mail"
        Icon={HiOutlineMail}
      />
      <InputField
        name="asal"
        label="Instansi"
        placeholder="Masukkan asal instansi"
        Icon={HiOutlineAcademicCap}
      />
      <InputField
        name="whatsapp"
        label="Whatsapp"
        placeholder="Masukkan nomor whatsapp"
        Icon={FaWhatsapp}
      />
    </>
  );
}
