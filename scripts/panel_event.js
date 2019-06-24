var browser={
	versions:function(){
		var u=navigator.userAgent;
		var app=navigator.appVersion;
		return{
			trident: u.indexOf('Trident') > -1,                           // IE core
			presto:  u.indexOf('Presto') > -1,                            // opera core
			webKit:  u.indexOf('AppleWebKit') > -1,                       // apple/google core
			gecko:   u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // firefox core
			mobile:  !!u.match(/AppleWebKit.*Mobile.*/),                  // mobile device
			ios:     !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),          // ios device
			android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,  // android device
			iPhone:  u.indexOf('iPhone') > -1 ,                           // iPhone or QQHD browser
			iPad:    u.indexOf('iPad') > -1,                              // iPad
			webApp:  u.indexOf('Safari') == -1,                           // web app
			weixin:  u.indexOf('MicroMessenger') > -1,                    // msg (WeChat)
			qq:      u.match(/\sQQ/i) == " qq"                            // qq
		};
	}(),
	language:(navigator.browserLanguage||navigator.language).toLowerCase()
}

$(()=>{ // Initialization
	if (!storageAvailable("localStorage")){
		// No local storage
		// @TODO: Do sth, e.g. only preview
		return;
	}

	// Storages are all strings
	// Use Stringify / Unstringify
	initEvents();
	initItems();
});

function initItems(){
	let noteString=localStorage.getItem("local_notes");
	_N.initPage(noteString);
}

function initEvents(){
	$("#note_preview_new").on("click",event=>{ // new note
		let newNoteItem=new Note();
		_N.addNewNote(newNoteItem);
	});
	/*$("#note_editor_save").on("click",event=>{ // save this note
		_N.saveLocalActiveNote();
	});*/
	$("#note_editor_back").on("click",event=>{
		_N.saveLocalActiveNote();
		_N.shiftToPreview();
	});
	$("#textarea_wrapper").on("click",event=>{
		$("#note_editor").focus();
	});
	autosize($("#note_editor"));
	setFontSize();
	// Read System settings: fonts, interface when closed, ...

	$(window).on("unload",event=>{
		if(_N.isEditing()){
			_N.saveLocalActiveNote();
		}
		localStorage.setItem("local_notes",_N.getAllNotesJSON());
		// consider recover next time
	});
	/*$(window).on("resize",event=>{
		setFontSize();
	});*/ // On smartphone browser, this changes when keyboard pops out
}

function setFontSize(){
	if(browser.versions.mobile||browser.versions.android||browser.versions.ios){ // Mobile environment
		$("body").css("font-size","2.5em");
	}
	else{
		$("body").css("font-size","1.25em");
	}
}

/**
 * The policy is:
 * Do not store item that is same to the Github
 * Store: (1) New notes (2) Notes modified from an issue and not posted (3) Notes that is made private
 * 
 * Some of the downloaded issues (other owners') can not be edited, but can be previewed.
 */

function storageAvailable(type){
	try{
		let storage=window[type];
		let x='__storage_test__';
		storage.setItem(x,x);
		storage.removeItem(x);
		return true;
	}
	catch(e){
		return false;
	}
}