
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendSignInLinkToEmail,
    onAuthStateChanged,
    signOut
 } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
 import { doc,
   setDoc,
   getDoc,
   getFirestore,
   getDocFromCache,
   collection, 
   getDocs,
   query,
   addDoc ,
   onSnapshot,
    where,
    updateDoc,
    arrayUnion,
    arrayRemove,
    deleteDoc,
    orderBy
 } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"; 


const firebaseConfig = {
  apiKey: "AIzaSyBKYcD_35A49akt0OitN62MQbMCwcKGvuU",
    authDomain: "saylani-project-assignment.firebaseapp.com",
    projectId: "saylani-project-assignment",
    storageBucket: "saylani-project-assignment.appspot.com",
    messagingSenderId: "677719458063",
    appId: "1:677719458063:web:88686899bd9f0b899cfe7a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore()

// let userdata = JSON.parse(window.localStorage.getItem("users"));
// console.log(userdata)


onAuthStateChanged(auth, async(user) => {
  console.log(auth)
    if (user) {
      // location.href= "home.html"
      
      // alert("oplirhuj")
      // ...
    } else {
      // User is signed out
      // ...
    }
    // console.log(user.uid)
    const docRef = doc(db, "users", user.uid);
const docSnap = await getDoc(docRef);
let profimg = document.getElementById("profimg");
// const getUserFromDataBase = async () => {


if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  // profName.innerHTML=(docSnap.data().name);
  // profEmail.innerHTML=(docSnap.data().email);
  // profimg.src = `${docSnap.data().profile}`
//   alert("olpik")
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}





// 
let blogList = document.getElementById("blogList");
  
  const q = query(collection(db, "blogs"),orderBy("time","desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    // const cities = [];
    blogList.innerHTML = ""
    
    querySnapshot.forEach((doc) => {
      // cities.push(doc.data().blog);
      console.log(doc.data())
      console.log(doc.data().likes.length)
      // console.log(doc.data().profile)
      
      // blogList.innerHTML = ""
      let blogLiList = `<li class="blogList"> <div class = "blogDiv"><img id="profimgBlog" src="${doc.data().profile}"><div><h4>${doc.data().name}</h4>  <p class="BlogProfP">${doc.data().timestamp}</p></div></div><hr />${doc.data().blog}
      <hr /> ${doc.data().likes.indexOf(user.uid) !== -1 ? `<i onclick="UnlikeBlog('${doc.id}')" class="fa-solid fa-heart icon">(like: ${doc.data().likes.length})</i>`:`<i onclick="likeBlog('${doc.id}')" class="fa-regular fa-heart icon">(like: ${doc.data().likes.length})</i>`} 
      <i onclick="comment('${doc.id}','${doc.data().name}','${doc.data().profile}')"   class="fa-regular message fa-comment">comments</i><i class="fa-solid fa-share message">share</i><hr /><div id="comdiv"></div> </li>`
      
      
      const comment = (id,postName,profile)=>{
        event.preventDefault()
        // window.location.reload()
        console.log(id)
        // let comDiv = document.getElementById("comdiv")

        let cominput = `<div><center><input id="CommInputcom" " type="text" placeholder="Write a comment">
        <i onclick="sendcomment('${id}','${postName}','${profile}')" onblur="blur()" class="fa-solid fa-arrow-right"></i></center>
        </div><div>
        <center>
        <ul id="commentDivcom"></ul>
        </center>
        </div>`
        
        event.target.nextSibling.nextSibling.nextSibling.innerHTML = cominput 
        // let blur = ()=> {cominput.innerHTML=""};
        let ul = event.target.nextSibling.nextSibling.nextSibling.lastChild.children[0]
        // window.blur=blur
        const q = query(collection(db, "comments"), where("postID", "==", id));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          ul.innerHTML=""
          // const cities = [];
          // commentDiv.innerHTML =""
          // let commentDiv = document.getElementById("commentDiv")
          querySnapshot.forEach((doc) => {
            console.log(doc.data().comVal)
            let comList =`<li class="blogListCom"><div class = "blogDiv"><img id="profimgBlogCom" src="${doc.data().profileImg}"><div><h4 class="comName">${doc.data().loginUserName}</h4>  <p class="BlogProfP">${doc.data().timestamp}</p></div></div>
            <hr />${doc.data().comVal}<hr />
            
            </li>`
            // commentDiv.innerHTML += comList
            // cities.push(doc.data().name);
            ul.innerHTML += comList
          });
          // console.log(doc.data().postID)
          // console.log("Current cities in CA: ", cities.join(", "));
        });

      }
      // const viewAll =()=>{
      //   if (doc.data().comment == null){
      //     event.innerHTML=`<h3>Be First to comment</h3>`
      //   }else {
      //     for (var i = 0 ; i < doc.data().comment.length ; i++){
        
      //       // let cooomments =`<li class = "comments"> <div class = "blogDiv"><img id="profimgBlogcom" src="${doc.data().profile}"><div><h5>${doc.data().name}</h5>  <p class="BlogProfPcom">${doc.data().timestamp}</p></div><i onclick="DeleteBlog('${doc.id}')" class="fa-solid fa-trash icons"></i></div><hr />
      //       // <div><h5>${doc.data().comment[i]}</h5></div></li>`
      //       // window.cooomments = cooomments;
      //       // allComm.innerHTML+= `<li class = "comments"> <div class = "blogDiv"><img id="profimgBlogcom" src="${doc.data().profile}"><div><h5>${doc.data().name}</h5>  <p class="BlogProfPcom">${doc.data().timestamp}</p></div><i onclick="DeleteBlog('${doc.id}')" class="fa-solid fa-trash icons"></i></div><hr />
      //       // <div><h5>${doc.data().comment[i]}</h5></div></li>`
      //       event.target.nextSibling.innerHTML += `<li class = "comments"> <div class = "blogDiv"><img id="profimgBlogcom" src="${doc.data().profile}"><div><h5>${doc.data().name}</h5>  <p class="BlogProfPcom">${doc.data().timestamp}</p></div><i onclick="UnlikeBlogCom()" class="fa-solid fa-trash icons"></i></div><hr />
      //        <div><h5>${doc.data().comment[i]}</h5></div></li>`
      //     }
      //   }

      // }
      blogList.innerHTML += blogLiList;
      window.comment = comment;
      // window.viewAll=viewAll;
    });
  // console.log("Current cities in CA: ", cities.join(", "),);
});


const likeBlog = async (id) => {
  const postRef = doc(db, "blogs", id);
  await updateDoc(postRef, {
    likes: arrayUnion(user.uid),
    
    // lastLike: username,
  });
  
};

const UnlikeBlog = async (id) => {
  const postRef = doc(db, "blogs", id);
  await updateDoc(postRef, {
    likes: arrayRemove(user.uid),
  });
};


// const DeleteBlog = async(id)=>{
//   await deleteDoc(doc(db, "blogs", id));
//   Swal.fire(
//     'success',
//     'Blog deleted',
//     'success'
//     )
//   }
  console.log(docSnap.data().profile )
  const sendcomment = async(id,postName,profile)=>{

    let CommInput = document.querySelector("#CommInput");
    console.log (event.target.parentNode.children[0].value)
    const docRef = await addDoc(collection(db, "comments"), {
      postID:id ,
      loginUserID:user.uid,
      loginUserName:docSnap.data().name,
      postName:postName,
      timestamp:new Date().toDateString(),
      comVal:event.target.parentNode.children[0].value ,
      profileImg:docSnap.data().profile


      
    });
    console.log("Document written with ID: ", docRef.id);
    
      
    // event.target.parentNode.children[0].value=""
    }
    
    
    // const UnlikeBlogCom = async (id) => {
      //   const postRef = doc(db, "blogs", id);
      //   await updateDoc(postRef, {
      //     comment: arrayRemove(CommInput.value),
      //   });
      // };
  
      window.likeBlog=likeBlog
      window.UnlikeBlog=UnlikeBlog
      // window.DeleteBlog=DeleteBlog
      window.sendcomment= sendcomment;
      // window.UnlikeBlogCom=UnlikeBlogCom

// let blogLiList = `<li>

// ${cities[0]}
// </li>`
// blogList.innerHTML=blogLiList;

let loader = document.getElementById("loader")
// prof.style.display="block"
loader.style.display="none"
});