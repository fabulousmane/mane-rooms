const icon = (name) => {
  const paths = {
    building: '<path d="M3 21h18M5 21V7l8-4 8 4v14M9 10h1m4 0h1m-6 4h1m4 0h1m-6 7v-4h4v4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m16 0v-2a4 4 0 0 0-3-3.87M14 3.13a4 4 0 0 1 0 7.75"/><circle cx="10" cy="7" r="4"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    projector: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8m-4-4v4"/>',
    board: '<rect x="3" y="3" width="18" height="14" rx="1"/><path d="M7 21l5-4 5 4M8 8h8"/>',
    snow: '<path d="M12 2v20M4 6l16 12M20 6 4 18m4-14 4 3 4-3m-8 17 4-3 4 3"/>',
    arrow: '<path d="M5 12h14m-7-7 7 7-7 7"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.94 16.11a6 6 0 0 1 6.12 0M12 20h.01"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    sparkle: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Zm7 12 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z"/>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.sparkle}</svg>`;
};

const rooms = [
  { id: 1, name: "Willow Study Room", building: "Merritt Library · 2nd floor", capacity: 6, level: 100, type: "Group study", amenities: ["Whiteboard", "AC"], image: 1, available: true, time: "Available now" },
  { id: 2, name: "The Hartwell Seminar", building: "Hartwell Hall · Room 204", capacity: 12, level: 300, type: "Seminar", amenities: ["Projector", "Whiteboard", "AC"], image: 2, available: true, time: "Available now" },
  { id: 3, name: "Quiet Pod 08", building: "Merritt Library · 4th floor", capacity: 2, level: 300, type: "Quiet pod", amenities: ["AC"], image: 3, available: true, time: "Available at 2:30 PM" },
  { id: 4, name: "Innovation Lab", building: "Foundry Building · 1st floor", capacity: 8, level: 400, type: "Project lab", amenities: ["Projector", "Whiteboard", "AC"], image: 4, available: true, time: "Available now" },
  { id: 5, name: "Oak Research Suite", building: "Hawthorne Center · 5th floor", capacity: 4, level: 500, type: "Research suite", amenities: ["Projector", "AC"], image: 5, available: false, faculty: true, time: "Faculty priority" },
  { id: 6, name: "Faculty Commons", building: "Foundry Building · 3rd floor", capacity: 10, level: 500, type: "Faculty lounge", amenities: ["Whiteboard", "AC"], image: 6, available: false, faculty: true, time: "Faculty priority" },
  { id: 7, name: "Cedar Research Suite", building: "Hawthorne Center · 4th floor", capacity: 4, level: 500, type: "Research suite", amenities: ["Projector", "AC"], image: 5, available: true, time: "Available now" },
  { id: 8, name: "Mane Recreation Room", building: "Student Center · Recreation wing", capacity: 15, minimumBookingSize: 5, level: 300, minLevel: 300, maxLevel: 500, type: "Recreation", amenities: ["AC", "PS5", "Chess", "Checkers", "Monopoly", "Whot", "Ace"], image: 7, available: true, time: "Available now" },
  { id: 9, name: "Private Cinema", building: "Student Center · Cinema suite", capacity: 10, level: 500, staffAccess: true, type: "Private cinema", amenities: ["AC", "Projector"], image: 8, available: true, time: "Available now" },
];

const amenityOptions = ["Projector", "Whiteboard", "AC", "PS5", "Chess", "Checkers", "Monopoly", "Whot", "Ace"];

const today = new Date();
const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

const state = {
  page: "home",
  accountRole: "300",
  selectedRoom: null,
  modifyBookingId: null,
  bookings: [],
  filters: { level: "all", amenities: [], faculty: false, noResults: false },
  query: { date: localDate, time: "10:00", duration: "1 hour", groupSize: 2 },
  offline: false,
  gameScore: 0,
  gameJumping: false,
};

const app = document.querySelector("#app");
const modalRoot = document.querySelector("#modal-root");
const levelLabel = (level) => `Level ${level}+ only`;
const roomById = (id) => rooms.find((room) => room.id === Number(id));

function accountIsStaff() {
  return state.accountRole === "staff";
}

function accountLevel() {
  return accountIsStaff() ? null : Number(state.accountRole);
}

function roomAccessIssue(room) {
  const staff = accountIsStaff();
  const level = accountLevel();
  if (room.staffAccess) {
    if (staff || level === 500) return null;
    return "This room is available to Level 500 students and staff only.";
  }
  if (room.faculty && !staff) return "This room is reserved for staff.";
  if (staff && room.maxLevel) return `This room is available to Level ${room.minLevel}–${room.maxLevel} students only.`;
  if (!staff && room.minLevel && level < room.minLevel) return `This room is available from Level ${room.minLevel}.`;
  if (!staff && room.maxLevel && level > room.maxLevel) return `This room is available through Level ${room.maxLevel} only.`;
  if (!staff && room.level > level) return `This room is available from Level ${room.level}.`;
  return null;
}

function roomAccessLabel(room) {
  if (room.staffAccess) return "Level 500 or staff";
  if (room.faculty) return "Staff only";
  if (room.minLevel && room.maxLevel) return `Level ${room.minLevel}–${room.maxLevel} only`;
  return levelLabel(room.level);
}

function bookingIssue(room) {
  if (!room) return "Return to room search and choose an available room.";
  const accessIssue = roomAccessIssue(room);
  if (accessIssue) return accessIssue;
  if (!room.available) return "This room is currently unavailable.";
  const groupSize = Number(state.query.groupSize);
  if (groupSize > room.capacity) return `${room.name} can hold up to ${room.capacity} people. Choose a smaller group size or another room.`;
  if (room.minimumBookingSize && groupSize < room.minimumBookingSize) return `${room.name} requires at least ${room.minimumBookingSize} people per booking. Update the group size to continue.`;
  return null;
}

function header() {
  return `<header class="topbar">
    <a class="brand" href="#" data-page="home"><span class="brand-mark">${icon("building")}</span> Mane <span style="font-weight:500;color:#64748b">Rooms</span></a>
    <nav class="top-nav" id="top-nav" aria-label="Main navigation">
      <a href="#" class="nav-link ${state.page === "home" ? "active" : ""}" data-page="home">Home</a>
      <a href="#" class="nav-link ${state.page === "search" ? "active" : ""}" data-page="search">Find a room</a>
      <a href="#" class="nav-link ${state.page === "bookings" ? "active" : ""}" data-page="bookings">My bookings${state.bookings.length ? ` (${state.bookings.length})` : ""}</a>
    </nav>
    <div class="top-actions"><label class="level-pill account-select-label" for="account-role">✦ &nbsp;Access <select class="account-select" id="account-role" aria-label="Demo account access" data-account-role><option value="100" ${state.accountRole === "100" ? "selected" : ""}>Level 100</option><option value="200" ${state.accountRole === "200" ? "selected" : ""}>Level 200</option><option value="300" ${state.accountRole === "300" ? "selected" : ""}>Level 300</option><option value="400" ${state.accountRole === "400" ? "selected" : ""}>Level 400</option><option value="500" ${state.accountRole === "500" ? "selected" : ""}>Level 500</option><option value="staff" ${accountIsStaff() ? "selected" : ""}>Staff</option></select></label><span class="avatar" aria-label="${accountIsStaff() ? "Staff profile" : "Student profile"}">${accountIsStaff() ? "ST" : "JD"}</span><span class="profile-name">${accountIsStaff() ? "Staff account" : "Jordan Davis"}</span>
      <button class="mobile-menu" aria-label="Toggle navigation" aria-expanded="false" data-action="menu">${icon("menu")}</button>
    </div>
  </header>`;
}

function searchFields(prefix = "home") {
  return `<div class="field"><label for="${prefix}-date">Date</label><input id="${prefix}-date" data-query="date" type="date" value="${state.query.date}"></div>
    <div class="field"><label for="${prefix}-time">Start time</label><select id="${prefix}-time" data-query="time"><option>10:00</option><option>11:00</option><option>13:00</option><option>14:30</option><option>16:00</option></select></div>
    <div class="field"><label for="${prefix}-duration">Duration</label><select id="${prefix}-duration" data-query="duration"><option>1 hour</option><option>30 minutes</option><option>1.5 hours</option><option>2 hours</option><option>3 hours</option></select></div>
    <div class="field"><label for="${prefix}-group-size">Group size</label><select id="${prefix}-group-size" data-query="groupSize">${Array.from({ length: 15 }, (_, index) => index + 1).map((count) => `<option value="${count}">${count}</option>`).join("")}</select></div>`;
}

function home() {
  return `<main>
    <section class="hero"><div class="container">
      <div class="hero-grid">
        <div class="hero-copy"><span class="eyebrow">Your campus, your space</span><h1>A good place to <span>get things done.</span></h1>
          <p>From quiet study nooks to big ideas in motion. Find a room that fits your work, your team, and your level.</p>
          <div class="hero-meta"><span>${icon("check")} Book in a few clicks</span><span>${icon("check")} Free for students</span></div>
        </div>
        <div class="hero-art" aria-label="Illustration of the Mane campus"><div class="campus-card"><div class="campus-building"><div class="building-window"></div></div><div class="art-tree tree-left"></div><div class="art-tree tree-right"></div></div><div class="art-tag two">A little room to think ✦</div><div class="art-tag one">Spaces ready <strong>for you</strong></div></div>
      </div>
      <div class="search-panel"><form class="search-fields" data-form="search">${searchFields()}<button class="btn" type="submit">${icon("search")} Find a room</button></form></div>
    </div></section>
    <section class="section"><div class="container">
      <div class="section-heading"><div><span class="eyebrow">Easy as one, two, three</span><h2>Make room for good work</h2><p>Your next productive session is closer than you think.</p></div><a class="text-link" href="#" data-page="search">Browse spaces ${icon("arrow")}</a></div>
      <div class="steps-grid"><article class="step-card"><div class="step-icon">${icon("search")}</div><h3>Find your fit</h3><p>Search by time, group size, equipment, or the kind of work you want to do.</p></article><article class="step-card"><div class="step-icon">${icon("calendar")}</div><h3>Make it yours</h3><p>Choose an open room that matches your student level and book in a few clicks.</p></article><article class="step-card"><div class="step-icon">${icon("check")}</div><h3>Show up & get to it</h3><p>Your booking confirmation details are ready whenever you are.</p></article></div>
    </div></section>
    <section class="section" style="background:#fff"><div class="container"><div class="section-heading"><div><span class="eyebrow">Room access, at a glance</span><h2>Every level has a place</h2><p>Find spaces designed for where you are in your journey.</p></div></div>
      <div class="tiers"><article class="tier-card"><div class="tier-number">100</div><h3>Start somewhere</h3><p>Open study spaces & group rooms</p></article><article class="tier-card"><div class="tier-number">200</div><h3>Find your rhythm</h3><p>General study rooms & shared spaces</p></article><article class="tier-card"><div class="tier-number">300</div><h3>Go deeper</h3><p>Project labs & quiet study pods</p></article><article class="tier-card"><div class="tier-number">400</div><h3>Build big ideas</h3><p>Advanced labs & project spaces</p></article><article class="tier-card"><div class="tier-number">500</div><h3>Make discoveries</h3><p>Research suites & seminar rooms</p></article></div>
      <div class="guideline-strip">${icon("sparkle")} <span><strong>Faculty member?</strong> Executive rooms and faculty lounges are reserved for lecturers, with priority access.</span></div>
    </div></section>
    <section class="section"><div class="container"><div class="section-heading"><div><span class="eyebrow">Good to know</span><h2>A few quick answers</h2></div></div>
      <div class="faq-list"><details><summary>How far ahead can I book?</summary><p>You can reserve a room up to 14 days in advance. Most rooms can be booked for 30 minutes to 3 hours.</p></details><details><summary>What happens if I don't arrive?</summary><p>Please check in when you get to your room. Reservations not checked in within 15 minutes are released so another student can use the space.</p></details><details><summary>Can I change or cancel my reservation?</summary><p>Yes. You can modify or cancel an upcoming reservation from My bookings. Cancelling before your booking starts frees the room immediately.</p></details><details><summary>Why can't I book a particular room?</summary><p>Some spaces are reserved for advanced student levels or faculty. Each room card shows its access requirement before you book.</p></details></div>
    </div></section>
  </main>`;
}

function roomCard(room) {
  const accessIssue = roomAccessIssue(room);
  const locked = Boolean(accessIssue);
  const belowMinimum = room.minimumBookingSize && Number(state.query.groupSize) < room.minimumBookingSize;
  const status = room.faculty ? "Staff priority" : locked ? "Access restricted" : room.available ? room.time : "Reserved";
  return `<article class="room-card">
    <div class="room-visual visual-${room.image}"><span class="room-visual-label">${status}</span></div>
    <div class="room-content"><div class="room-title-row"><div><h3>${room.name}</h3><span class="building">${room.building}</span></div><span class="status-badge ${room.faculty ? "vip" : locked || !room.available ? "locked" : "available"}">${room.faculty ? "Staff" : locked ? "Restricted" : room.available ? "Available" : "Reserved"}</span></div>
      <div class="room-meta"><span>${icon("users")} ${room.capacity} people${room.minimumBookingSize ? ` · min ${room.minimumBookingSize}` : ""}</span><span>${icon("clock")} ${room.type}</span></div>
      <ul class="room-amenities" aria-label="Room amenities">${room.amenities.map((amenity) => `<li>${amenity}</li>`).join("")}</ul>
      <div class="room-footer"><span class="requirement ${locked || room.faculty ? "locked" : ""}">${roomAccessLabel(room)}</span><button class="btn ${locked || !room.available || belowMinimum ? "secondary" : ""}" data-action="book" data-room="${room.id}" ${locked || !room.available || belowMinimum ? "disabled" : ""}>${locked ? "Access restricted" : belowMinimum ? `Select ${room.minimumBookingSize}+ people` : room.available ? "Book now" : "Unavailable"}</button></div>
    </div>
  </article>`;
}

function filteredRooms() {
  return rooms.filter((room) => {
    if (state.filters.noResults) return false;
    if (!room.available && !(state.filters.faculty && room.faculty)) return false;
    if (room.capacity < Number(state.query.groupSize || 1)) return false;
    const minLevel = room.minLevel ?? room.level;
    const maxLevel = room.maxLevel ?? 500;
    if (state.filters.level === "200" && minLevel > 200) return false;
    if (state.filters.level === "400" && (maxLevel < 300 || minLevel > 400)) return false;
    if (state.filters.level === "500" && maxLevel < 500) return false;
    if (state.filters.amenities.some((amenity) => !room.amenities.includes(amenity))) return false;
    return state.filters.faculty ? room.faculty : !room.faculty;
  });
}

function search() {
  const result = filteredRooms();
  return `<main class="search-page"><div class="container">
    <div class="page-head"><span class="eyebrow">Explore campus</span><h1>Find a room</h1><p>A good space can change the way you work. Let's find yours.</p></div>
    <form class="search-bar" data-form="search">${searchFields("search")}<button class="btn" type="submit">${icon("search")} Search rooms</button></form>
    <div class="results-layout">
      <aside class="filter-card"><div class="filter-title">Filters <button class="text-link" data-action="clear-filters">Clear all</button></div>
        <div class="filter-group"><h3>Student level</h3><label class="check-row"><input type="radio" name="level" value="all" ${state.filters.level === "all" ? "checked" : ""}> All levels</label><label class="check-row"><input type="radio" name="level" value="200" ${state.filters.level === "200" ? "checked" : ""}> Level 100–200</label><label class="check-row"><input type="radio" name="level" value="400" ${state.filters.level === "400" ? "checked" : ""}> Level 300–400</label><label class="check-row"><input type="radio" name="level" value="500" ${state.filters.level === "500" ? "checked" : ""}> Level 500</label></div>
        <div class="filter-group equipment-group"><h3>Equipment & games</h3>${amenityOptions.map((item) => `<label class="check-row"><input type="checkbox" name="amenity" value="${item}" ${state.filters.amenities.includes(item) ? "checked" : ""}> ${item}</label>`).join("")}</div>
        <div class="filter-group"><div class="toggle-line"><span>Faculty rooms</span><button class="toggle" role="switch" aria-checked="${state.filters.faculty}" aria-label="Show faculty rooms" data-action="faculty-toggle"></button></div></div>
        <div class="filter-group"><label class="check-row"><input type="checkbox" name="no-results" ${state.filters.noResults ? "checked" : ""}> No matches (preview)</label></div>
      </aside>
      <section class="results-area"><div class="results-top"><strong>${result.length} spaces to explore</strong><span>Demo availability; selected date and time are not checked</span></div>
        ${result.length ? `<div class="room-grid">${result.map(roomCard).join("")}</div>` : `<div class="empty-state"><div class="empty-illustration">${icon("search")}</div><h2>No rooms found just yet</h2><p>Try adjusting your filters or choose a different time. There's usually a little more room somewhere.</p><button class="btn" data-action="clear-filters">Clear filters</button><p style="margin-top:20px;margin-bottom:0">You could also try <strong>2:30 PM</strong> or <strong>4:00 PM</strong>.</p></div>`}
      </section>
    </div>
  </div></main>`;
}

function review() {
  const room = roomById(state.selectedRoom);
  if (!room) return search();
  const bookingBeingModified = state.bookings.find((booking) => booking.id === state.modifyBookingId);
  return `<main><div class="container">  <div class="page-head"><button class="btn text" data-page="search">← Back to rooms</button><span class="eyebrow" style="display:block;margin-top:17px">One last look</span><h1>${state.modifyBookingId ? "Update your booking" : "Review your booking"}</h1><p>Make sure everything looks right before you lock it in.</p></div>
    <section class="review-layout"><article class="review-card"><div class="review-room"><div class="room-visual visual-${room.image}"></div><div><span class="status-badge available">Available</span><h2 style="margin-top:9px">${room.name}</h2><p>${room.building} · Up to ${room.capacity} people${room.minimumBookingSize ? ` · minimum booking ${room.minimumBookingSize}` : ""}</p></div></div>
      <div class="review-details"><div><div class="detail-label">Date</div><div class="detail-value">${new Date(`${state.query.date}T12:00:00`).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</div></div><div><div class="detail-label">Time</div><div class="detail-value">${state.query.time} · ${state.query.duration}</div></div><div><div class="detail-label">Access</div><div class="detail-value">${roomAccessLabel(room)}</div></div><div><div class="detail-label">Group size</div><div class="detail-value">${state.query.groupSize} people${room.minimumBookingSize ? ` · min ${room.minimumBookingSize}` : ""}</div></div></div>
      <form class="review-form" data-form="confirm"><label for="purpose">What's the room for?</label><select class="text-input" id="purpose" name="purpose"><option ${bookingBeingModified?.purpose === "Group study" ? "selected" : ""}>Group study</option><option ${bookingBeingModified?.purpose === "Project work" ? "selected" : ""}>Project work</option><option ${bookingBeingModified?.purpose === "Defense prep" ? "selected" : ""}>Defense prep</option><option ${bookingBeingModified?.purpose === "Quiet study" ? "selected" : ""}>Quiet study</option><option ${bookingBeingModified?.purpose === "Seminar" ? "selected" : ""}>Seminar</option></select>
        <div class="access-check">${icon("check")} <span><strong>You're all set.</strong> ${accountIsStaff() ? "Staff access is eligible for this room." : `Your Level ${accountLevel()} access is eligible for this room.`}</span></div>
        <div class="review-actions"><button type="button" class="btn text" data-action="room-taken">Simulate room taken</button><button type="submit" class="btn green">${icon("check")} ${state.modifyBookingId ? "Save changes" : "Confirm booking"}</button></div>
      </form></article></section>
  </div></main>`;
}

function bookings() {
  return `<main><div class="container"><div class="page-head"><span class="eyebrow">Your campus plans</span><h1>My bookings</h1><p>Your space is waiting. Here's what's coming up.</p></div>
    <section style="padding-bottom:65px"><div class="section-heading"><div><h2 style="font-size:16px;margin:0">Upcoming reservations <span style="color:#64748b;font:500 11px 'DM Sans'">(${state.bookings.length})</span></h2></div><button class="btn secondary" data-action="show-empty">Show empty state</button></div>
    ${state.bookings.length ? `<div class="booking-list">${state.bookings.map((booking) => {
      const room = roomById(booking.roomId);
      const date = new Date(`${booking.date}T12:00:00`);
      return `<article class="booking-row"><div class="booking-date"><strong>${date.getDate()}</strong><span>${date.toLocaleDateString(undefined, { month: "short" })}</span></div><div class="booking-info"><span class="booking-confirmed">✓ Confirmed · ${booking.purpose}</span><h3>${room.name}</h3><p>${date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })} · ${booking.time} · ${booking.duration} · ${booking.partySize ?? state.query.groupSize} people · ${room.building}</p></div><div class="booking-actions"><button class="btn secondary" data-action="modify" data-booking="${booking.id}">Modify</button><button class="btn secondary" data-action="qr" data-booking="${booking.id}">Demo pass</button><button class="btn text" data-action="cancel" data-booking="${booking.id}">Cancel</button></div></article>`;
    }).join("")}</div>` : `<div class="empty-state"><div class="empty-illustration">${icon("calendar")}</div><h2>Your next great session starts here</h2><p>You don't have any upcoming bookings right now. Find a space that feels right and make it yours.</p><button class="btn" data-page="search">Find an available room ${icon("arrow")}</button></div>`}
    </section>
  </div></main>`;
}

function cancelled() {
  return `<main><div class="container"><section class="success-panel"><div class="success-icon">${icon("check")}</div><span class="eyebrow">All taken care of</span><h1>Booking cancelled</h1><p>Your reservation is cancelled and the room is available for another student. Thanks for letting us know.</p><button class="btn" data-page="home">Back to home ${icon("arrow")}</button><button class="btn text" data-page="bookings">View my bookings</button></section></div></main>`;
}

function offline() {
  return `<main><div class="offline-banner">${icon("wifi")}<div><strong>You're offline right now</strong><br>Some campus services might be unavailable. Your saved bookings will be here when you're back online.</div></div>
    <section class="game-card"><div class="game-head"><div><h2>Campus Runner</h2><p>A little distraction while we reconnect.</p></div><span class="game-score">SCORE &nbsp;<b id="game-score">${state.gameScore}</b></span></div>
      <div class="game-screen" id="game-screen" aria-label="Campus Runner game area"><div class="game-sky"></div><div class="game-hill"></div><div class="runner ${state.gameJumping ? "jumping" : ""}" id="runner"></div><div class="game-obstacle"></div><div class="game-ground"></div></div>
      <div class="game-help">Press <kbd>Space</kbd> or tap the game to jump over books. <button class="text-link" data-action="jump">Jump</button></div>
      <div style="padding:0 18px 17px;text-align:center"><button class="btn secondary" data-action="reconnect">Try to reconnect</button></div>
    </section></main>`;
}

function render() {
  const pages = { home, search, review, bookings, cancelled, offline };
  const content = (pages[state.page] || home)();
  app.innerHTML = `<div class="shell">${header()}${content}<footer class="footer"><div class="footer-inner"><span class="footer-brand">Mane Rooms</span><span>Made for your next big idea. ✦</span><div class="footer-tools"><button class="offline-link" data-action="offline">${state.offline ? "You're offline · play Campus Runner" : "Go offline"}</button><span>© Mane University</span></div></div></footer></div>`;
  document.querySelectorAll("[data-query]").forEach((input) => {
    input.value = state.query[input.dataset.query];
  });
}

function go(page) {
  if (page !== "search" && page !== "review") state.modifyBookingId = null;
  state.page = page;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

let previouslyFocusedElement = null;

function openModal(content) {
  previouslyFocusedElement = document.activeElement;
  modalRoot.innerHTML = `<div class="modal-backdrop" data-action="backdrop"><section class="modal" role="dialog" aria-modal="true" tabindex="-1">${content}</section></div>`;
  const modal = modalRoot.querySelector(".modal");
  const title = modal?.querySelector("h2");
  if (title) {
    title.id = "modal-title";
    modal.setAttribute("aria-labelledby", title.id);
  }
  modal?.focus();
}

function closeModal() {
  modalRoot.innerHTML = "";
  if (previouslyFocusedElement instanceof HTMLElement && previouslyFocusedElement.isConnected) {
    previouslyFocusedElement.focus();
  }
  previouslyFocusedElement = null;
}

function qrModal(booking) {
  const bits = Array.from({ length: 81 }, (_, i) => ((i * 13 + booking.id * 11 + (i % 7) * 3) % 5 < 2) ? "on" : "");
  openModal(`<h2>Demo room access pass</h2><p>This decorative pattern is not a scannable QR code. Show your booking details when you arrive at ${roomById(booking.roomId).name}.</p><div class="qr-box" aria-hidden="true">${bits.map((bit) => `<i class="${bit}"></i>`).join("")}</div><div class="qr-code-copy">MANE-${String(booking.id).padStart(6, "0")} · ${booking.date}</div><div class="modal-actions"><button class="btn" data-action="close-modal">Done</button></div>`);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-page], [data-action]");
  if (!target) return;
  if (target.dataset.page) {
    event.preventDefault();
    if (target.dataset.page === "search" && state.page === "search") return;
    go(target.dataset.page);
    return;
  }
  const { action } = target.dataset;
  if (action === "menu") {
    const nav = document.querySelector("#top-nav");
    const expanded = nav?.classList.toggle("open") ?? false;
    target.setAttribute("aria-expanded", String(expanded));
  }
  if (action === "clear-filters") {
    state.filters = { level: "all", amenities: [], faculty: false, noResults: false };
    state.query.groupSize = 2;
    render();
  }
  if (action === "faculty-toggle") {
    state.filters.faculty = !state.filters.faculty;
    render();
  }
  if (action === "book") {
    closeModal();
    const room = roomById(target.dataset.room);
    const issue = bookingIssue(room);
    if (issue) {
      state.selectedRoom = null;
      openModal(`<h2>Unable to book this room</h2><p>${issue}</p><div class="modal-actions"><button class="btn" data-action="close-modal">Got it</button></div>`);
      return;
    }
    state.selectedRoom = room.id;
    go("review");
  }
  if (action === "room-taken") {
    const room = roomById(state.selectedRoom);
    state.selectedRoom = null;
    openModal(`<div class="conflict-banner" style="margin:0 0 17px">${icon("clock")}<div><strong>Oh, this room was just taken</strong><p>Another student confirmed this room moments ago. Here are a few spaces at your level.</p></div></div><h2>Try one of these instead</h2><p>We kept your date and time so you can keep moving.</p>${rooms.filter((alternative) => alternative.available && alternative.id !== room?.id && alternative.level <= 300).slice(0, 2).map((alternative) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-top:1px solid #e2e8f0"><div><strong style="font-size:11px">${alternative.name}</strong><div style="font-size:9px;color:#64748b;margin-top:3px">${alternative.time} · ${levelLabel(alternative.level)}</div></div><button class="btn" data-action="book" data-room="${alternative.id}" style="padding:8px 10px;font-size:9px">Choose</button></div>`).join("")}<div class="modal-actions"><button class="btn secondary" data-action="conflict-search">Back to search</button></div>`);
  }
  if (action === "cancel") {
    const bookingId = Number(target.dataset.booking);
    openModal(`<h2>Cancel this booking?</h2><p>You're about to release your room to other students. This action can't be undone.</p><div class="policy-note"><strong>Cancellation policy</strong><br>You can cancel before your booking starts. Cancelled rooms become available straight away, and cancelled bookings don't count toward your weekly limit.</div><div class="modal-actions"><button class="btn secondary" data-action="close-modal">Keep booking</button><button class="btn" data-action="confirm-cancel" data-booking="${bookingId}">Yes, cancel</button></div>`);
  }
  if (action === "confirm-cancel") {
    state.bookings = state.bookings.filter((booking) => booking.id !== Number(target.dataset.booking));
    closeModal();
    go("cancelled");
  }
  if (action === "qr") qrModal(state.bookings.find((booking) => booking.id === Number(target.dataset.booking)));
  if (action === "modify") {
    const booking = state.bookings.find((item) => item.id === Number(target.dataset.booking));
    state.modifyBookingId = booking.id;
    state.selectedRoom = booking.roomId;
    state.query.date = booking.date;
    state.query.time = booking.time;
    state.query.duration = booking.duration;
    state.query.groupSize = booking.partySize ?? state.query.groupSize;
    go("search");
  }
  if (action === "show-empty") {
    state.bookings = [];
    render();
  }
  if (action === "offline") {
    state.offline = true;
    go("offline");
  }
  if (action === "reconnect") {
    state.offline = false;
    go("home");
  }
  if (action === "jump") jump();
  if (action === "close-modal") closeModal();
  if (action === "conflict-search") {
    closeModal();
    state.modifyBookingId = null;
    go("search");
  }
  if (action === "backdrop" && event.target === target) closeModal();
});

document.addEventListener("change", (event) => {
  const { target } = event;
  if (target.matches("[data-account-role]")) {
    state.accountRole = target.value;
    render();
  }
  if (target.matches("[data-query]")) {
    state.query[target.dataset.query] = target.value;
    if (target.dataset.query === "groupSize") state.query.groupSize = target.value;
  }
  if (target.matches('input[name="level"]')) {
    state.filters.level = target.value;
    render();
  }
  if (target.matches('input[name="amenity"]')) {
    state.filters.amenities = Array.from(document.querySelectorAll('input[name="amenity"]:checked')).map((input) => input.value);
    render();
  }
  if (target.matches('input[name="no-results"]')) {
    state.filters.noResults = target.checked;
    render();
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.matches('[data-form="search"]')) {
    event.preventDefault();
    state.selectedRoom = null;
    state.filters.noResults = false;
    go("search");
  }
  if (event.target.matches('[data-form="confirm"]')) {
    event.preventDefault();
    const room = roomById(state.selectedRoom);
    const issue = bookingIssue(room);
    if (issue) {
      openModal(`<h2>Unable to confirm booking</h2><p>${issue}</p><div class="modal-actions"><button class="btn" data-action="close-modal">Got it</button></div>`);
      return;
    }
    const formData = new FormData(event.target);
    const updatedBooking = { id: state.modifyBookingId || Date.now(), roomId: room.id, date: state.query.date, time: state.query.time, duration: state.query.duration, partySize: Number(state.query.groupSize), purpose: formData.get("purpose") };
    if (state.modifyBookingId) {
      state.bookings = state.bookings.map((booking) => booking.id === state.modifyBookingId ? updatedBooking : booking);
      state.modifyBookingId = null;
    } else {
      state.bookings.unshift(updatedBooking);
    }
    state.selectedRoom = null;
    go("bookings");
  }
});

function jump() {
  if (state.gameJumping) return;
  state.gameJumping = true;
  state.gameScore += 1;
  const runner = document.querySelector("#runner");
  const score = document.querySelector("#game-score");
  runner?.classList.add("jumping");
  if (score) score.textContent = String(state.gameScore);
  window.setTimeout(() => {
    state.gameJumping = false;
    document.querySelector("#runner")?.classList.remove("jumping");
  }, 480);
}

document.addEventListener("keydown", (event) => {
  const modal = modalRoot.querySelector(".modal");
  if (event.key === "Escape" && modal) {
    closeModal();
    return;
  }
  if (event.key === "Tab" && modal) {
    const focusableElements = modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    if (!first || !last) {
      event.preventDefault();
      modal.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
    return;
  }
  if (state.page === "offline" && (event.code === "Space" || event.key === "ArrowUp")) {
    event.preventDefault();
    jump();
  }
});

render();
