import axios from 'axios';

import { generateID } from '../util/guid';
import { Status } from '../constants/Status';

const ct = require('countries-and-timezones');

const BASE_URL = "https://lydiabroadley.com/api";
// const BASE_URL = "http://localhost:3001/api"

const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;
const country = ct.getCountriesForTimezone(tzid)[0].name;

export async function login_confirm(stringId : string) : Promise<boolean> {
    const url = BASE_URL + '/login/check';
    return await axios.post(url, {stringId}).then(response => response.data);
}

export async function login(username : string, password : string) : Promise<string> {
    const url = BASE_URL + '/login';
    return await axios.post(url, {username, password}).then(response => response.data)
    .catch((error) => {
        console.log(`Error: ${error}`);
        return new Promise((resolve, reject) => {
            resolve("");
            reject("");
        })
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
                createdAt: new Date(response.data[i].createdAt),
                createdWhere: response.data[i].createdWhere,
              };
            statusArray.push(transformedStatus);
        };
    }).catch((error) => {
        console.log(`Error: ${error}`);
    });
    return new Promise((resolve, reject) => {
        resolve(statusArray);
        reject([]);
    });
};

export async function addStatus(text : string, author : string) : Promise<Status> {
    const DEFAULT_STATUS = {
        _id: generateID(),
        text: "",
        author: "",
        createdAt: new Date(),
        createdWhere: "",
    } as Status;
    const url = BASE_URL + "/statuses/add";
    await axios.post(url, {
        id: generateID(),
        text: text,
        author: author, 
        createdAt: (new Date()).toISOString(),
        country: country,
    }).then((response) => {
        DEFAULT_STATUS._id = response.data._id;
        DEFAULT_STATUS.text = response.data.text;
        DEFAULT_STATUS.author = response.data.author;
        DEFAULT_STATUS.createdAt = new Date(response.data.createdAt);
        DEFAULT_STATUS.createdWhere = response.data.createdWhere;
    }).catch((error) => {
        console.log(`Error: ${error}`);
    });
    return new Promise((resolve, reject) => {
        resolve(DEFAULT_STATUS);
        reject(DEFAULT_STATUS);
    });
}

export async function deleteStatus(statusId: number) {
    const url = BASE_URL + '/statuses/delete';
    await axios.post(url, {
        statusId
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(`Error: ${error}`);
    });
}