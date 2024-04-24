//Fonction qui permet au bot de choisir un pokémon au hasard
function randomizerAttaqueBot(tabPokemonUtilisateur) {
    //Permet de controler que le Pokémon attaqué est toujours des points de vie
    //Autrement le pokémon IA pourrait attaquer des pokémons qui n'ont plus de pv
    do {
        pokemonJoueurCible = Math.floor(Math.random() * tabPokemonUtilisateur.length);
    }while(tabPokemonUtilisateur[pokemonJoueurCible].viePokemon <= 0)

    return pokemonJoueurCible;
}