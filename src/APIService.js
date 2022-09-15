export default class APIService{
    // Insert an article
    static InsertArticle(body){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(body)
        };

        return fetch('http://localhost:5000/send', requestOptions)
        .then(response => response.json())
        .catch(error => console.log(error))
        }
        
    
}