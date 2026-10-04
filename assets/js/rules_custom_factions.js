// ─── Custom Faction Rules Library ──────────────────────────────────────────
// Source: MESBG Project — faction-specific rules created for this project.
// These are NOT in the official Rules Manual. Edit here to update tooltips.
// ──────────────────────────────────────────────────────────────────────────

const CUSTOM_RULES = {
  "The Marked Quarry": "Before deployment, secretly nominate one enemy Hero. Whilst within 12\" of that Hero, Ramsay gains +1 Attack and the nominated Hero must spend 1 additional Will Point for every Heroic Action they declare. The nomination is revealed on first base contact, or at the end of the game.",

  "The Bastard's Hounds": "Once per game, at the start of the Move Phase, place D3 Bolton Hounds (Mv 10\"/Fv 3/S 3/D 3/A 1/W 1/C 3+; no Might, Will or Fate; Terror (Warrior)) in base contact with Ramsay.",

  "Discipline of the Dreadfort": "Dark North Spears within 6\" of a Bolton Line Commander activate Unbreakable Formation on a 3+ instead of a 4+.",

  "Unbreakable Formation": "(Requires a formation shield.) When this model is Charged, roll a D6; on a 4+ the charging model loses its Charge bonus. When using Shielding, roll one additional dice in the Duel Roll. Move Value drops to 5\".",

  "Northern Impetus": "When this model Charges and beats its opponent's Duel Roll by 3 or more, the defending model is automatically knocked Prone even if it is not Wounded. This has no effect against Mounts or against Monster, Siege Engine and War Beast models.",

  "Champion's Crush": "When this model wins a Combat by 3 or more on the Duel Roll, it may choose either to knock its opponent Prone as normal, or to push that model D3\" directly away in a straight line. Every model in that path suffers an automatic Strength 4 hit.",

  "Terror of the Horde": "This model causes Terror. If an enemy model fails a Courage Test caused by this model's Terror, it suffers a permanent -1 penalty to its Courage for the rest of the game (not cumulative between different models).",

  "Harbinger of Evil (6\")": "An enemy model within 6\" of this model suffers a -1 penalty to any Courage Tests it is required to make. This is not cumulative with other special rules that provide a similar effect.",

  "Call of the Storm": "Once per game, in the Shoot Phase, choose an enemy model within 12\". That model suffers a Strength 6 hit with no armour save allowed. Every enemy model within 3\" of that target also suffers a Strength 3 hit.",

  "War Cry": "Horde models within 6\" of the Shaman add +1 to their Courage Tests. Once per game the Shaman may proclaim the War Cry: all friendly models within 12\" automatically pass Courage Tests caused by their Army being Broken until the end of that turn.",

  "Lok'tar!": "When this model Charges a target that is already Engaged in Combat with another friendly Grunt, it adds +1 to its Duel Roll for that round of Combat.",

  "Oblivious to Pain": "PASSIVE. Whenever this model suffers a Wound, roll a D6. On the roll of a natural 6, the Wound is ignored.",

  "Raptor's Bite": "When this model Charges successfully, before the Combat is resolved the raptor makes one additional automatic Strength 3 hit. This hit cannot be prevented by a shield.",

  "Veteran Swordsmanship": "Instead of making its normal Strikes, the rider may choose to make two Strikes at Strength 4 with the Orc katana. This cannot be combined with a lance.",

  "Palantír": "ACTIVE. Once per game, during the Priority Phase but before the roll for Priority, Saruman can use the Palantír to automatically win the roll to choose who has Priority for that turn. If both sides have a special rule allowing them to do this and both wish to use it in the same turn, players roll off as normal and both special rules count as being used.",

  "Voice of Curunír": "ACTIVE. The range of Saruman's Stand Fast is 12\" rather than 6\". Additionally, friendly Hero models can benefit from Saruman's Stand Fast.",

  "Saruman's Deceit": "PASSIVE. At the beginning of the game, after both sides have deployed, Saruman may choose a single enemy Hero. The chosen Hero suffers a -1 penalty to any Resist Tests they take when targeted by a Magical Power Cast by Saruman; though a natural 6 will still count as a 6.",

  "Wormtongue": "PASSIVE. An enemy Hero within 6\" of Gríma must spend 2 Might Points rather than 1 in order to declare a Heroic Action.",

  "A Traitor Within": "PASSIVE. Gríma can be deployed either as part of Saruman's Warband (without taking up a space in it) or as part of the enemy Army, where enemy models treat him as a friendly model until Saruman is slain, Gríma Charges, destroys an enemy Siege Engine or interacts with an Objective Marker. See the full rulebook entry for the complete deployment rules and restrictions.",

  "\"Find the Halflings\"": "ACTIVE. In Scenarios that use the Maelstrom of Battle special rule, Lurtz's Warband does not roll to determine where they arrive. Instead, Lurtz may choose the result.",

  "Shield Throw": "PASSIVE. If Lurtz has been equipped with a shield, then once per game he can use it as a throwing weapon and may re-roll the To Hit Roll. This has a Strength of 4 and any model on a 25mm base that is hit is immediately knocked Prone. Once thrown, Lurtz no longer carries the shield, though his Defence is not reduced as a result.",

  "Head Taker": "ACTIVE. Should Uglúk's Army be Broken, at the start of his Activation, instead of taking his Courage Test he can choose to kill a friendly Warrior model within 2\" of him (remove it as a casualty). If he does, he automatically passes the Courage Test, and his Stand Fast is increased to 12\" and affects both Hero and Warrior models.",

  "\"Looks like meat's back on the menu, boys!\"": "ACTIVE. At the start of his Activation, Uglúk can kill a friendly Orc Warrior within 2\" of him; remove the killed model as a casualty. If he does, all friendly Uruk-hai models within 6\" of him gain the Fearless special rule and a bonus of +1 To Wound when making Strikes until the end of the turn. If Uglúk does this in a turn in which his Army is Broken, it also counts as triggering Head Taker.",

  "\"Let's put a maggot hole in your belly\"": "ACTIVE. If Grishnákh wins a Duel Roll and there are no other allies involved in the Combat (including Supporting models), he may choose a single enemy model on a 25mm base that he was Engaged in Combat with and roll a D6. On a 4+, the chosen model is knocked Prone before Strikes are made.",

  "Cunning Mind": "PASSIVE. Whenever Snaga benefits from the Heroic Action of another friendly Hero, he may roll a D6. On a 5+, Snaga may regain a Might Point that he spent earlier in the battle. Additionally, Snaga may choose not to benefit from the Heroic Move or Heroic March of a friendly Hero, in which case he does not forego his Activation.",

  "Riding Dagger": "ACTIVE (wargear). This is a hand weapon. Additionally, whenever an enemy model makes a Strike against Sharku (but not his Warg) and fails the To Wound Roll, Sharku may immediately make a single Strength 4 hit against that model.",

  "Fury of the Pack": "ACTIVE. Whilst he has the Cavalry keyword, whenever Sharku Charges he increases his Fight Value to 5 and his Attacks to 3 until the End Phase of the turn.",

  "Bloodoath": "PASSIVE. Friendly Dunland models within 6\" of the Wild Man Oathmaker count as having the Fearless special rule.",

  "\"We will die for Saruman\"": "PASSIVE. Whilst Saruman is alive and on the battlefield, the Wild Man Oathmaker and friendly Dunland models must re-roll To Wound Rolls of a natural 1 when making Strikes.",

  "Berserker Blade": "ACTIVE (wargear). This is a hand-and-a-half weapon. Additionally, if an Uruk-hai Berserker wins a Combat whilst using their Berserker Blade as a two-handed weapon, they may make a single Strike against every enemy model they were Engaged in Combat with.",

  "Keen Sight": "PASSIVE. Enemy models within 12\" of this model gain no benefit from the Stalk Unseen special rule.",

  "Cloud of Birds": "PASSIVE. Shooting attacks that target a Crebain will only ever hit on the roll of a natural 6.",

  "Flaming Brand": "PASSIVE (wargear). A model with a Flaming Brand has the Terror (Cavalry) and Terror (Beast) special rules. Additionally, it counts as 2 models rather than 1 when working out how many models are within range of an Objective Marker.",

  "Ring of Barahir": "PASSIVE (Unique wargear). Whenever Aragorn is affected by a Magical Power, after any Resist Tests have been made (if able), he may roll a D6. On a natural 6, Aragorn is not affected by that Magical Power.",

  "Andúril, Flame of the West": "ACTIVE (Unique wargear). This is a Unique Elven hand-and-a-half weapon. Whenever Aragorn makes Strikes with Andúril, he never requires more than a 4+ when rolling To Wound (3+ if he uses it as a two-handed weapon).",

  "\"Stand, Men of the West\"": "PASSIVE. Friendly models treat Aragorn, King Elessar as a banner with a range of 6\".",

  "Broken Mind": "ACTIVE. During each Priority Phase, after Priority has been determined, Denethor must take an Intelligence Test. If it is failed, he is controlled by the opposing player for that turn (he still counts as a friendly model, so he cannot be targeted by friendly shooting attacks or damaging Magical Powers, and the opposing player cannot spend his Might, Will or Fate). If Boromir is alive in the same Army, Denethor passes this test automatically; should Boromir be slain, Denethor automatically fails the next test.",

  "Horn of Gondor": "ACTIVE (Unique wargear). This is a Unique war horn. At the start of a Combat involving Boromir, if he is outnumbered in the Combat then he may blow the Horn of Gondor. If he does, one enemy model involved in the Combat (chosen by their controlling player) must take a Courage Test. If it is failed, no Duel Roll is made and Boromir automatically wins the Combat.",

  "Banner of Minas Tirith": "PASSIVE (Unique wargear, range 6\"). Boromir does not suffer the -1 penalty to his Duel Roll for carrying a banner. If a friendly Gondor Warrior model within range is involved in a Drawn Combat tied at that model's Fight Value, the Gondor Warrior wins instead of rolling off.",

  "Son of Gondor": "ACTIVE. In a turn in which he Charges, Boromir gains a bonus of +1 To Wound when making Strikes.",

  "Heroic Accuracy": "The Hero gains the Sharpshooter special rule until the End Phase and may re-roll any failed In The Way Tests when making Shooting Attacks. May shout \"Take Aim\": friendly models within 6\" may also re-roll failed In The Way Tests when Shooting.",

  "\"A Chance for Faramir, Captain of Gondor to show his Quality\"": "ACTIVE. Should Faramir's Army be Broken, from that point onwards he may re-roll any failed To Wound Rolls when making Strikes, and may declare a Heroic Resolve each turn for free.",

  "Wizard's Pupil": "PASSIVE. Whilst Faramir is alive and on the battlefield, if you win the roll to choose who has Priority and give Priority to your opponent, then until the end of the turn Faramir and friendly Warrior models within 3\" of him gain the Dominant (2) special rule.",

  "Glamdring": "ACTIVE (Unique wargear). This is a Unique Elven hand-and-a-half weapon. A model gains a bonus of +1 to their Strength when making Strikes with Glamdring.",

  "Narya": "PASSIVE (Unique wargear). Gandalf may re-roll any failed Fate rolls.",

  "Pippin": "PASSIVE. If Gandalf is upgraded to take Pippin, Pippin is treated as a Passenger on Shadowfax, uses the Peregrin Took, Guard of the Citadel profile and always counts as an Independent Hero; he does not take up a space in Gandalf's Warband. Whilst Pippin is mounted on Shadowfax, Gandalf gains Resistant to Magic, may re-roll To Wound Rolls of a natural 1 when making Strikes, and can spend Pippin's Might, Will and Fate Points as if they were his own.",

  "Magical Powers": "Blinding Light 3+, Terrifying Aura 3+, Transfix 3+, Foil Magic 4+, Fortify Spirit 4+, Strengthen Will 4+, Banishment 5+, Sorcerous Blast 5+, Your Staff is Broken 5+. See Armies of The Lord of the Rings, p. 53.",

  "Defend the White City": "ACTIVE. Irolas may use the Shielding special rule even though he is not armed with a shield. If Irolas elects to shield and wins the ensuing Combat, he may make a single Strike against one enemy model that was involved in the Combat.",

  "Captain of the Citadel Guard": "PASSIVE. Friendly Citadel Guard within 3\" of Irolas gain a bonus of +1 To Wound when making Strikes.",

  "Master of Reserves": "PASSIVE. In Scenarios where you roll for Warbands to arrive, or roll to see which part of the board you deploy a Warband in, you may modify the roll for Madril's Warband by +1 or -1 even if he is not on the battlefield. If Madril is on the battlefield, you may also modify the roll for other Warbands in your Army by +1 or -1.",

  "Well-aimed Shot": "ACTIVE. When making a shooting attack, the first time Damrod fails an In The Way Roll he may make an Intelligence Test. If the test is passed, the In The Way Roll will be successful instead.",

  "Loyal to the Captains": "ACTIVE. Whilst within 6\" of either Boromir or Faramir, this model may re-roll To Wound Rolls of a natural 1 when making Strikes.",

  "Protectors of the White Tree": "PASSIVE. If this model is within 6\" of a friendly Gondor General, it is treated as having the Dominant (2) special rule.",

  "Narsil": "ACTIVE (Unique wargear). This is a Unique Master-forged two-handed weapon. Additionally, a model wielding Narsil may declare a Heroic Combat during each Fight Phase for free.",

  "High King of Gondor and Arnor": "ACTIVE. The range of Elendil's Stand Fast is 12\" rather than 6\".",

  "The Shards of Narsil": "ACTIVE. If your Army also contains Elendil, then if Elendil is slain place a 25mm Marker where he was killed. If Isildur ends his Activation within 1\" of this Marker he may gain the Shards of Narsil (a Unique hand weapon granting +1 To Wound when making Strikes) — remove the Marker.",

  "Drain Soul": "ACTIVE. A model that suffers a Wound from the King of the Dead in Combat, which is not then prevented, will automatically have their Wounds reduced to 0, causing them to be slain and removed as a casualty.",

  "The Dead and the Living": "PASSIVE. Only friendly Dunharrow models may benefit from the King of the Dead's Stand Fast or benefit from his Heroic Actions.",

  "Pennant of the Dead": "PASSIVE (wargear). Friendly Dunharrow models within 3\" of a model with a Pennant of the Dead count as having the Resistant to Magic special rule.",

  "The King's Counsel": "PASSIVE. Whilst the King of the Dead is within 3\" of this model, he can spend this model's Will Points to declare a Heroic Action instead of spending one of his own Might Points.",
};
