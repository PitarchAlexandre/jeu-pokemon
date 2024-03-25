/**
 * Jeu Pokémon
 * @author  Alexandre Pitarch
 * @version 2.1.2
 * @since   2024-03-11
 */

'use strict'; // Active le mode strict du JavaScript

const button = document.querySelectorAll('button');

//Pokémon de l'utilisateur
let pokemon1 = document.getElementById('pokemon1');
let pokemon2 = document.getElementById('pokemon2');
let pokemon3 = document.getElementById('pokemon3');

//Contient les images du Pokémons
const imgPokemon1 = document.getElementById('imgPokemon1');
const imgPokemon2 = document.getElementById('imgPokemon2');
const imgPokemon3 = document.getElementById('imgPokemon3');

//Attaques du Pokémon
let btn1AttaquePok1 = document.getElementById('attaque1');
let btn2AttaquePok1 = document.getElementById('attaque2');
let btn1AttaquePok2 = document.getElementById('attaque3');
let btn2AttaquePok2 = document.getElementById('attaque4');
let btn1AttaquePok3 = document.getElementById('attaque5');
let btn2AttaquePok3 = document.getElementById('attaque6');

//Stocke le pokemon que le bot choisi d'attaquer
let pokemonJoueurCible;
let pokemonAdverse;
let pvPokAdverseActuel;
//Permet de stocker la puissance des dégats du pokémon adverse
let puissanceAttAdversaire;
//Nombre de dégats que le pokémon IA inflige au pokemon du joueur
let degatRecuPokUtilisateur;

let degatsSubis = document.getElementById('degatsSubis');

//Points de vies des pokémon
let pvPokemon1 = document.getElementById('pvPokemon1');
let pvPokemon2 = document.getElementById('pvPokemon2');
let pvPokemon3 = document.getElementById('pvPokemon3');
//Points de vie du pokémon adverse en combat
let pvAdversaire = document.getElementById('pvAvdersaire')

//Les variables qui contiennent les nom et attaque du pokemon (lors d'une attaque)
let nomPokemonAtt = document.getElementById('nomPokemonAtt');
let nomAdvPokemonAtt = document.getElementById('nomAdvPokemonAtt');
let nomAttaque = document.getElementById('nomAttaque');
let nomPokemonAdv = document.getElementById('nomPokemonAdv');

const imgPokemonAdversaire = document.getElementById('imgPokemonAdversaire');

//Contitent les pokémons que l'utilisateur possède dans son jeu
let tabPokemonUtilisateur;
//Niveau du joueur
let niveauJoueur = document.getElementById('niveauJoueur');
let compteurNiveauJoueur = 1;

//Nombre vie du joueur
const nbrVie = document.getElementById('nbrVie');
let tabVie = ['♡'];

///////////////////////////////////
/// POP UP  /  POP UP /  POP UP ///
///////////////////////////////////
const overlay = document.getElementById('overlay');
const btnPokemonClassique = document.getElementById('btnPokemonClassique');
const btnPokemonAleatoire = document.getElementById('btnPokemonAleatoire');

//Permet à l'utilisateur de commencer avec Bulbizzare, Salamèche et Carapuce
btnPokemonClassique.addEventListener('click', () => {
    //Affiche les Pokémons et la vie des Pokémons de l'utilisiateur
    tabPokemonUtilisateur = modePokemonClassique();
    overlay.style.display = 'none';
})
btnPokemonAleatoire.addEventListener('click', () => {
    //Affiche les Pokémons et la vie des de l'utilisateur
    tabPokemonUtilisateur = modePokemonAleatoire();
    overlay.style.display = 'none';
})

///////////////////////////////////
//LE TABLEAU CONTENANT LES OBJETS//
///////////////////////////////////

//Tableau contenant tous les pokémons du jeu
let tabPokemon = [
    { pokemon: 'Bulbizarre',
        attaque: ['Vive-Attaque', 'Tranch\'Herbe'],
        puissanceAttaque: [25, 35],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        viePokemon: 100,
        categorieNiveau:1
    },
    { pokemon: 'Salamèche',
        attaque: ['Flammèche', 'Griffe'],
        puissanceAttaque: [30, 25],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
        viePokemon: 95,
        categorieNiveau:1
    },
    { pokemon: 'Carapuce',
        attaque: ['Pistolet à O', 'Charge'],
        puissanceAttaque: [20, 30],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
        viePokemon: 110,
        categorieNiveau:1
    },
    { pokemon: 'Racaillou',
        attaque: ['Jet de pierre!', 'Charge'],
        puissanceAttaque: [20, 30],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/074.png',
        viePokemon: 120,
        categorieNiveau:1
    },
    { pokemon: 'Krabby',
        attaque: ['Pince-Masse!', 'Martobois'],
        puissanceAttaque: [15, 25],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/099.png',
        viePokemon: 1,
        categorieNiveau:1
    },
    { pokemon: 'Herbizarre',
        attaque: ['Tranch\'Herbe!','Fouet Lianes'],
        puissanceAttaque: [15, 35],
        imgPokemon: "https://preview.redd.it/pokemon-of-the-day-ivysaur-v0-4pinv95tbnlb1.png?width=475&format=png&" +
            "auto=webp&s=940399261f3648bf9339ae31ebb5abd53f6d933b",
        viePokemon: 1,
        categorieNiveau:2
    },
    { pokemon: 'Tropius',
        attaque: ['Tempête Verte!', 'Dracogriffe'],
        puissanceAttaque: [30, 40],
        imgPokemon: 'https://www.pokepedia.fr/images/thumb/2/2e/Tropius-RS.png/250px-Tropius-RS.png',
        viePokemon: 150,
        categorieNiveau: 4
    },
    { pokemon: 'Pikachu',
        attaque: ['Éclair', 'Queue de Fer'],
        puissanceAttaque: [35, 25],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        viePokemon: 85,
        categorieNiveau:2
    },
    { pokemon: 'Mewtwo',
        attaque: ['Psycho', 'Lance-Soleil'],
        puissanceAttaque: [40, 30],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png',
        viePokemon: 180,
        categorieNiveau:4
    },
    { pokemon: 'Dracaufeu',
        attaque: ['Lance-Flammes', 'Griffe'],
        puissanceAttaque: [45, 25],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
        viePokemon: 160,
        categorieNiveau:3
    }
];

/////////////////////
//LE JEU DEBUTE ICI//
/////////////////////

//Affiche la vie du joueur
vieJoueur();
//Génère un tableau de 3 pokémons enemis
let pokemonNiveau = popNiveau1();
//Montre le pokémon adverse à l'utilisateur
pokemonAdverse = affichagePokAdverse(pokemonNiveau);

//L'utilisateur choisi un pokémon et une attaque
//////////////////////////////////
//LES CLIQUES / ADDEVENTLISTENER//
//////////////////////////////////
//L'utilisateur choisi un pokémon et une attaque

btn1AttaquePok1.addEventListener('click', function () {
    //Affiche le nom du pokémon dans le bouton 1
    nomPokemonAtt.innerText = tabPokemonUtilisateur[0].pokemon;
    //Affiche le nom de l'attaque du pokémon joueur 1
    nomAttaque.innerText = pokemon1.attaque[0];
    //Fonction qui permet d'attaquer le pokémon adverse et déduire les pv du pokémon avec l'attaque sélectionnée
    attaquePoKBot(tabPokemon[0]);
    //Appelle une fonction qui renvoie le pokémon de l'utilisateur (sélectionné au hasard) qui sera attaqué par le bot
    pokemonJoueurCible = randomizerAttaqueBot(tabPokemonUtilisateur);
    //Fonction qui renvoie la puissance d'attaque du pokémon Adverse et affiche le nom, l'attaque et la puissance
    //d'attaque du pokémon adverse
    puissanceAttAdversaire = choixAttaqueBot(pokemonAdverse);
    //Attaque le pokémon de l'utilisateur grace au pokémon sélectionné dans le randomsizer sélectionné auparavant
    tabPokemonUtilisateur[pokemonJoueurCible].viePokemon -= puissanceAttAdversaire;
    //Mets à jour l'affichage des points de vie du Pokémon de l'utilisateur qui été attaqué
    misAjourPvPokemonUtilisateur(pokemonJoueurCible);

    //Vérifie si le Pokémon de l'utilisateur a perdu tous ses PV
    if (tabPokemonUtilisateur[pokemonJoueurCible].viePokemon <= 0) {
        if (tabPokemonUtilisateur[pokemonJoueurCible].viePokemon <= 0) {
            tabPokemonUtilisateur[pokemonJoueurCible].viePokemon = 0
        }
        // Désactive les boutons d'attaque associés au Pokémon
        disableAttackButtons(pokemonJoueurCible);
    };
    verifierFinDuJeu(tabPokemonUtilisateur)
})
btn2AttaquePok1.addEventListener('click', function () {
    nomPokemonAtt.innerText = tabPokemonUtilisateur[1].pokemon;
    nomAttaque.innerText = pokemon1.attaque[1];
    attaquePoKBot(tabPokemon[0]);
    pokemonJoueurCible = randomizerAttaqueBot(tabPokemonUtilisateur);
    puissanceAttAdversaire = choixAttaqueBot(pokemonAdverse);
    tabPokemonUtilisateur[pokemonJoueurCible].viePokemon -= puissanceAttAdversaire;
    misAjourPvPokemonUtilisateur(pokemonJoueurCible);

    // Vérifie si le Pokémon de l'utilisateur a perdu tous ses PV
    if (tabPokemonUtilisateur[pokemonJoueurCible].viePokemon <= 0) {
        if (tabPokemonUtilisateur[pokemonJoueurCible].viePokemon <= 0) {
            tabPokemonUtilisateur[pokemonJoueurCible].viePokemon = 0
        }
        // Désactive les boutons d'attaque associés au Pokémon
        disableAttackButtons(pokemonJoueurCible);
    };
    verifierFinDuJeu(tabPokemonUtilisateur)
})

btn1AttaquePok2.addEventListener('click', function () {
    nomPokemonAtt.innerText = tabPokemonUtilisateur[1].pokemon;
    nomAttaque.innerText = pokemon2.attaque[0];
    attaquePoKBot(tabPokemon[1]);
    pokemonJoueurCible = randomizerAttaqueBot(tabPokemonUtilisateur);
    puissanceAttAdversaire = choixAttaqueBot(pokemonAdverse);
    tabPokemonUtilisateur[pokemonJoueurCible].viePokemon -= puissanceAttAdversaire;
    misAjourPvPokemonUtilisateur(pokemonJoueurCible);

    // Vérifie si le Pokémon de l'utilisateur a perdu tous ses PV
    if (tabPokemonUtilisateur[pokemonJoueurCible].viePokemon <= 0) {
        if (tabPokemonUtilisateur[pokemonJoueurCible].viePokemon <= 0) {
            tabPokemonUtilisateur[pokemonJoueurCible].viePokemon = 0
        }
        // Désactive les boutons d'attaque associés au Pokémon
        disableAttackButtons(pokemonJoueurCible);
    };
    verifierFinDuJeu(tabPokemonUtilisateur)
})

btn2AttaquePok2.addEventListener('click', function () {
    nomPokemonAtt.innerText = tabPokemonUtilisateur[1].pokemon;
    nomAttaque.innerText = pokemon2.attaque[1];
    attaquePoKBot(tabPokemon[1]);
    pokemonJoueurCible = randomizerAttaqueBot(tabPokemonUtilisateur);
    puissanceAttAdversaire = choixAttaqueBot(pokemonAdverse);
    tabPokemonUtilisateur[pokemonJoueurCible].viePokemon -= puissanceAttAdversaire;
    misAjourPvPokemonUtilisateur(pokemonJoueurCible);

    // Vérifie si le Pokémon de l'utilisateur a perdu tous ses PV
    if (tabPokemonUtilisateur[pokemonJoueurCible].viePokemon <= 0) {
        if (tabPokemonUtilisateur[pokemonJoueurCible].viePokemon <= 0) {
            tabPokemonUtilisateur[pokemonJoueurCible].viePokemon = 0
        }
        // Désactive les boutons d'attaque associés au Pokémon
        disableAttackButtons(pokemonJoueurCible);
    };
    verifierFinDuJeu(tabPokemonUtilisateur)
})

btn1AttaquePok3.addEventListener('click', function () {
    nomPokemonAtt.innerText = tabPokemonUtilisateur[2].pokemon;
    nomAttaque.innerText = pokemon3.attaque[0];
    attaquePoKBot(tabPokemon[2]);
    pokemonJoueurCible = randomizerAttaqueBot(tabPokemonUtilisateur);
    puissanceAttAdversaire = choixAttaqueBot(pokemonAdverse);
    tabPokemonUtilisateur[pokemonJoueurCible].viePokemon -= puissanceAttAdversaire;
    misAjourPvPokemonUtilisateur(pokemonJoueurCible);

    // Vérifie si le Pokémon de l'utilisateur a perdu tous ses PV
    if (tabPokemonUtilisateur[pokemonJoueurCible].viePokemon <= 0) {
        if (tabPokemonUtilisateur[pokemonJoueurCible].viePokemon <= 0) {
            tabPokemonUtilisateur[pokemonJoueurCible].viePokemon = 0
        }
        // Désactive les boutons d'attaque associés au Pokémon
        disableAttackButtons(pokemonJoueurCible);
    };
    verifierFinDuJeu(tabPokemonUtilisateur)
})

btn2AttaquePok3.addEventListener('click', function () {
    nomPokemonAtt.innerText = tabPokemonUtilisateur[2].pokemon;
    nomAttaque.innerText = pokemon3.attaque[1];
    attaquePoKBot(tabPokemon[2]);
    pokemonJoueurCible = randomizerAttaqueBot(tabPokemonUtilisateur);
    puissanceAttAdversaire = choixAttaqueBot(pokemonAdverse);
    tabPokemonUtilisateur[pokemonJoueurCible].viePokemon -= puissanceAttAdversaire;
    misAjourPvPokemonUtilisateur(pokemonJoueurCible);

    // Vérifie si le Pokémon de l'utilisateur a perdu tous ses PV
    if (tabPokemonUtilisateur[pokemonJoueurCible].viePokemon <= 0) {
        if (tabPokemonUtilisateur[pokemonJoueurCible].viePokemon <= 0) {
            tabPokemonUtilisateur[pokemonJoueurCible].viePokemon = 0
        }
        // Désactive les boutons d'attaque associés au Pokémon
        disableAttackButtons(pokemonJoueurCible);
    };
    verifierFinDuJeu(tabPokemonUtilisateur)
})

/////////////////
//LES FONCTIONS//
/////////////////

//Function permettant d'afficher les 3 premiers pokémons de départ de l'utilisateur ainsi que leur PV et attaques
function    modePokemonClassique() {
    //sélectionne les pokémons de l'utilisateur
    pokemon1 = tabPokemon[0];
    pokemon2 = tabPokemon[1];
    pokemon3 = tabPokemon[2];

    //affiche les pokémons de l'utilisateurs (en image)
    imgPokemon1.src = pokemon1.imgPokemon;
    imgPokemon2.src = pokemon2.imgPokemon;
    imgPokemon3.src = pokemon3.imgPokemon;

    //Affiche les points de vie du pokémon
    pvPokemon1.innerText = pokemon1.viePokemon;
    pvPokemon2.innerText = pokemon2.viePokemon;
    pvPokemon3.innerText = pokemon3.viePokemon;

    //Affiche le nom des attaques dans les boutons
    btn1AttaquePok1.innerText = pokemon1.attaque[0];
    btn2AttaquePok1.innerText = pokemon1.attaque[1];
    btn1AttaquePok2.innerText = pokemon2.attaque[0];
    btn2AttaquePok2.innerText = pokemon2.attaque[1];
    btn1AttaquePok3.innerText = pokemon3.attaque[0];
    btn2AttaquePok3.innerText = pokemon3.attaque[1];

    return [pokemon1, pokemon2, pokemon3];
}

function modePokemonAleatoire() {
    //sélectionne les indices des pokémons de l'utilisateur aléatoirement
    let index1 = Math.floor(Math.random() * tabPokemon.length);
    let index2 = Math.floor(Math.random() * tabPokemon.length);
    let index3 = Math.floor(Math.random() * tabPokemon.length);

    // Assigne les Pokémon choisis aléatoirement aux variables pokemon1, pokemon2 et pokemon3
    pokemon1 = tabPokemon[index1];
    pokemon2 = tabPokemon[index2];
    pokemon3 = tabPokemon[index3];

    //affiche les pokémons de l'utilisateurs (en image)
    imgPokemon1.src = pokemon1.imgPokemon;
    imgPokemon2.src = pokemon2.imgPokemon;
    imgPokemon3.src = pokemon3.imgPokemon;

    //Affiche les points de vie du pokémon
    pvPokemon1.innerText = pokemon1.viePokemon;
    pvPokemon2.innerText = pokemon2.viePokemon;
    pvPokemon3.innerText = pokemon3.viePokemon;

    //Affiche le nom des attaques dans les boutons
    btn1AttaquePok1.innerText = pokemon1.attaque[0];
    btn2AttaquePok1.innerText = pokemon1.attaque[1];
    btn1AttaquePok2.innerText = pokemon2.attaque[0];
    btn2AttaquePok2.innerText = pokemon2.attaque[1];
    btn1AttaquePok3.innerText = pokemon3.attaque[0];
    btn2AttaquePok3.innerText = pokemon3.attaque[1];

    return [pokemon1, pokemon2, pokemon3];
}
//Permet de mettre à jour et d'afficher les vies du joueur grace à un tableau
function vieJoueur() {
    //Permet d'effacer la nombre de vie affiché
    nbrVie.innerText = '';
    //Remet à jour le nombre de vies du joueur
    for (let i = 0; i < tabVie.length; i++) {
        nbrVie.innerText += tabVie[i]; // Ajoute chaque cœur au texte affiché
    }
}
//Fonction qui envoie le nombre de pokémons qu'il y aura dans le niveau à la fonction qui permet de créer le tableau
//de pokémons ennemis.
function popNiveau1() {
    //variable contenant le nombre de pokémons dans le niveau
    let nbrPokemon = 3;
    let categoriePokemon = 1;
    let pokemonNiveau1 = generateurPokemonNiveau(nbrPokemon, categoriePokemon);
    console.log(pokemonNiveau1)
    return pokemonNiveau1;
}
//Fonction qui envoie le nombre de pokémons qu'il y aura dans le niveau à la fonction qui permet de créer le tableau
//de pokémons ennemis.
function popNiveau2() {
    //variable contenant le nombre de pokémons dans le niveau
    let nbrPokemon = 4;
    let categoriePokemon = 1;
    let pokemonNiveau2 = generateurPokemonNiveau(nbrPokemon, categoriePokemon);
    console.log(pokemonNiveau2)
    return pokemonNiveau2;
}
//Fonction qui envoie le nombre de pokémons qu'il y aura dans le niveau à la fonction qui permet de créer le tableau
//de pokémons ennemis.
function popNiveau3() {
    //variable contenant le nombre de pokémons dans le niveau
    let nbrPokemon = 4;
    let categoriePokemon = 2;
    let pokemonNiveau3 = generateurPokemonNiveau(nbrPokemon, categoriePokemon);

    return pokemonNiveau3;
}
//Fonction qui envoie le nombre de pokémons qu'il y aura dans le niveau à la fonction qui permet de créer le tableau
//de pokémons ennemis.
function popNiveau4() {
    //variable contenant le nombre de pokémons dans le niveau
    let nbrPokemon = 3;
    let categoriePokemon = 3;
    let pokemonNiveau4 = generateurPokemonNiveau(nbrPokemon, categoriePokemon);

    return pokemonNiveau3;
}
//Fonction qui envoie le nombre de pokémons qu'il y aura dans le niveau à la fonction qui permet de créer le tableau
//de pokémons ennemis.
function popNiveau5() {
    //variable contenant le nombre de pokémons dans le niveau
    let nbrPokemon = 2;
    let categoriePokemon = 4;
    let pokemonNiveau5 = generateurPokemonNiveau(nbrPokemon, categoriePokemon);

    return pokemonNiveau5;
}
// Fonction pour générer Pokémons aléatoires pour le niveau
function generateurPokemonNiveau(nombrePokemons, categorieNiveau) {
    let pokemons = [];
    // Parcours le tableau tabPokemon
    for (let i = 0; i < tabPokemon.length; i++) {
        // Vérifie si la catégorieNiveau du Pokémon correspond à celle spécifiée
        if (tabPokemon[i].categorieNiveau === categorieNiveau) {
            // Ajoute le Pokémon au tableau pokemons
            pokemons.push(tabPokemon[i]);
        }
    }
    // Sélectionne aléatoirement le nombre de Pokémons requis
    let pokemonsSelectionnes = [];
    for (let j = 0; j < nombrePokemons; j++) {
        // Sélectionne un index aléatoire dans le tableau des Pokémons de la catégorieNiveau spécifiée
        let randomIndex = Math.floor(Math.random() * pokemons.length);
        // Ajoute le Pokémon sélectionné aléatoirement au tableau des Pokémons sélectionnés
        pokemonsSelectionnes.push(pokemons[randomIndex]);
    }
    console.log(pokemonsSelectionnes);
    return pokemonsSelectionnes;
}
//Affiche le premier pokémon du niveau après la génération du niveau et du tableau des pokémons
function affichagePokAdverse(pokemonNiveau) {
    pokemonAdverse = pokemonNiveau[0];
    imgPokemonAdversaire.src = pokemonAdverse.imgPokemon;
    // Initialisation des points de vie actuels
    pvPokAdverseActuel = pokemonAdverse.viePokemon;
    pvAdversaire.innerText = pvPokAdverseActuel;

    return pokemonAdverse;
}
// Fonction qui déduit les PV du bot suite à une attaque de l'utilisateur
function attaquePoKBot(pokemon) {
    let degatContreBot = pokemon.puissanceAttaque[0];
    // Déduit les points de vie suite à l'attaque
    pvPokAdverseActuel -= degatContreBot;
    // Si les dégâts sont inférieurs à zéro, ils seront initialisés à zéro
    if (pvPokAdverseActuel < 0) {
        pvPokAdverseActuel = 0;
        // Supprime le Pokémon adverse si ses PV sont nuls
        if (pokemonNiveau.length > 0) {
            // Supprime le premier Pokémon adverse du tableau
            pokemonNiveau.shift();
            // Afficher le prochain Pokémon adverse s'il en reste
            if (pokemonNiveau.length > 0) {
                pokemonAdverse = affichagePokAdverse(pokemonNiveau);
            } else {
                // Si aucun Pokémon adverse n'est reste dans le tableau, afficher un message de victoire
                alert('Vous avez vaincu tous les Pokémon adverses !')
            }
            if (pokemonNiveau.length === 0) {
                //appel la fonction qui permet de charger le niveau supperieur
                niveauSuperieur();
            }
        }
    }
    // Met à jour l'affichage des PV après l'attaque
    pvAdversaire.innerText = pvPokAdverseActuel;
}

 //Fonction qui permet au bot de choisir un pokémon au hasard
function randomizerAttaqueBot(tabPokemonUtilisateur) {
    //Permet de controler que le Pokémon attaqué est toujours des points de vie
    //Autrement le pokémon IA pourrait attaquer des pokémons qui n'ont plus de pv
    do {
            pokemonJoueurCible = Math.floor(Math.random() * tabPokemonUtilisateur.length);
    }while(tabPokemonUtilisateur[pokemonJoueurCible].viePokemon <= 0)

    return pokemonJoueurCible;
}
//Fonction qui permet de choisir l'attaque que le bot va effectuer et affiche l'attaque ainsi que le nbr dégats
//Renvoie le nombre de dégats
function choixAttaqueBot(pokemonAdversaire){
    let indexAttaque;
    while (indexAttaque !== 0 && indexAttaque !== 1) {
        indexAttaque = Math.floor(Math.random() * pokemonAdversaire.puissanceAttaque.length);
    }

    //Affiche le nom, l'attaque et la puissance d'attaque du pokémon adverse
    nomPokemonAdv.innerText = pokemonAdversaire.pokemon;
    nomAttaqueAdv.innerText = pokemonAdversaire.attaque[indexAttaque];
    puissanceAttAdversaire = pokemonAdversaire.puissanceAttaque[indexAttaque];
    degatsSubis.innerText = puissanceAttAdversaire;
    puissanceAttAdversaire = parseInt(puissanceAttAdversaire);

    console.log(puissanceAttAdversaire);
    //retourne les points de puissance d'attaque à l'eventListener
    return puissanceAttAdversaire;
}
//Fonction qui permet de désactiver le pokémon et l'attaque lorsqu'il n'a plus de PV
function disableAttackButtons(pokemonIndex) {
    // Désactive les boutons d'attaque du Pokémon correspondant
    switch (pokemonIndex) {
        case 0:
            btn1AttaquePok1.disabled = true;
            btn2AttaquePok1.disabled = true;
            break;
        case 1:
            btn1AttaquePok2.disabled = true;
            btn2AttaquePok2.disabled = true;
            break;
        case 2:
            btn1AttaquePok3.disabled = true;
            btn2AttaquePok3.disabled = true;
            break;
        default:
            break;
    }
    if (btn1AttaquePok1 && btn1AttaquePok1.disabled && btn1AttaquePok2.disabled && btn2AttaquePok2.disabled &&
        btn1AttaquePok3 && btn2AttaquePok3.disabled) {
        alert('Vous avez perdu !')
    }
}
//Fonction qui permet de mettre l'affichage des pv utilisateur à jour
function misAjourPvPokemonUtilisateur(pokemonJoueurCible) {
    switch (pokemonJoueurCible) {
        case 0:
            pvPokemon1.innerText = tabPokemonUtilisateur[0].viePokemon;
            break;
        case 1:
            pvPokemon2.innerText = tabPokemonUtilisateur[1].viePokemon;
            break;
        case 2:
            pvPokemon3.innerText = tabPokemonUtilisateur[2].viePokemon;
            break;
        default:
            break;
    }
}
//fonction qui permet d'augmenter de niveau
function niveauSuperieur() {
    compteurNiveauJoueur++;

    // Appelez la fonction de génération de niveau en fonction du niveau actuel
    switch (compteurNiveauJoueur) {
        case 2:
            //Chargement du niveau 2
            let pokemonNiveau2 = popNiveau2();
            // Montre le premier pokémon du niveau 2 à l'utilisateur
            pokemonAdverse = affichagePokAdverse(pokemonNiveau2);
            alert('Félicitations, vous allez au niveau 2!');
            break;
        case 3:
            //Niveau 3
            let pokemonNiveau3 = popNiveau3();
            // Montre le premier pokémon du niveau 2 à l'utilisateur
            pokemonAdverse = affichagePokAdverse(pokemonNiveau3);
            alert('Félicitations, vous allez au niveau 3!');
            break;
        case 4:
            let pokemonNiveau4 = popNiveau4();
            // Montre le premier pokémon du niveau 2 à l'utilisateur
            pokemonAdverse = affichagePokAdverse(pokemonNiveau4);
            alert('Félicitations, vous allez au niveau 4!');
            break;
         case 5:
             let pokemonNiveau5 = popNiveau5();
             // Montre le premier pokémon du niveau 2 à l'utilisateur
             pokemonAdverse = affichagePokAdverse(pokemonNiveau5);
             alert('Félicitations, vous allez au niveau 5!');
             break;
        default:
            // Si tous les niveaux sont passés un message de victoire s'affiche
            alert('Félicitations, vous avez terminé tous les niveaux !');
            break;
    }
}
// 1. Vérification des Pokémon morts
function verifierFinDuJeu(tabPokemonUtilisateur) {
    if (tousLesPokemonsMorts(tabPokemonUtilisateur)) {
        secondeChance(tabPokemonUtilisateur);
        // Réinitialiser le crédit de l'utilisateur ici si nécessaire
    }
}

// 2. Seconde chance
function secondeChance(tabPokemonUtilisateur) {
    // Régénérez deux nouveaux Pokémon pour l'utilisateur
    tabPokemonUtilisateur = modePokemonAleatoire();

    // Réinitialisez les vies disponibles
    tabVie.shift();
    vieJoueur();

    // Mettre à jour l'affichage des points de vie des nouveaux Pokémon
    mettreAJourAffichagePV(tabPokemonUtilisateur);

    // Réactiver les boutons d'attaque pour les nouveaux Pokémon
    reactiverBoutonsAttaque();

}

// Fonction pour réactiver les boutons d'attaque
function reactiverBoutonsAttaque() {
    btn1AttaquePok1.disabled = false;
    btn2AttaquePok1.disabled = false;
    btn1AttaquePok2.disabled = false;
    btn2AttaquePok2.disabled = false;
    btn1AttaquePok3.disabled = false;
    btn2AttaquePok3.disabled = false;
}

// Fonction pour mettre à jour l'affichage des points de vie
function mettreAJourAffichagePV(tabPokemonUtilisateur) {
    pvPokemon1.innerText = tabPokemonUtilisateur[0].viePokemon;
    pvPokemon2.innerText = tabPokemonUtilisateur[1].viePokemon;
}

// Appel de la fonction verifierFinDuJeu lorsque nécessaire
verifierFinDuJeu(tabPokemonUtilisateur);

function tousLesPokemonsMorts(tabPokemonUtilisateur) {
    for (let i = 0; i < tabPokemonUtilisateur.length; i++) {
        if (tabPokemonUtilisateur[i].viePokemon > 0) {
            return false; // Au moins un Pokémon est en vie
        }
    }
    return true; // Tous les Pokémon sont morts
}
