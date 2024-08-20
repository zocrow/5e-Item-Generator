var json = require('./data.json');
function generate(feClass)
{
    document.getElementById('result').innerHTML = "bye there";
    if (feClass.localeCompare("Artificer") == 0)
    {
        document.getElementById('result').innerHTML = "artificer items yippee!!!";
    }
    else
    {
        alert('you didnt pick artificer');
    }
}