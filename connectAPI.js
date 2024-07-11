function getPost(neededPost){
    let request = new XMLHttpRequest();
    
    request.open("GET","https://jsonplaceholder.typicode.com/posts?userId=" + neededPost )
    request.responseType = 'json'; /* Important Section */
    
    request.setRequestHeader("Accept","application/json")
    request.setRequestHeader("Content-Type","application/json")

    request.send();

    request.onload = function(){
        if(request.status >= 200 && request.status < 300 ){
            let responseProcess = request.response;

            let postSection = document.getElementById('posts');
            postSection.innerHTML = '';

            for(response of responseProcess){
                let content = 
                `
                    <div  class="post">
                        <h3>${response.title}</h3>
                        <p>${response.body}</p>
                    </div>
                `
                postSection.innerHTML += content;
            }

        }else{
            alert("Server Error!");
        }
    }
}

function getUsers(){
    let request = new XMLHttpRequest();
    
    request.open("GET","https://jsonplaceholder.typicode.com/users")
    request.responseType = 'json'; /* Important Section */
    
    request.setRequestHeader("Accept","application/json")
    request.setRequestHeader("Content-Type","application/json")

    request.send();

    request.onload = function(){
        if(request.status >= 200 && request.status < 300 ){
            let usersProcess = request.response;

  
            let users = document.getElementById('user-data2');
            users.innerHTML = " ";

            for(userData of usersProcess){
                let content = 
                `
                     <div onclick="showUserInfo(${userData.id})" id="user-section" class="user">
                        <h3> <span> <i class="fa-solid fa-user-tie"></i> </span> ${userData.name} </h3>
                        <p>  <span> <i class="fa-solid fa-envelope"></i> </span> ${userData.email}  </p>
                    </div>
                `
                users.innerHTML += content;
            }

        }else{
            alert("Server Error!");
        }
    }
}

getUsers()

function showUserInfo(id){
    getPost(id);
}