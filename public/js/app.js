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
    const $imgDiv = $('<div>').attr('class', 'card-image');

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

    // Get video Id
    const objVideoId = obj.id.videoId;

    // Create form to add to library
    const $objForm = $('<form>')
        .attr('action', '/techniques') 
        .attr('method', 'POST');

    // Append input fields to form
    const $titleInput = $('<input>')
        .attr('type', 'hidden')
        .attr('name', 'title')
        .attr('value', objTitle);

    const $videoInput = $('<input>')
        .attr('type', 'hidden')
        .attr('name', 'videoId')
        .attr('value', objVideoId);

    const $submitInput = $('<input>')
        .attr('type', 'submit')
        .attr('value', 'Add to Library');

    $objForm.append($titleInput)
        .append($videoInput)
        .append($submitInput);

    $objForm.appendTo($contentDiv);

    // return outer div will all content appended
    return $colDiv;
};


// Sends note to express route to store in database, renders to DOM upon success
const createNewNote = () => {
    // Get note
    const note = $('#note').val();
    const $noteDiv = $('<div>').attr('class', 'note').append(note);
    // $noteDiv.appendTo($('.notes-list'));

    // Get url for technique id
    const url = $(location).attr('href');
    const splitUrl = url.split('/');
    const techniqueId = splitUrl[splitUrl.length - 1]
    // console.log(techniqueId);
    $.ajax({
        url: '/techniques/' + techniqueId + '/new',
        data: {
            note: note
        },
        dataType: 'json',
        type: 'PUT',
        success: () => {
            $noteDiv.appendTo($('.notes-list'));
            // $('#note').val('');
        }
    });
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
            maxResults: 8,
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
    // Search bar in new.ejs to query YouTube API
    $('#search-bar').on('submit', (e) => {
        e.preventDefault();
        youtubeApiCall();
        $('#search').val('');
    });

    // Enter new note on technique show.ejs view
    $('#new-note').on('submit', (e) => {
        e.preventDefault();
        createNewNote();
    })
});
// End Document ready function