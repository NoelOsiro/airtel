import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const daysOfWeek = [
  { full: "Sunday", short: "Sun" },
  { full: "Monday", short: "Mon" },
  { full: "Tuesday", short: "Tue" },
  { full: "Wednesday", short: "Wed" },
  { full: "Thursday", short: "Thur" },
  { full: "Friday", short: "Fri" },
  { full: "Saturday", short: "Sat" }
];

const calendarDays = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31, null, null, null, null] // Use null for empty days
];

const Calendar = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Calendar" />

      {/* <!-- ====== Calendar Section Start ====== --> */}
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              {daysOfWeek.map((day) => (
                <th key={day.short} className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                  <span className="hidden lg:block">{day.full}</span>
                  <span className="block lg:hidden">{day.short}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendarDays.map((week, weekIndex) => (
              <tr key={weekIndex} className="grid grid-cols-7">
                {week.map((day, dayIndex) => (
                  <td key={dayIndex} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                    {day ? (
                      <>
                        <span className="font-medium text-black dark:text-white">{day}</span>
                        {/* Example event */}
                        {day === 25 && (
                          <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
                            <span className="group-hover:text-primary md:hidden">More</span>
                            <div className="event invisible absolute left-2 z-99 mb-1 flex w-[300%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-[290%] md:opacity-100">
                              <span className="event-name text-sm font-semibold text-black dark:text-white">App Design</span>
                              <span className="time text-sm font-medium text-black dark:text-white">25 Dec - 27 Dec</span>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="font-medium text-black dark:text-white"></span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <!-- ====== Calendar Section End ====== --> */}
    </div>
  );
};

export default Calendar;
