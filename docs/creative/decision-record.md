# Decision Record — Tonight In Paperback

Decided: 21 September 2026. Session 2 (Decide). **Not reopened this week.**

---

## THE DIRECTION

**Tonight In Paperback**

> Dinner is tonight's title in an infinite series, arriving already set in type and
> closed with a stamp.

**The authority — rewritten.** The brief said "an editor." Nobody read an editor.
Danni read *"a recipe softly decided for you, gently… the stamp reads as: it's done."*

So the authority is not a person. **It is the printed object itself.** Nobody is
addressing you. The decision arrives already typeset, and set type cannot be argued
with. That is why it reads as gentle: a printed thing is kinder than a speaking thing,
because it is not talking *to* you.

Everything below serves that one sentence.

---

## THE GOVERNING PRINCIPLE — drift, then snap

Discovered in the build, promoted to law:

| | Motion | Starts | Reads as |
|---|---|---|---|
| Title lines | **drift** — 760ms, ease from rest | from stillness | consideration |
| Accession stamp | **snap** — 180ms, full speed at frame 1 | already moving | closure |

The contrast is the whole design. One element in any screen may snap. Everything else
drifts. Never two snaps. Never all drift — without the snap, nothing is decided.

---

## THE SPEC

### Palette

| Token | Hex | Lives where | Refuses |
|---|---|---|---|
| `--paper` | `#F3EDE1` | full-bleed background, every screen | never pure white |
| `--ink` | `#16130F` | all type, the misregistration rule | never pure black |
| `--band` | `#E4551F` | the series band; the button. **Nothing else.** | never a second accent |
| `--faint` | `#7A7263` | "also considered", secondary label | never a UI grey system |

The palette refuses: white grounds, drop shadows, gradients, any border-radius over 2px,
photography, and a second accent colour. If a screen needs a new colour, the screen is
wrong.

### Type

| Role | Family | Free (shipping Friday) | Size / setting |
|---|---|---|---|
| Title | [Akzidenz-Grotesk Next](https://www.google.com/search?tbm=isch&q=Akzidenz-Grotesk+type+specimen) | **Archivo 700** | 34px / 1.08, `letter-spacing .06em`, uppercase, left-locked, ragged right |
| Label | [Bembo Book](https://www.google.com/search?tbm=isch&q=Bembo+type+specimen+book) | **EB Garamond italic** | 15px / 1.4 |
| Accession | Archivo 600 | same | 11px, `letter-spacing .14em`, uppercase |
| Button | Archivo 600 | same | 13px, `letter-spacing .16em`, uppercase |
| Ingredients | Archivo 500 | same | 15px / 1.5 |

Nothing is centred. Ever. ([Tschichold's Penguin Composition Rules](https://www.google.com/search?tbm=isch&q=Jan+Tschichold+Penguin+Composition+Rules) — centring is reserved for title pages, and no screen here is a title page.)

### Spacing & radius

| Rule | Value |
|---|---|
| Grid | 8px base, 4px permitted for tight pairs (per `RULES.md`) |
| Page gutter | 24px |
| Band height | 88px, full-bleed (`margin: 0 -24px`) |
| Title top margin | 40px |
| Foot margin | 40px |
| Radius | `0`. Max `2px` anywhere. No exceptions |
| Shadows | none, anywhere, at any opacity |

### The misregistration (stolen from T3)

A 2px `--ink` rule sits under the band, **offset 2px to the right**, and never corrects.
One extra div. It exists because a cheaply printed paperback has colour that misses its
keyline — it is the hand in the machine, and it is the only imperfection on the page
apart from the stamp.
Reference: [risograph misregistration](https://www.google.com/search?tbm=isch&q=risograph+misregistration+offset+colour+print)

---

## THE THREE BEATS

### a) THE BUTTON

| | |
|---|---|
| Form | Full-bleed `--band` bar pinned to the bottom, 72px tall, label left-locked at 24px |
| Label | `PRESS` |
| Press state | fill darkens to `#C8471A`, 60ms linear. No scale, no ripple, no radius |
| On release | the bar **accelerates downward out of frame**, 160ms `cubic-bezier(.4,0,1,1)` |
| Argument | You press it and it leaves. The band you pressed returns 240ms later at the *top* of the reveal — the same object, now above you. Surrender is the control physically changing sides |

### b) THE REVEAL

| t | Element | Motion |
|---|---|---|
| 0ms | Band | slides down from top, 240ms `cubic-bezier(.2,.8,.2,1)` |
| 240ms | Title line 1 | rise 32px + fade, 760ms `cubic-bezier(.33,0,.2,1)` |
| 310ms | Title line 2 | same, 70ms stagger (heavy overlap — they are one paragraph, not three events) |
| 380ms | Title line 3 | same |
| 1000ms | Accession | **snap**: `scale(1.04)→1`, `rotate(0→-2deg)`, opacity, 180ms `cubic-bezier(.2,.9,.25,1)`. **Stays crooked.** |
| ~1180ms | — | done |

Content: three lines = the accord. `MINCED BEEF / SOFT CARROT / THE LAST OF THE MILK`.
Then the italic label. Then `No. 41 in the series`, crooked.

### c) THE REJECTION

| | |
|---|---|
| Out | Title lines drop back 32px and fade — **180ms, no stagger**. It does not perform on the way out |
| Band | slides up, 180ms `cubic-bezier(.4,0,1,1)` |
| Record | rejected title drops to a foot list, `--faint`, 11px, headed `also considered` |
| Counter | series number increments and is visible |
| **Limit (stolen from T2)** | **Edition of 3.** Three rejections per scan. On the third, the app sets the same title again and the button is gone |
| In | next reveal begins at 200ms |

The limit is not bossiness. Unlimited rerolls destroy closure, and closure is the entire
thesis. A print run is finite; so is tonight.

---

## MICROCOPY — final wording

| Moment | Line |
|---|---|
| Empty fridge | `The shelf is empty.` |
| Ingredient identified | `ONION — set` |
| Ingredient wrong | `Reset. Shallot.` |
| Button | `PRESS` |
| Reveal | *(title)* + `from the fridge of Danni Hu, 21 September` + `No. 41 in the series` |
| Rejection | `Returned. No. 42.` |

Every line is a printing term doing double duty: type is *set*, type is *re-set*, a page
goes to *press*, a book is *returned*. None of them is a joke. The register does the work
so the writing doesn't have to.

---

## WHAT I GAVE UP

| Lost | Named honestly |
|---|---|
| T3's speed | 280ms vs 1180ms. At 11pm, tired, that is a long time to watch a decision arrive |
| T3's force | Colour as environment. On a dark kitchen at low brightness, pale paper is the weaker screenshot |
| T2's absolution | Fate absolves harder than a decision does. "It was meant to be" > "it is decided" |
| T2's withholding | The card-back button was the better object. `PRESS` is honest and dull |
| Loudness | This will never be the loudest thing on anyone's phone. That was a real option and it is now closed |

---

## WHAT WOULD HAVE TO BE TRUE TO REVERSE IT

Observable only. Not moods.

1. After five real uses on my own phone at night, I tap through the reveal before the
   stamp lands. (Then the tempo is wrong and T3 was right.)
2. I show it to three people and none of them mention dinner or deciding — they only say
   it looks like a book.
3. Real meal names from the recipe JSON overflow three lines at 34px. If the format
   can't hold real content, the format isn't dignifying anything, it's just a cage.
4. The paper cream is unreadable on my actual screen at night brightness in a kitchen.
5. I find myself wanting to add a photograph. This territory refuses photography; if I
   want one, I'm in the wrong territory.

---

## NOT DOING THIS WEEK

1. **The coloured history shelf** (braise/fry/soup/cold dish codes). Needs weeks of data
   before it means anything. Cut from the palette entirely for now.
2. **Camera-sampled colour** from the fridge frame. Genuinely good. Not Friday.
3. **Licensed Akzidenz-Grotesk / Bembo.** Archivo and EB Garamond ship.
4. **Persistence** — "also considered" surviving across sessions, real accession numbers.
   Fake the number this week.
5. **Sound.** A press and a stamp are begging for audio. It is the single most tempting
   addition and it is a two-day rabbit hole on its own.

---

## BUILD REALITY

The hero moment is already built and tuned. Two days goes to plumbing, not art:

| | Cost |
|---|---|
| Reveal | done |
| Button + exit/entry continuity | ~1h |
| Rejection + edition counter | ~1h |
| Inventory screen in this system | half a day |
| Recipe JSON + matching | the actual work |

Nothing in this spec needs a framework, an asset, an API key, or knowledge of how old an
ingredient is.
