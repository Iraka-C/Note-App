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
		this.title=("title" in jsonNote)?jsonNote.title:"Note "+(new Date().toLocaleDateString());
		this.content=("content" in jsonNote)?jsonNote.content:""; // Not Edited at first
		this.remoteOrigin=("remoteOrigin" in jsonNote)?jsonNote.remoteOrigin:"";
		this.status=("status" in jsonNote)?jsonNote.status:"private"; // is synchronized with the remote origin
		this.isEdit=("isEdit" in jsonNote)?jsonNote.isEdit:false; // is this the file during last edit?
		this.isMarkdown=("isMarkdown" in jsonNote)?jsonNote.isMarkdown:false; // is this markdown file?

		// View Initialization
		this.$preview=$("<div><hr></div>");
		let $previewBoxContainer=$("<div></div>");
		$previewBoxContainer.addClass("preview_block");

		
		let $previewTitle=$("<div></div>");
		if(this.title.match(/^\s*#\s*/)){ // a markdown
			$previewTitle.text(this.title.replace(/^\s*#\s*/,"")); // prevent XSS attack
			$previewTitle.prepend("<span class='md_title'>#&nbsp;</span>");
		}
		else{
			$previewTitle.text(this.title);
		}
		$previewTitle.addClass("preview_title");
		let $deleteButton=$("<div>&times;</div>");
		$deleteButton.addClass("delete_button");
		$previewBoxContainer.append($previewTitle);
		$previewBoxContainer.append($deleteButton);
		this.$preview.append($previewBoxContainer);
		this._initEvent();
	}
	
	setTitle(title){
		if(this.title==title){
			// Nothing to do
			return;
		}
		this.title=title;

		let $p=this.$preview.find(".preview_title");
		if(title.match(/^\s*#\s*/)){ // a markdown
			$p.text(title.replace(/^\s*#\s*/,"")); // prevent XSS attack
			$p.prepend("<span class='md_title'>#&nbsp;</span>");
		}
		else{
			$p.text(title);
		}

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

	setMarkdown(isMarkdown_){
		this.isMarkdown=isMarkdown_;
	}

	_initEvent(){
		this.$preview.on("click",event=>{
			_N.shiftToEdit(this);
		});
		this.$preview.find(".delete_button").on("click",event=>{
			if(confirm("Do you want to DELETE this note?")){
				_N.removeNote(this);
			}
			return false; // prevent from entering the preview
		});
	}
}