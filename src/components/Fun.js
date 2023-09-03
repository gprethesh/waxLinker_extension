import React, { useState, useEffect } from "react";
import { JsonRpc } from "eosjs";
import ReactDOM from "react-dom";
import { Modal, NFTPortfolio } from "./Dom";
import CryptoJS from "crypto-js";
import axios from "axios";
import { Blocks } from "react-loader-spinner";

const endpoint = "https://wax.api.eosnation.io";
const rpc = new JsonRpc(endpoint);
const account = "xxxwaxlinker";
const testAccount = "3v5r.wam";

export const getUserId = async () => {
  let ie;
  return (
    (null ===
      (ie = document.querySelector(
        '[data-testid="primaryColumn"] [data-testid="UserName"] [tabindex="-1"]'
      )) || void 0 === ie
      ? void 0
      : ie.innerText.split("@").slice(-1)[0].trim()) || ""
  );
};

export const InjectNftCard = () => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [info2, setInfo2] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [nftData, setNftData] = useState([]);
  const [nftCollection, setNftCollection] = useState([]);
  const [assetPrices, setAssetPrices] = useState([]);
  const [Inventory, setInventory] = useState([]);

  const targetElement = document.querySelector(
    '.css-901oao.r-18jsvk2.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0[data-testid="UserDescription"]'
  );

  useEffect(() => {
    const getInfo = async () => {
      const username = await getUserId();

      function hashString(str) {
        let hash = CryptoJS.SHA256(str);
        let hashBytes = hash.toString(CryptoJS.enc.Hex).substring(0, 16);

        // Convert hex to bytes and reverse the order
        let reversedBytes = [];
        for (let i = 0; i < 8; i++) {
          reversedBytes[i] = parseInt(
            hashBytes.substring(i * 2, i * 2 + 2),
            16
          );
        }
        reversedBytes.reverse();

        // Convert bytes to BigInt
        let hash_value = BigInt(
          "0x" +
            reversedBytes.map((b) => b.toString(16).padStart(2, "0")).join("")
        );

        return hash_value;
      }

      const hash_value = hashString(username);

      const result = await rpc.get_table_rows({
        json: true,
        code: account,
        scope: account,
        table: "verifytab",
        index_position: 2,
        key_type: "i64",
        lower_bound: hash_value.toString(),
        upper_bound: hash_value.toString(),
      });

      if (result.rows[0] && result.rows[0].user_id) {
        setInfo(result.rows[0].user_id);
        setInfo2(result.rows[0].twitterId);
      } else {
        setInfo(undefined);
      }
    };
    getInfo();
  }, []);

  useEffect(() => {
    if (info !== null && info !== undefined) {
      const getNftData = async () => {
        setLoading(true);
        console.log(`Api Kicked In`);
        const url1 = `https://wax.api.atomicassets.io/atomicassets/v1/accounts/${info}`;
        const url2 = `https://wax.api.atomicassets.io/atomicmarket/v1/prices/assets?collection_name=&owner=${info}&sort=transferred&limit=60&order=desc`;
        const url3 = `https://wax.api.atomicassets.io/atomicmarket/v1/stats/accounts/${info}?symbol=WAX`;

        try {
          const [response1, response2, response3] = await Promise.all([
            axios.get(url1),
            axios.get(url2),
            axios.get(url3),
          ]);

          setNftData(response1.data.data.templates);
          setNftCollection(response1.data.data.collections);
          setInventory(response2.data.data);
          setAssetPrices(response3.data.data);
          setLoading(false);
        } catch (error) {
          console.error("An error occurred while fetching data:", error);
          setLoading(false);
        }
      };

      getNftData();
    }
  }, [info]);

  console.log(`info`, info, info2);

  return info2 !== undefined &&
    info2 !== null &&
    targetElement &&
    !targetElement.querySelector(".waxNFT") ? (
    <div>
      {/* <NftCard data={info2} /> */}

      {loading ? (
        <>
          {" "}
          <div className="waxNFT flex justify-center items-center">
            <div className="w-full mt-4">
              <div className="bg-gray-100 rounded-xl p-4 w-full mb-3 flex justify-center items-center">
                <div className="flex justify-between mb-1 flex-wrap">
                  <div className="card-title flex items-center mb-2 md:mb-0">
                    <Blocks
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <NFTPortfolio
            info={info}
            info2={info2}
            assetPrices={assetPrices}
            Inventory={Inventory}
            setIsOpen={setIsOpen}
          />
        </>
      )}

      {ReactDOM.createPortal(
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          info={info}
          nftData={nftData}
          nftCollection={nftCollection}
        />,
        document.body
      )}
    </div>
  ) : null;
};
