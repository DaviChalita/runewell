document.addEventListener('DOMContentLoaded', () => {
    const typeSelect = document.getElementById('type-select');
    const typeOptions = document.getElementById('typeOptions');
    const selectedTypesContainer = document.getElementById('selectedTypes');
    const typeSearch = document.getElementById('typeSearch');

    let selectedValues = [];

    function createHiddenInput(value, group) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = group;
        input.value = value;
        typeSelect.appendChild(input);
        return input;
    }

    // abrir dropdown
    typeSearch.addEventListener('focus', () => {
        typeOptions.style.display = 'block';
    });

    // CLICK (delegation correta)
    typeOptions.addEventListener('click', (e) => {
        const option = e.target.closest('.type-option');
        if (!option) return;

        const value = option.dataset.value;
        const group = option.dataset.group;

        const key = `${group}:${value}`;
        if (selectedValues.includes(key)) return;

        selectedValues.push(key);

        const tag = document.createElement('div');
        tag.className = 'type-tag';

        const hasIcon = option.querySelector('img');

        tag.innerHTML = hasIcon
            ? `<img src="${hasIcon.src}">${value}<button type="button">&times;</button>`
            : `${value}<button type="button">&times;</button>`;

        const hiddenInput = createHiddenInput(value, group);

        tag.querySelector('button').addEventListener('click', () => {
            selectedTypesContainer.removeChild(tag);
            typeSelect.removeChild(hiddenInput);
            selectedValues = selectedValues.filter(v => v !== key);
            option.classList.remove('selected');
        });

        selectedTypesContainer.appendChild(tag);
        option.classList.add('selected');
    });

    // fechar dropdown
    document.addEventListener('click', e => {
        if (!typeSelect.contains(e.target)) {
            typeOptions.style.display = 'none';
        }
    });

    // filtro
    typeSearch.addEventListener('input', () => {
        const search = typeSearch.value.toLowerCase();

        typeOptions.querySelectorAll('.type-option').forEach(option => {
            option.style.display =
                option.dataset.value.toLowerCase().includes(search)
                    ? 'flex'
                    : 'none';
        });
    });
});