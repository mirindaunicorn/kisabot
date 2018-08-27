// типы данных:
integer = 1;
float = 1.345;
string = 'adrthtufy124';
array = [1, 1.234, 'trgeds'];
boolean = true / false;

/* операторы:
- логические; (&& - и; || - или; ! - не)
- арифметические; (x=y+1; x=y-1; x=y++(инкремент); x=--y(дикремент); x=y%1)
- операторы сравнения; (x == '1'; x != 7; x === 1; x !== '7'; x<7; x>7; x >= 7; x <= 7)
- операторы присваивания; (x = y; x += y; x -= y; x *= y, x /= y; x %= y)
*/

// конструкция функции:
function nameFunction (argument1, argument2, argument3) {
    argument1 = 0;
    argument2 = [1, 2, 3];
    argument3 = '456';
};

console.log(nameFunction)

// в тело функции могут вставляться конструкции, которые при запуске функции будут работать

//конструкции:

//условное предложение, вариант1
function zzz (a) {
    let x;
      if (a < 10) {
      x = 'abc'
      }
      else {
      x = 'xyz'
    };
      return x;
    };
    console.log (zzz (9))
    console.log (zzz (11))


    
    // итерация
    let x = ['a', 'b', 'c', 'd'];
    for (let i of x) {
        console.log(i);
    };

  

let y = ['a', 'b', 'c', 'd'];
    for (let i in y) {
        console.log(i);
    };