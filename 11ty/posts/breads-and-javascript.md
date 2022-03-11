---
title: There are too many types of bread; also JavaScript tools
summary: With so many options to write, transpile, and bundle JavaScript apps, one can't help but wonder if it needs to be this way. Would you say this at a bakery?
date: 2022-03-09
tags:
  - frontend
  - css
---

<AttributedImage src={'~/bread.jpg'} attribution={<a href={'https://www.pexels.com/photo/various-breads-on-wicker-baskets-1070946/'}>Photo by Daria Shevtsova from Pexels</a>} alt={'Various Breads on Wicker Baskets'}/>

# "There's Just So Much Ecosystem Fragmentation"

We can't figure out how to put code together (or even if we need packages).

```javascript
import * as Package from "package";
import { default as Package } from "package";
const Package = require("package");
const Package = await import("package");
```

Also, we can't figure out how to leaven bread (or even if it should be leavened).

- Yeast
- Steam
- Baking soda
- Baking powder
- Air

We can't figure out what component framework to use (or even if we need one).

```json
{
  "dependencies": {
    "react": "^17",
    "vue": "^3",
    "svelte": "^3"
  }
}
```

We can't figure out what grain to use (or even if we need grain).

- Corn Flour
- Whole Wheat Flour
- White Flower
- Sprouted Flour
- Almond flour
- Rye flour

(actually this list is too long).

We can't figure out how to build our JavaScript apps.

```bash
parcel build
tsc --project tsconfig.production.json
esbuild ./src/index.ts
webpack
```

We can't figure out how to make our bread cook.

- Bring water to a boil in wok
- Preheat your oven to 400°F
- Over high heat, start your cast-iron skillet

The truth is, all of these techniques have different goals, flavors, and pairings. JavaScript stacks are the same way. We're not all building the same loaf, so why would there be just one recipe.
