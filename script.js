const apiKlic = 'AIzaSyAwuK02IHvkvvCaHhDTkb0kDahxShxy68Y';
const vyhledavaciKlic = '24ee9463e0b2d46bf';

document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const vyraz = document.getElementById('vyraz').value;
    Vyhledat(vyraz);
});

function Vyhledat(vyraz) {
    let url = `https://www.googleapis.com/customsearch/v1?q=${vyraz}&key=${apiKlic}&cx=${vyhledavaciKlic}`;

    fetch(url)
        .then(function (odpoved) { return odpoved.json(); })
        .then(function (listVysledku) {
            zobrazitVysledky(listVysledku); zobrazitTlacitko(listVysledku);
        })
}

function zobrazitVysledky(listVysledku) {
    let vysledky = document.getElementById('vysledky');
    vysledky.innerHTML = '';
    console.log(listVysledku.items);

    if (listVysledku.items && listVysledku.items.length > 0) {
        listVysledku.items.forEach(function (item) {
            let jedenVysledek = `
                        <div class="vysledek">
                            <a href="${item.link}" target="_blank">${item.title}</a>
                            <p>${item.snippet}</p>
                        </div>
                    `;
            vysledky.innerHTML += jedenVysledek;
        });
    } else {
        vysledky.innerHTML = '<p>Nenalezeny žádné výsledky</p>';
    }
}

function zobrazitTlacitko(listVysledku) {
    if (listVysledku.items && listVysledku.items.length > 0) {
        let tlacitko = document.getElementById('tlacitko');
        tlacitko.style.display = 'block';
        tlacitko.onclick = function () { stahnoutVysledky(listVysledku.items) };
    }
}

function stahnoutVysledky(items) {
    let data = JSON.stringify(items, null, 2);
    let blob = new Blob([data], { type: 'application/json' });
    let url = URL.createObjectURL(blob);

    let link = document.createElement('a');
    link.href = url;
    link.download = 'vysledky_vyhledavani.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}