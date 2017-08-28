function fetchTopScores() {
    return fetch('/api/topScores')
    .then(res => {
        if(!res.ok){
            return Promise.reject(res.statusText);
        }
        return res.json();
    });
}

function postTopScores() {
    return fetch('/api/postScores', {
      method: 'POST',
      body: {
        "score": this.game.global.score,
        "initials": this.game.global.initials
      }
    })
    .then(res => {
        if(!res.ok){
            return Promise.reject(res.statusText);
        }
        return fetchTopScores();
    });
}