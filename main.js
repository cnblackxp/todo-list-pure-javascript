/**
 *  1- Add Validation for addItem() check if label is empty
 *  2- Add toggleCheckedItem() command
 *  3- change formatList() implementation similar to formatCommands() using .map() method
 *  4- check for user inputing (-1) to abort current command
 *  5- abstract adding item into a a seprate method
 * 
 */

(function main() {
    const list = [
        { label: 'yaser', checked: true },
        { label: 'omar', checked: true },
        { label: 'saif', checked: false },
    ];


    const commands = [
        { label: 'view list', execute: displayItems },
        { label: 'add item' , execute: addItem },
        { label: 'edit item' , execute: editItem },
        { label: 'remove item' , execute: removeItem },
        { label: 'exit app' , execute: false },
        // TODO: 2
    ]

    function formatCommands() {
        return commands.map(function(element, index) {
            return `${index+1} - ${element.label}`;
        }).join('\n');
    }


    function isChecked(checked) {
        return checked ? "[x]" : "[ ]";
    }

    function formatList() {
        // TODO: 3
        let str = "";
        for (let i = 0; i < list.length; i ++) {
            str += (i+1) + " " + isChecked(list[i].checked) + " " + list[i].label + "\n";
        }
        return str;
    }

    function selectIndex(message) {
        // TODO: 4
        return parseInt(prompt(message)) - 1;
    }


    function addItem() {
        const label = prompt("enter new label");
        // TODO: 1
        const checked = false;
        const item = {
            label,
            checked,
        }
        list.push(item);
        // TODO: 5
    }

    function displayItems() {
        const formattedList = formatList();
        alert(formattedList);
    }

    function removeItem() {
        const indexOfItemToRemove = selectIndex(formatList());
        list.splice(indexOfItemToRemove, 1);
    }

    function editItem() {
        const indexOfItemToEdit = selectIndex(formatList());

        const itemToBeEditted = list[indexOfItemToEdit];
        const oldLabel = itemToBeEditted.label;
        const newLabel = prompt('enter new label', oldLabel);

        itemToBeEditted.label = newLabel;
    }

    function start() {
        const indexOfCommandToBeExecuted = selectIndex(formatCommands());
        if (commands[indexOfCommandToBeExecuted]) {
            if (commands[indexOfCommandToBeExecuted].execute) {
                commands[indexOfCommandToBeExecuted].execute();
            } else {
                return;
            }
        }
        start();
    }

    start();
})();