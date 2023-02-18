export const createCalendar = async (
    startTime: string,
    endTime: string,
    avarageTime: string
) => {
    var days = [];
    var times = [];
    var result = [];
    for (let i = 0; i < 7; i++) {
        let DATE = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() + i
        );
        let month =
            DATE.getMonth() + 1 >= 10
                ? DATE.getMonth() + 1
                : '0' + (DATE.getMonth() + 1);

        let day = DATE.getDate() >= 10 ? DATE.getDate() : '0' + DATE.getDate();
        days.push(`${month}.${day}`);
    }
    let count =
        (Number(endTime.split(':')[0]) * 60 +
            Number(endTime.split(':')[1]) -
            Number(startTime.split(':')[1]) -
            Number(startTime.split(':')[0]) * 60) /
        Number(avarageTime);

    var sTime = [
        Number(startTime.split(':')[0]),
        Number(startTime.split(':')[1]),
    ];
    var aTime = Number(avarageTime);

    for (let i = 0; i < count; i++) {
        times.push({
            startTime:
                sTime[1] != 0 ? sTime[0] + ':' + sTime[1] : sTime[0] + ':00',
            endTime:
                sTime[1] + aTime == 60
                    ? 1 + sTime[0] + ':00'
                    : sTime[1] + aTime > 60
                    ? 1 + sTime[0] + ':' + (sTime[1] + aTime - 60)
                    : sTime[0] + ':' + (sTime[1] + aTime),
        });

        if (sTime[1] + aTime >= 60) {
            sTime[0] += 1;
            sTime[1] = sTime[1] + aTime - 60;
        } else {
            sTime[1] = sTime[1] + aTime;
        }
    }

    days.forEach((day) => {
        times.forEach((time) => {
            result.push({
                day: day,
                startTime: time.startTime,
                endTime: time.endTime,
            });
        });
    });

    return result;
};
