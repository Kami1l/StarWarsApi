



let slownik = [
    {
        wejsciowe: ["grass", "grasslands"],
        klasaCSS: "grass"
    },
    {
        wejsciowe: ["grassy hills", "fields", "hills"],
        klasaCSS: "grasshill"
    },
    {
        wejsciowe: ["mountains", "mountain ranges", "rocky islands"],
        klasaCSS: "mountain"
    },
    {
        wejsciowe: ["jungle", "jungles", "rainforests"],
        klasaCSS: "jungle"
    },
    {
        wejsciowe: ["tundra", "forests", "fungus forests"],
        klasaCSS: "forest"
    },
    {
        wejsciowe: ["caves", "ice caves"],
        klasaCSS: "cave"
    },
    {
        wejsciowe: ["swamp", "swamps", "scrublands"],
        klasaCSS: "swamp"
    },
    {
        wejsciowe: ["gas giant"],
        klasaCSS: "gas_giant"
    },
    {
        wejsciowe: ["lakes"],
        klasaCSS: "lake"
    },
    {
        wejsciowe: ["cityscape", "urban"],
        klasaCSS: "cityscape"
    },
    {
        wejsciowe: ["ocean", "oceans", "seas"],
        klasaCSS: "ocean"
    },
    {
        wejsciowe: ["barren", "desert", "deserts", "plains", "rocky deserts"],
        klasaCSS: "desert"
    },
    {
        wejsciowe: ["canyons", "sinkholes", "reefs", "valleys"],
        klasaCSS: "canyon"
    },
    {
        wejsciowe: ["savanna", "savannas"],
        klasaCSS: "savanna"
    },
    {
        wejsciowe: ["volcanoes", "lava rivers"],
        klasaCSS: "volcano"
    },
    {
        wejsciowe: ["rivers"],
        klasaCSS: "river"
    },
    {
        wejsciowe: ["airless asteroid"],
        klasaCSS: "asteroid"
    },
    {
        wejsciowe: ["glaciers", "ice canyons"],
        klasaCSS: "glacier"
    },
    {
        wejsciowe: ["islands"],
        klasaCSS: "island"
    },
    {
        wejsciowe: ["rock arches", "rock"],
        klasaCSS: "rock"
    }
];



function getCSSclass(teren) {
    let odfiltrowanaTablica = slownik.filter(e => {
        let wynik = e.wejsciowe.some(f => {
            return f == teren;
        });
        return wynik // true albo false
    })
    // return odfiltrowanaTablica[0].klasaCSS
}
async function getDataFromServer(api) {
    let phase1 = await fetch(api);
    let data = await phase1.json();
    renderTBodyTable(data);
};

const renderTBodyTable = (data) => {
    updateNavButtons(data.previous, data.next);
    let tBody = $('table tbody');
    tBody.html('');
    data.results.map(planeta => {
        tBody.append(renderRow(planeta))
    })
    animateRows();
}

const renderRow = (planeta) => {
    renderIcon(planeta.terrain)
    let elementHTML = `
    <tr>
        <td class="id"><span>${planeta.url.replace(/\D/g, "")}.</span></td>
        <td class="name">${planeta.name}</td>
        <td>${planeta.rotation_period}</td>
        <td>${planeta.orbital_period}</td>
        <td>${planeta.diameter}</td>
        <td>${planeta.climate}</td>
        <td>${planeta.gravity}</td>
        <td class="terrain">
            ${renderIcon(planeta.terrain)}
        </td>
        <td>${planeta.surface_water}</td>
        <td>${planeta.population}</td>
    </tr>
    `
    return elementHTML;

}

const renderIcon = (terrain) => {
    let terrainTable = terrain.split(",");
    console.log(terrainTable)
    elementHTML = "";
    terrainTable.map(e => {
        elementHTML += `
        <div class="icon ${getCSSclass(e.trim())}"></div>
        `
    })
    return elementHTML
}

function updateNavButtons(urlPrev, urlNext) {
    $('nav button.prev').data("url", urlPrev);
    $('nav button.next').data("url", urlNext);
    console.log($('nav button.next').data());
}
function handleNavButtons() {
    $('nav button').on('click', function () {
        let targetUrl = $(this).data("url");
        console.log(targetUrl)
        if (targetUrl) {
            getDataFromServer(targetUrl);
        }

    })
}

function animateRows() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            $("table tbody tr").eq(i).addClass('showMe');
        }, i * 100)
    }

}
handleNavButtons();
getDataFromServer('https://swapi.dev/api/planets');


