
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

// getUsers()
// .then(() => { getPost(1) } )/* 1 as a defat */
// .catch((errorMessage)=>{ alert(errorMessage) })

function getUsersByAxios(){
    return new Promise((resolve,reject) => {
        axios.get("https://jsonplaceholder.typicode.com/users")
        
        // you can use catch rather than if(response.status > 200 ...) 
        
        .then((responseSection)=>{
            // Object : responseSection للتعامل مع البيانات الي راجعة من رسبونس

            let users = document.getElementById('user-data2');
            users.innerHTML = "";

            for(user of responseSection.data){
                let content =
                `
                    <div onclick="getPost(${user.id})" id="user-section" class="user">
                        <h3> <span> <i class="fa-solid fa-user-tie"></i> </span> ${user.name} </h3>
                        <p>  <span> <i class="fa-solid fa-envelope"></i> </span> ${user.email}  </p>
                    </div>
                `
                users.innerHTML += content;
            }
                resolve()

        }).catch((Error) => {
            alert(Error);
            reject(Error);
        })

        // مهم جدا تفكر انو لما بدك تستخدم الريسولف بالطريقة الصحيحة بعد ما تمتنفيذ الكود لحتى ينتقل للمرحلة القادمة بشكل مناسب
        // مهم جدا تفكر انو لما بدك تستخدم الريجكت بالطريقة الصحيحة بعد ما تمتنفيذ الكود 
    })
}

function getPostByAxios(neededPost){
    let url = "https://jsonplaceholder.typicode.com/posts?userId=" + neededPost; 

    axios.get(url)
    .then((responseInfo)=>{
        
        let postSection = document.getElementById('posts');
        postSection.innerHTML = '';

        for(response of responseInfo.data){
            let content = 
            `
                <div class="post">
                    <h3> ${response.title} </h3>
                    <p>  ${response.body}  </p>
                </div>
            `
            postSection.innerHTML += content;
        }
    
    }).catch((error) => {
        alert(error)
    })
}

// حتى الجزئية الخاصة بالأستدعاء للفنكشنس في اخر شيء من المستحسن ان يتم توفير عليها فكره البروميس 

getUsersByAxios()
.then(() => { 
    getPostByAxios(1);

}).catch((error) => { alert(error) })
