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
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label htmlFor={field.name} className="font-medium">
          {label}
        </label>
        <ErrorMessage
          component="div"
          name={field.name}
          className="text-red-600 text-xs ml-2 text-right"
        />
      </div>
      <div className="relative flex items-center">
        <input
          id={field.name}
          {...field}
          {...props}
          autoComplete="off"
          className={`flex-1 pl-3 pr-8 py-2 ring-1 ${
            meta.touched && meta.error
              ? 'ring-red-400 bg-red-100'
              : 'ring-gray-400 bg-transparent'
          }`}
        />
        <Icon className="h-8 w-8 p-1 text-gray-400 absolute right-0" />
      </div>
    </div>
  );
}

export default function TextInput() {
  return (
    <>
      <InputField
        name="nama"
        label="Nama"
        type="text"
        placeholder="Masukkan nama lengkap"
        Icon={HiOutlineUser}
      />
      <InputField
        name="email"
        label="E-mail"
        type="text"
        placeholder="Masukkan alamat e-mail"
        Icon={HiOutlineMail}
      />
      <InputField
        name="asal"
        label="Instansi"
        type="text"
        placeholder="Masukkan asal instansi"
        Icon={HiOutlineAcademicCap}
      />
      <InputField
        name="whatsapp"
        label="Whatsapp"
        type="text"
        placeholder="Masukkan nomor whatsapp"
        Icon={FaWhatsapp}
      />
    </>
  );
}
