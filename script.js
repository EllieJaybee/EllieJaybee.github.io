import femDict from "./femboys/list.js"

const iconDict = {
  dsc: "discord.svg",
  fbk: "facebook.svg",
  ins: "instagram.svg",
  kfi: "coin30.png",
  ptr: "patreon.svg",
  stm: "steam.svg",
  tkt: "tiktok.svg",
  twc: "twitch.svg",
  twt: "twitter.svg",
  ytb: "youtube.svg"
}

const fems = Object.keys(femDict)

var placeholderModal = document.getElementById("placeholder");
var pfp = document.getElementById("pfp");
var femspan = document.getElementById("namespan");
var feminput = document.getElementById("nameinput");

feminput.value = "elliejb";
femspan.innerHTML = feminput.value.replace(/\s/g, '&nbsp;');
feminput.style.width = femspan.offsetWidth+5 + 'px';

feminput.addEventListener("keyup", search);

feminput.addEventListener('input', function (event) {
  femspan.innerHTML = this.value.replace(/\s/g, '&nbsp;');
  this.style.width = femspan.offsetWidth + 'px';
});

for (const fem in fems) {
  const femOption = document.createElement('option');
  femOption.value = fems[fem];
  document.getElementById("fems").appendChild(femOption);
}

document.getElementsByClassName("close")[0].onclick = function() {
  placeholderModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == placeholderModal) {
    placeholderModal.style.display = "none";
  }
}

document.getElementById("random").onclick = function() {
  feminput.value = fems[Math.floor(Math.random() * fems.length)];
  femspan.innerHTML = feminput.value.replace(/\s/g, '&nbsp;');
  feminput.style.width = femspan.offsetWidth + 'px';
  search();
}

function search() {
  try {
    var femname = feminput.value.toLowerCase().trim();
    pfp.src = femDict[`${femname}`].pfp;
    document.getElementsByClassName("maincon")[0].style.backgroundImage = `linear-gradient(45deg, ${femDict[femname].colors})`;
    var femsocials = document.getElementsByClassName("icons")[0];
    femsocials.innerHTML = "";
    for (var i in femDict[femname].socials) {
      var classname = femDict[femname].socials[i].class;
      var buttonEntry = document.createElement("button");
      buttonEntry.classList = `item dot container ${classname}`;
      femsocials.appendChild(buttonEntry);
      var aEntry = document.createElement("a");
      aEntry.classList = "item container";
      aEntry.href = femDict[femname].socials[i].link;
      buttonEntry.appendChild(aEntry);
      var imgEntry = document.createElement("img");
      imgEntry.src = "assets/icons/"+iconDict[classname];
      aEntry.appendChild(imgEntry);
      document.getElementsByTagName("title")[0].textContent = `Malaysian Femboys|${femDict[femname].casedName}`
    }
  } catch (err) {
    if (err instanceof TypeError) {
      return;
    } else {
      throw err;
    }
  }
}

const paramName = window.location.search
if (paramName!="") {
  const parsedParam = new URLSearchParams(paramName);
  feminput.value = parsedParam.get("name").toLowerCase();
  femspan.innerHTML = feminput.value.replace(/\s/g, '&nbsp;');
  feminput.style.width = femspan.offsetWidth + 'px';
  search();
}