import express from 'express';
import connection from './db.mjs';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al consultar la base de datos' });
            return;
        }
        res.status(200).json(results);
    });
});

app.listen(3000, () => {
    console.log('API en ejecución en el puerto 3000');
});