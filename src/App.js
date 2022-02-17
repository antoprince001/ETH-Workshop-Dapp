import { useEffect, useState } from "react";
import './App.css';
import { getCurrentWalletConnected, connectWallet , createParticipant , getParticipants} from './blockchain';
import Table from './Components/Table';

function App() {

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [feedback, setFeedback] = useState("");

  const [participants,setParticipants] = useState([]);
  // 0x0Ed4d9d4B3396373e47B55B67211fb12414C8020

  useEffect(() => {

    async function walletConnector() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address)
      setStatus(status);
      addWalletListener();

      let data = await getParticipants();
      setParticipants(data);

    }
    walletConnector();

  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const addParticipant = async (event) => {
    event.preventDefault();
    console.log(name + " " + year + " " + feedback);
    const  datum = await createParticipant(name,year,feedback);
    setStatus(datum.status);
    console.log(datum.status);
    let data = await getParticipants();
      setParticipants(data);

  }

  return (
    <div className="App">

      <div>
      <button id="walletButton" className="btn-wallet" onClick={() => connectWalletPressed()}>
          {walletAddress !== undefined && walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>
        <h1><b>Ethereum DApp Workshop - Feedback</b></h1>
        
        <div className="snowflakes" aria-hidden="true">
          {
            [...Array(10)].map((_, i) => {
              return (
                <div className="snowflake">
                ❅
                </div>
              )
            })}
        </div>
        
        <div id="list-table">
        
          <form onSubmit={addParticipant}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="text"
              name="year"
              placeholder="Enter your year [1-4]"
              value={year}
              onChange={(event) => setYear(event.target.value)}
            />
            <input
              type="text"
              name="feedback"
              placeholder="Enter your feedback"
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
            />
            <button type="submit">Add</button>
          </form>
          </div>

          <span>{status !== undefined ? status : ""}</span>

          <center>
            <h3>Feedback of Participants</h3>
            <Table participants={participants} />
          </center>
      </div>

    </div>
  );
}

export default App;
