import type { Notification, FirebaseTokenBody } from "../types";
import api from "@/common/services";

export const createNotification =  (notification: Notification) => {
    return api.post(`api/notifications/`, notification).then(result  => {
        console.log("result after create notification: ", result)
    }).catch(error => {
        console.log("error after create notification: ", error)
        throw error
    })
}

export const saveFirebaseToken = (body: FirebaseTokenBody) => {
    return api.post(`api/notifications/push-token`, body).then(result  => {
        console.log("create firebase: ", result)
    }).catch(error => {
        console.log("error after create notification: ", error)
        throw error
    })
}