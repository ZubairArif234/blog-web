


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
    orderBy,
    
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







// var quill = new Quill('#editor', {
//     modules: {
//       toolbar: '#toolbar'
//     },
//     theme: 'snow'
//   });

//   var quill = new Quill('#editor', {
//     theme: 'snow'
//   });
  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];
  
  var quill = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions
    },
    theme: 'snow'
  });


//   
  quill.clipboard.addMatcher(Node.TEXT_NODE, function(node, delta) {
    return new Delta().insert(node.data);
  });
  
  // Interpret a <b> tag as bold
  quill.clipboard.addMatcher('B', function(node, delta) {
    return delta.compose(new Delta().retain(delta.length(), { bold: true }));
  });

  quill.keyboard.addBinding({ key: ' ' }, {
    collapsed: true,
    format: { list: false },  // ...on an line that's not already a list
    prefix: /^-$/,            // ...following a '-' character
    offset: 1,                
                              
  }, function(range, context) {
    // the space character is consumed by this handler
    // so we only need to delete the hyphen
    this.quill.deleteText(range.index - 1, 1);
    // apply bullet formatting to the line
    this.quill.formatLine(range.index, 1, 'list', 'bullet');
    // restore selection
    this.quill.setSelection(range.index - 1);
  
    // console.log(context.prefix) would print '-'
  });



//   apna code


// let userdata = JSON.parse(window.localStorage.getItem("users"));
// console.log(userdata)
// console.log(users)
onAuthStateChanged(auth,async (user) => {
  
  if (user) {
    
    // alert("oplirhuj")
    // ...
  } else {
    location.href= "index.html"
    // User is signed out
    // ...
  }
  
  // console.log(user)
  console.log(user)
  
  
  
let profName = document.getElementById("profName");
let profEmail = document.getElementById("profEmail")
let signoutBtn = document.getElementById("signout");

signoutBtn.addEventListener("click",()=>{
  signOut(auth).then(() => {
    window.location.href="index.html"
    console.log("logout")
  }).catch((error) => {
    // An error happened.
    console.log("login")
  });
})


const docRef = doc(db, "users", user.uid);
const docSnap = await getDoc(docRef);
let profimg = document.getElementById("profimg");
// const getUserFromDataBase = async () => {

  
  // window.onload=()=>{
  //   onAuthStateChanged(auth, (users) => {
  //     console.log(auth.userCredential)
  //     console.log(users)
      
  //       if (users) {
  //         // window.location= "home.html"
  //         // getUserFromDataBase(user.uid);
  //         console.log("login")
  //         loginfunc(auth.userCredential.uid)
  //         // alert("oplirhuj")
  //         // ...
  //         // const uid = user.uid;
  //       } else {
  //         // User is signed out
  //         // ...
  //         // console.log("logout")
  //       }
        
  //     });

      
  //   }
    // const loginfunc = async(uid)=>{
if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  profName.innerHTML=(docSnap.data().name);
  profEmail.innerHTML=(docSnap.data().email);
  profimg.src = `${docSnap.data().profile}`
  //   alert("olpik")
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
// console.log(docSnap.data().profile)
// loginfunc()


// let userdata = JSON.parse(window.localStorage.getItem("users"));
// console.log(userdata)

let CreateLink = document.getElementById("CreateLink");
let proflink = document.getElementById("proflink");
let prof = document.getElementById("contain");
let createblock = document.getElementById("create");
CreateLink.addEventListener("click" , () => {
 createblock.style.display="block"
 prof.style.display="none"
 //  CreateLink.style.color="#9c1e5b"
}) 
proflink.addEventListener("click" , () => {
  createblock.style.display="none"
  prof.style.display="block"
}) 

let submitpost = document.getElementById("submitPost");
let editorvalue = document.getElementById("editor");
let loader2 = document.getElementById("loader2");

// let addblog = quill.root.innerHTML







submitpost.addEventListener("click",async () => {
  
  console.log(docSnap.data().email)
  if (quill.root.innerHTML != `<p><br></p>`){
    // console.log()
    loader2.style.display="block"
    createblock.style.display="none"
    const docRef = await addDoc(collection(db, "blogs"), {
      name: docSnap.data().name,
      blog: quill.root.innerHTML,
      email: docSnap.data().email,
      likes:[],
      profile:docSnap.data().profile,
      timestamp: new Date().toDateString(),
      time: new Date(),
      // id: docRef.id,
    });
  }
  console.log(quill.root.innerHTML)
  console.log("Document written with ID: ", docRef.id);
  loader2.style.display="none"
  createblock.style.display="block"
  Swal.fire(
    'success',
    'successfully posted',
    'success'
    )
    quill.innerHTML = ""
  })
  // alert("lopokif")
  console.log("its out: ", docRef.id);
  
  // const cities = [];
  let blogList = document.getElementById("blogList");
  
  const q = query(collection(db, "blogs"), where("email", "==", docSnap.data().email),orderBy("time","desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    // const cities = [];
    blogList.innerHTML = ""
    
    querySnapshot.forEach((doc) => {
      // cities.push(doc.data().blog);
      console.log(doc.data())
      console.log(doc.data().likes.length)
      // console.log(doc.data().profile)
      
      // blogList.innerHTML = ""
      let blogLiList = `<li class="blogList"> <div class = "blogDiv"><img id="profimgBlog" src="${doc.data().profile}"><div><h4>${doc.data().name}</h4>  <p class="BlogProfP">${doc.data().timestamp}</p></div><i onclick="DeleteBlog('${doc.id}')" class="fa-solid fa-trash icons"></i></div><hr />${doc.data().blog}
      <hr /> ${doc.data().likes.indexOf(user.uid) !== -1 ? `<i onclick="UnlikeBlog('${doc.id}')" class="fa-solid fa-heart icon">(like: ${doc.data().likes.length})</i>`:`<i onclick="likeBlog('${doc.id}')" class="fa-regular fa-heart icon">(like: ${doc.data().likes.length})</i>`} 
      <i onclick="comment('${doc.id}','${doc.data().name}','${doc.data().profile}')"   class="fa-regular message fa-comment">comments</i><i class="fa-solid fa-share message">share</i><hr /><div id="comdiv"></div> </li>`
      
      
      const comment = (id,postName,profile)=>{
        event.preventDefault()
        // window.location.reload()
        console.log(id)
        // let comDiv = document.getElementById("comdiv")
        let cominput = `<center><input id="CommInputcom" " type="text">
        <i onclick="sendcomment('${id}','${postName}','${profile}')" onblur="blur()" class="fa-solid fa-arrow-right"></i></center>
        
        <div>
        <center>
        <ul id="commentDiv"></ul>
        </center>
        </div>`
        
        event.target.nextSibling.nextSibling.nextSibling.innerHTML = cominput 
        // let blur = ()=> {cominput.innerHTML=""};
        let ul = event.target.nextSibling.nextSibling.nextSibling.lastChild.children[0]
        // window.blur=blur
        const q = query(collection(db, "comments"), where("postID", "==", id),orderBy("time","asc"));
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


const DeleteBlog = async(id)=>{
  await deleteDoc(doc(db, "blogs", id));
  Swal.fire(
    'success',
    'Blog deleted',
    'success'
    )
  }
  // let CommInput = document.getElementById("CommInput").value;
  
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
      profileImg:docSnap.data().profile,
      time: new Date(),


      
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
  window.DeleteBlog=DeleteBlog
  window.sendcomment=sendcomment
// window.sendcomment= sendcomment;
// window.UnlikeBlogCom=UnlikeBlogCom

// let blogLiList = `<li>

// ${cities[0]}
// </li>`
// blogList.innerHTML=blogLiList;

let loader = document.getElementById("loader")
prof.style.display="block"
loader.style.display="none"
});