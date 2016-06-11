'use strict';

$(document).ready(init);

function init(){
  localStorage.length ? renderNames() : null;
  $('button.ls-num-btn')    .on('click', getNumber);
  $('button.ls-names-btn')  .on('click', renderNames);
  $('button.submit-names')  .on('click', addName);
  $('blockquote.names')   .on('click', 'i.delete-name', deleteName);    // delegated event listener.
  $('button.btn.btn-danger').on('click', clearStorage);

};

// var $numBlock = $('blockquote.num')[0].textContent;
function clearStorage(){
  localStorage.clear();
  $('blockquote.names').empty();
  $('blockquote.num').empty();
}

function getNumber(){
  let numStr = localStorage.num;
  let num = parseInt(numStr) || 0;  // if no info is found there, initialize it to 0
  num++;                            // increment either result by 1;
  // store numbers to local storage
  localStorage.num = JSON.stringify(num);   // stringify the number we got.
  $('blockquote.num')[0].textContent = num;
};

function addName(){
  $('blockquote').empty();
  var dbNames;
  !localStorage.length ? dbNames = [] : dbNames = JSON.parse(localStorage.names);


  let $newName = $('input.new-name').val();
  let newName = $newName;
  $newName = '';

  dbNames.push(newName);
  localStorage.names = JSON.stringify(dbNames);

  var $nameList = $('<ul>').addClass('name-list text-left');
  dbNames.map(name => {
    let $editBtn = $('<i>').addClass('btn btn-sm btn-info glyphicon glyphicon-edit delete-name text-right');
    let $delBtn  = $('<i>').addClass('btn btn-sm btn-danger glyphicon glyphicon-trash edit-name');
    let $newName = $('<li>').text(name).append($editBtn).append($delBtn);
    $nameList.append($newName);
  });
  $('blockquote.names').append($nameList);
};



function deleteName(){
  debugger;
  console.log('DELETE');
  let index = $(this).parent().index();
  let lsNames = JSON.parse(localStorage.names);
  lsNames.splice(index, 1);
  localStorage.names = JSON.stringify(lsNames);
}



function renderNames(fromDelete){
  // if($('blockquote.names').children().length !== 0){
  //   return
  // };
  var dbNames = JSON.parse(localStorage.names);
  var $nameList = $('ul.name-list');
  dbNames.map(name => {
    let $editBtn = $('<i>').addClass('btn btn-sm btn-info glyphicon glyphicon-edit edit-name text-right');
    let $delBtn  = $('<i>').addClass('btn btn-sm btn-danger glyphicon glyphicon-trash delete-name');
    let $newName = $('<li>').text(name).append($editBtn).append($delBtn);
    $nameList.append($newName);
  });

  $('blockquote.names').append($nameList);
};
