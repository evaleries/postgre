import { FaWhatsapp } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

function Button({ Icon }) {
  return (
    <div className="p-2 bg-white rounded-full cursor-pointer border-2 border-black/5 shadow-lg hover:scale-105 active:scale-100 active:bg-gray-200">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
  );
}

export default function FloatingButton() {
  return (
    <div className="fixed bottom-4 right-2 sm:bottom-6 sm:right-4 space-y-4 z-50">
      <Button Icon={FiMail} />
      <Button Icon={FaWhatsapp} />
    </div>
  );
}
