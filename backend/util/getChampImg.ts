import axios from "axios";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const request = require("request");
const lcuc = require("lcu-connector");
const fs = require("fs");
const sharp = require("sharp");
console.log(__dirname);
const lcu = new lcuc();
console.log(lcu);
lcu.start();
lcu.on("connect", (data: any) => {
  const { port, password } = data;
  const link = `https://riot:${password}@127.0.0.1:${port}`;
  request(
    `${link}/lol-champions/v1/inventories/23614482/champions`,
    (err: any, res: any, body: any) => {
      //console.log(err)
      const data = JSON.parse(body);
      let ttmp;
      const tmp = data.map(async function (champ: any) {
        if (champ.id === -1) {
          return;
        }
        parseInt;
        const img = await axios.get(link + champ.skins[0].splashPath, {
          responseType: "arraybuffer",
        });
        fs.writeFileSync(
          __dirname + "/beforeCrop/" + champ.alias + ".jpg",
          img.data
        );
        sharp(__dirname + "/beforeCrop/" + champ.alias + ".jpg")
          .extract({ left: 0, top: 0, width: 1280, height: 480 })
          .toFile(
            __dirname + "/afterCrop/" + champ.alias + ".jpg",
            (err: any) => {
              if (err) {
                console.log(err);
              }
            }
          );

        return {
          id: champ.id,
          name: champ.alias,
          path: champ.skins[0].splashPath,
        };
        console.log(`${champ.alias}:${champ.alias},`);
        ttmp[parseInt(champ.id)] = champ.name;
      });
      console.log(JSON.stringify(ttmp));
      lcu.stop();
    }
  );
});
