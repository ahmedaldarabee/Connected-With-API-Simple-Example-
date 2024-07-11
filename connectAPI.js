function getPost(neededPost){
    fetch("https://jsonplaceholder.typicode.com/posts?userId=" + neededPost)
    .then((responseData) => {
        if(responseData.ok)
            return responseData.json()
        else
            alert("Server Error!")
    })     
    .then(jsonPost => {

        let postSection = document.getElementById('posts');
            postSection.innerHTML = '';

        for(response of jsonPost){
            let content = 
            `
                <div class="post">
                    <h3>${response.title}</h3>
                    <p>  ${response.body}</p>
                </div>
            `
            postSection.innerHTML += content;
        }
    });
}

function getUsers(){
    return new Promise((resolve,reject) => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((responseData) => {
            if(responseData.ok)/* This case about if you have an error in status >= 200 and < 300 */
                return responseData.json() /* Will return a promises to be implemented in then ! */
            else
                reject("Sorry but there exist an error in server!")
        }) 
        
        /* ( Call the json data ) The return value from response.json be as promises and for this reason there exist another then ! */
        // response.json() be shorted as => return response.json()
        
        .then(json => {
            let users = document.getElementById('user-data2');
            users.innerHTML = " ";
            
            for(userData of json){
                let content =
                `
                    <div onclick="getPost(${userData.id})" id="user-section" class="user">
                        <h3> <span> <i class="fa-solid fa-user-tie"></i> </span> ${userData.name} </h3>
                        <p>  <span> <i class="fa-solid fa-envelope"></i> </span> ${userData.email}  </p>
                    </div>
                `
                users.innerHTML +=content;
            }

            resolve();
        });
    })
}

getUsers()
.then(() => { getPost(1) } )/* 1 as a defat */
.catch((errorMessage)=>{ alert(errorMessage) })
