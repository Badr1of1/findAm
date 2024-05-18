const notFound = (req, res) => res.status(404).sendFile(__dirname+"/404.html")

module.exports = notFound
