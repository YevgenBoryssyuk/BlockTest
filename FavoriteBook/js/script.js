document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    const surveys = JSON.parse(localStorage.getItem('surveys') || '[]');
    
    surveys.push(formProps);
    localStorage.setItem('surveys', JSON.stringify(surveys));

    alert('Ваші відповіді збережено!');
});

function displayResults(surveys) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Очищуємо попередні результати
    surveys.forEach(survey => {
        const div = document.createElement('div');
        div.textContent = JSON.stringify(survey);
        resultsContainer.appendChild(div);
    });
}

function filterByFaculty() {
    const faculty = document.getElementById('filterFaculty').value;
    const surveys = JSON.parse(localStorage.getItem('surveys') || '[]');
    const filtered = surveys.filter(survey => survey.faculty === faculty);
    displayResults(filtered);
}

function filterByDate() {
    const date = document.getElementById('filterDate').value;
    const surveys = JSON.parse(localStorage.getItem('surveys') || '[]');
    const filtered = surveys.filter(survey => survey.interviewDate === date);
    displayResults(filtered);
}

function filterByScore() {
    const minScore = document.getElementById('minScore').value;
    const maxScore = document.getElementById('maxScore').value;
    const surveys = JSON.parse(localStorage.getItem('surveys') || '[]');
    const filtered = surveys.filter(survey => {
        const score = parseFloat(survey.avgScore);
        return score >= minScore && score <= maxScore;
    });
    displayResults(filtered);
}
