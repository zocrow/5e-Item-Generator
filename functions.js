async function generate(feClass, feBackground, weapons, armor)
{
    //TODO: include feBackground items from a new json file
    var classItemsURL =
        "https://raw.githubusercontent.com/zocrow/5e-Item-Generator/main/classitems.json";

    var backgroundItemsURL = 
        "https://raw.githubusercontent.com/zocrow/5e-Item-Generator/main/backgrounditems.json";

    //Formatting for top of results
    //TODO: Make an if statement to make "a" turn into "an" if the following class/background starts with a vowel
    document.getElementById('result').innerHTML = "<h2>Generated Items for a " + feClass + " with a " + feBackground + " background: <h2>\
        <h3>Chosen Weapon(s):</h3>";

    document.getElementById('cresult').innerHTML = "";
    document.getElementById('bresult').innerHTML = "";
    document.getElementById('pack').innerHTML = "";

    //Loop through to get weapons
    for (i = 1; i < 5; i++)
    {
        curWeapon = "w" + i.toString();
        try
        {
            document.getElementById('result').innerHTML = document.getElementById('result').innerHTML + document.getElementById(curWeapon).value + ", ";
            //TODO: Chop off the last comma
        }
        catch(error)
        {
            //This is not a very sophisticated way of solving this issue of a null 'result' variable, but it works.
        }
    }

    document.getElementById('result').innerHTML = document.getElementById('result').innerHTML + "<h3 id='delIfNone1'>Chosen Armor:</h3>";

    //Formatting for armor part of results
    try
    {
        document.getElementById('result').innerHTML = document.getElementById('result').innerHTML + document.getElementById('a1').value;
    }
    catch
    {
        document.getElementById('delIfNone1').innerHTML = "";
    }

    //formatting for special items tab in item list
    //Exclusively for bard, sorceror, warlock, and wizard
    document.getElementById('result').innerHTML = document.getElementById('result').innerHTML + "<h3 id='delIfNone2'>Special Items:</h3>";
    for (i = 1; i < 5; i++)
    {
        curSpecial = "s" + i.toString();
        try
        {
            document.getElementById('result').innerHTML = document.getElementById('result').innerHTML + document.getElementById(curSpecial).value + ", ";
        }
        catch(error)
        {
            //Once again, not very sophisticated
            //If i = 1 and the value of s1 is null, then just delete the special items tab
            if (i == 1)
            {
                document.getElementById('delIfNone2').innerHTML = "";
            }
        }
    }
    
    document.getElementById('cresult').innerHTML = document.getElementById('cresult').innerHTML + "<h3 id='delIfNone3'>Items granted by class:</h3>";

    //Get the class items JSON file as an object from GitHub, display it on HTML 
    const classItems = await getData(classItemsURL);
    document.getElementById('cresult').innerHTML = document.getElementById('cresult').innerHTML + classItems[feClass];
    
    //Old code that doesn't use the getData() function. It didn't work for extracting the type of pack given to the player if there are no choices available (artificer, for example)
    // fetch(classItemsURL)
    //     .then(function(res) { return res.json(); })
    //     .then(function(classItemsURL) {
    //         document.getElementById('cresult').innerHTML = document.getElementById('cresult').innerHTML + "<p id='classItems>" + classItems[feClass] + "</p>";});
    

    //Do the same for background items from GitHub, also display on HTML

    document.getElementById('bresult').innerHTML = document.getElementById('bresult').innerHTML + "<h3 id='delIfNone4'>Items granted by background:</h3>";

    const backgroundItems = await getData(backgroundItemsURL);
    document.getElementById('bresult').innerHTML = document.getElementById('bresult').innerHTML + backgroundItems[feBackground];
    //Also old code
    // fetch(backgroundItemsURL)
    //     .then(function(res) { return res.json(); })
    //     .then(function(backgroundItems) {
    //         document.getElementById('bresult').innerHTML = document.getElementById('bresult').innerHTML + backgroundItems[feBackground];});
    //End JSON shenanigans

    document.getElementById('pack').innerHTML = document.getElementById('pack').innerHTML + "<h3 id='willnotdelete!!!'>What's in your adventuring pack:</h3>";
    var pack = "";
    try
    {
        //If your class lets you pick an adventuring pack, do this
        pack = document.getElementById('p1').value;
        document.getElementById('pack').innerHTML = document.getElementById('pack').innerHTML + "<h4>" + pack + ":</h4>";
    }
    catch(error)
    {
        //If your class has a set adventuring pack, find the pack from the end of the item list in the json
        cutPack = classItems[feClass].slice(-13);
        if (cutPack.localeCompare("eoneer's pack") == 0)
        {
            pack = "Dungeoneer's Pack";
        }
        else if (cutPack.localeCompare("urglar's pack") == 0)
        {
            pack = "Burglar's pack"
        }
        else if (cutPack.localeCompare("plomat's pack") == 0)
        {
            pack = "Diplotmat's pack"
        }
        else if (cutPack.localeCompare("tainer's pack") == 0)
        {
            pack = "Entertainer's pack"
        }
        else if (cutPack.localeCompare("plorer's pack") == 0)
        {
            pack = "Explorer's pack"
        }
        else if (cutPack.localeCompare("Priest's pack") == 0)
        {
            pack = cutPack;
            //because cutPack is just what we want
        }
        else
        {
            pack = "Scholar's pack"
        }
        document.getElementById('pack').innerHTML = document.getElementById('pack').innerHTML + "<h4>" + pack + ":</h4>";
    }

    //now this next final block before the raw text file will show all the items in the player's chosen/default pack
    //Pull one more json file...
}

//Set up any options for class-based starting option choices (usually weapons or armor)
function setClassOptions(feClass)
{
    if (feClass.localeCompare("Artificer") == 0)
    {
        //TODO
        const tempInner = 
            '<form action="./index.html" onsubmit="return false">\
                <label for="ArtificerChoices">Choose two weapons and an armor</label>\
                <select id="w1" name="w1">\
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
                <select id="w2" name="w2">\
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
                <select id="a1" name="a1">\
                    <option value="Leather Armor">Leather Armor</option>\
                    <option value="Scale Mail">Scale Mail</option>\
                </select>\
            </form>';
        document.getElementById('classOptions').innerHTML = tempInner;
    }
    else if (feClass.localeCompare("Barbarian") == 0)
    {
        //Weapon 1 are martial weapons, weapon 2 are simple weapons
        const tempInner = 
            '<form action="./index.html" onsubmit="return false">\
                <label for="BarbarianChoices">Choose two weapons</label>\
                <select id="w1" name="w1">\
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
                <select id="w2" name="w2">\
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
            </form>';
        document.getElementById('classOptions').innerHTML = tempInner;
    }
    else if (feClass.localeCompare("Rogue") == 0)
    {
        const tempInner = 
        `<form action="./index.html" onsubmit="return false">\
            <label for="RogueChoices">Choose two weapons and a pack of tools</label>\
            <select id="w1" name="w1">\
                <option value="Rapier">Rapier</option>\
                <option value="Shortsword">Shortsword</option>\
            </select>\
            <select id="w2" name="w2">\
                <option value="Shortbow and quiver of 20 arrows">Shortbow and quiver of 20 arrows</option>\
                <option value="Shortsword">Shortsword</option>\
            </select>\
            <select id="p1" name="p1">\
                <option value="Burglar's pack">Burglar's pack</option>\
                <option value="Dungeoneer's pack">Dungeoneer's pack</option>\
                <option value="Explorer's pack">Explorer's pack</option>\
            </select>\
        </form>`;
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
        document.getElementById('backgroundOptions').innerHTML = tempInner;
    }
    //No options for city watch, so we just leave the class options div blank
    else if (feBackground.localeCompare("City Watch") == 0)
    {
        var tempInner = '';
        document.getElementById('backgroundOptions').innerHTML = tempInner;
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
        `<form action="./index.html" onsubmit="return false">\
            <button type="submit" onClick="generate(document.getElementById('5e-classes').value, document.getElementById('5e-backgrounds').value, '', '')">Submit</button>\
        </form>`;
        document.getElementById('submitButton').innerHTML = tempInner;
    }
}

async function getData(url) {
    const response = await fetch(url);
  
    return response.json();
  }