function snakeToCamel(str) {
    words = str.split('_');

    for (let i = 0 ; i < words.length ; i ++){
        if (i > 0){
            words[i] = words[i][0].toUpperCase() + words[i].slice(1);
        }
    }

    return words.join('');
}

