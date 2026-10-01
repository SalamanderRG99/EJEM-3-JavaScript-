let listaPokemon=[];

async function carregarPokemon(){

    let resposta=await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
    let dados=await resposta.json();

    listaPokemon=dados.results.map(pokemon=>pokemon.name);
}

carregarPokemon();


document.getElementById("pokemon").addEventListener("input",function(){

    let texto=this.value.toLowerCase();
    let sugestoes=document.getElementById("sugestoes");

    sugestoes.innerHTML="";

    if(texto===""){
        return;
    }

    let resultados=listaPokemon
        .filter(nome=>nome.startsWith(texto))
        .slice(0,5);

    resultados.forEach(nome=>{

        let opcao=document.createElement("div");

        opcao.textContent=nome;

        opcao.onclick=function(){
            document.getElementById("pokemon").value=nome;
            sugestoes.innerHTML="";
        };

        sugestoes.appendChild(opcao);
    });
});


async function buscarPokemon(){

    let nome=document.getElementById("pokemon").value.toLowerCase();

    let resposta=await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);

    if(!resposta.ok){
        document.getElementById("resultado").innerHTML="<p>Pokémon não encontrado!</p>";
        return;
    }

    let pokemon=await resposta.json();

    let tipos=pokemon.types
        .map(tipo=>tipo.type.name)
        .join(", ");

    document.getElementById("resultado").innerHTML=`
        <h2>${pokemon.name}</h2>
        <p>Tipo: ${tipos}</p>
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
    `;

    console.log("Número da Pokédex:",pokemon.id);
}