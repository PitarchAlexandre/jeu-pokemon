/**
 * Jeu Pokémon
 * @author  Alexandre Pitarch
 * @version 2.1.2
 * @since   2024-03-11
 */

'use strict'; // Active le mode strict du JavaScript

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

//Permet de stocker les pokemon adverses
let pokemonNiveau = [];
//Stocke le pokemon que le bot choisi d'attaquer
let pokemonJoueurCible;
let pokemonAdverse;
let pvPokAdverseActuel;
//Permet de stocker la puissance des dégats du pokémon adverse
let puissanceAttAdversaire;
//Nombre de dégats que le pokémon IA inflige au pokemon du joueur
let degatRecuPokUtilisateur;

//Permet d'afficher les dégats et le nom de l'attaque
let degatsSubis = document.getElementById('degatsSubis');

//Points de vies des pokémon
let pvPokemon1 = document.getElementById('pvPokemon1');
let pvPokemon2 = document.getElementById('pvPokemon2');
let pvPokemon3 = document.getElementById('pvPokemon3');
//Points de vie du pokémon adverse en combat
let pvAdversaire = document.getElementById('pvAvdersaire')

//Les variables qui contiennent les nom et attaque du pokemon (lors d'une attaque)
let nomPokemonAtt = document.getElementById('nomPokemonAtt');
let nomAttaque = document.getElementById('nomAttaque');
let nomPokemonAdv = document.getElementById('nomPokemonAdv');

const imgPokemonAdversaire = document.getElementById('imgPokemonAdversaire');

//Contitent les pokémons que l'utilisateur possède dans son jeu
let tabPokemonUtilisateur;

//Permet d'envoyer le pokemon selectionner dans une fonction
let pokemonChoisi;
//Permet d'envoyer l'attaque dans une fonction
let attaqueLance;
// Permet de stocker l'image d'un pokémon dans une fonction
let idImgPokemon;
//Permet d'envoyer la puissance d'attaque dans une fonction
let puissanceAttaque;
//Permet d'envoyer l'index du pokémon choisi par l'utilisateur dans plusieurs fonctions
let indexPokemonChoisi;

///////////////////////////////////
/// POP UP  /  POP UP /  POP UP ///
///////////////////////////////////
const overlay = document.getElementById('overlay');
const btnPokemonClassique = document.getElementById('btnPokemonClassique');
const btnPokemonAleatoire = document.getElementById('btnPokemonAleatoire');
const btnPokemonLegendaire = document.querySelector('#btnPokemonLegendaire');
//permet de savoir quel type de niveau à choisi l'utilisateur
let typeNiveau = '';

//Permet à l'utilisateur de commencer avec Bulbizzare, Salamèche et Carapuce
//Mode pokémon classique
btnPokemonClassique.addEventListener('click', () => {
    //Affiche les Pokémons de l'utilisiateur
    tabPokemonUtilisateur = modePokemonClassique();
    overlay.style.display = 'none';
    typeNiveau = 'classique';
    //Génère un tableau de 3 pokémons enemis
    pokemonNiveau = pushNiveau(typeNiveau);
    //Montre le pokémon adverse à l'utilisateur
    pokemonAdverse = affichagePokAdverse(pokemonNiveau);
})

//Mode pokémon aléatoire
btnPokemonAleatoire.addEventListener('click', () => {
    //Affiche les Pokémons de l'utilisateur
    tabPokemonUtilisateur = modePokemonAleatoire();
    overlay.style.display = 'none';
    typeNiveau = 'aleatoire';
    //Génère un tableau de 3 pokémons enemis
    pokemonNiveau = pushNiveau(typeNiveau);
    //Montre le pokémon adverse à l'utilisateur
    pokemonAdverse = affichagePokAdverse(pokemonNiveau);
})

//Mode pokémon légendaire
btnPokemonLegendaire.addEventListener('click', ()=> {
    //Affiche les Pokémons de l'utilisateur
    tabPokemonUtilisateur = modePokemonAleatoire();
    overlay.style.display = 'none';
    typeNiveau = 'legendaire';
    //Génère un tableau de 3 pokémons enemis
    pokemonNiveau = pushNiveau(typeNiveau);
    //Montre le pokémon adverse à l'utilisateur
    pokemonAdverse = affichagePokAdverse(pokemonNiveau);
})

///////////////////////////////////
// TABLEAU CONTENANT LES OBJETS  //
///////////////////////////////////

//Tableau contenant tous les pokémons du jeu
const tabPokemon = [
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
        viePokemon: 130,
        categorieNiveau:1
    },
    { pokemon: 'Herbizarre',
        attaque: ['Tranch\'Herbe!','Fouet Lianes'],
        puissanceAttaque: [30, 40],
        imgPokemon: "https://preview.redd.it/pokemon-of-the-day-ivysaur-v0-4pinv95tbnlb1.png?width=475&format=png&" +
            "auto=webp&s=940399261f3648bf9339ae31ebb5abd53f6d933b",
        viePokemon: 135,
        categorieNiveau:2
    },
    { pokemon: 'Reptincel',
        attaque: ['Griffe', 'Flammeche'],
        puissanceAttaque: [25, 35],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png',
        viePokemon: 120,
        categorieNiveau: 2
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
    { pokemon: 'Dracaufeu',
        attaque: ['Lance-Flammes', 'Griffe'],
        puissanceAttaque: [45, 30],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
        viePokemon: 160,
        categorieNiveau:3
    },
    {
        pokemon: 'Carabaffe',
        attaque: ['Pistolet à O', 'Hydrocanon'],
        puissanceAttaque: [20, 40],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png',
        viePokemon: 120,
        categorieNiveau: 2
    },
    {
        pokemon: 'Tortank',
        attaque: ['Pistolet à O', 'Hydrocanon'],
        puissanceAttaque: [25, 50],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png',
        viePokemon: 130,
        categorieNiveau: 3
    },
    {
        pokemon: 'Florizarre',
        attaque: ['Tranch\'Herbe', 'Fouet Lianes'],
        puissanceAttaque: [35, 45],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png',
        viePokemon: 105,
        categorieNiveau: 2
    },
    {
        pokemon: 'Miaouss',
        attaque: ['Griffe', 'Morsure'],
        puissanceAttaque: [25, 30],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/052.png',
        viePokemon: 90,
        categorieNiveau: 1
    },
    {
        pokemon: 'Mew',
        attaque: ['Psyko', 'Mégafouet'],
        puissanceAttaque: [40, 50],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/151.png',
        viePokemon: 150,
        categorieNiveau: 4
    },
    { pokemon: 'Mewtwo',
        attaque: ['Psycho', 'Lance-Soleil'],
        puissanceAttaque: [40, 60],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png',
        viePokemon: 170,
        categorieNiveau:4
    },
    {
        pokemon: 'Togepy',
        attaque: ['Charme', 'Écras\'Face'],
        puissanceAttaque: [15, 20],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/175.png',
        viePokemon: 80,
        categorieNiveau: 1
    },
    {
        pokemon: 'Ronflex',
        attaque: ['Bélier', 'Amnésie'],
        puissanceAttaque: [40, 20],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png',
        viePokemon: 200,
        categorieNiveau: 5
    }


];

//Les pokémons légendaires
const tabPokemonLegendaires = [

    {
        pokemon: 'Artikodin',
        attaque: ['Blizzard', 'Laser Glace'],
        puissanceAttaque: [40, 35],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/144.png',
        viePokemon: 100
    },
    {
        pokemon: 'Sulfura',
        attaque: ['Lance-Flammes', 'Déflagration'],
        puissanceAttaque: [45, 40],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/146.png',
        viePokemon: 130
    },
    {
        pokemon: 'Électhor',
        attaque: ['Tonnerre', 'Fatal-Foudre'],
        puissanceAttaque: [45, 40],
        imgPokemon: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/145.png',
        viePokemon: 160
    },

];

/////////////////
//LES FONCTIONS//
/////////////////

//Fonction qui envoie le nombre de pokémons qu'il y aura dans le niveau à la fonction qui permet de créer le tableau
//de pokémons ennemis.
function pushNiveau(typeNiveau) {
    //variable contenant le nombre de pokémons dans le niveau
    let choixTabPokemon = [];
    let nbrPokemon = 3;
    //console.log('avant le switch Push niveau');
    switch (typeNiveau) {

        case 'classique':
            // console.log('dans le switch Push niveau');
            choixTabPokemon = generateurPokemonNiveau(nbrPokemon);
            break;
        case 'aleatoire':
            choixTabPokemon = generateurPokemonNiveau(nbrPokemon);
            break;
        case 'legendaire':
            choixTabPokemon = generateurPokemonLegendaire();
            break;
    }
    return choixTabPokemon;
};

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

// Fonction qui permet de généré des pokémons aléatoirement pour l'utilisateur
function modePokemonAleatoire() {
    //sélectionne les indices des pokémons de l'utilisateur aléatoirement
    let index1;
    let index2 ;
    let index3;

    index1 = Math.floor(Math.random() * tabPokemon.length);

    do {
        index2 = Math.floor(Math.random() * tabPokemon.length);
    }while(index2 === index1);

    do {
        index3 = Math.floor(Math.random() * tabPokemon.length);
    }while(index3 === index1 || index3 === index2);

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



// Fonction pour générer Pokémons aléatoires pour le niveau
function generateurPokemonNiveau(nombrePokemons) {
    let pokemons = [];
    // Parcours le tableau tabPokemon
    for (let i = 0; i < tabPokemon.length; i++) {
        // Ajoute le Pokémon au tableau pokemons
        pokemons.push(tabPokemon[i]);
    }
    // Sélectionne aléatoirement le nombre de Pokémons requis
    let pokemonsSelectionnes = [];
    for (let j = 0; j < nombrePokemons; j++) {
        // Sélectionne un index aléatoire dans le tableau des Pokémons de la catégorieNiveau spécifiée
        let randomIndex = Math.floor(Math.random() * pokemons.length);
        // Ajoute le Pokémon sélectionné aléatoirement au tableau des Pokémons sélectionnés
        pokemonsSelectionnes.push(pokemons[randomIndex]);
        // Retire le Pokémon sélectionné pour éviter les doublons
        pokemons.splice(randomIndex, 1);
    }
    console.log(pokemonsSelectionnes);
    return pokemonsSelectionnes;
}
// Choisis un Pokémon légendaire aléatoire dans le tableau tabPokemonLegendaires
function generateurPokemonLegendaire() {
    let  pokemonLegendaire =   tabPokemonLegendaires ;

    return pokemonLegendaire;
}

//Affiche le premier pokémon du niveau après la génération du niveau et du tableau des pokémons
function affichagePokAdverse(pokemonNiveau) {
    let pokemonAdverse = pokemonNiveau[0];
    imgPokemonAdversaire.src = pokemonAdverse.imgPokemon;
    // Initialisation des points de vie actuels
    pvPokAdverseActuel = pokemonAdverse.viePokemon;
    pvAdversaire.innerText = pvPokAdverseActuel;

    return pokemonAdverse;
}
//Fonction qui permet de déclencher une attaque pour le joueur et le bot
function attaque(pokemonChoisi, attaqueLance, idImgPokemon, puissanceAttaque,indexPokemonChoisi ) {
    //Affiche le nom du pokémon de l'utilisateur qui effecture l'attaque
    nomPokemonAtt.innerText = pokemonChoisi.pokemon;
    //Affiche le nom de l'attaque du Pokémon de l'utilisateur
    nomAttaque.innerText = attaqueLance;
    shakeImage(idImgPokemon);
    //Permet d'attaquer le pokemon adverse et de déduire ses pv
    attaquePoKBot(puissanceAttaque);
    //Randomizer qui choisi l'attaque du Pokémon Adverse
    puissanceAttAdversaire = choixAttaqueBot(pokemonAdverse);
    console.log('attaque adversaire : '+  puissanceAttAdversaire);
    //Déduits les PV du pokémon de l'utilisateur
    pokemonChoisi.viePokemon -= puissanceAttAdversaire;
    console.log('pv pokemon restants : '+ pokemonChoisi.viePokemon);

    // Vérifie si le Pokémon de l'utilisateur a perdu tous ses PV
    if (pokemonChoisi.viePokemon <= 0){
        if (pokemonChoisi.viePokemon <= 0) {
            pokemonChoisi.viePokemon = 0
        }
        // Désactive les boutons d'attaque associés au Pokémon
        disableAttackButtons(indexPokemonChoisi);
    };

    //Mets à jour les pv
    misAjourPvPokemonUtilisateur(indexPokemonChoisi);
};

// Fonction qui déduit les PV du bot suite à une attaque de l'utilisateur
function  attaquePoKBot(puissanceAttaque) {
    pvPokAdverseActuel -= puissanceAttaque;
    // Si les dégâts sont inférieurs à zéro, ils seront initialisés à zéro
    if (pvPokAdverseActuel <= 0) {
        // Supprime le premier Pokémon adverse du tableau
        pokemonNiveau.shift();
       // imgPokemonAdversaire.src = pokemonNiveau.;
        imgPokemonAdversaire.style.display = 'flex';
            // Afficher le prochain Pokémon adverse s'il en reste
            if (pokemonNiveau.length > 0) {
                pokemonAdverse = affichagePokAdverse(pokemonNiveau);
            } else {
                // Si aucun Pokémon adverse n'est reste dans le tableau, afficher un message de victoire
                alert('Vous avez vaincu tous les Pokémon adverses !')
                window.location.reload()
        }
    }
    // Met à jour l'affichage des PV après l'attaque
    pvAdversaire.innerText = pvPokAdverseActuel;
}
// Fonction permettant d'ajouter un effet de shaking au pokemon qui attaque
function shakeImage(idImgPokemon) {
    let image = document.querySelector(idImgPokemon);
    image.classList.add('shake');
    setTimeout(function(){
        image.classList.remove('shake');
    }, 1000); // Durée de l'effet en millisecondes (1 seconde dans cet exemple)
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

    console.log('puissance d\'attaque de l\'adversaire' + puissanceAttAdversaire);
    //retourne les points de puissance d'attaque à la fonction attaque

    return puissanceAttAdversaire;
};

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
        btn1AttaquePok3 && btn2AttaquePok3.disabled  && pokemonAdverse[length] !== 0 && pokemonAdverse.viePokemon !== 0 ) {
        alert('Vous avez malheuresement perdu ! \nVous allez retourner au menu principal.');
        window.location.reload();
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

/////////////////////
//LE JEU DEBUTE ICI//
/////////////////////

//////////////////////////////////
//LES CLIQUES / ADDEVENTLISTENER//
//////////////////////////////////

///////////////////////////////////
//L'UTILISATEUR CHOISI UN POKEMON//
///////////////////////////////////

//Pokémon 1
pokemon1.addEventListener('click', ()=> {
    btn1AttaquePok1.style.display = 'flex';
    btn2AttaquePok1.style.display = 'flex';

    btn1AttaquePok2.style.display = 'none';
    btn2AttaquePok2.style.display = 'none';
    btn1AttaquePok3.style.display = 'none';
    btn2AttaquePok3.style.display = 'none';
});

//Pokémon 2
pokemon2.addEventListener('click', ()=> {
    btn1AttaquePok2.style.display = 'flex';
    btn2AttaquePok2.style.display = 'flex';

    btn1AttaquePok1.style.display = 'none';
    btn2AttaquePok1.style.display = 'none';
    btn1AttaquePok3.style.display = 'none';
    btn2AttaquePok3.style.display = 'none';
});

//Pokémon 3
pokemon3.addEventListener('click', ()=> {
    btn1AttaquePok3.style.display = 'flex';
    btn2AttaquePok3.style.display = 'flex';

    btn1AttaquePok1.style.display = 'none';
    btn2AttaquePok1.style.display = 'none';
    btn1AttaquePok2.style.display = 'none';
    btn2AttaquePok2.style.display = 'none';
});

//Attaque 1 Pokémon 1
btn1AttaquePok1.addEventListener('click', function () {
    pokemonChoisi = tabPokemonUtilisateur[0];
    attaqueLance = tabPokemonUtilisateur[0].attaque[0];
    idImgPokemon = '#imgPokemon1';
    puissanceAttaque = tabPokemonUtilisateur[0].puissanceAttaque[0];
    indexPokemonChoisi = 0;

    attaque(pokemonChoisi,attaqueLance, idImgPokemon, puissanceAttaque, indexPokemonChoisi);
});
//Attaque 2 Pokémon 1
btn2AttaquePok1.addEventListener('click', function () {
    pokemonChoisi = tabPokemonUtilisateur[0];
    attaqueLance = tabPokemonUtilisateur[0].attaque[1];
    idImgPokemon = '#imgPokemon1';
    puissanceAttaque = tabPokemonUtilisateur[0].puissanceAttaque[1];
    indexPokemonChoisi = 0;

    attaque(pokemonChoisi,attaqueLance, idImgPokemon,puissanceAttaque, indexPokemonChoisi);
});
//Attaque 1 Pokémon 2
btn1AttaquePok2.addEventListener('click', function () {
    pokemonChoisi = tabPokemonUtilisateur[1];
    attaqueLance = tabPokemonUtilisateur[1].attaque[0];
    idImgPokemon = '#imgPokemon2';
    puissanceAttaque = tabPokemonUtilisateur[1].puissanceAttaque[0];
    indexPokemonChoisi = 1;

    attaque(pokemonChoisi,attaqueLance,idImgPokemon,puissanceAttaque, indexPokemonChoisi);
});
//Attaque 2 Pokémon 2
btn2AttaquePok2.addEventListener('click', function () {
    pokemonChoisi = tabPokemonUtilisateur[1];
    attaqueLance = tabPokemonUtilisateur[1].attaque[1];
    idImgPokemon = '#imgPokemon2';
    puissanceAttaque = tabPokemonUtilisateur[1].puissanceAttaque[1];
    indexPokemonChoisi = 1;

    attaque(pokemonChoisi,attaqueLance,idImgPokemon,puissanceAttaque, indexPokemonChoisi);
});
//Attaque 1 Pokémon 3
btn1AttaquePok3.addEventListener('click', function () {
    pokemonChoisi = tabPokemonUtilisateur[2];
    attaqueLance = tabPokemonUtilisateur[2].attaque[0];
    idImgPokemon = '#imgPokemon3';
    puissanceAttaque = tabPokemonUtilisateur[2].puissanceAttaque[0];
    indexPokemonChoisi = 2;

    attaque(pokemonChoisi,attaqueLance,idImgPokemon,puissanceAttaque, indexPokemonChoisi);
});
//Attaque 2 Pokémon 3
btn2AttaquePok3.addEventListener('click', function () {
    pokemonChoisi = tabPokemonUtilisateur[2];
    attaqueLance = tabPokemonUtilisateur[2].attaque[1];
    idImgPokemon = '#imgPokemon3';
    puissanceAttaque = tabPokemonUtilisateur[2].puissanceAttaque[1];
    indexPokemonChoisi = 2;

    attaque(pokemonChoisi,attaqueLance,idImgPokemon,puissanceAttaque, indexPokemonChoisi);
});