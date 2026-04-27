let currentCompany = "startup";

const stages = {
startup: {
title: "Build foundation",
desc: "You are preparing for scale",
before: ["Manual workflows","No system"],
after: ["Basic automation","Foundation created"]
},
mid: {
title: "Connect systems",
desc: "Complexity is increasing",
before: ["Data everywhere","Manual coordination"],
after: ["System mapping","Better visibility"]
},
enterprise: {
title: "Activate AI with control",
desc: "Enterprise scale governance",
before: ["AI blocked","No data clarity"],
after: ["Compliance layer","AI-ready data"]
}
};

function setCompany(type){
currentCompany = type;
render();
}

function render(){
let s = stages[currentCompany];

document.getElementById("title").innerText = s.title;
document.getElementById("desc").innerText = s.desc;

document.getElementById("before").innerHTML =
s.before.map(i=>"<li>"+i+"</li>").join("");

document.getElementById("after").innerHTML =
s.after.map(i=>"<li>"+i+"</li>").join("");

// 👇 ADD ONLY THIS PART
const enterpriseBox = document.getElementById("enterpriseBox");

if (currentCompany === "enterprise") {
  enterpriseBox.style.display = "block";
} else {
  enterpriseBox.style.display = "none";
}
}
render();
