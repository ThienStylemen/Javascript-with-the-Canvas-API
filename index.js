const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const cellsHorizontal = 4;
const cellsVertical = 3;
const width = this.innerWidth;  // window
const height = this.innerHeight;
const unitLengthX = width/cellsHorizontal;
const unitLengthY = height/cellsVertical;

const engine = Engine.create();
const { world } = engine;
// disable gravity
engine.world.gravity.y = 0;

const render = Render.create({
    element: document.body, // where we want to show
    engine: engine,
    options: {
        wireframes: true,   //wireframes is just to modify a shown map 
        width,  //:800, // key and the value are the same
        height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);

//walls
const walls = [
    Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
  ];
World.add(world, walls);

// // Maze generation

// map: Calls a defined callback function on each element of an array, 
//and returns an array that contains the results.

const grid = Array(cells)
    .fill(null)
    .map(() => Array(cells).fill(false)); //we're going to generate a brand new and different array

// console.log(grid);
// grid[0].push(true); // console.log before and after this line have the same result!!!
// console.log(grid);

const verticals = Array(cells)
    .fill(null)
    .map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
    .fill(null)
    .map(() => Array(cells).fill(false));

// console.log(verticals);
// console.log(horizontals);

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const shuffle = (arr) => {
    let counter = arr.length;

    while (counter > 0) {

        let index = Math.floor(Math.random() * counter);
        counter--;

        //swap
        temp = arr[index];
        arr[index] = arr[counter];
        arr[counter] = temp;
    }
    return arr;
}

const stepThroughCell = (row, col) => {    // recursive func
    // if i have visited at cells [row,col], then return
    if (grid[row][col] === true) return;
    // Mark this cells as being visited
    grid[row][col] = true;
    // Assemble randomly-ordered list of neighbors
    const neighbors = shuffle([
        [row - 1, col, 'up'],
        [row, col + 1, 'right'],
        [row + 1, col, 'down'],
        [row, col - 1, 'left']
    ]);
    // For each neighbor ...
    for (let neighbor of neighbors) {
        const [nextRow, nextCol, direction] = neighbor;
        //see if that neighbors is out of bounds
        if (nextRow < 0 || nextRow >= cells || nextCol < 0 || nextCol >= cells)
            continue;
        // if we have visited that neighbor, continue to the next 
        if (grid[nextRow][nextCol])
            continue;
        // remove a wall from either horizontals or vericals
        // vericals
        if (direction === 'left')
            verticals[row][col - 1] = true;
        else if (direction === 'right')
            verticals[row][col] = true;
        else if (direction === 'up')
            horizontals[row - 1][col] = true;
        else if (direction === 'down')
            horizontals[row][col] = true;
        // visit that next cell
        stepThroughCell(nextRow, nextCol);
    }
};

stepThroughCell(startRow, startColumn);
// console.log(grid);

// loop array true: no wall, false: wall
horizontals.forEach( (row, rowIndex)=>{ 
            // each element called open and it's either true or false
    row.forEach( (open, colIndex)=>{
        if (open) return;   // don't draw anything
            /*There is no way to stop or break a forEach() loop other than by throwing an 
            exception. If you need such behavior, the forEach() method is the wrong tool. */
        const wall = Bodies.rectangle(
            // colIndex*unitLength + unitLength/2,
            colIndex*unitLength + unitLength/2,
            rowIndex*unitLength + unitLength,
            unitLength,
            5,
            {
                label: 'wall',
                isStatic: true
            }
        );
        World.add(world, wall);
    });
});

verticals.forEach( (row, rowIndex) =>{
    row.forEach((open, colIndex)=>{
        if (open) return;
        const wall = Bodies.rectangle(
            colIndex*unitLength + unitLength,
            rowIndex*unitLength + unitLength/2,
            5,
            unitLength,
            {
                label: 'wall',
                isStatic: true
            }
        );
        World.add(world, wall);
    })
})

//Goal
const goal = Bodies.rectangle(
    width -unitLength/2,
    width -unitLength/2,
    unitLength*0.7,
    unitLength*0.7,
    {
        isStatic: true,
        label: 'goal'
    }
)
World.add(world,goal);

//ball
const ball = Bodies.circle(
    unitLength/2,
    unitLength/2,
    unitLength/3,
    // option object
    {
        label: 'ball'
    }
);
World.add(world,ball);

//research javascript keycode
document.addEventListener('keydown', event =>{
    const {x,y} = ball.velocity; // if ball stop, x=y=0
    // console.log(x,y);
    if(event.keyCode ===87){
        Body.setVelocity(ball, {x, y: y -5});//x=x, y=y-5
    }
    if(event.keyCode ===68){
        Body.setVelocity(ball, {x: x +5, y});
    } 
    if(event.keyCode ===83){
        Body.setVelocity(ball, {x, y: y+5});
    } 
    if(event.keyCode ===65){
        Body.setVelocity(ball, {x: x-5, y});
    } 
})

// Win condition, and we need to destructure Events = Matter
Events.on(engine,'collisionStart', event =>{
    // console.log(event);
    // collision have bodyA and bodyB elements 
    event.pairs.forEach( (collision)=>{
        // console.log(collision);
        const labels= ['goal','ball'];
        if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)){
            // console.log('USER WIN');   
            world.gravity.y=1;
            world.bodies.forEach(body =>{
                if (body.label==='wall'){
                    Body.setStatic(body, false);
                }
            });
        }
    });
});
