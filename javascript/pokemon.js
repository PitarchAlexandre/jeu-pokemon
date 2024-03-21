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
let btnAttaque1 = document.getElementById('attaque1');
let btnAttaque2 = document.getElementById('attaque2');

//Points de vies des pokémon
let pvPokemon1 = document.getElementById('pvPokemon1');
let pvPokemon2 = document.getElementById('pvPokemon2');
let pvPokemon3 = document.getElementById('pvPokemon3');

const attaqueOrdi = document.getElementById('attaqueOrdi');
const pokemonAdversaire = document.getElementById('imgPokemonAdversaire');
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

//LE JEU DEBUTE ICI

//Affiche les Pokémons et la vie des Pokémons de l'utilisiateur
pokemonStartUtilisateur()
//Affiche les attaques des pokémons

//Affiche la vie du joueur
vieJoueur();
//génère les pokémons enemis
popNiveau1();

//Function permettant d'afficher les 3 premiers pokémons de départ de l'utilisateur ainsi que leur PV
function pokemonStartUtilisateur() {
    pokemon1 = tabPokemon[0];
    pokemon2 = tabPokemon[1];
    pokemon3 = tabPokemon[2];

    imgPokemon1.src = pokemon1.imgPokemon;
    imgPokemon2.src = pokemon2.imgPokemon;
    imgPokemon3.src = pokemon3.imgPokemon;

    pvPokemon1.innerText = pokemon1.viePokemon;
    pvPokemon2.innerText = pokemon2.viePokemon;
    pvPokemon3.innerText = pokemon3.viePokemon;
}

function afficherAttaques(pokemon){
    btnAttaque1.innerText = pokemon.attaque[0];
    btnAttaque2.innerText = pokemon.attaque[1];
}
//Fonction permettant de générer le premier niveau et générer les premiers pokémons
function popNiveau1() {
    //variable contenant le nombre de pokémons dans le niveau
    let nbrPokemon = 3;
    generateurPokemonNiveau(nbrPokemon)
}

// Fonction pour générer Pokémons aléatoires pour le niveau
function generateurPokemonNiveau(nbrPokemon) {
    let pokemonNiveau = [];
    for (let i = 0; i < nbrPokemon; i++) {
        let randomIndex = Math.floor(Math.random() * tabPokemon.length);
        pokemonNiveau.push(tabPokemon[randomIndex]);
        console.log(pokemonNiveau)
    }
    return pokemonNiveau;
}

pokemon1.addEventListener('click', function () {
    afficherAttaques(tabPokemon[0])
})
