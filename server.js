const http = require('http')

const server = http.createServer(function(request, response) {
  console.dir(request.param)

  if (request.method == 'POST') {
    console.log('POST');
    var body = '';
    request.on('data', function(data) {
      body += data;
      console.log('Partial body: ' + body, data);
    })
    request.on('end', function() {
      console.log('Body: ' + body);
      const params = body.split('&');
      if(params[0].split('=')[1] === 'Kasia') {
          response.writeHead(500, { 'Content-Type': 'text/html' });
          response.end(`
            Post received <br/>
            ${params.map((item) => item.split('=').join(' : ')).join('<br/>')}
        `);
      } else {
          response.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' });
          response.end(`
            Post received <br/>
            ${params.map((item) => item.split('=').join(' : ')).join('<br/>')}
        `);
      }
    })
  } else {
    console.log('GET');
    var html = `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <form method="post" action="http://localhost:3000">
                        <label for="name"> Imię </label><input type="text" name="name" />
                        <label for="name"> Nazwisko </label><input type="text" name="lastname" />
                        <input type="submit" value="Submit" />
                    </form>
                </body>
            </html>`;
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(html)
  }
})

const port = 3000
const host = 'localhost'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)