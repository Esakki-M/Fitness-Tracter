document.getElementById('searchBtn').addEventListener('click', function() {
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const goal = document.getElementById('goal').value.toLowerCase();
    const results = document.getElementById('results');

    if (!weight || !height || !goal) {
        results.innerHTML = '<p>Please fill in all fields.</p>';
        return;
    }

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            let output = '';
            if (goal === 'bulk') {
                output += '<h2>Supplements for Bulking</h2><ul>';
                data.bulk.supplements.forEach(item => {
                    output += `<li>${item}</li>`;
                });
                output += '</ul><h2>Exercise Schedule for 30 Days</h2><ul>';
                data.bulk.exercises.forEach(item => {
                    output += `<li>${item}</li>`;
                });
                output += '</ul>';
            } else if (goal === 'cuts') {
                output += '<h2>Supplements for Cutting</h2><ul>';
                data.cuts.supplements.forEach(item => {
                    output += `<li>${item}</li>`;
                });
                output += '</ul><h2>Exercise Schedule for 30 Days</h2><ul>';
                data.cuts.exercises.forEach(item => {
                    output += `<li>${item}</li>`;
                });
                output += '</ul>';
            } else {
                output = '<p>Invalid goal. Please enter "bulk" or "cuts".</p>';
            }
            results.innerHTML = output;
        })
        .catch(error => {
            results.innerHTML = '<p>Error fetching data. Please try again later.</p>';
        });
});
