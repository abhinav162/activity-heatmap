import React, { useMemo } from 'react';
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';
import './Calender.scss';

const DayNames = {
    1: 'Mon',
    3: 'Wed',
    5: 'Fri',
};

const MemoCell = React.memo(({ color, value, date }) => {
    const formattedDate = useMemo(() => moment(date).format('DD-MM-YYYY'), [date]);

    const style = useMemo(() => ({
        backgroundColor: value !== 0 ? color : '',
    }), [color, value]);

    const tooltipStyle = {
        backgroundColor: "#555",
        letterSpacing: "0.5px",
        padding: "5px 10px",
    }

    return (
        <Tooltip
            title={`${value} Activities on ${formattedDate}`}
            placement='top'
            componentsProps={{
                tooltip: {
                    sx: tooltipStyle,
                },
            }}
            arrow
            disableInteractive
        >
            <div className='timeline-cells-cell' style={style}></div>
        </Tooltip>
    );
});

const MemoMonth = React.memo(({ startDate, index }) => {
    const date = useMemo(() => moment(startDate).add(index * 7, 'day'), [startDate, index]);
    const monthName = useMemo(() => date.format('MMM'), [date]);

    return <div className={`timeline-months-month ${monthName}`}>{monthName}</div>;
});

const MemoWeekDay = React.memo(({ dayIndex }) => {
    return <div className='timeline-weekdays-weekday'>{DayNames[dayIndex]}</div>;
});

function Timeline({ activityHistory, year, colorFunc }) {
    let startDate = moment().set('year', year).startOf('year');
    // let endDate = year === moment().get('year') ? moment().add(1, 'days') : moment().set('year', year).endOf('year').add(1, 'days')
    let endDate = moment().set('year', year).endOf('year').add(1, 'days');
    const range = [startDate, endDate];

    let data = Array.from(activityHistory).map((item) => {
        return {
            date: moment(item.date),
            value: item.count
        };
    });

    const days = Math.abs(range[0].diff(range[1], 'days'));
    const cells = useMemo(() => Array.from({ length: days }), [days]);
    const weekDays = useMemo(() => [1, 3, 5], []); // Mon, Wed, Fri

    const months = useMemo(() => Array.from({ length: Math.floor(days / 7) }), [days]);

    const min = useMemo(() => Math.min(0, ...data.map(d => d.value)), [data]);
    const max = useMemo(() => Math.max(...data.map(d => d.value)), [data]);
    const colorMultiplier = useMemo(() => 1 / (max - min), [max, min]);
    // const startDate = useMemo(() => range[0], [range]);

    return (
        <div className="component_ActivityCalender">
            <div className='timeline'>
                <div className="timeline-months">
                    {months.map((_, index) => (
                        <MemoMonth key={index} index={index} startDate={startDate} />
                    ))}
                </div>

                <div className="timeline-body">
                    <div className="timeline-weekdays">
                        {weekDays.map((dayIndex, index) => (
                            <MemoWeekDay key={index} dayIndex={dayIndex} />
                        ))}
                    </div>

                    <div className="timeline-cells">
                        {cells.map((_, index) => {
                            const date = useMemo(() => moment(startDate).add(index, 'day'), [startDate, index]);
                            const dataPoint = useMemo(() => data.find(d => moment(date).isSame(d.date, 'day')), [data, date]);
                            const value = useMemo(() => dataPoint ? dataPoint.value : 0, [dataPoint]);
                            const alpha = useMemo(() => Math.max(colorMultiplier * dataPoint?.value, 0.4), [colorMultiplier, dataPoint]);
                            const color = useMemo(() => colorFunc({ alpha }), [colorFunc, alpha]);

                            return (
                                <MemoCell
                                    key={index}
                                    date={date}
                                    color={color}
                                    value={value}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Timeline;
