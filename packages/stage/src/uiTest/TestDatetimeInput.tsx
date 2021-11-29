import DatetimeInput from 'common/component/DatetimeInput';
import TestItem from 'shared/uiTest/component/TestItem';
import { Controller, useForm } from 'react-hook-form';

const RESERVATION_TIME = '2022-01-01T00:00:00';

export default function TestDatetimeInput() {
  const { control } = useForm();
  return (
    <TestItem title="DatetimeInput">
      <form>
        <div className="w-full">
          <Controller
            name="publishingDateTime"
            control={control}
            render={({ onChange, value }) => (
              <DatetimeInput
                onChange={onChange}
                value={value}
                reservationTime={RESERVATION_TIME}
              />
            )}
          />
        </div>
      </form>
    </TestItem>
  );
}
