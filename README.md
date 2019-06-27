# Note-App

A small notebook on webpage using WebStorage. Fits the layout of smartphones.

You can try it [Here](https://iraka-c.github.io/Note-App/index.html).

Using 3<sup>rd</sup>-party repos:

* [Autosize](http://www.jacklmoore.com/autosize/) for auto resizing the `<textarea>` in editor.
* [Marked.js](https://marked.js.org/) for markdown support.
* [JSXSS](https://jsxss.com/en/index.html) for XSS attack filtering.

## Version 2019.06.27

Filtered XSS attack in markdown file.

Version 2019.06.26
-----

New functions:
1. Newly viewed note will be placed at the top. (but not next time when reopen the window)
2. Add markdown preview with marked.js.
3. Delete warning.

Version 2019.06.24
-----
Functions:
1. Create/Delete a note at the main panel.
2. Click on a note to edit it. You can edit the title or contents.
3. Click on back to save it.
4. Auto. recover the last edit status. (not at the position)

TODOs
-----
1. Auto scrolling to the last edit position.
2. GitHub adaptation.
3. Syntax highlight.
4. Folder management.
5. Undo/Redo override.
6. Font size/style customize.
7. Remaining local storage space warning.
