import type { Notification } from "../types";

const getUserNotifications = (userName: string) => {
    return fetch(`users/${userName}/notifications`).then(result => {
        console.log("result: ", result)
        return result;
    }).catch(error => {
        return error
    });
}

const createNotification =  (notification: Notification) => {
    return fetch(`notifications/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
    }).then(result => {
        console.log("result after create notification: ", result)
    }).catch(error => {
        return error
    })
}


export default {
    getUserNotifications,
    createNotification
}