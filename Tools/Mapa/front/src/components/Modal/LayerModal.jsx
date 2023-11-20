import { useEffect, useContext } from "react";
import { Button, Modal, Input, ColorPicker, Divider, Statistic } from "antd";
import { useForm, Controller } from "react-hook-form";
import RadioInput from "../Form/RadioInput";
import { MapaContext } from "../../contexts/MapaContext";
import { Vector as vector } from "ol/layer";
import { Vector } from "ol/source";
import { GeoJSON } from "ol/format";

const recomendColors = [
  "#F5222D",
  "#FA8C16",
  "#FADB14",
  "#8BBB11",
  "#52C41A",
  "#13A8A8",
  "#1677FF",
  "#2F54EB",
  "#722ED1",
  "#EB2F96",
  "#7FFF00",
  "#FF1493",
];
const svgList = [
  {
    type: "svg",
    name: false,
    svgName: `M0 1275 l0 -1275 1275 0 1275 0 0 1275 0 1275 -1275 0 -1275 0 0 -1275z`,
  },
  {
    type: "svg",
    name: 110,
    svgName: `M0 2240 l0 -130 1275 0 1275 0 0 130 0 130 -1275 0 -1275 0 0 -130z
                                M0 1740 l0 -130 1275 0 1275 0 0 130 0 130 -1275 0 -1275 0 0 -130z
                                M0 1270 l0 -130 1275 0 1275 0 0 130 0 130 -1275 0 -1275 0 0 -130z
                                M0 780 l0 -130 1275 0 1275 0 0 130 0 130 -1275 0 -1275 0 0 -130z
                                M0 290 l0 -130 1275 0 1275 0 0 130 0 130 -1275 0 -1275 0 0 -130z`,
  },
  {
    type: "svg",
    name: 45,
    svgName: `M200 2536 c8 -8 535 -415 1170 -906 635 -491 1161 -897 1168 -903 9
                                -7 12 25 12 155 l0 164 -972 752 -973 752 -209 0 c-180 0 -208 -2 -196 -14z
                                M991 2546 c2 -2 354 -276 782 -609 l777 -606 -1 167 0 167 -570 443
                                -569 442 -212 0 c-116 0 -209 -2 -207 -4z
                                M1860 2546 c0 -5 654 -516 678 -530 9 -6 12 28 12 156 l-1 163 -138
                                108 -139 107 -206 0 c-113 0 -206 -2 -206 -4z
                                M0 2237 l0 -165 1263 -984 c694 -541 1268 -988 1275 -992 10 -6 12
                                26 10 157 l-3 165 -1235 962 c-679 530 -1252 976 -1272 992 l-38 30 0 -165z
                                M2 1625 l3 -169 924 -728 924 -728 209 0 210 0 -29 23 c-15 13 -518
                                410 -1118 882 -600 472 -1098 865 -1108 873 -17 15 -17 8 -15 -153z
                                M0 1018 l1 -163 549 -428 549 -427 208 2 209 3 -750 585 c-412 322
                                -753 587 -758 588 -4 2 -8 -70 -8 -160z
                                M0 378 l0 -165 137 -107 136 -106 211 0 c119 0 206 4 201 9 -6 4
                                -156 122 -335 261 -179 139 -331 257 -337 263 -10 7 -13 -25 -13 -155z`,
  },
  {
    type: "svg",
    name: 90,
    svgName: `M152 2433 l-152 -117 0 -164 c0 -130 3 -162 12 -155 7 6 164 126 348
                                268 184 142 342 264 350 271 12 12 -18 14 -196 14 l-210 0 -152 -117z
                                M582 2097 l-582 -450 0 -165 c0 -130 3 -162 13 -155 6 6 361 279 787
                                608 426 329 779 602 784 606 6 5 -83 9 -205 8 l-214 -1 -583 -451z
                                M993 1777 l-992 -772 0 -162 c-1 -90 1 -163 4 -163 3 0 2276 1765
                                2363 1835 1 1 0 10 -4 19 -5 14 -29 16 -193 15 l-186 0 -992 -772z
                                M1273 1397 l-1272 -982 0 -163 c-1 -90 3 -162 8 -160 4 2 578 443
                                1275 982 l1266 978 0 164 c0 90 -1 164 -2 163 -2 0 -575 -442 -1275 -982z
                                M1405 900 c-627 -479 -1147 -878 -1155 -886 -12 -12 14 -14 197 -14
                                l210 0 944 721 c519 397 945 723 947 724 1 1 1 75 0 164 l-3 162 -1140 -871z
                                M1799 582 l-747 -577 210 -3 209 -2 540 416 539 416 0 164 c0 90 -1
                                164 -2 164 -2 -1 -339 -261 -749 -578z
                                M2214 262 l-331 -257 209 -3 209 -2 125 95 124 96 0 164 c0 91 -1
                                165 -2 164 -2 0 -152 -116 -334 -257z`,
  },
  {
    type: "svg",
    name: 300,
    svgName: `M210 1275 l0 -1275 130 0 130 0 0 1275 0 1275 -130 0 -130 0 0 -1275z
                                M700 1275 l0 -1275 130 0 130 0 0 1275 0 1275 -130 0 -130 0 0 -1275z
                                M1170 1275 l0 -1275 130 0 130 0 0 1275 0 1275 -130 0 -130 0 0
                                -1275z
                                M1660 1275 l0 -1275 130 0 130 0 0 1275 0 1275 -130 0 -130 0 0
                                -1275z
                                M2150 1275 l0 -1275 130 0 130 0 0 1275 0 1275 -130 0 -130 0 0
                                -1275z`,
  },
];
const defaultValue = 45;

export default function LayerModal({ layer, isModalOpen, disableModal }) {
  const {
    map,
    settings,
    layers,
    setLayers,
    createFeatureStyle,
    countSelectedFeatures,
    setCountSelectedFeatures,
  } = useContext(MapaContext);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      layerName: layer?.data.layerName || "",
      fontColor: layer?.data.fontColor || "#000000",
      borderColor: "#000000",
      fillColor: "#0084ff",
      fillStyle: layer?.data.fillStyle || defaultValue,
    },
  });

  function addLayer(data) {
    const stateLayer = layers.findIndex(
      (layer) => layer.value === "stateLayer"
    );
    if (stateLayer === -1) return;

    let { layerName, fontColor, fillColor, borderColor, fillStyle } = data;
    fontColor =
      typeof fontColor === "object" ? fontColor.toRgbString() : fontColor;
    fillColor =
      typeof fillColor === "object" ? fillColor.toRgbString() : fillColor;
    borderColor =
      typeof borderColor === "object" ? borderColor.toRgbString() : borderColor;
    layerName = layerName || `Camada ${layers.length + 1}`;

    const features = layers[stateLayer].properties.getSource().getFeatures();
    const featuresSelecteds = features.filter(
      (fs) => fs.getProperties().SELECTED
    );
    const geoJSON = {
      features: featuresSelecteds.map((feature) => {
        return {
          type: "Feature",
          properties: {
            ...feature.getProperties(),
            strokeColor: borderColor,
            fontColor,
            fillColor,
            fillStyle,
          },
          geometry: {
            type: "Polygon",
            coordinates: feature.getProperties().geometry.getCoordinates(),
          },
        };
      }),
      type: "FeatureCollection",
    };

    featuresSelecteds.forEach((fs) => {
      fs.setProperties({ SELECTED: false });
      fs.setStyle(createFeatureStyle(fs, { ...settings }));
    });

    const newLayer = {
      name: layerName || `Camada ${layers.length + 1}`,
      value: `custom_layer${layers.length + 1}`,
      status: true,
      data: { ...data },
      key: layers.length + 1,
      properties: new vector({
        source: new Vector({
          features: new GeoJSON().readFeatures(geoJSON),
        }),
        style: (feature, res) => {
          feature.setProperties({
            SELECTED: false,
            zIndex: 1,
            fillColor,
            fontColor,
            fillStyle,
            strokeColor: borderColor,
          });
          return createFeatureStyle(feature, { ...settings }, null, res);
        },
        zIndex: 4,
        className: layerName || `Camada ${layers.length + 1}`,
        value: `custom_layer${layers.length + 1}`,
      }),
    };

    setLayers((pv) => [...pv, newLayer]);
    setCountSelectedFeatures(0);
    map.addLayer(newLayer.properties);
  }

  function changeLayer(data, layer) {
    let { layerName, fontColor, fillColor, borderColor, fillStyle } = data;
    const features = layer.properties.getSource().getFeatures();

    fontColor =
      typeof fontColor === "object" ? fontColor.toRgbString() : fontColor;
    fillColor =
      typeof fillColor === "object" ? fillColor.toRgbString() : fillColor;
    borderColor =
      typeof borderColor === "object" ? borderColor.toRgbString() : borderColor;

    features.map((feature) => {
      feature.setProperties({
        fillStyle,
        fontColor,
        fillColor,
        strokeColor: borderColor,
        SELECTED: false,
      });
      feature.setStyle(createFeatureStyle(feature, { ...settings }));
    });

    if (layerName.trim() !== "") {
      layer.name = layerName;
      layer.properties.className_ = layerName;
    }
    layer.data = { ...data };

    //atualiza a tabela
    setLayers((pv) => [...pv]);
  }

  function handleOk(data) {
    layer ? changeLayer(data, layer) : addLayer(data);
    reset();
    disableModal();
  }

  function countFeatures() {
    const stateLayer = layers.findIndex(
      (layer) => layer.value === "stateLayer"
    );
    if (stateLayer === -1) return;
    const features = layers[stateLayer].properties.getSource().getFeatures();
    return features.length;
  }

  useEffect(() => {
    if (layer) {
      const { fontColor, fillColor, borderColor, fillStyle } = layer?.data;
      reset({
        layerName: layer.name,
        borderColor,
        fontColor,
        fillColor,
        fillStyle,
      });
    }
  }, [layer]);

  return (
    <>
      <Modal
        className="fullscreen"
        id="fullscreen"
        centered={true}
        title={layer ? "Editar camada" : "Nova camada"}
        open={isModalOpen}
        onCancel={disableModal}
        width={350}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        <form className="flex flex-col gap-1" onSubmit={handleSubmit(handleOk)}>
          <div>
            <h3 className="font-bold">Nome</h3>
            <Controller
              name="layerName"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    field={field}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Título da camada"
                    size="small"
                    className="w-[300px]"
                  />
                );
              }}
            />
          </div>

          <div>
            <h3 className="font-bold">Cores</h3>
            <div className="flex gap-2">
              <Controller
                name="fontColor"
                control={control}
                render={({ field }) => {
                  return (
                    <ColorPicker
                      value={
                        field?.value?.metaColor?.originalInput ||
                        layer?.data.borderColor ||
                        "#000000"
                      }
                      onChange={(v) => {
                        field.onChange(v);
                      }}
                      showText={() => {
                        return <p>Fonte</p>;
                      }}
                      styles={{
                        popupOverlayInner: {
                          width: 288 + 40,
                        },
                      }}
                      presets={[
                        {
                          label: "Recomendado",
                          colors: recomendColors,
                        },
                      ]}
                      panelRender={(_, { components: { Picker, Presets } }) => (
                        <div
                          className="custom-panel"
                          style={{
                            display: "flex",
                            width: 298,
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <Presets />
                          </div>

                          <Divider type="vertical" style={{ height: "auto" }} />

                          <div style={{ width: 200 }}>
                            <Picker />
                          </div>
                        </div>
                      )}
                    />
                  );
                }}
              />

              <Controller
                name="borderColor"
                control={control}
                render={({ field }) => {
                  return (
                    <ColorPicker
                      value={
                        field?.value?.metaColor?.originalInput ||
                        layer?.data.borderColor ||
                        "#000000"
                      }
                      onChange={(v) => {
                        field.onChange(v);
                      }}
                      showText={() => {
                        return <p>Borda</p>;
                      }}
                      styles={{ popupOverlayInner: { width: 288 + 40 } }}
                      presets={[
                        { label: "Recomendado", colors: recomendColors },
                      ]}
                      panelRender={(_, { components: { Picker, Presets } }) => (
                        <div
                          className="custom-panel"
                          style={{ display: "flex", width: 298 }}
                        >
                          <div style={{ flex: 1 }}>
                            <Presets />
                          </div>

                          <Divider type="vertical" style={{ height: "auto" }} />

                          <div style={{ width: 200 }}>
                            <Picker />
                          </div>
                        </div>
                      )}
                    />
                  );
                }}
              />

              <Controller
                name="fillColor"
                control={control}
                render={({ field }) => {
                  return (
                    <ColorPicker
                      value={
                        field?.value?.metaColor?.originalInput ||
                        layer?.data.fillColor ||
                        "#0084ff"
                      }
                      onChange={(v) => {
                        field.onChange(v);
                      }}
                      showText={() => {
                        return <p>Fundo</p>;
                      }}
                      styles={{ popupOverlayInner: { width: 288 + 40 } }}
                      presets={[
                        { label: "Recomendado", colors: recomendColors },
                      ]}
                      panelRender={(_, { components: { Picker, Presets } }) => (
                        <div
                          className="custom-panel"
                          style={{ display: "flex", width: 298 }}
                        >
                          <div style={{ flex: 1 }}>
                            <Presets />
                          </div>

                          <Divider type="vertical" style={{ height: "auto" }} />

                          <div style={{ width: 200 }}>
                            <Picker />
                          </div>
                        </div>
                      )}
                    />
                  );
                }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold">Estilo</h3>
            <Controller
              name="fillStyle"
              control={control}
              render={({ field }) => {
                return (
                  <RadioInput
                    defaultValue={field.value}
                    dataset={svgList}
                    field={field}
                    cardStyle={`
                                        hover:cursor-pointer p-2 w-16 h-16 border-[1px] rounded-sm relative flex 
                                        flex-col justify-center items-center`}
                  />
                );
              }}
            />
          </div>

          <div className="absolute left-0 bottom-2 flex w-full gap-2 items-center justify-between px-6">
            <Statistic
              title="Camadas"
              value={
                layer?.properties.getSource().getFeatures().length ||
                countSelectedFeatures
              }
              suffix={`/${countFeatures()}`}
              valueStyle={{ fontSize: "18px", marginTop: "-2px" }}
              className="mb-1 text-sm"
            />
            <Button
              htmlType="submit"
              type="primary"
              className="bg-blue-600 mt-4"
            >
              {layer ? "Salvar" : "Confirmar"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
