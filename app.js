async function fetchPokemon() {
    const pokemonId = document.getElementById('pokemonId').value;
    const pokemonContainer = document.getElementById('pokemonContainer');
  
    pokemonContainer.innerHTML = '';
  
    if (!pokemonId) {
      pokemonContainer.innerHTML = '<p class="error">Por favor, ingrese un número.</p>';
      return;
    }
  
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      
      if (!response.ok) {
        throw new Error('Not Found');
      }
  
      const pokemon = await response.json();
  
      const pokemonName = pokemon.name;
      const pokemonTypes = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
      const pokemonHeight = pokemon.height / 10;
      const pokemonWeight = pokemon.weight / 10;
      const pokemonImage = pokemon.sprites.front_default;
  
      pokemonContainer.innerHTML = `
        <div class="pokemon-card">
          <h2>${pokemonName}</h2>
          <img src="${pokemonImage}" alt="${pokemonName}">
          <p><strong>Tipo(s):</strong> ${pokemonTypes}</p>
          <p><strong>Altura:</strong> ${pokemonHeight} m</p>
          <p><strong>Peso:</strong> ${pokemonWeight} kg</p>
        </div>
      `;
  
    } catch (error) {
      pokemonContainer.innerHTML = `<p class="error">${error.message}</p>`;
    }
  }