const { Engine, Render, Runner, World, Bodies} = Matter;

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
