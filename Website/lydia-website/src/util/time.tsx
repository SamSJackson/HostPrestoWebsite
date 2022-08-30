export function changeDateTimezone(date : Date, timeZone : string) : Date {
    return new Date(
        date.toLocaleString('en-US', {timeZone}),
    );
}

export function parseDateToISO(timeZone : string) : string {
    const dateNow = changeDateTimezone(new Date(), timeZone);
    const [month, day, year] = [dateNow.getMonth() + 1, dateNow.getDate(), dateNow.getFullYear()];
    const [hour, minutes, seconds] = [dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds()];
    const isoString = year + "-" + month + "-" + day + "T" + hour + ":" + minutes + ":" + seconds;
    return isoString
}


export function formatTime(date : Date) : string {
    const [month, day, year] = [(date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1), date.getDate(), date.getFullYear()];
    const [hour, minutes] = [date.getHours(), (date.getMinutes() < 10 ? '0':'' ) + date.getMinutes()];
    const formattedTime = day + "/" + month + "/" + year + " " + hour + ":" + minutes; 
    return formattedTime;
}