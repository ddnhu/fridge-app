# Decision Record — Red Stamp

Decided 21 September 2026. Session 2 (Decide), revised after the palette attack.
**Updated 22 September to match what actually shipped.**

**One current file. The direction is not reopened this week.**

---

## HOW TO READ THIS

This file used to describe an intention. It now describes **the built app**,
because on Thursday you check the app against this document and three of its
rules would have told you to rebuild something you'd deliberately chosen.

| Marked | Means |
|---|---|
| plain | shipped, and argued for |
| **changed 22 Sep** | shipped differently from the 21 Sep record, with the reason |
| **closed 22 Sep** | shipped differently, never argued, and now ratified — *stop reopening it* |

### Closed on 22 September

Four things had shipped without anyone deciding them. All four were put to Danni
and all four **keep what is in production**. They are settled:

| | 21 Sep record wanted | Production keeps |
|---|---|---|
| Ground | warm ink `#141210` | **cream `#F5F1E6`** |
| Stamp angle | −6° | **−2°** |
| Red | two uses | **three** — press, rule, stamp |
| Dish title | 34px uppercase | **fluid, sentence case** |

The reasoning for each is written where it belongs below. The point of writing it
down is that a decision without a reason gets reopened at midnight; these now have
reasons attached, and the reasons are the defence.

---

## THE VERDICT (21 September, unchanged)

The **mechanism** survived the attack. The **skin** did not.

| | Status |
|---|---|
| Drift-then-snap, the stamp, set type, misregistration, the accord of three lines | **survives** |
| Penguin: cream ground, orange band, accession number, catalogue logic | **dead** |

Danni's argument — *"it's not leaning full on into its idea, it's still on the fence"* —
is an argument about this build failing at its own job, so it stands. The reference was
being **worn**, not **used**. Session 1's own rule: a metaphor must change the mechanics,
not the decoration. The band was decoration. It's gone.

---

## THE DIRECTION

**Red Stamp**

> Dinner is one dated entry in a record that keeps growing, closed with a stamp you
> can't take back.

**The diary displaces the series.** "Not sure what that is" killed the accession number,
and that is structural, not cosmetic:

| | Says | Feels like |
|---|---|---|
| `No. 41 in the series` | this is one of many, filed | a catalogue. Impersonal. Borrowed. |
| `21 SEPTEMBER` | this was a day in my life | a record. Yours. It accumulates. |

What replaces the catalogue is **registration**: the authority is not a person and not an
editor — it is *the stamp*. A stamped document is closed by procedure, not by opinion,
which is why nobody is bossing you and it still can't be argued with.

**Motivational and gentle coexist because they occupy different channels.** This is the
rule for the whole app:

| Channel | Carries | Register |
|---|---|---|
| **Motion** | gentleness | drifts in, never hurries you |
| **Colour** | "get it done" | one saturated red |
| **Copy** | nothing | flat, five words, no jokes |

Anything that tries to make the *motion* motivational or the *copy* bold breaks this and
gets cut.

---

## THE GOVERNING PRINCIPLE — drift, then snap

**The most protected thing in this document. Nothing below overrides it.**

| | Motion | Starts | Reads as |
|---|---|---|---|
| Drifting elements | **drift** — 760ms, eases from rest | from stillness | consideration |
| The one snapping element | **snap** — 180ms, full speed at frame 1 | already moving | closure |

**One element per screen may snap. Everything else drifts. Never two.**

| Screen | What snaps |
|---|---|
| Reveal | the red date stamp |
| Steps | the photograph landing in the plate — **added 22 Sep** |
| Camera, fridge | nothing |

The photo's snap is the same 180ms and the same easing as the stamp, deliberately: the
stamp closes the decision, the photo closes the meal. They are the same gesture applied
to the two ends of the night.

---

## THE SPEC, AS BUILT

### Palette

| Token | Hex | Lives where |
|---|---|---|
| `--cream` | `#F5F1E6` | the ground of the reveal and the steps — **closed 22 Sep** |
| `--ink` | `#141210` | all type. Warm black, never neutral |
| `--red` | `#E4290F` | the press bar, the reveal's top rule, the stamp — **closed 22 Sep** |
| `--faint` | `#8A8275` | the diary label, "also considered", step numerals, pantry label |

Refuses: a third ink, gradients, shadows, radius over 2px, and any colour sampled from
food.

**The ground is cream — closed 22 Sep.** The 21 Sep record killed cream on a luminance
argument: it sits in the same range as wood and stone, so on a counter under kitchen
lights the screen disappears into the bench.

> What that argument actually killed was **cream plus timid**. Cream carrying bold
> marks had never been tested — which is why the experiments were given a ground toggle,
> so the two could be compared by flipping rather than from memory. Flipped, cream won,
> and the red stamp is a mark on a page rather than a light in one. Cream is the ground.
>
> The luminance risk is real and has not been disproved; it is now **reversal condition
> 1** and nothing else. If it fails on the bench at night, that condition fires. Until
> it does, this is decided.

**Red has three marks, and they are the three stages of one act — closed 22 Sep.** The
21 Sep rule said "exactly two moments", then specified a red rule, which made three. The
law is rewritten to match what shipped, and it still constrains:

| Stage | Mark | Reads as |
|---|---|---|
| Handover | the press bar | you give the decision away |
| Arrival | the 2px rule across the top of the reveal | the page it lands on |
| Closure | the stamp | it can't be taken back |

> **Red belongs to the act of deciding, from the press to the stamp, and to nothing
> else.** It never appears on a screen outside that act — not on the camera, not on the
> fridge list, and deliberately **not on the steps screen**, where the deciding is over
> and only cooking is left. That is a sharper test than counting to two: you can check it
> by asking *is this screen part of the decision?* rather than by keeping a tally.

### Type, as built

| Role | Ships | Setting as built |
|---|---|---|
| Dish title | Archivo 700 | `clamp(34px, 11vw, 48px)` / 1.06, `letter-spacing -0.01em`, **sentence case**, left-locked |
| Accord lines | Archivo 600 | `clamp(17px, 5vw, 21px)` / 1.32 |
| Steps heading | Archivo 700 | `clamp(28px, 8vw, 34px)` / 1.06 |
| Step text | Archivo 500 | `clamp(17px, 5vw, 20px)` / 1.42, max 30ch |
| Step numeral | Archivo 600 | 12px, `letter-spacing .14em`, `--faint`, **above** its step |
| Diary / pantry label | EB Garamond italic | 15px, `--faint` |
| Stamp date | Archivo 700 | 15px, `letter-spacing .14em`, uppercase, cream knocked out of red |
| Button | Archivo 600 | 13px, `letter-spacing .16em`, uppercase |

**The dish title is fluid and sentence case — closed 22 Sep.** The 21 Sep record specified
`34px / letter-spacing .06em / uppercase`. Production keeps what shipped, and the reason
is that the title is doing a different job from the one the record imagined:

> **A dish name is a name, not a headline.** Caps are for the stamp, where the type is a
> mark stamped onto a document by procedure. The dish is the thing itself, and setting it
> in caps makes the app announce the answer rather than hand it to you — which is the
> *copy* channel trying to be bold, and this direction gives boldness to colour instead.
>
> It is also the only setting that survives the content. "Sweet potato and sausages" at
> 48px in letterspaced caps is four lines; in sentence case at the same size it is two.
> Reversal condition 3 exists precisely to catch a format that can't hold real names, and
> caps would have walked the title straight into it.

Negative tracking (`-0.01em`) belongs with it: at 48px, optical tracking wants to come in,
not out. The `+.06em` in the 21 Sep record was written for 34px caps and does not transfer.

Nothing is centred, anywhere. The step numerals sit *above* their steps rather than beside
them precisely to hold that: beside them, the step text starts 34px in and the page loses
its single left edge.

### Spacing & radius

| Rule | Value |
|---|---|
| Grid | 8px base, 4px for tight pairs (per `RULES.md`) |
| Page gutter | 24px |
| Radius | `0` on every Red Stamp surface. Max `2px` |
| Shadows | none, ever |

**Scope correction, 22 Sep.** The "radius 0, no exceptions" rule applies to the screens
built in this direction — the reveal, the steps, the press bar. The camera and fridge
screens still run on the pre-direction theme and use 8/16/24px radii and pill shapes.
That is not an exception to the rule; it is **two design systems in one app**, and it is
the largest open item going into Thursday.

### The misregistration

The stamp's date sits **2px right and 2px up** inside its red field, so the type misses
its own block and never corrects. It is the hand in the machine.

---

## THE BEATS, AS BUILT

### a) THE BUTTON

| | |
|---|---|
| Form | Full-bleed `--red` bar pinned to the bottom, 72px + safe area, label left-locked at 24px |
| Label | `Press` |
| Press | fill darkens to `#B81F0A`, 60ms linear. No scale, no ripple, no radius |
| Release | bar **accelerates downward out of frame**, 160ms `cubic-bezier(.4,0,1,1)` |
| Argument | The red leaves the bottom of the screen and comes back as the stamp. Surrender is the one red object moving from your thumb to the page |

### b) THE REVEAL

**changed 22 Sep — the title is the dish, and the three staggered lines are the
ingredients.** The 21 Sep record staggered *the title* across three lines. The build
found that the reveal never named what you were cooking — you got ingredients and a
method and had to infer the dish. The dish is the answer to the question you pressed the
button to ask, so it arrives first and largest, and the ingredients follow as evidence of
what it makes of your fridge. They move faster than the dish, being evidence rather than
answer. This was the right call and the record was simply never updated.

| t | Element | Motion |
|---|---|---|
| 0ms | Red rule, 2px, top | `scaleX(0→1)`, origin left, 240ms `cubic-bezier(.2,.8,.2,1)` |
| 240ms | **Dish title** | rise 32px + fade, 760ms `cubic-bezier(.33,0,.2,1)` |
| 420 / 490 / 560ms | Accord lines ×3 | rise 18px + fade, 520ms, 70ms stagger |
| 820ms | Diary label `from the fridge` | fade only, 400ms linear |
| **1120ms** | **Stamp** | `scale(1.04)→1`, `rotate(0→-2deg)`, 180ms `cubic-bezier(.2,.9,.25,1)`. **Stays crooked** |
| 1300ms | `Steps` button | fade, 400ms. Until the decision closes there is nothing to go and do |
| ~1700ms | — | done |

**The stamp sits at −2° — closed 22 Sep.** The 21 Sep record argued at length for −6°: −2°
is right for rotated text on paper, but wrong for a rotated *coloured block*, whose hard
edge reads as a build error at small angles.

> **That argument was made from reasoning; −2° has been judged by looking.** It has been
> on a phone, in the hand, many times since, and it reads as a hand that didn't quite line
> the stamp up — not as a build error. Decided by looking beats decided by arguing, and
> that is the method this whole project runs on.
>
> There is a second reason it holds. The stamp is **not carrying the hand on its own**:
> the date misses its own red field by 2px and never corrects. With the misregistration
> doing that work, the angle doesn't have to shout to be read as applied rather than
> placed. −6° would be two marks making the same point, and one of them would start to
> look like a style.

**−2° is protected. It is not reopened.**

**On the tempo.** 21 Sep estimated ~1180ms. As built the stamp lands at 1300ms and the
Steps button settles at 1700ms. Whether that is too slow at 11pm is still open.

### c) THE REJECTION

| | |
|---|---|
| Out | Dish and accord drop back 32px and fade — **180ms, no stagger**. It does not perform on the way out |
| Rule | retracts `scaleX(1→0)`, 180ms `cubic-bezier(.4,0,1,1)` |
| Record | rejected title drops to a foot list, `--faint`, 11px, headed `also considered` |
| Limit | **Three per scan.** On the third the same title is set again and the button is gone |
| In | next reveal begins at 200ms |

Unlimited rerolls destroy closure, and closure is the thesis.

### d) THE STEPS — added 22 September

Its own screen, because steps are read differently from a decision — mid-cook, one-handed,
more than once — and because the reveal has to stay a single held moment rather than a
page you scroll.

| | |
|---|---|
| Eyebrow | the dish name, EB Garamond italic, `--faint`. A reminder, not a second reveal |
| Heading | `Steps` |
| Steps | one per action. A new step starts when the **subject** changes (eggs → tomato) or the **stage** changes (stove → grill) |
| One-step recipes | keep their sentence and get **no numeral**. 42 of the 54 are genuinely one instruction, and that terseness is the point of them |
| Pantry | `from the pantry` + 3–4 cupboard items, `·` separated. Never scanned, never scored |
| The plate | square, 300px, left-locked. Tap → camera → the photo is kept against that dish and that date |
| Red | **none on this screen** |

**Why the pantry is not scored.** A dish you can't season isn't a dish, but asking the
camera to find salt would be absurd, and scoring it would let a full-looking fridge answer
"Nothing sets tonight." because it is short of pepper.

---

## MICROCOPY — as built

| Moment | Record said (21 Sep) | Screen says |
|---|---|---|
| Empty fridge | `The page is blank.` | `The page is blank.` ✓ |
| Nothing matches | *(not specified)* | `Nothing sets tonight.` |
| Ingredient identified | `ONION — set` | `Added 2 × onion` ✗ |
| Ingredient wrong | `Reset. Shallot.` | *(not implemented)* ✗ |
| Button | `PRESS` | `Press` |
| Diary line | `from the fridge of Danni Hu` | `from the fridge` ✗ |
| Rejection | `Returned. Two left.` | `Not that · Two left` ✗ |
| Steps / pantry | — | `Steps`, `from the pantry` |
| The plate | — | `when it's done` → `cooked 22 September` |

**The three ✗ lines that live on the camera screen were never written.** They belong to
the pre-direction screens and will only be true once those screens are brought across.
The register was: type is *set*, a correction is *reset*, a page goes to *press*, a book
is *returned* — each line a printing or library term doing double duty, so the register
does the work and the writing doesn't have to.

---

## STILL OPEN — the list to clear before Thursday

Four items were closed on 22 September (ground, stamp angle, red, title case). What is
left is one real decision and three small ones.

**1. One design system, or two.** The only expensive item on this page.

| | |
|---|---|
| The problem | The camera and fridge screens still run the pre-direction dark theme: `#0a0a0a`, white, grey, system sans, 8–24px radii, pill shapes. The press bar, reveal and steps run Red Stamp |
| Why it matters | Beats 1, 2 and 5 of the five-beat demo are on the old screens. A visitor sees two apps |
| Why it's open | Cutting it was a deliberate, priced trade on 22 Sep — it bought the steps screen and the photograph |
| Also downstream | `index.html` sets `theme-color: #0a0a0a`, correct while the camera is dark and wrong the moment the app is cream. It moves when this moves, not before |
| And | the three unwritten microcopy lines above all live on those screens |

*If only one thing gets settled before Thursday, it is this one.*

**2. Thin red rule, or a thick top band** across the top of the reveal. This is a question
of weight, not colour — the rule is red either way and the three-mark law holds.

**3. Archivo, or a warmer grotesque.**

**4. The tempo.** The reveal runs to 1300ms and the Steps button settles at 1700ms. Too
slow at 11pm? Reversal condition 2 is the test: five real uses at night, and if you tap
through before the stamp lands, it's wrong.

---

## THE GUARDRAIL, RESTATED

The original test was: *ground is warm ink, one red used twice, 34px letterspaced caps,
visible misregistration — if any one is missing, it's the default wearing a costume.*

Three of those four were deliberately overruled on 22 September, and the app is still
nothing like the default — because the default was `#0a0a0a` + white + grey + **system
sans at 17px with no motion law**, and none of those four clauses was the thing holding
it off. They were testing the costume.

The real test is narrower and much harder to fake. **Every clause below is true of the
app today, and each is a thing a default cannot accidentally have:**

1. **Drift-then-snap, one snap per screen.** A motion law with a rule about restraint.
2. **Two inks and no third** on a cream ground — and red only inside the act of deciding.
3. **Set type** — Archivo and EB Garamond doing different jobs, not one system sans.
4. **Two imperfections and no more** — the 2px misregistration, and the stamp's −2°.

If a screen has none of these, it has slid back. Rebuild that screen. **The camera and
fridge screens currently have none of them**, which is not a slide back — they were never
brought across — but it is the same remedy, and it is open item 1.

---

## WHAT THIS DIRECTION STILL REFUSES

Gradients. Shadows. Radius over 2px. A third ink. Colour sampled from food. Centred type.
Jokes. **Food photography as seduction** — the stock-shot, styled, sell-you-the-dish
image that made every reference app read as generic.

**changed 22 Sep — the photograph.** The 21 Sep record refused photography outright and
listed *"I want to add a photograph"* as reversal condition 4: wanting one means you're in
the wrong direction. A photograph shipped on 22 September and **the condition does not
fire**, because the record was not distinguishing two different objects:

| | What it does | Verdict |
|---|---|---|
| A styled shot of the dish, before | sells you a meal you haven't made. Decoration. The anti-brief | **still refused** |
| Your own snapshot, after | proves you cooked it. Evidence. It earns the diary | **this is what shipped** |

The first is an argument for the dish; the second is a record that the night happened. The
direction refuses the first and always could have held the second. That distinction is now
part of the direction rather than an exception to it.

---

## WHAT WOULD HAVE TO BE TRUE TO REVERSE IT

1. On my phone, on my counter, with the kitchen lights on, the screen still disappears.
   *(The one open question about cream. Cream is otherwise decided — see Palette.)*
2. After five real uses at night I tap through before the stamp lands — the tempo is
   wrong and T3's 280ms was right.
3. Real meal names overflow the title at 48px. If the format can't hold real content it
   isn't dignifying anything, it's a cage.
4. ~~I want to add a photograph.~~ **Retired 22 Sep** — see above. Replaced by: *I want a
   styled photograph of the dish before I cook it.* That still means the wrong direction.
5. Three people see it and describe it as a bank app or a terminal.

---

## NOT DOING THIS WEEK

1. **The Diaries view** — the shelf of spines, one per meal cooked. Sketched 22 Sep, in
   `docs/parking-lot.md` with the colour question that has to be settled first. The data
   exists (`src/cooked-store.js`); the view does not.
2. **Camera-sampled colour** from the fridge frame.
3. **Licensed Akzidenz / Bembo.** Archivo and EB Garamond ship.
4. **Sound.** A press and a stamp are begging for audio. Two-day rabbit hole.
5. **A third ink.** Every screen that feels like it needs one gets redesigned instead.
6. **Quantities and units** — see `docs/parking-lot.md`.

---

## REFERENCES

| Reference | Steal this |
|---|---|
| [Himekuri tear-off day calendar](https://www.google.com/search?tbm=isch&q=%E6%97%A5%E3%82%81%E3%81%8F%E3%82%8A+himekuri+tear+off+day+calendar) | One day per page, red for the date, and the day is destroyed when it's done. |
| [Library date-due slip](https://www.google.com/search?tbm=isch&q=library+book+date+due+slip+stamped) | The accumulation she wants: the same object, stamped again and again. |
| [Rubber received date stamp](https://www.google.com/search?tbm=isch&q=rubber+date+stamp+RECEIVED+red+ink+document) | The stamp as *procedure* — closure applied by a hand, slightly crooked. |
| [Letterpress red and black two-colour](https://www.google.com/search?tbm=isch&q=letterpress+two+colour+red+black+printing) | Two inks only. All boldness comes from restraint plus one hot colour. |
| [Risograph misregistration](https://www.google.com/search?tbm=isch&q=risograph+misregistration+offset+colour+print) | The 2px offset that never corrects. |
| [Basel poster, red on black](https://www.google.com/search?tbm=isch&q=basel+swiss+poster+red+black+typography) | How to be loud with two colours and no picture. |
| [Factory job card / production ticket](https://www.google.com/search?tbm=isch&q=factory+job+card+production+ticket+stamped) | Dry, dated, functional — and completely unlike a recipe app. |
