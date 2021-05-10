import { UserDetails } from "../shared/types";


async function getUserDetails(): Promise<UserDetails> {
    const url = "/api/get_user_details";
    return fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("issue with the getUserDetails call.");
            }
        })
}

export { getUserDetails };