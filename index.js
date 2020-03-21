const { Engine, Render, Runner, World, Bodies } = Matter;

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

// Maze generation

// map: Calls a defined callback function on each element of an array, 
//and returns an array that contains the results.

const grid = Array(3)
    .fill(null)
    .map(() =>  Array(3).fill(false)); //we're going to generate a brand new and different array
console.log(grid);
grid[0].push(true); // console.log before and after this line have the same result!!!
console.log(grid);

/*we are creating one single array and then throwing it in at every location in
So in memory there's only one in the array that we made a change to this in array would affect every index
*/
const grid2 = Array(3)
    .fill([false,false,false]);
console.log(grid2);
grid2[0].push(true);// console.log before and after this line have the same result!!!
console.log(grid2);
