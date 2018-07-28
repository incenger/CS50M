const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

function newTodo() {
  itemCountSpan.innerText = Number(itemCountSpan.innerText) + 1 ;
  uncheckedCountSpan.innerText = Number(uncheckedCountSpan.innerText) + 1;
}

function deleteTodo() {
  const currentItem = Number(itemCountSpan.innerText)
  const currentUncheckedItem = Number(uncheckedCountSpan.innerText)
  if (currentItem > 0) {
    itemCountSpan.innerText = currentItem - 1 ;
    if (currentUncheckedItem > 0) uncheckedCountSpan.innerText = currentUncheckedItem - 1 ;
  } 
  else alert("No more task to delete!")
}
