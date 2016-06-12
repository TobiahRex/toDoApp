'use strict';

$(document).ready(init);

function init(){
  var dbTodos = getTodos();
  renderTodos(dbTodos);
  $('.add-todo').on('click', newTodo);
  $('tbody').on('click', '.delete-todo', deleteTodo);
  $('tbody').on('click', '.is-complete', isCompleted);
};
function newTodo(){
  $('.new-todo').removeClass('hidden'); // shows the new-todo row
  $('.save-new-todo').on('click', saveNewTodo);
  $('.cancel-new-todo').on('click', cancelTodo);
};
function saveNewTodo(){
  let dbTodos = getTodos();
  let newTaskObj = {
    index     : dbTodos.length + 1,
    task      : $('input.new-task').val(),
    dueDate   : $('input.new-due-date').val(),
    completed : false
  };
  dbTodos.push(newTaskObj);
  $('input.new-task').val('');
  $('input.new-due-date').val(''),
  $('.new-todo').addClass('hidden');

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
  let $todos = todos.map(todo => {
    let $tr = $('.template').clone();
    $tr.removeClass('template');
    $tr.addClass('todo');
    $tr.find('.index').text(todo.index);
    $tr.find('.task').text(todo.task);
    $tr.find('.due-date').text(todo.dueDate);
    $tr.find('input').data('completed', todo.completed);
    return $tr;
    let newTodoClone = $('tr.new-todo').clone();
    let templateClone = $('tr.template').clone();
    $('tbody').empty();
  });
  $('tbody').append(newTodoClone).append(templateClone).append($todos);
};

function isCompleted(){
  let dbTodos = getTodos();
  let $index = $(this).parent().index();
  let index = $index-2;
  let $state = $('tr.todo').find('input').data('completed');
  let newState = !$state;
  let on_off = '';

  newState ? on_off = 'off' : on_off = 'on';

  $(this).find('input').bootstrapToggle(on_off);
  dbTodos[index].completed = newState;
  writeTodo(dbTodos);
  renderTodos(dbTodos);
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
