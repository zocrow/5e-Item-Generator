function generate(feClass)
{
    var classItemsURL =
    "https://raw.githubusercontent.com/zocrow/5e-Item-Generator/main/classitems.json";

    document.getElementById('result').innerHTML = "Generated Items: \n"
    //Get the class items JSON file as an object from GitHub, display it on HTML 
    fetch(classItemsURL)
        .then(function(res) { return res.json(); })
        .then(function(classItems) {
            document.getElementById('result').innerHTML = document.getElementById('result').innerHTML + classItems[feClass];
    });
    //End JSON shenanigans



    if (feClass.localeCompare("Artificer") == 0)
    {
        //alert('you picked artificer');
    }
    else
    {
        //alert('you didnt pick artificer');
    }
}

//Set up any options for class-based starting option choices (usually weapons or armor)
function setClassOptions(feClass)
{
    if (feClass.localeCompare("Artificer") == 0)
    {
        //TODO
        const tempInner = "";
        document.getElementById('classOptions').innerHTML = tempInner;
    }
    else if (feClass.localeCompare("Barbarian") == 0)
    {
        //Weapon 1 are martial weapons, weapon 2 are simple weapons
        const tempInner = 
            '<form action="./index.html" onsubmit="return false">\
                <label for="BarbarianChoices">Choose two weapons</label>\
                <select id="Weapon1Choices" name="weapon1">\
                    <option value="Greataxe">Greataxe</option>\
                    <option value="Flail">Flail</option>\
                    <option value="Glaive">Glaive</option>\
                    <option value="Greatsword">Greatsword</option>\
                    <option value="Halberd">Halberd</option>\
                    <option value="Lance">Lance</option>\
                    <option value="Longsword">Longsword</option>\
                    <option value="Maul">Maul</option>\
                    <option value="Morningstar">Morningstar</option>\
                    <option value="Pike">Pike</option>\
                    <option value="Rapier">Rapier</option>\
                    <option value="Scimitar">Scimitar</option>\
                    <option value="Shortsword">Shortsword</option>\
                    <option value="Trident">Trident</option>\
                    <option value="War Pick">War Pick</option>\
                    <option value="Warhammer">Warhammer</option>\
                    <option value="Whip">Whip</option>\
                </select>\
                <select id="Weapon2Choices" name="weapon2">\
                    <option value="2 Handaxes">2 Handaxes</option>\
                    <option value="Club">Club</option>\
                    <option value="Dagger">Dagger</option>\
                    <option value="Greatclub">Greatclub</option>\
                    <option value="Javelin">Javelin</option>\
                    <option value="Light Hammer">Light Hammer</option>\
                    <option value="Mace">Mace</option>\
                    <option value="Quarterstaff">Quarterstaff</option>\
                    <option value="Sickle">Sickle</option>\
                    <option value="Spear">Spear</option>\
                </select>\
                <button type="submit">Submit Weapon Choice</button>\
            </form>';
        document.getElementById('classOptions').innerHTML = tempInner;
    }
    else
    {
        const tempInner = "";
        document.getElementById('classOptions').innerHTML = tempInner;
    }
    //To see what feClass is
    //alert(feClass);
}

//Set up any options for background starting option choices
function setBackgroundOptions(feBackground)
{
    //If the background is not selected, just put nothing in the class options div
    if (feBackground.localeCompare("--Choose a Background--") == 0)
    {
        var tempInner = '';
        document.getElementById('classOptions').innerHTML = tempInner;
    }
    //No options for city watch, so we just leave the class options div blank
    else if (feBackground.localeCompare("City Watch") == 0)
    {
        var tempInner = '';
        document.getElementById('classOptions').innerHTML = tempInner;
    }
    //To see what feBackground is 
    //alert(feBackground);
}

function determineIfGenerateShouldBeThere(feClass, feBackground)
{
    if (feClass.localeCompare("--Choose a Class--") == 0 || feBackground.localeCompare("--Choose a Background--") == 0)
    {
        document.getElementById('submitButton').innerHTML = '';
    }
    else
    {
        var tempInner = 
        '<form action="./index.html" onsubmit="return false" onClick="generate(document.getElementById("5e-classes").value)">\
            <button type="submit" onClick="generate(document.getElementById("5e-classes").value)">Generate Item List</button>\
        </form>';
        document.getElementById('submitButton').innerHTML = tempInner;
    }
}