import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/table"

import { useAuth } from "@/features/login/hooks/useAuth"
import { type NotificationsTableProps } from "../types"



const NotificationsTable = ({ notifications }: NotificationsTableProps) => {
  const { username } = useAuth()

  return (
    <Table className="data-table">
      <TableCaption className="table-caption">A list of your recent Notifications</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="table-head table-col-date">Date</TableHead>
          <TableHead className="table-head">Channel</TableHead>
          <TableHead className="table-head">Sender</TableHead>
          <TableHead className="table-head table-head-end">Recipient</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          notifications.map(notification => {
            return (
            <TableRow className="data-row" key={notification.id}>
              <TableCell className="table-cell-strong">{new Date(notification.created_at).toLocaleString()}</TableCell>
              <TableCell>
                <span className={`channel-pill channel-${notification.channel}`}>
                  {notification.channel}
                </span>
              </TableCell>
              <TableCell>
                <span className={notification.sender === username ? "who-self" : "who-other"}>
                  {notification.sender === username ? "YOU" : notification.sender}
                </span>
              </TableCell>
              <TableCell className="table-cell-end">
                <span className={notification.recipient === username ? "who-self" : "who-other"}>
                  {notification.recipient === username ? "YOU" : notification.recipient}
                </span>
              </TableCell>
            </TableRow>
          )
          })
        }
      </TableBody>
    </Table>
  )
}

export default NotificationsTable