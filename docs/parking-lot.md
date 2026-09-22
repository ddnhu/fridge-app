# Parking lot

One line per idea. Not lost — dated. Nothing here is being built before the
Friday demo; the point of writing it down is to stop re-deciding it at midnight.

---

## 2026-09-22 — the Diaries view

A shelf of spines, one per meal cooked, each spine banded with the colours of
what went into it and set with the dish name running vertically. Danni's
sketch. **Explicitly not for the demo** — it needs weeks of entries before a
shelf of two looks like anything other than a shelf of two.

The data it needs now exists: `src/cooked-store.js` keeps `{ id, name, date,
at, photo }` per meal cooked, so nothing has to be reconstructed later.

**The question to settle before it's built:** the sketch uses five or six
colours. The direction is two inks, and "every screen that wants a third gets
redesigned instead". So either the spines are the one place the rule breaks
(with a reason — the colours are *data*, sampled from the meal, not
decoration), or they're built in ink and red only and the variation comes from
band proportion instead of hue. That's a real decision, not a styling detail,
and it's the reason this isn't a quick build.

---

## 2026-09-22 — OFF the parking lot: the post-meal photo

Parked on 21 September as "needs a post-meal capture flow, storage and a
history view". Built today at a third of that scope: the capture flow and the
storage, on the steps screen, with no history view. One photo, on the dish you
cooked, tonight.

**What it cost:** the camera and fridge screens still look like a different
app. That was Wednesday's block 4 and it's the first item on the build plan's
own cut list.

---

## 2026-09-22 — quantities

**Halves.** `quantity` is already a number, so 0.5 steps and `½` / `1½`
formatting is the whole job. **~45 min.** The most on-thesis of the three: a
real fridge is halves and ends, which was Danni's own first answer, and it
feeds the reveal's "the last of the ___".

**Unit display (mL, g, a bunch).** Needs a unit per ingredient — 92 rows with
real judgment in them (cheese by gram or by block? mint by bunch?) — plus
unit-aware step sizes and formatting in both steppers. **~1.5 h.**

**Recipes knowing amounts.** The expensive one: all 54 recipes need a quantity
per ingredient and the matcher has to compare them. **~4–6 h.**

**Why it's parked, beyond the cost.** Amounts introduce a failure the app
doesn't currently have: matching stops asking "do you have milk?" and starts
asking "do you have *enough* milk?", so a full-looking fridge can start
answering "Nothing sets tonight." because it's 50mL short.

And it cuts against the thesis. The app exists so you don't have to think at
11pm; asking for 250mL adds a decision at the exact moment the product is
removing one. Halves are the exception — that isn't precision, it's the honest
state of the fridge.

**If one gets built first, it's halves.**

---

## 2026-09-21 — from the mood board round

**AI-generated illustration of the dish.** Needs an API and a key, which can't
live in client-side code on a public Pages URL, and it adds seconds to a reveal
tuned to ~1.2s. Also worth re-reading the anti-brief first: "too photo heavy"
was Danni's own diagnosis of why the reference apps read as generic, and an
illustration is a picture of the dish.

**Photograph your food after you cook it.** The strongest of the three. It
closes a loop the design only implies — the stamp says *it's done*, but nothing
proves you cooked it — and it earns the diary rather than decorating it. Needs
a post-meal capture flow, storage and a history view.

**Stickers ("quick", "yum").** Same register as the bubblegum anti-brief from
session one, and against the feeling sentence it asks the user to perform
enthusiasm rather than acting in their favour. Reconsider only with a much
drier vocabulary.

---

## Deferred in the decision record

**The history slip** — stamps piling up, one per day. Named in
`docs/creative/decision-record.md` and deferred there: it needs persistence and
weeks of data before it means anything.

**Dish colour coding** — a braise is oxblood, a fry is cadmium. Died with the
catalogue logic when the accession number became a date, but the mechanism is
worth remembering.

---

## Still open, not parked — decide during Wednesday's styling

- thin red rule vs a thick top band at the top of the reveal
- Archivo, or a warmer grotesque
- the reveal runs ~1.2s end to end; too slow at 11pm?
