import {Category} from "./Category";
import {Note} from "./Note";

let notes1: Note[] = [new Note('title49','content1','cat1'), new Note('title2','content2','cat1')];
let notes2: Note[] = [new Note('title3','content3','cat2'), new Note('title4','content4','cat2')];
let notes3: Note[] = [new Note('title1','content1','cat3'), new Note('title2','content2','cat3')];
let cats: Category[] = [new Category('cat1', notes1),new Category('cat2',notes2)];



let notesDiv = document.getElementById('notesDiv') as Element;
let catDiv = document.getElementById('categoriesDiv') as Element;

let writeNoteButton = document.getElementById('writeNoteButton') as HTMLButtonElement;
writeNoteButton.addEventListener('click', writeNote);

let newCategoryButton = document.getElementById('newCategoryButton') as HTMLButtonElement;
newCategoryButton.addEventListener('click', createCategory);








function deleteNote(event: Event) {
    const item = event.target as HTMLElement;

        if(item.classList[0] === 'deleteNoteButton') {
            const note = item.parentElement as Element;
            note.remove();
        }
}



let selectedCategory: Category;


console.log(localStorage.length);

let categories: Category[] = getCategories();

renderCategories(categories);
renderNotes(categories[0]);


function writeNote(e: Event) {

    let newNoteTitle: string = (document.getElementById('newNoteTitle')as HTMLInputElement).value;
    (document.getElementById('newNoteTitle')as HTMLInputElement).value = '';
    let newNoteContent: string = (document.getElementById('noteContentArea')as HTMLInputElement).value;
    (document.getElementById('noteContentArea')as HTMLInputElement).value = '';
    let newNote = new Note(newNoteTitle, newNoteContent, selectedCategory.name);

    saveNote(newNote);
}

function createCategory() {
    let catNameInput = document.getElementById('newCategoryName')as HTMLInputElement;
    let categoryName: string = catNameInput.value;
    catNameInput.value = '';

    let notes: Note[] = [];

    let newCategory: Category = new Category(categoryName,notes);

    selectedCategory = newCategory;

    saveCategory(newCategory);

}

function updateCategory(category: Category) {
    categories.forEach(cat => {
        if(cat.name == category.name){
            cat = category;
        }
        localStorage.setItem('categories',JSON.stringify(categories));

    });
}

function saveCategory(category: Category) {

    categories.push(category);
    localStorage.setItem('categories',JSON.stringify(categories));
    reRenderCategories();
    reRenderNotes(selectedCategory);

}

function getCategories(): Category[] {

    if(localStorage.length !== 0) {
        let cats: any = localStorage.getItem('categories');
        return JSON.parse(cats);
    }else {
        return []
    }

}

function renderCategories(categories: Category[]){


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
        deleteCatButton.addEventListener('click',deleteCategory);

        categoryDiv.appendChild(selectedIndicatorDiv);
        categoryDiv.appendChild(deleteCatButton);
        categoryDiv.appendChild(categoryTitle);
        categoryDiv.appendChild(notesCount);
        catDiv.appendChild(categoryDiv);

        categoryDiv.addEventListener('click',clickCategory);

    });

}

function reRenderCategories(){
    catDiv.innerHTML = '';
    renderCategories(categories);
}

function reRenderNotes(cat: Category){
    notesDiv.innerHTML = '';
    renderNotes(cat);
}

function renderNotes(category: Category) {

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
        deleteNoteButton.innerHTML = '<i class="fa fa-light fa-trash"></i>'
        deleteNoteButton.addEventListener('click',deleteNote);


        noteDiv.appendChild(noteTitle);
        noteDiv.appendChild(noteContent);
        noteDiv.appendChild(deleteNoteButton);
        notesDiv.appendChild(noteDiv);


    });

}

function clickCategory(e: Event){

    let clickedCategory = e.target as Element;

    let categoryTitle = clickedCategory.querySelector('.categoryTitle') as HTMLElement;

    let categoryName: string = categoryTitle.innerText;

    categories.forEach(cat => {
        if(categoryName == cat.name){
            console.log(cat.name)
            selectedCategory = cat;

        }

    });

    reRenderNotes(selectedCategory);
}

function saveNote(newNote: Note) {

    selectedCategory.notes.push(newNote);

    updateCategory(selectedCategory);

    reRenderNotes(selectedCategory);
    reRenderCategories();


}

function deleteCategory(event: Event) {
    const item = event.target as HTMLElement;

    if(item.classList[0] === 'deleteCatButton') {
        const category = item.parentElement as HTMLElement;
        // @ts-ignore
        let categoryTitle: string = category.querySelector('.categoryTitle').innerText;
        category.remove();

    }


}