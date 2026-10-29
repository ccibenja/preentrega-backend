const testAPI = async () => {
    try {
        console.log("1. Probando GET a todos los servicios...");
        const resGet = await fetch('http://localhost:8080/api/services');
        console.log(await resGet.json());

        console.log("\n2. Probando POST para crear un servicio...");
        const resPost = await fetch('http://localhost:8080/api/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Limpieza Facial",
                description: "Limpieza profunda",
                duration: 60,
                price: 2500,
                category: "salud",
                available: true
            })
        });
        const nuevoServicio = await resPost.json();
        console.log("Respuesta:", nuevoServicio);

        console.log("\n3. Probando GET con filtros (?category=salud)...");
        const resFiltro = await fetch('http://localhost:8080/api/services?category=salud');
        console.log(await resFiltro.json());

    } catch (error) {
        console.error("Error en la prueba:", error);
    }
};

testAPI();