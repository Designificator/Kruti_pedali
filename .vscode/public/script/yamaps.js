function makeDescriptionsItem(icon, name, rate, img) {
    var descriptionItem = document.createElement('div');
    descriptionItem.innerHTML = `<div class="description-item">
    <div class="description-item-icon"><img src="../img/${icon}.svg"></div>
    <div class="description-item-body">
        <div class="description-item-content">

            <h3 id="description-item-text">${name}</h3><h3 id="description-item-rate">${rate}</h3><img src="../img/greenstar.svg" style="vertical-align: bottom">
        </div>
        <div class="show-map-button">œÓÍ‡Á‡Ú¸ Ì‡ Í‡ÚÂ</div>
    </div>
    <div class="description-item-picture"><img src="../img/${img}.svg"></div>
    </div>`;
    var descriptionOptions = document.getElementById('description-options');
    descriptionOptions.insertAdjacentElement('beforeend', descriptionItem);
}

ymaps.ready(function init() {
    var routeMap = new ymaps.Map(document.getElementById('map'), {
        center: [47.222126, 39.718795],
        zoom: 10
    }),

        point_Frenta = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [47.205809, 39.630984]
            },
            properties: {
                iconCaption: "Frenta"
            }
        }),
        point_Lelush = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [47.292564, 39.748309]
            },
            properties: {
                iconCaption: "ÀÂÎ˛¯ÂÌÍÓ‚ÒÍËÈ ÎÂÒÓÔ‡Í"
            }
        }),
        point_Pines = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [47.294208, 39.793810]
            },
            properties: {
                iconCaption: "—ÓÒÌÓ‚˚È ·Ó"
            }
        }),
        point_FrentaC = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [47.225101, 39.728769]
            },
            properties: {
                iconCaption: "Frenta"
            }
        }),
        point_Bikeshare = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [47.211464, 39.731341]
            },
            properties: {
                iconCaption: "¬ÂÎÓÔÓÍ‡Ú"
            }
        }),
        point_WoodProkat = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [47.339918, 39.737218]
            },
            properties: {
                iconCaption: "WoodProkat"
            }
        }),

        route_Channel = new ymaps.Polyline([
            [47.204157091237036, 39.73439906404796],
            [47.20375494524161, 39.732918484671735],
            [47.203616021366706, 39.73285411165539],
            [47.203382043486776, 39.73207090662303],
            [47.202482681344556, 39.73088000582043],
            [47.201575991786136, 39.73074053095164],
            [47.1814435941899, 39.741468219515674],
            [47.183550233812326, 39.74696138357817],
            [47.185539760667, 39.745416431185596],
            [47.18495461349793, 39.74275567984282],
            [47.19109833507884, 39.73975160574616],
            [47.19162490649173, 39.74206903433501],
            [47.204027068328884, 39.7351167485684],
            [47.204027068328884, 39.7351167485684],
        ], {},
            {
                strokeColor: "#ca10e5",
                strokeWidth: 5
            }),
        route_Park = new ymaps.Polyline([
            [47.294075613939555, 39.79409967230215],
            [47.29362305921803, 39.794593198760886],
            [47.29284932760334, 39.79495797918691],
            [47.292761734627355, 39.79321990774527],
            [47.29244055913313, 39.79270492361443],
            [47.29257194934526, 39.79216848181143],
            [47.29235296547591, 39.79173932836906],
            [47.29214857970802, 39.79083810614004],
            [47.29211938167631, 39.78785548971548],
            [47.29229456962334, 39.78384290502917],
            [47.2928785252296, 39.783928735717645],
            [47.29276173462737, 39.78367124365222],
            [47.29271793812332, 39.77347884939563],
            [47.29283472882286, 39.77313552664172],
            [47.292776333505536, 39.77266345785509],
            [47.29804624961397, 39.77266345785506],
            [47.297549936567236, 39.77156911657699],
            [47.29759372908344, 39.771204336150966],
            [47.29731637586446, 39.7706893520201],
            [47.29449896810606, 39.77073226736434],
            [47.2943675827112, 39.76935897634871],
            [47.294338385963776, 39.769358976348634],
            [47.292659542766515, 39.761054857238534],
            [47.290790854203486, 39.757407052978266],
            [47.2927471359128, 39.757449968322504],
            [47.29260114725454, 39.75414548681616],
            [47.29263034501864, 39.748480661376696]

        ], {},
            {
                strokeColor: "#ed4543e6",
                strokeWidth: 5
            }),
        route_RoseAv = new ymaps.Polyline([
            [47.20577339205438, 39.63104596965061],
            [47.205554046798284, 39.63114252917513],
            [47.20557598136496, 39.6328806006168],
            [47.20383581071815, 39.6327947699283],
            [47.203960110526346, 39.63423243396029],
            [47.20795948328434, 39.63363161914093],
            [47.20814226272082, 39.64136710993988],
            [47.20561985054992, 39.64265457026698],
            [47.20396011061852, 39.63432899348474],
            [47.20378462845118, 39.63196864955165],
            [47.20566371963258, 39.63210812442042],
            [47.205605227531834, 39.631925734207414],
            [47.205883064432356, 39.631947191879526],
            [47.2058465070291, 39.631131800339]
        ], {},
            {
                strokeColor: "#d8b60c",
                strokeWidth: 5
            }),
        route_LeftCoast = new ymaps.Polyline([
            [47.21145906242067, 39.73131779374725],
            [47.211120058241605, 39.727810149098744],
            [47.21161718701781, 39.72587895860802],
            [47.2120412049159, 39.72616863718165],
            [47.21227514436501, 39.72702694406641],
            [47.21273570962107, 39.73056745996607],
            [47.21332785904981, 39.73671508302816],
            [47.21348868860642, 39.73868918886312],
            [47.211873060308626, 39.7388823079122],
            [47.21208868748755, 39.741766916175095],
            [47.213039059184254, 39.74148796643754],
            [47.212629670400524, 39.73906324948808],
            [47.21163542725841, 39.73880575742264],
            [47.21192785367201, 39.73852680768509],
            [47.21137224212402, 39.733741746802515],
            [47.21157694179679, 39.73271177854081]
        ], {},
            {
                strokeColor: "#09cc0b",
                strokeWidth: 5
            }),
        route_Shepkin = new ymaps.Polyline([
            [47.34124302770353, 39.7362530583351],
            [47.339828227713305, 39.73672512712171],
            [47.34001784229678, 39.73754051866225],
            [47.343809990079194, 39.74273327531509],
            [47.34633307502217, 39.74438551606826],
            [47.346464330468756, 39.7438919896095],
            [47.349876856483014, 39.74464300813368],
            [47.35000810305029, 39.74878433885268],
            [47.3506351654503, 39.750007426163464],
            [47.351801773301204, 39.751488005539535],
            [47.35232673833459, 39.75286129655516],
            [47.355680557587384, 39.753462111374496],
            [47.35670124261785, 39.752346312424294],
            [47.35670124261785, 39.74981430711423],
            [47.357546938022885, 39.74912766160642],
            [47.35743029119162, 39.740244185349084],
            [47.35524311506461, 39.740287100693344],
            [47.355097300079535, 39.72985867204344],
            [47.34147639319824, 39.73603848161374]
        ], {},
            {
                strokeColor: "#1e98ffe6",
                strokeWidth: 5
            });

    route_Channel.events.add('click', function route_Channel_event() {
        var title = document.getElementById('rout-label');
        title.innerText = "Ã¿–ÿ–”“ \"√–≈¡ÕŒ…  ¿Õ¿À\"";
        var description = document.getElementById('description-options');
        description.innerHTML = '<div class="description-options" id="description-options"></div>';

    });
    route_Park.events.add('click', function route_Park_event() {
        var title = document.getElementById('rout-label');
        title.innerText = "Ã¿–ÿ–”“ \"À≈—Œœ¿– \"";
        var description = document.getElementById('description-options');
        description.innerHTML = '<div class="description-options" id="description-options"></div>';
        makeDescriptionsItem('cafeicon', '◊‡Èı‡Ì‡', '4.7', '@');
        makeDescriptionsItem('cafeicon', '”Á·ÂÍËÒÚ‡Ì', '4.3', '@');
    });
    route_RoseAv.events.add('click', function route_RoseAv_event() {
        var title = document.getElementById('rout-label');
        title.innerText = "Ã¿–ÿ–”“ \"¿ÀÀ≈ﬂ –Œ«\"";
        var description = document.getElementById('description-options');
        description.innerHTML = '<div class="description-options" id="description-options"></div>';
        makeDescriptionsItem('cafeicon', 'SanRemo', '4.5', '@');
    });
    route_LeftCoast.events.add('click', function route_LeftCoast_event() {
        var title = document.getElementById('rout-label');
        title.innerText = "Ã¿–ÿ–”“ \"À≈¬Œ¡≈–≈∆Õ€… œ¿– \"";
        var description = document.getElementById('description-options');
        description.innerHTML = '<div class="description-options" id="description-options"></div>';
        makeDescriptionsItem('cafeicon', 'Õ‡ËË', '4.1', '@');
        makeDescriptionsItem('cafeicon', 'ƒËÌ¸-ƒÓÌ', '3.8', '@');
        makeDescriptionsItem('cafeicon', '¡‡¯Ìˇ', '4.3', '@');
        makeDescriptionsItem('cafeicon', '—ÏËÌÓÙÙ', '4.2', '@');
        makeDescriptionsItem('cafeicon', ' ÛÔÓÎ', '4.1', '@');
        makeDescriptionsItem('cafeicon', 'RiverDonPark', '4.7', '@');
        makeDescriptionsItem('cafeicon', 'Cube', '4.1', '@');
    });
    route_Shepkin.events.add('click', function route_Shepkin_event() {
        var title = document.getElementById('rout-label');
        title.innerText = "Ã¿–ÿ–”“ \"Ÿ≈œ »Õ— »… À≈—\"";
        var description = document.getElementById('description-options');
        description.innerHTML = '<div class="description-options" id="description-options"></div>';
    });

    routeMap.geoObjects.add(point_Bikeshare)
        .add(point_Frenta)
        .add(point_FrentaC)
        .add(point_Lelush)
        .add(point_Pines)
        .add(point_WoodProkat)
        .add(route_LeftCoast)
        .add(route_Shepkin)
        .add(route_Channel)
        .add(route_Park)
        .add(route_RoseAv);
});