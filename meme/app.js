const formMeme      = document.getElementById('form_meme');
const divMemes      = document.getElementById('memes');
const imageUrl      = document.getElementById('image_url');
const topText       = document.getElementById('top_text');
const bottomText    = document.getElementById('bottom_text');
const btn           = document.getElementById('generate');

formMeme.addEventListener('submit' , function(e){
    e.preventDefault();

    if (imageUrl.value === ""){
        //if no image url exit;
        return false;
    }
    //generate the meme
    const div   = document.createElement('div');
    //generate the top text
    const top   = document.createElement('div');
    top.innerText   = topText.value;
    top.className   = "top-text";
    div.append(top);

    //generate the bottom text
    const bottom = document.createElement('div');
    bottom.innerText    = bottomText.value;
    bottom.className    = 'bottom-text';
    div.append(bottom);
    //generate the image
    const img = document.createElement('img');
    img.src   = imageUrl.value;
    div.append(img);


    //generate the delete button
    const delButton     = document.createElement('button');
    delButton.innerText = 'X';
    delButton.setAttribute('title' , 'Click to remove this meme');
    div.append(delButton);

    //append to the holder
    divMemes.append(div);

    //clear the form
    formMeme.reset();
});

/**
 * Add event to remove the meme
 */
divMemes.addEventListener('click' , function(e){
    e.preventDefault();
    const target = e.target;
    if (target.tagName === "BUTTON"){
        //remove the meme
        target.parentElement.remove();
    }
});