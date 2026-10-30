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
- Search form for date, time, duration, capacity, and equipment.
- Level-aware student room access and a faculty-priority view.
- Booking review and confirmation, reservation modification, and cancellation.
- A decorative, non-scannable demo access pass, booking-conflict recommendations, and empty states.
- Offline banner and keyboard-accessible Campus Runner mini-game.

## Demo data

This is a front-end prototype. Reservations are sample data stored in browser memory and do not persist after reloading. There is no live university account, booking service, or database connected.

Room availability is illustrative sample data: changing the date or time does not recalculate availability. The access-pass pattern is visual only and cannot be scanned.
