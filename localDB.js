// Local storage handler object.
let localDB = {
    // localDB.setItem('todos', todos);
    setItem(key, value) {
        value = JSON.stringify(value);
        localStorage.setItem(key, value);
    },
    // console.log(localDB.getItem('todos'));
    getItem(key) {
        const value = localStorage.getItem(key);
        if (!value) {
            return null;
        }
        return JSON.parse(value);
    },
    // localDB.removeItem('todos');
    removeItem(key) {
        localStorage.removeItem(key);
    }
};

export default localDB;