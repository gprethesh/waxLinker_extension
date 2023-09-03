import React, { useState, useEffect, useRef } from "react";
import { ColorRing } from "react-loader-spinner";

export const NFTPortfolio = ({
  info,
  info2,
  assetPrices,
  Inventory,
  setIsOpen,
}) => {
  const formatWAX = (amount, precision) => {
    if (!amount || !precision) return "N/A";
    const num = Number(amount) / Math.pow(10, precision);
    const formattedNum = num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${formattedNum} WAX`;
  };

  const netAmount = assetPrices
    ? BigInt(assetPrices.result.sell_volume) -
      BigInt(assetPrices.result.buy_volume)
    : "N/A";

  return (
    <div className="waxNFT">
      <div className="w-full mt-4">
        <div className="bg-gray-100 rounded-xl p-4 w-full mb-3">
          <div className="flex justify-between mb-1 flex-wrap">
            <div className="card-title flex items-center mb-2 md:mb-0">
              <a
                className="card-title text-blue-500 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {info} NFT Portfolio
              </a>
            </div>
            <a
              href={`https://twitter.com/intent/tweet?text=Check%20out%20%40${encodeURIComponent(
                info2
              )}%20%23NFT%20portfolio%20and%20discover%20real%20%23NFT%20whales%20on%20Twitter!%20%40${encodeURIComponent(
                info2
              )}%20has%20spent%20${encodeURIComponent(
                formatWAX(
                  assetPrices.result.buy_volume,
                  assetPrices.symbol.token_precision
                )
              )}%20on%20%23NFT,%20powered%20by%20chrome%20extension%20(waxlinker.com)`}
              target="_blank"
              className="mb-2 md:mb-0"
              rel="noreferrer"
            >
              <div className="flex items-center justify-center border border-gray-300 h-6 rounded-full bg-white hover:bg-gray-300 text-gray-600 text-sm font-semibold px-3">
                Share
              </div>
            </a>
          </div>
          <div className="mb-1 grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <span className="card-number mr-1 text-black font-bold">
                {Inventory
                  ? formatWAX(
                      Inventory[0]?.suggested_median,
                      Inventory[0]?.token_precision
                    )
                  : "N/A"}
              </span>
              <div className="card-text text-gray-600">Portfolio Value</div>
            </div>
            <div className="flex items-center">
              <span className="card-number mr-1 text-black font-bold">
                {assetPrices
                  ? formatWAX(
                      netAmount.toString(),
                      assetPrices.symbol.token_precision
                    )
                  : "N/A"}
              </span>
              <div className="card-text text-gray-600">Net Amount</div>
            </div>
            <div className="flex items-center">
              <span className="card-number mr-1 text-black font-bold">
                {formatWAX(
                  assetPrices.result.sell_volume,
                  assetPrices.symbol.token_precision
                )}
              </span>
              <div className="card-text text-gray-600">Sold</div>
            </div>
            <div className="flex items-center">
              <span className="card-number mr-1 text-black font-bold">
                {formatWAX(
                  assetPrices.result.buy_volume,
                  assetPrices.symbol.token_precision
                )}
              </span>
              <div className="card-text text-gray-600">Bought</div>
            </div>
          </div>

          <hr className="mb-2" />

          <div className="flex items-center justify-center">
            <div
              className="text-blue-500 hover:underline text-center"
              onClick={() => setIsOpen(true)}
            >
              View NFT Portfolio
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Modal = ({ isOpen, setIsOpen, info, nftData, nftCollection }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const [imageLoaded, setImageLoaded] = useState({});

  const currentItems = activeTab === 0 ? nftData : nftCollection;
  const totalItems = currentItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDisplayedItems = currentItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }));
  };

  useEffect(() => {
    setImageLoaded({}); // Reset the imageLoaded state
  }, [currentPage, activeTab]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.backgroundColor = "bg-gray-100";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.backgroundColor = "";
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const nextPage = () => {
    if (indexOfLastItem < currentItems.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-100 rounded-lg shadow-lg w-3/4 h-3/4 overflow-y-auto p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-700">
                <a
                  className="card-title text-blue-500 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://wax.atomichub.io/profile/wax-mainnet/${info}?blockchain=wax-mainnet&order=desc&sort=transferred`}
                >
                  {info} View on (AtomicHub)
                </a>
              </h2>
              <button
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="flex justify-around mb-4 border-t border-b py-4">
              <button
                onClick={() => setActiveTab(0)}
                className={`p-2 rounded ${
                  activeTab === 0
                    ? "bg-blue-700 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                NFT View
              </button>
              <div className="border-l-2 h-8 mx-4"></div>
              <button
                onClick={() => setActiveTab(1)}
                className={`p-2 rounded ${
                  activeTab === 1
                    ? "bg-blue-700 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Collection View
              </button>
            </div>

            <hr className="mb-2" />
            <div className="grid grid-cols-3 gap-4">
              {activeTab === 0 &&
                currentDisplayedItems.map((nft, index) => (
                  <div key={index} className="border rounded p-2">
                    {!imageLoaded[index] && (
                      <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={[
                          "#e15b64",
                          "#f47e60",
                          "#f8b26a",
                          "#abbd81",
                          "#849b87",
                        ]}
                      />
                    )}
                    {nft.template.immutable_data.img ? (
                      <img
                        src={`http://ipfs-resizer.ledgerwise.io/api/v1/resized?cid=${nft.template.immutable_data.img}&size=370`}
                        alt={nft.template.immutable_data.name}
                        className="w-full"
                        onLoad={() => handleImageLoad(index)}
                        style={{
                          display: imageLoaded[index] ? "block" : "none",
                        }}
                      />
                    ) : (
                      nft.template.immutable_data.video && (
                        <video
                          className="w-full"
                          controls
                          onLoad={() => handleImageLoad(index)}
                          style={{
                            display: imageLoaded[index] ? "block" : "none",
                          }}
                        >
                          <source
                            src={`https://atomichub-ipfs.com/ipfs/${nft.template.immutable_data.video}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      )
                    )}
                    <h3 className="text-lg">
                      {nft.template.immutable_data.name}
                    </h3>
                    <p>Assets: {nft.assets}</p>
                  </div>
                ))}
              {activeTab === 1 &&
                currentDisplayedItems.map((collection, index) => (
                  <div key={index} className="border rounded p-2">
                    {!imageLoaded[index] && (
                      <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={[
                          "#e15b64",
                          "#f47e60",
                          "#f8b26a",
                          "#abbd81",
                          "#849b87",
                        ]}
                      />
                    )}
                    <img
                      src={`http://ipfs-resizer.ledgerwise.io/api/v1/resized?cid=${collection.collection.img}&size=370`}
                      alt={collection.collection.collection_name}
                      className="w-full"
                      onLoad={() => handleImageLoad(index)}
                      style={{ display: imageLoaded[index] ? "block" : "none" }}
                    />
                    <h3 className="text-lg">
                      {collection.collection.collection_name}
                    </h3>
                    <p>Assets: {collection.assets}</p>
                  </div>
                ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-pink-500 text-white p-2 rounded hover:bg-pink-600"
                onClick={prevPage}
              >
                Previous
              </button>
              <div className="text-gray-600">
                {/* Show current page and total pages */}
                Page {currentPage} of {totalPages}
              </div>
              <button
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                onClick={nextPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
