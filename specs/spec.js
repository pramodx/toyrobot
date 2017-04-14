describe('ToyRobotTests', function() {

    beforeEach(() => {
        toyRobotUtils = ToyRobotUtils()
    });

    describe('1.When toy robot is placed', () => {

        it('should correctly place robot if position x and y are between 0 and 4', () => {
            expect(toyRobotUtils.checkPositionValidity(0, 3, 'north')).toBeTruthy();
        });

        it('should throw error if toy topples off table', () => {
            expect(() => {
                toyRobotUtils.place(0, 5, 'east')
            }).toThrowError(Error);
        });

        it('should return updated current state', () => {
            toyRobotUtils.setState(0, 3, 'south')
            expect(toyRobotUtils.getState().x).toBe(0);
            expect(toyRobotUtils.getState().y).toBe(3);
            expect(toyRobotUtils.getState().d).toBe('south');
        });

    });

    describe('2.When toy robot is moved', () => {

        beforeEach(() => {
            toyRobotUtils.place(0, 0, 'north');
        });

        it('should increment y by 1 if movement is north', () => {
            toyRobotUtils.setState(2, 2, 'north');
            toyRobotUtils.move();
            expect(toyRobotUtils.getState().y).toBe(3);
        });

        it('should decrement y by 1 if movement is south', () => {
            toyRobotUtils.setState(2, 2, 'south');
            toyRobotUtils.move();
            expect(toyRobotUtils.getState().y).toBe(1);
        });

        it('should increment x by 1 if movement is east', () => {
            toyRobotUtils.setState(2, 2, 'east');
            toyRobotUtils.move();
            expect(toyRobotUtils.getState().x).toBe(3);
        });

        it('should decrement x by 1 if movement is west', () => {
            toyRobotUtils.setState(2, 2, 'west');
            toyRobotUtils.move();
            expect(toyRobotUtils.getState().x).toBe(1);
        });
        //Error checks
        it('should throw error if movement is invalid', () => {
            toyRobotUtils.setState(4, 4, 'east');
            expect(() => {
                toyRobotUtils.move();
            }).toThrowError(Error);
        });

    });

    describe('3. When the toy robot is turned', () => {

        beforeEach(() => {
            toyRobotUtils.place(0, 0, 'north');
        });

        it('should change direction when turned', () => {
            toyRobotUtils.setState(2, 2, 'west');
            toyRobotUtils.turn('left');
            expect(toyRobotUtils.getState().d).toBe('south');
        });

        it('should change direction when turned', () => {
            toyRobotUtils.setState(2, 2, 'south');
            toyRobotUtils.turn('right');
            expect(toyRobotUtils.getState().d).toBe('west');
        });

    });

    describe('4. When report button is clicked, should render report in DOM', () => {

        afterEach(() => {
            try {
                let state = toyRobotUtils.getState();
                if (toyRobotUtils.checkPositionValidity(state.x, state.y)) {
                    let string = [];
                    for (let key in state) {
                        if (state.hasOwnProperty(key)) {
                            string.push(state[key]);
                        }
                    }
                    expect(string.join(', ').toUpperCase()).toBe(result);
                }
            } catch (error) {
                throw error;
            }

        })

        it('Test 1:', () => {
            toyRobotUtils.place(0, 0, 'north');
            toyRobotUtils.move();
            toyRobotUtils.report();

            result = '0, 1, NORTH';
        });

        it('Test 2:', () => {
            toyRobotUtils.place(0, 0, 'north');
            toyRobotUtils.turn('left');
            toyRobotUtils.report();

            result = '0, 0, WEST';
        });

        it('Test 3:', () => {
            toyRobotUtils.place(1, 2, 'east');
            toyRobotUtils.move();
            toyRobotUtils.move();
            toyRobotUtils.turn('left');
            toyRobotUtils.move();
            toyRobotUtils.report();

            result = '3, 3, NORTH';
        });

    });

    describe('5. When movement of toy robot is outside the table bounds', () => {

        it('should throw an error', () => {
            //ERROR TEST
            expect(() => {
                toyRobotUtils.place(2, 2, 'north');
                toyRobotUtils.move();
                toyRobotUtils.move();
                toyRobotUtils.move();
                toyRobotUtils.report();
            }).toThrowError();
        });
    });
});