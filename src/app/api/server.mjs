import express from 'express';
import connection from './db.mjs';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());


app.get("/usuarios/:id", (req, res) => {
    const id = req.params.id;

    connection.query(`SELECT * FROM prueba.usuarios WHERE id = ${id};`, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error al consultar la base de datos', title: "Operación Incorrecta" });
            return;
        }

        if (results.length === 0) {
            // Si no se encontró ningún usuario con el ID especificado, devuelve un código de estado 404 (No encontrado).
            res.status(404).json({ error: 'Usuario no encontrado', title: "Operación Incorrecta" });
            return;
        }

        // Si se encontró un usuario con el ID especificado, devuelve ese usuario.
        res.status(200).json({ message: "Usuario encontrado correctamente", user: results[0], title: "Operación Correcta" });
    })
});



app.get('/usuarios', (req, res) => {
    connection.query('SELECT id, nombre, correo FROM prueba.usuarios;', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error al consultar la base de datos', title: "Operacion Incorrectra" });
            return;
        }
        res.status(200).json(results);
    });
});

app.post('/usuarios', (req, res) => {
    const data = req.body;

    connection.query(`INSERT INTO  prueba.usuarios (nombre, correo, fecha_nacimiento, sexo, telefono) 
                    VALUES ('${data.nombre}', '${data.email}',' ${data.fecha}', '${data.sexo}', '${data.telefono}');`,
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Error al consultar la base de datos', title: "Operacion Incorrectra" });
                return;
            }
            res.status(200).json({ message: "Se ingresado correctamente en la BD", title: "Operacion Correcta" });
        })
})

app.delete("/usuarios/:id", (req, res) => {
    const id = req.params.id;

    connection.query(`DELETE FROM prueba.usuarios WHERE id = ${id};`, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error al consultar la base de datos', title: "Operacion Incorrectra" });
            return;
        }
        res.status(200).json({ message: "Se borrado correctamente en la BD", title: "Operacion Correcta" });
    })
})


app.use((req, res) => {
    res.status(404).send("<h1>Error 404 endpoint na encontrado</h1>")
})


app.listen(3000, () => {
    console.log('API en ejecución en el puerto 3000');
});