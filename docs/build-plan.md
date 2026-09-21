# Week plan — demo Friday morning

Written Monday 2026-09-21. Four build days, then a demo.

## The demo, defined first

Everything in this plan exists to serve this and nothing else. Write it on a sticky
note. If a task doesn't serve one of these five beats, it is not this week's work.

  1. I open the app on my phone.
  2. I point it at a fridge. It identifies a few ingredients.
  3. I press one button.
  4. It tells me what to cook. (This is the moment the room reacts.)
  5. I say no. It gives me another one.

That's ninety seconds. That's the demo.

## Where the code actually is

Built: camera, live CLIP detection, shutter-to-add, tap-to-correct, undo, the fridge
list, quantity steppers, learning from saves.

**Not built: the button, the meal generation, the reveal, the rejection.** That's beats
3, 4 and 5 — the entire hero of the product. This is the week's real work; the scan half
is done and should not be touched.

## The one scoping decision, already made

Meal generation runs **locally from a bundled recipe set** — a JSON file of ~40 recipes
with required and optional ingredients, plus a scoring function that ranks them against
what's in the fridge. No API, no key, no network.

Why, so you don't relitigate it Wednesday at midnight: GitHub Pages serves this repo at
a public URL, so an API key in client-side code is exposed. A local set also can't fail
on venue wifi and has no latency, which matters more in a live demo than sophistication
does. If you want an LLM behind this later, that's a post-demo project needing a server.

## Anti-tunnel-vision rules

These matter more than the schedule. You already know you go deep on details.

- **Always shippable.** Push to `main` at the end of every day, and check it on your
  phone. From Tuesday night onward there is always a working demo. Everything after
  that is upside, not risk.
- **The parking lot.** Keep `docs/parking-lot.md` open. Every idea, every "ooh I should
  also", every tempting refactor goes there in one line and you return to the task. You
  are not losing it; you are dating it.
- **Timer on every block.** When it rings, stop and read your daily goal out loud. If
  what you're doing doesn't serve it, it goes in the parking lot.
- **The 20-minute rule.** Stuck on the same problem for 20 minutes with no progress?
  Ship the ugly version and park the elegant one. Ugly and working beats elegant and
  Thursday.
- **Build on the laptop, judge on the phone.** Iterate at `localhost:8123`, where a
  refresh is instant. Push once per milestone, not per change — GitHub Pages caches for
  ~10 minutes, so pushing to check a tweak costs 2-3 minutes and a private tab every
  time. The phone is for deciding how something feels, not for finding out whether it
  works.
- **Direct in feeling-words, don't type CSS.** "Softer", "snappier", "more fluid",
  "between those two" is faster than learning easing syntax mid-decision, and it keeps
  you in judgment instead of debugging. Ask for the extremes before choosing a value.
- **No polish before Wednesday.** No colour, no type, no easing curves until the whole
  loop runs end to end. Styling an unfinished flow is the most seductive way to lose
  this week.

---

## MONDAY — Decide the direction

Goal: **by tonight I have one direction, written down, and I am not reopening it.**
No production code today. That's deliberate.

- **Block 1 (75 min, hard stop).** Run `docs/creative/01-diverge.md`. Answer its
  questions honestly rather than strategically. Stop at 75 minutes even mid-thought.
- **Block 2 (90 min, 30 min per territory, timer on each).** Build a crude version of
  the reveal for each of the three territories. Crude is the requirement, not a
  concession: one screen, hardcoded meal name, no real data, throwaway files in
  `experiments/`. Push them and **look at all three on your actual phone.** You decide
  by looking, not by imagining — this is the whole reason the day is structured this way.
- **Block 3 (45 min).** Run `docs/creative/02-decide.md`. It will eliminate two for you
  and make you argue. Save the decision record to `docs/direction.md`.
- **Block 4 (20 min).** Write the five NOT DOING THIS WEEK items at the bottom of
  `docs/direction.md`. Read them tomorrow when you're tempted.

If you finish early, stop. Do not start building. Tomorrow is long.

**Done when:** `docs/direction.md` exists with a palette, type, the three beats, and the
six microcopy lines.

---

## TUESDAY — Build the missing half, ugly

Goal: **tonight, on my phone, I can scan, press the button, get a meal, and reject it.**
Ugly is fine. Ugly is expected. Working is the only criterion.

- **Block 1 (2 h).** The recipe data and the matching. Write `src/data/recipes.json`
  (~40 recipes: name, required ingredients, optional ingredients, one line of method)
  and `src/recipe-engine.js` that scores recipes against fridge contents and returns a
  ranked list. Use the ingredient names the recognizer already produces — check
  `getKnownLabels()` and match against those so the two halves actually connect.
  Test it in the console with a fake fridge before touching any UI.
- **Block 2 (2 h).** The button and the reveal screen, in default styling. Pressing it
  takes the top-ranked recipe and shows it. Rejection advances to the next one and
  remembers what you rejected this session.
- **Block 3 (1 h).** Wire it into `script.js` alongside the existing camera and fridge
  screens, and handle the two ugly cases: nothing in the fridge, and nothing matches
  well. Both need *something* on screen, even if it's placeholder text.
- **Block 4 (30 min).** Push. Open it on your phone in a **Safari private tab** — Pages
  caches for ~10 minutes and stale ES modules will make you think you broke something
  you didn't. Walk the five demo beats end to end.

**Done when:** the full loop runs on your phone. It should look bad. That's correct.

---

## WEDNESDAY — Make it look like the direction

Goal: **tonight the app looks like `docs/direction.md` and nothing else.**

- **Block 1 (1 h).** Tokens first: rewrite `src/tokens.css` to the direction's palette,
  type and radii. Load the real typeface. Nothing else this block — doing tokens first
  means most screens improve for free.
- **Block 2 (2 h).** The reveal. This is the hero moment and deserves the single
  biggest block of the week. Build the beat-by-beat arrival with the real durations and
  easings from the spec. If the ambitious version fights you for more than 30 minutes,
  build the cheap version your director specified and park the rest.
- **Block 3 (1 h).** The button, then the rejection beat. In that order — the button is
  what makes the reveal land.
- **Block 4 (1 h).** Bring the camera screen and fridge list into the direction. These
  only need to stop looking like a different app; they are not the hero.
- **Block 5 (30 min).** Push. Check on phone. Park everything you noticed.

**Done when:** a stranger seeing a screenshot could describe the app's personality.

---

## THURSDAY — Make it survive a live demo

Goal: **tonight it works in front of people, and then I stop.**

- **Block 1 (90 min).** Test on a real fridge — ideally the one you'll demo with, or
  photos of it. Detection will be wrong about things. Do not chase model accuracy; that
  is a swamp and it will eat Thursday. Make being wrong *graceful* instead: correction
  should be fast and should look intentional in the new direction.
- **Block 2 (90 min).** Demo-killers, in this order:
  - **The CLIP model is a ~90 MB download.** Load the app on your demo phone tonight, on
    good wifi, so it's cached. Add a visible loading state anyway in case it re-downloads.
  - Camera permission prompt: know exactly what it looks like and when it fires.
  - Every empty and failure state: no ingredients, no matches, camera denied, offline.
  - A fallback path you can reach in two taps if detection embarrasses you live — a
    pre-loaded fridge, or typing a name.
- **Block 3 (45 min).** Rehearse the ninety seconds out loud, three times, on the phone
  you'll actually use. Time it. Write the words you'll say for each of the five beats.
- **Block 3b (20 min). BAKE THE DIALS.** If you tuned anything with DialKit, the value
  that actually ships is whatever default is buried in the control definition. Read the
  settled values out of the browser — in the page console:
  `Object.fromEntries(Object.entries(localStorage).filter(([k]) => k.startsWith('dialkit:')))`
  — then replace each dialed value with a named constant in the CSS and drop that entry
  from the panel. DialKit itself can stay vendored; it costs nothing and the next
  experiment starts free. Ask me to do this; it's mechanical.
- **Block 4 (30 min).** Final push. **Then freeze the code.** Anything you notice after
  this goes in the parking lot. Shipping something rehearsed beats shipping something
  improved.

**Done when:** you've run the demo three times without touching code.

---

## FRIDAY MORNING — Buffer only

Not a build session. Open the deployed URL in a private tab, run the demo once, check
the phone is charged and on a network you've tested. If something is broken, fix only
that. If nothing is broken, do not improve anything.

The plan has a whole morning of slack in it on purpose, because something always goes
wrong on Thursday. If nothing did, you get a calm Friday — which is a good outcome, not
wasted time.

---

## If you fall behind

Cut in this order, no deliberation:
  1. Wednesday's Block 4 (camera and fridge restyling) — the reveal carries the demo.
  2. The rejection beat becomes a plain "give me another" button.
  3. The recipe set shrinks to 15 recipes chosen to match what's actually in your fridge.
  4. Live detection becomes a pre-loaded fridge you scan *into* as a scripted moment.

Never cut: the button, the reveal, and Thursday's rehearsal.
