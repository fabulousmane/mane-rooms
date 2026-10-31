# Mane Rooms

Mane Rooms is a responsive university room-booking web prototype. This is a standalone assignment project; it is not part of or dependent on the original classroom-reservation-system repository.

## Run the project

No package installation is needed. Open `index.html` in a modern browser, or start a local server from this folder:

```powershell
python -m http.server 8765
```

Then visit <http://localhost:8765>.

## Features

- Responsive landing page with booking guidelines, room tiers, and FAQ.
- Search form for date, time, duration, group size, and equipment.
- Air conditioning in every room, plus a recreation room with a PS5 and board/card games, and a 10-person private cinema.
- Recreation-room bookings require at least 5 people and support groups up to its 15-person capacity.
- Recreation-room access is limited to Levels 300–500; the private cinema is for Level 500 students and staff.
- A demo account selector lets you preview booking access as a Level 100–500 student, or as staff.
- Room cards show amenities, and filters can find rooms by equipment or games.
- Level-aware student room access and a faculty-priority view.
- Booking review and confirmation, reservation modification, and cancellation.
- A decorative, non-scannable demo access pass, booking-conflict recommendations, and empty states.
- Offline banner and keyboard-accessible Campus Runner mini-game.

## Presentation guide

See [PRESENTATION-GUIDE.md](./PRESENTATION-GUIDE.md) for a detailed walkthrough of the interface, code structure, demo flows, and limitations, with speaker notes for a presentation.

## Demo data

This is a front-end prototype. Reservations are sample data stored in browser memory and do not persist after reloading. There is no live university account, booking service, or database connected.

Room availability is illustrative sample data: changing the date or time does not recalculate availability. The access-pass pattern is visual only and cannot be scanned.

The recreation room's 5-person minimum, 15-person capacity, and room access rules are enforced in the prototype interface only; a production booking service would need to validate them on the server as well. The account selector is a demo control, not authentication.
