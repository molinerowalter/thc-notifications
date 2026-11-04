import { Button } from "@/common/components/button";
import { Pagination } from "@/common/components/pagination"
import { Textarea } from "@/common/components/textarea";
import { Toast } from "@/common/components/toast";

import { useEffect, useState } from "react";
import NotificationsTable from "@/features/notifications/ui/Table"
import { useLoggedUser } from "@/features/login/hooks/useUser"
import { CreateNotificationForm } from "@/features/notifications/ui/Create"

const NotificationHistory = () => {
	const { userData } = useLoggedUser()
	const [openForm, setOpenForm] = useState(false);

	if (!userData) {
		return null
	}

	const { 
			'first-name': first_name,
			'last-name': last_name,
			email,
			sent,
			received 
	} = userData;

	const fullNotificationsList = sent.concat(received);

	return (
		<>
			<nav className="page-header">
				<h1 className="page-title">Welcome Back {first_name} {last_name}!</h1>
				<p className="page-subtitle">{email}</p>
			</nav>
			<section className="page-section">
				<div className="data-panel">
					<NotificationsTable
						notifications={fullNotificationsList}
					/>
				</div>
				<div className="page-toolbar">
					<Button onClick={() =>setOpenForm(!openForm)} className="btn-primary">Create Notification</Button>
					<CreateNotificationForm open={openForm} onClose={() => setOpenForm(false)} />
				</div>
			</section>
		</>
	)
}

export default NotificationHistory;