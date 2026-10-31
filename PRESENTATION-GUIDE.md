# Mane Rooms — Presentation Guide

## What this guide is for

This guide is written to help you explain Mane Rooms in a live presentation. It covers both what a visitor sees and how the prototype is put together. The speaker notes can be read aloud or adapted to your own style.

## 1. Project overview

Mane Rooms is a responsive front-end prototype for finding and booking university rooms. It lets a visitor explore a sample campus, review room details, and try a booking flow.

The sample room catalog includes air conditioning in every space, a recreation room for Levels 300–500 with a 15-person capacity and 5-person minimum booking group, a PS5, chess, checkers, Monopoly, Whot, and Ace, and a private cinema for up to 10 people that is available to Level 500 students and staff.

The project is intentionally small and dependency-free: it uses HTML, CSS, and browser JavaScript rather than a front-end framework. It can be opened in a modern browser or served as static files. Google Fonts are requested by the page when internet access is available; system fonts are used as fallbacks.

**Important scope note:** this is a demonstration of the interface, not a live reservation system. It has no login, backend, database, or real-time availability service. Bookings exist only in the open browser page and disappear on reload.

### Speaker notes

> Mane Rooms is a small, standalone room-booking interface prototype. The purpose is to demonstrate the user experience—from searching for a suitable room to reviewing and managing a sample booking. The interface uses realistic examples, but it does not connect to a real university booking system.

## 2. The four project files

| File | Purpose | Presentation explanation |
| --- | --- | --- |
| `index.html` | The browser's entry point. | Loads the page metadata, stylesheet, and JavaScript. It contains two empty containers that JavaScript fills: the main app and the modal area. |
| `styles.css` | Visual design and responsive layout. | Defines the colors, typography, spacing, cards, buttons, illustrations, dialogs, and layouts for different screen widths. |
| `app.js` | Sample data, screen rendering, and interactions. | Holds the room catalog and current UI state, builds each screen, and responds to clicks, form changes, and keyboard input. |
| `README.md` | Setup and project notes. | Explains how to run the prototype and what its features and demo limitations are. |

### How the files work together

1. The browser opens `index.html`.
2. The HTML loads `styles.css` for appearance and `app.js` for behavior.
3. The JavaScript renders the first screen into the `#app` container.
4. CSS styles the markup produced by JavaScript.
5. When someone interacts with the page, JavaScript updates its in-memory state and renders the relevant screen again.

### Speaker notes

> The page is split into clear responsibilities. HTML starts the application, CSS controls how it looks, and JavaScript provides the sample data and interactions. Keeping the project in these small files makes the prototype easy to run and inspect.

## 3. Shared page elements

### Header and navigation

The header displays the Mane Rooms brand, navigation links, and a sample student profile. The links switch among the home, room-search, and bookings screens. At narrow screen widths, the full navigation is replaced with a menu button.

The account selector previews room access as a Level 100, 200, 300, 400, or 500 student, or as staff. These roles are illustrative demo state, not authenticated account information.

### Footer

The footer repeats the product name and provides the **Go offline** preview action. Choosing it opens a designed offline-state screen; it does not detect whether the device has actually lost its internet connection.

### Speaker notes

> The header keeps the main areas easy to reach, while the footer includes a way to preview the offline experience. The student identity and access level are mock data so the prototype can show what a signed-in experience might look like without implementing authentication.

## 4. Home screen

The home screen introduces the product and gives the visitor a starting point for the room-finding flow.

### Hero area

The hero introduces the idea of finding a campus space. It combines a large headline and short explanation with a CSS-built campus illustration. The illustration uses shapes and gradients in the stylesheet rather than a downloaded campus image.

### Quick search form

The form lets the visitor select:

- A date
- A start time
- A duration
- A minimum group size

The **Find a room** button opens the search-results screen. These selections are held in JavaScript state and shown again later in the prototype. They do **not** make a real availability query.

### Benefits and campus levels

The three benefit cards explain a simple journey: find a room, choose a space, and show up. The campus-level cards describe sample spaces for several student levels. A faculty note introduces the separate faculty-room preview.

### Frequently asked questions

The FAQ uses native expandable HTML sections. Each answer gives visitors a quick explanation of the sample policies, such as advance booking and check-in. These are informational examples and are not enforced by a service.

### Speaker notes

> The landing page explains the product before asking the visitor to do anything. The search form is deliberately familiar: date, time, duration, and group size are the first details a student would need. Below that, we introduce the room-access concept and answer common questions.

## 5. Room search and filters

The search screen shows the search form again and places filters beside a grid of room cards.

### Search form

The form reuses the same date, time, duration, and group-size fields as the home screen. Group size is an exact party count from 1 to 15; room results must have enough capacity, and booking records retain the selected count. The current values are retained while moving through the demo.

### Filters

The sample catalog can be narrowed by:

- Student level range
- Required equipment and games (projector, whiteboard, air conditioning, PS5, chess, checkers, Monopoly, Whot, or Ace)
- Exact group size, from 1 to 15 people
- Faculty-room mode
- A **No matches (preview)** checkbox that deliberately displays the empty state
- A demo account selector in the header to preview room access as a Level 100, 200, 300, 400, or 500 student, or as staff

The **Clear all** action resets the filters and group-size selection.

### Room cards

Each card presents a room's name, building/location, capacity, type, amenities, access requirement, sample availability label, and booking action. The recreation room is available only to students at Levels 300–500; it shows its 15-person capacity and 5-person minimum, and its booking button stays disabled unless both the account level and group size are eligible. The private cinema is available to Level 500 students and staff. A room can be marked unavailable or restricted in the sample data. The interface disables booking for restricted and unavailable rooms.

### Empty state

When filters produce no matches—or the preview checkbox is enabled—the page explains that no rooms were found and offers a way to clear the filters.

### What the filters mean

The capacity, level, amenity, and faculty-mode values are used to filter the local sample catalog. Date and time do not change the availability values. The availability labels are examples, not a schedule.

### Speaker notes

> The search page demonstrates how several filters can work together. For example, we can ask for five people and filter for the PS5 to find the recreation room. Use the account selector to show that Levels 300 through 500 can book it, while other accounts cannot. The private cinema is bookable by Level 500 students and staff. The displayed data is static sample data, so changing the date or time does not check a real calendar.

## 6. Booking review and confirmation

Selecting an enabled **Book now** button opens the review screen for that room. The review shows:

- The selected room and its location
- The sample booking date, time, and duration
- The room's access level
- The selected group size and, for the recreation room, its minimum party size
- A purpose selector
- A confirmation button

On confirmation, JavaScript creates a booking record in memory and shows the **My bookings** screen. This is a simulated confirmation: there is no server request, conflict check, or persistent record.

The **Simulate room taken** action opens a conflict-preview dialog and suggests sample alternatives. It is included to demonstrate how a conflict message could look, rather than to report a real race or reservation conflict.

### Speaker notes

> Before confirming, the visitor gets one final chance to review the important booking details and choose a purpose. The confirmation demonstrates the interaction and what a successful result might look like. In a production system, this step would send the request to a backend, which would validate availability and enforce booking rules.

## 7. My bookings

The bookings screen displays the sample bookings created during the current page session. Each booking includes its date, room, time, duration, and purpose.

### Modify

Choosing **Modify** loads the booking's current room and date/time into the editing flow. The purpose selection is also preserved. Saving replaces that booking's in-memory record.

### Demo pass

The **Demo pass** button opens a visual pass pattern and sample booking reference. The pattern is decorative: it is not a valid or scannable QR code and cannot be used for room access.

### Cancel

Choosing **Cancel** opens a confirmation dialog. Confirming removes the sample booking and displays a cancellation message.

That message describes a conceptual result. Since there is no backend, cancelling does not update the room catalog or release a real room.

### Empty-state preview

The **Show empty state** button clears the current in-memory bookings so the empty-bookings screen can be demonstrated. This is a preview control, not a normal customer-facing action.

### Speaker notes

> My bookings demonstrates the follow-up tasks a student expects: review a reservation, change it, or cancel it. The empty state gives us another useful presentation moment. Everything here is local to the current page session, so it is important to distinguish a prototype booking from a confirmed real-world reservation.

## 8. Dialogs and accessibility

The prototype uses dialogs for cancellation, the simulated booking conflict, and the demo pass. The dialog code:

- Gives the dialog an accessible name from its heading.
- Moves keyboard focus into the dialog when it opens.
- Keeps Tab navigation inside the dialog.
- Closes the dialog with Escape.
- Returns focus to the control that opened it when it closes.

The interface also uses labels for form fields and visible keyboard-focus styling for interactive controls. These features help people navigate and understand the prototype with a keyboard or assistive technology.

### Speaker notes

> Accessibility is part of the interaction, not just the visual design. Forms have labels, keyboard focus is visible, and the dialogs can be opened, navigated, and dismissed without a mouse.

## 9. Offline preview and Campus Runner

The offline screen presents a sample offline message and a small keyboard-playable mini-game. Space or Arrow Up triggers a jump; the **Jump** button provides an on-screen alternative. The score and jump animation are managed in browser state.

The **Try to reconnect** button returns to the home screen. This is a UI preview only: the app does not monitor network connectivity, queue requests, or synchronize saved bookings.

### Speaker notes

> The offline screen shows how the product might respond when campus services are unavailable, and the mini-game adds a little personality. In this prototype, the offline state is entered manually to demonstrate the design; it does not represent actual network detection or data recovery.

## 10. How the JavaScript is organized

### Sample catalog and state

At the top of `app.js`, the `rooms` array describes the sample catalog. The `state` object tracks the active screen, selected room, current filters, search selections, bookings, and offline-game values.

This state is ordinary in-memory JavaScript data. There is no browser storage or remote API behind it.

### Screen-rendering functions

Functions such as `home()`, `search()`, `review()`, `bookings()`, `cancelled()`, and `offline()` return HTML strings for their screens. Smaller helpers like `header()`, `searchFields()`, and `roomCard()` reuse pieces of markup.

### Filtering and lookup helpers

`filteredRooms()` applies the current filters to the sample catalog. `roomById()` looks up a room when another part of the app has its numeric ID. These helpers keep the screen functions focused on presenting information.

### Rendering and navigation

`render()` chooses the screen based on `state.page`, combines it with the shared header and footer, and places the result into `#app`. `go()` updates the active page, calls `render()`, and scrolls to the top.

Because the prototype redraws the app after state changes, the state object is the source of truth for values that should remain selected across screens.

### Event handling

Instead of registering a separate click handler for every button, the app listens for clicks on the document and looks for `data-action` or `data-page` attributes. Separate delegated listeners handle form changes, form submissions, and keyboard actions.

For example:

1. A room button carries `data-action="book"` and a room ID.
2. The click handler saves that room ID in `state.selectedRoom`.
3. The handler navigates to the review screen.
4. Submitting the review form creates or updates the booking in `state.bookings`.
5. The app redraws the bookings screen.

### Speaker notes

> The JavaScript is organized around a small state object and a set of screen functions. When the visitor clicks or submits a form, an event handler updates that state and redraws the page. That pattern keeps this demo lightweight; a larger production application might use a framework and a dedicated data layer.

## 11. How the CSS is organized

The stylesheet starts with shared color and typography variables. These create a consistent brand palette and make global style changes easier.

The rest of the stylesheet groups visual rules by page components: header, hero, search forms, cards, filters, booking details, dialogs, and the offline game. The campus and room illustrations are mostly built from CSS gradients and pseudo-elements.

Two responsive breakpoints adjust the design:

- At widths up to 850 pixels, several multi-column layouts become simpler.
- At widths up to 600 pixels, navigation becomes a menu, cards stack vertically, and forms and booking rows adapt to a phone-sized screen.

### Speaker notes

> The CSS is component-oriented and uses shared design tokens for color and typography. The two breakpoints reshape the page for tablet and mobile sizes, while the custom illustrations keep the prototype self-contained and lightweight.

## 12. End-to-end demo walkthrough

This sequence is designed for a live presentation:

1. **Start on Home.** Introduce Mane Rooms and point out the search fields.
2. **Choose an account and group size.** Use the header selector to demonstrate eligible and ineligible accounts, then set five people for the recreation room.
3. **Select Find a room.** Show the results grid, point out that every room includes AC, and explain that availability is demo data.
4. **Try a game or room-type filter.** Choose PS5 to find the recreation room and show its Level 300–500 eligibility, 15-person capacity, 5-person minimum, and game list. Switch to Level 500 or Staff to demonstrate private-cinema access and its 10-person capacity.
5. **Preview an empty state.** Enable **No matches (preview)**, then use **Clear filters**.
6. **Book an enabled room.** Review the room, access level, date, and purpose.
7. **Confirm the sample booking.** Show how it appears under My bookings.
8. **Modify it.** Demonstrate that the purpose and booking values are retained in the edit flow.
9. **Open Demo pass.** State clearly that the pattern is decorative and not scannable.
10. **Cancel the booking.** Confirm the dialog, then show the cancellation message.
11. **Show the empty state.** With no bookings left, point out the prompt to find a room.
12. **Preview Offline.** Use the footer control; try Space, Arrow Up, or the Jump button, then reconnect.

You do not need to complete every step if presentation time is limited. The home-to-search-to-review-to-bookings sequence demonstrates the main user journey.

## 13. Limitations and production next steps

The following are intentionally outside the scope of this front-end prototype:

- **Authentication:** the profile and student level are fixed sample content.
- **Persistence:** bookings live in memory and reset on reload.
- **Real availability:** the selected date and time do not query or change the sample availability.
- **Booking rules:** there is no server-side access control, conflict prevention, cancellation policy enforcement, or booking limit.
- **Real access passes:** the displayed pattern is decorative, not a QR credential.
- **Real offline support:** the offline page is manually triggered; there is no network detection or sync.
- **Backend and database:** the prototype makes no API calls and has no database.

To turn the concept into a production system, the interface would need to connect to authenticated APIs and a database-backed service. That service would validate the user, check access rules and room availability, prevent overlapping reservations, save changes, and issue any real access credential.

### Speaker notes

> The most important takeaway is the boundary between the interface demo and the real system. The prototype communicates the intended experience, but the security, booking rules, persistence, and availability guarantees must live in a properly designed backend before real users can rely on it.

## 14. Running the project

No package installation is required. From the project folder, run:

```powershell
python -m http.server 8765
```

Then open <http://localhost:8765> in a modern browser. You can also open `index.html` directly, but a local server is a reliable way to serve the module-based JavaScript.

## 15. Closing summary

### Suggested closing

> Mane Rooms is a self-contained, responsive prototype that demonstrates the key parts of a university room-booking experience. Its screens and interactions are built with standard browser technologies and sample data. It is useful for discussing the user journey and design, while a future production version would require a secure backend for real accounts, availability, and bookings.
