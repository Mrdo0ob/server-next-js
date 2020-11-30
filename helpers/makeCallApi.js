const makeCallApi = async (query = '', method = 'GET', urlServer = 'http://localhost:4000') => {
    if (!query) {
        return await fetch(urlServer, {method})
            .then(response => response.json())
            .then((data) => data);
    } else {
        return await fetch(urlServer+query, {method})
            .then(response => response.json())
            .then((data) => data);
    }
};

export default makeCallApi;