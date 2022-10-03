System.register("Note", [], function (exports_1, context_1) {
    "use strict";
    var Note;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Note = class Note {
                constructor(title, content, categoryName) {
                    this.title = title;
                    this.content = content;
                    this.categoryName = categoryName;
                }
                getTitle() {
                    return this.title;
                }
                setTitle(title) {
                    this.title = title;
                }
                getContent() {
                    return this.content;
                }
                setContent(content) {
                    this.content = content;
                }
                getCategoryName() {
                    return this.categoryName;
                }
                setCategoryName(categoryName) {
                    this.categoryName = categoryName;
                }
            };
            exports_1("Note", Note);
        }
    };
});
System.register("Category", [], function (exports_2, context_2) {
    "use strict";
    var Category;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            Category = class Category {
                constructor(name, notes) {
                    this.name = name;
                    this.notes = notes;
                }
                getName() {
                    return this.name;
                }
                setName(name) {
                    this.name = name;
                }
                getNotes() {
                    return this.notes;
                }
                setNotes(notes) {
                    this.notes = notes;
                }
            };
            exports_2("Category", Category);
        }
    };
});
System.register("app", ["Category", "Note"], function (exports_3, context_3) {
    "use strict";
    var Category_1, Note_1, notes1, notes2, notes3, cats, notesDiv, catDiv, writeNoteButton, newCategoryButton, selectedCategory, categories;
    var __moduleName = context_3 && context_3.id;
    function deleteNote(event) {
        const item = event.target;
        if (item.classList[0] === 'deleteNoteButton') {
            const note = item.parentElement;
            note.remove();
        }
    }
    function writeNote(e) {
        let newNoteTitle = document.getElementById('newNoteTitle').value;
        document.getElementById('newNoteTitle').value = '';
        let newNoteContent = document.getElementById('noteContentArea').value;
        document.getElementById('noteContentArea').value = '';
        let newNote = new Note_1.Note(newNoteTitle, newNoteContent, selectedCategory.name);
        saveNote(newNote);
    }
    function createCategory() {
        let catNameInput = document.getElementById('newCategoryName');
        let categoryName = catNameInput.value;
        catNameInput.value = '';
        let notes = [];
        let newCategory = new Category_1.Category(categoryName, notes);
        selectedCategory = newCategory;
        saveCategory(newCategory);
    }
    function updateCategory(category) {
        categories.forEach(cat => {
            if (cat.name == category.name) {
                cat = category;
            }
            localStorage.setItem('categories', JSON.stringify(categories));
        });
    }
    function saveCategory(category) {
        categories.push(category);
        localStorage.setItem('categories', JSON.stringify(categories));
        reRenderCategories();
        reRenderNotes(selectedCategory);
    }
    function getCategories() {
        if (localStorage.length !== 0) {
            let cats = localStorage.getItem('categories');
            return JSON.parse(cats);
        }
        else {
            return [];
        }
    }
    function renderCategories(categories) {
        categories.forEach(cat => {
            let categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category');
            let categoryTitle = document.createElement('h3');
            categoryTitle.classList.add('categoryTitle');
            categoryTitle.innerText = cat.name;
            let notesCount = document.createElement('p');
            notesCount.classList.add('notesCount');
            notesCount.innerText = String(cat.notes.length);
            let selectedIndicatorDiv = document.createElement('div');
            selectedIndicatorDiv.classList.add('selectedCategory');
            let deleteCatButton = document.createElement('button');
            deleteCatButton.classList.add('deleteCatButton');
            deleteCatButton.innerHTML = '<i class="fa fa-light fa-trash"></i>';
            deleteCatButton.addEventListener('click', deleteCategory);
            categoryDiv.appendChild(selectedIndicatorDiv);
            categoryDiv.appendChild(deleteCatButton);
            categoryDiv.appendChild(categoryTitle);
            categoryDiv.appendChild(notesCount);
            catDiv.appendChild(categoryDiv);
            categoryDiv.addEventListener('click', clickCategory);
        });
    }
    function reRenderCategories() {
        catDiv.innerHTML = '';
        renderCategories(categories);
    }
    function reRenderNotes(cat) {
        notesDiv.innerHTML = '';
        renderNotes(cat);
    }
    function renderNotes(category) {
        let notes = category.notes;
        notes.forEach(note => {
            let noteDiv = document.createElement('div');
            noteDiv.classList.add('note');
            let noteTitle = document.createElement('h3');
            noteTitle.classList.add('noteTitle');
            noteTitle.innerText = note.title;
            let noteContent = document.createElement('p');
            noteContent.classList.add('noteContent');
            noteContent.innerText = note.content;
            let deleteNoteButton = document.createElement('button');
            deleteNoteButton.classList.add('deleteNoteButton');
            deleteNoteButton.innerHTML = '<i class="fa fa-light fa-trash"></i>';
            deleteNoteButton.addEventListener('click', deleteNote);
            noteDiv.appendChild(noteTitle);
            noteDiv.appendChild(noteContent);
            noteDiv.appendChild(deleteNoteButton);
            notesDiv.appendChild(noteDiv);
        });
    }
    function clickCategory(e) {
        let clickedCategory = e.target;
        let categoryTitle = clickedCategory.querySelector('.categoryTitle');
        let categoryName = categoryTitle.innerText;
        categories.forEach(cat => {
            if (categoryName == cat.name) {
                console.log(cat.name);
                selectedCategory = cat;
            }
        });
        reRenderNotes(selectedCategory);
    }
    function saveNote(newNote) {
        selectedCategory.notes.push(newNote);
        updateCategory(selectedCategory);
        reRenderNotes(selectedCategory);
        reRenderCategories();
    }
    function deleteCategory(event) {
        const item = event.target;
        if (item.classList[0] === 'deleteCatButton') {
            const category = item.parentElement;
            // @ts-ignore
            let categoryTitle = category.querySelector('.categoryTitle').innerText;
            category.remove();
        }
    }
    return {
        setters: [
            function (Category_1_1) {
                Category_1 = Category_1_1;
            },
            function (Note_1_1) {
                Note_1 = Note_1_1;
            }
        ],
        execute: function () {
            notes1 = [new Note_1.Note('title49', 'content1', 'cat1'), new Note_1.Note('title2', 'content2', 'cat1')];
            notes2 = [new Note_1.Note('title3', 'content3', 'cat2'), new Note_1.Note('title4', 'content4', 'cat2')];
            notes3 = [new Note_1.Note('title1', 'content1', 'cat3'), new Note_1.Note('title2', 'content2', 'cat3')];
            cats = [new Category_1.Category('cat1', notes1), new Category_1.Category('cat2', notes2)];
            notesDiv = document.getElementById('notesDiv');
            catDiv = document.getElementById('categoriesDiv');
            writeNoteButton = document.getElementById('writeNoteButton');
            writeNoteButton.addEventListener('click', writeNote);
            newCategoryButton = document.getElementById('newCategoryButton');
            newCategoryButton.addEventListener('click', createCategory);
            console.log(localStorage.length);
            categories = getCategories();
            renderCategories(categories);
            renderNotes(categories[0]);
        }
    };
});
//# sourceMappingURL=bundle.js.map