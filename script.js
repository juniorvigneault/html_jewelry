window.onload = () => {
  const { Engine, World, Bodies, MouseConstraint, Mouse } = Matter;

  const engine = Engine.create();
  const world = engine.world;

  // one physics body -> one div
  const radius = 15;
  const ballBody = Bodies.rectangle(150, 100, 20, 20, { restitution: 0.8 });
  World.add(world, ballBody);

  // invisible floor so it bounces (no extra divs)
  const floor = Bodies.rectangle(
    innerWidth / 2,
    innerHeight - 10,
    innerWidth,
    20,
    { isStatic: true }
  );
  World.add(world, floor);

  let mouse = Mouse.create(document.body),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
      },
    });

  World.add(world, mouseConstraint);

  const el = document.getElementById("checkbox1");

  function loop(t) {
    console.log(ballBody.angle);
    Engine.update(engine, 1000 / 60); // fixed timestep for simplicity
    el.style.transform = `translate(${ballBody.position.x}px, ${ballBody.position.y}px) translate(-50%, -50%) rotate(${ballBody.angle}rad)`;

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
};
