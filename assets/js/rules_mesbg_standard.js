// ─── MESBG Standard Rules Library ─────────────────────────────────────────
// Source: Rules Manual 2024 (pp. 122-131) & Heroic Actions chapter.
// This file is the single source of truth for all standard MESBG rules.
// DO NOT edit descriptions here — update the source MD files and re-export.
// ──────────────────────────────────────────────────────────────────────────

const STANDARD_RULES = {
  "Backstabbers": "This model receives a bonus of +1 To Wound when making Strikes against a Trapped model.",

  "Blades of the Dead": "Models with this special rule don't roll To Wound when making Strikes in the usual way. Instead, when this model makes a Strike, the target counts their Defence value as 10 minus their Courage characteristic. So a model with a Courage of 8 would treat their Defence as 2 (10−8) when a model with this special rule makes a Strike against them.",

  "Bodyguard": "All models with this special rule in an Army must select a Hero to bodyguard; this will automatically be the General if they share the same Faction keyword. If the General does not share the same Faction keyword, then they will bodyguard the Hero with the highest Heroic Tier among those who do — you may choose if several are tied. All models of the same type must choose the same Hero to bodyguard. So long as the bodyguarded Hero is alive and on the battlefield, all bodyguarding models automatically pass all Courage Tests they are required to take.",

  "Expert Rider": "A Cavalry model with this special rule may re-roll the dice on any Jump, Swim or Thrown Rider Tests, and can pick up Light Objects without having to Dismount. Additionally, a model carrying both a bow and a shield still gets the +1 Defence bonus for having a shield whilst they remain mounted.",

  "Fearless": "A model with this special rule automatically passes any Courage Test it is required to take.",

  "Fly": "A model with this special rule ignores intervening models and terrain when it Moves — flying over buildings, woods and so on, and ignoring vertical distance. It cannot end its Move overlapping another model, within woodland terrain, or on a surface it cannot balance upon safely. If the model wishes to do something part way through its Move whilst flying (such as cast a Magical Power), it must land first. If a model with this special rule chooses not to Fly, it treats its Move Value as 4\" and gains none of the benefits of this rule.",

  "Hatred (Mordor)": "This model gains a bonus of +1 To Wound when making Strikes against models with the Mordor keyword.",

  "Hatred (Rohan)": "This model gains a bonus of +1 To Wound when making Strikes against models with the Rohan keyword.",

  "Heroic Channelling": "A Hero who declares Heroic Channelling will count the result of their next Casting Test this turn as a 6. As a result, they do not need to roll the dice for the Casting Test, but will still need to spend a Will Point to Cast the Magical Power as normal.",

  "Heroic Challenge": "Declare an enemy Hero within 6\" of the same Heroic Tier or higher as the target. Whilst Engaged in Combat with the target, this Hero gains +1 Attack (in the Duel Roll and when making Strikes) and +1 To Wound against them. If the Hero slays the target, they immediately regain 1 Might Point (cannot exceed their starting limit). The target may accept — gaining the same bonuses and being forced to Charge the Hero — or decline, gaining no benefits but preventing them from issuing their own Heroic Challenge against this Hero.",

  "Heroic Defence": "This Hero will only suffer a Wound on the roll of a natural 6 in the ensuing Fight Phase, regardless of any special rules, modifiers, Brutal Power Attacks or the use of Might. If the Hero would normally be wounded on a 6+/4+, 6+/5+, or 6+/6+, then they will only be wounded if both rolls are a natural 6. Heroic Defence does not confer to the Hero's Mount.",

  "Heroic March": "This Hero adds 3\" to their Move Value for the duration of the Move Phase (Infantry, Chariot, or War Beast keyword), or 5\" if they have the Cavalry keyword or the Fly special rule. The Hero may not Charge this Move Phase. The Hero may shout 'At the Double': all friendly models within 6\" gain the same Move bonus but cannot Charge and must finish their Activation within 6\" of the Hero.",

  "Heroic Resolve": "Friendly models within 6\" of this Hero gain an additional free dice when making Resist Tests until the End Phase of the turn (including models with no Will Points remaining). Additionally, the Hero automatically passes any Courage Tests caused by their Army being Broken that turn. If Charged before they Activate, the Hero may still Activate solely to provide a Stand Fast.",

  "Heroic Strength": "This Hero counts their Strength characteristic as double (to a maximum of 10) when making Strikes until the End Phase of the turn.",

  "Heroic Strike": "This Hero adds D3 to their Fight Value for the duration of the Fight Phase (to a maximum of 10). The D3 is rolled at the start of the first Combat the Hero is involved in that Fight Phase and lasts for the duration of the Fight Phase. This bonus is always applied after any other effects that would affect Fight Value.",

  "Horse Lord": "Whenever the Mount of a model with this special rule suffers a Wound, roll a D6 — on a natural 6, the Wound is ignored. Additionally, this model can use their own Fate Points to prevent Wounds inflicted upon their Mount.",

  "Leader (Citadel Guard)": "A model with this special rule can include Citadel Guard Warrior models in their Warband.",

  "Leader (Guard of the Fountain Court)": "A model with this special rule can include Guard of the Fountain Court Warrior models in their Warband.",

  "Mighty Hero": "This model gains a free Might Point at the start of each turn, even if their store of Might is full. If this free Might Point has not been spent by the end of the turn, it is lost.",

  "Poisoned Attacks": "This model must re-roll any To Wound Rolls of a natural 1 when making Shooting Attacks or making Strikes. When a specific weapon is described as benefiting from this special rule, only To Wound Rolls made for that weapon may re-roll To Wound Rolls of a natural 1.",

  "Resistant to Magic": "Every time this model is targeted by a Magical Power, they gain an additional free dice when making a Resist Test, even if they have no Will Points remaining or decide not to use any Will Points. This is cumulative with other rules that confer a similar effect.",

  "Sharpshooter": "When this model makes a Shooting Attack targeting a Cavalry model, it may choose either the rider or the Mount as its target. If it hits the targeted Cavalry model, it does not need to make the In The Way Test to see which part is hit — it automatically hits the part of the model it targeted.",

  "Shieldwall": "If this model is carrying a shield, whilst in base contact with two or more other friendly models who also have this special rule and are carrying a shield, this model receives an additional +1 bonus to its Defence (calculated before the model Backs Away). Models that are Prone or have the Cavalry keyword cannot benefit from or provide this bonus.",

  "Spectral Walk": "A model with this special rule is never slowed by Difficult Terrain. Additionally, this model always counts as rolling a 6 for any Climb, Jump, Leap or Swim Tests.",

  "Sworn Protector (Denethor)": "Whilst Denethor is alive and on the battlefield, this model automatically passes all Courage Tests it is required to make.",

  "Terror": "If a model wishes to Charge a model with this special rule, it must take a Courage Test at the start of its Move. If the test is passed, it may Charge as normal. If the test is failed, it cannot Move that turn, but may otherwise act normally.",

  "Throw Stones": "Range 8\", Strength 1. If this model does not Move during the Move Phase, it may make a Shooting Attack during the following Shoot Phase.",

  "Woodland Creature": "This model may Move through woods and forests that are classed as Difficult Terrain as if they are Open Ground. If a Cavalry model has this special rule but their Mount does not, this rule does not apply to the Mount. If a Mount has this rule, it still gains Cavalry Charge bonuses when it Charges.",
};
