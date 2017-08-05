import firebase, { firebaseDB } from '../utils/firebase';
import session from '../utils/session';

var postAPI = {

    // Get all posts
    query: () => {
        return new Promise((resolve, reject) => {
            var posts = session.get('posts');

            if (posts) {
                resolve(posts);
            } else {
                var postRef = firebaseDB.child('posts/');

                postRef.on('value', data => {

                    posts = [];
                    data.forEach(post => {
                        posts.push({
                            ...post.val(),
                            id: post.key
                        });
                    });

                    session.set('posts', posts);

                    resolve(posts);
                }, (error) => {
                    reject(error)
                });
            }
        });
    },

    // Get a post by ID
    get: (id) => {
        return new Promise((resolve, reject) => {
            var posts = session.get('posts');

            if (posts) {
                var post = posts.find(post => post.id === id);

                if (post)
                    resolve(post);
                else
                    reject('Post not found');
            } else {
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
            }

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