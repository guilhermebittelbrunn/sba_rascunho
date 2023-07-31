"use strict";
// // // let count: number = 0
const reviewR = {
    name: 'Rodrigo',
    stars: 3
};
const reviewD = {
    name: 'Douglas',
    stars: false
};
const reviewM = {
    name: 'Marcos',
    stars: 3
};
const reviewC = {
    name: 'Cláudio',
};
const reviews = [reviewR, reviewD];
function replyReview(review) {
    switch (review.stars) {
        case 1:
            return `${review.name} deu 1 estrela`;
        case 2:
            return `${review.name} deu 2 estrela`;
        case 3:
            return `${review.name} deu 3 estrela`;
        case 4:
            return `${review.name} deu 4 estrela`;
        case 5:
            return `${review.name} deu 5 estrela`;
    }
}
reviews.forEach(review => {
    if ("stars" in review) {
        if (typeof review.stars === 'number' || typeof review.stars === 'string') {
            return console.log(replyReview(review));
        }
        else if (typeof review.stars === 'boolean') {
            return console.log(`${review.name} não avaliou a aula`);
        }
    }
});
