# Rail Boss - Implementation Plan

## Overview

Implement the Rail Boss logistics strategy game in Deno/TypeScript based on
DESIGN.MD requirements.

## File Structure

### Core Game Logic (TypeScript modules)

1. **types.ts** - Common interfaces and types
2. **account.ts** - Account/balance management
3. **stations.ts** - Station logic, passenger generation, size scaling
4. **passengers.ts** - Passenger creation, boarding, alighting
5. **tracks.ts** - Track connections, wear, repair logic
6. **trains.ts** - Train types, capacity, routing, wear
7. **tickets.ts** - Ticket pricing (distance + speed)
8. **repair.ts** - Repair cost calculation (wear + age)
9. **phases.ts** - Game phase management (start/expansion/profit)
10. **game_state.ts** - Core game state, win/lose conditions
11. **ui.ts** - Canvas rendering for map and control panel
12. **input.ts** - Touch and PC browser input handling
13. **main.ts** - Main game loop, state updates, rendering

### Server & Entry Point

14. **server.ts** - Deno HTTP server for serving game assets
15. **index.html** - HTML entry with Canvas and control panel

### Tests

Each .ts file has a corresponding .test.ts file.

## Implementation Order

1. types.ts + types.test.ts
2. account.ts + account.test.ts
3. stations.ts + stations.test.ts
4. passengers.ts + passengers.test.ts
5. tracks.ts + tracks.test.ts
6. trains.ts + trains.test.ts
7. tickets.ts + tickets.test.ts
8. repair.ts + repair.test.ts
9. phases.ts + phases.test.ts
10. game_state.ts + game_state.test.ts
11. ui.ts + ui.test.ts
12. input.ts + input.test.ts
13. main.ts + main.test.ts
14. server.ts + server.test.ts
15. index.html

## Danish Cities for Stations

København, Aarhus, Odense, Aalborg, Esbjerg, Randers, Kolding, Horsens, Vejle,
Herning, Silkeborg, Roskilde
