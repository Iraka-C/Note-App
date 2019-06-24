class Note{
	/**
	 * construct an object
	 * @param {json object} jsonNote
	 * {title,content,remoteOrigin,status}
	 * title: string
	 * status: "private",
	 *         "public",
	 *         "modified" (public but modified at local),
	 *         "discarded" (this copy is not used and won't be saved)
	 */
	constructor(jsonNote){
		jsonNote=jsonNote||{}; // Make sure that it's an Object
		this.title=("title" in jsonNote)?jsonNote.title:"Untitled";// "+Date.now();
		this.content=("content" in jsonNote)?jsonNote.content:""; // Not Edited at first
		this.remoteOrigin=("remoteOrigin" in jsonNote)?jsonNote.remoteOrigin:"";
		this.status=("status" in jsonNote)?jsonNote.status:"private"; // is synchronized with the remote origin

		// View Initialization
		this.$preview=$("<div><hr></div>");
		this.$preview.addClass("preview_block");
		let $previewTitle=$("<div>"+this.title+"</div>");
		$previewTitle.addClass("preview_title");
		let $deleteButton=$("<div>Delete</div>");
		$deleteButton.addClass("delete_button");
		this.$preview.append($previewTitle);
		this.$preview.append($deleteButton);
		this._initEvent();
	}
	
	setTitle(title){
		if(this.title==title){
			// Nothing to do
			return;
		}
		this.title=title;
		this.$preview.children(".preview_title").text(title);

		// Online Content Manipulation
		//this.isSynced=false;
		if(this.remoteOrigin){
			// Do sth
		}
	}

	/**
	 * Set synchronization status
	 * @param {boolean} isSynced Is the note synchronized with the remote
	 */
	setSynced(isSynced){
		//this.isSynced=isSynced;
	}

	setContent(content){
		if(this.content==content){
			// Nothing to do
			return;
		}
		this.content=content;

		// Online Content Manipulation
		//this.isSynced=false;
		if(this.remoteOrigin){
			// Do sth
		}
	}

	_initEvent(){
		this.$preview.on("click",event=>{
			_N.shiftToEdit(this);
		});
		this.$preview.children(".delete_button").on("click",event=>{
			alert("delete?");
			_N.removeNote(this);
		});
	}
}