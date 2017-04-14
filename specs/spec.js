describe('ToyRobotTests', function() {

    beforeEach(() => {
        toyRobotUtils = ToyRobotUtils()
    });

    describe('1.When toy robot is placed', () => {

        it('should throw error if toy topples off table', () => {
            expect(() => {
                toyRobotUtils.place(0, 5, 'east')
            }).toThrowError(Error);
        });

        it('should correctly place robot if position x and y are between 0 and 4', () => {
            expect(toyRobotUtils.checkPositionValidity(0, 3, 'north')).toBeTruthy();
        });

        it('should return updated current state', () => {
            toyRobotUtils.setState(0, 3, 'south')
            expect(toyRobotUtils.getState().x).toBe(0);
            expect(toyRobotUtils.getState().y).toBe(3);
            expect(toyRobotUtils.getState().d).toBe(-1);
        });

    });

    describe('2.When toy is moved', () => {

        beforeEach(() => {
            var directions = {
                'north': { val: 1, axis: 'y' },
                'south': { val: -1, axis: 'y' },
                'west': { val: -1, axis: 'x' },
                'east': { val: 1, axis: 'x' }
            };
        })

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

    })



});