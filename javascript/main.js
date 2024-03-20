/**
 * Jeu Pokémon
 * @author  Alexandre Pitarch
 * @version 2.1
 * @since   2024-03-11
 */

'use strict'; // Active le mode strict du JavaScript

const button = document.querySelectorAll('button');

//Pokémon de l'utilisateur
const pokemon1 = document.getElementById('pokemon1');
const pokemon2 = document.getElementById('pokemon2');
const pokemon3 = document.getElementById('pokemon3');

//Variable qui contient le pokémon avec lequel l'utilisateur souhaite attaquer
let pokemonJoueur = '';
//Attaques du Pokémon
const btnAttaque1 = document.getElementById('attaque1');
const btnAttaque2 = document.getElementById('attaque2');
let attaque1 = '';
let attaque2 = '';

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
let tabVie = ['♡','♡','♡','♡','♡'];

let tabPokemonUtili = [
    { pokemon: 'Racaillou',
        attaque: ['Jet de pierre!', 'Charge'],
        puissanceAttaque: [20, 30],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/074.png',
        viePokemon: 100,
    },
    { pokemon: 'Herbizarre',
        attaque: ['Tranch\'Herbe!','Fouet Lianes'],
        imgPokemon: "https://preview.redd.it/pokemon-of-the-day-ivysaur-v0-4pinv95tbnlb1.png?width=475&format=png&" +
            "auto=webp&s=940399261f3648bf9339ae31ebb5abd53f6d933b",
        viePokemon: 100
    },
    { pokemon: 'Krabby',
        attaque: ['Pince-Masse!'],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/099.png',
        viePokemon: 100
    },
    {pokemon: 'Tropius',
        attaque: 'Tempête Verte!',
        imgPokemon: 'https://www.pokepedia.fr/images/thumb/2/2e/Tropius-RS.png/250px-Tropius-RS.png',
        viePokemon: 100
    }
];

//Tableau d'objet des pokemons, attaques et images de l'IA
let tabPokemonOrdi = [
    { pokemon: 'Racaillou',
        attaque: ['Jet de pierre!', 'Charge'],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/074.png'},
    { pokemon: 'Herbizarre',
        attaque: ['Tranch\'Herbe!','Fouet Lianes'],
        imgPokemon: "https://preview.redd.it/pokemon-of-the-day-ivysaur-v0-4pinv95tbnlb1.png?width=475&format=png&" +
            "auto=webp&s=940399261f3648bf9339ae31ebb5abd53f6d933b"},
    { pokemon: 'Krabby',
        attaque: 'Pince-Masse!',
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/099.png'},
    {pokemon: 'Tropius',
        attaque: 'Tempête Verte!',
        imgPokemon: 'https://www.pokepedia.fr/images/thumb/2/2e/Tropius-RS.png/250px-Tropius-RS.png'}
];

vieJoueur();

pokemon1.addEventListener('click', function () {

        //active la visibilité des boutons d'attaques
        let btnAttaques =document.getElementsByClassName('btnAttaques');
        for (let i = 0; i < btnAttaques.length; i++) {
            if (btnAttaques[i].style.display === 'none') {
                btnAttaques[i].style.display = 'block';
            } else {
                btnAttaques[i].style.display = 'none';
            }
        }
        let puissanceAttaque1 = tabPokemonUtili[0].puissanceAttaque[0];
        let puissanceAttaque2 = tabPokemonUtili[1].puissanceAttaque[1];
        pokemonJoueur = tabPokemonUtili[0].pokemon;
       // jouer(pokemonJoueur);
        appelPokemon(pokemonJoueur, puissanceAttaque1, puissanceAttaque2)
});

function appelPokemon(pokemonJoueur,attaque1, attaque2) {
    let attaque = '';

    switch (pokemonJoueur) {
        case 'Racaillou':
            if (attaquePokemonOrdi === 'Herbizarre' || attaquePokemonOrdi === 'Tropius')
            {

            }
        break;

    /*    case 'Racaillou':
            if (attaquePokemonOrdi === 'Herbizarre' || attaquePokemonOrdi === 'Tropius')
            {
                compteurIa++;
                resultatManche.innerText = 'Perdu!'
                perteVieJoueur(resultatManche.innerText);
            }
            else if (attaquePokemonOrdi === 'Krabby'){
                compteurJoueur++;
                resultatManche.innerText = 'Gagné!';
            }
            else {
                resultatManche.innerText = 'Egalité!';
            }
            break;

            }
*/

    }
}


pokemon2 .addEventListener('click', function () {
    pokemonJoueur = tabPokemonUtili[1].pokemon;
    jouer(pokemonJoueur);
});

pokemon3.addEventListener('click', function () {
    pokemonJoueur = tabPokemonUtili[2].pokemon;
    jouer(pokemonJoueur);
});

function generateurAttaqueOrdi(){
    let indexJeuOrdi = Math.floor(Math.random() * tabPokemonOrdi.length);
    jeuOrdi = tabPokemonOrdi[indexJeuOrdi];
    attaqueOrdi.innerText = jeuOrdi.attaque;
    pokemonAdversaire.src = jeuOrdi.imgPokemon;
    return jeuOrdi.pokemon;
}

function jouer(attaqueJoueur){
    attaquePokemonOrdi = generateurAttaqueOrdi();
    switch (attaqueJoueur){

//controle lorsque l'utilisateur utilise le 1er pokémon
        case 'Racaillou':
            if (attaquePokemonOrdi === 'Herbizarre' || attaquePokemonOrdi === 'Tropius')
            {
                compteurIa++;
                resultatManche.innerText = 'Perdu!'
                perteVieJoueur(resultatManche.innerText);
            }
            else if (attaquePokemonOrdi === 'Krabby'){
                compteurJoueur++;
                resultatManche.innerText = 'Gagné!';
            }
            else {
                resultatManche.innerText = 'Egalité!';
            }
            break;
//controle lorsque l'utilisateur utilise le 2ème pokémon
        case 'Herbizarre':
            if (attaquePokemonOrdi === 'Racaillou'){
                compteurJoueur++;
                resultatManche.innerText = 'Gagné!'
            }
            else if (attaquePokemonOrdi === 'Krabby' || attaquePokemonOrdi === 'Tropius'){
                compteurIa++;
                resultatManche.innerText = 'Perdu!';
                perteVieJoueur(resultatManche.innerText);
            }
            else {
                resultatManche.innerText = 'Egalité!';
            }
            break;
//controle lorsque l'utilisateur utilise le 3ème pokémon
        case 'Krabby':
            if (attaquePokemonOrdi === 'Racaillou' || attaquePokemonOrdi === 'Tropius'){
                compteurIa++;
                resultatManche.innerText = 'Perdu!';
                perteVieJoueur(resultatManche.innerText);
            }
            else if (attaquePokemonOrdi === 'Krabby'){
                compteurJoueur++;
                resultatManche.innerText = 'Gagné!';
            }
            else {
                resultatManche.innerText = 'Egalité!';
            }
            break;
    }
    afficheScore ();
    vieJoueur();
    console.log('resultat IA : ', compteurIa);
    console.log('resultat J1 : ', compteurJoueur);
}


//affiche le résultat
function afficheScore () {
    compteurIa = String(compteurIa);
    scoreBot.innerText = compteurIa;
    compteurJoueur = String(compteurJoueur);
    scoreJoueur.innerText = compteurJoueur;
    //Controle si le joueur à atteint le niveau supérieur
    if (compteurJoueur >= 5) {
        niveauSuperieur();
        alert('Bravo! Vous avez atteint le niveau ' + compteurNiveauJoueur +' !');
        compteurIa = 0;
        compteurJoueur = 0;
        compteurIa = String(compteurIa);
        scoreBot.innerText = compteurIa;
        compteurJoueur = String(compteurJoueur);
        scoreJoueur.innerText = compteurJoueur;
    }
}

//Fonction permettant de faire augmenter le niveau du joueur
function niveauSuperieur() {
    //le niveau du joueur augmente s'il a gagné 5 manche
    compteurNiveauJoueur++;
    compteurNiveauJoueur = String(compteurNiveauJoueur);
    niveauJoueur.innerText = compteurNiveauJoueur;
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

//
function perteVieJoueur(resultatManche) {
    // Si le joueur a perdu la manche, réduire le nombre de vies
    if (resultatManche === 'Perdu!') {
        if (tabVie.length > 0) {
            tabVie.pop(); // Supprime la dernière vie du tableau
            if(tabVie.length === 0){
                perduPartie();
            }
        }
    }
}

//Affiche une alerte qui previent l'utilisateur de ça défaite et redémarre une partie
function perduPartie() {
    alert('GAME OVER')
    game();
}

function game() {
    compteurJoueur = 0;
    compteurIa = 0;
    tabVie = ['♡', '♡', '♡', '♡', '♡'];
    niveauJoueur.innerText = 1;
    compteurNiveauJoueur = 1;
    tabPokemonOrdi = [
        {
            pokemon: 'Racaillou',
            attaque: 'Jet de pierre!',
            imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/074.png'
        },
        {
            pokemon: 'Herbizarre',
            attaque: 'Tranch\'Herbe!',
            imgPokemon: "https://preview.redd.it/pokemon-of-the-day-ivysaur-v0-4pinv95tbnlb1.png?width=475&format=" +
                "png&auto=webp&s=940399261f3648bf9339ae31ebb5abd53f6d933b"
        },
        {
            pokemon: 'Krabby',
            attaque: 'Pince-Masse!',
            imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/099.png'
        },
        {
            pokemon: 'Tropius',
            attaque: 'Tempête Verte!',
            imgPokemon: 'https://www.pokepedia.fr/images/thumb/2/2e/Tropius-RS.png/250px-Tropius-RS.png'
        }
    ];
    afficheScore();
};