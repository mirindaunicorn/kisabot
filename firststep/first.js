
function table(mnojitel, razdelidel) {
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for(q of array) {
        let result = q * mnojitel;
        
        console.log(mnojitel + '*' + q + '='+ result);
    }

    console.log(razdelidel);
}

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
for(z of array) {
    let r = '----';

    if(z > 4) {
        r = '______'
    }
    
    table(z,r);
};
