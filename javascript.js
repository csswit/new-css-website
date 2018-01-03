$(function() {

  var $newscontent = $('#newscontent');

  var data = {
    rss_url: 'https://medium.com/feed/hackwitus'
  };

  $.get('https://api.rss2json.com/v1/api.json', data, function(response) {
    if (response.status == 'ok') {

      var output = '';

      $.each(response.items, function(k, item) {

        var date = '<div class="date"> ' + moment(item.pubDate).format('MM/DD/YYYY') + "</div>";

        var tagIndex = item.description.indexOf('<img');

        var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex;

        var srcStart = srcIndex + 5;

        var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart;

        var src = item.description.substring(srcStart, srcEnd);

        if (k == 0) {
          var title = '<h3 id="newsheader">Latest News</h3><div class="blog-content"><a class="article" href="' + item.link + '">' + item.title + '</a>';
        } else {
          var title = '<div class="blog-content"><a class="article" href="' + item.link + '">' + item.title + '</a>';
        }

        var author = '<div class="author"> ~By '+ item.author + ',</div>';

        var yourString = item.description.replace(/<img[^>]*>/g,"");

        yourString = yourString.replace(/<figure.*figure>/g,"");

        var maxLength = 120;

        var trimmedString = yourString.substr(0, maxLength);

        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

        var description = trimmedString + '...</div>';

        output += title + author + date + description;

        return k < 3;
      });
      $newscontent.html(output);
    }
  });
});


$(document).ready(function(){
  // Add smooth scrolling to all links
  $('a[href*=#]:not([href=#]):not([href=#collapse1]):not([href=#collapse2]):not([href=#collapse3]):not([href=#collapse4]):not([href=#collapse5]):not([href=#collapse6]):not([href=#collapse7]):not([href=#collapse8])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        || location.hostname == this.hostname) {

        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top - 80
            }, 500);
            return false;
        }
    }
});
});
