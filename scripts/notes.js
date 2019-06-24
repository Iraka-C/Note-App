let _N={
	// public modules
	initPage:function(noteString){
		let noteJson=this._.parseNote(noteString);
		if(noteJson){ // There's item
			for(let v of noteJson){
				this._.addNewNote(new Note(v));
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
	},
	// Note that the following functions set display to FLEX !!
	shiftToEdit:function(noteItem){
		this.setActiveNoteItem(noteItem);
		$("#note_preview_container").css({"display":"none"});
		$("#note_edit_container").css({"display":"flex"});
		autosize.update($("#note_editor")); // Trigger auto resize
	},
	shiftToPreview:function(){
		this.setActiveNoteItem(null);
		$("#note_preview_container").css({"display":"flex"});
		$("#note_edit_container").css({"display":"none"});
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
				status:v.status
			});
			break;

		//case "public":
		//case "discarded":
		default:
		}
		return JSON.stringify(itemsToSave);
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

