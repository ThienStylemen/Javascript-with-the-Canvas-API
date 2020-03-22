const { Engine, Render, Runner, World, Bodies } = Matter;

const cells = 3;
const width = 600;
const height = 600;

const engine = Engine.create();
const { world } = engine;

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
    Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
];

World.add(world, walls);

// // Maze generation

// map: Calls a defined callback function on each element of an array, 
//and returns an array that contains the results.

const grid = Array(cells)
    .fill(null)
    .map(() => Array(cells).fill(false)); //we're going to generate a brand new and different array

console.log(grid);
grid[0].push(true); // console.log before and after this line have the same result!!!
console.log(grid);

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
        [row + 1, col, 'down'] ,
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

    }
    // visit that next cell
}

stepThroughCell(1, 1);
// console.log(grid);