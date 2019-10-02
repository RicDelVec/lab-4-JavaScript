const emojibtn = document.querySelector('#emojibtn');
const emojimodalbody = document.querySelector('#emojimodalbody')
const textarea = document.querySelector('#textarea');
const searchEmoji = document.querySelector('#searchEmoji');
const emojiCategories = document.querySelector('#emojiCategories');

let emojis = []

// 1. Fetching emojis from API and storing data inside array
async function browseEmojis() {
    const response = await fetch("https://unpkg.com/emoji.json@12.1.0/emoji.json")
    const data = await response.json()
    emojis = data
    // 3. Displaying emojis
    const emoji = emojis.map((e, i) => `<div class="emoji" data-index="${i}">${e.char}</div>`)
    .join("")
    emojimodalbody.innerHTML = emoji
}

// 4. Displaying emoji in textarea box
function chooseEmoji(e) {
    if(e.target.matches(".emoji")) {
        textarea.value += e.target.innerHTML
    }
}

// 6. DIsplaying only relevant emojis
function searchEmojis() {
    let {value} = searchEmoji
    const emoji = emojis.filter(n => n.name.includes(value))
    .map((e, i) => `<div class="emoji" data-index="${i}">${e.char}</div>`)
    .join("")
    emojimodalbody.innerHTML = emoji
}

// BONUS displaying relevant icons as determined by the image's category'
function chooseCategory(e) {
    if(e.target.matches("img")) {
        let {category} = e.target.dataset
        const emojiCategory = emojis.filter(c => c.category.includes(category))
        .map((e, i) => `<div class="emoji" data-index="${i}">${e.char}</div>`)
        .join("")
        emojimodalbody.innerHTML = emojiCategory
        // BONUS Scrolling to the top per category click
        emojimodalbody.scrollTop = 0
    }
}

// 2. Calling function upon clicking emojibtn
emojibtn.addEventListener('click', browseEmojis)

emojimodalbody.addEventListener('click', chooseEmoji)

// 5. Keyup event listener to run searchEmojis function
searchEmoji.addEventListener('keyup', searchEmojis)

emojiCategories.addEventListener('click', chooseCategory)
