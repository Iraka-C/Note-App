let _N={
	// public modules
	initPage:function(noteString){
		let noteJson=this._.parseNote(noteString);
		if(noteJson){ // There's item
			let lastEdit=null;
			for(let v of noteJson){
				let noteItem=new Note(v);
				if(noteItem.isEdit){
					lastEdit=noteItem;
				}
				this._.addNewNote(noteItem);
			}
			if(lastEdit){ // Open the file not closed yet
				this.shiftToEdit(lastEdit);
			}
		}
	},
	addNewNote:function(noteItem){
		this._.addNewNote(noteItem);
	},
	setActiveNoteItem:function(noteItem){
		this._.nowEditingItem=noteItem;
		if(noteItem){
			$("#note_editor_title").val(noteItem.title);
			$("#note_editor").val(noteItem.content);
		}
		else{
			$("#note_editor_title").val("null");
			$("#note_editor").val("");
		}
	},
	saveLocalActiveNote:function(){
		let v=this._.nowEditingItem;
		v.setTitle($("#note_editor_title").val());
		v.setContent($("#note_editor").val());
		// If is remote file, consider public => modified / discarded
	},
	// Note that the following functions set display to FLEX !!
	shiftToEdit:function(noteItem){
		this.setActiveNoteItem(noteItem);
		noteItem.isEdit=true;
		$("#note_preview_container").css({"display":"none"});
		$("#note_edit_container").css({"display":"flex"});
		autosize.update($("#note_editor")); // Trigger auto resize
	},
	shiftToPreview:function(){
		let nowActiveItem=this._.nowEditingItem;
		nowActiveItem.isEdit=false;
		nowActiveItem.$preview.detach();
		// Move the just edited note to the first
		$("#note_preview_list").prepend(nowActiveItem.$preview);
		this.setActiveNoteItem(null);
		$("#note_preview_container").css({"display":"flex"});
		$("#note_edit_container").css({"display":"block"});
	},
	shiftToMarkdownPreview:function(){
		$("#note_editor").css({"display":"none"});
		$("#markdown_preview").css({"display":"block"});
		// Buttons
		$("#note_editor_menu").css({"display":"none"});
		$("#note_markdown_menu").css({"display":"block"});
		// Render // Async?
		let mdHTML=marked($("#note_editor").val());
		$("#markdown_preview").html(mdHTML);
	},
	shiftToMarkdownEdit:function(){
		$("#note_editor").css({"display":"inline-block"});
		$("#markdown_preview").css({"display":"none"});
		// Buttons
		$("#note_editor_menu").css({"display":"block"});
		$("#note_markdown_menu").css({"display":"none"});
		$("#markdown_preview").html("");
	},
	removeNote:function(noteItem){
		this._.removeNote(noteItem);
		// online issues
	},

	getAllNotesJSON:function(){
		let itemsToSave=[];
		for(let v of this._.allNoteItems)switch(v.status){
		case "private":
		case "modified":
			itemsToSave.push({ // k-v pais to save
				title:v.title,
				content:v.content,
				remoteOrigin:v.remoteOrigin,
				status:v.status,
				isEdit:v.isEdit
			});
			break;

		//case "public":
		//case "discarded":
		default:
		}
		return JSON.stringify(itemsToSave);
	},

	isEditing:function(){
		return this._.nowEditingItem?true:false;
	},

	// private modules
	_:{
		allNoteItems:[],
		nowEditingItem:null,
		parseNote:function(noteString){
			return JSON.parse(noteString);
		},
		addNewNote:function(noteItem){ // every new note added goes through here
			this.allNoteItems.push(noteItem);
			$("#note_preview_list").prepend(noteItem.$preview);
		},
		removeNote:function(noteItem){ // every old note removed goes through here
			noteItem.status="discarded";
			noteItem.$preview.remove();
		}
	}
};

