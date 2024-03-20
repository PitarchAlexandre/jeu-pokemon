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
//Attaques du Pokémon
const attaque1 = document.getElementById('attaque1');
const attaque2 = document.getElementById('attaque2');

let jeuOrdi;
let attaquePokemonOrdi;
const attaqueOrdi = document.getElementById('attaqueOrdi');
const pokemonAdversaire = document.getElementById('imgPokemonAdversaire');

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

//Tableau d'objet des pokemons, attaques et images de l'utilisateur
const tabPokemonOrdi = [
    { pokemon: 'Racaillou',
        attaque: 'Jet de pierre!',
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/074.png'},
    { pokemon: 'Herbizarre',
        attaque: 'Tranch\'Herbe!',
        imgPokemon: "https://preview.redd.it/pokemon-of-the-day-ivysaur-v0-4pinv95tbnlb1.png?width=475&format=png&auto=webp&s=940399261f3648bf9339ae31ebb5abd53f6d933b"},
    { pokemon: 'Krabby',
        attaque: 'Pince-Masse!',
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/099.png'},
    {pokemon: 'Tropius',
        attaque: 'Tempête Verte!',
        imgPokemon: 'https://www.pokepedia.fr/images/thumb/2/2e/Tropius-RS.png/250px-Tropius-RS.png'}
];

vieJoueur();

pokemon1.addEventListener('click', function () {
    //la fonction setTimeout() permet de faire attendre une du temps avant de s'exécuter
    setTimeout(function() {
        jouer('pokemon1');
    }, 500);
});

pokemon2 .addEventListener('click', function () {
    jouer('pokemon2');
});

pokemon3.addEventListener('click', function () {
    jouer('pokemon3');
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
        case 'pokemon1':
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
        case 'pokemon2':
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
        case 'pokemon3':
            if (attaquePokemonOrdi === 'Racaillou' || attaquePokemonOrdi === 'Tropius'){
                compteurIa++;
                resultatManche.innerText = 'Perdu!';
                perteVieJoueur(resultatManche.innerText);
            }
            else if (attaquePokemonOrdi === 'Krabby'){
                compteurJoueur++;
                resultatManche.innerText = 'Gagné!';
            }
            else if (attaquePokemonOrdi === 'Tropius'){
                compteurIa++;
                resultatManche.innerText = 'Perdu!';
                perteVieJoueur(resultatManche.innerText);
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

function niveauSuperieur() {
    //le niveau du joueur augmente s'il a gagné 5 manche
    compteurNiveauJoueur++;
    compteurNiveauJoueur = String(compteurNiveauJoueur);
    niveauJoueur.innerText = compteurNiveauJoueur;
}

function vieJoueur() {
    // Mise à jour de l'affichage des vies du joueur
    nbrVie.innerText = ''; // Efface le contenu actuel
    for (let i = 0; i < tabVie.length; i++) {
        nbrVie.innerText += tabVie[i]; // Ajoute chaque cœur au texte affiché
    }
}

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

function perduPartie() {
    alert('GAME OVER')
    game();
}

function game() {
    compteurJoueur = 0;
    compteurIa = 0;
    tabVie = ['♡','♡','♡','♡','♡'];
    niveauJoueur.innerText = 1;
    compteurNiveauJoueur = 1;
    tabPokemonOrdi = [
        { pokemon: 'Racaillou',
            attaque: 'Jet de pierre!',
            imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/074.png'},
        { pokemon: 'Herbizarre',
            attaque: 'Tranch\'Herbe!',
            imgPokemon: "https://preview.redd.it/pokemon-of-the-day-ivysaur-v0-4pinv95tbnlb1.png?width=475&format=png&auto=webp&s=940399261f3648bf9339ae31ebb5abd53f6d933b"},
        { pokemon: 'Krabby',
            attaque: 'Pince-Masse!',
            imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/099.png'},
        {pokemon: 'Tropius',
            attaque: 'Tempête Verte!',
            imgPokemon: 'https://www.pokepedia.fr/images/thumb/2/2e/Tropius-RS.png/250px-Tropius-RS.png'}
    ];
    afficheScore();
}