'use strict';

$(document).ready(init);

function init(){
  var dbTodos = getTodos();
  renderTodos(dbTodos);
  $('.add-todo').on('click', newTodo);
  $('tbody').on('click', '.delete-todo', deleteTodo);
  $('tbody').on('click', 'div.toggle-group', isCompleted);
  $('tbody').on('click', '.edit-todo', editTodo);
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
    let $tr = $('tr.template').clone();
    $tr.removeClass('template');
    $tr.addClass('todo');
    $tr.find('.index').text(todo.index);
    $tr.find('.task').text(todo.task);
    $tr.find('.due-date').text(todo.dueDate);
    let state = todo.completed;
    let on_off = '';
    state ? on_off = 'on' : on_off = 'off';

    // $tr.find('input').bootstrapToggle(on_off);
    return $tr;
  });
  let newTodoClone = $('tr.new-todo').clone();
  let templateClone = $('tr.template').clone();
  $('tbody').empty();
  $('tbody').append(newTodoClone).append(templateClone).append($todos);

};
function isCompleted(){
  let dbTodos = getTodos();
  let $index = $(this).parent().parent().parent().index();
  let index = $index-2;
  let $state = dbTodos[index].completed;
  let newState = !$state;
  let on_off = '';
  newState ? on_off = 'off' : on_off = 'on';

  dbTodos[index].completed = newState;
  writeTodo(dbTodos);
  // $(`tr.todo:eq(${index})`).find('div.btn-success').bootstrapToggle(on_off);
  let newBtn = $(this);
};
function editTodo(){
  let dbTodos = getTodos();
  let $index = $(this).parent().parent().index();
  let $row = $(this).parent().parent();
  let index = $index-2;
  let task4edit = dbTodos[index].task;
  let date4edit = dbTodos[index].dueDate;
  $row.find('input.edit-task').removeClass('hidden');
  $row.find('input.edit-date').removeClass('hidden');
  $row.find('.cancel-edit-col').removeClass('hidden');
  $row.find('.save-edit-col').removeClass('hidden');

  $row.find('p.task').addClass('hidden');
  $row.find('p.due-date').addClass('hidden');
  $row.find('button.edit-todo').addClass('hidden');
  $row.find('button.delete-todo').addClass('hidden');
  //
  $row.find('.is-complete').addClass('hidden');
  $row.find('.edit-delete-col').addClass('hidden');
  //
  $row.find('input.edit-task').val(task4edit);
  $row.find('input.edit-date').val(date4edit);

  $('.save-edit').on('click', saveEdit);
  $('.cancel-edit').on('click', cancelEdit);
};

function saveEdit(){
  let $row = $(this).parent().parent();
  let dbTodos = getTodos();
  let $index = $(this).parent().parent().index();
  let index = $index-2;
  dbTodos[index].task = $(`tr.todo:eq(${index})`).find('input.edit-task').val();
  dbTodos[index].dueDate = $(`tr.todo:eq(${index})`).find('input.edit-date').val();
  $row.find('input.edit-task').addClass('hidden');
  $row.find('input.edit-date').addClass('hidden');
  $row.find('.cancel-edit-col').addClass('hidden');
  $row.find('.save-edit-col').addClass('hidden');

  $row.find('p.task').removeClass('hidden');
  $row.find('p.due-date').removeClass('hidden');
  $row.find('button.edit-todo').removeClass('hidden');
  $row.find('button.delete-todo').removeClass('hidden');
  $row.find('.is-complete').removeClass('hidden');
  $row.find('.edit-delete-col').removeClass('hidden');
  writeTodo(dbTodos);
  renderTodos(dbTodos);
};

function cancelEdit(){
  let $row = $(this).parent().parent();
  $row.find('input.edit-task').addClass('hidden');
  $row.find('input.edit-date').addClass('hidden');
  $row.find('.cancel-edit-col').addClass('hidden');
  $row.find('.save-edit-col').addClass('hidden');

  $row.find('p.task').removeClass('hidden');
  $row.find('p.due-date').removeClass('hidden');
  $row.find('button.edit-todo').removeClass('hidden');
  $row.find('button.delete-todo').removeClass('hidden');
  $row.find('.is-complete').removeClass('hidden');
  $row.find('.edit-delete-col').removeClass('hidden');
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

function fixToggle(newBtn){
  console.log(newBtn);
  // let newBtnClone = newBtn.parent().clone();
  // newBtn.parent().parent().addClass('new-toggle');
  // newBtn.parent().parent().empty();
  // $('tr.todo').find('td.new-toggle').append(newBtnClone);
  //
};
