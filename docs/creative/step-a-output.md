# Step A — divergence (Mon 2026-09-21)

Scan the tables. Click the lookup links — they go to image search.

---

## 1. The read

| Finding | Why it matters |
|---|---|
| Your fridge is full of **halves**, not ingredients | Every recipe app designs for a full fridge + shopping list. Yours is about what's left. |
| *Perfume* is your product's structure | Raw matter → combination → a result more than its parts, revealed in one moment. |
| Spotify = the real target | Not "tell me what to eat". It's "widen my vision" — and it didn't ask you anything. It just went. |
| Frost is a **finish, not an argument** | Finishes are what you reach for before deciding what the thing believes. Keep as texture, not as the idea. |

### Why your two reference images fail

| Failure | The tell |
|---|---|
| White cards, soft bg, drop shadow | Nothing was decided about hierarchy, so everything got a box |
| Cut-out food photography | Reads supermarket = "product", not "dinner" |
| Perfect glossy produce | A lie about a fridge of soft carrots |
| Decorative green | The colour means nothing, it just sits there |
| No hero moment | Both are filing cabinets. Nothing ever happens. |

---

## 2. Ten domains — look these up

| # | Domain | The one transferable idea | Look up |
|---|---|---|---|
| 1 | **Perfumery** | Materials organised by *volatility*, not category. Top / heart / base. | [perfume organ](https://www.google.com/search?tbm=isch&q=perfume+organ+perfumer+bench) · [note pyramid](https://www.google.com/search?tbm=isch&q=fragrance+note+pyramid+diagram) · [formula sheet](https://www.google.com/search?tbm=isch&q=perfume+formula+sheet+grams) |
| 2 | **Mycology** | The herbarium sheet: one specimen, huge empty ground, small dense label in the corner. | [spore print](https://www.google.com/search?tbm=isch&q=spore+print+mushroom) · [herbarium sheet](https://www.google.com/search?tbm=isch&q=herbarium+sheet+specimen+label) |
| 3 | **Pomology** | Decay rendered with dignity and zero irony. Blemished fruit painted as carefully as perfect fruit. | [USDA watercolours](https://www.google.com/search?tbm=isch&q=USDA+pomological+watercolor+collection) · [Passmore](https://www.google.com/search?tbm=isch&q=Deborah+Griscom+Passmore+watercolor) |
| 4 | **Series publishing** | Colour as a coded *index*, not decoration. Format does the dignifying. | [Marber grid](https://www.google.com/search?tbm=isch&q=Penguin+Marber+grid+crime+covers) · [Fleckhaus spines](https://www.google.com/search?tbm=isch&q=Bibliothek+Suhrkamp+Fleckhaus+spines) |
| 5 | **Pigment & colour cards** | A usable dry voice: deadpan, oddly specific, never trying to be funny. | [Werner's Nomenclature](https://www.google.com/search?tbm=isch&q=Werner%27s+Nomenclature+of+Colours+1814) · [Kremer jars](https://www.google.com/search?tbm=isch&q=Kremer+Pigmente+pigment+jars) · [Farrow & Ball card](https://www.google.com/search?tbm=isch&q=Farrow+and+Ball+colour+card) |
| 6 | **Tarot / cartomancy** | The *back* of the card — an object that visibly withholds. | [Marseille card backs](https://www.google.com/search?tbm=isch&q=Marseille+tarot+card+back+pattern) · [Colman Smith](https://www.google.com/search?tbm=isch&q=Pamela+Colman+Smith+tarot+1909) |
| 7 | **Meteorology** | Stated confidence is a personality. The only interface where being wrong is priced in. | [pressure chart](https://www.google.com/search?tbm=isch&q=Met+Office+surface+pressure+chart) · [station model](https://www.google.com/search?tbm=isch&q=weather+station+model+symbol+diagram) |
| 8 | **Radio / the segue** | Rejection is a *segue*, not a reroll. The next one comes from the last. | [mixtape j-card](https://www.google.com/search?tbm=isch&q=handwritten+mixtape+j-card) · [cue sheet](https://www.google.com/search?tbm=isch&q=radio+cue+sheet+continuity) |
| 9 | **Ikebana** | Asymmetry with stated angles. One dominant, one offset, one small, vast empty space. | [shin soe hikae](https://www.google.com/search?tbm=isch&q=ikebana+shin+soe+hikae+diagram) · [kenzan](https://www.google.com/search?tbm=isch&q=kenzan+ikebana+pin+holder) |
| 10 | **Lost-wax casting** | The mould must break for the object to appear. | [sprue tree](https://www.google.com/search?tbm=isch&q=lost+wax+casting+sprue+tree) · [foundry pour](https://www.google.com/search?tbm=isch&q=foundry+molten+pour+dark) |

---

## 3. Sixteen collisions

`MVP?` = buildable by Friday, given the app only identifies ingredients (no decay/freshness detection).

| # | Collision | What it actually is | Verdict | MVP? |
|---|---|---|---|---|
| 1 | Perfume organ × **scan** | Fridge sorts by volatility: TOP cilantro/scallion · HEART celery/carrot · BASE beef/butter. Recipe = an "accord". | **Alive — strongest** | ✅ as a static lookup per ingredient. ❌ "2 days left" countdowns |
| 2 | Penguin × **reveal** | Meal arrives as a book cover. Type only. Series number increments forever. | **Alive — cheapest hero** | ✅ |
| 3 | Werner's × **detection** | Each ingredient gets a colour chip sampled from your camera frame + deadpan label. Palette differs nightly; you never chose it. | **Alive** | ✅ ~20 lines JS |
| 4 | Radio segue × **rejection** | Next meal keeps one ingredient from the one you refused, and shows the handoff. | **Alive** | ✅ |
| 5 | Tarot back × **button** | The button is a card *back*. Dense, unreadable, withholding. You turn it. | **Alive** — twee risk | ✅ |
| 6 | Pomology × **being wrong** | Correction = a re-annotated label. Wrong name struck through, correction beneath, dated, second hand. | **Alive** | ✅ |
| 7 | Casting × **reveal** | A block covers the screen, cracks, falls away. | Half-dud — hostile | ✅ but wrong mood |
| 8 | Ikebana × **empty fridge** | Three-line diagram with nothing on the lines. Emptiness as composition. | **Alive** (one screen) | ✅ |
| 9 | Forecast × **reveal** | "Tonight: bolognese. 70%." | Half-dud — you banned parking tickets | ✅ |
| 10 | Dorian Gray × **inventory** | The app's picture of your fridge decays if you don't cook. | **Dud** — punishes what the app forgives | ❌ |
| 11 | No screen at reveal | Black screen, one haptic, one word. | **Dud** — deletes the screenshot | ✅ |
| 12 | Refuses to name the meal | Gives only the first instruction. | **Dud** for Friday | ❌ |
| 13 | Press-and-hold pour | Hold to cast; let go early and it fails. | **Dud** — a skill test to get relief | ✅ |
| 14 | Museum label × **accepted meal** | "Bolognese. 2026. From the collection of the fridge. Acc. no. 0041." | **Alive — the dry-humour fix** | ✅ |
| 15 | Spore print × reveal | Blur sharpening into focus. | **Dud** — a fade in a costume | ✅ |
| 16 | Fleckhaus × **history** | Meals coloured by type. After 3 weeks your history reads as a shelf. | **Alive — cheap, looks expensive** | ✅ |

---

## 4. The pattern

**Everything that survived is type, flat colour, timing and layout.**
**Everything that died needed an asset, a skill, or a joke.**

That's not a Friday compromise — it's the answer to "personality without twee, without photography".

Two to notice: **#14** is how you get wit without writing jokes (the humour is the mismatch between an institutional format and a sad tomato). **#15** was planted as a trap — strip the mycology and it's `filter: blur()`.
