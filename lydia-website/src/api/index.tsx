import axios from 'axios';

import { generateID } from '../util/guid';
import { changeDateTimezone, parseDateToISO } from '../util/time';
import { Status } from '../constants/Status';

const ct = require('countries-and-timezones');

const BASE_URL = "http://localhost:3001/api";

const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;
const country = ct.getCountriesForTimezone(tzid)[0].name;


export async function addStatus(text : string, author : string) : Promise<Status> {
    const DEFAULT_STATUS = {} as Status;
    const url = BASE_URL + "/statuses/add";
    await axios.post(url, {
        id: generateID(),
        text: text,
        author: author, 
        createdAt: parseDateToISO(tzid).slice(0, 19).replace('T', ' '), 
        country: country,
    }).then((response) => {
        DEFAULT_STATUS._id = response.data._id;
        DEFAULT_STATUS.text = response.data.text;
        DEFAULT_STATUS.author = response.data.author;
        DEFAULT_STATUS.createdAt = new Date(response.data.createdAt);
        DEFAULT_STATUS.createdWhere = response.data.createdWhere;
    }).catch((error) => {
        console.log(error);
    });
    return new Promise((resolve, reject) => {
        resolve(DEFAULT_STATUS);
        reject(DEFAULT_STATUS);
    });
}

export async function getStatuses() : Promise<Status[]> {
    const url = BASE_URL + '/statuses';
    const statusArray : Status[] = [];
    await axios.get(url).then((response) => {
        for (var i = 0; i < response.data.length; i++) {
            const transformedStatus: Status = {
                _id: response.data[i].id,
                text: response.data[i].text,
                author: response.data[i].author,
                createdAt: changeDateTimezone(response.data[i].createdAt, tzid),
                createdWhere: response.data[i].createdWhere,
              };
            statusArray.push(transformedStatus);
        };
    });
    return new Promise((resolve, reject) => {
        resolve(statusArray);
        reject([]);
    });
}

export async function deleteStatus(statusId: number) {
    const url = BASE_URL + '/statuses/delete';
    await axios.post(url, {
        statusId
    }).then((response) => {
        console.log("Success");
    }).catch((error) => {
        console.log(error);
    });
}