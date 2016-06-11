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
  let Todos = getTodos();
  let newTaskObj = {
    index     : Todos.length + 1,
    task      : $('input.new-task.form-control').val(),
    dueDate      : $('input.new-due-date.form-control').val(),
    complete  : false
  };
  console.log(newTaskObj);
  Todos.push(newTaskObj);
  postTodo(Todos);
  renderTodos(Todos);
}; 

function getTodos(){
  var stringOfTodos = localStorage.todos;
  try {
    var dbTodos = JSON.parse(stringOfTodos);
  } catch(err) {
    var dbTodos = [];
  };
  return dbTodos; // returns array;
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

  $('tbody').empty();
  $('tbody').append($todos);
};

function deleteTodo(){
  console.log('deleteTodo');
  var dbTodos = getTodos();
  let index = $(this).parent().parent().index();  // +2 for Dom Index. -2 for localStorage index.
  index -= 2;
  console.log('index: ', index);
  dbTodos.splice(index, 1);

  postTodo(dbTodos);
  renderTodos(dbTodos);
  return;
};
