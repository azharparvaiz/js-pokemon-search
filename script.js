document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchInput}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
            document.getElementById('pokemon-id').textContent = `#${data.id}`;
            document.getElementById('weight').textContent = `${data.weight}`;
            document.getElementById('height').textContent = `${data.height}`;
            document.getElementById('hp').textContent = `${data.stats[0].base_stat}`;
            document.getElementById('attack').textContent = `${data.stats[1].base_stat}`;
            document.getElementById('defense').textContent = `${data.stats[2].base_stat}`;
            document.getElementById('special-attack').textContent = `${data.stats[3].base_stat}`;
            document.getElementById('special-defense').textContent = `${data.stats[4].base_stat}`;
            document.getElementById('speed').textContent = `${data.stats[5].base_stat}`;

            const typesElement = document.getElementById('types');
            typesElement.innerHTML = '';
            data.types.forEach(typeInfo => {
                const typeSpan = document.createElement('span');
                typeSpan.textContent = typeInfo.type.name.toUpperCase();
                typesElement.appendChild(typeSpan);
            });

            let spriteElement = document.getElementById('sprite');
            if (!spriteElement) {
                spriteElement = document.createElement('img');
                spriteElement.id = 'sprite';
                document.body.appendChild(spriteElement);
            }
            spriteElement.src = data.sprites.front_default;
        })
        .catch(error => {
            alert(error.message);
            document.getElementById('pokemon-name').textContent = '-';
            document.getElementById('pokemon-id').textContent = '-';
            document.getElementById('weight').textContent = '-';
            document.getElementById('height').textContent = '-';
            document.getElementById('hp').textContent = '-';
            document.getElementById('attack').textContent = '-';
            document.getElementById('defense').textContent = '-';
            document.getElementById('special-attack').textContent = '-';
            document.getElementById('special-defense').textContent = '-';
            document.getElementById('speed').textContent = '-';
            document.getElementById('types').innerHTML = '';
            const spriteElement = document.getElementById('sprite');
            if (spriteElement) {
                spriteElement.remove();
            }
        });
});
