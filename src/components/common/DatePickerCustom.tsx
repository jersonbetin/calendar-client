import { Input } from '@nextui-org/react';
import moment from 'moment';
import DateTimePicker from 'react-tailwindcss-datetimepicker';
// import 'react-tailwindcss-datetimepicker/style.css';

const DatePickerCustom = ({ start, end }: { start: Date; end: Date }) => {
  const now = new Date();
  return (
    <div className="relative w-full">
      <DateTimePicker
        ranges={
          {
            Today: [start, end],
            'Last 30 Days': [
              new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                now.getDate(),
                0,
                0,
                0,
                0,
              ),
              new Date(end),
            ],
          }
        }
        twelveHoursClock
        displayMaxDate
        classNames={{ rootContainer: '!z-[100000]' }}
        start={start}
        end={end}
        applyCallback={(startDate: Date, endDate: Date) =>
          console.log(startDate, endDate)
        }
      >
        <Input
          label="Fecha"
          type="text"
          isReadOnly
          value={`${moment(start).format('DD/MM/YYYY hh:mm:ss')} - ${moment(
            end,
          ).format('DD/MM/YYYY hh:mm:ss')}`}
        />
      </DateTimePicker>
    </div>
  );
};

export default DatePickerCustom;
