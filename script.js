//je crée des variables pour mes éléments 
const wordHidden = document.getElementById("wordHidden");
const count = document.getElementById("count");
const letters = document.getElementById("letters");
const score = document.getElementById("score"); // pas encore utilisé

// je crée un tableau contenant tous les mots que l'utilisateur devra trouver
const wordsList = ["cerf", "chez", "cire", "poulpe", "poumon", "assez", "avion", "dame", "dent", "oiseau", "podium", "puzzle", "bonne", "bruit"];

// tableau contenant les 26 lettres de l'alphabet 
let alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

/*j'ajoute un bouton pour chaque lettre de l'alphabet avec l'id "btn" suivi du numéro de l'itération (i+1) 
et une value qui contient le numéro d'itération (i+1) aussi, 
il affiche le contenu de la lettre actuelle de l'itération.*/

for (let i = 0; i < alpha.length; i++) { 
    letters.innerHTML += "<button id= btn" + (i + 1) + " value=\"" + (i + 1) + "\">" + alpha[i] + "</button>" 
} 

//je sélectionne un mot à deviner au hasard
let wordToGuess = wordsList[Math.floor(Math.random() * wordsList.length)];
console.log(wordToGuess);


//je crée un tableau qui prendra en compte le nombre de lettre dans le mot
let letterInWord = [];

//j'utilise "for" pour parcourir les caractères du mot choisi 
for (let i = 0; i < wordToGuess.length; i++) {
    letterInWord[i] = "_"             //je les remplace par des underscores           
}
wordHidden.innerHTML = letterInWord;

// je recup les lettres deja trouvées
let lettersGuess = "";    

 // compteur d'erreurs
let countErrors = 0;  

// continueGame = true
let continueGame = 1;


for (let i = 0; i < letters.children.length; i++) {   //j'utilise for pour parcourir tous les enfants de letters,                                                  
    const btn = letters.children[i];                   //je stocke l'index de children dans la variable btn,                                                 
    const textLetter = btn.textContent;                //stock le contenu textuel (la lettre du boutton).

    btn.addEventListener("click",() => {

        if (( (wordToGuess.includes(textLetter) === false) && (continueGame === 1) )) {               // SI la lettre n'est pas dans le mot          
            countErrors += 1;                                                                                 // incrémentation du compteur d'erreurs
            document.querySelector("img").setAttribute("src", "./img/pendu" + String(countErrors) + ".png");  // ajout une partie du pendu
            document.getElementById("btn" + (i + 1)).style.color = "black";                             // change le  style
            document.getElementById("btn" + (i + 1)).style.backgroundColor = "red";                     // change le style
            document.getElementById("btn" + (i + 1)).setAttribute("find", "0");                         // ajout attr 'find' = false
        }

        if ((wordToGuess.includes(textLetter) === true) && (continueGame === 1)) {                      // SI la lettre est dans le mot 
            wordHidden.innerHTML = "";                                                                   // init de l'affichahe du wordHidden
            lettersGuess += textLetter;                                                                  // stocke la lettre
            wordHidden.innerHTML += wordToGuess.replace(RegExp("[^" + lettersGuess + "]", "g"), "_ ");   // remplace le _ par la lettre trouvée
            document.getElementById("btn" + (i + 1)).style.backgroundColor = "green";                   // change le style
            document.getElementById("btn" + (i + 1)).style.color = "black";                             // change le style
            document.getElementById("btn" + (i + 1)).setAttribute("find", "1");                         // Ajout attr 'find' = true
        }

        if (countErrors >=0 ){ count.innerHTML = ( "Tentatives: " + countErrors + "/7"); }               // Affichage du compteur d'erreurs

        if (wordHidden.innerHTML === wordToGuess) {                                                      // SI le mot masqué est strictement égal au mot à deviner
            continueGame = 0;                                                                           // fin du JEU continueGame = false
            wordHidden.setAttribute("win", "1");                                                         // set attr
            count.textContent = "Vous avez gagné";                                                        // Affiche msg 
            wordHidden.style.color = "green";                                                             // en vert 
        }

        if (countErrors === 7) {                                                                         // SI le count atteint 7
            continueGame = 0;                                                                           // fin du JEU continueGame = false
            wordHidden.setAttribute("win", "0");                                                          // set attr 
            count.textContent = "Vous avez perdu !";                                                      // Affiche msg fin de jeu
            wordHidden.textContent = wordToGuess + " ";                                                   // affiche le mot qui était à trouver
            wordHidden.style.color = "red";                                                               // en rouge 
        }

    });

}