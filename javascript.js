$(function() {

  var $content = $('#jsoncontent');

  var $articlesnippet = $('#articlesnippet'); //id for latest news panel


  var data = {
    rss_url: 'https://medium.com/feed/hackwitus'
  };

  $.get('https://api.rss2json.com/v1/api.json', data, function(response) {
    if (response.status == 'ok') {

      var output = '';

      var detailedoutput = '';

      var header = '<h2>Lastest News</h2>'

      $articlesnippet.html(header);

      $.each(response.items, function(k, item) {
        var visibleSm;

        if (k < 3) {
          visibleSm = '';
        } else {
          visibleSm = ' visible-sm';
        }

        detailedoutput += '<div>';

        detailedoutput += '<div class="blog-post"><header>';

        detailedoutput += '<h4 class="date">' + moment(item.pubDate).format('MM/DD/YYYY') + "</h4>";

      var date = '<div class="date"> ' + moment(item.pubDate).format('MM/DD/YYYY') + "</div>";

        var tagIndex = item.description.indexOf('<img');

        var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex;

        var srcStart = srcIndex + 5;

        var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart;

        var src = item.description.substring(srcStart, srcEnd);

        detailedoutput += '<div class="blog-element"><img class="img-responsive" src="' + src + '" width="360px" height="240px"></div></header>';

        detailedoutput += '<div class="blog-content"><h4><a href="' + item.link + '">' + item.title + '</a><h4>';

        if (k == 0) {
          var title = '<h3 id="newsheader">Latest News</h3><div class="blog-content"><a class="article" href="' + item.link + '">' + item.title + '</a>';
        } else {
      var title = '<div class="blog-content"><a class="article" href="' + item.link + '">' + item.title + '</a>';
        }

        detailedoutput += '<div class="post-meta"><span>By ' + item.author + '</span></div>';

      var author = '<div class="author"> ~By '+ item.author + ',</div>';

        var yourString = item.description.replace(/<img[^>]*>/g,"");

        yourString = yourString.replace(/<figure.*figure>/g,"");

        var maxLength = 120;

        var trimmedString = yourString.substr(0, maxLength);

        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

        detailedoutput += '<p>' + trimmedString + '...</p>';

      var description = trimmedString + '...</div>';

        detailedoutput += '</div></div></div>';

        output += title + author + date + description;

        return k < 3;
      });

      $articlesnippet.html(output);
    }
  });

});
