var session = {
    get: (key) => {
        var item = sessionStorage.getItem(key);

        if (item)
            return JSON.parse(item);

        return undefined;
    },

    set: (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
};

export default session;