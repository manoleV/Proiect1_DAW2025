const pachete = [
    { nume: "Kit de supravetuire", caracteristici: ["Program zilnic anti-procrastinare"], pret: 50, culoare:"#6ad14eff"},
    { nume: "Maestrul Timpului", caracteristici: ["Program zilnic anti-procrastinare", "Organizare proiecte"], pret: 100, culoare:"#317B22"},
    { nume: "Imblanzitorul Haosului", caracteristici: ["Planificare sesiune", "Organizare proiecte", "Program zilnic anti-procrastinare"], pret: 140, culoare:"#2A4D14"}
];

function genereazaTabel() {
    const container = document.getElementById("tabel-pachete");
    let html = '';
    pachete.forEach(p => {
        html += `<div class="card-pachet" style="background-color:${p.culoare}">
                    <h3>${p.nume}</h3>
                    <ul>${p.caracteristici.map(c => `<li>${c}</li>`).join('')}</ul>
                    <p><strong>${p.pret} RON</strong></p>
                 </div>`;
    });
    container.innerHTML = html;
}

function calculeazaOferta() {
    const form = document.getElementById("special-form");
    const checkboxes = form.querySelectorAll("input[type='checkbox']");
    let total = 0;
    let checkedCount = 0;

    checkboxes.forEach(cb => {
        if(cb.checked){
            total += parseInt(cb.value);
            checkedCount++;
        }
    });

    let bonusText = "";
    // daca toate serviciile sunt bifate, discount
    if(checkedCount === checkboxes.length){
        total -= 200; 
        bonusText = "Felicitari! Ai primit un bonus de 200 RON pentru alegerea completa!";
    }
    
    document.getElementById("pret-total").innerText = total;
    document.getElementById("bonus").innerText = bonusText;
}
document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll("#special-form input[type='checkbox']");
    checkboxes.forEach(cb => {
        cb.addEventListener("change", calculeazaOferta);
    });
    calculeazaOferta();
});

document.addEventListener("DOMContentLoaded", function() {
    genereazaTabel();
});





function trimiteOferta() {
    const form = document.getElementById("special-form");
    const checkboxes = form.querySelectorAll("input[type='checkbox']");
    let textOferta = "Oferta mea dorita:\n";
    let total = 0;

    checkboxes.forEach(cb => {
        if(cb.checked){
            const label = cb.parentElement.textContent.trim();
            textOferta += "- " + label + "\n";
            total += parseInt(cb.value);
        }
    });

    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    if(checkedCount === checkboxes.length){
        total -= 40;
        textOferta += "\nBonus aplicat: -200 RON\n";
    }

    textOferta += "\nTotal: " + total + " RON";
    window.location.href = "mailto:contact@haoscontrol.ro?subject=Oferta personalizata&body=" + encodeURIComponent(textOferta);
}
document.getElementById("reset-offerta").addEventListener("click", function() {
    const checkboxes = document.querySelectorAll("#special-form input[type='checkbox']");
    checkboxes.forEach(cb => cb.checked = false);

    calculeazaOferta();
});









function calculeazaScor() {
    const form = document.getElementById("quiz-form");
    let total = 0;
    const maxTotal = 10 * 5;

    for (let i = 1; i <= 10; i++) {
        const selected = form.querySelector(`input[name=q${i}]:checked`);
        if (selected) {
            total += parseInt(selected.value);
        }
    }

    const procent = Math.round((total / maxTotal) * 100);
    document.getElementById("rezultat").innerText = procent + "%";

    let sfat = "";
    if(procent < 40){
        sfat = "E timpul sa iei controlul! Incepe cu liste mici si planificari zilnice.";
    } else if(procent < 70){
        sfat = "Nu e rau! Dar poti fi mai organizat. Foloseste aplicatii sau calendar zilnic.";
    } else {
        sfat = "Excelent! Esti pe drumul cel bun, tine-ti obiceiurile si inspira-i pe altii!";
    }

    document.getElementById("sfat").innerText = sfat;
}


