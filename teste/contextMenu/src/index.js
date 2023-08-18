import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { transform } from 'ol/proj';
import { format } from 'ol/coordinate';
import { Icon, Text, Fill, Stroke, Style } from 'ol/style.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import ContextMenu from 'ol-contextmenu';

const view = new View({ center: [0, 0], zoom: 2 });
const vectorLayer = new VectorLayer({ source: new VectorSource() });
const map = new Map({
    view,
    target: 'map',
    layers: [new TileLayer({ source: new OSM() }), vectorLayer],
});

const pinIcon =
    'https://cdn.jsdelivr.net/gh/jonataswalker/ol-contextmenu@604befc46d737d814505b5d90fc171932f747043/examples/img/pin_drop.png';
const centerIcon =
    'https://cdn.jsdelivr.net/gh/jonataswalker/ol-contextmenu@604befc46d737d814505b5d90fc171932f747043/examples/img/center.png';
const listIcon =
    'https://cdn.jsdelivr.net/gh/jonataswalker/ol-contextmenu@604befc46d737d814505b5d90fc171932f747043/examples/img/view_list.png';

const items = [
    {
        text: 'Center map here',
        classname: 'bold',
        icon: centerIcon,
        callback: center,
    },
    {
        text: 'Some Actions',
        icon: listIcon,
        items: [
            {
                text: 'Some more Actions',
                items: [
                    {
                        text: 'Add a Marker',
                        icon: pinIcon,
                        callback: marker,
                    },
                ],
            },
            {
                text: 'Center map here',
                icon: centerIcon,
                callback: center,
            },
        ],
    },
    {
        text: 'Add a Marker',
        icon: pinIcon,
        callback: marker,
    },
    '-', // this is a separator
    {
        text: 'Some more Actions, loooong',
        items: [
            {
                text: 'Add a Marker',
                icon: pinIcon,
                callback: marker,
            },
        ],
    },
    '-', // this is a separator
];

const contextmenu = new ContextMenu({
    width: 200,
    defaultItems: true,
    items,
});
map.addControl(contextmenu);

const removeMarkerItem = {
    text: 'Remove this Marker',
    classname: 'marker',
    callback: removeMarker,
};

contextmenu.on('beforeopen', function (evt) {
    console.log({ evt });
});

contextmenu.on('open', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, (ft) => ft);

    if (feature && feature.get('type') === 'removable') {
        contextmenu.clear();
        removeMarkerItem.data = { marker: feature };
        contextmenu.push(removeMarkerItem);
    } else {
        contextmenu.clear();
        contextmenu.extend(items);
        contextmenu.extend(contextmenu.getDefaultItems());
    }
});

map.on('pointermove', function (e) {
    if (e.dragging) return;

    const pixel = map.getEventPixel(e.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);

    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});

function elastic(t) {
    return Math.pow(2, -10 * t) * Math.sin(((t - 0.075) * (2 * Math.PI)) / 0.3) + 1;
}

function center(obj) {
    view.animate({
        duration: 700,
        easing: elastic,
        center: obj.coordinate,
    });
}

function removeMarker(obj) {
    vectorLayer.getSource().removeFeature(obj.data.marker);
}

function marker(obj) {
    const coord4326 = transform(obj.coordinate, 'EPSG:3857', 'EPSG:4326'),
        template = 'Coordinate is ({x} | {y})',
        iconStyle = new Style({
            image: new Icon({ scale: 0.6, src: pinIcon }),
            text: new Text({
                offsetY: 25,
                text: format(coord4326, template, 2),
                font: '15px Open Sans,sans-serif',
                fill: new Fill({ color: '#111' }),
                stroke: new Stroke({ color: '#eee', width: 2 }),
            }),
        }),
        feature = new Feature({
            type: 'removable',
            geometry: new Point(obj.coordinate),
        });

    feature.setStyle(iconStyle);
    vectorLayer.getSource().addFeature(feature);
}
