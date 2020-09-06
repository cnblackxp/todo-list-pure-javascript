const state = {
  list: [
    {label: 'javascript', checked: true},
    {label: 'browser', checked: false},
    {label: 'node', checked: false},
    {label: 'react', checked: false},
  ]
}

const actions = {
  'view list': viewList,
  'add item': addItem,
  'remove item': removeItem,
  'edit item': editItem,
  // 'check item': checkItem,
  // 'uncheck item': uncheckItem,
  'exit app': false,
}

const formatItem = (item, index) => 
  `  ${index + 1} [${item.checked ? 'x' : ' '}] ${item.label}`

const formatList = () => 
  '\nlist:\n' +
  state.list.map(formatItem).join('\n')

function mainMenu() {
  let mainMenuMessage = 'choose option:\n';
  let i = 0;
  for (let label in actions) {
    mainMenuMessage +=  `  ${++i}- ${label}\n`;
  }
  return parseInt(prompt(mainMenuMessage)) - 1;
}

function viewList() {
  alert(formatList());
}

function addItem() {
  const label = prompt(`enter item ${state.list.length + 1} label (-1 to cancel):`);
  if (label === '-1') return;
  const newItem = { label, checked: false };
  state.list = [
    ...state.list,
    newItem,
  ];
  console.log('added new item', newItem);
}

function selectItem(message) {
  const index = parseInt(prompt(message + formatList())) - 1;
  if (state.list[index] === undefined) selectItem();
  return index;
}

function removeItem() {
  const index = selectItem('enter item index to remove:');
  // state.list.splice(index);
  state.list = [
    ...state.list.slice(0, index),
    ...state.list.slice(index + 1)
  ];
  console.log('removed item', index);
}

function editItem() {
  const index = selectItem('enter item index to edit:');
  const label = prompt('enter new label', state.list[index].label);
  const newList = [...state.list];
  newList[index] = {...newList[index], label};
  state.list = newList;
  // state.list = state.list.map((item, i) => i == index ? {...item, label} : item);
  console.log('edited item', index);
}

function main() {
  console.log('started app');
  const option = mainMenu();
  const actionsLabels = Object.keys(actions);
  if (actionsLabels[option]) {
    if (actions[actionsLabels[option]]) {
      actions[actionsLabels[option]]();
    } else {
      return;
    }
  }
  main();
}

main();