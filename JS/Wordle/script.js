const words = [
    "apple", "angel", "adapt", "alarm", "agent", "amber", "angry", "apron", "aroma", "audio", "avoid", "axiom",
    "bacon", "badge", "bagel", "baker", "banjo", "basic", "beach", "berry", "bible", "black", "bloom", "brick",
    "cabin", "candy", "cargo", "chair", "chase", "chess", "civil", "cloud", "cocoa", "crane", "crowd", "curve",
    "daisy", "dance", "debit", "delta", "denim", "diary", "digit", "dizzy", "dodge", "dolly", "donor", "dutch",
    "eagle", "ebony", "egret", "elbow", "emcee", "enema", "epoxy", "equip", "erase", "evoke", "exact", "extra",
    "fable", "faith", "fancy", "feast", "ferry", "fiber", "flame", "folio", "forum", "foxes", "frost", "fungi",
    "gamer", "ghost", "glory", "golem", "grade", "great", "grime", "guild", "guppy", "gypsy", "gazer", "goner",
    "habit", "harsh", "haste", "heart", "hinge", "honey", "horde", "human", "hydra", "hyper", "hobby", "hurry",
    "igloo", "iliac", "imbue", "inert", "ionic", "irate", "irony", "islet", "itchy", "ivory", "infer", "input",
    "jazzy", "jerky", "joker", "joust", "judge", "juice", "jumbo", "junta", "juror", "jelly", "karma", "kayak",
    "kebab", "khaki", "kiosk", "koala", "krill", "kneel", "knack", "knoll", "label", "lapse", "lemon", "light",
    "lobby", "lucky", "lyric", "latte", "liver", "llama", "logic", "lurch", "magic", "mango", "mercy", "minty",
    "money", "motor", "music", "myrrh", "maize", "molar", "mourn", "mucus", "naive", "nesty", "night", "noisy",
    "novel", "nurse", "nymph", "nadir", "nexus", "ninja", "nomad", "ocean", "offer", "olive", "opera", "other",
    "ought", "outer", "overt", "owing", "oxide", "ozone", "order", "panic", "peach", "photo", "piano", "plumb",
    "polka", "prize", "proud", "psalm", "pulpy", "pygmy", "pixie", "quack", "quail", "quart", "queen", "query",
    "quest", "queue", "quick", "quiet", "quilt", "quirk", "quota", "radio", "rebel", "rhino", "robin", "ruder",
    "rumor", "rusty", "rabid", "relic", "rouge", "riper", "rover", "salad", "scarf", "serum", "shine", "sixth",
    "skull", "sloth", "snowy", "spice", "sugar", "sword", "syrup", "table", "tepid", "third", "tiger", "topaz",
    "tribe", "truly", "twang", "typed", "tardy", "thumb", "tulip", "ultra", "umbra", "uncle", "unfit", "unite",
    "unzip", "upset", "urban", "usage", "usher", "utter", "upper", "vague", "venom", "vigor", "vixen", "vodka",
    "voter", "vowel", "vying", "valet", "verge", "viral", "vomit", "wacky", "wedge", "wharf", "widow", "woman",
    "worse", "woven", "wrath", "wrote", "wiser", "waltz", "wimpy", "xenon", "xeric", "xerox", "xylem", "xysti",
    "xebec", "xenia", "xylan", "xylyl", "yacht", "yearn", "yield", "yogic", "youth", "yummy", "yawny", "yelps",
    "yokel", "yolky", "yowls", "yucky", "zebra", "zesty", "zilch", "zippy", "zloty", "zonal", "zoned", "zooey",
    "zingy", "zombi"
];

const targetWord = words[Math.floor(Math.random() * words.length)];
console.log(targetWord);
const maxAttempts = 6;
let currentAttempt = 0;

const grid = document.getElementById('game-grid');
const guessInput = document.getElementById('guess');
const submitBtn = document.getElementById('submit');
const feedback = document.getElementById('feedback');

for (let i = 0; i < maxAttempts * 5; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    grid.appendChild(box);
}

submitBtn.addEventListener('click', () => {
    const guess = guessInput.value.toLowerCase();
    if (guess.length !== 5) {
        alert('Please enter a 5-letter word.');
        return;
    }

    const rowOffset = currentAttempt * 5;
    const targetFreq = {};
    for (let char of targetWord) {
        targetFreq[char] = (targetFreq[char] || 0) + 1;
    }

    const status = Array(5).fill('absent');
    const letterUsed = {};

    for (let i = 0; i < 5; i++) {
        if (guess[i] === targetWord[i]) {
            status[i] = 'correct';
            letterUsed[guess[i]] = (letterUsed[guess[i]] || 0) + 1;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (
            status[i] === 'absent' &&
            targetWord.includes(guess[i]) &&
            (letterUsed[guess[i]] || 0) < (targetFreq[guess[i]] || 0)
        ) {
            status[i] = 'present';
            letterUsed[guess[i]] = (letterUsed[guess[i]] || 0) + 1;
        }
    }

    for (let i = 0; i < 5; i++) {
        const box = grid.children[rowOffset + i];
        box.textContent = guess[i];
        box.classList.add(status[i]);
    }

    if (guess === targetWord) {
        feedback.textContent = "🎉 Congratulations! You guessed the word!";
        disableGame();
    } else if (++currentAttempt === maxAttempts) {
        feedback.textContent = `💀 Game over, the word was "${targetWord}".`;
        disableGame();
    }

    guessInput.value = '';
});

function disableGame() {
    guessInput.disabled = true;
    submitBtn.disabled = true;
}
