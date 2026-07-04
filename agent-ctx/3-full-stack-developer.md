# Task 3 - Hero/Nav/NeuralNet Agent Context

## Files Created
1. `src/components/sections/neural-network-bg.tsx` - Canvas-based animated neural network background
2. `src/components/sections/navbar.tsx` - Fixed glassmorphism navigation bar
3. `src/components/sections/hero.tsx` - Full-screen hero section

## Key Design Decisions
- Neural network uses canvas with devicePixelRatio scaling for crisp rendering
- 50 nodes (scaled by viewport), 40 floating particles
- Mouse influence radius of 250px for parallax/glow effects
- Nodes wrap around screen edges for seamless looping
- Center radial gradient glow drawn on canvas
- Navbar uses framer-motion layoutId for smooth active indicator
- Hide-on-scroll-down behavior via useMotionValueEvent
- Hero uses staggered container/item variants for entrance animation
- Status cards pull live data from personalInfo in data.ts
- Bottom gradient fade on hero for smooth section transition