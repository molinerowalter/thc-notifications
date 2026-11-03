import type { Notification } from "../types";
import api from "@/common/services";

export const createNotification =  (notification: Notification) => {
    return api.post(`api/notifications/`, notification).then(result  => {
        console.log("result after create notification: ", result)
    }).catch(error => {
        return error
    })
}