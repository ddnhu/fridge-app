# Decision Record — Red Stamp, Black Page

Decided 21 September 2026. Session 2 (Decide), revised after the palette attack.
**One current file. Not reopened this week.**

---

## THE VERDICT

The **mechanism** survived the attack. The **skin** did not.

| | Status |
|---|---|
| Drift-then-snap, the stamp, set type, misregistration, the accord of three lines | **survives** |
| Penguin: cream ground, orange band, accession number, catalogue logic | **dead** |

Danni's argument — *"it's not leaning full on into its idea, it's still on the fence"* —
is an argument about this build failing at its own job, so it stands. The reference was
being **worn**, not **used**. Session 1's own rule: a metaphor must change the mechanics,
not the decoration. The band was decoration. It's gone.

Cream also fails an observable test that was already written into the last record
(reversal condition 4): it sits in the same luminance range as wood and stone, so on a
counter, under kitchen lights, the screen disappears into the bench.

---

## THE DIRECTION

**Red Stamp, Black Page**

> Dinner is one dated entry in a record that keeps growing, closed with a stamp you
> can't take back.

**Thesis restated — the diary displaces the series.** "Not sure what that is" killed the
accession number, and that is structural, not cosmetic:

| | Says | Feels like |
|---|---|---|
| `No. 41 in the series` | this is one of many, filed | a catalogue. Impersonal. Borrowed. |
| `21 SEPTEMBER` | this was a day in my life | a record. Yours. It accumulates. |

The catalogue logic is dead and the Fleckhaus shelf dies with it. What replaces it is
**registration**: the authority is not a person and not an editor — it is *the stamp*.
A stamped document is closed by procedure, not by opinion, which is why nobody is bossing
you and it still can't be argued with.

**Motivational and gentle coexist because they occupy different channels.** This is the
rule for the whole app:

| Channel | Carries | Register |
|---|---|---|
| **Motion** | gentleness | drifts in, never hurries you |
| **Colour** | "get it done" | one saturated red, used twice |
| **Copy** | nothing | flat, five words, no jokes |

They don't compete. Anything that tries to make the *motion* motivational or the *copy*
bold breaks this and gets cut.

---

## THE GOVERNING PRINCIPLE — drift, then snap

| | Motion | Starts | Reads as |
|---|---|---|---|
| Title lines | **drift** — 760ms, eases from rest | from stillness | consideration |
| Red date stamp | **snap** — 180ms, full speed at frame 1 | already moving | closure |

One element per screen may snap. Everything else drifts. Never two snaps.

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

---

## THE SPEC

### Palette

| Token | Hex | Lives where |
|---|---|---|
| `--ink` | `#141210` | full-bleed ground, every screen. Warm black, never neutral |
| `--bone` | `#F5F1E6` | all type |
| `--red` | `#E4290F` | **the two decision moments only**: the button, and the stamp field |
| `--faint` | `#8A8275` | the diary label, "also considered" |

**Red is reserved for the act of deciding.** The button is where you hand the decision
over; the stamp is where it closes. Same ink, because it's the same act. Red appearing
anywhere else means something has slipped.

Refuses: cream and white grounds, a third ink, gradients, shadows, radius over 2px,
photography, and any colour sampled from food.

### Guardrail — this is not the old near-black default

She started this project at `#0a0a0a` + white + grey + system sans, and I called that
avoiding a decision. Going dark risks sliding back. It has not slid back **only if all
four of these are true on screen**:

1. ground is warm ink `#141210`, not neutral black
2. exactly one saturated red, used twice, never as an accent elsewhere
3. type is 34px letterspaced caps, not 17px system sans
4. the misregistration is visible

If any one is missing, it's the default wearing a costume. Rebuild.

### Type

| Role | Family | Free (ships Friday) | Setting |
|---|---|---|---|
| Title | [Akzidenz-Grotesk Next](https://www.google.com/search?tbm=isch&q=Akzidenz-Grotesk+type+specimen) | **Archivo 700** | 34px / 1.08, `letter-spacing .06em`, uppercase, left-locked, ragged right |
| Diary label | [Bembo Book](https://www.google.com/search?tbm=isch&q=Bembo+type+specimen+book) | **EB Garamond italic** | 15px / 1.4, `--faint` |
| Stamp date | Archivo 700 | same | 15px, `letter-spacing .14em`, uppercase, bone knocked out of red |
| Button | Archivo 600 | same | 13px, `letter-spacing .16em`, uppercase |
| Ingredients | Archivo 500 | same | 15px / 1.5 |

Nothing is centred, anywhere.

### Spacing & radius

| Rule | Value |
|---|---|
| Grid | 8px base, 4px for tight pairs (per `RULES.md`) |
| Page gutter | 24px |
| Title top margin | 40px |
| Foot margin | 40px |
| Stamp block padding | 8px 16px |
| Radius | `0`. Max `2px`. No exceptions |
| Shadows | none, ever |

### The misregistration

The stamp's date sits **2px right and 2px up** inside its red field, so the type misses
its own block and never corrects. Free — one `transform` on the inner span. It is the
hand in the machine, and with the band gone it is now the only imperfection on the page
besides the stamp's own angle.

---

## THE THREE BEATS

### a) THE BUTTON

| | |
|---|---|
| Form | Full-bleed `--red` bar pinned to the bottom, 72px, label left-locked at 24px, bone caps |
| Label | `PRESS` |
| Press | fill darkens to `#B81F0A`, 60ms linear. No scale, no ripple, no radius |
| Release | bar **accelerates downward out of frame**, 160ms `cubic-bezier(.4,0,1,1)` |
| Argument | The red leaves the bottom of the screen and comes back 1000ms later as the stamp. Surrender is the one red object moving from your thumb to the page |

### b) THE REVEAL

| t | Element | Motion |
|---|---|---|
| 0ms | Red rule, 2px, top | `scaleX(0→1)`, origin left, 240ms `cubic-bezier(.2,.8,.2,1)` |
| 240ms | Title line 1 | rise 32px + fade, 760ms `cubic-bezier(.33,0,.2,1)` |
| 310ms | Title line 2 | same, 70ms stagger — heavy overlap, they are one paragraph not three events |
| 380ms | Title line 3 | same |
| 700ms | Diary label | fade only, 400ms linear |
| 1000ms | **Stamp** | `scale(1.04)→1`, `rotate(0→-6deg)`, opacity, 180ms `cubic-bezier(.2,.9,.25,1)`. **Stays crooked.** |
| ~1180ms | — | done |

The red rule replaces the Penguin band: same job (something decisive arrives from the
top), no costume, and it costs one div.

**On −6°, having argued for −2°:** −2° was right for *rotated text on paper*, where small
angles read as a hand and large ones read as a designer being casual. It is wrong for a
*rotated coloured block*, which has a hard edge against the ground — at −2° that edge
reads as a build error, and it needs −6° before it reads as applied by hand. The object
changed, so the number changed.

### c) THE REJECTION

| | |
|---|---|
| Out | Title lines drop back 32px and fade — **180ms, no stagger**. It does not perform on the way out |
| Rule | retracts `scaleX(1→0)`, 180ms `cubic-bezier(.4,0,1,1)` |
| Record | rejected title drops to a foot list, `--faint`, 11px, headed `also considered` |
| Limit | **Three per scan.** On the third the same title is set again and the button is gone |
| In | next reveal begins at 200ms |

Unlimited rerolls destroy closure, and closure is the thesis.

---

## MICROCOPY — final wording

| Moment | Line |
|---|---|
| Empty fridge | `The page is blank.` |
| Ingredient identified | `ONION — set` |
| Ingredient wrong | `Reset. Shallot.` |
| Button | `PRESS` |
| Reveal | *(title)* + `from the fridge of Danni Hu` + stamp `21 SEPTEMBER` |
| Rejection | `Returned. Two left.` |

Every line is a printing or library term doing double duty: type is *set*; a correction
is *reset*, which admits the error without apologising; a page goes to *press*; a book is
*returned*. The register does the work so the writing doesn't have to.

---

## WHAT HAPPENED TO THE SERIES NUMBER

Dropped from the reveal entirely. It was carrying the catalogue conceit, and the
catalogue is dead.

The accumulation it was standing in for now lives in **the stamp itself** — same object,
new date, every night. The history view (a slip with the stamps piling up, one per day)
is named here so it isn't lost, and is explicitly **deferred**. It needs persistence and
weeks of data before it means anything.

---

## WHAT I GAVE UP

| Lost | Named honestly |
|---|---|
| T3's speed | 280ms vs 1180ms. Tired, at 11pm, this is still a long time to watch |
| T2's absolution | Fate forgives harder than a record does |
| T2's withholding button | The card back was a better object than `PRESS` |
| Paper | Warmth from material is off the table now. Warmth has to come entirely from tempo |
| Colour range | Two inks. When a screen wants a third colour, the screen has to be redesigned instead |

---

## WHAT WOULD HAVE TO BE TRUE TO REVERSE IT

1. On my phone, on my counter, with the kitchen lights on, the screen still disappears.
2. After five real uses at night I tap through before the stamp lands — the tempo is
   wrong and T3's 280ms was right.
3. Real meal names from the recipe JSON overflow three lines at 34px. If the format can't
   hold real content it isn't dignifying anything, it's a cage.
4. I want to add a photograph. This direction refuses photography; wanting one means I'm
   in the wrong direction.
5. Three people see it and describe it as a bank app or a terminal. That means the four
   guardrails above failed and it slid back to the default.

---

## NOT DOING THIS WEEK

1. **The accumulating stamp slip / history view.** Named, deferred, needs persistence.
2. **Camera-sampled colour** from the fridge frame.
3. **Licensed Akzidenz / Bembo.** Archivo and EB Garamond ship.
4. **Sound.** A press and a stamp are begging for audio. Two-day rabbit hole.
5. **A third ink.** Every screen that feels like it needs one this week gets redesigned
   instead.

---

## BUILD REALITY

| | Cost |
|---|---|
| Recolour the reveal, swap band → rule, stamp → red block at −6° with the date | ~1h, it's already tuned |
| Button + red handoff to the stamp | ~1h |
| Rejection + three-per-scan limit | ~1h |
| Inventory + scan screens in this system | half a day |
| Recipe JSON + matching | the actual work |

No framework, no assets, no API key, and nothing depends on knowing how old an
ingredient is.
