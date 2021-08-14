import { ErrorMessage } from 'formik';

export default function RadioInput({ setFieldValue }) {
  return (
    <div>
      <h2 className="font-medium mb-2">
        Dari mana anda mendapatkan info event ini?
      </h2>

      <ErrorMessage
        component="div"
        name="info"
        className="text-red-600 text-sm mb-2"
      />

      <div className="space-y-2">
        <div>
          <label className="radio">
            <input
              type="radio"
              name="info"
              className="radio__input"
              value="Instagram"
              onInput={() => {
                setFieldValue('info', 'Instagram');
              }}
            />
            <div className="radio__radio"></div>
            Instagram
          </label>
        </div>

        <div>
          <label className="radio">
            <input
              type="radio"
              name="info"
              className="radio__input"
              value="Whatsapp"
              onInput={() => {
                setFieldValue('info', 'Whatsapp');
              }}
            />
            <div className="radio__radio"></div>
            Whatsapp
          </label>
        </div>

        <div>
          <label className="radio">
            <input
              type="radio"
              name="info"
              className="radio__input"
              value="Teman"
              onInput={() => {
                setFieldValue('info', 'Teman');
              }}
            />
            <div className="radio__radio"></div>
            Teman
          </label>
        </div>

        <div className="flex items-center">
          <label className="radio">
            <input
              id="Lainnya"
              type="radio"
              name="info"
              className="radio__input"
              onInput={() => {
                setFieldValue(
                  'info',
                  document.getElementById('Lainnya_text').value
                );
              }}
            />
            <div className="radio__radio"></div>
          </label>
          <input
            id="Lainnya_text"
            type="text"
            className="ring-1 ring-gray-400 outline-none flex-1 pl-1 py-1 cursor-pointer"
            placeholder="Lainnya"
            onInput={(event) => {
              const radio = document.getElementById('Lainnya');
              radio.checked = true;
              setFieldValue('info', event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
