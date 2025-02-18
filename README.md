# Space Evolution Game - Technical Overview

## Core Concept
Incremental game starting with life evolution on a single planet, eventually growing into a massive space-faring organism that consumes celestial bodies. Progress through stages based on mass/size, from planetary organism to black hole.

## Technical Stack
- Phaser.js as game framework
- Matter.js for physics and collision
- RBush for spatial partitioning
- Three.js for gravitational lensing effects

## Game Progression

### Phase 1: Planetary Evolution
- Start with basic life forms on planet surface
- Incremental upgrades to evolve and expand life
- Life forms gradually combine into single biomass
- Consume planet's resources/mass
- Culminates in complete planetary consumption
- Unlock space movement capability

### Phase 2: Space Evolution
Stages based on accumulated mass:
1. Planet-sized (starting size after consuming initial planet)
2. Gas Giant
3. Brown Dwarf
4. Star
5. Red Giant
6. Neutron Star
7. Black Hole

## Core Systems to Implement

### Phase 1: Planetary Systems
- Incremental upgrade system for life evolution
- Resource management on planetary scale
- Visual representation of spreading biomass
- Planet consumption mechanics
- Transition system to space phase

### Physics Engine
- Simplified n-body gravitational physics using Matter.js
- Gravity strength scales with mass
- Optimization through spatial partitioning (RBush)
- Need to limit active physics bodies to ~500 for mobile performance
- Physics objects pooling system for memory management

### Movement & Controls
- Phase 1: Static on planet, manage resource distribution
- Phase 2: Space movement with basic thrust controls
- Mobile virtual joystick implementation
- Objects only spawn in proximity to player
- Implement screen wrapping for infinite space feel

### Upgrades System
1. Early Evolution (Phase 1)
   - Life form improvements
   - Resource gathering efficiency
   - Biomass spread rate
   - Planet consumption speed

2. Space Evolution (Phase 2)
   - Propulsion
   - Tentacles (Verlet physics)
     * Custom verlet integration for performance
     * Points and sticks system
     * Constraint solving iterations
     * Tentacle base follows organism rotation
     * Configurable segment count and length
     * Optional spring behavior
   - Auto-feeders (autonomous resource collectors)
   - Gravity manipulation

### Resource System
- Initial planetary resources
- Mass: Primary resource for evolution
- Energy: Powers abilities/upgrades
- Collection through collision/absorption
- Consider exponential growth curve

### Visual Effects
- Minimal art style initially
- Biomass spread visualization
- Planet consumption effects
- Three.js integration for later stages
- Gravitational lensing for neutron star/black hole stages
- Particle effects for resource absorption

### Performance Considerations
1. Object Pooling
   - Pre-allocate physics bodies
   - Manage spawn/despawn around player
   - Clear distant objects

2. Spatial Optimization
   - RBush for efficient collision checks
   - Quadtree for gravity calculations
   - Only calculate gravity for nearby objects

3. Physics Optimization
   - Simplified gravity calculations
   - Limit physics steps per frame
   - Batch collision checks

## Technical Challenges

### Phase Transition
- Smooth transition from planetary to space gameplay
- State management between phases
- Resource conversion between phases

### Physics Performance
- Balance between accuracy and performance
- Optimize n-body calculations
- Handle edge cases with extreme mass differences

### Scale Management
- Handle exponential size differences
- Camera scaling between stages
- Physics calculations at different scales

### Memory Management
- Efficient object pooling
- Resource cleanup
- Handle long play sessions

## Initial Implementation Plan
1. Planetary phase mechanics
2. Basic upgrade system
3. Biomass spread visualization
4. Planet consumption mechanics
5. Phase transition system
6. Space movement and physics
7. Further evolution stages
8. Performance optimization
9. Visual effects and polish

Each system should be modular and expandable for future features/improvements.
