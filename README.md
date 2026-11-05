### Notifications Delivery - Take Home Challenge

**- This project it was developed to solve the following takehome challenge:**

Vas a desarrollar un sistema básico de gestión de Notificaciones para usuarios autenticados.
El sistema debe permitir que cada usuario pueda gestionar y enviar notificaciones por distintos
canales.

 > Full challenge details can be found in takehome-challenge.txt

## REQUIREMENTS AND BUILD

1. Clean ports **5173**, **8000** & **5432**
2. Install docker if you don't have it and run `docker compose up` on your terminal.

## CONSIDERATIONS

# Backend

*APPLIED*
1. Built with Python, FastAPI and SQLAlchemy
2. Clean Code Architecture To guarantee code extensibility
3. Factory and Strategy Design pattern's to create and send notifications.

*TODOs*
1. Pagination for notifications
2. Edit notifications: As far as I understood an edit over a notification already created will trigger a new notification. 

> It should be a new Post instead of a Patch. Or in the other way this could be a HUGE error regarding to UX.

# Frontend

*APPLIED*
1. Stack: Vite, ReactJS, TypeScript, Tailwind, Shadcn
2. Vertical Slice Arquitecture.
3. ComponentCompound, Hooks

*TODOs*
- HTML Sanitizer on inputs
- Pagination when listing notifications
- Virtual windowing