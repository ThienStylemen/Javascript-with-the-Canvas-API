



const {Engine, Render, Runner, World, Bodies} = Matter;

const engine = Engine.create();
const { world} = engine;

const render = Render.create({
    element: document.body, // where we want to show
    engine: engine,
    options: {
        width: 800,
        height: 600
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);

//create a shape
const shape = Bodies.rectangle(200,200,50,50, {
    isStatic: true// want to show the shape and we don't want 
    //it to ever move under any circumstance
})
World.add(world,shape); //show up
