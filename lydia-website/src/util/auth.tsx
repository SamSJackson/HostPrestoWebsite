import { login_confirm } from "../api";

export type UserInfo = {
    auth_id : string;
    username : string;
}

export function getAuthName() : string {
    const auth_id = window.localStorage.getItem("auth_id");
    return auth_id === null ? "" : auth_id;
}

export async function getAuthId() {
    const auth_id_local = window.localStorage.getItem("auth_id");
    if (auth_id_local === null) { return ""; }

    const {authentic, auth_id, username} = await login_confirm(auth_id_local);
    return authentic ? {auth_id, username} : {auth_id:"", username:""};
}