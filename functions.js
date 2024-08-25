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
            pack = "Burglar's Pack";
        }
        else if (cutPack.localeCompare("plomat's pack") == 0)
        {
            pack = "Diplomat's Pack";
        }
        else if (cutPack.localeCompare("tainer's pack") == 0)
        {
            pack = "Entertainer's Pack";
        }
        else if (cutPack.localeCompare("plorer's pack") == 0)
        {
            pack = "Explorer's Pack";
        }
        else if (cutPack.localeCompare("priest's pack") == 0)
        {
            pack = "Priest's Pack";
            //because cutPack is just what we want
        }
        else
        {
            pack = "Scholar's Pack"
        }
        document.getElementById('pack').innerHTML = document.getElementById('pack').innerHTML + "<h4>" + pack + ":</h4>";
    }

    //now this next final block before the raw text file will show all the items in the player's chosen/default pack
    //Pull one more json file...
    packURL = "https://raw.githubusercontent.com/zocrow/5e-Item-Generator/main/packitems.json";
    const packItems = await getData(packURL);
    document.getElementById('pack').innerHTML = document.getElementById('pack').innerHTML + packItems[pack];
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
    else if (feClass.localeCompare("Bard") == 0)
    {
        const tempInner = 
        `<form action="./index.html" onsubmit="return false">\
            <label for="BardChoices">Choose a weapon, an instrument, and an adventuring pack</label>\
            <select id="w1" name="w1">\
                <option value="Rapier">Rapier</option>\
                <option value="Longsword">Longsword</option>\
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
            <select id="s1" name="s1">\
                <option value="Lute">Lute</option>\
                <option value="Bagpipes">Bagpipes</option>\
                <option value="Drum">Drum</option>\
                <option value="Dulcimer">Dulcimer</option>\
                <option value="Flute">Flute</option>\
                <option value="Lyre">Lyre</option>\
                <option value="Horn">Horn</option>\
                <option value="Pan flute">Pan flute</option>\
                <option value="Shawm">Shawm</option>\
                <option value="Viol">Viol</option>\
            </select>\
            <select id="p1" name="p1">\
                <option value="Diplomat's Pack">Diplomat's pack</option>\
                <option value="Entertainer's Pack">Entertainer's pack</option>\
            </select>\
        </form>`;
        document.getElementById('classOptions').innerHTML = tempInner;
    }
    else if (feClass.localeCompare("Cleric") == 0)
    {
        const tempInner = 
        `<form action="./index.html" onsubmit="return false">\
            <label for="ClericChoices">Choose 2 weapons, armor, and an adventuring pack</label>\
            <select id="w1" name="w1">\
                <option value="Mace">Mace</option>\
                <option value="Warhammer">Warhammer</option>\
            </select>\
            <select id="w2" name="w2">\
                <option value="A Crossbow and 20 bolts">A Crossbow and 20 bolts</option>\
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
                <option value="Scale Mail">Scale Mail</option>\
                <option value="Leather Armor">Leather Armor</option>\
                <option value="Chain Mail">Chain Mail</option>\
            </select>\
            <select id="p1" name="p1">\
                <option value="Priest's Pack">Priest's pack</option>\
                <option value="Explorer's Pack">Explorer's pack</option>\
            </select>\
        </form>`;
        document.getElementById('classOptions').innerHTML = "<div class='note'>Cleric Note: You may only wield a warhammer and use chain mail if your character is proficient in them</div>" + tempInner;
    }
    else if (feClass.localeCompare("Druid") == 0)
    {
        const tempInner = 
        `<form action="./index.html" onsubmit="return false">\
            <label for="DruidChoices">Choose 2 weapons</label>\
            <select id="w1" name="w1">\
                <option value="Wooden Shield">Wooden Shield</option>\
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
                <option value="Scimtar">Scimtar</option>\
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
        </form>`;
        document.getElementById('classOptions').innerHTML = tempInner;
    }
    else if (feClass.localeCompare("Fighter") == 0)
    {
        const tempInner = 
        `<form action="./index.html" onsubmit="return false">\
            <label for="FighterChoices">Choose weapons, armor, and an adventuring pack</label>\
            <select id="w1" name="w1">\
                <option value="Light crossbow and 20 bolts">Light crossbow and 20 bolts</option>\
                <option value="2 handaxes">2 handaxes</option>\
            </select>\
            <select id="w2" name="w2">\
                <option value="Battleaxe">Battleaxe</option>\
                <option value="Flail">Flail</option>\
                <option value="Glaive">Glaive</option>\
                <option value="Greataxe">Greataxe</option>\
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
            <select id="w3" name="w3">\
                <option value="Shield">Shield</option>\
                <option value="Battleaxe">Battleaxe</option>\
                <option value="Flail">Flail</option>\
                <option value="Glaive">Glaive</option>\
                <option value="Greataxe">Greataxe</option>\
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
            <select id="a1" name="a1">\
                <option value="Chain mail">Chain mail</option>\
                <option value="Leather armor, a longbow and 20 arrows">Leather armor, a longbow and 20 arrows</option>\
            </select>\
            <select id="p1" name="p1">\
                <option value="Dungeoneer's Pack">Dungeoneer's pack</option>\
                <option value="Explorer's Pack">Explorer's pack</option>\
            </select>\
        </form>`;
        document.getElementById('classOptions').innerHTML = "<div class='note'>Fighter Note: If you choose leather armor, a weapon will appear in your armor slot. A longbow is a weapon, not armor</div>" + tempInner;
    }
    else if (feClass.localeCompare("Monk") == 0)
    {
        const tempInner = 
        `<form action="./index.html" onsubmit="return false">\
            <label for="MonkChoices">Choose a weapon and adventuring pack</label>\
            <select id="w1" name="w1">\
                <option value="Shortsword">Shortsword</option>\
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
            <select id="p1" name="p1">\
                <option value="Dungeoneer's Pack">Dungeoneer's pack</option>\
                <option value="Explorer's Pack">Explorer's pack</option>\
            </select>\
        </form>`;
    }
    else if (feClass.localeCompare("Rogue") == 0)
    {
        const tempInner = 
        `<form action="./index.html" onsubmit="return false">\
            <label for="RogueChoices">Choose two weapons and an adventuring pack</label>\
            <select id="w1" name="w1">\
                <option value="Rapier">Rapier</option>\
                <option value="Shortsword">Shortsword</option>\
            </select>\
            <select id="w2" name="w2">\
                <option value="Shortbow and quiver of 20 arrows">Shortbow and quiver of 20 arrows</option>\
                <option value="Shortsword">Shortsword</option>\
            </select>\
            <select id="p1" name="p1">\
                <option value="Burglar's Pack">Burglar's pack</option>\
                <option value="Dungeoneer's Pack">Dungeoneer's pack</option>\
                <option value="Explorer's Pack">Explorer's pack</option>\
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

async function getData(url) 
{
    const response = await fetch(url);
    return response.json();
}