const { Engine, Render, Runner, World, Bodies } = Matter;

const cells =5;
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
    .map(() =>  Array(cells).fill(false)); //we're going to generate a brand new and different array

console.log(grid);
grid[0].push(true); // console.log before and after this line have the same result!!!
console.log(grid);

const verticals = Array(cells)
    .fill(null)
    .map(()=> Array(cells-1).fill(false));

const horizontals = Array(cells-1)
    .fill(null)
    .map( ()=> Array(cells).fill(false));

console.log(verticals);
console.log(horizontals);