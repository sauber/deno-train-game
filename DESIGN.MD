# Bane Boss – Game Design Document (Clarified)

## 1. Game Overview

Create a logistics strategy game titled **“Rail Boss”**. The player manages a
railway network, transports passengers, and earns profit while maintaining
tracks and rolling stock.

---

## 2. Core Game Elements

### 2.1 Account (Balance)

- **Starting Funds:** The player begins with an initial balance.
- **Expense Flow:** Money is deducted when the player purchases trains, tracks,
  or repairs assets.
- **Income Flow:** Money is added each time passengers arrive at stations.
- **Level Triggers:** New stations appear when the account balance reaches
  predefined milestones.

### 2.2 Stations

- **Function:** Stations generate passengers.
- **Capacity:** Station size scales with passenger volume; larger stations
  produce passengers more frequently.
- **Visuals:** Each station has a unique colour and is named after one of the 12
  largest Danish cities.
- **Placement Rules:** Stations must be spaced so that a track segment can fit
  between them.
- **Initial Count:** The game starts with 5 stations; up to 12 stations can be
  added over time.

### 2.3 Passengers

- **Creation:** A passenger appears at a station and has a destination reachable
  via existing tracks.
- **Boarding:** Passengers board the first arriving train and ride until they
  reach their destination.
- **Visualization:**
  - Small dot on the station platform.
  - Colour‑coded to match its destination station.
  - Visible while waiting, boarding, and alighting; invisible while on board.
- **Flexibility:** Passengers can alight at any time, regardless of how many
  wait at the station.

### 2.4 Tracks (Routes)

- **Connection:** Directly links two stations.
- **Cost:** Purchase price depends on distance between stations.
- **Wear:** Tracks degrade with each passing train; when fully worn they become
  unusable.
- **Maintenance:** Degraded tracks must be repaired (fixed price) before trains
  can use them again.
- **Capacity:** Only one train may occupy a track segment at a time.
- **Speed Penalty:** Train speed decreases as track wear increases.
- **Removal:** A track can be removed if no train is on it or if trains are
  waiting at both ends.
- **Maximum Trains:** Only one train per track segment.

### 2.5 Tickets (Revenue)

- **Pricing:** Determined by distance traveled and travel speed.
- **Payment:** Collected when passengers alight.

### 2.6 Trains

- **Acquisition:** Player purchases trains and places them on stations.
- **Operation:** Trains travel between stations, carrying passengers.
- **Capacity:** Each train has a minimum and maximum passenger capacity; it only
  departs when the minimum is met and cannot exceed the maximum.
- **Routing Logic:** Trains choose the next station that yields the highest
  revenue from alighting passengers.
- **Wear:** Trains degrade over time and must be repaired (fixed price) to
  continue operating.
- **Types:**
  - **Regional:** Low cost, slow, small capacity, cheap tickets.
  - **Intercity:** Medium cost, speed, capacity, and ticket price.
  - **Express:** High acquisition cost, fast, large capacity, expensive tickets.

### 2.7 Repair System

- **Cost Factors:** Price depends on wear level and age; older, more worn items
  cost more.
- **Display:** Repair cost shown on hover; older items degrade faster.

---

## 3. Game Startup

- **Tutorial Screen:** Shows basic controls – drag & drop tracks, place trains,
  delete, and repair.
- **User Interface:** Designed to mirror the modern “train conductor” UI for
  consistency.

---

## 4. Game Phases

| Phase         | Description                                                                |
| ------------- | -------------------------------------------------------------------------- |
| **Start**     | Initial setup with 5 stations.                                             |
| **Expansion** | Stations 6‑11 appear as the player’s balance reaches expansion thresholds. |
| **Profit**    | At 12 stations, the final “Profit” phase begins.                           |

---

## 5. Game Over Condition

- **Loss:** Occurs when no train can run due to broken tracks or trains, and the
  player cannot afford repairs.

---

## 6. Endgame

- **Final Phase:** After all 12 stations are unlocked, a 2‑minute “Endgame”
  starts.
  - Repair costs and wear rates are doubled.
  - **Scoring:** Final score = total money on the account after the 2‑minute
    period.

---

## 7. Layout & UI

- **Map View:** Upper 2/3 of the screen displays the railway map (stations &
  tracks).
- **Control Panel:** Lower 1/3 shows:
  - Game title
  - Available purchase items
  - Action buttons
  - Status indicators
  - Statistics (stations, trains, passengers, income/expenses)
- **Fixed Dimensions:** Canvas and panel sizes are fixed; messages scroll within
  the panel to maintain size.
- **Stop Button:** Provides ability to pause, view score, and return to the main
  menu.
- **Next Station Indicator:** Shows the required balance to add the next
  station.
- **Design Consistency:** Control panel styling matches the modern train
  conductor UI.
- **Platform Support:** Playable on both touch devices and PC browsers.

---

_This clarified version organizes the original information into structured
sections with bullet points and tables, improving readability and comprehension
while preserving all original details._
