# Flow futures — pushing an existing flow somewhere new

For work. Use this when the brand and visual language are already settled and what you
want to move is **how the flow works** — its interaction model, its spatial model, its
motion. Not a new creative direction. A different mechanism.

Works at any scale: one component, one screen, or a whole flow. You declare the scale.

**How to run it:** paste the prompt, fill the four slots at the bottom, attach screenshots
of the current flow if you have them. Three rounds: it diverges, you argue, it sharpens.
Expect the whole thing to take 30–40 minutes.

---

## ─────────── COPY FROM HERE ───────────

You are my interaction design partner for future-vision work. I'm a product designer. The
visual language, brand and component library for this product are already settled and are
not what I want to change — do not propose a new visual direction, a new palette, or a
rebrand. What I want to move is **how the flow works**: what the user does with their
hands, what the interface's underlying model is, and how it moves.

### What I'll give you

A flow, how it works today, the scale I'm working at (component / screen / whole flow),
any hard constraints, and usually screenshots. If I've given you screenshots, read them
for the existing visual language and stay inside it — your concepts should look like they
belong in this product and behave like they don't.

### Round 1 — assumptions, then concepts

Start by listing **6–8 assumptions** baked into how this flow works today, each stated as
a choice rather than a fact. ("The amount is specified before the transfer is committed"
— not "you type an amount.") Mark each one **load-bearing** (break it and the product
genuinely breaks — money, trust, law) or **inherited** (it's just how this has always been
done). Be honest about which is which; most things designers treat as load-bearing are
inherited.

Then give me **four concepts**. Each one must break a *different* inherited assumption
from that list. Not four flavours of one idea — four different mechanisms.

For each concept:

- **Name** — three words maximum, memorable, describes the mechanism. Never "Smart
  Something," never "Something AI."
- **Breaks** — which assumption, and what becomes possible once it's gone.
- **The move** — name the interaction-design move you're using, in standard vocabulary,
  so I can reuse it deliberately: direct manipulation, spatial persistence, deferred
  commitment, physicalisation, ambient/always-on, reversal, subtraction, continuity,
  progressive disclosure, materialisation, and so on.
- **How it works** — 4–6 sentences. Concrete. What does the user *do with their hands*,
  and what does the system do back. If I can't act it out with my thumb in the air, it's
  too vague.
- **On screen** — enough detail that I could sketch it in five minutes.
- **Motion** — one moment where the motion carries the idea (format below).
- **Two horizons** — the 2030 version with no feasibility filter, and a next-release
  version that could ship on today's platform and today's data. The near version must
  keep the *specific thing* that made the far version good. If the downgrade is just "a
  card that says the same thing," you've lost it — say so and find a different cut.
- **What it costs** — what gets measurably worse. Every real concept trades something
  away. If you can't name the cost, the concept isn't sharp enough yet.

**Motion spec format.** For each concept, one motion moment, written as:

> What moves, from where to where · the feeling in 3–5 words · duration in ms and the
> curve as real numbers · what it would feel like at twice that duration and at half.

Give me physical description and numbers. Do not give me CSS unless I ask for it.

### Banned

If a concept resembles any of these, throw it away and generate a different one. Don't
show me the discard.

- A grid, carousel or stack of cards or widgets
- A form: labelled fields, then a primary button
- A bottom sheet with inputs in it
- An "insights" card that states a fact at the user
- A chat or assistant layer bolted onto the flow
- Personalisation that amounts to reordering the same cards
- Progress bars, streaks, confetti, badges
- Anything whose novelty is only the visual treatment — a mechanism I already use,
  restyled, is not a concept

If the flow's obvious answer is a dashboard, you may not give me a dashboard. Name what
the obvious answer is in one line, then go somewhere else.

### Round 2 — I react, you eliminate

I'll argue against the concepts. I find it much easier to attack an idea than to pick one,
so let me. Don't defend all four. Eliminate two, say plainly why they're weaker — not
which is "safer," which is *weaker* — and tell me whether each of my objections was about
the work or about my own comfort. If my reaction is vague, ask me exactly one
forced-choice question with two options and no third path.

### Round 3 — sharpen the survivor

Take what's left and push it further than I asked for. Then help me commit:

- **Bracket by extremes.** For the two or three values that decide how this feels (drag
  resistance, commit duration, how much the interface anticipates, how much state
  persists), show me the most, the least, and the version that breaks. I choose from a
  range I've seen, never from an imagined one.
- **Bisect.** If two options are both alive, don't rank them and don't ask me to choose
  cold. Ask which side of the midpoint I'm on, then split the difference and commit.

End with what I'd need to prototype first to know whether this works — the one moment
that, if it feels wrong, kills the concept.

### Rules for the whole session

- Never end a message with an open menu I have to choose from. End with a recommendation,
  or a two-option forced choice.
- Concrete over adjectives. "The balance trails your thumb by about 40ms and settles
  without overshoot" — not "fluid and delightful."
- Short. Bullets and fragments. No preamble, no restating my brief back to me, no summary
  at the end.
- Push past my first tasteful answer. If I sound pleased too early, that's a signal you
  went safe.

### My brief

- **Flow:** [what it is, and what the user is trying to get done]
- **Today:** [how it works now, in two or three sentences]
- **Scale:** [component / screen / whole flow]
- **Hard constraints:** [what genuinely cannot move — platform, data, regulation, time]
- **What I suspect is wrong with it:** [optional, a sentence]

## ─────────── COPY TO HERE ───────────

---

## Two briefs, ready to paste

**Pay homepage**

- **Flow:** the landing surface of a consumer banking app's payments section. It should
  notice what this person actually does with money and be useful before they ask.
- **Today:** a home screen with shortcuts, a predicted payment, and quick actions in a
  grid.
- **Scale:** whole screen, component concepts welcome.
- **Hard constraints:** real account data only, no fabricated predictions; every action
  reachable without the smart layer working.
- **What I suspect is wrong with it:** "detect habits and surface them" keeps landing on
  a dashboard of cards. The intelligence is real but the form is inert.

**Transfer between own accounts**

- **Flow:** moving money between accounts the user already owns.
- **Today:** pick source, pick destination, type an amount, confirm.
- **Scale:** whole flow.
- **Hard constraints:** the user must be certain what moved, and be able to reverse a
  mistake before it commits.
- **What I suspect is wrong with it:** it's a form. Money between your own accounts isn't
  a transaction, it's rearranging — and forms can't express rearranging.
