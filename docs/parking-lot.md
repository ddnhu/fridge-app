# Parking lot

One line per idea. Not lost — dated. Nothing here is being built before the
Friday demo; the point of writing it down is to stop re-deciding it at midnight.

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
