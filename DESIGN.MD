# Bane Boss – Game Design Document (Clarified)

## 1. Game Overview

Create a logistics strategy game titled **“Rail Boss”**. The player manages a
railway network, which transports passengers, and earns profit while maintaining
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

- **Capacity:** Station size scales with count of passengers who have arrived.
  The size of the station decides how many platforms it has. There can be max
  one train on each platform.
- **Function:** Stations generate new passengers. Larger stations produce
  passengers more frequently.
- **Visuals:** Each station has a unique colour and is named after one of the 25
  largest Danish cities. Multiple stations cannot have same name.
- **Placement Rules:** Stations must be spaced so that a track segment can fit
  between them.
- **Initial Count:** The game starts with 4 small stations; up to 12 stations
  can be added over time.

### 2.3 Passengers

- **Creation:** A passenger appears at a station and has a destination reachable
  via existing tracks going from station.
- **Boarding:** Passengers board the first train, where next stop for the train
  matches the next stop for the passenger on the shortest path to destination
  station. Boarding is only possible if train has capacity.
- **Disembark** When passengers are on a train, and the next stop for the train
  does not match next stop on shorts path to passenger, they dissembark from the
  train, and wait on the station for the next matching train.
- **Arrival** When passengers arrive at their destination, they pay for the full
  fare. The fare depends on the shortest distance through existing tracks from
  original station to destination station. A small discount is deducted from
  fair based on how fast passenger reached their destination. The fare payment
  is added to account balance, and to stations total revenue. After payment, the
  passenger is deleted from game.
- **Visualization:**
  - Small dot on the station platform.
  - Colour‑coded to match its destination station.
  - Visible while waiting, boarding, and alighting; invisible while on board.

### 2.4 Tracks (Routes)

- **Connection:** Directly links two stations. Only one link between same two
  stations.
- **Cost:** Purchase price depends on distance between stations.
- **Wear:** Tracks degrade with each passing train; when fully worn they become
  unusable. Tracks degrade faster they older they are.
- **Maintenance:** Degraded tracks must be repaired before trains can use them
  again. Repair has a cost, which will be deducted form players account. When
  repaired, wear level resets to zero, but age remains the same, so the time to
  next repair decreases.
- **Capacity:** Only one train may occupy a track segment at a time.
- **Speed Penalty:** Train speed decreases as track wear increases.
- **Removal:** A track can be removed if no train occupies it.

### 2.5 Tickets (Revenue)

- **Pricing:** Determined by distance traveled and travel speed.
- **Payment:** Collected when passengers arrive at destination.

### 2.6 Trains

- **Acquisition:** Player purchases trains and places them on stations.
- **Operation:** Trains travel between stations, carrying passengers.
- **Capacity:** Each train has a minimum and maximum passenger capacity; it only
  departs when the minimum is met and cannot exceed the maximum.
- **Routing Logic:** Trains choose the next station, as soon as they arrive at a
  station. The next station is announced to passengers on the train, as well as
  all passengers waiting at the station. Trains will not go back on the same
  track they came from, unless no other choise exists. Trains will immediately
  occupy the next track when arriving, even though it make take some time until
  train departs from station. The train will choose the next track based on
  maximum estimated revenue at next station.
- **Departure:** If not enough passengers are aboard, they train will no leave.
  It will wait until sufficient new passenger have been generated, and the
  passengers have boarded. If minimum capacity is met, and no more passengers
  are boarding, the train departs.
- **Arrival:** An occupied track is released when train upon arrival.
- **Wear:** Trains degrade over time and must be repaired to continue operating.
  When completedly degraded they will stop on the track, not at a station.
- **Types:**
  - **Regional:** Low cost, slow, small capacity, cheap tickets.
  - **Intercity:** Medium cost, speed, capacity, and ticket price.
  - **Express:** High acquisition cost, fast, large capacity, expensive tickets.

### 2.7 Repair System

- **Cost Factors:** Price depends on wear level and age; older, more worn items
  cost more.
- **Display:** Repair cost shown on hover; older items degrade faster.

---

## 3. Game Phases

| Phase      | Description                                                                |
| ---------- | -------------------------------------------------------------------------- |
| **Start**  | Initial setup with 4 stations.                                             |
| **Grow**   | Stations 5‑11 appear as the player’s balance reaches expansion thresholds. |
| **Profit** | At 12 stations, the final “Profit” phase begins.                           |

---

## 4. Game Startup

Modal is shown at start to explain basic controls – drag & drop tracks, place
trains, delete, and repair.

---

## 5. Game Over Condition

- **Loss:** Occurs when no train can run due to broken tracks or trains, and the
  player cannot afford repairs.
- **Win:** Profit phase is completed. Final score is displayed.

---

## 6. Endgame

- **Final Phase:** After all 12 stations are unlocked, a 2‑minute “Endgame”
  starts.
  - Repair costs and wear rates are doubled.
  - **Scoring:** Final score = total money on the account after the 2‑minute
    period.

---

## 7. Layout & UI

- **User Interface:**
- **Map View:** Upper 2/3 of the screen displays the railway map (stations &
  tracks).
- **Control Panel:** Lower 1/3 shows:
  - Designed to mirror the style a rusty old train driver panel from a real
    train.
  - Game title and release version
  - Available purchase items
  - Action buttons
  - Status indicators
  - Statistics (stations, trains, passengers, income/expenses)
- **Fixed Dimensions:** Canvas and panel sizes are fixed; messages scroll within
  the panel to maintain size.
- **Stop Button:** Provides ability to pause, view score, and return to the main
  menu.
- **Next Station Indicator:** Shows the required balance to add the next station
  to the game.
- **Platform Support:** Playable on both touch devices and PC browsers.
