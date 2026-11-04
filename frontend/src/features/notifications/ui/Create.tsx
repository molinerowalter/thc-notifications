import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from '@/components/form'
import type { WebNotificationForm } from "@/features/notifications/types";
import { createNotification } from "@/features/notifications/services";
import { useAuth } from "@/features/login/hooks/useAuth";

interface CreateNotificationFormProps {
  open: boolean;
  onClose: () => void;
}

export const CreateNotificationForm = ({ open, onClose }: CreateNotificationFormProps) => {
  const { control, handleSubmit, watch } = useForm<WebNotificationForm>({
    defaultValues: {
      channel: "EMAIL"
    },
  });
  const { username } = useAuth();

  const channel = watch("channel");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const onSubmit = async (data: any) => {
    let response;
    try {
      response = await createNotification({ ...data, sender: username });
    } catch (err) {
      console.log("Error creating notification: ", err);
    } finally {
      console.log("Notification created: ", response);
      onClose();
    }
  }

  return (
    <div
      className={`create-notification-form ${open ? 'visible' : 'hidden'}`}
      role="dialog"
      aria-modal={open}
      aria-hidden={!open}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <Form
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        submitButtonTxt="Create & Send"
      >
        <Form.Title title="Create Notification" subtitle="Fill in the form below to create and send a new notification" />
        <Form.Fields id={`${channel === "SMS" ? "notifications.sms" : "notifications.web"}`} control={control} />
      </Form> 
    </div>
  )
}