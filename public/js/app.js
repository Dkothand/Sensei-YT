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
};

// Document ready function
$(() => {
    // Enter new note on technique show.ejs view
    $('#new-note').on('submit', (e) => {
        e.preventDefault();
        createNewNote();
    });

    // Toggles floating action button to scale in when scrolling past navbar
    $(document).scroll(() => {
        const $nav = $('.nav-wrapper');
        const $button = $('.btn-floating');
        $button.toggleClass('scale-out', $(this).scrollTop() < $nav.height());
    })
});
// End Document ready function