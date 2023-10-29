import chainIds from "./chainIds";

const ConnectButton = (props) => {

    console.log( JSON.stringify(props) )

    const { isConnected, connectWallet, currentBalance, walletAddress, chainId } = props;
    const displayWalletAddress = `${walletAddress?.substring(0,10)}...`
    const displayCurrentBalance = `${currentBalance?.toFixed(4)}`
  return (
    <>
      {isConnected ? (
        <div className="buttonContainer">
            지갑연결성공
        </div>
      ) : (
        <button
          className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => connectWallet()}
        >
          지갑연결
        </button>
      )}
    </>
  );
};

export default ConnectButton;