// let Data = (function () {
//     let list = [];

//     let Item = function (content) {
//         this.content = content;
//     };
//     Item.prototype.finished = false;

//     let addItem = function (content) {
//         let item = new Item(content);
//         list.push(item);
//     }
//     let removeItem = function (item_index) {
//         list.splice(item_index, 1);
//     }
//     let checkItem = function (item_index) {
//         let current_item = list[item_index];
//         current_item.finished = !current_item.finished;
//     }

//     return {list: list, Item: Item, addItem: addItem, removeItem: removeItem, checkItem: checkItem};
// })();


// let controller = (function () {
//     let addItem = function (e) {
//         e.preventDefault();

//         let add_value = add_input.value;
//         console.log('add item:', add_value);

//         Data.addItem(add_value);
//         UI.showList(Data.list);
//         form.reset();
//     };
//     let searchItem = function () {
//         let search_value = search_input.value;
//         console.log('search item:', search_value);

//         let filter_list = Data
//             .list
//             .filter(function (item) {
//                 return item
//                     .content
//                     .indexOf(search_value) > -1;
//             });
//         UI.showList(filter_list);
//     }

//     let removeItem = function (e) {
//         if (e.target.tagName !== 'I')
//             return;

//         let item_id = e.target.parentNode.parentNode.id;
//         let item_index = item_id.split('-')[1];
//         console.log('remove item:', item_index);

//         Data.removeItem(item_index);
//         UI.showList(Data.list);
//     }

//     let checkItem = function (e) {
//         if (e.target.tagName !== 'INPUT')
//             return;

//         let item_id = e.target.parentNode.parentNode.id;
//         let item_index = item_id.split('-')[1];
//         console.log('check item:', item_index);

//         Data.checkItem(item_index);
//         UI.showList(Data.list);

//     }

//     let form = document.forms['list-form'];
//     let add_input = form['add-item_input'];
//     let search_input = form['search-item_input'];

//     let section = document.querySelector('section');

//     form.addEventListener('submit', addItem);

//     search_input.addEventListener('input', searchItem);

//     section.addEventListener('click', removeItem);
//     section.addEventListener('change', checkItem);
// })();

// let UI = (function () {
//     let to_do_list = document.querySelector('to-do-list');
//     let finished_list = document.querySelector('.finished-list');

//     let showList = function (list) {
//         finished_list.innerHTML = '';
//         to_do_list.innerHTML = '';

//         list.forEach(function (item, i) {
//             if (!item.finished) {
//                 let to_do_item_HTML = '<li class="to-do-list__item" id= "item-' + i + '"><div cl' + 'ass="item__content">' + item.content +
//                     '</div><div class="item__action"><i cla' + 'ss="fa fa-trash" aria-hidden="true"></i><input type="checkbox"></div></li>';
//                 to_do_list.insertAdjacentHTML('afterbegin', to_do_item_HTML);

//             } else {
//                 let finished_item_HTML = '<li class="to-do-list__item" id="item-' + i + '"><div' +
//                     ' class="item__content">' + item.content + '</div><div class="item__action"><i ' +
//                     'class="fa fa-trash" aria-hidden="true"></i><input type="checkbox" checked></di' +
//                     'v></li>';
//                 finished_list.insertAdjacentHTML('afterbegin', finished_item_HTML);
//             }
//         });
//     }
//     return { showList: showList };
// })();


let Data = (function () {
    let list = [];

    let Item = function (content) {
        this.content = content;
    };
    Item.prototype.finished = false;

    let addItem = function (content) {
        let item = new Item(content);
        list.push(item);
    }
    let removeItem = function (item_index) {
        list.splice(item_index, 1);
    }
    let checkItem = function (item_index) {
        let current_item = list[item_index];
        current_item.finished = !current_item.finished;
    }

    return {list: list, Item: Item, addItem: addItem, removeItem: removeItem, checkItem: checkItem};
})();


let Controller = (function () {
    let addItem = function (e) {
        e.preventDefault();

        let add_value = add_input.value;
        console.log('add item:', add_value);

        Data.addItem(add_value);
        UI.showList(Data.list);
        form.reset();
    };
    let searchItem = function () {
        let search_value = search_input.value;
        console.log('search item:', search_value);

        let filter_list = Data
            .list
            .filter(function (item) {
                return item
                    .content
                    .indexOf(search_value) > -1;
            });
        UI.showList(filter_list);
    }
    let removeItem = function (e) {
        if (e.target.tagName !== 'I') 
            return;
        
        let item_id = e.target.parentNode.parentNode.id;
        let item_index = item_id.split('-')[1];
        console.log('remove item:', item_index);

        Data.removeItem(item_index);
        UI.showList(Data.list);
    }
    let checkItem = function (e) {
        if (e.target.tagName !== 'INPUT') 
            return;
        
        let item_id = e.target.parentNode.parentNode.id;
        let item_index = item_id.split('-')[1];
        console.log('check item:', item_index);

        Data.checkItem(item_index);
        UI.showList(Data.list);
    }

    let form = document.forms['list-form'];
    let add_input = form['add-item_input'];
    let search_input = form['search-item_input'];

    let section = document.querySelector('section');

    form.addEventListener('submit', addItem);

    search_input.addEventListener('input', searchItem);

    section.addEventListener('click', removeItem);
    section.addEventListener('change', checkItem);
})();


let UI = (function () {
    let to_do_list = document.querySelector('.to-do-list');
    let finished_list = document.querySelector('.finished-list');

    let showList = function (list) {
        finished_list.innerHTML = '';
        to_do_list.innerHTML = '';

        list.forEach(function (item, i) {
            if (!item.finished) {
                let to_do_item_HTML = '<li class="to-do-list__item" id="item-' + i + '"><div cl' +
                        'ass="item__content">' + item.content + '</div><div class="item__action"><i cla' +
                        'ss="fa fa-trash" aria-hidden="true"></i><input type="checkbox"></div></li>';
                to_do_list.insertAdjacentHTML('afterbegin', to_do_item_HTML);
            } else {
                let finished_item_HTML = '<li class="to-do-list__item" id="item-' + i + '"><div' +
                        ' class="item__content">' + item.content + '</div><div class="item__action"><i ' +
                        'class="fa fa-trash" aria-hidden="true"></i><input type="checkbox" checked></di' +
                        'v></li>';
                finished_list.insertAdjacentHTML('afterbegin', finished_item_HTML);
            }
        });
    }
    return {showList: showList};
})();