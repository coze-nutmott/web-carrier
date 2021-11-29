import { ITimestamp } from 'common/type';
import { parseDate } from 'shared/util/date';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import { Korean } from 'flatpickr/dist/l10n/ko';

interface IProps {
  value: Date | null | undefined;
  reservationTime?: ITimestamp;
  onChange: (date: Date) => void;
}

export default function DatetimeInput({
  value,
  reservationTime,
  onChange,
}: IProps) {
  const dateTime =
    value || (reservationTime ? parseDate(reservationTime) : parseDate());

  return (
    <>
      <Flatpickr
        data-enable-time
        value={dateTime}
        options={{ locale: Korean, time_24hr: true }}
        onChange={([changedValue]) => {
          onChange(changedValue);
        }}
      />
      <style global>{`
        input.flatpickr-input {
          border: 1px solid #d0d0d0;
          border-radius: 2px;
          padding: 14px 16px;
          color: #a0a0a0;
          outline: 0;
          width: 100%;
        }
      `}</style>
    </>
  );
}
