(function (DOM, doc, win) {
  'use strict';
  var numbers = [];
  var price;
  var maxNumber;
  var range;
  var type;
  var color;
  var total = 0;
  function app() {
    return {
      init: function init() {
        this.buildGameButtons();
        this.initEvents();
      },

      initEvents: function initEvents() {
        var $submitButton = new DOM('[data-js="submit"]');
        var $clearButton = new DOM('[data-js="clear"]');
        var $completeButton = new DOM('[data-js="complete"]');

        $submitButton.on('click', this.handleSubmit);
        $clearButton.on('click', this.handleClear);
        $completeButton.on('click', this.handleComplete);
      },

      selectNumber: function selectNumber(num) {
        if (!numbers.includes(num)) {
          if (numbers.length < maxNumber) {
            numbers.push(num);
            app().updateSelectedNumbers();
          } else {
            win.alert("You've already added all the numbers");
          }
        } else {
          win.alert("You've already added this number");
        }
      },

      updateSelectedNumbers: function updateSelectedNumbers() {
        var $numberList = new DOM('[data-js="number-list"]');
        $numberList.get()[0].innerHTML = '';

        for (let i = 0; i < range; i++) {
          let b = doc.createElement('button');
          let buttonValue = i + 1;

          if (numbers.includes(buttonValue)) {
            b.setAttribute('class', 'selected-button');
          } else {
            b.setAttribute('class', 'unselected-button');
          }

          b.innerHTML = buttonValue;
          b.onclick = function () {
            app().selectNumber(buttonValue);
          };
          $numberList.get()[0].appendChild(b);
        }
      },

      handleClear: function handleClear() {
        numbers = [];
        app().updateSelectedNumbers();
      },

      handleComplete: function handleComplete() {
        if (range) {
          while (numbers.length < maxNumber) {
            let min = Math.ceil(1);
            let max = Math.floor(range);
            let x = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!numbers.includes(x)) numbers.push(x);
          }
        }

        app().updateSelectedNumbers();
      },

      buildGameButtons: function buildGameButtons() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', './games.json');
        ajax.send();

        ajax.addEventListener('readystatechange', function () {
          if (ajax.readyState === 4) {
            var response = JSON.parse(ajax.response);
            var $choseGame = new DOM('[data-js="chose-game"]');

            response.types.forEach((e) => {
              let button = doc.createElement('button');
              button.setAttribute('class', 'type-button');
              button.style.color = e.color;
              button.style['border-color'] = e.color;
              // if (e.type == 'Lotofácil') {
              //   button.className = 'lotofacil';
              // } else if (e.type == 'Quina') {
              //   button.className = 'quina';
              // }

              button.innerHTML = e.type;
              button.onclick = function (event) {
                event.preventDefault();
                new DOM('[data-js="complete"]').get()[0].style.visibility =
                  'visible';
                new DOM('[data-js="clear"]').get()[0].style.visibility =
                  'visible';
                new DOM('[data-js="submit"]').get()[0].style.visibility =
                  'visible';

                price = e.price;
                maxNumber = e['max-number'];
                range = e.range;
                numbers = [];
                type = e.type;
                color = e.color;

                let $gameTitle = new DOM('[data-js="game-title"]');
                $gameTitle.get()[0].innerHTML =
                  '<span>NEW BET</span> FOR ' + e.type.toUpperCase();

                let $fillBet = new DOM('[data-js="fill-bet"]');
                $fillBet.get()[0].innerHTML = `<strong>Fill your bet</strong><p>${e.description}</p>`;

                app().updateSelectedNumbers();

                var $numberList = new DOM('[data-js="number-list"]');
                $numberList.get()[0].innerHTML = '';

                for (let i = 0; i < range; i++) {
                  let b = doc.createElement('button');
                  b.setAttribute('class', 'unselected-button');
                  let buttonValue = i + 1;
                  b.innerHTML = buttonValue;
                  b.onclick = function () {
                    app().selectNumber(buttonValue);
                  };
                  $numberList.get()[0].appendChild(b);
                }
              };

              $choseGame.get()[0].appendChild(button);
            });
          }
        });
      },

      handleSubmit: function handleSubmit(event) {
        if (numbers.length != maxNumber) {
          win.alert('Mark all ' + maxNumber + ' numbers');
        } else {
          var $cartItemsDiv = new DOM('[data-js="cart-items"]');
          let div = doc.createElement('div');
          div.setAttribute('class', 'cart-item');

          let span = doc.createElement('span');
          span.innerHTML = type;
          span.style.color = color;

          let p = doc.createElement('p');
          p.appendChild(span);

          total += price;
          app().updatePrice();
          var formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          p.innerHTML += formatter.format(price);

          let temp = doc.createElement('div');
          temp.setAttribute('class', 'item-text');
          // if (type == 'Lotofácil') {
          //   temp.className = 'item-lotofacil';
          // } else if (type == 'Quina') {
          //   temp.className = 'item-quina';
          // }

          temp.style['border-color'] = color;

          numbers = numbers.sort(function (a, b) {
            return a - b;
          });

          let xp = doc.createElement('p');
          xp.appendChild(doc.createTextNode(numbers));
          xp.style['word-wrap'] = 'break-word';
          xp.style['maxInlineSize'] = '21rem';
          temp.appendChild(xp);
          temp.appendChild(p);
          var deleteButton = document.createElement('button');
          deleteButton.innerHTML = '<i class="material-icons">delete</i>';
          deleteButton.setAttribute('class', 'delete');
          var handleDeletion = function (p) {
            deleteButton.addEventListener('click', function () {
              total -= p;
              app().updatePrice();
              this.closest('div').remove();
            });
          };

          handleDeletion(price);

          div.appendChild(deleteButton);
          div.appendChild(temp);

          $cartItemsDiv.get()[0].appendChild(div);
          app().handleClear();
        }
      },

      updatePrice: function updatePrice() {
        var $cartTotal = new DOM('[data-js="cart-total"]');
        var formatter = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        if (total == 0) {
          $cartTotal.get()[0].innerHTML = '<span></span>YOUR CART IS EMPTY :(';
        } else {
          $cartTotal.get()[0].innerHTML =
            '<span>CART</span> TOTAL: ' + formatter.format(total);
        }
      },
    };
  }

  app().init();
})(window.DOM, document, window);
