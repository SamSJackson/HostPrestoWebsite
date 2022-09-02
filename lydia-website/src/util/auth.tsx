import { login_confirm } from "../api";

export function getAuthName() : string {
    const auth_id = window.localStorage.getItem("auth_id");
    return auth_id === null ? "" : auth_id;
}

export async function getAuthId() {
    const auth_id = window.localStorage.getItem("auth_id");
    if (auth_id === null) { return ""; }

    const authentic = await login_confirm(auth_id);
    return authentic ? auth_id : "";
}