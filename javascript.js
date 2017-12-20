$(function() {

  var $content = $('#jsoncontent');

  var data = {
    rss_url: 'https://medium.com/feed/hackwitus'
  };

  $.get('https://api.rss2json.com/v1/api.json', data, function(response) {
    if (response.status == 'ok') {
      var output = '';

      $.each(response.items, function(k, item) {
        var visibleSm;

        if (k < 3) {
          visibleSm = '';
        } else {
          visibleSm = ' visible-sm';
        }

        output += '<div>';

        output += '<div class="blog-post"><header>';

        output += '<h4 class="date">' + moment(item.pubDate).format('MM/DD/YYYY') + "</h4>";

        var tagIndex = item.description.indexOf('<img');

        var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex;

        var srcStart = srcIndex + 5;

        var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart;

        var src = item.description.substring(srcStart, srcEnd);

        output += '<div class="blog-element"><img class="img-responsive" src="' + src + '" width="360px" height="240px"></div></header>';

        output += '<div class="blog-content"><h4><a href="' + item.link + '">' + item.title + '</a><h4>';

        output += '<div class="post-meta"><span>By ' + item.author + '</span></div>';

        var yourString = item.description.replace(/<img[^>]*>/g,"");

        yourString = yourString.replace(/<figcaption.*figcaption>/g,"");

        var maxLength = 120;

        var trimmedString = yourString.substr(0, maxLength);

        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

        output += '<p>' + trimmedString + '...</p>';

        output += '</div></div></div>';

        return k < 3;
      });
      $content.html(output);
    }
  });

});
