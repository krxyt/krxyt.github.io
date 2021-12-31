function getID(id) {
    return document.getElementById(id);
}

function rand(n, n2) {
    if (n2 == undefined)
        return Math.floor(Math.random() * n) + 1;
    else
        return Math.floor(Math.random() * (n2 - n + 1)) + n;
}

function chance(percent) {
    if (rand(100) <= percent)
        return true;
    else
        return false;
}

var hasSO = false;
var isMarried = false;

var gender = 0; // boy: 0; girl: 1
var age = 0;
var isDead = false;
var year = rand(1900, 2020);
var deathAge = rand(10, 125);
var dateAge = rand(23, 27);
var marriedDate = dateAge + 7;
var children = 0;

var dadAge = rand(18, 79);
var momAge = rand(18, 50);

var happy = rand(75, 100);
var health = rand(80, 100);
var smarts = rand(100);
var looks = rand(100);

var firstName = "";

var friendFirst = "James";
var friendLast = "Miller";

var friends = [];
var kids = [{}];

function getPerson() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://randomuser.me/api/", true);
    xhr.onload = function () {
        var data = JSON.parse(this.response);
        friendFirst = data.results[0].name.first;
        friendLast = data.results[0].name.last;
    }
    xhr.send();
}

function init() {
    age = 0;
    year = rand(1900, 2020);
    deathAge = rand(10, 125);
    dateAge = rand(23, 27);
    marriedDate = dateAge + 7;
    kidsDate = marriedDate + rand(1, 5);
    dadAge = rand(18, 79);
    momAge = rand(18, 50);
    happy = rand(75, 100);
    health = rand(80, 100);
    smarts = rand(100);
    looks = rand(100);
    updatePerson();
    getID("cash").innerHTML = "0";
    getID("kids").innerHTML = "0";
    getID("friends").innerHTML = "0";

    getID('feed').prepend(document.createElement('br'));
    getID('feed').prepend("Age: " + age + "; Year: " + year + " - You were born.");

    xhr = new XMLHttpRequest();
    xhr.open("GET", "https://randomuser.me/api/", true);
    xhr.onload = function () {
        var data = JSON.parse(this.response);
        firstName = data.results[0].name.first;
        lastName = data.results[0].name.last;
        console.log(data);
        if (data.results[0].gender == "male") gender = 0;
        else gender = 1;
        var location = data.results[0].location.city + ", " + data.results[0].location.country;
        getID("startText").innerHTML += firstName;
        getID("startText").innerHTML = "Your name is " + firstName + " " + lastName + ". You were born a " + (gender ? "girl" : "boy") + " during " + year + " in " + location + ". Your father is " + dadAge + " and your mother is " + momAge + ".";
    }
    xhr.send();
}

function boost(n) {
    if (n == 0) happy += rand(20, 40);
    else if (n == 1) health += rand(20, 40);
    else if (n == 2) smarts += rand(20, 40);
    else if (n == 3) looks += rand(20, 40);

    updatePerson();
}

function updatePerson() {
    getID("boost1").style.visibility = "hidden";
    getID("boost2").style.visibility = "hidden";
    getID("boost3").style.visibility = "hidden";
    getID("boost4").style.visibility = "hidden";

    var happyText = getID('happiness');
    var healthText = getID('health');
    var smartsText = getID('smarts');
    var looksText = getID('looks');

    function rT(a) {
        if (chance(50))
            a += rand(15);
        else 
            a -= rand(3)
        return a;
    }

    happy = rT(happy);
    health = rT(health);
    smarts = rT(smarts);
    looks = rT(looks);
    /*
    if (happy <= 25 && chance(20)) {
        getID("boost1").style.visibility = "visible";
    }
    if (health <= 25 && chance(20)) {
        getID("boost2").style.visibility = "visible";
    }
    if (smarts <= 25 && chance(20)) {
        getID("boost3").style.visibility = "visible";
    }
    if (looks <= 25 && chance(20)) {
        getID("boost4").style.visibility = "visible";
    }*/

    if (happy > 100) happy = 100;
    if (happy < 0) happy = 0;
    if (health > 100) health = 100;
    if (health < 0) health = 0;
    if (smarts > 100) smarts = 100;
    if (smarts < 0) smarts = 0;
    if (looks > 100) looks = 100;
    if (looks < 0) looks = 0;


    happyText.innerHTML = "Happiness: " + happy + "%";
    healthText.innerHTML = "Health: " + health + "%";
    smartsText.innerHTML = "Smarts: " + smarts + "%";
    looksText.innerHTML = "Looks: " + looks + "%";

    if (health == 0) deathAge = age;

}
var retChance = 10;
var hasRetired = false;
var message = "";

function getCareer() {

}

function feedMessage() {
    message = "";
    if (age == 5) {
        message += "You have enrolled in elementary school. ";
    }
    if (age == 10) {
        message += "You have enrolled in middle school. ";
    }
    if (age == 14) {
        message += "You have enrolled in high school. ";
    }
    if (age == 15) {
        message += "You have been hired for your first job. ";
    }
    if (age == 16) {
        if (chance(80)) {
            message += "You have successfully gotten your drivers license. ";
            if (chance(80)) {
                message += "Your parents have gifted you a brand new car! ";
            }
        }
        else message += "You didn't pass your driver's license test! ";
    }
    if (age == 18) {
        message += "You have graduated from high school and are now officially an adult. ";
    }
    if (age == 22) {
        message += "You have graduated from college. ";
        happy += 25;
    }
    if (age >= dateAge && !isMarried && !hasSO) {
        message += "You have gotten an attractive date. ";
        happy += 50;
        hasSO = true;
    }
    if (hasSO && chance(10)) {
        message += "You have broken up with your significant other. ";
        happy -= 50;
        hasSO = false;
    }
    if (age > dateAge && hasSO && chance(10)) {
        message += "You have gotten married! ";
        happy = 100;
        hasSO = false;
        isMarried = true;
    }
    if (isMarried && chance(2)) {
        message += "You have gotten divorced. ";
        happy -= 75;
        isMarried = false;
    }
    if (age >= 25 && age <= 50) {
        if (chance(15) && (hasSO == true || isMarried == true)) {
            message += "You had a child. ";
            children++;
        }
    }
    if (chance(20) && age >= 25) {
        if (rand(3) == 1)
            message += "You were solicited on the street. ";
        else if (rand(3) == 2)
            message += "You witnessed somebody being robbed. ";
        else if (rand(3) == 3) {
            if (rand(2) == 1)
                message += "You noticed a briefcase with money surrounding it, but didn't take any. ";
            else message += "You noticed a breifcase with money surrounding it and took it. ";
        }
    }
    if (age >= 60 && age <= 70 && hasRetired == false) {
        if (chance(retChance)) {
            message += "You have retired. ";
            hasRetired = true;
        }
        retChance *= 2;
    }
    if (dadAge >= 80) {
        if (chance(33)) {
            message += "Your father has died from old age. ";
            happy = 0;
            dadAge = -Infinity;
        }
    }
    if (momAge >= 80) {
        if (chance(33)) {
            message += "Your mother has died from old age. ";
            happy = 0;
            momAge = -Infinity;
        }
    }
    if (chance(75) && age <= 13) {
        message += "You have a new friend named " + friendFirst + " " + friendLast + ". ";
        friends.push(friendFirst + " " + friendLast);
    }
    if (chance(10) && age > 13) {
        message += "You have a new friend named " + friendFirst + " " + friendLast + ". ";
        friends.push(friendFirst + " " + friendLast);
    }
    if (chance(5)) {
        if (friends.length == 0) return message;
        var randFriend = rand(friends.length);
        message += friends[randFriend - 1] + " has unfriended you. ";
        // remove friend
        friends.splice(randFriend - 1, 1);
    }
    if (age == deathAge) {
        message += getDeathReason();
        isDead = true;
    } 
    return message;
}

function getDeathReason(customReason) {
    var r = rand(3);

    if (customReason) {
        return customReason;
    }
    
    if (year == 1987) {
        return "You were bitten in the frontal lobe by some crazed animatronic!"
    }
    if (deathAge < 16) {
        if (r==1)
            return "You were too young to go, maybe Death made a mistake..?"
        if (r == 2)
            return "You were taken too soon."
        if (r == 3)
            return "This shouldn't have happened."
    }
    if (deathAge >= 16 && deathAge <= 20) {
        if (r==1)
            return "You died in a car crash.";
        if (r == 2)
            return "You overdosed on drugs.";
        if (r == 3)
            return "You got stabbed by a crazy person.";
    }
    else if (deathAge == 21) {
        if (rand(2) == 1)
            return "You died from drinking and driving.";
        else
            return "You were shot in the skull, killing you instantly.";
    }
    else if (deathAge >= 22 && deathAge <= 45) {
        if (r == 1) 
            return "You died from alcohol poisoning.";
        if (r == 2)
            return "You got struck by lightning. Lucky you.";
        if (r == 3)
            return "Your entire house burned down, killing everyone inside.";
    }
    else if (deathAge >= 80) {
        if (r == 1)
            return "You died from complications associated with old age.";
        if (r == 2)
            return "You died from heart complications.";
        if (r == 3)
            return "You died from cancer.";
    }
    else {
        return "You died from natural causes.";
    }
}

var money = 0;
var richAF = chance(1);
    
function getMoney() {
    getPerson();
    if (!richAF) {
        if (age < 15 && age >= 5) {
            money += rand(10)
        }
        if (age >= 15 && age <= 24) {
            money += rand(500);
        }
        if (age >= 25 && age <= 45) {
            money += rand(10000, 50000);
        }
        if (age >= 46 && age <= 65) {
            money += rand(50000, 100000);
        }
        if (age >= 66 && age <= 80) {
            if (hasRetired)
                money += rand(5000);
            else
                money += rand(50000, 100000);
        }
    } else {
        if (age < 16 && age >= 5) {
            money += rand(100)
        }
        if (age >= 16 && age <= 24) {
            money += rand(5000);
        }
        
        if (age >= 25 && age <= 45) {
            money += rand(10000000, 50000000);
        }
        if (age >= 46 && age <= 65) {
            money += rand(50000000, 100000000);
        }
        if (age >= 66 && age <= 80) {
            if (hasRetired)
                money += rand(5000000);
            else
                money += rand(50000000, 100000000);
        }
    }
    return money;
}

function ageUp() {
    if (age >= deathAge) {
        getID('feed').prepend(document.createElement('br'));
        getID('feed').prepend("Stop trying, death is irreversible.");
        getID("ageButton").disabled = true;
        return;
    }
    age++;
    year++;
    dadAge++;
    momAge++;

    getID('cash').textContent = getMoney().toLocaleString("en-US");
    getID('kids').textContent = children;
    getID('friends').textContent = friends.length;

    if (feedMessage() === "") {
        getID('feed').prepend(document.createElement('br'));
        getID('feed').prepend("Age: " + age + "; Year: " + year);
    }
    else {
        if (!isDead) {
            getID('feed').prepend(document.createElement('br'));
            getID('feed').prepend("Age: " + age + "; Year: " + year + " - " + message);
        }
        else {
            var deathDiv = document.createElement('div');
            deathDiv.className = "deathMessage";
            getID('feed').prepend(deathDiv);
            deathDiv.style.color = "red";
            deathDiv.innerHTML = "Age: " + age + "; Year: " + year + " - " + message;

        }
    }
    
    
    if (age == deathAge) {
        getID("ageButton").disabled = true;
    }
    updatePerson();
}

function reset() {
    getID("ageButton").disabled = false;
    getID("feed").innerHTML = "";
    money = 0;
    richAF = chance(1);
    friends = [];
    children = 0;
    isDead = false;
    init();
}

init();