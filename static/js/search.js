document.getElementById('search-bar').addEventListener('input', function () {
    const query = this.value;

    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    })
        .then((response) => response.json())
        .then((results) => {
            const container = document.getElementById('formula-container');
            container.innerHTML = '';

            results.forEach((formula) => {
                const card = document.createElement('div');
                card.classList.add('formula-card');

                card.innerHTML = `
                    <h3>${formula.title} </h3>
                    <p><strong>Formula:</strong> ${formula.formula}</p>
                    <p>${formula.subject}
                    <p>${formula.description}</p>
                `;

                container.appendChild(card);
            });
        });
});
