document.addEventListener('DOMContentLoaded', () => {
    const typeSelect = document.getElementById('type-select');
    const typeOptions = document.getElementById('typeOptions');
    const selectedTypesContainer = document.getElementById('selectedTypes');
    const typeSearch = document.getElementById('typeSearch');

    let selectedTypes = [];

    function createHiddenInput(value) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'card_type';
        input.value = value;
        typeSelect.appendChild(input);
        return input;
    }

    // mostrar dropdown ao focar
    typeSearch.addEventListener('focus', () => {
        typeOptions.style.display = 'block';
    });

    // clicar em uma opção
    typeOptions.querySelectorAll('.type-option').forEach(option => {
        option.addEventListener('click', () => {
            const value = option.dataset.value;

            if (!selectedTypes.includes(value)) {
                selectedTypes.push(value);

                // tag visual
                const tag = document.createElement('div');
                tag.className = 'type-tag';
                tag.innerHTML = `<img src="https://static.dotgg.gg/riftbound/type/${value.toLowerCase()}.svg" alt="">${value}<button type="button">&times;</button>`;

                // input hidden
                const hiddenInput = createHiddenInput(value);

                tag.querySelector('button').addEventListener('click', () => {
                    selectedTypesContainer.removeChild(tag);
                    typeSelect.removeChild(hiddenInput);
                    selectedTypes = selectedTypes.filter(v => v !== value);
                    option.classList.remove('selected');
                });

                selectedTypesContainer.appendChild(tag);
                option.classList.add('selected');
            }
        });
    });

    // fechar dropdown ao clicar fora
    document.addEventListener('click', e => {
        if (!typeSelect.contains(e.target)) {
            typeOptions.style.display = 'none';
        }
    });

    // filtrar opções pelo input
    typeSearch.addEventListener('input', () => {
        const search = typeSearch.value.toLowerCase();
        typeOptions.querySelectorAll('.type-option').forEach(option => {
            option.style.display = option.dataset.value.toLowerCase().includes(search) ? 'flex' : 'none';
        });
    });
});