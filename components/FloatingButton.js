import { FaWhatsapp } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

function Button({ Icon, onClick }) {
  return (
    <div
      className="p-2 bg-white rounded-full cursor-pointer border-2 border-black/5 shadow-lg hover:scale-105 active:scale-100 active:bg-gray-200 mb-4 transition-transform"
      onClick={onClick}
    >
      <Icon className="h-7 w-7 text-blue-600" />
    </div>
  );
}

export default function FloatingButton() {
  return (
    <div className="fixed bottom-4 right-2 sm:right-4 z-50">
      <a href="#footer">
        <Button Icon={FiMail} />
      </a>
      <a href="#footer">
        <Button Icon={FaWhatsapp} />
      </a>
    </div>
  );
}
