const memeContainer = document.getElementById('memeContainer');

let after=''

function fetchMemes(){

    if (document.getElementById('memes')) {
        document.getElementById('memes').remove();
    }

    let parentDiv = document.createElement('div')
    parentDiv.id ='memes'

    fetch(`https://www.reddit.com/r/memes.json?after=${after}`)
    .then(response => response.json())
    .then(body => {
        after=body.data.after
        for(let index=0;index<body.data.children.length; index++) {
            if(body.data.children[index].data.post_hint==='image') {
                let div = document.createElement('div');
                div.class ='meme'
                let h4 = document.createElement('h4');
                let image = document.createElement('img');
                image.src=body.data.children[index].data.url_overridden_by_dest
                h4.textContent=body.data.children[index].data.title
                div.appendChild(h4)
                div.appendChild(image)
                parentDiv.appendChild(div)
            }
        }
        memeContainer.appendChild(parentDiv);
    });
}

