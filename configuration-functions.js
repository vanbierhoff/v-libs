

function generateRandomString(len) {
   let chrs = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
    let str = '';
    for (let i = 0; i < len; i++) {
        var pos = Math.floor(Math.random() * chrs.length);
        str += chrs.substring(pos,pos+1);
    }
    return `const RANDOM = '${str}'`;
}

 const FUNCTIONS  = {
    generateRandomString,
}
module.exports = FUNCTIONS
