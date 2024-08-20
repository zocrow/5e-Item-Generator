function generate(feClass)
{
    var classItemsURL =
    "https://raw.githubusercontent.com/zocrow/5e-Item-Generator/main/classitems.json";

    fetch(classItemsURL)
      .then(function(res) { return res.json(); })
      .then(function(classItems) {
         document.getElementById('result').innerHTML = classItems[feClass];
      });
    if (feClass.localeCompare("Artificer") == 0)
    {
        alert('you picked artificer');
    }
    else
    {
        alert('you didnt pick artificer');
    }
}