/* =====================================================================
   CONVERGENCE — DATOS
   Extraído VERBATIM del piloto MESBG_Army_Builder.html.
   Fuente única de verdad: el constructor y la página de perfiles leen
   de aquí. No dupliques perfiles en el HTML.

   Único cambio respecto del piloto: los retratos estaban incrustados
   como data URI base64 (245 KB dentro del JS). Ahora son archivos en
   assets/img/perfiles/. El acceso IMGS[id] no cambia.
   ===================================================================== */

/* ---------- RETRATOS ---------- */
const IMGS = {};
IMGS["ramsay"]="assets/img/perfiles/ramsay.jpg";
IMGS["comandante"]="assets/img/perfiles/comandante.jpg";
IMGS["lanzas"]="assets/img/perfiles/lanzas.jpg";
IMGS["lanceros"]="assets/img/perfiles/lanceros.jpg";
/* La Horda (Wow/Imagenes, reescalados a 480x480) */
IMGS["campeon"]="assets/img/perfiles/campeon.jpg";
IMGS["chaman"]="assets/img/perfiles/chaman.jpg";
IMGS["grunt"]="assets/img/perfiles/grunt.jpg";
IMGS["troll"]="assets/img/perfiles/troll.jpg";
IMGS["raptor"]="assets/img/perfiles/raptor.jpg";
IMGS["dewback"]="assets/img/perfiles/dewback.jpg";

const MOUNTS = {
  horse:{name:"Caballo de guerra", stats:{mv:'10"',fv:2,sv:"6+",s:3,d:4,a:0,w:1,c:"7+",i:"7+"},
    rules:[{name:"Montura",desc:"El modelo pasa a ser Caballería. En combate usa el mejor Valor de Combate, Fuerza y Ataques entre jinete y montura."}]},
  dewback:{name:"Dewback de Guerra", stats:{mv:'7"',fv:3,sv:"-",s:4,d:6,a:1,w:2,c:"3+",i:"6+"},
    rules:[
      {name:"Montura Estable",desc:"El jinete montado sobre el Dewback no sufre el penalizador de -1 al Duel Roll por usar armas a dos manos."},
      {name:"Piel Acorazada",desc:"La Defensa del Dewback no puede ser reducida por ningún medio por debajo de 5."},
      {name:"Aplastamiento",desc:"Cuando el Dewback carga con éxito y derriba al enemigo, ese enemigo sufre una herida automática de F5 por el peso de la bestia. Esta herida no puede ser evitada con Destino."}
    ]}
};

/* ---------- TIERS ---------- */
const TIERS = {
  legend:{name:"Hero of Legend", es:"Leyenda", followers:18, rank:5},
  valour:{name:"Hero of Valour", es:"Valor", followers:15, rank:4},
  fortitude:{name:"Hero of Fortitude", es:"Fortaleza", followers:12, rank:3},
  minor:{name:"Minor Hero", es:"Héroe Menor", followers:6, rank:2},
  independent:{name:"Independent Hero", es:"Independiente", followers:0, rank:1}
};

/* ---------- FACCIONES ---------- */
const FACTIONS = {
bolton:{
  id:"bolton", name:"Casa Bolton", motto:"Nuestras Hojas Son Afiladas",
  color:"#8b1a1a", custom:true,
  armyBonus:null,
  heroes:[
    {
      id:"ramsay", name:"Ramsay Bolton", cost:103, tier:"valour", unique:true,
      race:"Hombre", keywords:["Héroe","Infantería","Único"],
      stats:{mv:'6"',fv:5,sv:"3+",s:4,d:4,a:2,w:3,c:"6+",i:"3+"},
      might:3, will:4, fate:2,
      wargear:"Espada bastarda, armadura de cuero",
      heroic:[
        {name:"Marcha Heroica", desc:"El héroe y las miniaturas amigas a 6\" pueden moverse de nuevo. No afecta a los trabados en combate."},
        {name:"Defensa Heroica", desc:"Suma D3 a la Defensa del héroe hasta el final del turno."},
        {name:"Ataque Heroico", desc:"El héroe gana +1 Ataque hasta el final del turno."},
        {name:"Desafío Heroico", desc:"Ver reglas principales de MESBG."}
      ],
      options:[
        {id:"arco", name:"Arco corto", cost:5, bow:true},
        {id:"cuchillos", name:"Cuchillos de lanzamiento", cost:5, throwing:true},
        {id:"capa", name:"Capa de exploración", cost:10}
      ],
      rules:[
        {name:"La Presa Señalada", desc:"Antes del despliegue designa en secreto un héroe enemigo. A 12\", Ramsay gana +1A y ese héroe gasta 1 Voluntad adicional por acción heroica. Se revela al primer contacto o al final de la partida."},
        {name:"Los Perros del Bastardo", desc:"Una vez por partida, al inicio del turno de movimiento, coloca D3 Sabuesos de Bolton (Mv10\"/F3/S3/D3/A1/W1/C3; sin Voluntad ni Destino; causan Terror en tropas) en contacto con Ramsay."},
        {name:"Backstabbers", desc:"Este modelo obtiene +1 al herir cuando hace Strikes contra un modelo Trapped."}
      ],
      flavor:"Si tienes que elegir entre riesgo y certeza, elige siempre la certeza."
    },
    {
      id:"comandante", name:"Comandante de Línea Bolton", cost:55, tier:"fortitude",
      race:"Hombre", keywords:["Héroe","Infantería"],
      stats:{mv:'5"',fv:5,sv:"5+",s:4,d:5,a:2,w:2,c:"4+",i:"1+"},
      might:2, will:2, fate:1,
      wargear:"Espada, cota de malla",
      heroic:[
        {name:"Golpe Heroico", desc:"Tira 1D6 y suma el resultado al Valor de Combate del héroe."},
        {name:"Resolución Heroica", desc:"Las miniaturas amigas a 6\" pueden repetir chequeos de Coraje fallidos."}
      ],
      options:[
        {id:"escudo", name:"Escudo", cost:5, mod:{d:1}, desc:"La Defensa sube a 6."},
        {id:"lanza", name:"Lanza", cost:1},
        {id:"caballo", name:"Caballo de guerra", cost:15, mount:"horse"}
      ],
      rules:[
        {name:"Disciplina del Fuerte", desc:"Las Lanzas del Norte Oscuro a 6\" del Comandante activan Formación Inamovible con 3+ en lugar de 4+."}
      ],
      flavor:"La línea no se rompe. Nunca."
    }
  ],
  warriors:[
    {
      id:"lanzas", name:"Lanzas del Norte Oscuro", cost:10,
      race:"Hombre", keywords:["Guerrero","Infantería"],
      stats:{mv:'6"',fv:3,sv:"4+",s:4,d:6,a:1,w:1,c:"3+",i:"4+"},
      wargear:"Arma de asta, cota de malla, escudo (D6 ya incluido)",
      options:[
        {id:"formacion", name:"Escudo de Formación", cost:3, desc:"Habilita Formación Inamovible. Mv baja a 5\"."},
        {id:"arco", name:"Arco corto (reemplaza el escudo)", cost:1, bow:true, mod:{d:-1}, desc:"La Defensa baja a 5."},
        {id:"estandarte", name:"Estandarte", cost:25, banner:true, maxPerWarband:1}
      ],
      rules:[
        {name:"Formación Inamovible", desc:"(Requiere Escudo de Formación) Cuando son cargados, tira 1D6; con 4+ el atacante pierde su bono de carga. Al usar Shielding, tira 1 dado adicional en el duelo. Mv baja a 5\"."},
        {name:"Bodyguard", desc:"Todas las Lanzas del Norte deben elegir un Héroe de Casa Bolton al que custodiar (normalmente el de mayor rango de su warband). Mientras ese Héroe siga vivo en el campo de batalla, todos los modelos con esta regla pasan automáticamente las Pruebas de Coraje que deban realizar."}
      ],
      flavor:"No retrocedemos. No huimos. Sostenemos la línea o morimos en ella."
    },
    {
      id:"lanceros", name:"Lanceros Montados Bolton", cost:19,
      race:"Hombre", keywords:["Guerrero","Caballería"],
      stats:{mv:'10"',fv:4,sv:"4+",s:4,d:5,a:1,w:1,c:"3+",i:"3+"},
      wargear:"Lanza, espada, cota de malla, caballo de guerra",
      options:[
        {id:"escudo", name:"Escudo", cost:1, mod:{d:1}, desc:"La Defensa sube a 6."},
        {id:"arco", name:"Arco corto montado", cost:2, bow:true},
        {id:"estandarte", name:"Estandarte de caballería", cost:30, banner:true, maxPerWarband:1}
      ],
      rules:[
        {name:"Ímpetu del Norte", desc:"Cuando cargan y el dado de combate supera al del defensor por 3 o más puntos, el defensor es automáticamente derribado aunque no sea herido. No aplica contra monturas ni modelos de gran tamaño."},
        {name:"Expert Rider", desc:"Puede repetir los dados en cualquier Jump, Swim o Thrown Rider Test. Además puede recoger Objetos Ligeros sin desmontar. Si lleva arco y escudo a la vez, conserva el +1 a la Defensa del escudo mientras permanezca montado."}
      ],
      flavor:"El trueno de sus cascos anuncia la muerte. Los Lanceros Bolton no hacen prisioneros."
    }
  ]
},

/* =====================================================================
   LA HORDA
   Transcrito de Wow/horda_perfiles_v3.md. Sin flavor text ni lema:
   el documento de origen no los trae y no se inventan.
   ===================================================================== */
horda:{
  id:"horda", name:"La Horda", motto:null,
  color:"#5a3a22", custom:true,
  armyBonus:null,
  heroes:[
    {
      id:"campeon", name:"Campeón de la Horda", cost:135, tier:"valour", unique:true,
      race:"Orc", keywords:["Héroe","Infantería","Único"],
      stats:{mv:'6"',fv:6,sv:"6+",s:5,d:5,a:3,w:3,c:"5+",i:"2+"},
      might:3, will:3, fate:2,
      wargear:"Hacha a dos manos (+1 a la Fuerza al herir), cota de malla",
      heroic:[
        {name:"Golpe Heroico", desc:"Tira 1D6 y suma el resultado al Valor de Combate hasta el final del turno."},
        {name:"Fuerza Heroica", desc:"Suma D3 a la Fuerza del héroe hasta el final del turno."},
        {name:"Desafío Heroico", desc:"Ver reglas principales de MESBG."}
      ],
      options:[
        // TODO: el escudo anula el bono del hacha a dos manos. El piloto no
        // modela opciones excluyentes; por ahora queda advertido en el texto.
        {id:"escudo", name:"Escudo", cost:5, mod:{d:1}, desc:"La Defensa sube a 6. Pierde el bono de +1 a la Fuerza del hacha a dos manos."},
        {id:"trofeos", name:"Trofeos de guerra", cost:5, desc:"+1 al Coraje de los aliados de la Horda a 6\"."},
        {id:"dewback", name:"Dewback de Guerra", cost:18, mount:"dewback"}
      ],
      rules:[
        {name:"Aplastamiento de Campeón", desc:"Cuando gana un combate con diferencia de 3+ en los dados, puede optar entre derribar al enemigo normalmente o empujarlo D3\" en línea recta. Todo modelo en esa trayectoria recibe un impacto automático de F4."},
        {name:"Terror de la Horda", desc:"Causa Terror. Si un modelo enemigo falla su prueba de Terror contra el Campeón, sufre -1C de forma permanente hasta el final de la partida (no acumulable entre distintos modelos)."},
        {name:"Harbinger of Evil (6\")", desc:"Los modelos enemigos que se encuentren a 6\" o menos del Campeón sufren un penalizador de -1 en todas las Pruebas de Coraje que deban realizar. Este efecto no es acumulable con otras reglas que proporcionen el mismo penalizador."}
      ]
    },
    {
      id:"chaman", name:"Chamán de la Horda", cost:60, tier:"fortitude",
      race:"Orc", keywords:["Héroe","Infantería"],
      stats:{mv:'5"',fv:3,sv:"4+",s:3,d:4,a:1,w:2,c:"4+",i:"4+"},
      might:1, will:4, fate:2,
      wargear:"Báculo ancestral (actúa como lanza: puede atacar desde segunda fila), armadura ligera",
      heroic:[
        {name:"Canalización Heroica", desc:"Puede repetir una prueba de Voluntad fallida este turno."}
      ],
      options:[],
      rules:[
        {name:"Llamada del Rayo", desc:"Una vez por partida, en la fase de Disparo, elige un modelo enemigo a 12\". Ese modelo sufre un impacto S6 sin salvación por armadura. Todos los modelos enemigos dentro de 3\" de ese objetivo reciben además un impacto S3."},
        {name:"Grito de Guerra", desc:"Los modelos de la Horda a 6\" del Chamán suman +1 a sus tiradas de Coraje. Una vez por partida puede proclamar el Grito de Guerra: todos los aliados a 12\" son inmunes a las huidas por Ejército Roto hasta el final de ese turno."},
        {name:"Resistant to Magic", desc:"Cada vez que este modelo sea objetivo de un Poder Mágico, obtiene un dado adicional gratis al hacer un Resist Test, aunque no tenga Puntos de Voluntad restantes. Este beneficio es acumulable con otras reglas que otorguen un efecto similar."}
      ]
    }
  ],
  warriors:[
    {
      id:"grunt", name:"Grunt de la Horda", cost:10,
      race:"Orc", keywords:["Guerrero","Infantería"],
      stats:{mv:'6"',fv:3,sv:"4+",s:4,d:5,a:1,w:1,c:"3+",i:"5+"},
      wargear:"Hacha de una mano, cota de malla",
      options:[
        // TODO: escudo y hacha a dos manos son excluyentes entre sí.
        {id:"escudo", name:"Escudo", cost:1, mod:{d:1}, desc:"La Defensa sube a 6."},
        {id:"hacha2m", name:"Hacha a dos manos", cost:1, desc:"+1 a la Fuerza al herir. Incompatible con el escudo."},
        {id:"arco", name:"Arco corto", cost:1, bow:true},
        {id:"estandarte", name:"Estandarte", cost:25, banner:true, maxPerWarband:1}
      ],
      rules:[
        {name:"¡Lok'tar!", desc:"Cuando carga a un objetivo que ya tiene trabado en combate a otro Grunt aliado, gana +1 al dado de combate en esa ronda de combate."},
        {name:"Poisoned Attacks", desc:"Este modelo debe relanzar cualquier To Wound Roll de 1 natural cuando realice Strikes en combate cuerpo a cuerpo o ataques de disparo."}
      ]
    },
    {
      id:"troll", name:"Troll Berserker", cost:18,
      race:"Troll", keywords:["Guerrero","Infantería"],
      stats:{mv:'7"',fv:4,sv:"6+",s:4,d:4,a:2,w:1,c:"3+",i:"5+"},
      wargear:"Dos armas (sin armadura)",
      options:[],
      rules:[
        {name:"Poisoned Attacks", desc:"Este modelo debe relanzar cualquier To Wound Roll de 1 natural cuando realice Strikes en combate cuerpo a cuerpo."},
        {name:"Oblivious to Pain", desc:"Cuando este modelo sufra una Herida, tira 1D6. Con un resultado natural de 6, esa Herida es ignorada."}
      ]
    },
    {
      id:"raptor", name:"Jinete Raptor", cost:24,
      race:"Orc", keywords:["Guerrero","Caballería"],
      stats:{mv:'10"',fv:4,sv:"4+",s:4,d:4,a:1,w:1,c:"3+",i:"2+"},
      // TODO: el arco corto va en el equipo base, no como opción, así que
      // totales() no lo suma al límite de 1/3 de arcos. Para que contara
      // habría que tocar totales(), que es lógica probada del piloto.
      // Si el límite debe incluirlo, decidilo y lo cambiamos aparte.
      wargear:"Katana Orc (espada), arco corto, armadura ligera, Raptor",
      options:[
        {id:"lanza", name:"Lanza de caballería", cost:2, desc:"En la carga, +1 a la Fuerza durante la primera ronda."},
        {id:"estandarte", name:"Estandarte de Exploración", cost:30, banner:true, maxPerWarband:1}
      ],
      rules:[
        {name:"Mordida del Raptor", desc:"Cuando carga con éxito, antes de resolver el combate normal, el Raptor realiza un ataque adicional automático de F3. Este ataque no puede ser bloqueado por escudo."},
        {name:"Esgrima Veterana", desc:"El Jinete puede elegir no atacar con su arma habitual y en su lugar realizar dos ataques de F4 con la katana Orc. No puede combinarse con lanza de caballería."},
        {name:"Expert Rider", desc:"Este modelo puede relanzar los dados en cualquier Jump, Swim o Thrown Rider Test. Puede recoger Objetos Ligeros sin necesidad de desmontar. Si lleva arco y escudo, conserva el +1 de Defensa del escudo mientras esté montado."}
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
      name:"Montura",
      desc:"El modelo pasa a ser Caballería. En combate usa el mejor Valor de Combate, Fuerza y Ataques entre jinete y montura."
    }
  ]
};
MOUNTS.armoured_horse={
  name:"Caballo acorazado",
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
      name:"Montura",
      desc:"El modelo pasa a ser Caballería. En combate usa el mejor Valor de Combate, Fuerza y Ataques entre jinete y montura."
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
      name:"Montura",
      desc:"El modelo pasa a ser Caballería. En combate usa el mejor Valor de Combate, Fuerza y Ataques entre jinete y montura."
    },
    {
      name:"Lord of the Mearas",
      desc:"ACTIVA. Mientras esté montado sobre Shadowfax, siempre que Gandalf haga un test de Jump, Leap o Swim, puede tirar dos dados y escoger el resultado más alto. Además, Shadowfax solo reduce a la mitad su Move Value en terreno difícil, en lugar de a un cuarto."
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
      race:"Mago",
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Staff of Power y Palantír.",
      heroic:[
        {
          name:"Heroic Channelling",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Defence",
          desc:"Ver reglas principales de MESBG."
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
          desc:"ACTIVA. Una vez por partida, durante la Priority Phase pero antes de la tirada de Prioridad, Saruman puede usar el Palantír para ganar automáticamente la tirada para elegir quién tiene la Prioridad ese turno. Si ambos bandos tienen una regla especial que permita esto y ambos desean usarla en el mismo turno, los jugadores tiran de forma normal y ambas reglas especiales cuentan como usadas."
        },
        {
          name:"Voice of Curunír",
          desc:"ACTIVA. El alcance del Stand Fast de Saruman es de 12\" en lugar de 6\". Además, los modelos Hero amigos pueden beneficiarse del Stand Fast de Saruman."
        },
        {
          name:"Saruman's Deceit",
          desc:"PASIVA. Al comienzo de la partida, después de que ambos bandos se hayan desplegado, Saruman puede elegir un único Hero enemigo. El Hero elegido sufre una penalización de -1 a cualquier Resist Test que haga cuando sea objetivo de un Poder Mágico lanzado por Saruman; aunque un 6 natural sigue contando como un 6."
        }
      ]
    },
    {
      id:"grima",
      name:"Gríma Wormtongue",
      cost:25,
      tier:"independent",
      unique:true,
      race:"Hombre",
      keywords:["Héroe","Infantería","Único"],
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
          desc:"PASIVA. Un Hero enemigo dentro de 6\" de Gríma debe gastar 2 Might Points en lugar de 1 para declarar una Acción Heroica."
        },
        {
          name:"A Traitor Within",
          desc:"PASIVA. Gríma puede desplegarse como parte de la Warband de Saruman (sin ocupar espacio en ella), o como parte del ejército enemigo, tratado como modelo amigo por este hasta que Saruman caiga, Gríma cargue, destruya una máquina de asedio enemiga o interactúe con un objetivo. Ver el manual completo para el detalle de despliegue y restricciones."
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
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Armour, hand weapon y Uruk-hai bow.",
      heroic:[
        {
          name:"Heroic Challenge",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic March",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Strength",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Strike",
          desc:"Ver reglas principales de MESBG."
        }
      ],
      options:[
        {
          id:"shield",
          name:"Shield",
          cost:0,
          desc:"No aumenta la Defensa de Lurtz, ya que también porta un Uruk-hai bow."
        }
      ],
      rules:[
        {
          name:"Sharpshooter",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"\"Find the Halflings\"",
          desc:"ACTIVA. En Escenarios que usen la regla especial Maelstrom of Battle, la Warband de Lurtz no tira para determinar dónde llega. En su lugar, Lurtz puede elegir el resultado."
        },
        {
          name:"Shield Throw",
          desc:"PASIVA. Si Lurtz está equipado con un shield, una vez por partida puede usarlo como arma arrojadiza (Strength 4, repite el To Hit Roll) y cualquier modelo sobre base de 25 mm impactado queda derribado. Tras lanzarlo ya no lo porta, aunque su Defensa no se reduce."
        },
        {
          name:"Oblivious to Pain",
          desc:"PASIVA. Siempre que Lurtz sufra una Herida, tira 1D6. Con un 6 natural, la Herida se ignora."
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
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Armour, hand weapon y whip.",
      heroic:[
        {
          name:"Heroic March",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Strength",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Strike",
          desc:"Ver reglas principales de MESBG."
        }
      ],
      options:[],
      rules:[
        {
          name:"Head Taker",
          desc:"ACTIVA. Si el ejército de Uglúk está Broken, al inicio de su Activación puede, en lugar de hacer su Courage Test, matar a un modelo Warrior amigo dentro de 2\" (retíralo como baja); si lo hace, pasa automáticamente el test, y su Stand Fast se incrementa a 12\" y afecta también a Héroes."
        },
        {
          name:"\"Looks like meat's back on the menu, boys!\"",
          desc:"ACTIVA. Al inicio de su Activación, Uglúk puede matar a un Orc Warrior amigo dentro de 2\"; si lo hace, todos los Uruk-hai amigos dentro de 6\" ganan Fearless y +1 To Wound al hacer Strikes hasta el final del turno. En un turno con el ejército Broken, esto también cuenta como activar Head Taker."
        }
      ],
      tierNota:"// TODO: el libro no imprime el Heroic Tier en la ficha (verificado a mano, en alta resolucion, sobre las 32 fichas de heroe de ambos capitulos). Este valor se tomo de mesbg-list-builder-v2024 (github.com/mhollink), que si lo trae. Para este heroe el dato varia segun la Legendary Legion consultada -- se uso el valor de la lista mas generica/base. Confirmalo contra tu propio libro si podes. Valores vistos: Fortitude (12) en la legión de Lurtz; Valour (15) en su propia legión (Uglúk's Scouts)."
    },
    {
      id:"grishnakh",
      name:"Grishnákh, Orc Captain",
      cost:55,
      tier:"fortitude",
      unique:true,
      race:"Orc",
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Armour y hand weapon.",
      heroic:[
        {
          name:"Heroic Strike",
          desc:"Ver reglas principales de MESBG."
        }
      ],
      options:[],
      rules:[
        {
          name:"Backstabbers",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"\"Let's put a maggot hole in your belly\"",
          desc:"ACTIVA. Si Grishnákh gana un Duel Roll sin otros aliados implicados en el Combate, puede elegir un único modelo enemigo sobre base de 25 mm y tirar 1D6. Con un 4+, ese modelo queda derribado antes de hacer Strikes."
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
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Armour y hand weapon.",
      heroic:[
        {
          name:"Heroic Challenge",
          desc:"Ver reglas principales de MESBG."
        }
      ],
      options:[],
      rules:[
        {
          name:"Cunning Mind",
          desc:"PASIVA. Siempre que Snaga se beneficie de la Acción Heroica de otro Hero amigo, puede tirar 1D6; con un 5+ recupera un Might Point gastado antes en la batalla. Además puede elegir no beneficiarse de un Heroic Move o Heroic March amigo, sin perder su Activación."
        }
      ]
    },
    {
      id:"uruk_hai_scout_captain",
      name:"Uruk-hai Scout Captain",
      cost:55,
      tier:"fortitude",
      race:"Uruk-hai",
      keywords:["Héroe","Infantería"],
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
      wargear:"Armour y two-handed weapon.",
      heroic:[
        {
          name:"Heroic March",
          desc:"Ver reglas principales de MESBG."
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
      keywords:["Héroe","Infantería"],
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
      wargear:"Armour, hand weapon y war drum (Uruk-hai). El efecto del tambor se define en el Rules Manual 2024.",
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
      keywords:["Héroe","Infantería"],
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
      wargear:"Heavy armour, shield y hand weapon.",
      heroic:[
        {
          name:"Heroic March",
          desc:"Ver reglas principales de MESBG."
        }
      ],
      options:[],
      rules:[
        {
          name:"Shieldwall",
          desc:"Ver Reglas_Especiales_MESBG_2024."
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
      keywords:["Héroe","Caballería","Único"],
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
      wargear:"Armour, Riding Dagger y Warg.",
      heroic:[
        {
          name:"Heroic March",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Strike",
          desc:"Ver reglas principales de MESBG."
        }
      ],
      options:[],
      rules:[
        {
          name:"Riding Dagger",
          desc:"ACTIVA (equipo). Es un hand weapon. Siempre que un modelo enemigo haga un Strike contra Sharku (no contra su Warg) y falle el To Wound Roll, Sharku puede hacer inmediatamente un impacto de Strength 4 contra ese modelo."
        },
        {
          name:"Expert Rider",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Fury of the Pack",
          desc:"ACTIVA. Mientras tenga la palabra clave Cavalry, siempre que Sharku Cargue incrementa su Fight Value a 5 y sus Attacks a 3 hasta la End Phase del turno."
        }
      ]
    },
    {
      id:"isengard_orc_captain",
      name:"Isengard Orc Captain",
      cost:45,
      tier:"fortitude",
      race:"Orc",
      keywords:["Héroe","Infantería"],
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
      wargear:"Armour, shield y hand weapon.",
      heroic:[
        {
          name:"Heroic March",
          desc:"Ver reglas principales de MESBG."
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
      race:"Hombre",
      keywords:["Héroe","Infantería","Único"],
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
          desc:"Ver reglas principales de MESBG."
        }
      ],
      options:[],
      rules:[
        {
          name:"Fearless",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Hatred (Rohan)",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Bloodoath",
          desc:"PASIVA. Los modelos Dunland amigos dentro de 6\" del Oathmaker cuentan como si tuvieran la regla especial Fearless."
        },
        {
          name:"\"We will die for Saruman\"",
          desc:"PASIVA. Mientras Saruman esté vivo y en el campo de batalla, el Oathmaker y los modelos Dunland amigos deben repetir los To Wound Rolls de 1 natural al hacer Strikes."
        }
      ]
    },
    {
      id:"wild_man_chieftain",
      name:"Wild Man Chieftain",
      cost:40,
      tier:"fortitude",
      race:"Hombre",
      keywords:["Héroe","Infantería"],
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
          desc:"Ver reglas principales de MESBG."
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
          desc:"Ver Reglas_Especiales_MESBG_2024."
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
      keywords:["Guerrero","Infantería"],
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
      wargear:"Armour y hand weapon.",
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
      keywords:["Guerrero","Infantería"],
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
      wargear:"Berserker Blade y light armour.",
      options:[],
      rules:[
        {
          name:"Berserker Blade",
          desc:"ACTIVA (equipo). Es un arma hand-and-a-half. Si un Uruk-hai Berserker gana un Combate usándola a dos manos, puede hacer un Strike contra cada modelo enemigo con el que estuviera Engaged."
        },
        {
          name:"Oblivious to Pain",
          desc:"PASIVA. Siempre que sufra una Herida, tira 1D6. Con un 6 natural, se ignora."
        }
      ]
    },
    {
      id:"uruk_hai_warrior",
      name:"Uruk-hai Warrior",
      cost:9,
      race:"Uruk-hai",
      keywords:["Guerrero","Infantería"],
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
      wargear:"Heavy armour y hand weapon.",
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
          desc:"Ver Reglas_Especiales_MESBG_2024."
        }
      ]
    },
    {
      id:"isengard_warg_rider",
      name:"Isengard Warg Rider",
      cost:11,
      race:"Orc",
      keywords:["Guerrero","Caballería"],
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
      wargear:"Armour, hand weapon y Warg.",
      options:[
        {
          id:"escudolanzas",
          name:"Shield y throwing spears",
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
      keywords:["Guerrero","Infantería","Bestia"],
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
      keywords:["Guerrero","Infantería"],
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
      wargear:"Armour y hand weapon.",
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
          name:"Orc Bow",
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
      race:"Ave",
      keywords:["Guerrero","Infantería","Bestia","Enjambre"],
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
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Keen Sight",
          desc:"PASIVA. Los modelos enemigos dentro de 12\" de este modelo no obtienen ningún beneficio de la regla especial Stalk Unseen."
        },
        {
          name:"Cloud of Birds",
          desc:"PASIVA. Los ataques de disparo que apunten a un Crebain solo impactarán con un 6 natural."
        }
      ],
      flavor:"Hay toda clase de criaturas bajo la influencia de Saruman usadas como espías por el Mago Blanco para descubrir la posición de sus enemigos."
    },
    {
      id:"wild_man_of_dunland",
      name:"Wild Man of Dunland",
      cost:5,
      race:"Hombre",
      keywords:["Guerrero","Infantería"],
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
          name:"Light shield y Flaming Brand",
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
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Flaming Brand",
          desc:"PASIVA (equipo). Un modelo con Flaming Brand tiene Terror (Cavalry) y Terror (Beast). Además cuenta como 2 modelos en lugar de 1 al calcular cuántos hay dentro del alcance de un Objective Marker."
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
      race:"Hombre",
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Heavy armour, the Ring of Barahir y Andúril, Flame of the West.",
      heroic:[
        {
          name:"Heroic Challenge",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Defence",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic March",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Resolve",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Strength",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Strike",
          desc:"Ver reglas principales de MESBG."
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
          desc:"PASIVA (equipo, Único). Siempre que Aragorn sea afectado por un Poder Mágico, después de hacer cualquier Resist Test (si puede), puede tirar 1D6; con un 6 natural, no es afectado por ese Poder Mágico."
        },
        {
          name:"Andúril, Flame of the West",
          desc:"ACTIVA (equipo, Único). Arma élfica hand-and-a-half. Siempre que Aragorn haga Strikes con Andúril, nunca necesita más de un 4+ al tirar To Wound (3+ si la usa a dos manos)."
        },
        {
          name:"Horse Lord",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Mighty Hero",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Resistant to Magic",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"\"Stand, Men of the West\"",
          desc:"PASIVA. Los modelos amigos tratan a Aragorn como un estandarte (banner) con un alcance de 6\"."
        }
      ]
    },
    {
      id:"denethor",
      name:"Denethor, Steward of Gondor",
      cost:50,
      tier:"valour",
      unique:true,
      race:"Hombre",
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Heavy armour y hand weapon.",
      heroic:[
        {
          name:"Heroic Defence",
          desc:"Ver reglas principales de MESBG."
        }
      ],
      options:[],
      rules:[
        {
          name:"Leader (Citadel Guard)",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Leader (Guard of the Fountain Court)",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Broken Mind",
          desc:"ACTIVA. Durante cada Priority Phase, tras determinar la Prioridad, Denethor debe hacer un Intelligence Test. Si lo falla, ese turno es controlado por el jugador contrario (sigue contando como modelo amigo, sin poder ser objetivo de disparo ni Poderes Mágicos dañinos, y su rival no puede gastar su Might/Will/Fate). Si Boromir está vivo en el mismo ejército, Denethor pasa el test automáticamente; si Boromir cae, falla automáticamente el siguiente."
        }
      ]
    },
    {
      id:"boromir",
      name:"Boromir, Captain of the White Tower",
      cost:160,
      tier:"valour",
      unique:true,
      race:"Hombre",
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Heavy armour, hand weapon y Horn of Gondor.",
      heroic:[
        {
          name:"Heroic Challenge",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Strength",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Strike",
          desc:"Ver reglas principales de MESBG."
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
          desc:"ACTIVA (equipo, Único). Al inicio de un Combate en el que participe Boromir, si está superado en número, puede hacer sonar el cuerno: un modelo enemigo implicado (elegido por su jugador) debe hacer un Courage Test; si lo falla, no se hace Duel Roll y Boromir gana el Combate automáticamente."
        },
        {
          name:"Banner of Minas Tirith",
          desc:"PASIVA (equipo, Único, alcance 6\"). Boromir no sufre la penalización de -1 al Duel Roll por portar estandarte. Si un Gondor Warrior amigo dentro del alcance empata un Drawn Combat al Fight Value más alto de ambos bandos, gana el Gondor Warrior."
        },
        {
          name:"Leader (Citadel Guard)",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Son of Gondor",
          desc:"ACTIVA. En un turno en el que Cargue, Boromir gana +1 To Wound al hacer Strikes."
        }
      ],
      tierNota:"// TODO: el libro no imprime el Heroic Tier en la ficha (verificado a mano, en alta resolucion, sobre las 32 fichas de heroe de ambos capitulos). Este valor se tomo de mesbg-list-builder-v2024 (github.com/mhollink), que si lo trae. Para este heroe el dato varia segun la Legendary Legion consultada -- se uso el valor de la lista mas generica/base. Confirmalo contra tu propio libro si podes. Valores vistos: Valour (15) en la legión Minas Tirith (la más genérica); Legend (18) en Reclamation of Osgiliath."
    },
    {
      id:"faramir",
      name:"Faramir, Captain of Gondor",
      cost:100,
      tier:"valour",
      unique:true,
      race:"Hombre",
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Armour, hand weapon y bow.",
      heroic:[
        {
          name:"Heroic Accuracy",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Defence",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Resolve",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Strike",
          desc:"Ver reglas principales de MESBG."
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
          name:"Cambiar armour y bow por heavy armour",
          cost:0
        }
      ],
      rules:[
        {
          name:"Leader (Citadel Guard)",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Resistant to Magic",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Sharpshooter",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Woodland Creature",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"\"A Chance for Faramir, Captain of Gondor to show his Quality\"",
          desc:"ACTIVA. Si el ejército de Faramir está Broken, puede repetir cualquier To Wound Roll fallado al hacer Strikes, y declarar un Heroic Resolve gratis cada turno."
        },
        {
          name:"Wizard's Pupil",
          desc:"PASIVA. Si ganas la tirada de Prioridad y se la das a tu rival, hasta el final del turno Faramir y los Warrior amigos dentro de 3\" ganan Dominant (2)."
        }
      ]
    },
    {
      id:"gandalf",
      name:"Gandalf the White",
      cost:200,
      tier:"legend",
      unique:true,
      race:"Mago",
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Glamdring, Narya y Staff of Power. Incluido en el capítulo de Gondor: los modelos Gondor Warrior solo pueden incluirse en la Warband de un Héroe de Gondor o de Gandalf.",
      heroic:[
        {
          name:"Heroic Channelling",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Defence",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Resolve",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Strike",
          desc:"Ver reglas principales de MESBG."
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
          name:"Pippin (solo si Gandalf monta Shadowfax)",
          cost:25
        }
      ],
      rules:[
        {
          name:"Glamdring",
          desc:"ACTIVA (equipo, Único). Arma élfica hand-and-a-half. +1 a la Strength al hacer Strikes con Glamdring."
        },
        {
          name:"Narya",
          desc:"PASIVA (equipo, Único). Gandalf puede repetir cualquier tirada de Fate fallada."
        },
        {
          name:"Pippin",
          desc:"PASIVA. Si Gandalf monta Shadowfax con Pippin, Pippin usa el perfil de Peregrin Took y cuenta como Independent Hero; no ocupa espacio en la Warband. Mientras esté montado, Gandalf gana Resistant to Magic, repite los To Wound Rolls de 1 natural, y puede gastar el Might/Will/Fate de Pippin como si fueran suyos."
        },
        {
          name:"Poderes Mágicos",
          desc:"Omitidos en esta carga (Blinding Light, Terrifying Aura, Transfix, Foil Magic, Fortify Spirit, Strengthen Will, Banishment, Sorcerous Blast, Your Staff is Broken). Ver Armies of The Lord of the Rings, pág. 53."
        }
      ],
      tierNota:"// TODO: el libro no imprime el Heroic Tier en la ficha (verificado a mano, en alta resolucion, sobre las 32 fichas de heroe de ambos capitulos). Este valor se tomo de mesbg-list-builder-v2024 (github.com/mhollink), que si lo trae. Para este heroe el dato varia segun la Legendary Legion consultada -- se uso el valor de la lista mas generica/base. Confirmalo contra tu propio libro si podes. Valores vistos: Legend (18) en Atop the Walls y Defenders of the Pelennor; Valour (15) en Men of the West y Riders of Éomer. Empate 2 a 2 entre legiones; se eligió Legend por ser su coste (200 pts) el más alto entre todos los héroes de esta carga salvo Aragorn."
    },
    {
      id:"peregrin",
      name:"Peregrin Took, Guard of the Citadel",
      cost:25,
      tier:"independent",
      unique:true,
      race:"Hobbit",
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Armour y hand weapon.",
      heroic:[
        {
          name:"Heroic Defence",
          desc:"Ver reglas principales de MESBG."
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
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Throw Stones",
          desc:"Alcance 8\", Strength 1. Ver Reglas_Especiales_MESBG_2024."
        }
      ]
    },
    {
      id:"irolas",
      name:"Irolas, Captain of the Guard",
      cost:65,
      tier:"fortitude",
      unique:true,
      race:"Hombre",
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Heavy armour y hand weapon.",
      heroic:[
        {
          name:"Heroic Defence",
          desc:"Ver reglas principales de MESBG."
        }
      ],
      options:[],
      rules:[
        {
          name:"Leader (Citadel Guard)",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Sworn Protector (Denethor)",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Defend the White City",
          desc:"ACTIVA. Irolas puede usar Shielding aunque no lleve escudo. Si hace shield y gana el Combate resultante, puede hacer un Strike contra un modelo enemigo implicado."
        },
        {
          name:"Captain of the Citadel Guard",
          desc:"PASIVA. Los Citadel Guard amigos dentro de 3\" de Irolas ganan +1 To Wound al hacer Strikes."
        }
      ]
    },
    {
      id:"madril",
      name:"Madril, Captain of Ithilien",
      cost:60,
      tier:"fortitude",
      unique:true,
      race:"Hombre",
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Armour, hand weapon y bow.",
      heroic:[
        {
          name:"Heroic Accuracy",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic March",
          desc:"Ver reglas principales de MESBG."
        }
      ],
      options:[],
      rules:[
        {
          name:"Woodland Creature",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Master of Reserves",
          desc:"PASIVA. En Escenarios donde se tira para la llegada o el despliegue de Warbands, puedes modificar la tirada de la Warband de Madril en +1 o -1 aunque no esté en el campo de batalla; si está, también puedes modificar la de otras Warbands de tu ejército."
        }
      ]
    },
    {
      id:"damrod",
      name:"Damrod, Ranger of Ithilien",
      cost:40,
      tier:"fortitude",
      unique:true,
      race:"Hombre",
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Armour, hand weapon y bow.",
      heroic:[
        {
          name:"Heroic Accuracy",
          desc:"Ver reglas principales de MESBG."
        }
      ],
      options:[],
      rules:[
        {
          name:"Woodland Creature",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Well-aimed Shot",
          desc:"ACTIVA. Al hacer un ataque de disparo, la primera vez que Damrod falle un In The Way Roll puede hacer un Intelligence Test; si lo pasa, el In The Way Roll se considera exitoso."
        }
      ]
    },
    {
      id:"captain_of_minas_tirith",
      name:"Captain of Minas Tirith",
      cost:60,
      tier:"fortitude",
      race:"Hombre",
      keywords:["Héroe","Infantería"],
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
      wargear:"Heavy armour, hand weapon y shield.",
      heroic:[
        {
          name:"Heroic March",
          desc:"Ver reglas principales de MESBG."
        }
      ],
      options:[],
      rules:[
        {
          name:"Shieldwall",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        }
      ]
    }
  ],
  warriors:[
    {
      id:"ranger_of_gondor",
      name:"Ranger of Gondor",
      cost:8,
      race:"Hombre",
      keywords:["Guerrero","Infantería"],
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
      wargear:"Armour, hand weapon y bow.",
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
          desc:"Ver Reglas_Especiales_MESBG_2024."
        }
      ]
    },
    {
      id:"osgiliath_veteran",
      name:"Osgiliath Veteran",
      cost:9,
      race:"Hombre",
      keywords:["Guerrero","Infantería"],
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
      wargear:"Heavy armour y hand weapon.",
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
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Loyal to the Captains",
          desc:"ACTIVA. Mientras esté dentro de 6\" de Boromir o Faramir, puede repetir los To Wound Rolls de 1 natural al hacer Strikes."
        }
      ]
    },
    {
      id:"warrior_of_minas_tirith",
      name:"Warrior of Minas Tirith",
      cost:8,
      race:"Hombre",
      keywords:["Guerrero","Infantería"],
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
      wargear:"Heavy armour y hand weapon.",
      options:[
        {
          id:"cuernoescudo",
          name:"War horn y shield",
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
          name:"Shield y spear",
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
          desc:"Ver Reglas_Especiales_MESBG_2024."
        }
      ]
    },
    {
      id:"knight_of_minas_tirith",
      name:"Knight of Minas Tirith",
      cost:15,
      race:"Hombre",
      keywords:["Guerrero","Caballería"],
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
      wargear:"Heavy armour, hand weapon, shield, lance y horse.",
      options:[
        {
          id:"estandarte",
          name:"Cambiar shield y lance por banner",
          cost:25,
          banner:true,
          maxPerWarband:1
        }
      ],
      rules:[
        {
          name:"Shieldwall",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        }
      ]
    },
    {
      id:"citadel_guard",
      name:"Citadel Guard",
      cost:8,
      race:"Hombre",
      keywords:["Guerrero","Infantería","Élite"],
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
      wargear:"Heavy armour y hand weapon.",
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
          desc:"Ver Reglas_Especiales_MESBG_2024."
        }
      ]
    },
    {
      id:"guard_of_the_fountain_court",
      name:"Guard of the Fountain Court",
      cost:10,
      race:"Hombre",
      keywords:["Guerrero","Infantería","Élite"],
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
      wargear:"Heavy armour, hand weapon y spear.",
      options:[],
      rules:[
        {
          name:"Bodyguard",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Protectors of the White Tree",
          desc:"PASIVA. Si está dentro de 6\" de un General Gondor amigo, se le trata como si tuviera Dominant (2)."
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
      race:"Hombre",
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Heavy armour y Narsil.",
      heroic:[
        {
          name:"Heroic Challenge",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Strength",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Strike",
          desc:"Ver reglas principales de MESBG."
        }
      ],
      options:[],
      rules:[
        {
          name:"Narsil",
          desc:"ACTIVA (equipo, Único). Arma a dos manos Master-forged. Un modelo que empuñe Narsil puede declarar un Heroic Combat gratis cada Fight Phase."
        },
        {
          name:"Resistant to Magic",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"High King of Gondor and Arnor",
          desc:"ACTIVA. El alcance del Stand Fast de Elendil es de 12\" en lugar de 6\"."
        }
      ]
    },
    {
      id:"isildur",
      name:"Isildur, Prince of Númenor",
      cost:130,
      tier:"valour",
      unique:true,
      race:"Hombre",
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Heavy armour y hand-and-a-half weapon.",
      heroic:[
        {
          name:"Heroic Challenge",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Strength",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Strike",
          desc:"Ver reglas principales de MESBG."
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
          name:"The One Ring (solo si tu ejército no incluye a Elendil ni a Gil-galad)",
          cost:0
        }
      ],
      rules:[
        {
          name:"Resistant to Magic",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"The Shards of Narsil",
          desc:"ACTIVA. Si tu ejército también contiene a Elendil, cuando caiga coloca un marcador de 25 mm donde murió; si Isildur termina su Activación dentro de 1\" de él, obtiene los Shards of Narsil (hand weapon Único, +1 To Wound al hacer Strikes) y retira el marcador."
        }
      ]
    },
    {
      id:"captain_of_numenor",
      name:"Captain of Númenor",
      cost:70,
      tier:"fortitude",
      race:"Hombre",
      keywords:["Héroe","Infantería"],
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
      wargear:"Armour, shield y hand weapon.",
      heroic:[
        {
          name:"Heroic March",
          desc:"Ver reglas principales de MESBG."
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
      race:"Hombre",
      keywords:["Guerrero","Infantería"],
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
      wargear:"Armour y hand weapon.",
      options:[
        {
          id:"escudolanza",
          name:"Shield y spear",
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
  name:"Ejército de los Muertos",
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
      race:"Espíritu",
      keywords:["Héroe","Infantería","Único"],
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
      wargear:"Armour y hand weapon.",
      heroic:[
        {
          name:"Heroic March",
          desc:"Ver reglas principales de MESBG."
        },
        {
          name:"Heroic Strike",
          desc:"Ver reglas principales de MESBG."
        }
      ],
      options:[],
      rules:[
        {
          name:"Blades of the Dead",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Spectral Walk",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Terror",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Drain Soul",
          desc:"ACTIVA. Un modelo que sufra una Herida del King of the Dead en Combate, y que no sea evitada, ve automáticamente sus Wounds reducidas a 0: es abatido y retirado como baja."
        },
        {
          name:"The Dead and the Living",
          desc:"PASIVA. Solo los modelos Dunharrow amigos pueden beneficiarse del Stand Fast del King of the Dead o de sus Acciones Heroicas."
        }
      ]
    },
    {
      id:"herald_of_the_dead",
      name:"Herald of the Dead",
      cost:70,
      tier:"fortitude",
      race:"Espíritu",
      keywords:["Héroe","Infantería"],
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
      wargear:"Armour, shield, hand weapon y Pennant of the Dead.",
      heroic:[],
      options:[],
      rules:[
        {
          name:"Blades of the Dead",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Spectral Walk",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Terror",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Pennant of the Dead",
          desc:"PASIVA (equipo). Los modelos Dunharrow amigos dentro de 3\" de un modelo con Pennant of the Dead cuentan como si tuvieran Resistant to Magic."
        },
        {
          name:"The King's Counsel",
          desc:"PASIVA. Mientras el King of the Dead esté dentro de 3\", puede gastar los Will Points de este modelo para declarar una Acción Heroica en lugar de uno de sus propios Might Points."
        }
      ]
    }
  ],
  warriors:[
    {
      id:"warrior_of_the_dead",
      name:"Warrior of the Dead",
      cost:14,
      race:"Espíritu",
      keywords:["Guerrero","Infantería"],
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
      wargear:"Armour y hand weapon.",
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
          name:"Shield y spear",
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
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Spectral Walk",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Terror",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        }
      ]
    },
    {
      id:"rider_of_the_dead",
      name:"Rider of the Dead",
      cost:25,
      race:"Espíritu",
      keywords:["Guerrero","Caballería"],
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
      wargear:"Armour, shield, hand weapon y Spectral Steed.",
      options:[],
      rules:[
        {
          name:"Blades of the Dead",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Spectral Walk",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        },
        {
          name:"Terror",
          desc:"Ver Reglas_Especiales_MESBG_2024."
        }
      ]
    }
  ]
};
