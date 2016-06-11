'use strict';

// TODO
// - create editTodo()
// - create saveEdit()
// - create isComplete()
// - create deleteTodo()


$(document).ready(init);

function init(){
  var dbTodos = getTodos();
  console.log('dbTodos: ', dbTodos);
  renderTodos(dbTodos);

  $('.add-todo').on('click', newTodo);
  $('tbody').on('click', '.delete-todo',deleteTodo);
  $('.save-new-todo').on('click', saveTodo);
};

function newTodo(){
  $('.new-todo').removeClass('hidden'); // shows the new-todo row
};

function saveTodo(){
  let dbTodos = getTodos();
  let newTaskObj = {
    index     : dbTodos.length + 1,
    task      : $('input.new-task.form-control').val(),
    dueDate      : $('input.new-due-date.form-control').val(),
    complete  : false
  };
  console.log(newTaskObj);
  dbTodos.push(newTaskObj);
  postTodo(dbTodos);
  renderTodos(dbTodos);
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

function postTodo(todos){
  let newTodos = JSON.stringify(todos);
  localStorage.todos = newTodos;
};

function renderTodos(todos){
  console.log('rendering: ', todos);
  var $todos = todos.map(todo => {
    console.log('todo index: ', todo.index);
    let $tr = $('.template').clone();
    $tr.removeClass('template');
    $tr.addClass('task');
    $tr.find('.index').text(todo.index);
    $tr.find('.task').text(todo.task);
    $tr.find('.due-date').text(todo.dueDate);
    $tr.find('.complete.radio').prop('checked', true);
    return $tr;
  });

  let newTodoClone = $('tr.new-todo').clone();
  let templateClone = $('tr.template').clone();
  $('tbody').empty().append(newTodoClone).append(templateClone).append($todos);
};

// function deleteTodo(){
//   console.log('deleteTodo');
//   var dbTodos = getTodos();
//   let index = $(this).parent().parent().index();  // +2 for Dom Index. -2 for localStorage index.
//   index -= 2;
//   console.log('index: ', index);
//   dbTodos.splice(index, 1);
//
//   postTodo(dbTodos);
//   renderTodos(dbTodos);
//   return;
// };
