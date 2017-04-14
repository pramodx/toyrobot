let ToyRobotUtils = ((dcoument, window) => {

    /* Initial events binding */
    let bindEvents = () => {
        let commandBtn = document.getElementById('formButton');

        commandBtn.addEventListener('click', function(e) {
            console.log(commands);
            console.log(commands.value);
        }, false);
    }

    let directions = {
        'north': 1,
        'south': -1,
        'west': -1,
        'east': 1
    };

    let state = {
        x: 0,
        y: 0,
        d: directions['north'],
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
            this.d = directions[obj.d]
        }
    };

    let getState = () => {
        return state.getState
    }

    let setState = (x, y, d) => {
        state.setState = { x: x, y: y, d: d }
    }

    let move = () => {
        let newObj = getState();
        let currentDirection = directions[newObj.d];

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
        console.log(newObj);
        setState(newObj.x, newObj.y, newObj.d)

        try {
            checkPositionValidity(newObj.x, newObj.y);
        } catch (error) {
            handleError(error)
        }
    }

    let turn = () => {

    }

    let checkPositionValidity = (x, y) => {
        if ((x < 0) || (y < 0) || (x >= 5) || (y >= 5)) {
            throw new Error('Item out of bounds');
        } else {
            return true;
        }
    }

    let place = (x, y, direction) => {
        try {
            checkPositionValidity(x, y);
            setState(x, y, d)
        } catch (error) {
            handleError(error)
        }
    }

    let handleError = (err) => {
        let errorBlock = document.getElementById('error').createElement('span');
        errorBlock.innerText = err;
    }

    let init = () => {
        bindEvents()
    }

    return {
        init: init,
        place: place,
        getState: getState,
        setState: setState,
        move: move,
        checkPositionValidity: checkPositionValidity
    }

})