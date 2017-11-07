class Api {

    getProfile(username) {
        return fetch(`https://api.github.com/users/${username}`)
                .then(
                    response => {
                        return response.json();
                    })
                .catch(
                    error => {
                        return error;
                    }
                );
    };
}
