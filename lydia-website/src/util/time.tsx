export function changeDateTimezone(date : Date, timeZone : string) : Date {
    return new Date(
        date.toLocaleString('en-US', {timeZone}),
    );
}

export function convertDateToUTC(date : Date) : Date { 
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), 
    date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
}

export function parseDateToISO(timeZone : string) : string {
    const dateNow = new Date();
    const [month, day, year] = [dateNow.getMonth() + 1, dateNow.getDate(), dateNow.getFullYear()];
    const [hour, minutes, seconds] = [dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds()];
    const isoString = year + "-" + month + "-" + day + "T" + hour + ":" + minutes + ":" + seconds;
    return isoString
}


export function formatTime(date : Date) : string {
    const [month, day, year] = [(date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1), (date.getDate() + 1 < 10 ? '0' : '') + (date.getDate() + 1), date.getFullYear()];
    const [hour, minutes] = [date.getHours(), (date.getMinutes() < 10 ? '0':'' ) + date.getMinutes()];
    const formattedTime = day + "/" + month + "/" + year + " " + hour + ":" + minutes; 
    return formattedTime;
}