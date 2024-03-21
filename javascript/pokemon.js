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

//Variable qui contient le pokémon avec lequel l'utilisateur souhaite attaquer
let pokemonJoueur = '';
//Attaques du Pokémon
let btn1AttaquePok1 = document.getElementById('attaque1');
let btn2AttaquePok1 = document.getElementById('attaque2');
let btn1AttaquePok2 = document.getElementById('attaque3');
let btn2AttaquePok2 = document.getElementById('attaque4');
let btn1AttaquePok3 = document.getElementById('attaque5');
let btn2AttaquePok3 = document.getElementById('attaque6');


//Points de vies des pokémon
let pvPokemon1 = document.getElementById('pvPokemon1');
let pvPokemon2 = document.getElementById('pvPokemon2');
let pvPokemon3 = document.getElementById('pvPokemon3');

const attaqueOrdi = document.getElementById('attaqueOrdi');
const imgPokemonAdversaire = document.getElementById('imgPokemonAdversaire');
let jeuOrdi;
let attaquePokemonOrdi;

//Le score et les manches
const resultatManche = document.getElementById('resultatManche');
let compteurJoueur = 0;
let compteurIa = 0;
const scoreJoueur = document.getElementById('scoreJoueur');
const scoreBot = document.getElementById('scoreBot');

//Niveau du joueur
let niveauJoueur = document.getElementById('niveauJoueur');
let compteurNiveauJoueur = 1;

//Nombre vie du joueur
const nbrVie = document.getElementById('nbrVie');
let tabVie = ['♡'];

///////////////////////////////////
//LE TABLEAU CONTENANT LES OBJETS//
///////////////////////////////////

//Tableau contenant tous les pokémons du jeu
let tabPokemon = [
    { pokemon: 'Racaillou',
        attaque: ['Jet de pierre!', 'Charge'],
        puissanceAttaque: [20, 30],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/074.png',
        viePokemon: 120,
    },
    { pokemon: 'Herbizarre',
        attaque: ['Tranch\'Herbe!','Fouet Lianes'],
        puissanceAttaque: [15, 35],
        imgPokemon: "https://preview.redd.it/pokemon-of-the-day-ivysaur-v0-4pinv95tbnlb1.png?width=475&format=png&" +
            "auto=webp&s=940399261f3648bf9339ae31ebb5abd53f6d933b",
        viePokemon: 90
    },
    { pokemon: 'Krabby',
        attaque: ['Pince-Masse!'],
        puissanceAttaque: [15, 25],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/099.png',
        viePokemon: 110
    },
    { pokemon: 'Tropius',
        attaque: 'Tempête Verte!',
        puissanceAttaque: [30, 40],
        imgPokemon: 'https://www.pokepedia.fr/images/thumb/2/2e/Tropius-RS.png/250px-Tropius-RS.png',
        viePokemon: 150
    },
    // Ajout de 6 nouveaux pokémons de la première génération
    { pokemon: 'Bulbizarre',
        attaque: ['Vive-Attaque', 'Tranch\'Herbe'],
        puissanceAttaque: [25, 35],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        viePokemon: 100
    },
    { pokemon: 'Salamèche',
        attaque: ['Flammèche', 'Griffe'],
        puissanceAttaque: [30, 25],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
        viePokemon: 95
    },
    { pokemon: 'Carapuce',
        attaque: ['Pistolet à O', 'Charge'],
        puissanceAttaque: [20, 30],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
        viePokemon: 110
    },
    { pokemon: 'Pikachu',
        attaque: ['Éclair', 'Queue de Fer'],
        puissanceAttaque: [35, 25],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        viePokemon: 85
    },
    { pokemon: 'Mewtwo',
        attaque: ['Psycho', 'Lance-Soleil'],
        puissanceAttaque: [40, 30],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png',
        viePokemon: 180
    },
    { pokemon: 'Dracaufeu',
        attaque: ['Lance-Flammes', 'Griffe'],
        puissanceAttaque: [45, 25],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
        viePokemon: 160
    }
];

/////////////////////
//LE JEU DEBUTE ICI//
/////////////////////

//Affiche les Pokémons et la vie des Pokémons de l'utilisiateur
pokemonStartUtilisateur()
//Affiche la vie du joueur
vieJoueur();
//Génère un tableau de 3 pokémons enemis
let pokemonNiveau1 = popNiveau1();
//Montre le pokémon adverse à l'utilisateur
affichagePokAdverse(pokemonNiveau1);
//L'utilisateur choisi un pokémon et une attaque

/////////////////
//LES FONCTIONS//
/////////////////

//Function permettant d'afficher les 3 premiers pokémons de départ de l'utilisateur ainsi que leur PV et attaques
function pokemonStartUtilisateur() {
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

    btn1AttaquePok1.innerText = pokemon1.attaque[0];
    btn2AttaquePok1.innerText = pokemon1.attaque[1];
    btn1AttaquePok2.innerText = pokemon2.attaque[0];
    btn2AttaquePok2.innerText = pokemon2.attaque[1];
    btn1AttaquePok3.innerText = pokemon2.attaque[0];
    btn2AttaquePok3.innerText = pokemon2.attaque[1];
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
//Fonction permettant de générer le premier niveau et générer les premiers pokémons
function popNiveau1() {
    //variable contenant le nombre de pokémons dans le niveau
    let nbrPokemon = 3;
    let pokemonNiveau1 = generateurPokemonNiveau(nbrPokemon)
    console.log(pokemonNiveau1)
    return pokemonNiveau1;
}
// Fonction pour générer Pokémons aléatoires pour le niveau
function generateurPokemonNiveau(nbrPokemon) {
    let pokemonNiveau = [];
    for (let i = 0; i < nbrPokemon; i++) {
        let randomIndex = Math.floor(Math.random() * tabPokemon.length);
        pokemonNiveau.push(tabPokemon[randomIndex]);
    }
    console.log(pokemonNiveau)
    return pokemonNiveau;
}
function affichagePokAdverse(pokemonNiveau1) {
    let pokemonAdverse = pokemonNiveau1[0];
    imgPokemonAdversaire.src = pokemonAdverse.imgPokemon;
    console.log(imgPokemonAdversaire.src)
}
