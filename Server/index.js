const port = process.env.PORT || 5005;
const app =  require('./server')

app.listen(port, console.log(`server Online na porta ${port}`));