// Define News Sources and sectionIds
var sources = ['http://rss.cnn.com/rss/cnn_world.rss',
'http://rss.cnn.com/rss/cnn_us.rss',
'http://sports.espn.go.com/espn/rss/news',
'http://rss.weather.com/rss/national/rss_nwf_rss.xml?cm_ven=NWF&cm_cat=rss&par=NWF_rss',
'http://rss.cnn.com/rss/cnn_tech.rss'];
var sections = ['world', 'usa', 'sports', 'weather', 'technology'];


function loadFeed(requestedID, callback){
	$.ajax({
		url: "external.php?url=" + sources[requestedID],
		invokedata: { id: requestedID },
		success: callback
	});
}


function displayFeed(result) {
	var requestedID = this.invokedata.id;
	var parsed = $.parseXML(result);
	var articles = parsed.getElementsByTagName('item');
	var location = document.getElementById(sections[requestedID]);

	for (var i = 0; i < Math.min(articles.length, 5); i++) {

		var title = articles[i].childNodes[1].childNodes[0].nodeValue;

		var descripShort = ""
		if (articles[i].getElementsByTagName('description')[0].childNodes.length > 0) {
			var descrip = articles[i].getElementsByTagName('description')[0].childNodes[0].nodeValue;
			var descripLine = descrip.split('<Br>')[0];
			descripShort = descripLine.substr(0,140) + "...";
		};

		var link = articles[i].getElementsByTagName('link')[0].childNodes[0].nodeValue;

		var star = document.createElement('span');
		star.setAttribute('class', 'glyphicon glyphicon-star-empty');
		star.setAttribute('style', 'margin-right:10px;');

        var source = document.createElement('a');
        source.setAttribute('href', link);
        source.innerHTML = title + "<br>" + "<small>" + descripShort + "</small>";

        var item = document.createElement('li');
        item.setAttribute('class', 'list-group-item');
        item.appendChild(star);
        item.appendChild(source);

        location.appendChild(item);
	}
}
	
