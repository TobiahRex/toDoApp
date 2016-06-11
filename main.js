'use strict';

// TODO

$(document).ready(init);

function init(){
  var dbTodos = getTodos();
  renderTodos(dbTodos);
  $('.add-todo').on('click', newTodo);
  $('.save-new-todo').on('click', saveTodo);
  // $('tbody').on('click', '.delete-todo',deleteTodo);
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
};

function saveTodo(){
console.log('save todo');
  let dbTodos = getTodos();
  let newTaskObj = {
    index     : dbTodos.length + 1,
    task      : $('input.new-task').val(),
    dueDate   : $('input.new-due-date').val(),
    complete  : false
  };
  $('input.new-task').val('');
  $('input.new-due-date').val(''),
  $('.new-todo').addClass('hidden');
  dbTodos.push(newTaskObj);
  writeTodo(dbTodos);
  renderTodos(dbTodos);
};
function renderTodos(todos){
  var $todos = todos.map(todo => {
    let $tr = $('.template').clone();
    $tr.removeClass('template');
    $tr.addClass('task');
    $tr.find('.index').text(todo.index);
    $tr.find('.task').text(todo.task);
    $tr.find('.due-date').text(todo.dueDate);
    return $tr;
  });
  let newTodoClone = $('tr.new-todo').clone();
  let templateClone = $('tr.template').clone();
  // $('tbody').empty().append(newTodoClone).append(templateClone).append($todos);
};

// function deleteTodo(){
//   console.log('deleteTodo');
//   var dbTodos = getTodos();
//   let index = $(this).parent().parent().index();  // +2 for Dom Index. -2 for localStorage index.
//   index -= 2;
//   console.log('index: ', index);
//   dbTodos.splice(index, 1);
//
//   writeTodo(dbTodos);
//   renderTodos(dbTodos);
//   return;
// };
