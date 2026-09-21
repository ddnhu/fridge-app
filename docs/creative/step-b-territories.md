# Step B — three territories (Mon 2026-09-21)

## Three calls made before these

**Your three stars = one idea in three hats.** Volatility pyramid, museum label, coloured
shelf are all *the institutional format dignifying the sad ingredient*. Merged into one
territory (move: **collapsing**) so the other two can genuinely oppose it.

**Killing #6:** the principle survives, the execution was the problem. A permanent
strikethrough makes the app's error your record. Corrections now resolve instantly and
silently in all three — each territory admits fault differently instead.

**Demoting #1:** with identity-only detection, the volatility pyramid becomes a static
lookup table, and a table telling you cilantro generally dies fast is comprehension
theatre — the thing you rated least true. What survives is the **accord**: the meal named
as a composition of three named things. Occasion work, no freshness data needed.

**Move used throughout: channel displacement.** Neither of us writes good humour, so all
personality moved into easing curves, misregistration and colour. The microcopy below is
deliberately starved.

---

# T1 — Tonight In Paperback

> **Thesis:** Dinner is a title in an infinite series, and the series format is what makes
> a bag of mince and a soft carrot into an occasion.
> **Origin:** Collisions 2 + 14 + 16 collapsed.
> **Authority:** An editor. Not a friend, not a chef. Someone whose job is to decide what
> goes to press tonight, and who does not explain the decision.
> **On being wrong:** Confident, unbothered. A correction is a new edition, not an apology.

| Reference | Steal this |
|---|---|
| [Romek Marber Penguin Crime grid](https://www.google.com/search?tbm=isch&q=Romek+Marber+grid+Penguin+Crime+covers) | The fixed top-third band. Title always in the same place, forever. |
| [Tschichold Penguin Composition Rules](https://www.google.com/search?tbm=isch&q=Jan+Tschichold+Penguin+Composition+Rules) | Letterspaced caps, tight leading, no centring. |
| [Fleckhaus Bibliothek Suhrkamp spines](https://www.google.com/search?tbm=isch&q=Willy+Fleckhaus+Bibliothek+Suhrkamp+spines+colour) | 48 colours you only see when shelved. Your history screen. |
| [Alvin Lustig New Directions covers](https://www.google.com/search?tbm=isch&q=Alvin+Lustig+New+Directions+book+covers) | Abstract marks instead of pictures of the subject. |
| [V&A museum object label](https://www.google.com/search?tbm=isch&q=museum+object+label+vitrine+V%26A+typography) | Small dry caption + accession number under a humble object. |
| [USDA pomological watercolours](https://www.google.com/search?tbm=isch&q=USDA+pomological+watercolor+blemished+apple+plate) | The blemished specimen painted as carefully as the perfect one. |
| [Letterpress colophon page](https://www.google.com/search?tbm=isch&q=letterpress+colophon+page+book+typography) | Facts in tiny type at the bottom. Dignity through footnote. |

| Spec | |
|---|---|
| **Ground** | `#F3EDE1` paper cream — full bleed, no cards, no shadows |
| **Ink** | `#16130F` |
| **Series band** | `#E4551F` |
| **Dish codes** | braise `#6E2230` · fry `#E4551F` · soup `#B8B08D` · cold `#2E4A46` |
| **Refuses** | pure white, drop shadows, gradients, radius over 2px, any photograph |
| **Type** | [Akzidenz-Grotesk](https://www.google.com/search?tbm=isch&q=Akzidenz-Grotesk+type+specimen) caps → free: **Archivo**. [Bembo](https://www.google.com/search?tbm=isch&q=Bembo+type+specimen) label line → free: **EB Garamond**. Tight, letterspaced caps, ragged-right, never centred |
| **Material** | Uncoated paper stock. Flat ink. Nothing is glass, nothing glows |
| **Motion (physical)** | A [split-flap departure board](https://www.google.com/search?tbm=isch&q=split+flap+departure+board+solari) setting a line, then a rubber stamp landing |
| **Motion (numbers)** | Bands slide `240ms cubic-bezier(.2,.8,.2,1)`. Title lines stagger `90ms`. Accession number stamps last: `120ms ease-out`, `scale(1.04)→1`, `rotate(-0.5deg)`, stays crooked |

| Beat | What happens | Timing |
|---|---|---|
| **Button** | Full-width flat orange band pinned to the bottom, set like a spine. No icon, no shadow, no rounding. One word. Tap target = the whole band | `60ms` colour darken, no scale |
| **Reveal** | Screen goes to paper. Orange band slides down from the top. Title sets line by line in caps — the accord: `MINCED BEEF / SOFT CARROT / THE LAST OF THE MILK`. Then the small label line, then the accession number stamps crooked | `~900ms` |
| **Rejection** | The cover is *withdrawn* — bands slide back the way they came. Series number increments. The rejected title drops into a back-matter list at the foot: "also considered". A visible record of your fussiness, unremarked | `180ms` out, `600ms` replace |

| Voice | |
|---|---|
| Empty fridge | `The shelf is empty.` |
| Identified | `ONION — in` |
| Got it wrong | `Corrected. Shallot.` |
| Button | `PRESS` |
| Reveal | *(title only)* + `No. 41 in the series` |
| Rejection | `Returned. No. 42.` |

**Refuses:** to explain why it chose this. To show a photograph of the dish. To have a settings screen.

**BUILD: CHEAP.** Divs, transforms, two webfonts, zero assets.
**30-min version:** paper background, one orange band sliding down, three lines of caps staggered 90ms, a crooked number.

---

# T2 — Cut The Deck

> **Thesis:** You don't want a recommendation, you want fate — and a decision stops being
> yours the moment chance makes it.
> **Origin:** Collision 5, with the breaking-to-reveal mechanic from 7.
> **Authority:** None. Nobody is talking. The deck has no opinion, which is precisely why
> you'll obey it — same reason you obeyed shuffle.
> **On being wrong:** It never claimed to be right. Errors are a mis-dealt card, redrawn.

| Reference | Steal this |
|---|---|
| [Tarot de Marseille, Conver 1760](https://www.google.com/search?tbm=isch&q=Tarot+de+Marseille+Conver+1760+cards) | Four flat stencil inks, heavy black keyline, zero shading. |
| [Pochoir stencil printing](https://www.google.com/search?tbm=isch&q=pochoir+stencil+printing+cards) | Colour laid inside a keyline by hand — and not perfectly. |
| [Bicycle rider-back card backs](https://www.google.com/search?tbm=isch&q=bicycle+playing+card+back+design+rider+back) | A dense pattern whose whole job is to withhold. |
| [Gilt edge book block](https://www.google.com/search?tbm=isch&q=gilt+edge+gilded+book+block+fore+edge) | A 2px gold line that makes an object feel expensive. |
| [Green baize card table](https://www.google.com/search?tbm=isch&q=green+baize+card+table+surface) | Your ground. Soft, dark, absorbs light. |
| [Mamluk playing cards, Topkapı](https://www.google.com/search?tbm=isch&q=Mamluk+playing+cards+Topkapi) | Ornament instead of imagery. Nothing depicts anything. |
| [Petit Lenormand cards](https://www.google.com/search?tbm=isch&q=Petit+Lenormand+cards+deck) | Two systems printed on one small face. |

| Spec | |
|---|---|
| **Ground** | Baize `#1E3A2F` |
| **Card face** | Bone `#E9E2D0` |
| **Keyline** | `#0B0D0C` |
| **Stencil inks** | cinnabar `#B32B1E` · Marseille blue `#2B4C9B` · ochre `#D9A441` |
| **Gilt** | `#C9A227` — only as a 2px edge, never a fill, never a gradient |
| **Refuses** | cream as the ground (that's T1), any sans-serif, any explanation, any photograph, any mystical symbol you could buy on a tote bag |
| **Type** | [Bodoni](https://www.google.com/search?tbm=isch&q=Bodoni+type+specimen+didone) caps, wide letterspacing → free: **Bodoni Moda**. [Caslon italic](https://www.google.com/search?tbm=isch&q=Caslon+italic+type+specimen) second line → free: **EB Garamond Italic**. Small, centred, high-contrast, a lot of air |
| **Material** | Card stock on baize. Matte, slightly warm, one gold edge |
| **Motion (physical)** | The cut and the turn. A card flicked over by a thumb — fast, then a small settle |
| **Motion (numbers)** | `rotateY` `420ms cubic-bezier(.45,0,.15,1)` with `3deg` overshoot, then `60ms` settle. Gilt edge catches a `200ms` light sweep passing 90° |

| Beat | What happens | Timing |
|---|---|---|
| **Button** | There is no button. The screen *is* the back of the card — a dense repeating lattice filling everything, gilt edge. One word beneath. Tap anywhere | lifts `4px`, `80ms` |
| **Reveal** | The card turns on its vertical axis. Face: meal name in letterspaced caps, one crude four-ink stencil mark above, the three ingredients beneath like a suit | `420ms` + `60ms` settle |
| **Rejection** | The card goes to the *bottom* of the deck — it comes back another night. The deck **visibly thins**. Five cuts a night; the stack's thickness is the counter. It keeps score and doesn't pretend otherwise | `260ms` |

| Voice | |
|---|---|
| Empty fridge | `The deck is short tonight.` |
| Identified | `Onion. Dealt in.` |
| Got it wrong | `Redrawn. Shallot.` |
| Button | `CUT` |
| Reveal | *(meal name)* + `beef · milk · the last carrot` |
| Rejection | `To the bottom. Four cuts left.` |

**Refuses:** unlimited rerolls. To ever say "recommended for you." To justify itself.

**BUILD: MEDIUM.** Flip needs `perspective` + `backface-visibility`; the back is a `repeating-linear-gradient`, so still zero assets.
**30-min version:** one div, baize bg, diamond lattice back, `rotateY(180deg)` on tap, meal name in Bodoni Moda caps on bone. Skip the deck-thinning counter.

---

# T3 — Enamel, Off-Register
*(this is the one that should feel wrong to you)*

> **Thesis:** Dinner at 11pm is not literature and not fate — it's a hot thing put in front
> of you by someone who has already decided, and it should be as loud and as worn as the
> pan it comes out of.
> **Origin:** Collision 7's salvage (breaking-to-reveal, re-materialised as domestic
> hardware) + collision 3 (colour sampled from the fridge).
> **Authority:** Andrew. Or your grandmother. A person who cooks, who is not asking, and
> who is not being cute about it.
> **On being wrong:** Blunt. Says "not onion," fixes it, moves on. No record, no apology.

**Why it should feel wrong:** it's loud, saturated and unrestrained, sitting right next to
your bubblegum fear. The defence: **bubblegum is plastic, vector, rounded and perfect;
enamel is hard-edged, hand-painted, misregistered and chipped.** Duolingo has no wear.
This has nothing but wear. If you reject it, reject it because you don't want to be
shouted at — not because you think it's tacky.

| Reference | Steal this |
|---|---|
| [Polish enamel shop signs](https://www.google.com/search?tbm=isch&q=szyld+emaliowany+polish+enamel+sign+vintage) | Saturated ground, cream lettering, black keyline, chipped edges. |
| [French plaque émaillée street plates](https://www.google.com/search?tbm=isch&q=plaque+%C3%A9maill%C3%A9e+fran%C3%A7aise+rue+vintage) | Blue field, white type, a thin border framing everything. |
| [Vintage chipped enamelware](https://www.google.com/search?tbm=isch&q=vintage+enamelware+kitchen+chipped+blue+white) | The speckled chip. Your one texture. |
| [Risograph misregistration](https://www.google.com/search?tbm=isch&q=risograph+print+misregistration+offset+colour) | Colour layer landing 1.5px off the keyline. Never corrected. |
| [Tin toy lithography](https://www.google.com/search?tbm=isch&q=vintage+tin+toy+lithograph+printing+detail) | Flat inks on metal, slight wear at the folds. |
| [Bialetti Omino packaging](https://www.google.com/search?tbm=isch&q=Bialetti+Omino+vintage+packaging+illustration) | Character from a mark, not from a mascot. |
| [Soviet enamel kitchen tins](https://www.google.com/search?tbm=isch&q=soviet+enamel+kitchen+tin+canister+vintage) | Bold condensed caps on a colour field. |

| Spec | |
|---|---|
| **Ground** | Enamel blue `#1B4B8F` — the *screen* is the colour, not the content |
| **Lettering** | Cream `#EFE7D2` |
| **Second ink** | Pillarbox `#D22B1E` |
| **Accent** | Yolk `#F2B705` |
| **Keyline** | `#101418`. Chip speckle: cream dots at 3% opacity |
| **Refuses** | paper texture, white grounds, thin type, anything centred, restraint, photography |
| **Type** | [Druk Condensed](https://www.google.com/search?tbm=isch&q=Druk+Condensed+type+specimen+commercial+type) shouting → free: **Anton**. [Bureau Grot](https://www.google.com/search?tbm=isch&q=Bureau+Grotesque+type+specimen) elsewhere → free: **Archivo Condensed**. Cramped, left-locked, oversized, breaking out of the frame |
| **Material** | Vitreous enamel on steel. Hard, glossy, chipped at the corners |
| **Motion (physical)** | An enamel tray dropped flat on a counter. Then the second colour plate arriving *late and crooked* |
| **Motion (numbers)** | Keyline lands `180ms cubic-bezier(.34,1.56,.64,1)` (overshoot). Colour layer follows `60ms` later at `translate(1.5px,-1.5px)` and **never corrects**. `40ms` 2px shake on land |

| Beat | What happens | Timing |
|---|---|---|
| **Button** | A large enamel push-plate, like a shop counter bell — red disc, cream keyline, sitting slightly off-centre on the blue field. One word | depresses `2px`, `50ms`, hard ease |
| **Reveal** | Black keyline text lands first with a visible thump. `60ms` later the cream colour plate arrives 1.5px off-register and stays wrong. Meal name set enormous, *breaking out of the frame*, clipped by the screen edge | `~280ms`. Fast. It does not perform for you |
| **Rejection** | Takes the plate away with no comment and hands you another — **faster each time**. `180ms → 120ms → 90ms → 70ms`. By the fourth no it's slapping them down. That's the entire personality, and not one word of it is written | escalating |

| Voice | |
|---|---|
| Empty fridge | `There's nothing in there.` |
| Identified | `ONION` |
| Got it wrong | `Not onion. Fixed.` |
| Button | `RING` |
| Reveal | *(meal name, oversized, clipped)* |
| Rejection | `Another.` |

**Refuses:** to be quiet. To centre anything. To correct the misregistration — the offset is the signature, not a bug.

**BUILD: CHEAP–MEDIUM.** The whole effect is one duplicated heading, offset, in a second colour.
**30-min version:** blue bg, `<h1>` in Anton clipped by the viewport, duplicated underneath at `translate(1.5px,-1.5px)` in cream with the keyline copy in near-black on top, `180ms` overshoot easing. The misregistration alone tells you if it's alive.

---

## How they oppose each other

| | T1 Paperback | T2 Cut The Deck | T3 Enamel |
|---|---|---|---|
| **Feeling evoked** | **Being taken seriously.** Leftovers treated with the gravity of a published work. Quiet private ceremony — elevated without being flattered | **Absolution.** A beat of anticipation, then it's out of your hands. Off the hook because chance decided | **Being looked after by someone brusque.** Relief through being bossed. Warmth with no sweetness, no asking |
| **Serves which answer** | Q7 / (c) — make tonight a small occasion | Q3 — the shuffle that didn't ask me anything | Q2 / Q7 — Andrew, and the grandmother |
| Who's talking | an editor | nobody | a person who cooks |
| Occasion from | format | ritual | force |
| Wrongness | unbothered, corrects | never claimed | blunt, fixes it |
| Rejection | polite record | keeps score, limits you | gets impatient |
| Ground | cream paper | dark baize | saturated blue |
| Speed | measured, 900ms | ceremonial, 480ms | fast, 280ms |

No two share a palette, a tempo or an authority. **If you want to blend two, that's the
indecision — the blend is always beige.**

The three feelings are incompatible by construction: **dignity** is slow and needs you to
look at it, **absolution** requires suspense and a withheld moment, and **being bossed**
has to be fast and refuse ceremony. A reveal cannot be both a held breath and a slap.

Note the gap: stated most-true was "a small occasion" (T1), but the instinctive answers —
Andrew deciding, the grandmother at the reveal — point at T3. That gap is what the
decide session is for.

---

## Next

1. **Build three crude reveals, 30 min each, in this order: T1, T3, T2.**
2. **Same fake meal in all three:** `MINCED BEEF, SOFT CARROT, THE LAST OF THE MILK`.
   Same content, three arguments — that's the experiment.
3. **Only the reveal.** No button, no scan, no nav. One screen, one tap to replay.
4. **Record each on your phone.** Watch the three clips back to back with the sound off.
5. **One line per territory:** what you felt in the first half-second, before you had an opinion.
6. **Do not decide.** Deciding is a different session.

## Moves the director resisted — practise these

| Move | Where it dodged |
|---|---|
| **Subtraction** | Kept flinching from removing the screen, the words, the reveal itself. Every subtraction (collisions 11, 12) got called a dud. Some of those were protecting the deliverable. |
| **Exaggeration to absurdity** | Pulled every territory back toward taste at the last moment. T3 is the only one where the volume stayed up, and even that got a defence paragraph. |
| **Reversal** | "What if it refused to tell me" is the strongest idea in Step A and it's in none of the three, because it was inconvenient to build. Inconvenience is not the same as wrong. |
