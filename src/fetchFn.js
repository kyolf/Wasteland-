function fetchTopScores() {
    return fetch('/api/topScores')
    .then(res => {
        if(!res.ok){
            return Promise.reject(res.statusText);
        }
        return res.json();
    });
}

function postTopScores(score, initials) {
    return fetch('/api/topScores', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({score, initials})
    })
    .then(res => {
        if(!res.ok){
            return Promise.reject(res.statusText);
        }
        return fetchTopScores();
    });
}