document.addEventListener('DOMContentLoaded', () => {
    const btnForm = document.querySelector('.formAddStudent'),
          inputs = document.querySelectorAll('.formInput'),
          selectsValue = document.querySelectorAll('.selectedValue'),
          sortByAnything = document.querySelectorAll('.sortBy'),
          btnResearch = document.querySelector('.btnResearch'),
          selectItems = document.querySelector('.selectItems')
    let inputFIO = inputs[0],
        inputBirthday = inputs[1],
        inputStartDate = inputs[2],
        inputFaculty = inputs[3],
        timer,
        itsTrue = [false,false,false,false],
        change,
        trueIs
    //Регулярные выражения валидации
    const regFullName = /^[А-ЯЁ][а-яё]*([-][А-ЯЁ][а-яё]*)?\s[А-ЯЁ][а-яё]*(\s[А-ЯЁ][а-яё]*)?$/
    /*Массив данных */
    const state = {
        students: [
            {
                id: 1,
                name: 'Александр',
                surname: 'Корнев',
                middleName: 'Сергеевич',
                fullName: '',
                birthDay: new Date(1957, 03, 04),
                startDate: new Date(2002, 09, 01),
                faculty: 'Аэрокосмический',
                get age() {
                    return get_current_age(this.birthDay)
                },
                get course() {
                    const year = this.startDate.getFullYear()
                    let course = new Date().getFullYear() - year
                    if (course > 4) course = 'Выпускник'
                    return course
                }
            },

            {
                id: 2,
                name: 'Олексий',
                surname: 'Попов',
                middleName: 'Братиславович',
                fullName: '',
                birthDay: new Date(1999, 03, 04),
                startDate: new Date(2007, 09, 01),
                faculty: 'Авиационный',
                get age() {
                    return get_current_age(this.birthDay)
                },
                get course() {
                    const year = this.startDate.getFullYear()
                    let course = new Date().getFullYear() - year
                    if (course > 4) course = 'Выпускник'
                    return course
                }
            },
            {
                id: 3,
                name: 'Михаил',
                surname: 'Востриков',
                middleName: 'Ильич',
                fullName: '',
                birthDay: new Date(1987, 03, 04),
                startDate: new Date(2019, 09, 01),
                faculty: 'Двигатели ЛА',
                get age() {
                    return get_current_age(this.birthDay)
                },
                get course() {
                    const year = this.startDate.getFullYear()
                    let course = new Date().getFullYear() - year
                    if (course > 4) course = 'Выпускник'
                    return course
                }
            },

            {
                id: 4,
                name: 'Василий',
                surname: 'Кирилин',
                middleName: 'Сергеевич',
                fullName: '',
                birthDay: new Date(1977, 03, 04),
                startDate: new Date(2020, 09, 01),
                faculty: 'Аэрокосмический',
                get age() {
                    return get_current_age(this.birthDay)
                },
                get course() {
                    const year = this.startDate.getFullYear()
                    let course = new Date().getFullYear() - year
                    if (course > 4) course = 'Выпускник'
                    return course
                }
            },
        ],
        birthDayValue: '',
    }
    //функции для валидации
    const validate = elem => {
        elem.previousElementSibling.style.opacity = '0'
        switch (elem.name) {
            case 'username':
                if (!regFullName.test(elem.value) && elem.value.length > 0) {
                    elem.nextElementSibling.nextElementSibling.textContent = 'Введите полное ФИО'
                    elem.nextElementSibling.nextElementSibling.classList.add('errActive')
                    itsTrue[0] = false
                }
                else if (elem.value.length === 0) {
                    elem.nextElementSibling.nextElementSibling.textContent = ''
                    elem.nextElementSibling.nextElementSibling.classList.remove('errActive')
                    itsTrue[0] = false
                }
                else {
                    elem.nextElementSibling.nextElementSibling.textContent = ''
                    elem.nextElementSibling.nextElementSibling.classList.remove('errActive')
                    elem.style.borderBottom = '2px solid green'
                    elem.previousElementSibling.style.opacity = '1'
                    itsTrue[0] = true
                }
                break
            case 'birthday':
                const date = new Date(elem.value.split('.')[2], elem.value.split('.')[1] - 1, elem.value.split('.')[0])
                console.log(date)
                const dateMin = new Date(1900, 01, 01)
                const dateMax = new Date()
                elem.style.borderBottom = '2px solid #333'
                elem.previousElementSibling.style.opacity = '0'
                if (date < dateMin) {
                    elem.nextElementSibling.nextElementSibling.textContent = 'Вам больше 100 лет?! Моё почтение...'
                    elem.nextElementSibling.nextElementSibling.classList.add('errActive')
                    itsTrue[1] = false
                }
                else if (date > dateMax) {
                    elem.nextElementSibling.nextElementSibling.textContent = 'Подождите, но вы ведь ещё не родились...'
                    elem.nextElementSibling.nextElementSibling.classList.add('errActive')
                    itsTrue[1] = false
                }
                else {
                    elem.nextElementSibling.nextElementSibling.textContent = ''
                    elem.style.borderBottom = '2px solid green'
                    elem.previousElementSibling.style.opacity = '1'
                    itsTrue[1] = true
                    elem.nextElementSibling.nextElementSibling.classList.remove('errActive')
                }
                if (isNaN(date.getFullYear()) || isNaN(date.getMonth()) || isNaN(date.getDate())) {
                    elem.nextElementSibling.nextElementSibling.textContent = ''
                    elem.style.borderBottom = '2px solid #333'
                    elem.previousElementSibling.style.opacity = '0'
                    itsTrue[1] = false
                }
                break
            case 'startDate':
                elem.style.borderBottom = '2px solid #333'
                elem.previousElementSibling.style.opacity = '0'
                elem.nextElementSibling.nextElementSibling.classList.remove('errActive')
                if (elem.value.length < 4 && elem.value.length !== 0) {
                    elem.nextElementSibling.nextElementSibling.textContent = 'Год введён неверно'
                    elem.nextElementSibling.nextElementSibling.classList.add('errActive')
                    itsTrue[2] = false
                }
                else if (elem.value > 2021) {
                    elem.nextElementSibling.nextElementSibling.textContent = 'Не спеши вперёд паровоза, напиши год, который идёт или уже прошёл'
                    elem.nextElementSibling.nextElementSibling.classList.add('errActive')
                    itsTrue[2] = false
                }
                else if (elem.value < 2000 && elem.value.length !== 0) {
                    elem.nextElementSibling.nextElementSibling.textContent = 'ВУЗ даже не открылся, а ты уже студент?)'
                    elem.nextElementSibling.nextElementSibling.classList.add('errActive')
                    itsTrue[2] = false
                }
                else if (elem.value.length == 0) {
                    elem.nextElementSibling.nextElementSibling.textContent = ''
                    elem.style.borderBottom = '2px solid #333'
                    itsTrue[2] = false
                }
                else {
                    elem.nextElementSibling.nextElementSibling.textContent = ''
                    elem.style.borderBottom = '2px solid green'
                    elem.previousElementSibling.style.opacity = '1'
                    itsTrue[2] = true
                }
                break
            case 'faculty':
                if (elem.value.length === 0) {
                    elem.style.borderBottom = '2px solid #333'
                    elem.nextElementSibling.nextElementSibling.textContent = ''
                    elem.previousElementSibling.style.opacity = '0'
                    itsTrue[3] = false
                }
                else if (elem.value.length < 4) {
                    elem.nextElementSibling.nextElementSibling.textContent = 'Название факультета не может состоять меньше чем из трёх букв'
                    itsTrue[3] = false
                }
                else {
                    elem.style.borderBottom = '2px solid green'
                    elem.nextElementSibling.nextElementSibling.textContent = ''
                    elem.previousElementSibling.style.opacity = '1'
                    itsTrue[3] = true
                }
                break
        }
    }

    const validateWhenTyping = elem => {
        switch (elem.name) {
            case 'username':
            case 'faculty':
                if (/[a-zA-Z0-9]/.test(elem.value)) {
                    elem.value = elem.value.replace(/[a-zA-Z0-9]/g, '')
                    elem.nextElementSibling.nextElementSibling.classList.add('errActive')
                    elem.nextElementSibling.nextElementSibling.textContent = "Можно писать только буквы русской Латиницы!"
                }
                else {
                    elem.nextElementSibling.nextElementSibling.classList.remove('errActive')
                    elem.nextElementSibling.nextElementSibling.textContent = ''
                }
                break
            case 'startDate':
                if (/\D/.test(elem.value)) {
                    elem.value = elem.value.replace(/\D/g, '')
                    elem.nextElementSibling.nextElementSibling.classList.add('errActive')
                    elem.nextElementSibling.nextElementSibling.textContent = "Для ввода доступны только цифры"
                }
                else {
                    elem.nextElementSibling.nextElementSibling.textContent = ''
                    elem.nextElementSibling.nextElementSibling.classList.remove('errActive')
                }
                break
        }
    }
    /*Маска дня инпута birthday*/
    function mask(event) {
        if (/[а-яa-z\/\\]/i.test(this.value)) {
            this.nextElementSibling.nextElementSibling.classList.add('errActive')
            this.nextElementSibling.nextElementSibling.textContent = "Для ввода доступны только цифры"
        }
        if (Number(this.value) > 31 && this.value.length === 2) {
            this.value = `31.`
        }
        if (Number(this.value.split('.')[1]) > 12 && this.value.length === 5) {
            this.value = `${this.value.split('.')[0]}.12.`
        }
        const keyCode = event.keyCode;
        const template = '__.__.____',
            def = template.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
        let i = 0,
            newValue = template.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
        i = newValue.indexOf("_");
        if (i !== -1) {
            newValue = newValue.slice(0, i);
        }
        let reg = template.substr(0, this.value.length).replace(/_+/g,
            function (a) {
                return `\\d{1,${a.length}}`;
            }).replace(/[\.]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 2 || keyCode > 47 && keyCode < 58) {
            this.value = newValue;
        }
    }
    /*получение возраста */
    function get_current_age(date) {
        let now = new Date()

        if (now.getMonth() >= date.getMonth()) {
            let age
            now.getDate() >= date.getDate() ? age = now.getFullYear() - date.getFullYear() : age = now.getFullYear() - date.getFullYear() - 1
            return age
        }
        else {
            return now.getFullYear() - date.getFullYear() - 1
        }
    }
    /*приписка к возраста */
    function text(age) {
        var txt;
        count = age % 100;

        if (count >= 5 && count <= 20) {
            txt = 'лет';
        }
        else {
            count = count % 10;

            if (count == 1) {
                txt = 'год';
            }
            else if (count >= 2 && count <= 4) {
                txt = 'года';
            }
            else {
                txt = 'лет';
            }
        }
        return txt;
    }
    /*Рендеринг таблицы */
    function renderTable(arr) {
        const table = document.querySelector('.tbl')
        if(!trueIs) table.innerHTML = ''
        trueIs = false
        arr.map(el => {
            const tr = document.createElement('tr')

            for (let i in el) {
                !el.fullName ? el.fullName = `${el.surname} ${el.name} ${el.middleName}` : el.fullName
                let td = document.createElement('td')

                switch (el[i]) {
                    case el.birthDay: {
                        const date = String(el.birthDay.getDate())
                        const month = String(el.birthDay.getMonth() + 1)
                        td.textContent = `${date.length === 1 ? '0' + date :
                            date}.${month.length < 2 ? '0' + month :
                                month}.${el.birthDay.getFullYear()}(${el.age} ${text(el.age)})`
                        tr.append(td)
                        break
                    }
                    case el.startDate: {
                        const year = el.startDate.getFullYear()
                        const course = new Date().getFullYear() - year

                        if (course === 4 && new Date().getMonth() > 8 || course > 4) {
                            td.textContent = `${year}-${year + 4}(Выпускник)`
                        }
                        else {
                            td.textContent = `${year}-${year + 4}(${course} курс)`
                        }
                        tr.append(td)
                        break
                    }
                    case el.fullName:
                        td.textContent = el.fullName
                        tr.append(td)
                        break

                    case el.id:
                        td.textContent = el.id
                        tr.append(td)
                        break

                    case el.faculty:
                        td.textContent = el.faculty
                        tr.append(td)
                        break

                    default:
                        break
                }
            }
            table.append(tr)
        })
    }
    window.state = state
    /*Сортировка по столбцам*/
    function sortBy(el) {
        let newArr
        switch (el.name) {

            case 'id':
                newArr = state.students.sort((a, b) => a.id > b.id ? 1 : -1)
                break
            case 'name':
                newArr = state.students.sort((a, b) => a.surname.charAt(0) > b.surname.charAt(0) ? 1 : -1)
                break

            case 'age':
                newArr = state.students.sort((a, b) => a.age > b.age ? 1 : -1)
                break

            case 'course':
                newArr = state.students.sort((a, b) => a.startDate.getFullYear() > b.startDate.getFullYear() ? 1 : -1)
                break

            case 'faculty':
                newArr = state.students.sort((a, b) => a.faculty.charAt(0) > b.faculty.charAt(0) ? 1 : -1)
                break
        }

        if (change) {
            renderTable(newArr.reverse())
            change = false
        }
        else {
            renderTable(newArr)
            change = true
        }
    }
    /*функция, возвращающая placeholder */
    function onValueForPlaceholder() {
        const opt = getSelectedElement(selectsValue)
        switch (opt.value) {
            case 'surname':
                btnResearch.placeholder = 'Поиск по фамилии...'
                break
            case 'age':
                btnResearch.placeholder = 'Поиск по возрасту...'
                break
            case 'course':
                btnResearch.placeholder = 'Поиск по курсу...'
                break
            case 'faculty':
                btnResearch.placeholder = 'Поиск по факультету...'
                break
        }
        return btnResearch.placeholder
    }
    /*Функция возвращающая выбранный options */
    function getSelectedElement(arr) {
        for (const el of arr) {
            if (el.selected) return el
        }
    }
    renderTable(state.students)
    //Добавление в массив нового тела
    btnForm.addEventListener('submit', (ev) => {
      ev.preventDefault()

      for (let elem of inputs) {

          if (elem.value === '') {
              elem.nextElementSibling.nextElementSibling.classList.add('errActive')
              elem.nextElementSibling.nextElementSibling.textContent = 'Данное поле не заполнено!'
              itsTrue = false
          }
          else {
              elem.nextElementSibling.nextElementSibling.textContent = ''
              elem.nextElementSibling.nextElementSibling.classList.remove('errActive')
          }
      }
      let resolution = itsTrue.every((el) => el === true)
      if (resolution) {
          const formAction = document.querySelector('.popup')
          const arrFIO = inputFIO.value.split(' ')
          const addObject = {
              id: state.students.length + 1,
              name: arrFIO[1],
              surname: arrFIO[0],
              fullName: '',
              middleName: arrFIO[2] || '',
              birthDay: new Date(inputBirthday.value.split('.')[2], inputBirthday.value.split('.')[1] -1, inputBirthday.value.split('.')[0]),
              startDate: new Date(inputStartDate.value),
              faculty: inputFaculty.value,
              get age() {
                  return get_current_age(this.birthDay)
              },
              get course() {
                  const year = this.startDate.getFullYear()
                  let course = new Date().getFullYear() - year
                  if (course > 4) course = 'Выпускник'
                  return course
              }
          }

          for (let inp of inputs) {
              inp.value = ''
              inp.previousElementSibling.style.opacity = '0'
              inp.style.borderBottom = "2px solid #333"
          }
          state.students = [...state.students, addObject]
          formAction.style.transform = 'translateY(-500%)'
          document.body.classList.remove('overlay')
          trueIs = true
          renderTable([addObject])
      }
      return
  })

    // Обработчик события на инпуты
    for (let elem of inputs) {

        if (elem.name === "birthday") {
            elem.addEventListener("input", mask);
            elem.addEventListener("focus", mask);
            elem.addEventListener("blur", () => {
                validate(elem)
            });
        }
        else {
            elem.addEventListener('blur', () => {
                validate(elem)
            })
            elem.addEventListener('input', () => {
                validateWhenTyping(elem)
            })
        }
    }
    /*Сортировка по столбцам */
    for (const element of sortByAnything) {
        element.addEventListener('click', () => {
            sortBy(element)
        })
    }
    /*Поиск по таблице */
    btnResearch.onfocus = function () {
        selectItems.style.opacity = 1
        selectItems.style.zIndex = 999
        btnResearch.placeholder = onValueForPlaceholder()
    }
    selectItems.addEventListener('focus', () => {
        selectItems.style.opacity = 1
        selectItems.style.zIndex = 999
        btnResearch.placeholder = onValueForPlaceholder()

    })

    btnResearch.addEventListener('blur', () => {
        selectItems.style.opacity = 0
        selectItems.style.zIndex = -999
        btnResearch.value = ''
        btnResearch.placeholder = ''
        renderTable(state.students)
    })
    selectItems.addEventListener('blur', () => {
        selectItems.nextElementSibling.placeholder = ''
        selectItems.style.opacity = 0
        selectItems.style.zIndex = -999
        
    })
    selectItems.addEventListener('click', () => {
        btnResearch.placeholder = onValueForPlaceholder()
    })
    btnResearch.addEventListener('input', () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            const opt = getSelectedElement(selectsValue)
            let newState
            switch (opt.value) {
                case 'surname':
                    newState = state.students.filter(function (a) {
                        if (a.fullName.toLowerCase().startsWith(btnResearch.value.toLowerCase())) return true

                    })
                    break
                case 'age':
                    newState = state.students.filter(function (a) {
                        if (String(a.age).startsWith(btnResearch.value)) return true

                    })
                    break
                case 'course':
                    newState = state.students.filter(function (a) {
                        if (String(a.course).toLowerCase().startsWith(btnResearch.value.toLowerCase())) return true

                    })
                    break
                case 'faculty':
                    newState = state.students.filter(function (a) {
                        if (a.faculty.toLowerCase().startsWith(btnResearch.value.toLowerCase())) return true

                    })
                    break
            }
            renderTable(newState)
        }, 400)

    })
})

/*Забавы ради: Drag'n drop */
const trs = document.querySelectorAll('.circle')
for (let i of trs) {
    i.onmousedown = function (event) { // (1) отследить нажатие
        i.ondragstart = function () {
            return false;
        };
        i.style.zIndex = 1000
        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            i.style.left = pageX - i.offsetWidth / 5 + 'px';
            i.style.top = pageY - i.offsetHeight / 5 + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        i.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            i.onmouseup = null;
        };
    };
}
