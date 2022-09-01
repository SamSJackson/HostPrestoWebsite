export function formatTime(date : Date) : string {
    const [month, day, year] = [(date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1), (date.getDate() + 1 < 10 ? '0' : '') + (date.getDate() + 1), date.getFullYear()];
    const [hour, minutes] = [date.getHours(), (date.getMinutes() < 10 ? '0':'' ) + date.getMinutes()];
    const formattedTime = day + "/" + month + "/" + year + " " + hour + ":" + minutes; 
    return formattedTime;
}