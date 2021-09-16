function tableFilter() {
  let tbodyContent = JSON.parse(localStorage.getItem("mathongo_rw"));
  let quota = document.getElementById("quota-Filter").value;
  let seat = document.getElementById("seat-Filter").value;
  let courseDuration = document.getElementById("courseDuration-Filter").value;
  let type = document.getElementById("type-Filter").value;
  let program = document.getElementById("program-Filter").value;

  console.group(quota, seat, courseDuration, type, program);

  if (quota != "All") {
    tbodyContent = tbodyContent.filter((elem) => elem.quota == quota);
  }
  if (seat != "All") {
    tbodyContent = tbodyContent.filter((elem) => elem.seat == seat);
  }
  if (courseDuration != "All") {
    tbodyContent = tbodyContent.filter(
      (elem) => elem.courseDuration == courseDuration
    );
  }
  if (type != "All") {
    tbodyContent = tbodyContent.filter((elem) => elem.type == type);
  }
  if (program && program != "") {
    tbodyContent = tbodyContent.filter((elem) =>
      elem.program.toLowerCase().includes(program.toLowerCase())
    );
  }

  if (tbodyContent.length == 0) {
    document.getElementById("tableBody").innerHTML = "";
    return;
  }

  sessionStorage.setItem("mathongo_rank_list", JSON.stringify(tbodyContent));
  let keys = Object.keys(tbodyContent[0]);
  keys = keys.filter((key) => key != "year");
  console.log(keys);
  keys.push("RankType");
  tbodyContent = tbodyContent.map((d, idx) => {
    let trContent = keys.map((key) => {
      if (key == "RankType") {
        if (d.type == "IIT") {
          value = "JEE Advanced";
        } else if (d.type == "III-T") {
          value = "JEE Main";
        } else {
          if (d.program.includes("Arch")) {
            value = "JEE Main(Arch.)";
          } else {
            value = "JEE Main";
          }
        }
        return `<td scope="col">${value}</td>`;
      } else {
        return `<td scope="col">${d[key]}</td>`;
      }
    });
    trContent = trContent.join("");
    let trTag = `<tr>
             <th scope="row">${idx + 1}</th>
             ${trContent}
           </tr>`;
    return trTag;
  });

  let tbodyTag = tbodyContent.splice(0, 10).join("");
  // console.log(tbodyTag);

  document.getElementById("tableBody").innerHTML = tbodyTag;
}
function filterList() {
  let tbodyContent = JSON.parse(sessionStorage.getItem("mathongo_rank_list"));
  let jeeMainRank = Number(document.getElementById("inputJeeMainRank").value);
  let jeeAdvancedRank = Number(
    document.getElementById("inputJeeAdvancedRank").value
  );
  if (jeeMainRank) {
    tbodyContent = tbodyContent.filter((elem) => {
      return jeeMainRank >= elem.openingRank && jeeMainRank <= elem.closingRank;
    });
    document.getElementById("inputJeeAdvancedRank").removeAttribute("disabled");
    document.getElementById("inputJeeMainRank").value = null;
  } else if (jeeAdvancedRank) {
    tbodyContent = tbodyContent.filter((elem) => {
      return (
        elem.type == "IIT" &&
        jeeAdvancedRank >= elem.openingRank &&
        jeeAdvancedRank <= elem.closingRank
      );
    });
    document.getElementById("inputJeeMainRank").removeAttribute("disabled");
    document.getElementById("inputJeeAdvancedRank").value = null;
  }
  let institute = document.getElementById("inputSearchInstitute").value;
  if (institute != "Choose...") {
    tbodyContent = tbodyContent.filter((elem) => elem.institute == institute);
  }

  let category = document.getElementById("inputCategory").value;
  if (category != "Choose...") {
    tbodyContent = tbodyContent.filter((elem) => elem.category == category);
  }

  sessionStorage.setItem("mathongo_rank_list", JSON.stringify(tbodyContent));
  localStorage.setItem("mathongo_rw", JSON.stringify(tbodyContent));
  let keys = Object.keys(tbodyContent[0]);
  keys.push("RankType");
  keys = keys.filter((key) => key != "year");
  tbodyContent = tbodyContent.map((d, idx) => {
    let trContent = keys.map((key) => {
      if (key == "RankType") {
        if (d.type == "IIT") {
          value = "JEE Advanced";
        } else if (d.type == "III-T") {
          value = "JEE Main";
        } else {
          if (d.program.includes("Arch")) {
            value = "JEE Main(Arch.)";
          } else {
            value = "JEE Main";
          }
        }
        return `<td scope="col">${value}</td>`;
      } else {
        return `<td scope="col">${d[key]}</td>`;
      }
    });
    trContent = trContent.join("");
    let trTag = `<tr>
             <th scope="row">${idx + 1}</th>
             ${trContent}
           </tr>`;
    return trTag;
  });

  let tbodyTag = tbodyContent.splice(0, 10).join("");
  // console.log(tbodyTag);

  document.getElementById("tableBody").innerHTML = tbodyTag;
}

function paginate(val, prev, next) {
  let tbodyContent = JSON.parse(sessionStorage.getItem("mathongo_rank_list"));
  let keys = Object.keys(tbodyContent[0]);
  keys.push("RankType");
  keys = keys.filter((key) => key != "year");
  tbodyContent = tbodyContent.map((d, idx) => {
    let trContent = keys.map((key) => {
      if (key == "RankType") {
        if (d.type == "IIT") {
          value = "JEE Advanced";
        } else if (d.type == "III-T") {
          value = "JEE Main";
        } else {
          if (d.program.includes("Arch")) {
            value = "JEE Main(Arch.)";
          } else {
            value = "JEE Main";
          }
        }
        return `<td scope="col">${value}</td>`;
      } else {
        return `<td scope="col">${d[key]}</td>`;
      }
    });
    trContent = trContent.join("");
    let trTag = `<tr>
             <th scope="row">${idx + 1}</th>
             ${trContent}
           </tr>`;
    return trTag;
  });

  if (prev) {
    let tabIndex = Number(val.tabIndex);
    if (tabIndex == -1) return;

    let currTab = document.getElementById("nid").tabIndex;
    let start = 10 * Number(currTab - 1);
    let tbodyTag = tbodyContent.splice(start, 10).join("");
    document.getElementById("tableBody").innerHTML = tbodyTag;
    document.getElementById("pid").tabIndex =
      document.getElementById("pid").tabIndex - 1;
    document.getElementById("nid").tabIndex =
      document.getElementById("nid").tabIndex - 1;

    document.getElementById("pl-1").innerHTML =
      Number(document.getElementById("pl-1").innerText) - 1;
    document.getElementById("pl-2").innerHTML =
      Number(document.getElementById("pl-2").innerText) - 1;
    document.getElementById("pl-3").innerHTML =
      Number(document.getElementById("pl-3").innerText) - 1;
  } else if (next) {
    let maxIndex = tbodyContent.length / 10;
    let tabIndex = Number(val.tabIndex);
    if (tabIndex == maxIndex) return;
    let currTab = document.getElementById("nid").tabIndex;
    let start = 10 * Number(currTab + 1);
    let tbodyTag = tbodyContent.splice(start, 10).join("");
    document.getElementById("tableBody").innerHTML = tbodyTag;
    document.getElementById("pid").tabIndex =
      document.getElementById("pid").tabIndex + 1;
    document.getElementById("nid").tabIndex =
      document.getElementById("nid").tabIndex + 1;

    document.getElementById("pl-1").innerHTML =
      Number(document.getElementById("pl-1").innerText) + 1;
    document.getElementById("pl-2").innerHTML =
      Number(document.getElementById("pl-2").innerText) + 1;
    document.getElementById("pl-3").innerHTML =
      Number(document.getElementById("pl-3").innerText) + 1;
  } else {
    document.getElementById("pid").tabIndex = Number(val.innerText) - 2;
    document.getElementById("nid").tabIndex = Number(val.innerText) - 1;
    let start = 10 * (Number(val.innerText) - 1);
    let tbodyTag = tbodyContent.splice(start, 10).join("");
    document.getElementById("tableBody").innerHTML = tbodyTag;
  }
}

fetch("./data.json")
  .then(function (resp) {
    return resp.json();
  })
  .then(function (resp) {
    data = resp;
    let keys = Object.keys(data[0]);
    keys = keys.filter((key) => key != "year");
    keys.push("RankType");
    let theadContent = keys.reduce((prev, curr) => {
      if (curr == "quota") {
        return (prev += `<th scope="col" class="text-center" >
          ${curr.toUpperCase()} 
          <br/>
          <select id="quota-Filter" class="form-select-sm" onchange="tableFilter()">
              <option selected>All</option>
              <option>AI</option>
              <option>HS</option>
              <option>OS</option>
              <option>AP</option>
              <option>GO</option>
            </select>
          </th>`);
      } else if (curr == "seat") {
        return (prev += `<th scope="col" class="text-center">
          ${curr.toUpperCase()}
          <br/>
          <select id="seat-Filter" class="form-select-sm" onchange="tableFilter()">
              <option selected>All</option>
              <option>Gender-Neutral</option>
              <option>Female-Only</option>
            </select>
          </th>`);
      } else if (curr == "courseDuration") {
        return (prev += `<th scope="col" class="text-center">
        ${curr.toUpperCase()}
        
        <select id="courseDuration-Filter" class="form-select-sm" onchange="tableFilter()">
            <option selected>All</option>
            <option>4 Years</option>
            <option>5 Years</option>
          </select>
        </th>`);
      } else if (curr == "type") {
        return (prev += `<th scope="col" class="text-center">
        ${curr.toUpperCase()}
        <br/>
        <select id="type-Filter" class="form-select-sm" onchange="tableFilter()">
            <option selected>All</option>
            <option>IIT</option>
            <option>NIT</option>
            <option>III-T</option>
            <option>GFTI</option>
          </select>
        </th>`);
      } else if (curr == "program") {
        return (prev += `<th scope="col" class="text-center">
        ${curr.toUpperCase()}
        <br/>
        <input
              type="text"
              onchange = "tableFilter()"
              class="form-control form-control-sm"
              id="program-Filter"
              placeholder="Search..."
            />
        </th>`);
      } else {
        return (prev += `<th scope="col">${curr.toUpperCase()}</th>`);
      }
    }, "");

    let theadTag = `<thead>
        <tr>
        <th scope="col">#</th>
         ${theadContent}
        </tr>
      </thead>`;

    let institutes = data.map((d) => {
      return `<option>${d["institute"]}</option>`;
    });

    let uniqueInstitutes = new Set(institutes);

    institutes = Array.from(uniqueInstitutes);

    document.getElementById(
      "inputSearchInstitute"
    ).innerHTML = `<option selected>Choose...</option>
    ${institutes.join("")}`;

    // console.log(theadTag);

    let tbodyContent = data.map((d, idx) => {
      let trContent = keys.map((key) => {
        if (key == "RankType") {
          if (d.type == "IIT") {
            value = "JEE Advanced";
          } else if (d.type == "III-T") {
            value = "JEE Main";
          } else {
            if (d.program.includes("Arch")) {
              value = "JEE Main(Arch.)";
            } else {
              value = "JEE Main";
            }
          }
          return `<td scope="col">${value}</td>`;
        } else {
          return `<td scope="col">${d[key]}</td>`;
        }
      });
      trContent = trContent.join("");
      let trTag = `<tr>
           <th scope="row">${idx + 1}</th>
           ${trContent}
         </tr>`;
      return trTag;
    });

    sessionStorage.setItem("mathongo_rank_list", JSON.stringify(data));
    localStorage.setItem("mathongo_rw", JSON.stringify(data));
    let tbodyTag = `<tbody id="tableBody">
    ${tbodyContent.splice(0, 10).join("")}
    </tbody>
    `;

    let tableContent = `${theadTag + tbodyTag}`;
    document.getElementById("table").innerHTML = tableContent;
    //   document.getElementById("table").innerHTML = tableContent;
  })
  .catch(function (ex) {
    alert(ex);
    window.location.reload();
  });

function handleChange(elem) {
  if (elem.id == "inputJeeMainRank") {
    document
      .getElementById("inputJeeAdvancedRank")
      .setAttribute("disabled", "true");
  } else {
    document
      .getElementById("inputJeeMainRank")
      .setAttribute("disabled", "true");
  }
}
