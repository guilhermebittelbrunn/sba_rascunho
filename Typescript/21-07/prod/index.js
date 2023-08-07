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
    stars: '5'
};
const reviewC = {
    name: 'Cláudio',
};
const reviews = [reviewR, reviewD, reviewM, reviewC];
function replyReview(review) {
    switch (String(review.stars)) {
        case '1':
            return `${review.name} deu 1 estrela`;
        case '2':
            return `${review.name} deu 2 estrelas`;
        case '3':
            return `${review.name} deu 3 estrelas`;
        case '4':
            return `${review.name} deu 4 estrelas`;
        case '5':
            return `${review.name} deu 5 estrelas`;
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
    else {
        console.log(`${review.name} não avaliou a aula...`);
    }
});
