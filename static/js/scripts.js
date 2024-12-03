document.addEventListener("DOMContentLoaded", function () {
    const subjectButtons = document.querySelectorAll("nav button");
    const searchBar = document.getElementById("search-bar");
    const formulaContainer = document.getElementById("formula-container");
    const conceptContainer = document.getElementById("concept-container");

    function fetchItems(subject = "all", query = "") {
        fetch("/filter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subject, query }),
        })
        .then(response => response.json())
        .then(data => {
            formulaContainer.innerHTML = "<h2>Formulas</h2>";
            conceptContainer.innerHTML = "<h2>Concepts</h2>";

            console.log(data);
            // Update formulas
            data.formulas.forEach(formula => {
                const card = document.createElement("div");
                card.classList.add("formula-card");
                card.innerHTML = `
                    <h3>${formula.title}</h3>
                    <p><strong>Formula:</strong> ${formula.formula}</p>
                    <p>${formula.description}</p>
                    <div class="subject-label">${formula.subject}</div>
                `;
                formulaContainer.appendChild(card);
            });

            // Update concepts
            data.concepts.forEach(concept => {
                const card = document.createElement("div");
                card.classList.add("concept-card");
                card.innerHTML = `
                    <h3><a href="/concept/${concept.file}">${concept.title}</a></h3>
                    <p>${concept.description} </p>
                    <div class="subject-label" >${concept.subject}</div>
                `;
                conceptContainer.appendChild(card);
            });
        });
    }

    subjectButtons.forEach(button => {
        button.addEventListener("click", () => {
            subjectButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            fetchItems(button.dataset.subject, searchBar.value);
        });
    });

    searchBar.addEventListener("input", () => {
        fetchItems("all", searchBar.value);
    });

    // Default load
    fetchItems();
});