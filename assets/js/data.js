/* =====================================================================
   CONVERGENCE — DATA
   Extracted VERBATIM from the MESBG_Army_Builder.html pilot.
   Single source of truth: the army builder and the profiles page both
   read from here. Do not duplicate profiles in the HTML.

   Only change from the pilot: portraits used to be embedded as base64
   data URIs (245 KB inside the JS). They are now files under
   assets/img/perfiles/. Access via IMGS[id] is unchanged.
   ===================================================================== */

/* ---------- PORTRAITS ---------- */
const IMGS = {};
IMGS["ramsay"]="assets/img/perfiles/ramsay.jpg";
IMGS["comandante"]="assets/img/perfiles/comandante.jpg";
IMGS["lanzas"]="assets/img/perfiles/lanzas.jpg";
IMGS["lanceros"]="assets/img/perfiles/lanceros.jpg";
/* The Horde (Wow/Imagenes, rescaled to 480x480) */
IMGS["campeon"]="assets/img/perfiles/campeon.jpg";
IMGS["chaman"]="assets/img/perfiles/chaman.jpg";
IMGS["grunt"]="assets/img/perfiles/grunt.jpg";
IMGS["troll"]="assets/img/perfiles/troll.jpg";
IMGS["raptor"]="assets/img/perfiles/raptor.jpg";
IMGS["dewback"]="assets/img/perfiles/dewback.jpg";

const MOUNTS = {
  horse:{name:"Warhorse", stats:{mv:'10"',fv:2,sv:"6+",s:3,d:4,a:0,w:1,c:"7+",i:"7+"},
    rules:[{name:"Mount",desc:"The model gains the Cavalry keyword. In Combat it uses the best Fight Value, Strength and Attacks of rider and Mount."}]},
  dewback:{name:"War Dewback", stats:{mv:'7"',fv:3,sv:"-",s:4,d:6,a:1,w:2,c:"3+",i:"6+"},
    rules:[
      {name:"Steady Mount",desc:"A model mounted on a War Dewback does not suffer the -1 penalty to the Duel Roll for using a two-handed weapon."},
      {name:"Armoured Hide",desc:"The War Dewback's Defence can never be reduced below 5 by any means."},
      {name:"Bone-crusher",desc:"When the War Dewback Charges successfully and knocks an enemy model Prone, that model suffers an automatic Strength 5 hit from the weight of the beast. This Wound cannot be prevented with Fate Points."}
    ]}
};

/* ---------- TIERS ---------- */
const TIERS = {
  legend:{name:"Hero of Legend", followers:18, rank:5},
  valour:{name:"Hero of Valour", followers:15, rank:4},
  fortitude:{name:"Hero of Fortitude", followers:12, rank:3},
  minor:{name:"Minor Hero", followers:6, rank:2},
  independent:{name:"Independent Hero", followers:0, rank:1}
};

/* ---------- FACTIONS ---------- */
const FACTIONS = {
bolton:{
  id:"bolton", name:"House Bolton", motto:"Our Blades Are Sharp",
  color:"#8b1a1a", custom:true,
  armyBonus:null,
  heroes:[
    {
      id:"ramsay", name:"Ramsay Bolton", cost:103, tier:"valour", unique:true,
      race:"Man", keywords:["Hero","Infantry","Unique"],
      stats:{mv:'6"',fv:5,sv:"3+",s:4,d:4,a:2,w:3,c:"6+",i:"3+"},
      might:3, will:4, fate:2,
      wargear:"Hand-and-a-half sword, leather armour",
      heroic:[
        {name:"Heroic March", desc:"A Hero who declares a Heroic March adds 3\" to their Move Value (5\" for Cavalry or models that can Fly) for the duration of the Move Phase, and may not Charge that Move Phase. They may shout At the Double to extend the benefit to friendly models within 6\"."},
        {name:"Heroic Defence", desc:"A Hero that declares a Heroic Defence will only suffer a Wound on the roll of a natural 6 in the ensuing Fight Phase, regardless of any special rules, modifiers, Brutal Power Attacks or the use of Might."},
        {name:"Heroic Strike", desc:"A Hero that declares a Heroic Strike will add D3 to their Fight Value for the duration of the Fight Phase (to a maximum of 10)."},
        {name:"Heroic Challenge", desc:"See the MESBG Rules Manual 2024."}
      ],
      options:[
        {id:"arco", name:"Short bow", cost:5, bow:true},
        {id:"cuchillos", name:"Throwing knives", cost:5, throwing:true},
        {id:"capa", name:"Scout cloak", cost:10}
      ],
      rules:[
        {name:"The Marked Quarry", desc:"Before deployment, secretly nominate one enemy Hero. Whilst within 12\" of that Hero, Ramsay gains +1 Attack and the nominated Hero must spend 1 additional Will Point for every Heroic Action they declare. The nomination is revealed on first base contact, or at the end of the game."},
        {name:"The Bastard's Hounds", desc:"Once per game, at the start of the Move Phase, place D3 Bolton Hounds (Mv 10\"/Fv 3/S 3/D 3/A 1/W 1/C 3+; no Might, Will or Fate; Terror (Warrior)) in base contact with Ramsay."},
        {name:"Backstabbers", desc:"This model receives a bonus of +1 To Wound when making Strikes against a Trapped model."}
      ],
      flavor:"If you have to choose between risk and certainty, always choose certainty."
    },
    {
      id:"comandante", name:"Bolton Line Commander", cost:55, tier:"fortitude",
      race:"Man", keywords:["Hero","Infantry"],
      stats:{mv:'5"',fv:5,sv:"5+",s:4,d:5,a:2,w:2,c:"4+",i:"1+"},
      might:2, will:2, fate:1,
      wargear:"Sword, armour",
      heroic:[
        {name:"Heroic Strike", desc:"A Hero that declares a Heroic Strike will add D3 to their Fight Value for the duration of the Fight Phase (to a maximum of 10)."},
        {name:"Heroic Resolve", desc:"Friendly models within 6\" of a Hero who declared a Heroic Resolve gain an additional free dice when making Resist Tests, and the Hero automatically passes Courage Tests caused by their Army being Broken that turn."}
      ],
      options:[
        {id:"escudo", name:"Shield", cost:5, mod:{d:1}, desc:"Defence becomes 6."},
        {id:"lanza", name:"Spear", cost:1},
        {id:"caballo", name:"Warhorse", cost:15, mount:"horse"}
      ],
      rules:[
        {name:"Discipline of the Dreadfort", desc:"Dark North Spears within 6\" of a Bolton Line Commander activate Unbreakable Formation on a 3+ instead of a 4+."}
      ],
      flavor:"The line does not break. Not ever."
    }
  ],
  warriors:[
    {
      id:"lanzas", name:"Dark North Spears", cost:10,
      race:"Man", keywords:["Warrior","Infantry"],
      stats:{mv:'6"',fv:3,sv:"4+",s:4,d:6,a:1,w:1,c:"3+",i:"4+"},
      wargear:"Polearm, armour, shield (Defence 6 already included)",
      options:[
        {id:"formacion", name:"Formation shield", cost:3, desc:"Enables Unbreakable Formation. Move Value drops to 5\"."},
        {id:"arco", name:"Short bow (replaces shield)", cost:1, bow:true, mod:{d:-1}, desc:"Defence drops to 5."},
        {id:"estandarte", name:"Banner", cost:25, banner:true, maxPerWarband:1}
      ],
      rules:[
        {name:"Unbreakable Formation", desc:"(Requires a formation shield.) When this model is Charged, roll a D6; on a 4+ the charging model loses its Charge bonus. When using Shielding, roll one additional dice in the Duel Roll. Move Value drops to 5\"."},
        {name:"Bodyguard", desc:"All models with this special rule in an Army must select a House Bolton Hero to bodyguard (normally the highest Heroic Tier in their Warband). So long as the bodyguarded Hero is alive and on the battlefield, all models bodyguarding that Hero automatically pass all Courage Tests they are required to take."}
      ],
      flavor:"We do not fall back. We do not run. We hold the line or we die on it."
    },
    {
      id:"lanceros", name:"Bolton Mounted Lancers", cost:19,
      race:"Man", keywords:["Warrior","Cavalry"],
      stats:{mv:'10"',fv:4,sv:"4+",s:4,d:5,a:1,w:1,c:"3+",i:"3+"},
      wargear:"Lance, sword, armour, warhorse",
      options:[
        {id:"escudo", name:"Shield", cost:1, mod:{d:1}, desc:"Defence becomes 6."},
        {id:"arco", name:"Mounted short bow", cost:2, bow:true},
        {id:"estandarte", name:"Cavalry banner", cost:30, banner:true, maxPerWarband:1}
      ],
      rules:[
        {name:"Northern Impetus", desc:"When this model Charges and beats its opponent's Duel Roll by 3 or more, the defending model is automatically knocked Prone even if it is not Wounded. This has no effect against Mounts or against Monster, Siege Engine and War Beast models."},
        {name:"Expert Rider", desc:"A Cavalry model with this special rule may re-roll the dice on any Jump, Swim or Thrown Rider Tests, and can pick up Light Objects without having to Dismount. A model carrying both a bow and a shield still gets the +1 bonus to Defence for the shield whilst mounted."}
      ],
      flavor:"The thunder of their hooves heralds death. Bolton Lancers take no prisoners."
    }
  ]
},

/* =====================================================================
   THE HORDE
   Transcribed from Wow/horde_profiles_v3.md. No flavour text or motto:
   the source document does not carry them and they are not invented.
   ===================================================================== */
horda:{
  id:"horda", name:"The Horde", motto:null,
  color:"#5a3a22", custom:true,
  armyBonus:null,
  heroes:[
    {
      id:"campeon", name:"Horde Champion", cost:135, tier:"valour", unique:true,
      race:"Orc", keywords:["Hero","Infantry","Unique"],
      stats:{mv:'6"',fv:6,sv:"6+",s:5,d:5,a:3,w:3,c:"5+",i:"2+"},
      might:3, will:3, fate:2,
      wargear:"Two-handed axe (+1 To Wound, -1 to the Duel Roll), armour",
      heroic:[
        {name:"Heroic Strike", desc:"A Hero that declares a Heroic Strike will add D3 to their Fight Value for the duration of the Fight Phase (to a maximum of 10)."},
        {name:"Heroic Strength", desc:"A Hero that declares a Heroic Strength will count their Strength characteristic as double (to a maximum of 10) when making Strikes until the End Phase of the turn."},
        {name:"Heroic Challenge", desc:"See the MESBG Rules Manual 2024."}
      ],
      options:[
        // TODO: the shield cancels the two-handed axe bonus. The pilot does not
        // model mutually exclusive options; for now it is flagged in the text.
        {id:"escudo", name:"Shield", cost:5, mod:{d:1}, desc:"Defence becomes 6. Loses the two-handed axe bonus."},
        {id:"trofeos", name:"War trophies", cost:5, desc:"+1 Courage to friendly Horde models within 6\"."},
        {id:"dewback", name:"War Dewback", cost:18, mount:"dewback"}
      ],
      rules:[
        {name:"Champion's Crush", desc:"When this model wins a Combat by 3 or more on the Duel Roll, it may choose either to knock its opponent Prone as normal, or to push that model D3\" directly away in a straight line. Every model in that path suffers an automatic Strength 4 hit."},
        {name:"Terror of the Horde", desc:"This model causes Terror. If an enemy model fails a Courage Test caused by this model's Terror, it suffers a permanent -1 penalty to its Courage for the rest of the game (not cumulative between different models)."},
        {name:"Harbinger of Evil (6\")", desc:"An enemy model within 6\" of this model suffers a -1 penalty to any Courage Tests it is required to make. This is not cumulative with other special rules that provide a similar effect."}
      ]
    },
    {
      id:"chaman", name:"Horde Shaman", cost:60, tier:"fortitude",
      race:"Orc", keywords:["Hero","Infantry"],
      stats:{mv:'5"',fv:3,sv:"4+",s:3,d:4,a:1,w:2,c:"4+",i:"4+"},
      might:1, will:4, fate:2,
      wargear:"Ancestral stave (counts as a spear: may Support from the second rank), light armour",
      heroic:[
        {name:"Heroic Channelling", desc:"A Hero who declares a Heroic Channelling may re-roll the dice when Casting a Magical Power this turn."}
      ],
      options:[],
      rules:[
        {name:"Call of the Storm", desc:"Once per game, in the Shoot Phase, choose an enemy model within 12\". That model suffers a Strength 6 hit with no armour save allowed. Every enemy model within 3\" of that target also suffers a Strength 3 hit."},
        {name:"War Cry", desc:"Horde models within 6\" of the Shaman add +1 to their Courage Tests. Once per game the Shaman may proclaim the War Cry: all friendly models within 12\" automatically pass Courage Tests caused by their Army being Broken until the end of that turn."},
        {name:"Resistant to Magic", desc:"Every time this model is targeted by a Magical Power, it gains an additional free dice when making a Resist Test, even if it has no Will Points remaining. This is cumulative with other rules that confer a similar effect."}
      ]
    }
  ],
  warriors:[
    {
      id:"grunt", name:"Horde Grunt", cost:10,
      race:"Orc", keywords:["Warrior","Infantry"],
      stats:{mv:'6"',fv:3,sv:"4+",s:4,d:5,a:1,w:1,c:"3+",i:"5+"},
      wargear:"One-handed axe, armour",
      options:[
        // TODO: shield and two-handed axe are mutually exclusive.
        {id:"escudo", name:"Shield", cost:1, mod:{d:1}, desc:"Defence becomes 6."},
        {id:"hacha2m", name:"Two-handed axe", cost:1, desc:"+1 To Wound and -1 to the Duel Roll. Cannot be combined with a shield."},
        {id:"arco", name:"Short bow", cost:1, bow:true},
        {id:"estandarte", name:"Banner", cost:25, banner:true, maxPerWarband:1}
      ],
      rules:[
        {name:"Lok'tar!", desc:"When this model Charges a target that is already Engaged in Combat with another friendly Grunt, it adds +1 to its Duel Roll for that round of Combat."},
        {name:"Poisoned Attacks", desc:"This model must re-roll any To Wound Rolls of a natural 1 when making Shooting Attacks or making Strikes."}
      ]
    },
    {
      id:"troll", name:"Troll Berserker", cost:18,
      race:"Troll", keywords:["Warrior","Infantry"],
      stats:{mv:'7"',fv:4,sv:"6+",s:4,d:4,a:2,w:1,c:"3+",i:"5+"},
      wargear:"Two weapons (no armour)",
      options:[],
      rules:[
        {name:"Poisoned Attacks", desc:"This model must re-roll any To Wound Rolls of a natural 1 when making Strikes."},
        {name:"Oblivious to Pain", desc:"Whenever this model suffers a Wound, roll a D6. On the roll of a natural 6, the Wound is ignored."}
      ]
    },
    {
      id:"raptor", name:"Raptor Rider", cost:24,
      race:"Orc", keywords:["Warrior","Cavalry"],
      stats:{mv:'10"',fv:4,sv:"4+",s:4,d:4,a:1,w:1,c:"3+",i:"2+"},
      // TODO: the short bow is part of the base wargear, not an option, so
      // totales() does not count it towards the 1/3 bow limit. Counting it
      // would mean touching totales(), which is proven pilot logic.
      // If the limit should include it, say so and we change it separately.
      wargear:"Orc katana (sword), short bow, light armour, raptor",
      options:[
        {id:"lanza", name:"Lance", cost:2, desc:"On the Charge, +1 To Wound during the first round of Combat."},
        {id:"estandarte", name:"Scout banner", cost:30, banner:true, maxPerWarband:1}
      ],
      rules:[
        {name:"Raptor's Bite", desc:"When this model Charges successfully, before the Combat is resolved the raptor makes one additional automatic Strength 3 hit. This hit cannot be prevented by a shield."},
        {name:"Veteran Swordsmanship", desc:"Instead of making its normal Strikes, the rider may choose to make two Strikes at Strength 4 with the Orc katana. This cannot be combined with a lance."},
        {name:"Expert Rider", desc:"A Cavalry model with this special rule may re-roll the dice on any Jump, Swim or Thrown Rider Tests, and can pick up Light Objects without having to Dismount. A model carrying both a bow and a shield still gets the +1 bonus to Defence for the shield whilst mounted."}
      ]
    }
  ]
}
};

/* ---------- RETRATOS: Isengard, Gondor, Numenor, Dunharrow ---------- */
IMGS["saruman"]="assets/img/perfiles/saruman.jpg";
IMGS["grima"]="assets/img/perfiles/grima.jpg";
IMGS["lurtz"]="assets/img/perfiles/lurtz.jpg";
IMGS["ugluk"]="assets/img/perfiles/ugluk.jpg";
IMGS["grishnakh"]="assets/img/perfiles/grishnakh.jpg";
IMGS["snaga"]="assets/img/perfiles/snaga.jpg";
IMGS["uruk_hai_scout_captain"]="assets/img/perfiles/uruk_hai_scout_captain.jpg";
IMGS["uruk_hai_drummer"]="assets/img/perfiles/uruk_hai_drummer.jpg";
IMGS["uruk_hai_captain"]="assets/img/perfiles/uruk_hai_captain.jpg";
IMGS["sharku"]="assets/img/perfiles/sharku.jpg";
IMGS["isengard_orc_captain"]="assets/img/perfiles/isengard_orc_captain.jpg";
IMGS["wild_man_oathmaker"]="assets/img/perfiles/wild_man_oathmaker.jpg";
IMGS["uruk_hai_scout"]="assets/img/perfiles/uruk_hai_scout.jpg";
IMGS["uruk_hai_berserker"]="assets/img/perfiles/uruk_hai_berserker.jpg";
IMGS["uruk_hai_warrior"]="assets/img/perfiles/uruk_hai_warrior.jpg";
IMGS["isengard_warg_rider"]="assets/img/perfiles/isengard_warg_rider.jpg";
IMGS["isengard_warg"]="assets/img/perfiles/isengard_warg.jpg";
IMGS["isengard_orc_warrior"]="assets/img/perfiles/isengard_orc_warrior.jpg";
IMGS["crebain"]="assets/img/perfiles/crebain.jpg";
IMGS["wild_man_of_dunland"]="assets/img/perfiles/wild_man_of_dunland.jpg";
IMGS["aragorn"]="assets/img/perfiles/aragorn.jpg";
IMGS["denethor"]="assets/img/perfiles/denethor.jpg";
IMGS["boromir"]="assets/img/perfiles/boromir.jpg";
IMGS["faramir"]="assets/img/perfiles/faramir.jpg";
IMGS["gandalf"]="assets/img/perfiles/gandalf.jpg";
IMGS["peregrin"]="assets/img/perfiles/peregrin.jpg";
IMGS["irolas"]="assets/img/perfiles/irolas.jpg";
IMGS["madril"]="assets/img/perfiles/madril.jpg";
IMGS["damrod"]="assets/img/perfiles/damrod.jpg";
IMGS["captain_of_minas_tirith"]="assets/img/perfiles/captain_of_minas_tirith.jpg";
IMGS["ranger_of_gondor"]="assets/img/perfiles/ranger_of_gondor.jpg";
IMGS["osgiliath_veteran"]="assets/img/perfiles/osgiliath_veteran.jpg";
IMGS["warrior_of_minas_tirith"]="assets/img/perfiles/warrior_of_minas_tirith.jpg";
IMGS["knight_of_minas_tirith"]="assets/img/perfiles/knight_of_minas_tirith.jpg";
IMGS["citadel_guard"]="assets/img/perfiles/citadel_guard.jpg";
IMGS["guard_of_the_fountain_court"]="assets/img/perfiles/guard_of_the_fountain_court.jpg";
IMGS["elendil"]="assets/img/perfiles/elendil.jpg";
IMGS["isildur"]="assets/img/perfiles/isildur.jpg";
IMGS["captain_of_numenor"]="assets/img/perfiles/captain_of_numenor.jpg";
IMGS["warrior_of_numenor"]="assets/img/perfiles/warrior_of_numenor.jpg";
IMGS["king_of_the_dead"]="assets/img/perfiles/king_of_the_dead.jpg";
IMGS["herald_of_the_dead"]="assets/img/perfiles/herald_of_the_dead.jpg";
IMGS["warrior_of_the_dead"]="assets/img/perfiles/warrior_of_the_dead.jpg";
IMGS["rider_of_the_dead"]="assets/img/perfiles/rider_of_the_dead.jpg";

/* ---------- MONTURAS NUEVAS ---------- */
MOUNTS.warg={
  name:"Warg",
  stats:{
    mv:"10\"",
    fv:3,
    sv:"6+",
    s:4,
    d:4,
    a:1,
    w:1,
    c:"8+",
    i:"8+"
  },
  rules:[
    {
      name:"Mount",
      desc:"The model gains the Cavalry keyword. In Combat it uses the best Fight Value, Strength and Attacks of rider and Mount."
    }
  ]
};
MOUNTS.armoured_horse={
  name:"Armoured horse",
  stats:{
    mv:"10\"",
    fv:2,
    sv:"6+",
    s:3,
    d:5,
    a:0,
    w:1,
    c:"7+",
    i:"7+"
  },
  rules:[
    {
      name:"Mount",
      desc:"The model gains the Cavalry keyword. In Combat it uses the best Fight Value, Strength and Attacks of rider and Mount."
    }
  ]
};
MOUNTS.shadowfax={
  name:"Shadowfax",
  stats:{
    mv:"12\"",
    fv:3,
    sv:"6+",
    s:4,
    d:5,
    a:0,
    w:1,
    c:"5+",
    i:"5+"
  },
  rules:[
    {
      name:"Mount",
      desc:"The model gains the Cavalry keyword. In Combat it uses the best Fight Value, Strength and Attacks of rider and Mount."
    },
    {
      name:"Lord of the Mearas",
      desc:"ACTIVE. Whilst mounted upon Shadowfax, whenever Gandalf makes a Jump, Leap or Swim Test he may roll two dice and pick the highest result. Additionally, Shadowfax will only halve his Move Value when Moving through difficult terrain rather than quarter it."
    }
  ]
};

/* ---------- ISENGARD (incluye Dunland) ---------- */
FACTIONS.isengard={
  id:"isengard",
  name:"Isengard",
  motto:null,
  color:"#3b3a36",
  custom:false,
  armyBonus:null,
  heroes:[
    {
      id:"saruman",
      name:"Saruman",
      cost:170,
      tier:"legend",
      unique:true,
      race:"Wizard",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:5,
        sv:"4+",
        s:4,
        d:5,
        a:1,
        w:3,
        c:"3+",
        i:"3+"
      },
      might:3,
      will:6,
      fate:3,
      wargear:"Staff of Power and Palantír.",
      heroic:[
        {
          name:"Heroic Channelling",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Defence",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[
        {
          id:"horse",
          name:"Horse",
          cost:20,
          mount:"horse"
        }
      ],
      rules:[
        {
          name:"Palantír",
          desc:"ACTIVE. Once per game, during the Priority Phase but before the roll for Priority, Saruman can use the Palantír to automatically win the roll to choose who has Priority for that turn. If both sides have a special rule allowing them to do this and both wish to use it in the same turn, players roll off as normal and both special rules count as being used."
        },
        {
          name:"Voice of Curunír",
          desc:"ACTIVE. The range of Saruman\'s Stand Fast is 12\" rather than 6\". Additionally, friendly Hero models can benefit from Saruman\'s Stand Fast."
        },
        {
          name:"Saruman's Deceit",
          desc:"PASSIVE. At the beginning of the game, after both sides have deployed, Saruman may choose a single enemy Hero. The chosen Hero suffers a -1 penalty to any Resist Tests they take when targeted by a Magical Power Cast by Saruman; though a natural 6 will still count as a 6."
        }
      ]
    },
    {
      id:"grima",
      name:"Gríma Wormtongue",
      cost:25,
      tier:"independent",
      unique:true,
      race:"Man",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:2,
        sv:"4+",
        s:3,
        d:3,
        a:1,
        w:1,
        c:"8+",
        i:"6+"
      },
      might:0,
      will:0,
      fate:0,
      wargear:"Hand weapon.",
      heroic:[],
      options:[],
      rules:[
        {
          name:"Wormtongue",
          desc:"PASSIVE. An enemy Hero within 6\" of Gríma must spend 2 Might Points rather than 1 in order to declare a Heroic Action."
        },
        {
          name:"A Traitor Within",
          desc:"PASSIVE. Gríma can be deployed either as part of Saruman's Warband (without taking up a space in it) or as part of the enemy Army, where enemy models treat him as a friendly model until Saruman is slain, Gríma Charges, destroys an enemy Siege Engine or interacts with an Objective Marker. See the full rulebook entry for the complete deployment rules and restrictions."
        }
      ]
    },
    {
      id:"lurtz",
      name:"Lurtz, Uruk-hai Scout Captain",
      cost:100,
      tier:"valour",
      unique:true,
      race:"Uruk-hai",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:6,
        sv:"3+",
        s:5,
        d:6,
        a:3,
        w:3,
        c:"4+",
        i:"5+"
      },
      might:3,
      will:3,
      fate:1,
      wargear:"Armour, hand weapon and Uruk-hai bow.",
      heroic:[
        {
          name:"Heroic Challenge",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic March",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Strength",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Strike",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[
        {
          id:"shield",
          name:"Shield",
          cost:0,
          desc:"This will not increase Lurtz's Defence as he also carries an Uruk-hai bow."
        }
      ],
      rules:[
        {
          name:"Sharpshooter",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"\"Find the Halflings\"",
          desc:"ACTIVE. In Scenarios that use the Maelstrom of Battle special rule, Lurtz's Warband does not roll to determine where they arrive. Instead, Lurtz may choose the result."
        },
        {
          name:"Shield Throw",
          desc:"PASSIVE. If Lurtz has been equipped with a shield, then once per game he can use it as a throwing weapon and may re-roll the To Hit Roll. This has a Strength of 4 and any model on a 25mm base that is hit is immediately knocked Prone. Once thrown, Lurtz no longer carries the shield, though his Defence is not reduced as a result."
        },
        {
          name:"Oblivious to Pain",
          desc:"PASSIVE. Whenever Lurtz suffers a Wound, roll a D6. On the roll of a natural 6, the Wound is ignored."
        }
      ]
    },
    {
      id:"ugluk",
      name:"Uglúk, Uruk-hai Scout Captain",
      cost:75,
      tier:"fortitude",
      unique:true,
      race:"Uruk-hai",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:5,
        sv:"4+",
        s:5,
        d:5,
        a:2,
        w:2,
        c:"6+",
        i:"6+"
      },
      might:3,
      will:1,
      fate:1,
      wargear:"Armour, hand weapon and whip.",
      heroic:[
        {
          name:"Heroic March",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Strength",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Strike",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[],
      rules:[
        {
          name:"Head Taker",
          desc:"ACTIVE. Should Uglúk\'s Army be Broken, at the start of his Activation, instead of taking his Courage Test he can choose to kill a friendly Warrior model within 2\" of him (remove it as a casualty). If he does, he automatically passes the Courage Test, and his Stand Fast is increased to 12\" and affects both Hero and Warrior models."
        },
        {
          name:"\"Looks like meat's back on the menu, boys!\"",
          desc:"ACTIVE. At the start of his Activation, Uglúk can kill a friendly Orc Warrior within 2\" of him; remove the killed model as a casualty. If he does, all friendly Uruk-hai models within 6\" of him gain the Fearless special rule and a bonus of +1 To Wound when making Strikes until the end of the turn. If Uglúk does this in a turn in which his Army is Broken, it also counts as triggering Head Taker."
        }
      ],
      tierNota:"// TODO: the book does not print the Heroic Tier on the profile card (checked by hand, at high resolution, across all 32 hero cards in both chapters). This value comes from mesbg-list-builder-v2024 (github.com/mhollink), which does carry it. For this hero the value varies depending on which Legendary Legion you consult -- the value from the most generic/base list was used. Confirm it against your own book if you can. Values seen: Fortitude (12) in Lurtz's legion; Valour (15) in his own legion (Uglúk's Scouts)."
    },
    {
      id:"grishnakh",
      name:"Grishnákh, Orc Captain",
      cost:55,
      tier:"fortitude",
      unique:true,
      race:"Orc",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"5+",
        s:4,
        d:5,
        a:2,
        w:2,
        c:"7+",
        i:"5+"
      },
      might:2,
      will:2,
      fate:1,
      wargear:"Armour and hand weapon.",
      heroic:[
        {
          name:"Heroic Strike",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[],
      rules:[
        {
          name:"Backstabbers",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"\"Let's put a maggot hole in your belly\"",
          desc:"ACTIVE. If Grishnákh wins a Duel Roll and there are no other allies involved in the Combat (including Supporting models), he may choose a single enemy model on a 25mm base that he was Engaged in Combat with and roll a D6. On a 4+, the chosen model is knocked Prone before Strikes are made."
        }
      ]
    },
    {
      id:"snaga",
      name:"Snaga, Orc Captain",
      cost:50,
      tier:"fortitude",
      unique:true,
      race:"Orc",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"4+",
        s:4,
        d:5,
        a:2,
        w:2,
        c:"7+",
        i:"6+"
      },
      might:2,
      will:1,
      fate:1,
      wargear:"Armour and hand weapon.",
      heroic:[
        {
          name:"Heroic Challenge",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[],
      rules:[
        {
          name:"Cunning Mind",
          desc:"PASSIVE. Whenever Snaga benefits from the Heroic Action of another friendly Hero, he may roll a D6. On a 5+, Snaga may regain a Might Point that he spent earlier in the battle. Additionally, Snaga may choose not to benefit from the Heroic Move or Heroic March of a friendly Hero, in which case he does not forego his Activation."
        }
      ]
    },
    {
      id:"uruk_hai_scout_captain",
      name:"Uruk-hai Scout Captain",
      cost:55,
      tier:"fortitude",
      race:"Uruk-hai",
      keywords:["Hero","Infantry"],
      stats:{
        mv:"6\"",
        fv:5,
        sv:"4+",
        s:5,
        d:5,
        a:2,
        w:2,
        c:"6+",
        i:"6+"
      },
      might:2,
      will:1,
      fate:1,
      wargear:"Armour and two-handed weapon.",
      heroic:[
        {
          name:"Heroic March",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[],
      rules:[]
    },
    {
      id:"uruk_hai_drummer",
      name:"Uruk-hai Drummer",
      cost:35,
      tier:"independent",
      race:"Uruk-hai",
      keywords:["Hero","Infantry"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"4+",
        s:4,
        d:5,
        a:1,
        w:1,
        c:"6+",
        i:"7+"
      },
      might:0,
      will:0,
      fate:1,
      wargear:"Armour, hand weapon and war drum (Uruk-hai). The war drum rules are in the Rules Manual 2024.",
      heroic:[],
      options:[],
      rules:[]
    },
    {
      id:"uruk_hai_captain",
      name:"Uruk-hai Captain",
      cost:65,
      tier:"fortitude",
      race:"Uruk-hai",
      keywords:["Hero","Infantry"],
      stats:{
        mv:"6\"",
        fv:5,
        sv:"4+",
        s:5,
        d:7,
        a:2,
        w:2,
        c:"6+",
        i:"6+"
      },
      might:2,
      will:1,
      fate:1,
      wargear:"Heavy armour, shield and hand weapon.",
      heroic:[
        {
          name:"Heroic March",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[],
      rules:[
        {
          name:"Shieldwall",
          desc:"See Special_Rules_MESBG_2024."
        }
      ]
    },
    {
      id:"sharku",
      name:"Sharku, Warg Rider Captain",
      cost:70,
      tier:"valour",
      unique:true,
      race:"Orc",
      keywords:["Hero","Cavalry","Unique"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"5+",
        s:4,
        d:5,
        a:2,
        w:2,
        c:"6+",
        i:"6+"
      },
      might:3,
      will:1,
      fate:1,
      wargear:"Armour, Riding Dagger and Warg.",
      heroic:[
        {
          name:"Heroic March",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Strike",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[],
      rules:[
        {
          name:"Riding Dagger",
          desc:"ACTIVE (wargear). This is a hand weapon. Additionally, whenever an enemy model makes a Strike against Sharku (but not his Warg) and fails the To Wound Roll, Sharku may immediately make a single Strength 4 hit against that model."
        },
        {
          name:"Expert Rider",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Fury of the Pack",
          desc:"ACTIVE. Whilst he has the Cavalry keyword, whenever Sharku Charges he increases his Fight Value to 5 and his Attacks to 3 until the End Phase of the turn."
        }
      ]
    },
    {
      id:"isengard_orc_captain",
      name:"Isengard Orc Captain",
      cost:45,
      tier:"fortitude",
      race:"Orc",
      keywords:["Hero","Infantry"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"5+",
        s:4,
        d:6,
        a:2,
        w:2,
        c:"7+",
        i:"7+"
      },
      might:2,
      will:1,
      fate:1,
      wargear:"Armour, shield and hand weapon.",
      heroic:[
        {
          name:"Heroic March",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[
        {
          id:"warg",
          name:"Warg",
          cost:20,
          mount:"warg"
        }
      ],
      rules:[]
    },
    {
      id:"wild_man_oathmaker",
      name:"Wild Man Oathmaker",
      cost:55,
      tier:"fortitude",
      unique:true,
      race:"Man",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"4+",
        s:4,
        d:4,
        a:2,
        w:2,
        c:"6+",
        i:"7+"
      },
      might:3,
      will:1,
      fate:1,
      wargear:"Hand weapon.",
      heroic:[
        {
          name:"Heroic Strength",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[],
      rules:[
        {
          name:"Fearless",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Hatred (Rohan)",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Bloodoath",
          desc:"PASSIVE. Friendly Dunland models within 6\" of the Wild Man Oathmaker count as having the Fearless special rule."
        },
        {
          name:"\"We will die for Saruman\"",
          desc:"PASSIVE. Whilst Saruman is alive and on the battlefield, the Wild Man Oathmaker and friendly Dunland models must re-roll To Wound Rolls of a natural 1 when making Strikes."
        }
      ]
    },
    {
      id:"wild_man_chieftain",
      name:"Wild Man Chieftain",
      cost:40,
      tier:"fortitude",
      race:"Man",
      keywords:["Hero","Infantry"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"4+",
        s:4,
        d:4,
        a:2,
        w:2,
        c:"6+",
        i:"7+"
      },
      might:2,
      will:1,
      fate:1,
      wargear:"Hand weapon.",
      heroic:[
        {
          name:"Heroic March",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[
        {
          id:"shield",
          name:"Light shield",
          cost:5
        },
        {
          id:"hacha2m",
          name:"Two-handed weapon",
          cost:5
        }
      ],
      rules:[
        {
          name:"Hatred (Rohan)",
          desc:"See Special_Rules_MESBG_2024."
        }
      ]
    }
  ],
  warriors:[
    {
      id:"uruk_hai_scout",
      name:"Uruk-hai Scout",
      cost:8,
      race:"Uruk-hai",
      keywords:["Warrior","Infantry"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"4+",
        s:4,
        d:4,
        a:1,
        w:1,
        c:"7+",
        i:"7+"
      },
      wargear:"Armour and hand weapon.",
      options:[
        {
          id:"estandarte",
          name:"Banner",
          cost:25,
          banner:true,
          maxPerWarband:1
        },
        {
          id:"escudo",
          name:"Shield",
          cost:1,
          mod:{
            d:1
          }
        },
        {
          id:"arco",
          name:"Uruk-hai bow",
          cost:1,
          bow:true
        }
      ],
      rules:[]
    },
    {
      id:"uruk_hai_berserker",
      name:"Uruk-hai Berserker",
      cost:15,
      race:"Uruk-hai",
      keywords:["Warrior","Infantry"],
      stats:{
        mv:"6\"",
        fv:5,
        sv:"4+",
        s:4,
        d:5,
        a:2,
        w:1,
        c:"3+",
        i:"8+"
      },
      wargear:"Berserker Blade and light armour.",
      options:[],
      rules:[
        {
          name:"Berserker Blade",
          desc:"ACTIVE (wargear). This is a hand-and-a-half weapon. Additionally, if an Uruk-hai Berserker wins a Combat whilst using their Berserker Blade as a two-handed weapon, they may make a single Strike against every enemy model they were Engaged in Combat with."
        },
        {
          name:"Oblivious to Pain",
          desc:"PASSIVE. Whenever this model suffers a Wound, roll a D6. On the roll of a natural 6, the Wound is ignored."
        }
      ]
    },
    {
      id:"uruk_hai_warrior",
      name:"Uruk-hai Warrior",
      cost:9,
      race:"Uruk-hai",
      keywords:["Warrior","Infantry"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"4+",
        s:4,
        d:5,
        a:1,
        w:1,
        c:"7+",
        i:"7+"
      },
      wargear:"Heavy armour and hand weapon.",
      options:[
        {
          id:"estandarte",
          name:"Banner",
          cost:25,
          banner:true,
          maxPerWarband:1
        },
        {
          id:"ballesta",
          name:"Crossbow",
          cost:2,
          bow:true
        },
        {
          id:"pica",
          name:"Pike",
          cost:1
        },
        {
          id:"escudo",
          name:"Shield",
          cost:1,
          mod:{
            d:1
          }
        }
      ],
      rules:[
        {
          name:"Shieldwall",
          desc:"See Special_Rules_MESBG_2024."
        }
      ]
    },
    {
      id:"isengard_warg_rider",
      name:"Isengard Warg Rider",
      cost:11,
      race:"Orc",
      keywords:["Warrior","Cavalry"],
      stats:{
        mv:"6\"",
        fv:3,
        sv:"5+",
        s:3,
        d:4,
        a:1,
        w:1,
        c:"8+",
        i:"8+"
      },
      wargear:"Armour, hand weapon and Warg.",
      options:[
        {
          id:"escudolanzas",
          name:"Shield and throwing spears",
          cost:2,
          mod:{
            d:1
          },
          throwing:true
        },
        {
          id:"arco",
          name:"Orc bow",
          cost:1,
          bow:true
        },
        {
          id:"escudo",
          name:"Shield",
          cost:1,
          mod:{
            d:1
          }
        },
        {
          id:"lanzas",
          name:"Throwing spears",
          cost:1,
          throwing:true
        }
      ],
      rules:[]
    },
    {
      id:"isengard_warg",
      name:"Isengard Warg",
      cost:7,
      race:"Warg",
      keywords:["Warrior","Infantry","Beast"],
      stats:{
        mv:"10\"",
        fv:3,
        sv:"6+",
        s:4,
        d:4,
        a:1,
        w:1,
        c:"8+",
        i:"8+"
      },
      wargear:"Teeth and claws (hand weapon).",
      options:[],
      rules:[]
    },
    {
      id:"isengard_orc_warrior",
      name:"Isengard Orc Warrior",
      cost:5,
      race:"Orc",
      keywords:["Warrior","Infantry"],
      stats:{
        mv:"6\"",
        fv:3,
        sv:"5+",
        s:3,
        d:4,
        a:1,
        w:1,
        c:"8+",
        i:"8+"
      },
      wargear:"Armour and hand weapon.",
      options:[
        {
          id:"estandarte",
          name:"Banner",
          cost:25,
          banner:true,
          maxPerWarband:1
        },
        {
          id:"arco",
          name:"Orc bow",
          cost:1,
          bow:true
        },
        {
          id:"escudo",
          name:"Shield",
          cost:1,
          mod:{
            d:1
          }
        },
        {
          id:"lanza",
          name:"Spear",
          cost:1
        },
        {
          id:"hacha2m",
          name:"Two-handed weapon",
          cost:1
        }
      ],
      rules:[]
    },
    {
      id:"crebain",
      name:"Crebain",
      cost:20,
      race:"Bird",
      keywords:["Warrior","Infantry","Beast","Swarm"],
      stats:{
        mv:"12\"",
        fv:2,
        sv:"6+",
        s:2,
        d:3,
        a:2,
        w:4,
        c:"8+",
        i:"7+"
      },
      wargear:"Beaks and claws (hand weapon).",
      options:[],
      rules:[
        {
          name:"Fly",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Keen Sight",
          desc:"PASSIVE. Enemy models within 12\" of this model gain no benefit from the Stalk Unseen special rule."
        },
        {
          name:"Cloud of Birds",
          desc:"PASSIVE. Shooting attacks that target a Crebain will only ever hit on the roll of a natural 6."
        }
      ],
      flavor:"There are all manner of creatures under the influence of Saruman used as spies by the White Wizard to discover the location of his enemies."
    },
    {
      id:"wild_man_of_dunland",
      name:"Wild Man of Dunland",
      cost:5,
      race:"Man",
      keywords:["Warrior","Infantry"],
      stats:{
        mv:"6\"",
        fv:3,
        sv:"4+",
        s:3,
        d:3,
        a:1,
        w:1,
        c:"7+",
        i:"8+"
      },
      wargear:"Hand weapon.",
      options:[
        {
          id:"escudollama",
          name:"Light shield and Flaming Brand",
          cost:2
        },
        {
          id:"arco",
          name:"Bow",
          cost:1,
          bow:true
        },
        {
          id:"llama",
          name:"Flaming Brand",
          cost:1
        },
        {
          id:"escudo",
          name:"Light shield",
          cost:1,
          mod:{
            d:1
          }
        },
        {
          id:"lanza",
          name:"Spear",
          cost:1
        },
        {
          id:"hacha2m",
          name:"Two-handed weapon",
          cost:1
        }
      ],
      rules:[
        {
          name:"Hatred (Rohan)",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Flaming Brand",
          desc:"PASSIVE (wargear). A model with a Flaming Brand has the Terror (Cavalry) and Terror (Beast) special rules. Additionally, it counts as 2 models rather than 1 when working out how many models are within range of an Objective Marker."
        }
      ]
    }
  ]
};

/* ---------- GONDOR ---------- */
FACTIONS.gondor={
  id:"gondor",
  name:"Gondor",
  motto:null,
  color:"#2f4d75",
  custom:false,
  armyBonus:null,
  heroes:[
    {
      id:"aragorn",
      name:"Aragorn, King Elessar",
      cost:225,
      tier:"legend",
      unique:true,
      race:"Man",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:7,
        sv:"3+",
        s:4,
        d:7,
        a:3,
        w:3,
        c:"4+",
        i:"3+"
      },
      might:3,
      will:3,
      fate:3,
      wargear:"Heavy armour, the Ring of Barahir and Andúril, Flame of the West.",
      heroic:[
        {
          name:"Heroic Challenge",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Defence",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic March",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Resolve",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Strength",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Strike",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[
        {
          id:"caballo",
          name:"Armoured horse",
          cost:25,
          mount:"armoured_horse"
        }
      ],
      rules:[
        {
          name:"Ring of Barahir",
          desc:"PASSIVE (Unique wargear). Whenever Aragorn is affected by a Magical Power, after any Resist Tests have been made (if able), he may roll a D6. On a natural 6, Aragorn is not affected by that Magical Power."
        },
        {
          name:"Andúril, Flame of the West",
          desc:"ACTIVE (Unique wargear). This is a Unique Elven hand-and-a-half weapon. Whenever Aragorn makes Strikes with Andúril, he never requires more than a 4+ when rolling To Wound (3+ if he uses it as a two-handed weapon)."
        },
        {
          name:"Horse Lord",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Mighty Hero",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Resistant to Magic",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"\"Stand, Men of the West\"",
          desc:"PASSIVE. Friendly models treat Aragorn, King Elessar as a banner with a range of 6\"."
        }
      ]
    },
    {
      id:"denethor",
      name:"Denethor, Steward of Gondor",
      cost:50,
      tier:"valour",
      unique:true,
      race:"Man",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:5,
        sv:"4+",
        s:4,
        d:6,
        a:2,
        w:2,
        c:"5+",
        i:"5+"
      },
      might:2,
      will:3,
      fate:1,
      wargear:"Heavy armour and hand weapon.",
      heroic:[
        {
          name:"Heroic Defence",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[],
      rules:[
        {
          name:"Leader (Citadel Guard)",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Leader (Guard of the Fountain Court)",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Broken Mind",
          desc:"ACTIVE. During each Priority Phase, after Priority has been determined, Denethor must take an Intelligence Test. If it is failed, he is controlled by the opposing player for that turn (he still counts as a friendly model, so he cannot be targeted by friendly shooting attacks or damaging Magical Powers, and the opposing player cannot spend his Might, Will or Fate). If Boromir is alive in the same Army, Denethor passes this test automatically; should Boromir be slain, Denethor automatically fails the next test."
        }
      ]
    },
    {
      id:"boromir",
      name:"Boromir, Captain of the White Tower",
      cost:160,
      tier:"valour",
      unique:true,
      race:"Man",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:7,
        sv:"4+",
        s:4,
        d:6,
        a:3,
        w:3,
        c:"4+",
        i:"5+"
      },
      might:6,
      will:3,
      fate:3,
      wargear:"Heavy armour, hand weapon and Horn of Gondor.",
      heroic:[
        {
          name:"Heroic Challenge",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Strength",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Strike",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[
        {
          id:"estandarte",
          name:"Banner of Minas Tirith",
          cost:40,
          banner:true,
          maxPerWarband:1
        },
        {
          id:"caballo",
          name:"Horse",
          cost:20,
          mount:"horse"
        },
        {
          id:"escudo",
          name:"Shield",
          cost:5,
          mod:{
            d:1
          }
        }
      ],
      rules:[
        {
          name:"Horn of Gondor",
          desc:"ACTIVE (Unique wargear). This is a Unique war horn. At the start of a Combat involving Boromir, if he is outnumbered in the Combat then he may blow the Horn of Gondor. If he does, one enemy model involved in the Combat (chosen by their controlling player) must take a Courage Test. If it is failed, no Duel Roll is made and Boromir automatically wins the Combat."
        },
        {
          name:"Banner of Minas Tirith",
          desc:"PASSIVE (Unique wargear, range 6\"). Boromir does not suffer the -1 penalty to his Duel Roll for carrying a banner. If a friendly Gondor Warrior model within range is involved in a Drawn Combat tied at that model\'s Fight Value, the Gondor Warrior wins instead of rolling off."
        },
        {
          name:"Leader (Citadel Guard)",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Son of Gondor",
          desc:"ACTIVE. In a turn in which he Charges, Boromir gains a bonus of +1 To Wound when making Strikes."
        }
      ],
      tierNota:"// TODO: the book does not print the Heroic Tier on the profile card (checked by hand, at high resolution, across all 32 hero cards in both chapters). This value comes from mesbg-list-builder-v2024 (github.com/mhollink), which does carry it. For this hero the value varies depending on which Legendary Legion you consult -- the value from the most generic/base list was used. Confirm it against your own book if you can. Values seen: Valour (15) in the Minas Tirith legion (the most generic); Legend (18) in Reclamation of Osgiliath."
    },
    {
      id:"faramir",
      name:"Faramir, Captain of Gondor",
      cost:100,
      tier:"valour",
      unique:true,
      race:"Man",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:6,
        sv:"3+",
        s:4,
        d:5,
        a:3,
        w:2,
        c:"4+",
        i:"4+"
      },
      might:3,
      will:3,
      fate:2,
      wargear:"Armour, hand weapon and bow.",
      heroic:[
        {
          name:"Heroic Accuracy",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Defence",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Resolve",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Strike",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[
        {
          id:"caballo",
          name:"Horse",
          cost:20,
          mount:"horse"
        },
        {
          id:"escudo",
          name:"Shield",
          cost:5,
          mod:{
            d:1
          }
        },
        {
          id:"pesada",
          name:"Exchange armour and bow for heavy armour",
          cost:0
        }
      ],
      rules:[
        {
          name:"Leader (Citadel Guard)",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Resistant to Magic",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Sharpshooter",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Woodland Creature",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"\"A Chance for Faramir, Captain of Gondor to show his Quality\"",
          desc:"ACTIVE. Should Faramir's Army be Broken, from that point onwards he may re-roll any failed To Wound Rolls when making Strikes, and may declare a Heroic Resolve each turn for free."
        },
        {
          name:"Wizard's Pupil",
          desc:"PASSIVE. Whilst Faramir is alive and on the battlefield, if you win the roll to choose who has Priority and give Priority to your opponent, then until the end of the turn Faramir and friendly Warrior models within 3\" of him gain the Dominant (2) special rule."
        }
      ]
    },
    {
      id:"gandalf",
      name:"Gandalf the White",
      cost:200,
      tier:"legend",
      unique:true,
      race:"Wizard",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:6,
        sv:"4+",
        s:4,
        d:6,
        a:3,
        w:3,
        c:"3+",
        i:"3+"
      },
      might:3,
      will:6,
      fate:3,
      wargear:"Glamdring, Narya and Staff of Power. Included in the Gondor chapter: Gondor Warrior models may only be included in the Warband of a Gondor Hero or of Gandalf.",
      heroic:[
        {
          name:"Heroic Channelling",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Defence",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Resolve",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Strike",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[
        {
          id:"shadowfax",
          name:"Shadowfax",
          cost:25,
          mount:"shadowfax"
        },
        {
          id:"pippin",
          name:"Pippin (only if Gandalf is riding Shadowfax)",
          cost:25
        }
      ],
      rules:[
        {
          name:"Glamdring",
          desc:"ACTIVE (Unique wargear). This is a Unique Elven hand-and-a-half weapon. A model gains a bonus of +1 to their Strength when making Strikes with Glamdring."
        },
        {
          name:"Narya",
          desc:"PASSIVE (Unique wargear). Gandalf may re-roll any failed Fate rolls."
        },
        {
          name:"Pippin",
          desc:"PASSIVE. If Gandalf is upgraded to take Pippin, Pippin is treated as a Passenger on Shadowfax, uses the Peregrin Took, Guard of the Citadel profile and always counts as an Independent Hero; he does not take up a space in Gandalf's Warband. Whilst Pippin is mounted on Shadowfax, Gandalf gains Resistant to Magic, may re-roll To Wound Rolls of a natural 1 when making Strikes, and can spend Pippin's Might, Will and Fate Points as if they were his own."
        },
        {
          name:"Magical Powers",
          desc:"Blinding Light 3+, Terrifying Aura 3+, Transfix 3+, Foil Magic 4+, Fortify Spirit 4+, Strengthen Will 4+, Banishment 5+, Sorcerous Blast 5+, Your Staff is Broken 5+. See Armies of The Lord of the Rings, p. 53."
        }
      ],
      tierNota:"// TODO: the book does not print the Heroic Tier on the profile card (checked by hand, at high resolution, across all 32 hero cards in both chapters). This value comes from mesbg-list-builder-v2024 (github.com/mhollink), which does carry it. For this hero the value varies depending on which Legendary Legion you consult -- the value from the most generic/base list was used. Confirm it against your own book if you can. Values seen: Legend (18) in Atop the Walls and Defenders of the Pelennor; Valour (15) in Men of the West and Riders of Éomer. Tied 2-2 across legions; Legend was chosen because his cost (200 pts) is the highest of any hero in this batch except Aragorn."
    },
    {
      id:"peregrin",
      name:"Peregrin Took, Guard of the Citadel",
      cost:25,
      tier:"independent",
      unique:true,
      race:"Hobbit",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"4\"",
        fv:3,
        sv:"3+",
        s:2,
        d:4,
        a:1,
        w:2,
        c:"5+",
        i:"6+"
      },
      might:1,
      will:1,
      fate:2,
      wargear:"Armour and hand weapon.",
      heroic:[
        {
          name:"Heroic Defence",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[
        {
          id:"capa",
          name:"Elven cloak",
          cost:5
        }
      ],
      rules:[
        {
          name:"Resistant to Magic",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Throw Stones",
          desc:"Range 8\", Strength 1. See Special_Rules_MESBG_2024."
        }
      ]
    },
    {
      id:"irolas",
      name:"Irolas, Captain of the Guard",
      cost:65,
      tier:"fortitude",
      unique:true,
      race:"Man",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:5,
        sv:"4+",
        s:4,
        d:6,
        a:2,
        w:2,
        c:"6+",
        i:"6+"
      },
      might:2,
      will:1,
      fate:2,
      wargear:"Heavy armour and hand weapon.",
      heroic:[
        {
          name:"Heroic Defence",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[],
      rules:[
        {
          name:"Leader (Citadel Guard)",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Sworn Protector (Denethor)",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Defend the White City",
          desc:"ACTIVE. Irolas may use the Shielding special rule even though he is not armed with a shield. If Irolas elects to shield and wins the ensuing Combat, he may make a single Strike against one enemy model that was involved in the Combat."
        },
        {
          name:"Captain of the Citadel Guard",
          desc:"PASSIVE. Friendly Citadel Guard within 3\" of Irolas gain a bonus of +1 To Wound when making Strikes."
        }
      ]
    },
    {
      id:"madril",
      name:"Madril, Captain of Ithilien",
      cost:60,
      tier:"fortitude",
      unique:true,
      race:"Man",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"3+",
        s:4,
        d:5,
        a:2,
        w:2,
        c:"6+",
        i:"6+"
      },
      might:3,
      will:1,
      fate:1,
      wargear:"Armour, hand weapon and bow.",
      heroic:[
        {
          name:"Heroic Accuracy",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic March",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[],
      rules:[
        {
          name:"Woodland Creature",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Master of Reserves",
          desc:"PASSIVE. In Scenarios where you roll for Warbands to arrive, or roll to see which part of the board you deploy a Warband in, you may modify the roll for Madril's Warband by +1 or -1 even if he is not on the battlefield. If Madril is on the battlefield, you may also modify the roll for other Warbands in your Army by +1 or -1."
        }
      ]
    },
    {
      id:"damrod",
      name:"Damrod, Ranger of Ithilien",
      cost:40,
      tier:"fortitude",
      unique:true,
      race:"Man",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"3+",
        s:4,
        d:5,
        a:2,
        w:2,
        c:"6+",
        i:"6+"
      },
      might:1,
      will:1,
      fate:1,
      wargear:"Armour, hand weapon and bow.",
      heroic:[
        {
          name:"Heroic Accuracy",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[],
      rules:[
        {
          name:"Woodland Creature",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Well-aimed Shot",
          desc:"ACTIVE. When making a shooting attack, the first time Damrod fails an In The Way Roll he may make an Intelligence Test. If the test is passed, the In The Way Roll will be successful instead."
        }
      ]
    },
    {
      id:"captain_of_minas_tirith",
      name:"Captain of Minas Tirith",
      cost:60,
      tier:"fortitude",
      race:"Man",
      keywords:["Hero","Infantry"],
      stats:{
        mv:"6\"",
        fv:5,
        sv:"4+",
        s:4,
        d:7,
        a:2,
        w:2,
        c:"6+",
        i:"6+"
      },
      might:2,
      will:1,
      fate:1,
      wargear:"Heavy armour, hand weapon and shield.",
      heroic:[
        {
          name:"Heroic March",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[],
      rules:[
        {
          name:"Shieldwall",
          desc:"See Special_Rules_MESBG_2024."
        }
      ]
    }
  ],
  warriors:[
    {
      id:"ranger_of_gondor",
      name:"Ranger of Gondor",
      cost:8,
      race:"Man",
      keywords:["Warrior","Infantry"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"3+",
        s:3,
        d:4,
        a:1,
        w:1,
        c:"7+",
        i:"6+"
      },
      wargear:"Armour, hand weapon and bow.",
      options:[
        {
          id:"estandarte",
          name:"Banner",
          cost:25,
          banner:true,
          maxPerWarband:1
        },
        {
          id:"cuerno",
          name:"War horn",
          cost:25
        },
        {
          id:"lanza",
          name:"Spear",
          cost:1
        }
      ],
      rules:[
        {
          name:"Woodland Creature",
          desc:"See Special_Rules_MESBG_2024."
        }
      ]
    },
    {
      id:"osgiliath_veteran",
      name:"Osgiliath Veteran",
      cost:9,
      race:"Man",
      keywords:["Warrior","Infantry"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"4+",
        s:3,
        d:5,
        a:1,
        w:1,
        c:"6+",
        i:"6+"
      },
      wargear:"Heavy armour and hand weapon.",
      options:[
        {
          id:"arco",
          name:"Bow",
          cost:1,
          bow:true
        },
        {
          id:"escudo",
          name:"Shield",
          cost:1,
          mod:{
            d:1
          }
        },
        {
          id:"lanza",
          name:"Spear",
          cost:1
        }
      ],
      rules:[
        {
          name:"Hatred (Mordor)",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Loyal to the Captains",
          desc:"ACTIVE. Whilst within 6\" of either Boromir or Faramir, this model may re-roll To Wound Rolls of a natural 1 when making Strikes."
        }
      ]
    },
    {
      id:"warrior_of_minas_tirith",
      name:"Warrior of Minas Tirith",
      cost:8,
      race:"Man",
      keywords:["Warrior","Infantry"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"4+",
        s:3,
        d:5,
        a:1,
        w:1,
        c:"7+",
        i:"7+"
      },
      wargear:"Heavy armour and hand weapon.",
      options:[
        {
          id:"cuernoescudo",
          name:"War horn and shield",
          cost:26,
          mod:{
            d:1
          }
        },
        {
          id:"estandarte",
          name:"Banner",
          cost:25,
          banner:true,
          maxPerWarband:1
        },
        {
          id:"escudolanza",
          name:"Shield and spear",
          cost:2,
          mod:{
            d:1
          }
        },
        {
          id:"arco",
          name:"Bow",
          cost:1,
          bow:true
        },
        {
          id:"escudo",
          name:"Shield",
          cost:1,
          mod:{
            d:1
          }
        }
      ],
      rules:[
        {
          name:"Shieldwall",
          desc:"See Special_Rules_MESBG_2024."
        }
      ]
    },
    {
      id:"knight_of_minas_tirith",
      name:"Knight of Minas Tirith",
      cost:15,
      race:"Man",
      keywords:["Warrior","Cavalry"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"4+",
        s:3,
        d:6,
        a:1,
        w:1,
        c:"7+",
        i:"7+"
      },
      wargear:"Heavy armour, hand weapon, shield, lance and horse.",
      options:[
        {
          id:"estandarte",
          name:"Exchange shield and lance for banner",
          cost:25,
          banner:true,
          maxPerWarband:1
        }
      ],
      rules:[
        {
          name:"Shieldwall",
          desc:"See Special_Rules_MESBG_2024."
        }
      ]
    },
    {
      id:"citadel_guard",
      name:"Citadel Guard",
      cost:8,
      race:"Man",
      keywords:["Warrior","Infantry","Elite"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"4+",
        s:3,
        d:5,
        a:1,
        w:1,
        c:"7+",
        i:"6+"
      },
      wargear:"Heavy armour and hand weapon.",
      options:[
        {
          id:"arcolargo",
          name:"Longbow",
          cost:1,
          bow:true
        },
        {
          id:"lanza",
          name:"Spear",
          cost:1
        }
      ],
      rules:[
        {
          name:"Bodyguard",
          desc:"See Special_Rules_MESBG_2024."
        }
      ]
    },
    {
      id:"guard_of_the_fountain_court",
      name:"Guard of the Fountain Court",
      cost:10,
      race:"Man",
      keywords:["Warrior","Infantry","Elite"],
      stats:{
        mv:"6\"",
        fv:4,
        sv:"4+",
        s:3,
        d:6,
        a:1,
        w:1,
        c:"7+",
        i:"6+"
      },
      wargear:"Heavy armour, hand weapon and spear.",
      options:[],
      rules:[
        {
          name:"Bodyguard",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Protectors of the White Tree",
          desc:"PASSIVE. If this model is within 6\" of a friendly Gondor General, it is treated as having the Dominant (2) special rule."
        }
      ]
    }
  ]
};

/* ---------- NUMENOR ---------- */
FACTIONS.numenor={
  id:"numenor",
  name:"Númenor",
  motto:null,
  color:"#52586b",
  custom:false,
  armyBonus:null,
  heroes:[
    {
      id:"elendil",
      name:"Elendil, High King of Gondor and Arnor",
      cost:175,
      tier:"legend",
      unique:true,
      race:"Man",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:8,
        sv:"4+",
        s:5,
        d:7,
        a:3,
        w:3,
        c:"4+",
        i:"4+"
      },
      might:3,
      will:3,
      fate:1,
      wargear:"Heavy armour and Narsil.",
      heroic:[
        {
          name:"Heroic Challenge",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Strength",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Strike",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[],
      rules:[
        {
          name:"Narsil",
          desc:"ACTIVE (Unique wargear). This is a Unique Master-forged two-handed weapon. Additionally, a model wielding Narsil may declare a Heroic Combat during each Fight Phase for free."
        },
        {
          name:"Resistant to Magic",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"High King of Gondor and Arnor",
          desc:"ACTIVE. The range of Elendil\'s Stand Fast is 12\" rather than 6\"."
        }
      ]
    },
    {
      id:"isildur",
      name:"Isildur, Prince of Númenor",
      cost:130,
      tier:"valour",
      unique:true,
      race:"Man",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"6\"",
        fv:7,
        sv:"4+",
        s:5,
        d:7,
        a:3,
        w:3,
        c:"4+",
        i:"5+"
      },
      might:3,
      will:2,
      fate:2,
      wargear:"Heavy armour and hand-and-a-half weapon.",
      heroic:[
        {
          name:"Heroic Challenge",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Strength",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Strike",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[
        {
          id:"caballo",
          name:"Horse",
          cost:20,
          mount:"horse"
        },
        {
          id:"anillo",
          name:"The One Ring (only if your Army does not include Elendil or Gil-galad)",
          cost:0
        }
      ],
      rules:[
        {
          name:"Resistant to Magic",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"The Shards of Narsil",
          desc:"ACTIVE. If your Army also contains Elendil, then if Elendil is slain place a 25mm Marker where he was killed. If Isildur ends his Activation within 1\" of this Marker he may gain the Shards of Narsil (a Unique hand weapon granting +1 To Wound when making Strikes) — remove the Marker."
        }
      ]
    },
    {
      id:"captain_of_numenor",
      name:"Captain of Númenor",
      cost:70,
      tier:"fortitude",
      race:"Man",
      keywords:["Hero","Infantry"],
      stats:{
        mv:"6\"",
        fv:6,
        sv:"4+",
        s:5,
        d:6,
        a:2,
        w:2,
        c:"6+",
        i:"6+"
      },
      might:2,
      will:1,
      fate:1,
      wargear:"Armour, shield and hand weapon.",
      heroic:[
        {
          name:"Heroic March",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[],
      rules:[]
    }
  ],
  warriors:[
    {
      id:"warrior_of_numenor",
      name:"Warrior of Númenor",
      cost:9,
      race:"Man",
      keywords:["Warrior","Infantry"],
      stats:{
        mv:"6\"",
        fv:5,
        sv:"4+",
        s:4,
        d:4,
        a:1,
        w:1,
        c:"7+",
        i:"7+"
      },
      wargear:"Armour and hand weapon.",
      options:[
        {
          id:"escudolanza",
          name:"Shield and spear",
          cost:2,
          mod:{
            d:1
          }
        },
        {
          id:"arcolargo",
          name:"Longbow",
          cost:1,
          bow:true
        },
        {
          id:"escudo",
          name:"Shield",
          cost:1,
          mod:{
            d:1
          }
        }
      ],
      rules:[]
    }
  ]
};

/* ---------- DUNHARROW: EJERCITO DE LOS MUERTOS ---------- */
FACTIONS.dunharrow={
  id:"dunharrow",
  name:"The Army of the Dead",
  motto:null,
  color:"#3f5c4f",
  custom:false,
  armyBonus:null,
  heroes:[
    {
      id:"king_of_the_dead",
      name:"King of the Dead",
      cost:100,
      tier:"valour",
      unique:true,
      race:"Spirit",
      keywords:["Hero","Infantry","Unique"],
      stats:{
        mv:"8\"",
        fv:6,
        sv:"4+",
        s:4,
        d:8,
        a:2,
        w:3,
        c:"3+",
        i:"5+"
      },
      might:1,
      will:6,
      fate:3,
      wargear:"Armour and hand weapon.",
      heroic:[
        {
          name:"Heroic March",
          desc:"See the MESBG Rules Manual 2024."
        },
        {
          name:"Heroic Strike",
          desc:"See the MESBG Rules Manual 2024."
        }
      ],
      options:[],
      rules:[
        {
          name:"Blades of the Dead",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Spectral Walk",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Terror",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Drain Soul",
          desc:"ACTIVE. A model that suffers a Wound from the King of the Dead in Combat, which is not then prevented, will automatically have their Wounds reduced to 0, causing them to be slain and removed as a casualty."
        },
        {
          name:"The Dead and the Living",
          desc:"PASSIVE. Only friendly Dunharrow models may benefit from the King of the Dead's Stand Fast or benefit from his Heroic Actions."
        }
      ]
    },
    {
      id:"herald_of_the_dead",
      name:"Herald of the Dead",
      cost:70,
      tier:"fortitude",
      race:"Spirit",
      keywords:["Hero","Infantry"],
      stats:{
        mv:"8\"",
        fv:4,
        sv:"4+",
        s:4,
        d:8,
        a:2,
        w:2,
        c:"4+",
        i:"6+"
      },
      might:0,
      will:3,
      fate:2,
      wargear:"Armour, shield, hand weapon and Pennant of the Dead.",
      heroic:[],
      options:[],
      rules:[
        {
          name:"Blades of the Dead",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Spectral Walk",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Terror",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Pennant of the Dead",
          desc:"PASSIVE (wargear). Friendly Dunharrow models within 3\" of a model with a Pennant of the Dead count as having the Resistant to Magic special rule."
        },
        {
          name:"The King's Counsel",
          desc:"PASSIVE. Whilst the King of the Dead is within 3\" of this model, he can spend this model\'s Will Points to declare a Heroic Action instead of spending one of his own Might Points."
        }
      ]
    }
  ],
  warriors:[
    {
      id:"warrior_of_the_dead",
      name:"Warrior of the Dead",
      cost:14,
      race:"Spirit",
      keywords:["Warrior","Infantry"],
      stats:{
        mv:"8\"",
        fv:3,
        sv:"4+",
        s:3,
        d:7,
        a:1,
        w:1,
        c:"4+",
        i:"6+"
      },
      wargear:"Armour and hand weapon.",
      options:[
        {
          id:"estandarte",
          name:"Banner",
          cost:25,
          banner:true,
          maxPerWarband:1
        },
        {
          id:"escudolanza",
          name:"Shield and spear",
          cost:2,
          mod:{
            d:1
          }
        },
        {
          id:"escudo",
          name:"Shield",
          cost:1,
          mod:{
            d:1
          }
        },
        {
          id:"lanza",
          name:"Spear",
          cost:1
        }
      ],
      rules:[
        {
          name:"Blades of the Dead",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Spectral Walk",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Terror",
          desc:"See Special_Rules_MESBG_2024."
        }
      ]
    },
    {
      id:"rider_of_the_dead",
      name:"Rider of the Dead",
      cost:25,
      race:"Spirit",
      keywords:["Warrior","Cavalry"],
      stats:{
        mv:"8\"",
        fv:3,
        sv:"4+",
        s:3,
        d:8,
        a:1,
        w:1,
        c:"4+",
        i:"6+"
      },
      wargear:"Armour, shield, hand weapon and Spectral Steed.",
      options:[],
      rules:[
        {
          name:"Blades of the Dead",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Spectral Walk",
          desc:"See Special_Rules_MESBG_2024."
        },
        {
          name:"Terror",
          desc:"See Special_Rules_MESBG_2024."
        }
      ]
    }
  ]
};
