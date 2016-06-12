'use strict';

// TODO

$(document).ready(init);

function init(){
  var dbTodos = getTodos();
  renderTodos(dbTodos);
  $('.add-todo').on('click', newTodo);
  $('tbody').on('click', '.delete-todo',deleteTodo);
  $('tbody').on('click', '.toggle-group', isCompleted);
};
function getTodos(){
  var todosStr = localStorage.todos;
  var dbTodos;
  try {
    dbTodos = JSON.parse(todosStr);
  } catch(err) {
    dbTodos = [];
  };
  return dbTodos; // array
};
function writeTodo(todos){
  let newTodos = JSON.stringify(todos);
  localStorage.todos = newTodos;
};
function newTodo(){
  $('.new-todo').removeClass('hidden'); // shows the new-todo row
  $('.save-new-todo').on('click', saveTodo);
  $('.cancel-new-todo').on('click', cancelTodo);

};
function saveTodo(){
  let dbTodos = getTodos();
  let newTaskObj = {
    index     : dbTodos.length + 1,
    task      : $('input.new-task').val(),
    dueDate   : $('input.new-due-date').val(),
    completed : false
  };
  $('input.new-task').val('');
  $('input.new-due-date').val(''),
  $('.new-todo').addClass('hidden');
  dbTodos.push(newTaskObj);
  writeTodo(dbTodos);
  renderTodos(dbTodos);
};
function cancelTodo(){
  console.log('cancel');
  $('input.new-task').val('');
  $('input.new-due-date').val(''),
  $('.new-todo').addClass('hidden');
};
function renderTodos(todos){
  let $todos = [];
  todos.map(todo => {
    let $tr = $('.template').clone();
    $tr.removeClass('template');
    $tr.addClass('task');
    $tr.find('.index').text(todo.index);
    $tr.find('.task').text(todo.task);
    $tr.find('.due-date').text(todo.dueDate);
    debugger;
    !todo.completed ? $tr.find('input.is-complete').bootstrapToggle('on') : $tr.find('input.is-complete').bootstrapToggle('off') ;
    return $todos.push($tr);
  });
  let newTodoClone = $('tr.new-todo').clone();
  let templateClone = $('tr.template').clone();
  $('tbody').empty();
  $('tbody').append(newTodoClone).append(templateClone).append($todos);
};
function deleteTodo(){
  var dbTodos = getTodos();
  let $index = $(this).parent().parent().index();  // +2 for Dom Index. -2 for localStorage index.
  let index = 0;
  $index ===  2 ? index = 0 : index = $index - 2;
  dbTodos.splice(index, 1);
  writeTodo(dbTodos);
  renderTodos(dbTodos);
};

function isCompleted(){
  console.log('completed');
  let dbTodos = getTodos();
  let $index = $(this).parent().parent().parent().index();
  let index = $index-2;

  let $state =  $(this).parent().parent().find('input').prop('checked');  // false for new completion.
  if(!$state === false) return;                                           // if It's already been completed exit function.
  $(this).parent().parent().find('input').prop('checked', true);          // if not, then change it to completed.
  dbTodos[index].completed = true;                                        // change completed status in LocalStorage.
  writeTodo(dbTodos);                                                     // saving to local stoarge.
  $(this).parent().parent().find('input').bootstrapToggle('off');         // update the current render in the table.  (off === completed. on === incomplete.)

  // $(this).bootstrapToggle('toggle');

};
