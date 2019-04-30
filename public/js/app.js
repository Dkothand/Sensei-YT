const youtubeApiKey = "AIzaSyBLMfcprLCQxeQTD-PAhnmQlI6yCMOnXzk";

// Takes video object and builds html card with classes for css styling

/*
<div class="col s12 m6 l3">
    <div class="card hoverable">
        <div class="card-content">
            <div class="card-img">
                <img src="https://img.youtube.com/vi/<%= videoId %>/hqdefault.jpg" alt="Youtube video thumbnail">
            </div>
            <a href="/techniques/<%= move.id %>"><h4><%= move.title %></h4></a>
        </div>
    </div>
</div>
 */

const createCard = (obj) => {
    // Build nested divs
    const $colDiv = $('<div>').attr('class', 'col s12 m6 l3');
    const $cardDiv = $('<div>').attr('class', 'card hoverable');
    const $contentDiv = $('<div>').attr('class', 'card-content');
    const $imgDiv = $('<div>').attr('class', 'card-img');

    $colDiv.append(
        $cardDiv.append(
            $contentDiv.append($imgDiv)
        )
    );

    // Make image
    const imageUrl = obj.snippet.thumbnails.high.url;
    const $img = $('<img>').attr('src', imageUrl);

    $img.appendTo($imgDiv);

    // Make title
    const objTitle = obj.snippet.title;
    const $title = $('<p>').text(objTitle);

    $title.appendTo($contentDiv);

    // return outer div will all content appended
    return $colDiv;
}

// Takes array of video objects from YouTube API call and renders to DOM
const renderSearchResults = (arr) => {
    arr.forEach(video => {
        // Build card
        const $card = createCard(video)
        
        // Append to DOM
        $('.results').append($card);
    });
};


const youtubeApiCall = () => {
    // Get search form val
    const userQuery = $('#search').val();

    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: youtubeApiKey,
            maxResults: 5,
            part: 'snippet',
            q: userQuery
        },
        dataType: 'json',
        type: 'GET'
    }).done((data) => {
        console.log(data.items);
        renderSearchResults(data.items);
    }, (error) => {
        console.log(error);
    })
};

// Document ready function
$(() => {
    $('#search-bar').on('submit', (e) => {
        e.preventDefault();
        youtubeApiCall();
    })
});
// End Document ready function