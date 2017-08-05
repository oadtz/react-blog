import firebase, { firebaseDB } from '../config/firebase';

var postAPI = {

    // Get all posts
    query: (sort = 'date:-1') => {
        var key = sort.split(':')[0];
        var dir = sort.split(':')[1] || 1;

        return new Promise((resolve, reject) => {
            var postRef = firebaseDB.child('posts/').orderByChild(key).startAt(!null);

            postRef.once('value', data => {
                var posts = [];

                data.forEach(post => {
                    posts.push({
                        ...post.val(),
                        id: post.key
                    });
                });

                if (parseInt(dir) === -1) // Reverse if desc
                    posts.reverse();

                resolve(posts);
            }, (error) => {
                reject(error)
            });
        });
    },

    // Get a post by ID
    get: (id) => {
        return new Promise((resolve, reject) => {
            var postRef = firebaseDB.child('posts').child(id);

            postRef.once('value', data => {
                var post = data.val();
                if (post !== null)
                    resolve({
                        ...post,
                        id: postRef.key
                    });
                else
                    reject('Post not found');
            }, (error) => {
                reject(error);
            });
        });
    },

    // Create a new post
    store: (post) => {
        post = {
            ...post,
            date: post.date.unix()
        };

        return new Promise((resolve, reject) => {
            var postRef = firebaseDB.child('posts').push(post);

            postRef.then(function(response) {
                resolve({
                    ...post,
                    id: postRef.key
                });
            }, function(errors) {
                reject(errors);
            });
        });
    },

    // Create a new post
    update: (post) => {
        post = {
            ...post,
            date: post.date.unix()
        };

        return new Promise((resolve, reject) => {
            var postRef = firebaseDB.child(`posts/${post.id}`);

            postRef.update(post).then(function(response) {
                resolve(post);
            }, function(errors) {
                reject(errors);
            });
        });
    },

    // Delete a post
    delete: (id) => {
        return new Promise((resolve, reject) => {
            var postRef = firebaseDB.child(`posts/${id}`);

            postRef.remove().then(function(response) {
                resolve();
            }, function(errors) {
                reject(errors);
            });
        });
    }
};

export default postAPI;