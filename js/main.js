// event listener to form
document.getElementById( 'myForm' ).addEventListener( 'submit', saveBookmark );

//save bookmark
function saveBookmark( e ) {
	let websiteName = document.getElementById( 'websiteName' ).value;
	let websiteUrl  = document.getElementById( 'websiteUrl' ).value;
	if ( !websiteName || !websiteUrl ) {
		alert("Please insert Name and Url!");
		return false;
	}
	//saving values in an object
	let bookmark    = {
		name : websiteName,
		url  : websiteUrl
	};
	//test if bookmarks is null
	if ( localStorage.getItem( 'bookmarks' ) === null ) {
		// initiate array
		let bookmarks = [];
		// add to array
		bookmarks.push( bookmark );
		localStorage.setItem( 'bookmarks', JSON.stringify( bookmarks ) );
	} else {
		// get bookmarks from localStorage and parse it as JSON
		let bookmarks = JSON.parse( localStorage.getItem( 'bookmarks' ) );
		// add to array
		bookmarks.push( bookmark );
		// set bookmarks back to string
		localStorage.setItem( 'bookmarks', JSON.stringify( bookmarks ) );
	}
	//reset form
	document.getElementById('myForm').reset();
	// get bookmarks = refresh
	getBookmarks();
	// prevent form from submitting
	e.preventDefault();
}

function deleteBookmark( url ) {
	let bookmarks = JSON.parse( localStorage.getItem( 'bookmarks' ) )

	//loop through bookmarks
	for ( let i = 0; i < bookmarks.length; i++ ) {
		if ( bookmarks[i].url === url ) {
			bookmarks.splice( i, 1 );
		}
	}
	// reset back to localStorage
	localStorage.setItem( 'bookmarks', JSON.stringify( bookmarks ) );
	//get bookmarks for refresh
	getBookmarks();
}

// get bookmarks
function getBookmarks() {
	let bookmarks              = JSON.parse( localStorage.getItem( 'bookmarks' ) );
	//get output id
	let bookmarksResults       = document.getElementById( 'bookmarksResults' );
	bookmarksResults.innerHTML = '';
	for ( let i = 0; i < bookmarks.length; i++ ) {
		let name = bookmarks[i].name;
		let url  = bookmarks[i].url;
		bookmarksResults.innerHTML +=
			'<div class="well"' +
			'<h3>' + name + ' ' +
			'<a class="btn btn-default"target="_blank" href="' + url + '"> Visit</a>' + ' ' +
			'<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger"href="#"> Delete</a>' +
			'</h3>' +
			'</div>';
	}
}
