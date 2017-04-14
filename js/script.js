let ToyRobotUtils = ((dcoument, window) => {

    /* Initial events binding */
    let commandsObj = [];
    let placed = false;
    let bindEvents = () => {
        let commandBtn = document.getElementById('formButton');

        commandBtn.addEventListener('click', function(e) {
            ['error', 'report'].forEach(div => {
                let node = document.getElementById(div);
                while (node.hasChildNodes()) {
                    node.removeChild(node.firstChild);
                }
            })
            report(commands.value.split(/\r?\n/));
        }, false);
    }

    /* set up object to manage direction states */
    let directions = {
        'north': { key: 'north', left: 'west', right: 'east' },
        'south': { key: 'south', left: 'east', right: 'west' },
        'west': { key: 'west', left: 'south', right: 'north' },
        'east': { key: 'east', left: 'north', right: 'south' },
    };

    /* set up object to manage state of toy robot positions */
    let state = {
        x: 0,
        y: 0,
        d: directions['north'].key,
        axis: directions['north'].axis,
        get getState() {
            return {
                x: this.x,
                y: this.y,
                d: this.d
            }
        },
        set setState(obj) {
            this.x = obj.x;
            this.y = obj.y;
            this.d = directions[obj.d].key;
        }
    };

    /* get current state */
    let getState = () => {
        return state.getState
    }

    /* set or update state  */
    let setState = (x, y, d) => {
        state.setState = { x: x, y: y, d: d }
    }

    /* On move. No change of direction */
    let move = () => {
        console.log(placed);
        if (placed) {
            let newObj = getState();
            let currentDirection = newObj.d;

            switch (currentDirection) {
                case 'north':
                    ++newObj.y;
                    break;
                case 'south':
                    --newObj.y;
                    break;
                case 'east':
                    ++newObj.x;
                    break;
                case 'west':
                    --newObj.x;
                    break;
                default:
            }
            //console.log(newObj);
            setState(newObj.x, newObj.y, currentDirection)


            try {
                checkPositionValidity(newObj.x, newObj.y);
            } catch (error) {
                handleError(new Error('Error'))
            }
        }
    }

    /* On Turn. No change of position. only direction  */
    let turn = (turndirection) => {
        if (placed) {
            let newObj = getState();
            let currentDirection = newObj.d;
            let newDirection = directions[currentDirection][turndirection];
            setState(newObj.x, newObj.y, newDirection);
        }
    }

    /* validate position */
    let checkPositionValidity = (x, y) => {
        if ((x < 0) || (y < 0) || (x >= 5) || (y >= 5)) {
            throw new Error('Item out of bounds');
        } else {
            return true;
        }
    }

    /* placement */
    let place = (x, y, direction) => {
        try {
            if (checkPositionValidity(x, y)) {
                placed = true;
                setState(x, y, direction)
            }

        } catch (error) {
            handleError(error)
        }
    }

    /* reporting */
    let generateReport = () => {
        try {
            let state = getState();
            if (placed && checkPositionValidity(state.x, state.y)) {
                let string = []
                for (let key in state) {
                    if (state.hasOwnProperty(key)) {
                        string.push(state[key]);
                    }
                }
                let reportBlock = document.getElementById('report');
                let span = document.createElement('span');
                let t = document.createTextNode(string.join(', ').toUpperCase());
                span.appendChild(t);
                reportBlock.appendChild(span);
                placed = false;
            }
        } catch (error) {
            handleError(new Error('Invalid result'))
        }
    }

    let report = (commands) => {
        if (commands) {
            commands.forEach(command => {
                command = command.toLowerCase();
                if (command.startsWith('place')) {
                    command = command.replace('place', '');
                    command = command.replace(/\s/g, '');
                    let params = command.split(',');
                    place(+params[0], +params[1], params[2].replace(/["']/g, ''));
                } else if (command.startsWith('move')) {
                    move();
                } else if (command.startsWith('left')) {
                    turn('left')
                } else if (command.startsWith('right')) {
                    turn('right')
                } else if (command.startsWith('report')) {
                    generateReport();
                } else {
                    handleError(new Error('Invalid Input'));
                }
            })
        }

    }

    /* error handling */
    let handleError = (err) => {
        let errorBlock = document.getElementById('error');
        //errorBlock.innerText = err;
        let span = document.createElement('span');
        let t = document.createTextNode(err);
        span.appendChild(t);
        errorBlock.appendChild(span);
    }

    /* bootstrap and bind events */
    let init = () => {
        bindEvents()
    }

    return {
        init: init,
        place: place,
        getState: getState,
        setState: setState,
        move: move,
        turn: turn,
        report: report,
        checkPositionValidity: checkPositionValidity
    }

})