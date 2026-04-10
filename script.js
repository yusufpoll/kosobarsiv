let data = [];

document.getElementById('fileInput').addEventListener('change', function(e){
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(evt){
        const text = evt.target.result;
        const rows = text.split('\n').slice(1);

        data = rows.map(r=>{
            let c=r.split(',');
            return {
                kod:c[0],
                lokasyon:c[1],
                birim:c[2],
                aciklama:c[3],
                yil:c[4]
            };
        });

        localStorage.setItem("arsivData", JSON.stringify(data));

        render(data);
    };

    reader.readAsText(file);
});

function render(items){
    let html="";

    items.forEach((d,i)=>{
        let link = "detay.html?kod="+d.kod;

        html+=`
        <div class="card">
            <b>${d.kod}</b><br>
            ${d.birim}<br>
            ${d.aciklama}<br>

            <a href="${link}" target="_blank">Detay</a><br>

            <button onclick="etiket('${d.kod}','${d.birim}')">Etiket</button>
        </div>
        `;
    });

    document.getElementById("list").innerHTML=html;
}

function etiket(kod,birim){
    let url = "detay.html?kod="+kod;

    let w=window.open("");

    w.document.write(`
    <style>
    body { width:70mm;height:148.5mm;text-align:center;}
    </style>

    <h2>KGM</h2>
    <h3>KÖSOBM ARŞİV</h3>
    <h1>${birim}</h1>

    <div id="qrcode"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>
    <script>
    new QRCode(document.getElementById("qrcode"), "${url}");
    <\/script>
    `);

    w.print();
}
