export async function injectNftCard() {
  const [loading, setloading] = useState(false);
  const [info, setInfo] = useState("");
  const [info2, setInfo2] = useState(""); // Renamed info1 to info2

  const targetElement = document.querySelector(
    '.css-901oao.r-18jsvk2.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0[data-testid="UserDescription"]'
  );

  const getInfo = async () => {
    // fetch the table data from the blockchain
    setloading(true);

    const username = await getUserId();

    const result = await rpc.get_table_rows({
      json: true,
      code: "pastacheetah",
      scope: "pastacheetah",
      table: "verifytab",
      index_position: 1,
      key_type: "name",
      lower_bound: username,
      upper_bound: username,
    });

    console.log(`result.rows[0].user_id`, result.rows);

    if (result.rows[0] && result.rows[0].user_id) {
      setInfo(result.rows[0].user_id);
      setInfo2(result.rows[0].twitterId); // Set info2 with twitterId
    } else {
      setInfo(undefined);
    }
    setloading(false);
  };

  // Call getInfo to fetch the data
  await getInfo();

  console.log(`info`, info, info2);

  // Check if twitterId is found inside info2
  if (info2 !== undefined && info2 !== null) {
    if (targetElement && !targetElement.querySelector(".waxNFT")) {
      const data = await getUserId();
      console.log(`data`, data);
      getUserId().then((data) => {
        const WrapperComponent = () => {
          // Define the isOpen state here
          const [isOpen, setIsOpen] = useState(false);

          return (
            <div>
              {/* <NftCard data={data} /> */}
              <NFTPortfolio data={data} setIsOpen={setIsOpen} />

              {ReactDOM.createPortal(
                <Modal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  nfts={nfts}
                  data={data}
                />,
                document.body
              )}
            </div>
          );
        };

        ReactDOM.render(<WrapperComponent />, targetElement);
      });
    }
  }
}
